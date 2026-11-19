<script setup>
  import { computed } from 'vue'
  import { quizVisible } from '../composables/useOffers'
  import { siteConfig as c, whatsappUrl } from '../config/siteConfig'
  import AccessibilityMenu from './AccessibilityMenu.vue'
  import FooterSection from './FooterSection.vue'
  import '../styles/pages.css'

  const nav = computed(() => [
    ['Início', '/'],
    ['Áreas', '/#areas'],
    ...(c.blog?.enabled ? [[c.blog.title, '/blog']] : []),
    ...(quizVisible('site') ? [[c.quiz.buttonLabel, '/ajuda']] : []),
  ])
</script>

<template>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="pg-header">
    <div class="wrap pg-header-inner">
      <a aria-label="Ir para o início do site" class="pg-brand" href="/">
        <img
          v-if="c.brand.logo"
          alt=""
          height="38"
          :src="c.brand.logo"
          width="38"
        >
        <span>{{ c.brand.shortName }}</span>
      </a>
      <nav aria-label="Navegação principal" class="pg-nav">
        <a v-for="[label, href] in nav" :key="href" :href="href">{{ label }}</a>
        <a class="pg-nav-cta" :href="whatsappUrl()" rel="noopener noreferrer" target="_blank">WhatsApp</a>
      </nav>
    </div>
  </header>
  <main id="conteudo" class="wrap pg-main" tabindex="-1">
    <slot />
  </main>
  <FooterSection />
  <AccessibilityMenu />
</template>
