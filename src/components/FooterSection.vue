<script setup>
  import { computed } from 'vue'
  import { analyticsConfigured, openCookiePreferences } from '../composables/useConsent'
  import { quizVisible, salesPageEnabled, salesPagePath, visibleProducts } from '../composables/useOffers'
  import { siteConfig as c } from '../config/siteConfig'

  const socialLinks = computed(() => Object.entries(c.social).filter(([, url]) => url))
  const currentYear = new Date().getFullYear()
</script>

<template>
  <footer>
    <div class="wrap footer-inner">
      <span>{{ c.brand.officeName }}<small>{{ c.brand.oab }}</small></span>
      <p>© {{ currentYear }} · Todos os direitos reservados.</p>
      <nav aria-label="Links do escritório e redes sociais" class="social-links">
        <a href="/linkbio">Link na bio</a>
        <a v-if="salesPageEnabled()" :href="salesPagePath()">{{ c.products.page.navLabel || 'Produtos' }}</a>
        <a v-else-if="visibleProducts('site').length > 0" href="/#produtos">{{ c.products.title }}</a>
        <a v-if="quizVisible('site')" href="/ajuda">Questionário</a>
        <a v-if="c.blog?.enabled" href="/blog">{{ c.blog.title }}</a>
        <a v-if="c.privacy?.enabled" href="/privacidade">Privacidade</a>
        <a v-if="analyticsConfigured()" href="#cookies" role="button" @click.prevent="openCookiePreferences">Cookies</a>
        <a v-if="c.googleReviews?.enabled" href="#avaliacoes">Avaliações</a>
        <a
          v-for="[network, url] in socialLinks"
          :key="network"
          :href="url"
          rel="noopener"
          target="_blank"
        >{{ network }}</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.social-links { flex-wrap: wrap; }
</style>
