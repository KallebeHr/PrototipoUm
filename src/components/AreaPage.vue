<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { whatsappLink } from '../composables/useOffers'
  import { siteConfig as c } from '../config/siteConfig'
  import PageCta from './PageCta.vue'
  import PageShell from './PageShell.vue'
  import PostCard from './PostCard.vue'

  const props = defineProps({ slug: { type: String, required: true } })
  const title = ref(null)
  const area = computed(() => c.practiceAreas.find(a => a.slug === props.slug && a.page))
  const posts = computed(() => (c.blog?.enabled ? c.blog.posts.filter(p => p.area === props.slug) : []))
  const others = computed(() => c.practiceAreas.filter(a => a.page && a.slug !== props.slug))
  onMounted(() => title.value?.focus({ preventScroll: true }))
</script>

<template>
  <PageShell>
    <template v-if="area">
      <nav aria-label="Você está em" class="pg-crumbs"><a href="/">Início</a><span aria-hidden="true">/</span><a href="/#areas">Áreas de atuação</a><span aria-hidden="true">/</span><span>{{ area.title }}</span></nav>
      <header class="pg-hero">
        <p class="eyebrow">Áreas de atuação</p>
        <h1 ref="title" tabindex="-1">{{ area.pageTitle || area.title }}</h1>
        <p class="pg-lead">{{ area.intro || area.description }}</p>
        <div class="pg-actions">
          <a
            class="pg-btn pg-btn--wa"
            :href="whatsappLink(c.contact.whatsapp, `Olá! Gostaria de orientação sobre ${area.title}.`)"
            rel="noopener noreferrer"
            target="_blank"
          ><i aria-hidden="true" class="mdi mdi-whatsapp" /> Conversar sobre {{ area.title }}<span class="sr-only"> (abre em nova aba)</span></a>
        </div>
      </header>

      <section v-if="area.topics?.length" aria-labelledby="topics-title" class="pg-section">
        <h2 id="topics-title">Em que situações podemos ajudar</h2>
        <ul class="pg-topics"><li v-for="t in area.topics" :key="t"><i aria-hidden="true" class="mdi mdi-check-circle-outline" /><span>{{ t }}</span></li></ul>
      </section>

      <section v-if="area.faq?.length" aria-labelledby="faq-title" class="pg-section">
        <h2 id="faq-title">Perguntas frequentes</h2>
        <div class="pg-faq">
          <details v-for="item in area.faq" :key="item.question"><summary>{{ item.question }}</summary><p>{{ item.answer }}</p></details>
        </div>
      </section>

      <PageCta :message="`Olá! Vim pela página de ${area.title} e gostaria de orientação.`" />

      <section v-if="posts.length > 0" aria-labelledby="posts-title" class="pg-section">
        <h2 id="posts-title">Artigos sobre {{ area.title }}</h2>
        <ul class="pg-cards"><PostCard v-for="p in posts" :key="p.slug" :post="p" /></ul>
      </section>

      <section v-if="others.length > 0" aria-labelledby="others-title" class="pg-section">
        <h2 id="others-title">Outras áreas</h2>
        <div class="pg-links"><a v-for="o in others" :key="o.slug" :href="`/areas/${o.slug}`">{{ o.title }}</a></div>
      </section>
    </template>
  </PageShell>
</template>
