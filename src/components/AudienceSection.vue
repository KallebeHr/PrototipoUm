<script setup>
  import { computed } from 'vue'
  import { quizAvailable, visibleProducts } from '../composables/useOffers'
  import { siteConfig as c, whatsappUrl } from '../config/siteConfig'

  const cards = computed(() => (c.audience?.cards || []).map(card => {
    let href = card.primary.href
    // Sem questionário ativo, o caminho do cliente cai no formulário de contato.
    if (href === '/ajuda' && !quizAvailable()) href = card.primary.fallbackHref || '#contato'
    // Sem produtos ativos, o caminho do advogado não aponta para uma vitrine vazia.
    if (href === '#produtos' && visibleProducts('site').length === 0) href = '#contato'
    return { ...card, primaryHref: href, whatsapp: whatsappUrl(card.secondary.message) }
  }))
</script>

<template>
  <section
    v-if="c.audience?.enabled && cards.length"
    id="para-voce"
    aria-labelledby="audience-title"
    class="content-section audience"
  >
    <header class="audience-head">
      <p class="eyebrow">{{ c.audience.eyebrow }}</p>
      <h2 id="audience-title">{{ c.audience.title }}</h2>
      <p class="audience-lead">{{ c.audience.description }}</p>
    </header>

    <div class="audience-grid">
      <article
        v-for="(card, index) in cards"
        :key="card.id"
        v-reveal="{ delay: index * 110 }"
        class="audience-card"
        :class="{ 'audience-card--dark': card.dark }"
      >
        <span aria-hidden="true" class="audience-icon"><i class="mdi" :class="card.icon" /></span>
        <p class="audience-tag">{{ card.tag }}</p>
        <h3>{{ card.title }}</h3>
        <p class="audience-text">{{ card.text }}</p>
        <div class="audience-actions">
          <a class="audience-btn" :data-label="card.id" data-track="audience_click" :href="card.primaryHref">
            {{ card.primary.label }} <i aria-hidden="true" class="mdi mdi-arrow-right" />
          </a>
          <a
            class="audience-link"
            :data-label="card.id"
            :href="card.whatsapp"
            rel="noopener"
            target="_blank"
          >
            {{ card.secondary.label }} <i aria-hidden="true" class="mdi mdi-arrow-top-right" />
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.audience-head { max-width: 640px; margin-bottom: 30px; }
.audience-head .eyebrow { text-transform: uppercase; }
.audience-head h2 { margin-bottom: 10px; }
.audience-lead { color: #59656d; margin: 0; }
.audience-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; }

.audience-card {
  position: relative; overflow: hidden; isolation: isolate;
  display: flex; flex-direction: column; gap: 10px;
  padding: clamp(24px, 3.2vw, 38px);
  border: 1px solid #e6dfd3; border-radius: 18px; background: #fff;
  transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
}
.audience-card::after {
  content: ''; position: absolute; z-index: -1; right: -70px; top: -70px; width: 200px; height: 200px;
  border-radius: 50%; background: var(--color-secondary); opacity: .07;
  transition: transform .6s ease;
}
.audience-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px #39291a1f; border-color: var(--color-primary); }
.audience-card:hover::after { transform: scale(1.25); }

.audience-icon {
  width: 52px; height: 52px; display: grid; place-items: center; border-radius: 14px;
  background: var(--color-surface-soft); color: var(--color-primary); font-size: 1.7rem;
  transition: transform .3s ease;
}
.audience-card:hover .audience-icon { transform: rotate(-6deg) scale(1.06); }
.audience-tag { margin: 6px 0 0; font-size: .7rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; color: var(--color-primary); }
.audience-card h3 { font: 400 clamp(1.3rem, 2.4vw, 1.65rem)/1.25 Georgia, serif; margin: 0; }
.audience-text { margin: 0 0 8px; color: #59656d; font-size: .95rem; line-height: 1.75; max-width: 52ch; }

.audience-actions { margin-top: auto; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px; }
.audience-btn {
  display: inline-flex; align-items: center; gap: 10px; min-height: 46px; padding: 10px 22px;
  border-radius: 999px; background: var(--color-primary); color: #fff; font-weight: 500; font-size: .9rem;
  transition: background .2s, gap .2s;
}
.audience-btn:hover { background: var(--color-primary-dark); color: #fff; gap: 14px; }
.audience-link { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; font-size: .88rem; font-weight: 500; color: var(--color-primary); }
.audience-link:hover { text-decoration: underline; }

/* Cartão para advogados: mesma linguagem visual do restante, em tom escuro */
.audience-card--dark { background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary)); color: #fff; border-color: transparent; }
.audience-card--dark::after { background: var(--color-accent); opacity: .12; }
.audience-card--dark .audience-icon { background: #ffffff1f; color: var(--color-accent); }
.audience-card--dark .audience-tag { color: var(--color-accent); }
.audience-card--dark .audience-text { color: #f2e9de; }
.audience-card--dark .audience-btn { background: #fff; color: var(--color-primary-dark); }
.audience-card--dark .audience-btn:hover { background: var(--color-secondary); color: #1d130c; }
.audience-card--dark .audience-link { color: #fff; }
.audience-card--dark:hover { border-color: transparent; }

@media (max-width: 800px) {
  .audience-grid { grid-template-columns: 1fr; }
  .audience-btn { width: 100%; justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .audience-card, .audience-icon, .audience-card::after, .audience-btn { transition: none; }
  .audience-card:hover, .audience-card:hover .audience-icon, .audience-card:hover::after { transform: none; }
}
:global(.accessible-contrast) .audience-card { background: #000 !important; border: 2px solid #fff; color: #fff !important; }
:global(.accessible-contrast) .audience-card h3, :global(.accessible-contrast) .audience-text, :global(.accessible-contrast) .audience-tag { color: #fff !important; }
:global(.accessible-contrast) .audience-btn { background: #ffeb3b !important; color: #000 !important; }
:global(.accessible-contrast) .audience-link { color: #ffeb3b !important; }
</style>
