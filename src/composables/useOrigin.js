// Origem da visita (UTM ou site de referência), guardada só na sessão do navegador.
// É usada para acrescentar "(Origem: ...)" às mensagens de WhatsApp.
const KEY = 'origin-v1'
const UTM = ['utm_source', 'utm_medium', 'utm_campaign']

const clip = value => String(value).replace(/[^\p{L}\p{N} _.\-+]/gu, '').slice(0, 50)

export function captureOrigin () {
  try {
    if (sessionStorage.getItem(KEY)) {
      return
    }
    const query = new URLSearchParams(window.location.search)
    const origin = {}
    for (const key of UTM) {
      if (query.get(key)) {
        origin[key] = clip(query.get(key))
      }
    }
    if (!origin.utm_source && query.get('src')) {
      origin.utm_source = clip(query.get('src'))
    }
    if (!origin.utm_source && document.referrer) {
      const host = new URL(document.referrer).hostname.replace(/^www\./, '')
      if (host && host !== window.location.hostname.replace(/^www\./, '')) {
        origin.referrer = host
      }
    }
    sessionStorage.setItem(KEY, JSON.stringify(origin))
  } catch { /* storage ou URL indisponível */ }
}

export function originLabel () {
  try {
    const o = JSON.parse(sessionStorage.getItem(KEY) || '{}')
    if (o.utm_source) {
      return [o.utm_source, o.utm_medium, o.utm_campaign].filter(Boolean).join(' / ')
    }
    if (o.referrer) {
      return `site ${o.referrer}`
    }
  } catch { /* ignora */ }
  return ''
}

export const originSuffix = () => {
  const label = originLabel()
  return label ? `\n\n(Origem: ${label})` : ''
}
