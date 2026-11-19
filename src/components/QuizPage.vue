<script setup>
  import { computed, nextTick, onMounted, reactive, ref } from 'vue'
  import { track } from '../composables/useConsent'
  import { buildQuizMessage, normalizeOption, quizAvailable, quizWhatsappUrl, visibleQuestions } from '../composables/useOffers'
  import { siteConfig as c } from '../config/siteConfig'
  import AccessibilityMenu from './AccessibilityMenu.vue'

  const props = defineProps({
    backHref: { type: String, default: '#inicio' },
  })

  const OTHER = '__outro__'

  const available = computed(() => quizAvailable())
  const quiz = computed(() => c.quiz)
  const allQuestions = computed(() => quiz.value.questions || [])
  // Só entram no fluxo as perguntas cujo "showIf" combina com as respostas já dadas.
  const questions = computed(() => visibleQuestions(allQuestions.value, answers))
  const optionsOf = item => (item.options || []).map(option => normalizeOption(option))
  const consentOk = ref(false)
  const total = computed(() => questions.value.length)

  const step = ref(0) // 0 = introdução · 1..n = perguntas · n+1 = revisão
  const direction = ref('forward')
  const error = ref('')
  const copied = ref('')
  const heading = ref(null)
  const answers = reactive({})
  const otherText = reactive({})
  const failedLogo = ref(false)
  let copyTimer

  for (const item of allQuestions.value) {
    answers[item.id] = item.type === 'multiple' ? [] : ''
    otherText[item.id] = ''
  }

  const isIntro = computed(() => step.value === 0)
  const isReview = computed(() => step.value === total.value + 1)
  const current = computed(() => questions.value[step.value - 1])
  const progress = computed(() => Math.round((Math.min(step.value, total.value) / total.value) * 100))
  const stepName = computed(() => `quiz-${direction.value}`)
  const stepKey = computed(() => (isIntro.value ? 'intro' : (isReview.value ? 'review' : current.value?.id)))

  const resolved = computed(() => {
    const out = {}
    for (const item of questions.value) {
      const value = answers[item.id]
      const other = `Outro: ${String(otherText[item.id] || '').trim()}`
      out[item.id] = Array.isArray(value)
        ? value.map(entry => (entry === OTHER ? other : entry))
        : (value === OTHER ? other : value)
    }
    return out
  })

  const whatsappHref = computed(() => quizWhatsappUrl(questions.value, resolved.value))

  function displayValue (item) {
    const value = resolved.value[item.id]
    const text = Array.isArray(value) ? value.join(', ') : String(value || '').trim()
    return text || 'Não respondido'
  }

  function formatPhone (raw) {
    const d = String(raw).replace(/\D/g, '').slice(0, 11)
    if (d.length <= 2) return d ? `(${d}` : ''
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  }

  function onPhoneInput (item, event) {
    answers[item.id] = formatPhone(event.target.value)
    error.value = ''
  }

  function validate (item) {
    const value = answers[item.id]
    const choice = item.type === 'single' || item.type === 'multiple'
    const empty = Array.isArray(value) ? value.length === 0 : !String(value).trim()
    if (item.required && empty) return choice ? 'Escolha uma opção para continuar.' : 'Preencha este campo para continuar.'
    const usesOther = Array.isArray(value) ? value.includes(OTHER) : value === OTHER
    if (usesOther && !String(otherText[item.id]).trim()) return 'Escreva qual é a outra opção.'
    if (!empty && item.type === 'phone' && String(value).replace(/\D/g, '').length < 10) return 'Informe um telefone com DDD.'
    return ''
  }

  function go (target, dir) {
    direction.value = dir
    error.value = ''
    step.value = target
  }

  function next () {
    if (isIntro.value) {
      track('quiz_start')
      return go(1, 'forward')
    }
    if (current.value) {
      const problem = validate(current.value)
      if (problem) {
        error.value = problem
        return
      }
    }
    go(step.value + 1, 'forward')
  }

  function back () {
    if (step.value > 0) go(step.value - 1, 'back')
  }

  function edit (index) {
    go(index + 1, 'back')
  }

  function restart () {
    for (const item of allQuestions.value) {
      answers[item.id] = item.type === 'multiple' ? [] : ''
      otherText[item.id] = ''
    }
    consentOk.value = false
    go(0, 'back')
  }

  function focusHeading () {
    nextTick(() => heading.value?.focus({ preventScroll: true }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function copyMessage () {
    clearTimeout(copyTimer)
    try {
      await navigator.clipboard.writeText(buildQuizMessage(questions.value, resolved.value))
      copied.value = 'Texto copiado. Cole na conversa que preferir.'
    } catch {
      copied.value = 'Não foi possível copiar automaticamente.'
    }
    copyTimer = setTimeout(() => {
      copied.value = ''
    }, 5000)
  }

  onMounted(() => nextTick(() => heading.value?.focus({ preventScroll: true })))
</script>

<template>
  <div class="quiz-page">
    <a class="skip-link" href="#quiz-content">Pular para o questionário</a>

    <div class="quiz-toolbar">
      <a class="quiz-back" :href="props.backHref"><i aria-hidden="true" class="mdi mdi-arrow-left" /> Voltar</a>
      <div class="quiz-brand">
        <img
          v-if="c.brand.logo && !failedLogo"
          :alt="`Logo de ${c.brand.shortName}`"
          height="36"
          :src="c.brand.logo"
          width="36"
          @error="failedLogo = true"
        >
        <span>{{ c.brand.shortName }}</span>
      </div>
    </div>

    <main id="quiz-content" class="quiz-shell" tabindex="-1">
      <template v-if="available">
        <!-- Barra de progresso -->
        <div v-if="!isIntro" class="quiz-progress">
          <div
            aria-label="Progresso do questionário"
            :aria-valuemax="total"
            aria-valuemin="0"
            :aria-valuenow="Math.min(step, total)"
            :aria-valuetext="isReview ? 'Revisão final' : `Pergunta ${step} de ${total}`"
            class="quiz-bar"
            role="progressbar"
          >
            <span :style="{ width: `${progress}%` }" />
          </div>
          <p aria-hidden="true">
            <template v-if="isReview">Revisão final</template>
            <template v-else>Pergunta <strong>{{ step }}</strong> de {{ total }}</template>
          </p>
        </div>

        <Transition mode="out-in" :name="stepName" @after-enter="focusHeading">
          <!-- INTRODUÇÃO -->
          <section v-if="isIntro" :key="stepKey" aria-labelledby="quiz-heading" class="quiz-card quiz-intro">
            <div aria-hidden="true" class="quiz-hero-icon"><i class="mdi mdi-chat-question-outline" /></div>
            <p class="quiz-eyebrow">Atendimento · {{ quiz.estimatedTime }}</p>
            <h1 id="quiz-heading" ref="heading" tabindex="-1">{{ quiz.pageTitle }}</h1>
            <p class="quiz-lead">{{ quiz.pageIntro }}</p>

            <ol class="quiz-how">
              <li><span aria-hidden="true"><i class="mdi mdi-pencil-outline" /></span><div><strong>Você responde</strong><small>{{ total }} perguntas simples</small></div></li>
              <li><span aria-hidden="true"><i class="mdi mdi-eye-check-outline" /></span><div><strong>Você confere</strong><small>Revisa tudo antes de enviar</small></div></li>
              <li><span aria-hidden="true"><i class="mdi mdi-whatsapp" /></span><div><strong>Enviamos no WhatsApp</strong><small>Já organizado para a advogada</small></div></li>
            </ol>

            <button class="quiz-primary" type="button" @click="next">
              Começar <i aria-hidden="true" class="mdi mdi-arrow-right" />
            </button>
            <p v-if="quiz.privacyNote" class="quiz-privacy"><i aria-hidden="true" class="mdi mdi-shield-lock-outline" /> {{ quiz.privacyNote }}</p>
          </section>

          <!-- PERGUNTA -->
          <form
            v-else-if="!isReview && current"
            :key="stepKey"
            aria-labelledby="quiz-heading"
            class="quiz-card"
            novalidate
            @submit.prevent="next"
          >
            <div aria-hidden="true" class="quiz-icon"><i class="mdi" :class="current.icon || 'mdi-help-circle-outline'" /></div>
            <h2 id="quiz-heading" ref="heading" tabindex="-1">{{ current.title }}</h2>
            <p v-if="current.help" class="quiz-help"><i aria-hidden="true" class="mdi mdi-lightbulb-on-outline" /><span>{{ current.help }}</span></p>

            <fieldset v-if="current.type === 'single' || current.type === 'multiple'" class="quiz-options">
              <legend class="sr-only">{{ current.title }}{{ current.type === 'multiple' ? ' (pode marcar mais de uma opção)' : '' }}</legend>
              <label
                v-for="(option, index) in optionsOf(current)"
                :key="option.key"
                class="quiz-option"
                :style="{ '--i': index }"
              >
                <input
                  v-model="answers[current.id]"
                  :name="current.id"
                  :type="current.type === 'multiple' ? 'checkbox' : 'radio'"
                  :value="option.label"
                  @change="error = ''"
                >
                <span class="quiz-option-box">
                  <span aria-hidden="true" class="quiz-mark"><i class="mdi mdi-check" /></span>
                  <span class="quiz-option-text">{{ option.label }}</span>
                </span>
              </label>
              <label v-if="current.allowOther" class="quiz-option" :style="{ '--i': optionsOf(current).length }">
                <input
                  v-model="answers[current.id]"
                  :name="current.id"
                  :type="current.type === 'multiple' ? 'checkbox' : 'radio'"
                  :value="OTHER"
                  @change="error = ''"
                >
                <span class="quiz-option-box">
                  <span aria-hidden="true" class="quiz-mark"><i class="mdi mdi-check" /></span>
                  <span class="quiz-option-text">Outro</span>
                </span>
              </label>
              <input
                v-if="current.allowOther && (Array.isArray(answers[current.id]) ? answers[current.id].includes(OTHER) : answers[current.id] === OTHER)"
                v-model="otherText[current.id]"
                aria-label="Descreva a outra opção"
                class="quiz-input quiz-other"
                maxlength="120"
                placeholder="Descreva aqui"
                type="text"
              >
              <p v-if="current.type === 'multiple'" class="quiz-hint">Você pode marcar mais de uma opção.</p>
            </fieldset>

            <div v-else class="quiz-field">
              <label class="sr-only" :for="`field-${current.id}`">{{ current.title }}</label>
              <textarea
                v-if="current.type === 'textarea'"
                :id="`field-${current.id}`"
                v-model="answers[current.id]"
                class="quiz-input"
                maxlength="1200"
                :placeholder="current.placeholder"
                rows="5"
                @input="error = ''"
              />
              <input
                v-else-if="current.type === 'phone'"
                :id="`field-${current.id}`"
                autocomplete="tel"
                class="quiz-input"
                inputmode="tel"
                maxlength="16"
                :placeholder="current.placeholder"
                type="tel"
                :value="answers[current.id]"
                @input="onPhoneInput(current, $event)"
              >
              <input
                v-else
                :id="`field-${current.id}`"
                v-model="answers[current.id]"
                :autocomplete="current.id === 'nome' ? 'name' : 'off'"
                class="quiz-input"
                maxlength="120"
                :placeholder="current.placeholder"
                type="text"
                @input="error = ''"
              >
              <p v-if="!current.required" class="quiz-hint">Esta pergunta é opcional.</p>
            </div>

            <p aria-live="assertive" class="quiz-error" role="alert">{{ error }}</p>

            <div class="quiz-actions">
              <button class="quiz-secondary" type="button" @click="back"><i aria-hidden="true" class="mdi mdi-arrow-left" /> Voltar</button>
              <button class="quiz-primary" type="submit">
                {{ step === total ? 'Revisar respostas' : 'Continuar' }} <i aria-hidden="true" class="mdi mdi-arrow-right" />
              </button>
            </div>
          </form>

          <!-- REVISÃO / ENVIO -->
          <section v-else :key="stepKey" aria-labelledby="quiz-heading" class="quiz-card quiz-review">
            <svg aria-hidden="true" class="quiz-check" viewBox="0 0 64 64">
              <circle class="quiz-check-ring" cx="32" cy="32" r="28" />
              <path class="quiz-check-tick" d="M19 33l9 9 17-19" />
            </svg>
            <h2 id="quiz-heading" ref="heading" tabindex="-1">{{ quiz.finishTitle }}</h2>
            <p class="quiz-lead">{{ quiz.finishText }}</p>

            <ul class="quiz-summary">
              <li v-for="(item, index) in questions" :key="item.id" :style="{ '--i': index }">
                <div>
                  <small>{{ item.label || item.title }}</small>
                  <p :class="{ 'is-empty': displayValue(item) === 'Não respondido' }">{{ displayValue(item) }}</p>
                </div>
                <button :aria-label="`Editar resposta: ${item.label || item.title}`" class="quiz-edit" type="button" @click="edit(index)">
                  <i aria-hidden="true" class="mdi mdi-pencil-outline" /> Editar
                </button>
              </li>
            </ul>

            <label v-if="quiz.requireConsent" class="quiz-consent">
              <input v-model="consentOk" type="checkbox">
              <span>
                {{ quiz.consentText }}
                <a href="/privacidade" rel="noopener" target="_blank">Política de Privacidade<span class="sr-only"> (abre em nova aba)</span></a>
              </span>
            </label>

            <a
              v-if="!quiz.requireConsent || consentOk"
              class="quiz-whatsapp"
              :href="whatsappHref"
              rel="noopener noreferrer"
              target="_blank"
              @click="track('quiz_complete', { quiz_area: String(resolved.area || '').slice(0, 60) })"
            >
              <i aria-hidden="true" class="mdi mdi-whatsapp" />
              {{ quiz.finishButton }}
              <span class="sr-only">(abre em nova aba)</span>
            </a>
            <button
              v-else
              aria-disabled="true"
              class="quiz-whatsapp quiz-whatsapp--off"
              disabled
              type="button"
            >
              <i aria-hidden="true" class="mdi mdi-whatsapp" />
              Marque o aceite para enviar
            </button>

            <div class="quiz-extra">
              <button type="button" @click="copyMessage"><i aria-hidden="true" class="mdi mdi-content-copy" /> Copiar texto</button>
              <button type="button" @click="restart"><i aria-hidden="true" class="mdi mdi-restart" /> Refazer</button>
            </div>
            <p aria-live="polite" class="quiz-hint" role="status">{{ copied }}</p>
          </section>
        </Transition>
      </template>

      <section v-else aria-labelledby="quiz-off" class="quiz-card">
        <h1 id="quiz-off" ref="heading" tabindex="-1">Questionário indisponível</h1>
        <p class="quiz-lead">Este questionário não está ativo no momento. Você pode falar direto com a equipe.</p>
        <a class="quiz-primary" :href="props.backHref">Voltar ao site</a>
      </section>
    </main>

    <footer class="quiz-footer"><p>{{ c.brand.officeName }}</p><small>{{ c.brand.oab }}</small></footer>
    <AccessibilityMenu />
  </div>
</template>

<style scoped>
.quiz-page {
  min-height: 100dvh;
  padding: 24px 20px max(96px, env(safe-area-inset-bottom));
  background: radial-gradient(ellipse at 8% 0%, #e7ddcf 0, transparent 46%), radial-gradient(ellipse at 100% 100%, #efe6d8 0, transparent 40%), var(--color-surface-soft);
  color: var(--color-text);
}
.quiz-toolbar { width: min(680px, 100%); margin: 0 auto 18px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.quiz-back { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; font-size: .82rem; color: #5c6467; }
.quiz-brand { display: flex; align-items: center; gap: 10px; font: 400 1rem Georgia, serif; color: var(--color-primary); }
.quiz-brand img { width: 36px; height: 36px; object-fit: contain; }
.quiz-shell { width: min(680px, 100%); margin: 0 auto; outline: none; }

/* Progresso */
.quiz-progress { margin-bottom: 16px; }
.quiz-bar { height: 8px; border-radius: 999px; background: #e3dacd; overflow: hidden; }
.quiz-bar span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--color-primary), var(--color-secondary)); transition: width .55s cubic-bezier(.2, .8, .2, 1); }
.quiz-progress p { margin: 8px 2px 0; font-size: .75rem; color: #6b6259; }

/* Cartão */
.quiz-card {
  background: var(--color-surface);
  border: 1px solid #e3dccf;
  border-radius: 22px;
  padding: clamp(24px, 5vw, 44px);
  box-shadow: 0 24px 70px #39291a14;
}
.quiz-card h1, .quiz-card h2 { font: 400 clamp(1.45rem, 3.6vw, 2rem)/1.22 Georgia, 'Times New Roman', serif; letter-spacing: -.02em; margin-bottom: 14px; }
.quiz-card h1:focus, .quiz-card h2:focus { outline: none; }
.quiz-lead { color: #59656d; font-size: 1rem; max-width: 56ch; }
.quiz-eyebrow { font-size: .68rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--color-primary); margin-bottom: 10px; }

.quiz-hero-icon, .quiz-icon {
  width: 60px; height: 60px; display: grid; place-items: center; border-radius: 18px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); color: #fff; font-size: 1.9rem; margin-bottom: 20px;
  box-shadow: 0 10px 24px #523e3240;
}
.quiz-icon { width: 52px; height: 52px; font-size: 1.6rem; border-radius: 16px; animation: quiz-pop .5s cubic-bezier(.3, 1.4, .5, 1) both; }
.quiz-hero-icon { animation: quiz-float 3.2s ease-in-out infinite; }

.quiz-how { list-style: none; margin: 26px 0 30px; padding: 0; display: grid; gap: 12px; }
.quiz-how li { display: flex; align-items: center; gap: 14px; padding: 12px 14px; border-radius: 14px; background: var(--color-surface-soft); animation: quiz-rise .5s ease both; }
.quiz-how li:nth-child(2) { animation-delay: .08s; }
.quiz-how li:nth-child(3) { animation-delay: .16s; }
.quiz-how li > span { width: 40px; height: 40px; flex: 0 0 40px; display: grid; place-items: center; border-radius: 12px; background: #fff; color: var(--color-primary); font-size: 1.3rem; border: 1px solid #e6dfd3; }
.quiz-how strong { display: block; font-size: .92rem; font-weight: 500; }
.quiz-how small { color: #65676b; font-size: .76rem; }

/* Dica didática */
.quiz-help { display: flex; gap: 10px; align-items: flex-start; margin: 0 0 22px; padding: 12px 14px; border-radius: 12px; background: #f8f1e4; border-left: 3px solid var(--color-secondary); font-size: .88rem; color: #5a5148; animation: quiz-rise .45s .08s ease both; }
.quiz-help i { color: #a67c1d; font-size: 1.2rem; margin-top: 1px; }

/* Opções */
.quiz-options { border: 0; margin: 0; padding: 0; min-width: 0; display: grid; gap: 10px; }
.quiz-option { position: relative; display: block; cursor: pointer; animation: quiz-rise .42s calc(.1s + var(--i) * .06s) ease both; }
.quiz-option input { position: absolute; opacity: 0; width: 100%; height: 100%; margin: 0; cursor: pointer; }
.quiz-option-box { display: flex; align-items: center; gap: 14px; min-height: 56px; padding: 12px 16px; border: 1.5px solid #d9d1c4; border-radius: 14px; background: #fff; transition: border-color .2s, background .2s, transform .2s, box-shadow .2s; }
.quiz-option:hover .quiz-option-box { border-color: var(--color-primary); transform: translateX(3px); }
.quiz-mark { width: 24px; height: 24px; flex: 0 0 24px; display: grid; place-items: center; border: 1.5px solid #bfb5a5; border-radius: 50%; color: transparent; font-size: .95rem; transition: all .25s cubic-bezier(.3, 1.5, .5, 1); }
.quiz-option input[type='checkbox'] + .quiz-option-box .quiz-mark { border-radius: 7px; }
.quiz-option-text { font-size: .96rem; line-height: 1.4; overflow-wrap: anywhere; }
.quiz-option input:checked + .quiz-option-box { border-color: var(--color-primary); background: #f6f0e8; box-shadow: 0 6px 18px #523e3220; }
.quiz-option input:checked + .quiz-option-box .quiz-mark { background: var(--color-primary); border-color: var(--color-primary); color: #fff; transform: scale(1.12); }
.quiz-option input:focus-visible + .quiz-option-box { outline: 3px solid #d58d14; outline-offset: 3px; }
.quiz-other { margin-top: 2px; }

/* Campos */
.quiz-input { width: 100%; padding: 15px 16px; font-size: 1rem; color: var(--color-text); background: #fff; border: 1.5px solid #d9d1c4; border-radius: 14px; transition: border-color .2s, box-shadow .2s; }
.quiz-input:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 4px #7a625226; }
textarea.quiz-input { resize: vertical; min-height: 130px; }
.quiz-hint { margin: 10px 2px 0; font-size: .78rem; color: #6b6259; min-height: 1.1em; }
.quiz-error { margin: 12px 2px 0; min-height: 1.4em; color: #a3261c; font-size: .86rem; font-weight: 500; }
.quiz-error:not(:empty) { animation: quiz-shake .4s ease; }

/* Botões */
.quiz-actions { display: flex; justify-content: space-between; gap: 12px; margin-top: 14px; }
.quiz-primary, .quiz-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 50px; padding: 12px 26px; border-radius: 999px; font-size: .95rem; font-weight: 500; transition: background .2s, transform .2s, box-shadow .2s, gap .2s; }
.quiz-primary { background: var(--color-primary); color: #fff; box-shadow: 0 10px 22px #523e3233; }
.quiz-primary:hover { background: var(--color-primary-dark); color: #fff; transform: translateY(-2px); gap: 14px; }
.quiz-secondary { color: var(--color-primary); border: 1.5px solid #d9d1c4; background: transparent; }
.quiz-secondary:hover { background: var(--color-surface-soft); }
.quiz-intro .quiz-primary { width: 100%; }
.quiz-privacy { display: flex; gap: 8px; margin: 18px 0 0; font-size: .76rem; color: #6b6259; }
.quiz-privacy i { color: var(--color-primary); font-size: 1.05rem; }

/* Revisão */
.quiz-check { width: 76px; height: 76px; margin-bottom: 14px; }
.quiz-check-ring { fill: #f6f0e8; stroke: var(--color-primary); stroke-width: 3; stroke-dasharray: 176; stroke-dashoffset: 0; animation: quiz-draw .7s ease both; }
.quiz-check-tick { fill: none; stroke: var(--color-primary); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 48; stroke-dashoffset: 0; animation: quiz-draw-tick .5s .55s ease both; }
.quiz-summary { list-style: none; margin: 24px 0; padding: 0; border: 1px solid #e6dfd3; border-radius: 14px; overflow: hidden; }
.quiz-summary li { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px; border-top: 1px solid #efe9df; animation: quiz-rise .4s calc(var(--i) * .05s) ease both; }
.quiz-summary li:first-child { border-top: 0; }
.quiz-summary small { display: block; font-size: .68rem; text-transform: uppercase; letter-spacing: .08em; color: #7a6f63; }
.quiz-summary p { margin: 2px 0 0; font-size: .92rem; overflow-wrap: anywhere; white-space: pre-line; }
.quiz-summary p.is-empty { color: #8a8278; font-style: italic; }
.quiz-edit { flex: 0 0 auto; display: inline-flex; align-items: center; gap: 5px; min-height: 40px; padding: 4px 10px; border-radius: 8px; font-size: .76rem; color: var(--color-primary); }
.quiz-edit:hover { background: var(--color-surface-soft); }
.quiz-whatsapp { display: flex; align-items: center; justify-content: center; gap: 12px; min-height: 58px; padding: 14px 22px; border-radius: 999px; background: #127e46; color: #fff; font-size: 1.02rem; font-weight: 500; box-shadow: 0 12px 26px #127e4640; transition: background .2s, transform .2s; animation: quiz-pulse 2.4s 1.2s ease-in-out 2; }
.quiz-whatsapp i { font-size: 1.6rem; }
.quiz-whatsapp--off { width: 100%; background: #b9b1a5; box-shadow: none; cursor: not-allowed; animation: none; }
.quiz-consent { display: flex; gap: 12px; align-items: flex-start; margin: 4px 0 16px; padding: 14px 16px; border: 1.5px solid #d9d1c4; border-radius: 14px; font-size: .84rem; line-height: 1.55; color: #4d575c; cursor: pointer; }
.quiz-consent input { width: 22px; height: 22px; flex: 0 0 22px; margin-top: 1px; accent-color: var(--color-primary); }
.quiz-consent a { color: var(--color-primary); text-decoration: underline; }
.quiz-whatsapp:hover { background: #086333; color: #fff; transform: translateY(-2px); }
.quiz-extra { display: flex; justify-content: center; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
.quiz-extra button { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 6px 14px; border-radius: 999px; font-size: .8rem; color: #5c6467; }
.quiz-extra button:hover { background: #fff; color: var(--color-primary); }
.quiz-review .quiz-hint { text-align: center; }

.quiz-footer { text-align: center; margin-top: 28px; padding: 0; background: none; color: #65676b; }
.quiz-footer p { margin: 0 0 2px; font-size: .74rem; }
.quiz-footer small { font-size: .66rem; }

/* Transições entre passos */
.quiz-forward-enter-active, .quiz-forward-leave-active, .quiz-back-enter-active, .quiz-back-leave-active { transition: opacity .28s ease, transform .28s ease; }
.quiz-forward-enter-from { opacity: 0; transform: translateX(44px); }
.quiz-forward-leave-to { opacity: 0; transform: translateX(-44px); }
.quiz-back-enter-from { opacity: 0; transform: translateX(-44px); }
.quiz-back-leave-to { opacity: 0; transform: translateX(44px); }

@keyframes quiz-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
@keyframes quiz-pop { from { opacity: 0; transform: scale(.5) rotate(-12deg); } to { opacity: 1; transform: none; } }
@keyframes quiz-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes quiz-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
@keyframes quiz-draw { from { stroke-dashoffset: 176; } to { stroke-dashoffset: 0; } }
@keyframes quiz-draw-tick { from { stroke-dashoffset: 48; } to { stroke-dashoffset: 0; } }
@keyframes quiz-pulse { 0%, 100% { box-shadow: 0 12px 26px #127e4640; } 50% { box-shadow: 0 12px 36px #127e4699; } }

@media (max-width: 560px) {
  .quiz-page { padding: 14px 12px max(92px, env(safe-area-inset-bottom)); }
  .quiz-card { border-radius: 18px; }
  .quiz-actions { flex-direction: column-reverse; }
  .quiz-actions button { width: 100%; }
  .quiz-summary li { align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .quiz-bar span, .quiz-option-box, .quiz-mark, .quiz-primary, .quiz-whatsapp { transition: none; }
  .quiz-forward-enter-active, .quiz-forward-leave-active, .quiz-back-enter-active, .quiz-back-leave-active { transition: none; }
}

:global(.accessible-contrast .quiz-page),
:global(.accessible-contrast .quiz-card),
:global(.accessible-contrast .quiz-option-box),
:global(.accessible-contrast .quiz-input),
:global(.accessible-contrast .quiz-how li),
:global(.accessible-contrast .quiz-help) { background: #000 !important; color: #fff !important; border-color: #fff !important; }
:global(.accessible-contrast .quiz-primary) { background: #ffeb3b !important; color: #000 !important; }
:global(.accessible-contrast .quiz-whatsapp) { background: #000 !important; border: 2px solid #ffeb3b; color: #ffeb3b !important; }
:global(.accessible-contrast .quiz-card i) { color: #ffeb3b !important; }
:global(.accessible-readable .quiz-lead),
:global(.accessible-readable .quiz-help),
:global(.accessible-readable .quiz-option-text) { line-height: 2; letter-spacing: .035em; }
</style>
