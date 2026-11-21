import { siteConfig as c } from '../config/siteConfig'
import { originSuffix } from './useOrigin'

const digits = value => String(value ?? '').replace(/\D/g, '')

export function whatsappLink (number, message = '') {
  const clean = digits(number || c.contact.whatsapp)
  const origin = c.conversion?.originInMessage && !message.includes('(Origem:') ? originSuffix() : ''
  return clean ? `https://wa.me/${clean}?text=${encodeURIComponent(message + origin)}` : ''
}

/** Opção do quiz: texto simples ou { label, value, whatsapp }. */
export function normalizeOption (option) {
  return typeof option === 'string'
    ? { label: option, key: option, whatsapp: '' }
    : { label: option.label, key: option.value ?? option.label, whatsapp: option.whatsapp || '' }
}

function selectedKeys (question, answer) {
  const values = Array.isArray(answer) ? answer : [answer]
  const options = (question.options || []).map(option => normalizeOption(option))
  return values.filter(Boolean).map(value => options.find(o => o.label === value)?.key ?? value)
}

/** Perguntas visíveis: as que têm showIf só aparecem se a resposta anterior combinar. */
export function visibleQuestions (questions, answers) {
  const byId = Object.fromEntries(questions.map(q => [q.id, q]))
  const memo = {}
  const shown = (q, guard = 0) => {
    if (q.id in memo) {
      return memo[q.id]
    }
    let result = true
    if (q.showIf && guard < 10) {
      const source = byId[q.showIf.question]
      result = Boolean(source) && shown(source, guard + 1)
        && selectedKeys(source, answers[source.id]).some(key => (q.showIf.is || []).includes(key))
    }
    memo[q.id] = result
    return result
  }
  return questions.filter(q => shown(q))
}

/** Número de WhatsApp definido pela primeira opção escolhida que tenha "whatsapp". */
export function quizDestination (questions, answers) {
  for (const q of questions) {
    const values = Array.isArray(answers[q.id]) ? answers[q.id] : [answers[q.id]]
    for (const value of values) {
      const option = (q.options || []).map(option => normalizeOption(option)).find(o => o.label === value)
      if (option?.whatsapp) {
        return option.whatsapp
      }
    }
  }
  return ''
}

/** Produtos visíveis em 'site' ou 'bio'. Devolve [] quando products.enabled for false. */
export function visibleProducts (place) {
  const p = c.products
  if (!p?.enabled) {
    return []
  }
  const placeFlag = place === 'bio' ? p.showOnLinkBio : p.showOnSite
  if (placeFlag === false) {
    return []
  }
  const itemFlag = place === 'bio' ? 'showOnLinkBio' : 'showOnSite'
  return (p.items || [])
    .filter(item => item?.title && item[itemFlag] !== false)
    .map((item, index) => ({ ...item, key: `${index}-${item.title}`, href: productHref(item), buyHref: buyHref(item) }))
    .filter(item => item.href && item.buyHref)
}

export const salesPageEnabled = () => Boolean(c.products?.enabled && c.products.page?.enabled)
export const salesPagePath = () => c.products?.page?.path || '/produtos'

/** Desconto ativo? (some sozinho depois de `endsAt`). */
export function discountInfo () {
  const d = c.products?.discount
  if (!d?.enabled || !(d.percent > 0)) {
    return { active: false }
  }
  const ends = d.endsAt ? new Date(d.endsAt) : null
  if (ends && (Number.isNaN(ends.getTime()) || ends.getTime() < Date.now())) {
    return { active: false }
  }
  return { active: true, percent: d.percent, label: d.label || 'de desconto', coupon: d.coupon || '', endsAt: ends }
}

export const formatMoney = value => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

/** Destino dos cards/botões do site: página de vendas (se ativa) ou direto a compra. */
export function productHref (item) {
  if (salesPageEnabled() && item.salesPage !== false) {
    return salesPagePath()
  }
  return buyHref(item)
}

/** url preenchida → usa a url; senão, abre o WhatsApp com a mensagem do item. */
export function buyHref (item) {
  const url = String(item.url || '').trim()
  if (url) {
    return url
  }
  return whatsappLink(c.contact.whatsapp, item.whatsappMessage || `Olá! Tenho interesse em: ${item.title}`)
}

export function isExternal (href) {
  return /^https?:\/\//i.test(href)
}

/** O quiz aparece em 'site' ou 'bio' somente se quiz.enabled e o respectivo showOn estiverem true. */
export function quizVisible (place) {
  const q = c.quiz
  if (!q?.enabled || !Array.isArray(q.questions) || q.questions.length === 0) {
    return false
  }
  return place === 'bio' ? q.showOnLinkBio !== false : q.showOnSite !== false
}

export function quizAvailable () {
  const q = c.quiz
  return Boolean(q?.enabled && Array.isArray(q.questions) && q.questions.length > 0)
}

/** Monta o texto do WhatsApp com as respostas já organizadas. */
export function buildQuizMessage (questions, answers) {
  const lines = [c.quiz.messageIntro || 'Olá! Respondi o questionário do site:', '']
  for (const [index, q] of questions.entries()) {
    const raw = answers[q.id]
    const value = Array.isArray(raw) ? raw.join(', ') : String(raw ?? '').trim()
    lines.push(`*${index + 1}. ${q.label || q.title}*`, value || '(não respondido)', '')
  }
  const origin = c.conversion?.originInMessage ? originSuffix() : ''
  return lines.join('\n').trim() + origin
}

export function quizWhatsappUrl (questions, answers) {
  const number = quizDestination(questions, answers) || c.quiz.whatsapp || c.contact.whatsapp
  return whatsappLink(number, buildQuizMessage(questions, answers))
}
