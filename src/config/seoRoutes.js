// Módulo puro (sem DOM): usado pelo navegador (App.vue) e pelo build (prerender).
import { siteConfig as c } from './siteConfig.js'

const trim = (text, max = 158) => {
  const clean = String(text || '').replace(/\s+/g, ' ').trim()
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).replace(/\s+\S*$/, '')}…`
}

export const areaPages = () => (c.practiceAreas || []).filter(a => a.page && a.slug)
export const blogPosts = () => (c.blog?.enabled ? (c.blog.posts || []).filter(p => p.slug && p.title) : [])

export function absoluteUrl (base, path) {
  if (!path) {
    return ''
  }
  if (/^https?:\/\//i.test(path)) {
    return path
  }
  return `${String(base || '').replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`
}

/** Todas as rotas indexáveis do site, com título e descrição próprios. */
export function allRoutes () {
  const name = c.brand.shortName
  const routes = [
    { path: '/', title: c.seo.title, description: c.seo.description, kind: 'home' },
    { path: '/linkbio', title: `${name} | Contatos e links`, description: c.linkBio.description, kind: 'bio' },
  ]
  if (c.quiz?.enabled && c.quiz.questions?.length) {
    routes.push({ path: '/ajuda', title: `${c.quiz.pageTitle} | ${name}`, description: trim(c.quiz.pageIntro), kind: 'quiz' })
  }
  if (c.privacy?.enabled) {
    routes.push({ path: '/privacidade', title: `Política de Privacidade | ${name}`, description: `Como a ${c.brand.officeName} trata dados pessoais, conforme a LGPD.`, kind: 'privacy' })
  }
  if (c.blog?.enabled) {
    routes.push({ path: '/blog', title: `${c.blog.title} | ${name}`, description: trim(c.blog.description), kind: 'blog' })
    for (const post of blogPosts()) {
      routes.push({ path: `/blog/${post.slug}`, title: `${post.title} | ${name}`, description: trim(post.excerpt), kind: 'post', post })
    }
  }
  for (const area of areaPages()) {
    routes.push({ path: `/areas/${area.slug}`, title: `${area.pageTitle || area.title} | ${name}`, description: trim(area.intro || area.description), kind: 'area', area })
  }
  for (const [index, person] of c.team.entries()) {
    const slug = c.professionalProfiles?.[index]?.slug
    if (slug) {
      routes.push({ path: `/equipe/${slug}`, title: `${person.name} | ${c.brand.officeName}`, description: trim(c.professionalProfiles[index].biography || person.description), kind: 'profile' })
    }
  }
  return routes
}

export function routeFor (pathname) {
  const clean = (pathname || '/').replace(/\/+$/, '') || '/'
  const aliases = { '/bio': '/linkbio', '/links': '/linkbio', '/quiz': '/ajuda' }
  const path = aliases[clean] || clean
  return allRoutes().find(r => r.path === path) || null
}

function legalService (base) {
  const [city, region] = String(c.contact.city || '').split('/').map(v => v.trim())
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${base}/#escritorio`,
    'name': c.brand.officeName,
    'url': `${base}/`,
    'image': absoluteUrl(base, c.seo.ogImage),
    'logo': absoluteUrl(base, c.brand.logo),
    'telephone': c.contact.phoneRaw ? `+${c.contact.phoneRaw}` : undefined,
    'email': c.contact.email || undefined,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': c.contact.address,
      'addressLocality': city,
      'addressRegion': region,
      'postalCode': c.contact.zipCode,
      'addressCountry': 'BR',
    },
    'geo': c.contact.latitude ? { '@type': 'GeoCoordinates', 'latitude': c.contact.latitude, 'longitude': c.contact.longitude } : undefined,
    'hasMap': c.contact.mapUrl || undefined,
    'areaServed': { '@type': 'Country', 'name': 'Brasil' },
    'knowsAbout': areaPages().map(a => a.title),
    'sameAs': Object.values(c.social || {}).filter(Boolean),
    'openingHours': c.contact.businessHours || undefined,
  }
  return data
}

const faqPage = list => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': list.map(item => ({ '@type': 'Question', 'name': item.question, 'acceptedAnswer': { '@type': 'Answer', 'text': item.answer } })),
})

const breadcrumb = (base, items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': items.map(([name, path], i) => ({ '@type': 'ListItem', 'position': i + 1, name, 'item': `${base}${path}` })),
})

/** Lista de objetos JSON-LD da rota. */
export function jsonLdFor (route, base) {
  if (!route) {
    return []
  }
  const out = [legalService(base)]
  if (route.kind === 'home' && c.faq?.length) {
    out.push(faqPage(c.faq))
  }
  if (route.kind === 'area') {
    if (route.area.faq?.length) {
      out.push(faqPage(route.area.faq))
    }
    out.push(breadcrumb(base, [['Início', '/'], [route.area.title, route.path]]))
  }
  if (route.kind === 'post') {
    const p = route.post
    out.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': p.title,
      'description': p.excerpt,
      'datePublished': p.date,
      'dateModified': p.updated || p.date,
      'image': absoluteUrl(base, p.image || c.seo.ogImage),
      'mainEntityOfPage': `${base}${route.path}`,
      'author': { '@type': 'Organization', 'name': c.brand.officeName },
      'publisher': { '@type': 'Organization', 'name': c.brand.officeName, 'logo': { '@type': 'ImageObject', 'url': absoluteUrl(base, c.brand.logo) } },
    })
    out.push(breadcrumb(base, [['Início', '/'], [c.blog.title, '/blog'], [p.title, route.path]]))
  }
  return out
}

export function ogImageFor (route, base) {
  const own = route?.post?.image
  return absoluteUrl(base, own || c.seo.ogImage)
}
