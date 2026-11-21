<script setup>
  import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
  import { consent, track } from '../composables/useConsent'
  import { discountInfo, isExternal, visibleProducts } from '../composables/useOffers'
  import { siteConfig as c } from '../config/siteConfig'

  // Aviso de produtos à venda. Regras: só na home, 1x por visitante a cada
  // `frequencyDays`, nunca por cima do aviso de cookies e sem travar a navegação.
  const KEY = 'aa-popup-produtos'
  const cfg = computed(() => c.products?.popup || {})
  const product = computed(() => visibleProducts('site')[0])
  const enabled = computed(() => Boolean(c.products?.enabled && cfg.value.enabled && product.value))

  const open = ref(false)
  const ready = ref(false) // gatilho (tempo ou rolagem) já disparou
  const dialog = ref(null)
  const imgFailed = ref(false)
  const discount = computed(() => discountInfo())
  let timer
  let lastFocus = null

  function recentlyDismissed () {
    try {
      const at = Number(localStorage.getItem(KEY))
      return at && Date.now() - at < (cfg.value.frequencyDays ?? 3) * 864e5
    } catch { return false }
  }
  function remember () {
    try { localStorage.setItem(KEY, String(Date.now())) } catch { /* modo privado: ignora */ }
  }

  function arm () {
    ready.value = true
    cleanupTriggers()
  }
  function onScroll () {
    const max = document.documentElement.scrollHeight - window.innerHeight
    if (max > 0 && window.scrollY / max * 100 >= (cfg.value.scrollPercent ?? 35)) arm()
  }
  function cleanupTriggers () {
    clearTimeout(timer)
    window.removeEventListener('scroll', onScroll)
  }

  // Abre quando o gatilho disparou E o aviso de cookies já não está na tela.
  watch([ready, () => consent.bannerOpen], async ([isReady, banner]) => {
    if (!isReady || banner || open.value || !enabled.value) return
    lastFocus = document.activeElement
    open.value = true
    track('popup_produtos_open', { page_path: window.location.pathname })
    await nextTick()
    dialog.value?.querySelector('[data-autofocus]')?.focus()
  })

  function close (remembered = true) {
    if (!open.value) return
    open.value = false
    if (remembered) remember()
    nextTick(() => lastFocus?.focus?.({ preventScroll: true }))
  }

  function onKey (event) {
    if (!open.value) return
    if (event.key === 'Escape') {
      close()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = dialog.value?.querySelectorAll('a[href], button:not([disabled])')
    if (!focusable?.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  onMounted(() => {
    if (!enabled.value || recentlyDismissed()) return
    document.addEventListener('keydown', onKey)
    timer = setTimeout(arm, cfg.value.delayMs ?? 9000)
    window.addEventListener('scroll', onScroll, { passive: true })
  })
  onUnmounted(() => {
    cleanupTriggers()
    document.removeEventListener('keydown', onKey)
  })
</script>

<template>
  <Transition name="pp">
    <div v-if="open" class="pp-backdrop" @click.self="close()">
      <div
        ref="dialog"
        aria-labelledby="pp-title"
        aria-modal="true"
        class="pp-card"
        role="dialog"
      >
        <button aria-label="Fechar aviso" class="pp-close" data-autofocus type="button" @click="close()">
          <i aria-hidden="true" class="mdi mdi-close" />
        </button>

        <div class="pp-art">
          <img
            v-if="product.image && !imgFailed"
            :alt="product.imageAlt || ''"
            height="480"
            :src="product.image"
            width="1200"
            @error="imgFailed = true"
          >
          <i v-else aria-hidden="true" class="mdi mdi-star-four-points-outline" />
          <span v-if="product.badge" class="pp-badge">{{ product.badge }}</span>
          <span v-if="discount.active" class="pp-off">-{{ discount.percent }}%</span>
        </div>

        <div class="pp-body">
          <p class="pp-eyebrow">{{ cfg.eyebrow }}</p>
          <h2 id="pp-title">{{ cfg.title }}</h2>
          <p class="pp-text">{{ cfg.text }}</p>
          <p class="pp-product"><strong>{{ product.title }}</strong><span v-if="product.price"> · {{ product.price }}</span></p>

          <div class="pp-actions">
            <a
              class="pp-btn"
              :data-label="product.title"
              data-track="popup_produtos_click"
              :href="product.href"
              :rel="isExternal(product.href) ? 'noopener noreferrer' : undefined"
              :target="isExternal(product.href) ? '_blank' : undefined"
              @click="close()"
            >
              {{ cfg.buttonLabel }} <i aria-hidden="true" class="mdi mdi-arrow-right" />
            </a>
            <a v-if="visibleProducts('site').length > 1" class="pp-link" href="#produtos" @click="close()">{{ cfg.allLabel }}</a>
            <button class="pp-link" type="button" @click="close()">{{ cfg.dismissLabel }}</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.pp-backdrop {
  position: fixed; inset: 0; z-index: 6000; display: grid; place-items: center;
  padding: max(16px, env(safe-area-inset-top)) 16px max(16px, env(safe-area-inset-bottom));
  background: #1d130c8c;
}
.pp-card {
  position: relative; width: min(520px, 100%); max-height: calc(100dvh - 32px); overflow: auto;
  border-radius: 20px; background: #fff; color: var(--color-text); box-shadow: 0 30px 80px #0000004d;
}
.pp-close {
  position: absolute; top: 10px; right: 10px; z-index: 2; width: 44px; height: 44px; display: grid; place-items: center;
  border-radius: 50%; background: #ffffffe6; color: #1d130c; font-size: 1.4rem; box-shadow: 0 2px 10px #0003;
  transition: transform .2s ease;
}
.pp-close:hover { transform: rotate(90deg); }
.pp-art { position: relative; aspect-ratio: 16 / 9; background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary)); display: grid; place-items: center; color: var(--color-accent); font-size: 3.4rem; overflow: hidden; }
.pp-art img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.pp-badge { position: absolute; left: 14px; top: 14px; padding: 4px 12px; border-radius: 999px; background: var(--color-secondary); color: #fff; font-size: .68rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.pp-off { position: absolute; right: 14px; bottom: 14px; padding: 6px 14px; border-radius: 999px; background: var(--color-accent); color: var(--color-primary-dark); font: 700 1rem Georgia, serif; box-shadow: 0 6px 16px #0003; animation: pp-pop .6s cubic-bezier(.34, 1.56, .64, 1) .4s backwards; }
@keyframes pp-pop { from { transform: scale(.3) rotate(-14deg); opacity: 0; } }
.pp-body { padding: 24px 26px 26px; display: grid; gap: 8px; }
.pp-eyebrow { margin: 0; font-size: .7rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; color: var(--color-primary); }
.pp-body h2 { font: 400 clamp(1.4rem, 4vw, 1.75rem)/1.2 Georgia, serif; margin: 0; letter-spacing: -.01em; }
.pp-text { margin: 0; color: #59656d; font-size: .95rem; line-height: 1.7; }
.pp-product { margin: 4px 0 0; font-size: .92rem; }
.pp-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 18px; margin-top: 10px; }
.pp-btn { display: inline-flex; align-items: center; gap: 10px; min-height: 48px; padding: 12px 24px; border-radius: 999px; background: var(--color-primary); color: #fff; font-weight: 500; font-size: .92rem; transition: background .2s, gap .2s; }
.pp-btn:hover { background: var(--color-primary-dark); color: #fff; gap: 14px; }
.pp-link { min-height: 44px; display: inline-flex; align-items: center; font-size: .86rem; color: var(--color-primary); font-weight: 500; }
.pp-link:hover { text-decoration: underline; }

/* Entrada/saída: só opacity e transform */
.pp-enter-active, .pp-leave-active { transition: opacity .3s ease; }
.pp-enter-active .pp-card, .pp-leave-active .pp-card { transition: transform .35s cubic-bezier(.22, .61, .36, 1), opacity .3s ease; }
.pp-enter-from, .pp-leave-to { opacity: 0; }
.pp-enter-from .pp-card { transform: translateY(24px) scale(.97); }
.pp-leave-to .pp-card { transform: translateY(12px) scale(.98); }

@media (prefers-reduced-motion: reduce) {
  .pp-enter-active, .pp-leave-active, .pp-enter-active .pp-card, .pp-leave-active .pp-card, .pp-close, .pp-btn { transition: none; }
  .pp-close:hover { transform: none; }
  .pp-off { animation: none; }
}
:global(.accessible-contrast) .pp-card { background: #000 !important; border: 2px solid #fff; color: #fff !important; }
:global(.accessible-contrast) .pp-text, :global(.accessible-contrast) .pp-body h2, :global(.accessible-contrast) .pp-eyebrow, :global(.accessible-contrast) .pp-product { color: #fff !important; }
:global(.accessible-contrast) .pp-btn { background: #ffeb3b !important; color: #000 !important; }
:global(.accessible-contrast) .pp-link { color: #ffeb3b !important; }
</style>
