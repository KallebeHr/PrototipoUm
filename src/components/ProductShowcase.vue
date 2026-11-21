<script setup>
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
  import { discountInfo, isExternal, salesPageEnabled, salesPagePath, visibleProducts } from '../composables/useOffers'
  import { siteConfig as c } from '../config/siteConfig'

  const props = defineProps({
    variant: { type: String, default: 'site' },
  })

  const all = computed(() => visibleProducts(props.variant))
  // Filtros por público (só aparecem quando há produtos de mais de um público).
  const LABELS = { advogados: 'Para advogados', clientes: 'Para você' }
  const filter = ref('todos')
  const audiences = computed(() => [...new Set(all.value.map(item => item.audience).filter(Boolean))])
  const showFilters = computed(() => props.variant === 'site' && audiences.value.length > 1)
  const items = computed(() => (showFilters.value && filter.value !== 'todos'
    ? all.value.filter(item => item.audience === filter.value)
    : all.value))
  const isBio = computed(() => props.variant === 'bio')
  const discount = computed(() => discountInfo())
  const failed = ref(new Set())

  function imageFailed (src) {
    failed.value = new Set([...failed.value, src])
  }
  function hasImage (item) {
    return Boolean(item.image) && !failed.value.has(item.image)
  }

  // ---- Animação de entrada guiada (só dispara quando o item aparece na tela) ----
  // Ordem de leitura: selo → título → traço → descrição → botão → banner → desconto.
  const ready = ref(false)
  const seen = ref(new Set())
  let observer = null

  function markSeen (key) {
    if (!seen.value.has(key)) seen.value = new Set([...seen.value, key])
  }
  function observe (el, key) {
    if (!el || !observer || seen.value.has(key)) return
    el.dataset.key = key
    observer.observe(el)
  }

  onMounted(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return // fica tudo visível, sem animar
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          markSeen(entry.target.dataset.key)
          observer.unobserve(entry.target)
        }
      }
    }, { threshold: 0.25 })
    ready.value = true
  })
  onBeforeUnmount(() => observer && observer.disconnect())
</script>

<template>
  <section
    v-if="items.length > 0"
    :id="isBio ? 'bio-produtos' : 'produtos'"
    aria-labelledby="products-title"
    class="products"
    :class="{ 'products--bio': isBio, 'content-section': !isBio, 'is-ready': ready }"
  >
    <header class="products-head">
      <p v-if="c.products.eyebrow && !isBio" class="eyebrow">{{ c.products.eyebrow }}</p>
      <h2 id="products-title">{{ c.products.title }}</h2>
      <p v-if="c.products.description && !isBio" class="products-lead">{{ c.products.description }}</p>
    </header>

    <div v-if="showFilters" aria-label="Filtrar por público" class="products-filters" role="group">
      <button
        class="products-chip"
        :class="{ 'is-active': filter === 'todos' }"
        :aria-pressed="filter === 'todos'"
        type="button"
        @click="filter = 'todos'"
      >Todos</button>
      <button
        v-for="a in audiences"
        :key="a"
        class="products-chip"
        :class="{ 'is-active': filter === a }"
        :aria-pressed="filter === a"
        type="button"
        @click="filter = a"
      >{{ LABELS[a] || a }}</button>
    </div>

    <ul class="products-list">
      <li
        v-for="item in items"
        :key="item.key"
        :ref="el => observe(el, item.key)"
        class="product-item"
        :class="{ 'is-visible': seen.has(item.key) }"
      >
        <article class="product-row">
          <!-- Texto (esquerda no PC) -->
          <div class="product-body">
            <span v-if="item.badge" class="product-badge a-step" style="--i: 0">{{ item.badge }}</span>
            <h3 class="a-step" style="--i: 1">{{ item.title }}</h3>
            <span aria-hidden="true" class="product-rule" />
            <p v-if="item.description && !isBio" class="product-desc a-step" style="--i: 3">{{ item.description }}</p>
            <p v-if="item.price" class="product-price a-step" style="--i: 4">{{ item.price }}</p>
            <a
              :aria-label="`${item.buttonLabel || 'Saiba mais'} sobre ${item.title}${isExternal(item.href) ? ' (abre em nova aba)' : ''}`"
              class="product-button a-step"
              :data-label="item.title"
              data-track="product_click"
              :href="item.href"
              :rel="isExternal(item.href) ? 'noopener noreferrer' : undefined"
              style="--i: 5"
              :target="isExternal(item.href) ? '_blank' : undefined"
            >
              {{ item.buttonLabel || 'Saiba mais' }}
              <i aria-hidden="true" class="mdi mdi-arrow-right" />
            </a>
          </div>

          <!-- Banner (direita no PC, em cima no mobile) — proporção preservada, nunca cortado -->
          <div class="product-media">
            <img
              v-if="hasImage(item)"
              :alt="item.imageAlt || ''"
              class="product-art"
              height="480"
              loading="lazy"
              :src="item.image"
              width="1200"
              @error="imageFailed(item.image)"
            >
            <div v-else aria-hidden="true" class="product-art product-art--fallback">
              <i class="mdi mdi-star-four-points-outline" />
            </div>
            <span v-if="discount.active && !isBio" class="product-off">-{{ discount.percent }}%</span>
          </div>
        </article>
      </li>
    </ul>

    <a v-if="salesPageEnabled() && !isBio" class="products-all" data-track="products_page_open" :href="salesPagePath()">
      Ver a página completa<i aria-hidden="true" class="mdi mdi-arrow-right" />
    </a>
  </section>
</template>

<style scoped>
.products-head { margin-bottom: 24px; }
.products-head h2 { margin-bottom: 8px; }
.products-lead { color: #59656d; max-width: 620px; margin: 0; }
.products-filters { display: flex; flex-wrap: wrap; gap: 8px; margin: -8px 0 20px; }
.products-chip { min-height: 40px; padding: 8px 18px; border: 1.5px solid #d9d1c4; border-radius: 999px; font-size: .84rem; font-weight: 500; color: var(--color-primary); transition: background .2s, color .2s, border-color .2s; }
.products-chip:hover { background: var(--color-surface-soft); }
.products-chip.is-active { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }

/* Lista em largura total: sem borda, sem fundo, sem sombra — é uma faixa da página, não um card */
.products-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 40px; grid-template-columns: 1fr; }
.product-item { container-type: inline-size; min-width: 0; width: 100%; }

.product-row { position: relative; display: grid; grid-template-columns: minmax(0, 1fr); gap: 18px; }

/* ---- Banner: proporção 1200x480 preservada, sem corte ---- */
.product-media { position: relative; order: -1; line-height: 0; }
.product-art {
  display: block; width: 100%; height: auto;
  aspect-ratio: 1200 / 480;
  object-fit: contain; /* segurança extra: nunca corta */
  border-radius: 14px;
  background: var(--color-primary-dark);
}
.product-art--fallback { display: grid; place-items: center; font-size: 3rem; line-height: 1; color: var(--color-accent); background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary)); }
.product-off {
  position: absolute; top: 12px; right: 12px;
  padding: 5px 11px; border-radius: 999px; line-height: 1.2;
  background: var(--color-accent); color: var(--color-primary-dark);
  font-weight: 700; font-size: .82rem; box-shadow: 0 6px 16px #0003;
}

/* ---- Texto ---- */
.product-body { display: grid; gap: 12px; justify-items: start; align-content: center; color: #2a2018; }
.product-badge { padding: 4px 12px; border-radius: 999px; background: var(--color-secondary); color: #fff; font-size: .68rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.product-body h3 { margin: 0; font-size: clamp(1.4rem, 1.4vw + 1rem, 2.1rem); font-weight: 700; line-height: 1.12; color: var(--color-primary-dark); text-wrap: balance; }
.product-rule { display: block; width: 56px; height: 3px; border-radius: 3px; background: var(--color-accent); transform-origin: left; }
.product-desc { margin: 0; font-size: 1rem; line-height: 1.6; color: #59656d; max-width: 46ch; }
.product-price { margin: 0; font-weight: 700; color: var(--color-primary); }
.product-button {
  display: inline-flex; align-items: center; gap: 10px; min-height: 46px; margin-top: 6px;
  padding: 10px 24px; border-radius: 999px;
  background: var(--color-primary); color: #fff; font-weight: 500; font-size: .92rem;
  transition: background .2s, gap .2s;
}
/* Torna a faixa inteira clicável sem duplicar links */
.product-button::after { content: ''; position: absolute; inset: 0; z-index: 1; }
.product-button:hover, .product-row:hover .product-button { background: var(--color-secondary); gap: 14px; }
.product-button:focus-visible { outline-color: var(--color-primary); outline-offset: 3px; }

.products-all { display: inline-flex; align-items: center; gap: 8px; margin-top: 24px; min-height: 44px; font-weight: 500; color: var(--color-primary); transition: gap .2s; }
.products-all:hover { gap: 14px; }

/* ---- Largo (PC): texto à esquerda, banner à direita, ocupando toda a horizontal ---- */
@container (min-width: 700px) {
  .product-row { grid-template-columns: minmax(280px, 4fr) minmax(0, 8fr); align-items: center; gap: clamp(24px, 4vw, 64px); }
  .product-body { grid-column: 1; grid-row: 1; }
  .product-media { grid-column: 2; grid-row: 1; order: 0; }
  .product-off { top: 16px; right: 16px; }
}

/* ---- Animação didática: o olho é guiado na ordem de leitura ----
   1 selo → 2 título → 3 traço desenhado → 4 descrição → 5 botão → 6 banner entra → 7 desconto "salta".
   Só ativa quando o JS carregou (.is-ready) e o usuário não pediu menos movimento. */
@media (prefers-reduced-motion: no-preference) {
  .is-ready .product-item:not(.is-visible) .a-step { opacity: 0; transform: translateY(16px); }
  .is-ready .a-step { transition: opacity .55s ease, transform .55s cubic-bezier(.2,.7,.2,1); transition-delay: calc(var(--i) * 110ms); }
  .is-ready .product-button.a-step { transition: opacity .55s ease, transform .55s cubic-bezier(.2,.7,.2,1), background .2s, gap .2s; transition-delay: calc(var(--i) * 110ms), calc(var(--i) * 110ms), 0s, 0s; }

  .is-ready .product-item:not(.is-visible) .product-rule { transform: scaleX(0); }
  .is-ready .product-rule { transition: transform .6s ease .38s; }

  .is-ready .product-item:not(.is-visible) .product-media { opacity: 0; transform: translateX(48px); }
  .is-ready .product-media { transition: opacity .7s ease .5s, transform .8s cubic-bezier(.2,.7,.2,1) .5s; }

  .is-ready .product-item:not(.is-visible) .product-off { opacity: 0; transform: scale(.4); }
  .is-ready .product-off { transition: opacity .3s ease 1.1s, transform .5s cubic-bezier(.34,1.56,.64,1) 1.1s; }

  /* Depois de revelado, a seta do botão dá uma única "cutucada" chamando para o clique */
  .product-item.is-visible .product-button .mdi { animation: arrow-nudge .8s ease 1.5s 2; }
  @keyframes arrow-nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(6px); } }

  /* Mobile: o banner vem primeiro, então sobe em vez de deslizar de lado */
  @container (max-width: 699px) {
    .is-ready .product-item:not(.is-visible) .product-media { transform: translateY(24px); }
  }
}

/* ---- Versão compacta na bio ---- */
.products--bio { margin-top: 28px; }
.products--bio .products-head { margin-bottom: 14px; }
.products--bio .products-head h2 { font-size: .93rem; font-weight: 500; letter-spacing: 0; }
.products--bio .products-list { gap: 20px; }
.products--bio .product-row { gap: 12px; }
.products--bio .product-art { border-radius: 12px; }
.products--bio .product-body h3 { font-size: 1.1rem; }
.products--bio .product-button { min-height: 40px; padding: 8px 16px; font-size: .78rem; }

:global(.accessible-contrast) .products-chip { background: #000 !important; color: #fff !important; border-color: #fff !important; }
:global(.accessible-contrast) .products-chip.is-active { background: #ffeb3b !important; color: #000 !important; }
:global(.accessible-contrast) .product-body h3,
:global(.accessible-contrast) .product-desc,
:global(.accessible-contrast) .product-price { color: #000 !important; }
:global(.accessible-contrast) .product-button { background: #ffeb3b !important; color: #000 !important; border: 2px solid #000; }
</style>