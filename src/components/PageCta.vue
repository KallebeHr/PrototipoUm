<script setup>
  import { quizVisible, whatsappLink } from '../composables/useOffers'
  import { siteConfig as c } from '../config/siteConfig'

  defineProps({
    title: { type: String, default: 'Quer conversar sobre o seu caso?' },
    text: { type: String, default: 'Conte sua situação pelo WhatsApp ou responda ao questionário: a equipe retorna com os próximos passos.' },
    message: { type: String, default: '' },
  })
</script>

<template>
  <section aria-labelledby="cta-title" class="pg-cta">
    <h2 id="cta-title">{{ title }}</h2>
    <p>{{ text }}</p>
    <div class="pg-actions">
      <a
        class="pg-btn pg-btn--wa"
        :href="whatsappLink(c.contact.whatsapp, message || c.contact.whatsappMessage)"
        rel="noopener noreferrer"
        target="_blank"
      >
        <i aria-hidden="true" class="mdi mdi-whatsapp" /> Falar pelo WhatsApp<span class="sr-only"> (abre em nova aba)</span>
      </a>
      <a v-if="quizVisible('site')" class="pg-btn" href="/ajuda">
        <i aria-hidden="true" class="mdi mdi-chat-question-outline" /> {{ c.quiz.buttonLabel }}
      </a>
    </div>
  </section>
</template>
