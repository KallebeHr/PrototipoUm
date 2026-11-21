<script setup>
  import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
  import { discountInfo, formatMoney, isExternal, visibleProducts, whatsappLink } from '../composables/useOffers'
  import { siteConfig as c } from '../config/siteConfig'
  import AccessibilityMenu from './AccessibilityMenu.vue'
  import FooterSection from './FooterSection.vue'

  // Página de vendas (rota /produtos). Todo o conteúdo vem de products.page / products.discount.
  const page = computed(() => c.products.page)
  const all = computed(() => visibleProducts('site'))
  const product = computed(() => all.value[0])
  const others = computed(() => all.value.slice(1))
  const discount = computed(() => discountInfo())
  const buyExternal = computed(() => isExternal(product.value?.buyHref || ''))
  const wa = computed(() => whatsappLink(c.contact.whatsapp, c.conversion?.sectionMessages?.produtos || `Olá! Tenho uma dúvida sobre o ${product.value?.title}.`))

  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const title = ref(null)
  let raf
  const timers = []

  // ── Números que "sobem" (prova social) e preço que "cai" (efeito de desconto)
  function tween (from, to, ms, cb) {
    if (reduced) { cb(to); return }
    const t0 = performance.now()
    const step = now => {
      const k = Math.min(1, (now - t0) / ms)
      cb(from + (to - from) * (1 - (1 - k) ** 3))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
  }
  const stats = computed(() => page.value.proof?.stats || [])
  const statShown = ref([])
  const price = computed(() => {
    const now = Number(product.value?.priceValue) || 0
    const old = Number(product.value?.oldPriceValue) || 0
    return { now, old: old > now ? old : 0, has: now > 0 }
  })
  const priceShown = ref(0)
  const priceStarted = ref(false)
  function startPrice () {
    if (priceStarted.value || !price.value.has) return
    priceStarted.value = true
    tween(price.value.old || price.value.now, price.value.now, 1400, v => { priceShown.value = v })
  }

  // ── Contagem regressiva (só quando discount.endsAt for uma data futura válida)
  const now = ref(Date.now())
  const left = computed(() => {
    const end = discount.value.endsAt
    if (!end) return null
    const diff = Math.max(0, end.getTime() - now.value)
    return { d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60 }
  })
  const pad = n => String(n).padStart(2, '0')

  // ── Método didático: abas com avanço automático (para ao interagir)
  const active = ref(0)
  const manual = ref(false)
  const steps = computed(() => page.value.steps || [])
  function pick (i) { manual.value = true; active.value = i }
  function onTabKey (event) {
    const n = steps.value.length
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? n - 1 : (active.value + (event.key === 'ArrowRight' ? 1 : -1) + n) % n
    pick(next)
    nextTick(() => document.getElementById(`sp-tab-${next}`)?.focus())
  }

  // ── Cupom
  const copied = ref(false)
  async function copyCoupon () {
    const code = discount.value.coupon
    try { await navigator.clipboard.writeText(code) } catch {
      const t = document.createElement('textarea')
      t.value = code
      document.body.append(t)
      t.select()
      document.execCommand('copy')
      t.remove()
    }
    copied.value = true
    timers.push(setTimeout(() => { copied.value = false }, 2200))
  }

  // ── Barra de compra fixa (aparece depois do botão principal sair da tela)
  const heroCta = ref(null)
  const bar = ref(false)
  let io

  onMounted(() => {
    title.value?.focus({ preventScroll: true })
    statShown.value = stats.value.map(s => (reduced ? s.value : 0))
    priceShown.value = reduced ? price.value.now : (price.value.old || price.value.now)

    io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.target === heroCta.value) bar.value = !e.isIntersecting && e.boundingClientRect.top < 0
        if (!e.isIntersecting) continue
        if (e.target.dataset.spStats !== undefined) {
          stats.value.forEach((s, i) => tween(0, s.value, 1600, v => { statShown.value[i] = Math.round(v) }))
          io.unobserve(e.target)
        }
        if (e.target.dataset.spPrice !== undefined) {
          startPrice()
          io.unobserve(e.target)
        }
      }
    }, { threshold: 0.35 })
    for (const el of document.querySelectorAll('[data-sp-stats], [data-sp-price]')) io.observe(el)
    if (heroCta.value) io.observe(heroCta.value)

    if (discount.value.endsAt) timers.push(setInterval(() => { now.value = Date.now() }, 1000))
    timers.push(setInterval(() => {
      if (!manual.value && !document.hidden && steps.value.length) active.value = (active.value + 1) % steps.value.length
    }, 6500))
  })
  onUnmounted(() => {
    cancelAnimationFrame(raf)
    io?.disconnect()
    for (const t of timers) { clearTimeout(t); clearInterval(t) }
  })
</script>

<template>
  <a class="skip-link" href="#sp-main">Pular para o conteúdo</a>
  <header class="sp-top">
    <div class="sp-wrap sp-top-in">
      <a aria-label="Voltar ao site do escritório" class="sp-brand" href="/">
        <img v-if="c.brand.logo" alt="" height="36" :src="c.brand.logo" width="36">
        <span>{{ c.brand.shortName }}</span>
      </a>
      <nav aria-label="Navegação" class="sp-nav">
        <a class="sp-nav-back" href="/"><i aria-hidden="true" class="mdi mdi-arrow-left" /> Voltar ao site</a>
        <a
          v-if="product"
          class="sp-btn sp-btn--sm"
          data-track="buy_click"
          :href="product.buyHref"
          :rel="buyExternal ? 'noopener noreferrer' : undefined"
          :target="buyExternal ? '_blank' : undefined"
        >{{ discount.active ? `${discount.percent}% OFF` : 'Comprar' }}</a>
      </nav>
    </div>
  </header>

  <main v-if="product" id="sp-main" tabindex="-1">
    <!-- ───────── HERO ───────── -->
    <section class="sp-hero">
      <div aria-hidden="true" class="sp-orb sp-orb--a" /><div aria-hidden="true" class="sp-orb sp-orb--b" />
      <div class="sp-wrap sp-hero-grid">
        <div class="sp-hero-copy">
          <p class="sp-eyebrow sp-in" style="--d: 0ms">{{ page.eyebrow }}</p>
          <h1 ref="title" class="sp-in" style="--d: 90ms" tabindex="-1">{{ page.title }}</h1>
          <p class="sp-lead sp-in" style="--d: 180ms">{{ page.lead }}</p>

          <div class="sp-actions sp-in" style="--d: 270ms">
            <a
              ref="heroCta"
              class="sp-btn sp-btn--shine"
              data-track="buy_click"
              :href="product.buyHref"
              :rel="buyExternal ? 'noopener noreferrer' : undefined"
              :target="buyExternal ? '_blank' : undefined"
            >{{ page.buyLabel }} <i aria-hidden="true" class="mdi mdi-arrow-right" /></a>
            <a class="sp-btn sp-btn--ghost" :href="wa" rel="noopener noreferrer" target="_blank">
              <i aria-hidden="true" class="mdi mdi-whatsapp" /> {{ page.questionsLabel }}<span class="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
          <ul class="sp-chips sp-in" style="--d: 360ms"><li v-for="chip in page.chips" :key="chip"><i aria-hidden="true" class="mdi mdi-check-circle-outline" /> {{ chip }}</li></ul>
        </div>

        <div class="sp-hero-art sp-in" style="--d: 200ms">
          <div class="sp-cover">
            <img v-if="product.image" :alt="product.imageAlt || product.title" height="941" :src="product.image" width="1672">
            <div v-else aria-hidden="true" class="sp-cover-fb"><i class="mdi mdi-star-four-points-outline" /></div>
          </div>
          <div v-if="discount.active" aria-hidden="true" class="sp-stamp"><strong>-{{ discount.percent }}%</strong><span>{{ discount.label }}</span></div>
        </div>
      </div>
    </section>

    <!-- ───────── PROVA SOCIAL ───────── -->
    <section v-if="stats.length" aria-label="Números do curso" class="sp-proof" data-sp-stats>
      <ul class="sp-wrap sp-stats">
        <li v-for="(s, i) in stats" :key="s.label" v-reveal="{ delay: i * 120 }">
          <strong>{{ s.prefix }}{{ statShown[i] ?? s.value }}</strong>
          <span>{{ s.label }}</span>
        </li>
      </ul>
    </section>

    <!-- ───────── MÉTODO (didático) ───────── -->
    <section aria-labelledby="sp-method" class="sp-section">
      <div class="sp-wrap">
        <header v-reveal class="sp-head">
          <p class="sp-eyebrow sp-eyebrow--dark">O método</p>
          <h2 id="sp-method">{{ page.methodTitle }}</h2>
          <p>{{ page.methodLead }}</p>
        </header>

        <div class="sp-method">
          <div class="sp-steps">
            <div aria-label="Etapas do método" class="sp-tabs" role="tablist" @keydown="onTabKey">
              <button
                v-for="(s, i) in steps"
                :id="`sp-tab-${i}`"
                :key="s.title"
                :aria-controls="`sp-panel-${i}`"
                :aria-selected="active === i"
                class="sp-tab"
                :class="{ 'is-on': active === i }"
                role="tab"
                :tabindex="active === i ? 0 : -1"
                type="button"
                @click="pick(i)"
              >
                <span class="sp-tab-n">{{ i + 1 }}</span>
                <span class="sp-tab-t">{{ s.title }}</span>
                <span v-if="active === i && !manual" aria-hidden="true" class="sp-tab-bar" />
              </button>
            </div>
            <div
              v-for="(s, i) in steps"
              v-show="active === i"
              :id="`sp-panel-${i}`"
              :key="`p-${s.title}`"
              :aria-labelledby="`sp-tab-${i}`"
              class="sp-panel"
              role="tabpanel"
            >
              <span aria-hidden="true" class="sp-panel-ico"><i class="mdi" :class="s.icon" /></span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </div>
          </div>

          <!-- Mapa animado: o traço se desenha e os 4 perfis aparecem em sequência -->
          <div v-reveal.zoom class="sp-map" role="img" aria-label="Ilustração de um mapa com quatro pontos, um para cada perfil de testemunha">
            <svg viewBox="0 0 560 290">
              <path class="sp-path-bg" d="M50 220 C 110 220, 130 90, 190 90 S 290 210, 350 210 S 440 70, 500 70" pathLength="1" />
              <path class="sp-path" d="M50 220 C 110 220, 130 90, 190 90 S 290 210, 350 210 S 440 70, 500 70" pathLength="1" />
              <g v-for="(p, i) in [[50, 220], [190, 90], [350, 210], [500, 70]]" :key="i" class="sp-pin" :style="{ '--i': i }">
                <circle class="sp-pin-ring" :cx="p[0]" :cy="p[1]" r="16" />
                <circle class="sp-pin-dot" :cx="p[0]" :cy="p[1]" r="11" />
                <text :x="p[0]" :y="p[1] + 4" text-anchor="middle">{{ i + 1 }}</text>
                <text class="sp-pin-label" :x="p[0]" :y="p[1] + (i % 2 ? -26 : 38)" text-anchor="middle">Perfil {{ i + 1 }}</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- ───────── OFERTA ───────── -->
    <section aria-labelledby="sp-offer" class="sp-offer" data-sp-price>
      <div class="sp-wrap sp-offer-in">
        <div v-reveal class="sp-offer-copy">
          <p class="sp-eyebrow">{{ product.title }}</p>
          <h2 id="sp-offer">{{ page.offerTitle }}</h2>
          <p>{{ product.description }}</p>
          <p v-if="page.guarantee" class="sp-guarantee"><i aria-hidden="true" class="mdi mdi-shield-check-outline" /> {{ page.guarantee }}</p>
        </div>

        <div v-reveal.zoom class="sp-ticket">
          <div v-if="discount.active" aria-hidden="true" class="sp-ribbon">-{{ discount.percent }}% {{ discount.label }}</div>

          <div v-if="price.has" class="sp-prices">
            <span v-if="price.old" class="sp-old"><s>{{ formatMoney(price.old) }}</s></span>
            <strong class="sp-now">{{ formatMoney(priceShown) }}</strong>
          </div>
          <div v-else class="sp-prices">
            <span v-if="product.oldPrice" class="sp-old"><s>{{ product.oldPrice }}</s></span>
            <strong class="sp-now sp-now--txt">{{ product.price || (discount.active ? `${discount.percent}% OFF` : 'Condição especial') }}</strong>
          </div>

          <div v-if="left" class="sp-count" role="timer" aria-label="Tempo restante da oferta">
            <p>A oferta termina em</p>
            <div>
              <span><b>{{ pad(left.d) }}</b>dias</span><span><b>{{ pad(left.h) }}</b>horas</span><span><b>{{ pad(left.m) }}</b>min</span><span><b>{{ pad(left.s) }}</b>seg</span>
            </div>
          </div>

          <div v-if="discount.active && discount.coupon" class="sp-coupon">
            <span>Cupom</span>
            <code>{{ discount.coupon }}</code>
            <button type="button" @click="copyCoupon">{{ copied ? 'Copiado!' : 'Copiar' }}</button>
            <span v-if="copied" aria-hidden="true" class="sp-burst"><i v-for="n in 12" :key="n" :style="{ '--a': `${n * 30}deg` }" /></span>
          </div>

          <a
            class="sp-btn sp-btn--shine sp-btn--block"
            data-track="buy_click"
            :href="product.buyHref"
            :rel="buyExternal ? 'noopener noreferrer' : undefined"
            :target="buyExternal ? '_blank' : undefined"
          >{{ page.buyLabel }} <i aria-hidden="true" class="mdi mdi-arrow-right" /></a>
          <p class="sp-note"><i aria-hidden="true" class="mdi mdi-lock-outline" /> {{ page.offerNote }}</p>
        </div>
      </div>
    </section>

    <!-- ───────── DEPOIMENTOS (só aparecem se houver) ───────── -->
    <section v-if="page.proof?.testimonials?.length" aria-labelledby="sp-tests" class="sp-section sp-section--soft">
      <div class="sp-wrap">
        <header v-reveal class="sp-head"><h2 id="sp-tests">Quem já aprendeu com o método</h2></header>
        <ul class="sp-tests">
          <li v-for="(t, i) in page.proof.testimonials" :key="t.name" v-reveal="{ delay: i * 110 }">
            <i aria-hidden="true" class="mdi mdi-format-quote-open" />
            <p>{{ t.text }}</p>
            <footer><strong>{{ t.name }}</strong><span>{{ t.role }}</span></footer>
          </li>
        </ul>
      </div>
    </section>

    <!-- ───────── OUTROS PRODUTOS ───────── -->
    <section v-if="others.length" aria-labelledby="sp-others" class="sp-section sp-section--soft">
      <div class="sp-wrap">
        <header v-reveal class="sp-head"><h2 id="sp-others">Outros materiais e mentorias</h2></header>
        <ul class="sp-others">
          <li v-for="(o, i) in others" :key="o.key" v-reveal="{ delay: i * 110 }" class="sp-other">
            <img v-if="o.image" alt="" height="480" loading="lazy" :src="o.image" width="1200">
            <div>
              <span v-if="o.badge" class="sp-other-badge">{{ o.badge }}</span>
              <h3>{{ o.title }}</h3>
              <p>{{ o.description }}</p>
              <a
                class="sp-btn sp-btn--sm"
                data-track="buy_click"
                :href="o.buyHref"
                :rel="isExternal(o.buyHref) ? 'noopener noreferrer' : undefined"
                :target="isExternal(o.buyHref) ? '_blank' : undefined"
              >{{ o.buttonLabel || 'Saiba mais' }} <i aria-hidden="true" class="mdi mdi-arrow-right" /></a>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- ───────── FAQ ───────── -->
    <section v-if="page.faq?.length" aria-labelledby="sp-faq" class="sp-section">
      <div class="sp-wrap sp-faq-wrap">
        <header v-reveal class="sp-head"><h2 id="sp-faq">{{ page.faqTitle }}</h2></header>
        <div class="sp-faq">
          <details v-for="(f, i) in page.faq" :key="f.question" v-reveal="{ delay: i * 80 }">
            <summary>{{ f.question }}</summary>
            <p>{{ f.answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ───────── CTA FINAL ───────── -->
    <section aria-labelledby="sp-final" class="sp-final">
      <div v-reveal class="sp-wrap sp-final-in">
        <h2 id="sp-final">{{ page.finalTitle }}</h2>
        <p>{{ page.finalText }}</p>
        <div class="sp-actions sp-actions--center">
          <a
            class="sp-btn sp-btn--shine"
            data-track="buy_click"
            :href="product.buyHref"
            :rel="buyExternal ? 'noopener noreferrer' : undefined"
            :target="buyExternal ? '_blank' : undefined"
          >{{ page.buyLabel }} <i aria-hidden="true" class="mdi mdi-arrow-right" /></a>
          <a class="sp-btn sp-btn--ghost" :href="wa" rel="noopener noreferrer" target="_blank"><i aria-hidden="true" class="mdi mdi-whatsapp" /> {{ page.questionsLabel }}</a>
        </div>
        <p v-if="page.disclaimer" class="sp-disc">{{ page.disclaimer }}</p>
      </div>
    </section>
  </main>

  <FooterSection />
  <AccessibilityMenu />

  <Transition name="sp-bar">
    <div v-if="bar && product" class="sp-bar">
      <div class="sp-bar-in">
        <span class="sp-bar-t"><strong>{{ product.title }}</strong><small v-if="discount.active">{{ discount.percent }}% {{ discount.label }}</small></span>
        <a
          class="sp-btn sp-btn--sm"
          data-track="buy_click"
          :href="product.buyHref"
          :rel="buyExternal ? 'noopener noreferrer' : undefined"
          :target="buyExternal ? '_blank' : undefined"
        >Comprar <i aria-hidden="true" class="mdi mdi-arrow-right" /></a>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.sp-wrap { width: min(1120px, calc(100% - 40px)); margin-inline: auto; }
#sp-main { outline: none; overflow-x: clip; }
h1, h2, h3 { font-family: Georgia, 'Times New Roman', serif; font-weight: 400; letter-spacing: -.015em; }

/* Topo */
.sp-top { position: sticky; top: 0; z-index: 30; background: #fffffff2; backdrop-filter: blur(10px); border-bottom: 1px solid #ece5d9; }
.sp-top-in { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 64px; }
.sp-brand { display: flex; align-items: center; gap: 10px; font: 400 1.05rem Georgia, serif; color: var(--color-primary); }
.sp-brand img { width: 36px; height: 36px; object-fit: contain; }
.sp-nav { display: flex; align-items: center; gap: 18px; }
.sp-nav-back { font-size: .84rem; color: #4d5559; display: inline-flex; gap: 6px; align-items: center; min-height: 44px; }
.sp-nav-back:hover { color: var(--color-primary); }

/* Botões */
.sp-btn { position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 54px; padding: 14px 30px; border-radius: 999px; background: var(--color-secondary); color: #fff; font-weight: 500; font-size: 1rem; transition: transform .2s ease, box-shadow .2s ease, gap .2s ease; box-shadow: 0 10px 26px #6d090a55; }
.sp-btn:hover { color: #fff; transform: translateY(-2px); gap: 14px; box-shadow: 0 14px 32px #6d090a66; }
.sp-btn--sm { min-height: 44px; padding: 9px 20px; font-size: .88rem; box-shadow: none; }
.sp-btn--block { width: 100%; }
.sp-hero .sp-btn:not(.sp-btn--ghost), .sp-final .sp-btn:not(.sp-btn--ghost) { background: var(--color-accent); color: var(--color-primary-dark); box-shadow: 0 10px 26px #0000004d; }
.sp-hero .sp-btn:not(.sp-btn--ghost):hover { color: var(--color-primary-dark); }
.sp-final .sp-btn:not(.sp-btn--ghost) { background: var(--color-secondary); color: #fff; }
.sp-btn--ghost { background: transparent; color: #fff; border: 1.5px solid #ffffff80; box-shadow: none; }
.sp-btn--ghost:hover { background: #ffffff1f; box-shadow: none; }
.sp-btn--shine::before { content: ''; position: absolute; inset: 0; width: 40%; background: linear-gradient(100deg, transparent, #ffffff55, transparent); transform: translateX(-160%) skewX(-18deg); animation: sp-shine 4.2s ease-in-out 1.2s infinite; pointer-events: none; }
.sp-eyebrow { margin: 0 0 14px; font-size: .74rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; color: var(--color-accent); }
.sp-eyebrow--dark { color: var(--color-primary); }

/* Hero */
.sp-hero { position: relative; overflow: hidden; color: #fff; background: linear-gradient(135deg, #3d0506 0%, var(--color-primary-dark) 45%, #7a2a22 100%); padding: clamp(48px, 8vw, 96px) 0 clamp(56px, 8vw, 100px); }
.sp-orb { position: absolute; border-radius: 50%; pointer-events: none; background: radial-gradient(circle, #e6d5c366, transparent 65%); animation: sp-drift 14s ease-in-out infinite alternate; }
.sp-orb--a { width: 520px; height: 520px; right: -140px; top: -180px; }
.sp-orb--b { width: 380px; height: 380px; left: -120px; bottom: -160px; animation-duration: 18s; animation-direction: alternate-reverse; }
.sp-hero-grid { position: relative; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr); gap: clamp(28px, 5vw, 64px); align-items: center; }
.sp-hero h1 { font-size: clamp(2rem, 4.6vw, 3.3rem); line-height: 1.1; margin: 0 0 18px; outline: none; }
.sp-lead { font-size: clamp(1rem, 1.6vw, 1.15rem); line-height: 1.8; color: #f2e9de; max-width: 54ch; margin: 0 0 28px; }
.sp-actions { display: flex; flex-wrap: wrap; gap: 12px; }
.sp-actions--center { justify-content: center; }
.sp-chips { list-style: none; margin: 24px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px 20px; font-size: .84rem; color: #f2e9de; }
.sp-chips i { color: var(--color-accent); }
.sp-hero-art { position: relative; }
.sp-cover { border-radius: 20px; overflow: hidden; box-shadow: 0 30px 70px #00000066; border: 1px solid #ffffff33; animation: sp-float 6s ease-in-out infinite; }
.sp-cover img { width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; }
.sp-cover-fb { aspect-ratio: 16 / 9; display: grid; place-items: center; font-size: 4rem; color: var(--color-accent); background: #ffffff14; }

/* Selo de desconto */
.sp-stamp { position: absolute; right: -10px; top: -22px; width: 112px; height: 112px; display: grid; place-content: center; text-align: center; border-radius: 50%; background: var(--color-accent); color: var(--color-primary-dark); transform: rotate(-10deg); box-shadow: 0 12px 30px #00000055; animation: sp-stamp .8s cubic-bezier(.34, 1.56, .64, 1) .7s backwards; }
.sp-stamp::after { content: ''; position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--color-accent); animation: sp-ring 2.4s ease-out 1.5s infinite; }
.sp-stamp strong { font: 700 1.9rem/1 Georgia, serif; }
.sp-stamp span { font-size: .66rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; margin-top: 4px; }

/* Entrada do hero */
.sp-in { animation: sp-up .8s cubic-bezier(.22, .61, .36, 1) var(--d, 0ms) backwards; }

/* Prova social */
.sp-proof { background: var(--color-surface-soft); border-bottom: 1px solid #ece5d9; }
.sp-stats { list-style: none; margin-block: 0; padding: 28px 0; display: flex; justify-content: center; flex-wrap: wrap; gap: 20px clamp(32px, 8vw, 110px); }
.sp-stats li { text-align: center; }
.sp-stats strong { display: block; font: 400 clamp(2.2rem, 5vw, 3.2rem)/1 Georgia, serif; color: var(--color-secondary); font-variant-numeric: tabular-nums; }
.sp-stats span { font-size: .86rem; color: #59656d; }

/* Seções */
.sp-section { padding: clamp(52px, 7vw, 92px) 0; }
.sp-section--soft { background: var(--color-surface-soft); }
.sp-head { max-width: 640px; margin-bottom: 36px; }
.sp-head h2 { font-size: clamp(1.6rem, 3.2vw, 2.3rem); line-height: 1.2; margin: 0 0 12px; }
.sp-head p { color: #59656d; margin: 0; }

/* Método */
.sp-method { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(24px, 4vw, 56px); align-items: center; }
.sp-tabs { display: grid; gap: 8px; margin-bottom: 18px; }
.sp-tab { position: relative; overflow: hidden; display: flex; align-items: center; gap: 14px; min-height: 56px; padding: 10px 16px; text-align: left; border: 1.5px solid #e6dfd3; border-radius: 14px; background: #fff; transition: border-color .25s, background .25s, transform .25s; }
.sp-tab:hover { transform: translateX(4px); }
.sp-tab.is-on { border-color: var(--color-secondary); background: #fbf6ec; }
.sp-tab-n { flex: 0 0 auto; width: 32px; height: 32px; display: grid; place-items: center; border-radius: 50%; background: var(--color-surface-soft); color: var(--color-primary); font-weight: 700; transition: background .25s, color .25s; }
.sp-tab.is-on .sp-tab-n { background: var(--color-secondary); color: #fff; }
.sp-tab-t { font-weight: 500; }
.sp-tab-bar { position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; background: var(--color-secondary); transform-origin: left; animation: sp-progress 6.5s linear forwards; }
.sp-panel { padding: 22px 24px; border-radius: 16px; background: #fff; border: 1px solid #e6dfd3; animation: sp-panel .45s cubic-bezier(.22, .61, .36, 1) backwards; }
.sp-panel-ico { width: 52px; height: 52px; display: grid; place-items: center; border-radius: 14px; background: var(--color-surface-soft); color: var(--color-primary); font-size: 1.7rem; margin-bottom: 12px; }
.sp-panel h3 { font-size: 1.35rem; margin: 0 0 8px; }
.sp-panel p { margin: 0; color: #59656d; line-height: 1.8; }

/* Mapa animado */
.sp-map { padding: 18px; border-radius: 20px; background: #fff; border: 1px solid #e6dfd3; box-shadow: 0 18px 44px #39291a14; }
.sp-map svg { width: 100%; height: auto; overflow: visible; }
.sp-path-bg { fill: none; stroke: #e6dfd3; stroke-width: 5; stroke-linecap: round; stroke-dasharray: 1 .02; }
.sp-path { fill: none; stroke: var(--color-secondary); stroke-width: 5; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
.sp-pin-ring { fill: none; stroke: var(--color-secondary); stroke-width: 2; opacity: 0; transform-box: fill-box; transform-origin: center; }
.sp-pin-dot { fill: var(--color-secondary); transform-box: fill-box; transform-origin: center; }
.sp-pin text { fill: #fff; font: 700 13px Roboto, Arial, sans-serif; }
.sp-pin .sp-pin-label { fill: #59656d; font: 500 12px Roboto, Arial, sans-serif; }
.rv-in .sp-path { animation: sp-draw 2.6s cubic-bezier(.45, .05, .25, 1) .3s backwards; }
.rv-in .sp-pin-dot, .rv-in .sp-pin text { animation: sp-pin .5s cubic-bezier(.34, 1.56, .64, 1) calc(.5s + var(--i) * .6s) backwards; }
.rv-in .sp-pin-ring { animation: sp-ping 2.8s ease-out calc(1s + var(--i) * .6s) infinite; }

/* Oferta */
.sp-offer { position: relative; overflow: hidden; color: #fff; padding: clamp(56px, 8vw, 96px) 0; background: linear-gradient(135deg, #2c0708, var(--color-primary-dark)); }
.sp-offer-in { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 440px); gap: clamp(28px, 5vw, 72px); align-items: center; }
.sp-offer-copy h2 { font-size: clamp(1.7rem, 3.4vw, 2.5rem); line-height: 1.15; margin: 0 0 14px; }
.sp-offer-copy p { color: #f2e9de; line-height: 1.8; }
.sp-guarantee { display: flex; gap: 10px; align-items: flex-start; font-size: .92rem; }
.sp-guarantee i { color: var(--color-accent); font-size: 1.3rem; }
.sp-ticket { position: relative; padding: 36px 28px 26px; border-radius: 22px; background: #fff; color: var(--color-text); box-shadow: 0 30px 70px #00000066; display: grid; gap: 18px; }
.sp-ribbon { position: absolute; top: -14px; left: 24px; padding: 6px 16px; border-radius: 999px; background: var(--color-secondary); color: #fff; font-size: .78rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; box-shadow: 0 8px 18px #6d090a55; animation: sp-ribbon 2.4s ease-in-out infinite; }
.sp-prices { display: flex; align-items: baseline; flex-wrap: wrap; gap: 6px 16px; }
.sp-old { position: relative; font-size: 1.15rem; color: #8b8178; }
.sp-old s { text-decoration: none; position: relative; display: inline-block; }
.sp-old s::after { content: ''; position: absolute; left: -2px; right: -2px; top: 52%; height: 2px; background: var(--color-secondary); transform-origin: left; }
.rv-in .sp-old s::after { animation: sp-strike .7s cubic-bezier(.22, .61, .36, 1) .5s backwards; }
.sp-now { font: 400 clamp(2.4rem, 6vw, 3.4rem)/1 Georgia, serif; color: var(--color-secondary); font-variant-numeric: tabular-nums; }
.sp-now--txt { font-size: clamp(1.8rem, 4vw, 2.4rem); }
.sp-count p { margin: 0 0 8px; font-size: .76rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #6b6259; }
.sp-count > div { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.sp-count span { display: grid; place-items: center; padding: 10px 4px; border-radius: 12px; background: var(--color-surface-soft); font-size: .68rem; color: #6b6259; }
.sp-count b { font: 700 1.5rem/1.2 Roboto, sans-serif; color: var(--color-secondary); font-variant-numeric: tabular-nums; }
.sp-coupon { position: relative; display: flex; align-items: center; gap: 12px; padding: 10px 12px 10px 16px; border: 2px dashed var(--color-primary); border-radius: 14px; background: #fbf6ec; }
.sp-coupon > span:first-child { font-size: .72rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #6b6259; }
.sp-coupon code { flex: 1; font: 700 1.1rem/1 ui-monospace, Menlo, monospace; letter-spacing: .08em; color: var(--color-secondary); }
.sp-coupon button { min-height: 40px; padding: 8px 16px; border-radius: 999px; background: var(--color-primary); color: #fff; font-size: .82rem; font-weight: 500; }
.sp-burst { position: absolute; right: 44px; top: 50%; width: 0; height: 0; pointer-events: none; }
.sp-burst i { position: absolute; width: 7px; height: 7px; border-radius: 50%; background: var(--color-secondary); animation: sp-burst .8s ease-out forwards; }
.sp-burst i:nth-child(3n) { background: var(--color-accent); }
.sp-burst i:nth-child(3n+1) { background: var(--color-primary); }
.sp-note { margin: 0; font-size: .78rem; color: #6b6259; text-align: center; }

/* Depoimentos / outros / FAQ */
.sp-tests, .sp-others { list-style: none; margin: 0; padding: 0; display: grid; gap: 20px; }
.sp-tests { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.sp-tests li { padding: 26px; border-radius: 16px; background: #fff; border: 1px solid #e6dfd3; }
.sp-tests i { font-size: 2rem; color: var(--color-secondary); }
.sp-tests p { margin: 4px 0 16px; line-height: 1.8; color: #3b4448; }
.sp-tests footer { display: grid; font-size: .84rem; color: #6b6259; }
.sp-tests strong { color: var(--color-text); }
.sp-others { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.sp-other { overflow: hidden; border-radius: 16px; background: #fff; border: 1px solid #e6dfd3; display: grid; transition: transform .3s, box-shadow .3s; }
.sp-other:hover { transform: translateY(-4px); box-shadow: 0 16px 36px #39291a1f; }
.sp-other img { width: 100%; aspect-ratio: 5 / 2; object-fit: cover; }
.sp-other > div { padding: 18px 20px 22px; display: grid; gap: 8px; justify-items: start; }
.sp-other h3 { font-size: 1.25rem; margin: 0; }
.sp-other p { margin: 0; color: #59656d; font-size: .92rem; }
.sp-other-badge { font-size: .68rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--color-secondary); }
.sp-faq-wrap { max-width: 820px; }
.sp-faq { display: grid; gap: 10px; }
.sp-faq details { border: 1px solid #e6dfd3; border-radius: 14px; background: #fff; }
.sp-faq summary { cursor: pointer; padding: 16px 20px; min-height: 54px; font-weight: 500; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 14px; }
.sp-faq summary::-webkit-details-marker { display: none; }
.sp-faq summary::after { content: '+'; font-size: 1.5rem; color: var(--color-secondary); transition: transform .25s; }
.sp-faq details[open] summary::after { transform: rotate(45deg); }
.sp-faq p { margin: 0; padding: 0 20px 18px; color: #4d575c; line-height: 1.8; }

/* CTA final */
.sp-final { padding: clamp(56px, 8vw, 96px) 0; background: var(--color-surface-soft); text-align: center; }
.sp-final-in { max-width: 720px; }
.sp-final h2 { font-size: clamp(1.7rem, 3.4vw, 2.4rem); line-height: 1.2; margin: 0 0 12px; }
.sp-final p { color: #59656d; }
.sp-final .sp-btn--ghost { color: var(--color-primary); border-color: var(--color-primary); }
.sp-final .sp-btn--ghost:hover { background: #fff; }
.sp-disc { margin: 28px 0 0; font-size: .78rem; color: #6b6259; }

/* Barra fixa */
.sp-bar { position: fixed; z-index: 40; left: 0; right: 0; bottom: 0; padding: 10px 16px max(10px, env(safe-area-inset-bottom)); background: #fffffff5; backdrop-filter: blur(10px); border-top: 1px solid #e6dfd3; box-shadow: 0 -10px 30px #39291a1a; }
.sp-bar-in { width: min(1120px, 100%); margin-inline: auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-inline: 68px 76px; }
.sp-bar-t { display: grid; min-width: 0; }
.sp-bar-t strong { font-size: .92rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sp-bar-t small { color: var(--color-secondary); font-weight: 700; }
.sp-bar-enter-active, .sp-bar-leave-active { transition: transform .35s cubic-bezier(.22, .61, .36, 1), opacity .3s; }
.sp-bar-enter-from, .sp-bar-leave-to { transform: translateY(100%); opacity: 0; }

/* Keyframes (só transform/opacity/stroke) */
@keyframes sp-up { from { opacity: 0; transform: translate3d(0, 22px, 0); } }
@keyframes sp-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes sp-drift { to { transform: translate3d(-40px, 30px, 0) scale(1.1); } }
@keyframes sp-shine { 0%, 55%, 100% { transform: translateX(-160%) skewX(-18deg); } 80% { transform: translateX(420%) skewX(-18deg); } }
@keyframes sp-stamp { from { opacity: 0; transform: rotate(-60deg) scale(.2); } }
@keyframes sp-ring { from { transform: scale(1); opacity: .8; } to { transform: scale(1.5); opacity: 0; } }
@keyframes sp-ribbon { 0%, 100% { transform: translateY(0) rotate(-1.5deg); } 50% { transform: translateY(-3px) rotate(1.5deg); } }
@keyframes sp-strike { from { transform: scaleX(0); } }
@keyframes sp-draw { from { stroke-dashoffset: 1; } }
@keyframes sp-pin { from { transform: scale(0); opacity: 0; } }
@keyframes sp-ping { 0% { transform: scale(.8); opacity: .7; } 70%, 100% { transform: scale(1.7); opacity: 0; } }
@keyframes sp-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes sp-panel { from { opacity: 0; transform: translate3d(0, 12px, 0); } }
@keyframes sp-burst { from { transform: rotate(var(--a)) translateX(4px) scale(1); opacity: 1; } to { transform: rotate(var(--a)) translateX(46px) scale(.3); opacity: 0; } }

@media (max-width: 860px) {
  .sp-hero-grid, .sp-method, .sp-offer-in { grid-template-columns: 1fr; }
  .sp-hero-art { order: -1; max-width: 520px; }
  .sp-stamp { right: 6px; width: 92px; height: 92px; top: -14px; }
  .sp-stamp strong { font-size: 1.5rem; }
  .sp-nav-back { display: none; }
  .sp-actions .sp-btn { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .sp-in, .sp-orb, .sp-cover, .sp-stamp, .sp-stamp::after, .sp-ribbon, .sp-btn--shine::before, .sp-panel, .sp-tab-bar { animation: none !important; }
  .sp-tab, .sp-btn, .sp-other, .sp-bar-enter-active, .sp-bar-leave-active { transition: none !important; }
  .sp-tab-bar { display: none; }
}
:global(.accessible-contrast) .sp-hero, :global(.accessible-contrast) .sp-offer, :global(.accessible-contrast) .sp-final, :global(.accessible-contrast) .sp-proof { background: #000 !important; }
:global(.accessible-contrast) .sp-ticket, :global(.accessible-contrast) .sp-panel, :global(.accessible-contrast) .sp-tab, :global(.accessible-contrast) .sp-map, :global(.accessible-contrast) .sp-faq details, :global(.accessible-contrast) .sp-top, :global(.accessible-contrast) .sp-bar { background: #000 !important; color: #fff !important; border: 2px solid #fff !important; }
:global(.accessible-contrast) .sp-btn { background: #ffeb3b !important; color: #000 !important; }
:global(.accessible-contrast) .sp-now, :global(.accessible-contrast) .sp-stats strong, :global(.accessible-contrast) .sp-count b, :global(.accessible-contrast) .sp-coupon code { color: #ffeb3b !important; }
</style>
