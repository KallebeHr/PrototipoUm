<script setup>
  import { computed, ref } from 'vue'
  import { isExternal, visibleProducts } from '../composables/useOffers'
  import { siteConfig as c } from '../config/siteConfig'

  const props = defineProps({
    // 'site' = seção completa; 'bio' = versão compacta do link na bio
    variant: { type: String, default: 'site' },
  })

  const items = computed(() => visibleProducts(props.variant))
  const isBio = computed(() => props.variant === 'bio')
  const failed = ref(new Set())

  function imageFailed (src) {
    failed.value = new Set([...failed.value, src])
  }
  function hasImage (item) {
    return Boolean(item.image) && !failed.value.has(item.image)
  }
</script>

<template>
  <section
    v-if="items.length > 0"
    :id="isBio ? 'bio-produtos' : 'produtos'"
    aria-labelledby="products-title"
    class="products"
    :class="{ 'products--bio': isBio, 'content-section': !isBio }"
  >
    <header class="products-head">
      <p v-if="c.products.eyebrow && !isBio" class="eyebrow">{{ c.products.eyebrow }}</p>
      <h2 id="products-title">{{ c.products.title }}</h2>
      <p v-if="c.products.description && !isBio" class="products-lead">{{ c.products.description }}</p>
    </header>

    <ul class="products-list" :class="{ 'products-list--pair': items.length > 1 && !isBio }">
      <li v-for="item in items" :key="item.key" class="product-card">
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

        <div aria-hidden="true" class="product-shade" />

        <span v-if="item.badge" class="product-badge">{{ item.badge }}</span>

        <div class="product-body">
          <h3>{{ item.title }}</h3>
          <p v-if="item.description && !isBio" class="product-desc">{{ item.description }}</p>
          <p v-if="item.price" class="product-price">{{ item.price }}</p>
          <a
            :aria-label="`${item.buttonLabel || 'Saiba mais'} sobre ${item.title}${isExternal(item.href) ? ' (abre em nova aba)' : ''}`"
            class="product-button"
            :data-label="item.title"
            data-track="product_click"
            :href="item.href"
            :rel="isExternal(item.href) ? 'noopener noreferrer' : undefined"
            :target="isExternal(item.href) ? '_blank' : undefined"
          >
            {{ item.buttonLabel || 'Saiba mais' }}
            <i aria-hidden="true" class="mdi mdi-arrow-right" />
          </a>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.products-head { margin-bottom: 28px; }
.products-head h2 { margin-bottom: 8px; }
.products-lead { color: #59656d; max-width: 620px; margin: 0; }
.products-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 20px; grid-template-columns: 1fr; }
.products-list--pair { grid-template-columns: repeat(2, minmax(0, 1fr)); }

.product-card {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: 16px;
  min-height: 220px;
  aspect-ratio: 5 / 2;
  display: flex;
  align-items: flex-end;
  background: var(--color-primary-dark);
  color: #fff;
  box-shadow: 0 14px 38px #39291a1f;
  transition: transform .3s ease, box-shadow .3s ease;
}
.product-card:hover, .product-card:focus-within { transform: translateY(-4px); box-shadow: 0 20px 46px #39291a33; }

.product-art { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; transition: transform .6s ease; }
.product-card:hover .product-art { transform: scale(1.04); }
.product-art--fallback {
  display: grid; place-items: center;
  background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
  font-size: 4rem; color: var(--color-accent); opacity: .9;
}
.product-shade { position: absolute; inset: 0; z-index: -1; background: linear-gradient(180deg, transparent 20%, #1d130cd9 100%); }

.product-badge {
  position: absolute; top: 14px; left: 14px;
  padding: 4px 12px; border-radius: 999px;
  background: var(--color-secondary); color: #1d130c;
  font-size: .68rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
}
.product-body { width: 100%; padding: 22px 24px; display: grid; gap: 8px; justify-items: start; }
.product-body h3 { font: 400 clamp(1.3rem, 2.4vw, 1.8rem)/1.2 Georgia, 'Times New Roman', serif; overflow-wrap: anywhere; }
.product-desc { margin: 0; font-size: .9rem; color: #f2e9de; max-width: 52ch; }
.product-price { margin: 0; font-weight: 700; color: var(--color-accent); }
.product-button {
  display: inline-flex; align-items: center; gap: 10px; min-height: 44px;
  padding: 10px 20px; border-radius: 999px;
  background: #fff; color: var(--color-primary-dark); font-weight: 500; font-size: .88rem;
  transition: background .2s, gap .2s, color .2s;
}
/* Torna o card inteiro clicável sem duplicar links */
.product-button::after { content: ''; position: absolute; inset: 0; z-index: 1; }
.product-button:hover, .product-card:hover .product-button { background: var(--color-secondary); color: #1d130c; gap: 14px; }
.product-button:focus-visible { outline-color: #fff; }

/* Versão compacta na bio */
.products--bio { margin-top: 28px; }
.products--bio .products-head { margin-bottom: 14px; }
.products--bio .products-head h2 { font-size: .93rem; font-weight: 500; letter-spacing: 0; }
.products--bio .products-list { gap: 12px; }
.products--bio .product-card { min-height: 148px; aspect-ratio: auto; border-radius: 12px; }
.products--bio .product-body { padding: 14px 16px; gap: 6px; }
.products--bio .product-body h3 { font-size: 1.1rem; }
.products--bio .product-button { min-height: 40px; padding: 8px 16px; font-size: .78rem; }
.products--bio .product-badge { top: 10px; left: 10px; font-size: .6rem; }

@media (max-width: 800px) {
  .products-list--pair { grid-template-columns: 1fr; }
  .product-card { min-height: 200px; aspect-ratio: auto; }
  .product-body { padding: 18px 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .product-card, .product-art, .product-button { transition: none; }
  .product-card:hover { transform: none; }
  .product-card:hover .product-art { transform: none; }
}
:global(.accessible-contrast) .product-card { background: #000 !important; border: 2px solid #fff; }
:global(.accessible-contrast) .product-body h3,
:global(.accessible-contrast) .product-desc { color: #fff !important; }
:global(.accessible-contrast) .product-button { background: #ffeb3b !important; color: #000 !important; }
</style>
