<script setup>
  import { siteConfig as c, whatsappUrl } from '../config/siteConfig'
</script>

<template>
  <section id="areas" class="content-section">
    <p class="eyebrow">ATUAÇÃO JURÍDICA</p>
    <h2>Conhecimento a serviço de você</h2>
    <div class="areas-grid">
      <details v-for="(area, index) in c.practiceAreas" :id="`area-${index}`" :key="area.title">
        <summary>{{ area.title }}<i aria-hidden="true" class="mdi mdi-plus" /></summary>
        <p>{{ area.description }}</p>
        <a v-if="area.page" :href="`/areas/${area.slug}`">Saiba mais sobre esta área
          <i aria-hidden="true" class="mdi mdi-arrow-right" /></a>
        <a :href="whatsappUrl(`Olá! Gostaria de orientação sobre ${area.title}.`)" rel="noopener" target="_blank">Conversar sobre esta área
          <i aria-hidden="true" class="mdi mdi-arrow-top-right" /></a>
      </details>
    </div>
  </section>
  <section aria-labelledby="journey-title" class="content-section service-journey">
    <div>
      <p class="eyebrow">ATENDIMENTO SEM COMPLICAÇÃO</p>
      <h2 id="journey-title">Entenda como funciona</h2>
      <p>Uma jornada simples para você saber o que acontece desde o primeiro contato.</p>
    </div>
    <ol>
      <li v-for="(step, index) in c.serviceJourney" :key="step.title"><span>0{{ index + 1 }}</span><i
        aria-hidden="true"
        class="mdi"
        :class="step.icon"
      />
        <h3>{{ step.title }}</h3>
        <p>{{ step.text }}</p>
      </li>
    </ol>
  </section>
</template>
