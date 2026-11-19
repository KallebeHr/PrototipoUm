<script setup>
  import { computed, nextTick, onMounted, onUnmounted, ref, watchEffect } from 'vue'
  import AreaPage from './components/AreaPage.vue'
  import BlogIndexPage from './components/BlogIndexPage.vue'
  import BlogPostPage from './components/BlogPostPage.vue'
  import CookieBanner from './components/CookieBanner.vue'
  import FloatingWhatsApp from './components/FloatingWhatsApp.vue'
  import GoogleReviewsPolicy from './components/GoogleReviewsPolicy.vue'
  import InstitutionalSite from './components/InstitutionalSite.vue'
  import LinkBioPage from './components/LinkBioPage.vue'
  import NotFoundPage from './components/NotFoundPage.vue'
  import PrivacyPage from './components/PrivacyPage.vue'
  import ProfessionalPage from './components/ProfessionalPage.vue'
  import QuizPage from './components/QuizPage.vue'
  import { initConsent, track, trackPageView } from './composables/useConsent'
  import { quizAvailable } from './composables/useOffers'
  import { captureOrigin } from './composables/useOrigin'
  import { jsonLdFor, ogImageFor, routeFor } from './config/seoRoutes'
  import { siteConfig } from './config/siteConfig'

  captureOrigin() // guarda utm_*/referência na sessão, antes de qualquer navegação

  // ── Rotas por caminho real (/ajuda, /blog…). Links antigos "#/ajuda" são convertidos.
  const legacy = window.location.hash.match(/^#(\/[a-z].*)$/i)
  if (legacy) window.history.replaceState(null, '', legacy[1])

  const pathname = ref(window.location.pathname)
  const hash = ref(window.location.hash)
  const quizBack = ref('/')

  const clean = computed(() => (pathname.value.replace(/\/+$/, '') || '/'))
  const route = computed(() => {
    const p = clean.value
    let m
    if (p === '/') return { name: 'home' }
    if (/^\/(linkbio|bio|links)$/i.test(p)) return { name: 'bio' }
    if (/^\/(ajuda|quiz)$/i.test(p)) return quizAvailable() ? { name: 'quiz' } : { name: 'redirect-home' }
    if (p === '/privacidade' && siteConfig.privacy?.enabled) return { name: 'privacy' }
    if (p === '/blog' && siteConfig.blog?.enabled) return { name: 'blog' }
    if ((m = p.match(/^\/blog\/([^/]+)$/)) && siteConfig.blog?.enabled && siteConfig.blog.posts.some(x => x.slug === m[1])) return { name: 'post', slug: m[1] }
    if ((m = p.match(/^\/areas\/([^/]+)$/)) && siteConfig.practiceAreas.some(x => x.page && x.slug === m[1])) return { name: 'area', slug: m[1] }
    if ((m = p.match(/^\/equipe\/([^/]+)$/)) && siteConfig.professionalProfiles.some(x => x.slug === m[1])) return { name: 'profile', slug: m[1] }
    if ((m = p.match(/^\/avaliacoes\/(privacidade|termos)$/))) return { name: 'policy', kind: m[1] }
    return { name: 'notfound' }
  })

  if (route.value.name === 'redirect-home') {
    window.history.replaceState(null, '', '/')
    pathname.value = '/'
  }

  async function sync (previousName) {
    const before = clean.value
    pathname.value = window.location.pathname
    hash.value = window.location.hash
    if (clean.value === before) return // só mudou a âncora: o navegador rola sozinho
    if (route.value.name === 'redirect-home') {
      window.history.replaceState(null, '', '/')
      pathname.value = '/'
    }
    if (route.value.name === 'quiz' && previousName !== 'quiz') quizBack.value = previousName === 'bio' ? '/linkbio' : '/'
    await nextTick()
    const target = hash.value.length > 1 ? document.querySelector(`#${CSS.escape(decodeURIComponent(hash.value.slice(1)))}`) : null
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
    trackPageView()
  }

  function go (url) {
    const [path, frag] = url.split('#')
    const target = new URL(path || window.location.pathname, window.location.origin).pathname
    if (target === window.location.pathname) {
      if (frag) window.location.hash = frag
      else window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const previousName = route.value.name
    window.history.pushState(null, '', url)
    sync(previousName)
  }

  const floatingPages = ['home', 'blog', 'post', 'area', 'profile', 'privacy', 'notfound']
  const pageMessage = computed(() => {
    const r = route.value
    if (r.name === 'area') return `Olá! Vim pela página de ${siteConfig.practiceAreas.find(a => a.slug === r.slug)?.title} e gostaria de orientação.`
    if (r.name === 'post') return `Olá! Li o artigo “${siteConfig.blog.posts.find(p => p.slug === r.slug)?.title}” no site e gostaria de orientação.`
    if (r.name === 'blog') return siteConfig.conversion?.sectionMessages?.artigos || ''
    if (r.name === 'profile') return siteConfig.conversion?.sectionMessages?.equipe || ''
    return ''
  })

  function onPopState () {
    sync(route.value.name)
  }

  function onClick (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = event.target.closest?.('a[href]')
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return
    const href = link.getAttribute('href') || ''
    let url = null
    if (href.startsWith('#/')) url = href.slice(1)
    else if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/api/') && !/\.[a-z0-9]{2,5}(\?|#|$)/i.test(href.split('#')[0])) url = href
    else if (href.length > 1 && href.startsWith('#') && route.value.name !== 'home') url = `/${href}`
    if (!url) return
    event.preventDefault()
    go(url)
  }

  // Eventos de conversão: cliques em WhatsApp e em elementos com data-track.
  function onTrackClick (event) {
    const link = event.target.closest?.('a[href]')
    if (!link) return
    const href = link.getAttribute('href') || ''
    const label = (link.dataset.label || link.textContent || '').trim().slice(0, 60)
    if (/(^|\/\/)(wa\.me|api\.whatsapp\.com)\//.test(href)) {
      track('whatsapp_click', { link_text: label, section: link.dataset.section || '', page_path: window.location.pathname })
    } else if (link.dataset.track) {
      track(link.dataset.track, { label, page_path: window.location.pathname })
    }
  }

  onMounted(() => {
    window.addEventListener('popstate', onPopState)
    document.addEventListener('click', onClick)
    document.addEventListener('click', onTrackClick, true)
    initConsent()
  })
  onUnmounted(() => {
    window.removeEventListener('popstate', onPopState)
    document.removeEventListener('click', onClick)
    document.removeEventListener('click', onTrackClick, true)
  })

  // ── Cabeçalho (título, descrição, Open Graph, canonical, JSON-LD) por rota
  function setTag (selector, tag, attrs) {
    let el = document.head.querySelector(selector)
    if (!el) {
      el = document.createElement(tag)
      document.head.append(el)
    }
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
  }

  watchEffect(() => {
    for (const [key, value] of Object.entries(siteConfig.theme)) document.documentElement.style.setProperty(`--color-${key.replace(/[A-Z]/g, l => `-${l.toLowerCase()}`)}`, value)
    document.querySelector('link[rel="icon"]')?.setAttribute('href', siteConfig.brand.favicon)

    const base = (siteConfig.seo.siteUrl || window.location.origin).replace(/\/$/, '')
    const seo = routeFor(clean.value)
    const r = route.value
    let title = seo?.title || siteConfig.seo.title
    const description = seo?.description || siteConfig.seo.description
    let noindex = false
    if (r.name === 'policy') {
      title = `${r.kind === 'privacidade' ? 'Privacidade' : 'Termos de uso'} das avaliações | ${siteConfig.brand.shortName}`
      noindex = true
    } else if (r.name === 'notfound') {
      title = `Página não encontrada | ${siteConfig.brand.shortName}`
      noindex = true
    }
    const path = seo?.path || clean.value
    const image = ogImageFor(seo, base)
    document.title = title
    setTag('meta[name="description"]', 'meta', { name: 'description', content: description })
    setTag('meta[name="robots"]', 'meta', { name: 'robots', content: noindex ? 'noindex, follow' : 'index, follow' })
    setTag('link[rel="canonical"]', 'link', { rel: 'canonical', href: `${base}${path === '/' ? '/' : path}` })
    const og = { 'og:title': title, 'og:description': description, 'og:type': seo?.kind === 'post' ? 'article' : 'website', 'og:url': `${base}${path}`, 'og:site_name': siteConfig.brand.officeName, 'og:locale': 'pt_BR', 'og:image': image, 'og:image:alt': siteConfig.seo.ogImageAlt }
    for (const [property, content] of Object.entries(og)) setTag(`meta[property="${property}"]`, 'meta', { property, content })
    const tw = { 'twitter:card': 'summary_large_image', 'twitter:title': title, 'twitter:description': description, 'twitter:image': image }
    for (const [name, content] of Object.entries(tw)) setTag(`meta[name="${name}"]`, 'meta', { name, content })
    let ld = document.querySelector('#ld-json')
    if (!ld) {
      ld = document.createElement('script')
      ld.id = 'ld-json'
      ld.type = 'application/ld+json'
      document.head.append(ld)
    }
    ld.textContent = JSON.stringify(jsonLdFor(seo, base))
  })
</script>

<template>
  <GoogleReviewsPolicy v-if="route.name === 'policy'" :key="route.kind" :kind="route.kind" />
  <LinkBioPage v-else-if="route.name === 'bio'" />
  <QuizPage v-else-if="route.name === 'quiz'" :back-href="quizBack" />
  <PrivacyPage v-else-if="route.name === 'privacy'" />
  <BlogIndexPage v-else-if="route.name === 'blog'" />
  <BlogPostPage v-else-if="route.name === 'post'" :key="route.slug" :slug="route.slug" />
  <AreaPage v-else-if="route.name === 'area'" :key="route.slug" :slug="route.slug" />
  <ProfessionalPage v-else-if="route.name === 'profile'" :key="route.slug" :slug="route.slug" />
  <NotFoundPage v-else-if="route.name === 'notfound'" />
  <InstitutionalSite v-else />
  <FloatingWhatsApp v-if="floatingPages.includes(route.name)" :key="`${route.name}-${route.slug || ''}`" :page-message="pageMessage" />
  <CookieBanner />
</template>
