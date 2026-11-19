<script setup>
  import { computed } from 'vue'
  import { quizVisible } from '../composables/useOffers'
  import { siteConfig as c } from '../config/siteConfig'

  const props = defineProps({
    // 'site' = faixa de destaque; 'bio' = botão no estilo dos atalhos da bio
    variant: { type: String, default: 'site' },
  })

  const show = computed(() => quizVisible(props.variant))
</script>

<template>
  <section
    v-if="show && variant === 'site'"
    id="ajuda"
    aria-labelledby="quiz-callout-title"
    class="quiz-callout"
  >
    <div aria-hidden="true" class="quiz-callout-icon"><i class="mdi mdi-chat-question-outline" /></div>
    <div class="quiz-callout-copy">
      <p class="eyebrow">ATENDIMENTO MAIS RÁPIDO</p>
      <h2 id="quiz-callout-title">{{ c.quiz.pageTitle }}</h2>
      <p>{{ c.quiz.buttonDescription }}</p>
    </div>
    <a class="quiz-callout-button" data-label="site" data-track="quiz_open" href="/ajuda">
      {{ c.quiz.buttonLabel }} <i aria-hidden="true" class="mdi mdi-arrow-right" />
    </a>
  </section>

  <a
    v-else-if="show && variant === 'bio'"
    class="bio-quiz-link"
    data-label="bio"
    data-track="quiz_open"
    href="/ajuda"
  >
    <span class="bio-quiz-icon"><i aria-hidden="true" class="mdi mdi-chat-question-outline" /></span>
    <span><strong>{{ c.quiz.buttonLabel }}</strong><small>{{ c.quiz.buttonDescription }}</small></span>
    <i aria-hidden="true" class="mdi mdi-arrow-right" />
  </a>
</template>

<style scoped>
.quiz-callout {
  margin-block: 56px 8px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 24px;
  padding: clamp(22px, 4vw, 36px);
  border-radius: 18px;
  background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
  color: #fff;
  box-shadow: 0 18px 44px #39291a2e;
  position: relative;
  overflow: hidden;
  scroll-margin-top: 24px;
}
.quiz-callout::after { content: ''; position: absolute; right: -60px; top: -80px; width: 240px; height: 240px; border-radius: 50%; background: var(--color-secondary); opacity: .16; pointer-events: none; }
.quiz-callout-icon { width: 64px; height: 64px; display: grid; place-items: center; border-radius: 18px; background: #ffffff1f; font-size: 2rem; color: var(--color-accent); animation: callout-float 3.4s ease-in-out infinite; }
.quiz-callout-copy .eyebrow { color: var(--color-accent); margin: 0 0 6px; }
.quiz-callout-copy h2 { font: 400 clamp(1.3rem, 2.6vw, 1.8rem)/1.2 Georgia, serif; margin-bottom: 6px; }
.quiz-callout-copy p:last-child { margin: 0; color: #f2e9de; font-size: .92rem; }
.quiz-callout-button { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 10px; min-height: 50px; padding: 12px 24px; border-radius: 999px; background: #fff; color: var(--color-primary-dark); font-weight: 500; white-space: nowrap; transition: background .2s, gap .2s; }
.quiz-callout-button:hover { background: var(--color-secondary); color: #1d130c; gap: 14px; }
.quiz-callout-button:focus-visible { outline-color: #fff; }

/* Versão da bio: mesmo desenho dos atalhos existentes */
.bio-quiz-link { display: flex; align-items: center; gap: 14px; margin-top: 12px; padding: 14px 16px; border: 1.5px solid var(--color-secondary); border-radius: 12px; background: #fbf6ec; transition: background .2s, transform .2s; }
.bio-quiz-link:hover { background: #f6ecd8; transform: translateY(-2px); }
.bio-quiz-icon { width: 42px; height: 42px; flex: 0 0 42px; display: grid; place-items: center; border-radius: 50%; background: var(--color-secondary); color: #1d130c; font-size: 1.4rem; }
.bio-quiz-link > span:nth-child(2) { flex: 1; min-width: 0; }
.bio-quiz-link strong { display: block; font-size: .92rem; font-weight: 500; }
.bio-quiz-link small { display: block; font-size: .72rem; color: #65676b; margin-top: 2px; }
.bio-quiz-link > i { color: var(--color-primary); font-size: 1.3rem; transition: transform .2s; }
.bio-quiz-link:hover > i { transform: translateX(3px); }

@keyframes callout-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }

@media (max-width: 800px) {
  .quiz-callout { grid-template-columns: 1fr; gap: 16px; margin-block: 40px 0; }
  .quiz-callout-button { justify-content: center; white-space: normal; }
}
:global(.accessible-contrast) .quiz-callout,
:global(.accessible-contrast) .bio-quiz-link { background: #000 !important; border: 2px solid #fff; color: #fff !important; }
:global(.accessible-contrast) .quiz-callout-button { background: #ffeb3b !important; color: #000 !important; }
</style>
