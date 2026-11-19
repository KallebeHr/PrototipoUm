<script setup>
  import { nextTick, ref, watch } from 'vue'
  import { consent, setConsent } from '../composables/useConsent'
  import { siteConfig as c } from '../config/siteConfig'

  const box = ref(null)
  watch(() => consent.bannerOpen, async open => {
    if (open) {
      await nextTick()
      box.value?.focus()
    }
  })
</script>

<template>
  <Transition name="cookie">
    <section
      v-if="consent.bannerOpen"
      ref="box"
      aria-labelledby="cookie-title"
      class="cookie-banner"
      role="dialog"
      tabindex="-1"
    >
      <div class="cookie-copy">
        <h2 id="cookie-title">{{ c.analytics.bannerTitle }}</h2>
        <p>
          {{ c.analytics.bannerText }}
          <a v-if="c.privacy?.enabled" href="/privacidade">Política de Privacidade</a>
        </p>
      </div>
      <div class="cookie-actions">
        <button class="cookie-btn cookie-btn--ghost" type="button" @click="setConsent(false)">Recusar</button>
        <button class="cookie-btn" type="button" @click="setConsent(true)">Aceitar</button>
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.cookie-banner {
  position: fixed; z-index: 1200; left: 50%; bottom: max(16px, env(safe-area-inset-bottom));
  transform: translateX(-50%); width: min(760px, calc(100% - 24px));
  display: flex; align-items: center; gap: 20px; padding: 18px 22px;
  background: #fff; color: #2c3438; border: 1px solid #d9d1c4; border-radius: 16px;
  box-shadow: 0 18px 50px #1d130c33; outline: none;
}
.cookie-copy { flex: 1; min-width: 0; }
.cookie-copy h2 { font: 500 .98rem Georgia, serif; margin: 0 0 4px; }
.cookie-copy p { margin: 0; font-size: .82rem; line-height: 1.6; color: #4d575c; }
.cookie-copy a { color: var(--color-primary); text-decoration: underline; }
.cookie-actions { display: flex; gap: 10px; flex: 0 0 auto; }
.cookie-btn { min-height: 46px; padding: 10px 24px; border-radius: 999px; font-size: .86rem; font-weight: 500; background: var(--color-primary); color: #fff; border: 1.5px solid var(--color-primary); }
.cookie-btn:hover { background: var(--color-primary-dark); }
.cookie-btn--ghost { background: transparent; color: var(--color-primary); }
.cookie-btn--ghost:hover { background: var(--color-surface-soft); }
.cookie-enter-active, .cookie-leave-active { transition: opacity .3s, transform .3s; }
.cookie-enter-from, .cookie-leave-to { opacity: 0; transform: translate(-50%, 16px); }
@media (max-width: 600px) { .cookie-banner { bottom: calc(84px + env(safe-area-inset-bottom)); flex-direction: column; align-items: stretch; gap: 14px; } .cookie-actions .cookie-btn { flex: 1; } }
@media (prefers-reduced-motion: reduce) { .cookie-enter-active, .cookie-leave-active { transition: none; } }
:global(.accessible-contrast) .cookie-banner { background: #000 !important; color: #fff !important; border: 2px solid #fff; }
:global(.accessible-contrast) .cookie-copy p { color: #fff !important; }
:global(.accessible-contrast) .cookie-btn { background: #ffeb3b !important; color: #000 !important; border-color: #ffeb3b; }
</style>
