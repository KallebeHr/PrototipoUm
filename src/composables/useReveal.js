/**
 * Animações leves de entrada: só `opacity` e `transform` (CSS), disparadas por
 * um único IntersectionObserver. Sem GSAP/ScrollTrigger, sem scroll listener.
 *
 * Uso:  <section v-reveal> ... </section>
 *       <li v-reveal="{ delay: 80 }"> ... </li>      (atraso em ms, p/ escalonar)
 *       <div v-reveal.left> ... </div>               (.left | .right | .zoom)
 *
 * Com `prefers-reduced-motion` o conteúdo já nasce visível (nada é animado).
 */
let observer
const reduced = () => typeof window === 'undefined'
  || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  || !('IntersectionObserver' in window)

function getObserver () {
  if (!observer) {
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('rv-in')
        observer.unobserve(entry.target)
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
  }
  return observer
}

/**
 * Aplica a entrada escalonada aos blocos da home sem mexer no HTML de cada um.
 * [seletor, intervalo entre irmãos em ms]. Chame depois de montar a página.
 */
const TARGETS = [
  ['main .content-section', 0],
  ['.practice-sidebar > a', 50],
  ['.areas-grid > details', 60],
  ['.service-journey li', 90],
  ['.team-grid > *', 100],
  ['.product-card', 110],
  ['.contact-channels > a', 70],
]

export function revealAll (root = document) {
  if (reduced()) return
  for (const [selector, step] of TARGETS) {
    root.querySelectorAll(selector).forEach((el, index) => {
      if (el.classList.contains('rv') || el.closest('.rv-skip')) return
      el.classList.add('rv')
      if (step) el.style.setProperty('--rv-delay', `${Math.min(index, 5) * step}ms`)
      getObserver().observe(el)
    })
  }
}

export const vReveal = {
  mounted (el, binding) {
    if (reduced()) return
    el.classList.add('rv')
    for (const mod of ['left', 'right', 'zoom']) if (binding.modifiers[mod]) el.classList.add(`rv--${mod}`)
    if (binding.value?.delay) el.style.setProperty('--rv-delay', `${binding.value.delay}ms`)
    getObserver().observe(el)
  },
  unmounted (el) {
    observer?.unobserve(el)
  },
}
