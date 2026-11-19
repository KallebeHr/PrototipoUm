import { reactive } from 'vue'
import { siteConfig as c } from '../config/siteConfig'

const KEY = 'consent-analytics-v1'

export const consent = reactive({ decided: false, analytics: false, bannerOpen: false })

/** Só existe aviso de cookies se a medição estiver ligada E houver algum ID configurado. */
export const analyticsConfigured = () => Boolean(c.analytics?.enabled && (c.analytics.ga4Id || c.analytics.metaPixelId))

let loaded = false

function readStored () {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (stored && typeof stored.analytics === 'boolean') {
      return stored
    }
  } catch { /* storage indisponível */ }
  return null
}

function loadScript (src) {
  const el = document.createElement('script')
  el.async = true
  el.src = src
  document.head.append(el)
}

function loadAnalytics () {
  if (loaded || !analyticsConfigured()) {
    return
  }
  loaded = true
  const { ga4Id, metaPixelId } = c.analytics
  if (ga4Id) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', ga4Id, { anonymize_ip: true, send_page_view: false })
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`)
  }
  if (metaPixelId) {
    if (!window.fbq) {
      const q = function () {
        q.callMethod ? q.callMethod.apply(q, arguments) : q.queue.push(arguments)
      }
      q.queue = []
      q.loaded = true
      q.version = '2.0'
      q.push = q
      window.fbq = window._fbq = q
      loadScript('https://connect.facebook.net/en_US/fbevents.js')
    }
    window.fbq('init', metaPixelId)
  }
  trackPageView()
}

function clearTrackingCookies () {
  const host = location.hostname
  for (const part of document.cookie.split(';')) {
    const name = part.split('=')[0].trim()
    if (/^(_ga|_gid|_gcl|_fbp|_fbc)/.test(name)) {
      for (const domain of ['', `; domain=${host}`, `; domain=.${host.replace(/^www\./, '')}`]) {
        // eslint-disable-next-line unicorn/no-document-cookie
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`
      }
    }
  }
}

export function initConsent () {
  if (!analyticsConfigured()) {
    return
  }
  const stored = readStored()
  if (stored) {
    consent.decided = true
    consent.analytics = stored.analytics
    if (stored.analytics) {
      loadAnalytics()
    }
  } else {
    consent.bannerOpen = true
  }
}

export function setConsent (analytics) {
  consent.decided = true
  consent.analytics = analytics
  consent.bannerOpen = false
  try {
    localStorage.setItem(KEY, JSON.stringify({ analytics, date: new Date().toISOString() }))
  } catch { /* ignora */ }
  if (analytics) {
    loadAnalytics()
  } else {
    clearTrackingCookies()
  }
}

export function openCookiePreferences () {
  consent.bannerOpen = true
}

export function trackPageView () {
  if (!loaded || !consent.analytics) {
    return
  }
  const path = location.pathname + location.search
  window.gtag?.('event', 'page_view', { page_path: path, page_title: document.title })
  window.fbq?.('track', 'PageView')
}

/** Eventos de conversão: só disparam se a pessoa aceitou os cookies de medição. */
export function track (name, params = {}) {
  if (!loaded || !consent.analytics) {
    return
  }
  window.gtag?.('event', name, params)
  if (name === 'whatsapp_click') {
    window.fbq?.('track', 'Contact')
  } else if (name === 'quiz_complete') {
    window.fbq?.('track', 'Lead')
  } else {
    window.fbq?.('trackCustom', name, params)
  }
}
