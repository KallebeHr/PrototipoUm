<script setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import { consent } from '../composables/useConsent'
  import { discountInfo, isExternal, visibleProducts } from '../composables/useOffers'
  import { siteConfig as c } from '../config/siteConfig'

  // Notificação no canto superior direito (ex.: "20% de desconto"). Tudo vem de products.toast.
  const OFF_KEY = 'aa-toast-off'
  const cfg = computed(() => c.products?.toast || {})
  const product = computed(() => visibleProducts('site')[0])
  const enabled = computed(() => Boolean(c.products?.enabled && cfg.value.enabled && product.value))
  const discount = computed(() => discountInfo())

  const visible = ref(false)
  const paused = ref(false)
  const index = ref(0)
  let shows = 0
  let stopped = false
  let startTimer
  let nextTimer
  let hideTimer

  const fill = text => String(text || '')
    .replaceAll('{percent}', discount.value.percent ?? '')
    .replaceAll('{product}', product.value?.title ?? '')
    .replaceAll('{count}', c.products?.page?.proof?.stats?.[0]?.value ?? '')
  // Mensagens com {percent} só entram enquanto houver desconto ativo.
  const messages = computed(() => (cfg.value.messages || [])
    .filter(m => discount.value.active || !String(m).includes('{percent}'))
    .map(fill).filter(Boolean))
  const message = computed(() => messages.value[index.value % Math.max(messages.value.length, 1)] || '')
  const hasDiscountChip = computed(() => discount.value.active && message.value.includes(`${discount.value.percent}%`))
  const duration = computed(() => cfg.value.durationMs ?? 7000)

  // Não interrompe: popup aberto, menu mobile aberto, aviso de cookies na tela ou aba em segundo plano.
  const blocked = () => document.hidden
    || consent.bannerOpen
    || Boolean(document.querySelector('.pp-backdrop'))
    || document.body.classList.contains('menu-is-open')

  function show () {
    if (stopped) return
    if (blocked()) {
      startTimer = setTimeout(show, 3000)
      return
    }
    visible.value = true
    shows++
    startHide()
    if (!cfg.value.maxShows || shows < cfg.value.maxShows) nextTimer = setTimeout(show, cfg.value.intervalMs ?? 20000)
  }
  function startHide () {
    clearTimeout(hideTimer)
    hideTimer = setTimeout(hide, duration.value)
  }
  function hide () {
    visible.value = false
    index.value++
  }
  function dismiss () {
    hide()
    if (cfg.value.stopWhenDismissed !== false) {
      stopped = true
      clearTimeout(nextTimer)
      try { sessionStorage.setItem(OFF_KEY, '1') } catch { /* ignora */ }
    }
  }
  function pause () {
    paused.value = true
    clearTimeout(hideTimer)
  }
  function resume () {
    paused.value = false
    if (visible.value) startHide()
  }

  onMounted(() => {
    try { if (sessionStorage.getItem(OFF_KEY)) return } catch { /* ignora */ }
    if (!enabled.value || messages.value.length === 0) return
    startTimer = setTimeout(show, cfg.value.firstDelayMs ?? 12000)
  })
  onUnmounted(() => {
    stopped = true
    clearTimeout(startTimer)
    clearTimeout(nextTimer)
    clearTimeout(hideTimer)
  })
</script>

<template>
  <Transition name="pt">
    <aside
      v-if="visible"
      aria-live="polite"
      class="pt"
      role="status"
      @focusin="pause"
      @focusout="resume"
      @mouseenter="pause"
      @mouseleave="resume"
    >
      <span aria-hidden="true" class="pt-icon" :class="{ 'pt-icon--off': hasDiscountChip }">
        <template v-if="hasDiscountChip">-{{ discount.percent }}%</template>
        <i v-else class="mdi mdi-bell-ring-outline" />
      </span>
      <div class="pt-copy">
        <p class="pt-msg">{{ message }}</p>
        <a
          class="pt-link"
          :data-label="product.title"
          data-track="toast_click"
          :href="product.href"
          :rel="isExternal(product.href) ? 'noopener noreferrer' : undefined"
          :target="isExternal(product.href) ? '_blank' : undefined"
          @click="hide"
        >{{ cfg.buttonLabel || 'Ver oferta' }} <i aria-hidden="true" class="mdi mdi-arrow-right" /></a>
      </div>
      <button aria-label="Fechar notificação" class="pt-close" type="button" @click="dismiss">
        <i aria-hidden="true" class="mdi mdi-close" />
      </button>
      <span aria-hidden="true" class="pt-bar" :class="{ 'is-paused': paused }" :style="{ animationDuration: `${duration}ms` }" />
    </aside>
  </Transition>
</template>

<style scoped>
.pt {
  position: fixed; z-index: 5500; top: max(16px, env(safe-area-inset-top)); right: max(16px, env(safe-area-inset-right));
  width: min(360px, calc(100vw - 32px)); display: flex; align-items: center; gap: 14px; overflow: hidden;
  padding: 14px 44px 16px 14px; border-radius: 16px; background: #fff; color: var(--color-text);
  border: 1px solid #e6dfd3; box-shadow: 0 16px 40px #39291a33;
}
.pt-icon { flex: 0 0 auto; width: 52px; height: 52px; display: grid; place-items: center; border-radius: 14px; background: var(--color-surface-soft); color: var(--color-primary); font-size: 1.5rem; }
.pt-icon--off { background: var(--color-secondary); color: #fff; font-size: 1rem; font-weight: 700; letter-spacing: -.02em; animation: pt-pop .6s cubic-bezier(.34, 1.56, .64, 1) .15s backwards; }
.pt-copy { min-width: 0; display: grid; gap: 2px; }
.pt-msg { margin: 0; font-size: .92rem; font-weight: 500; line-height: 1.4; }
.pt-link { display: inline-flex; align-items: center; gap: 6px; min-height: 32px; font-size: .82rem; font-weight: 700; color: var(--color-primary); }
.pt-link:hover { text-decoration: underline; }
.pt-close { position: absolute; top: 4px; right: 4px; width: 40px; height: 40px; display: grid; place-items: center; border-radius: 50%; color: #6b6259; font-size: 1.1rem; }
.pt-close:hover { background: var(--color-surface-soft); }
.pt-bar { position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; background: var(--color-secondary); transform-origin: left; animation: pt-bar linear forwards; }
.pt-bar.is-paused { animation-play-state: paused; }

.pt-enter-active, .pt-leave-active { transition: opacity .3s ease, transform .4s cubic-bezier(.22, .61, .36, 1); }
.pt-enter-from { opacity: 0; transform: translate3d(40px, 0, 0); }
.pt-leave-to { opacity: 0; transform: translate3d(24px, 0, 0); }
@keyframes pt-bar { to { transform: scaleX(0); } }
@keyframes pt-pop { from { transform: scale(.4) rotate(-12deg); opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  .pt-enter-active, .pt-leave-active { transition: opacity .2s; }
  .pt-enter-from, .pt-leave-to { transform: none; }
  .pt-icon--off, .pt-bar { animation: none; }
}
:global(.accessible-contrast) .pt { background: #000 !important; border: 2px solid #fff; color: #fff !important; }
:global(.accessible-contrast) .pt-link, :global(.accessible-contrast) .pt-close { color: #ffeb3b !important; }
</style>
