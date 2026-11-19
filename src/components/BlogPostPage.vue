<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { siteConfig as c } from '../config/siteConfig'
  import PageCta from './PageCta.vue'
  import PageShell from './PageShell.vue'
  import PostCard from './PostCard.vue'

  const props = defineProps({ slug: { type: String, required: true } })
  const title = ref(null)
  const post = computed(() => c.blog.posts.find(p => p.slug === props.slug))
  const area = computed(() => c.practiceAreas.find(a => a.slug === post.value?.area && a.page))
  const more = computed(() => c.blog.posts.filter(p => p.slug !== props.slug).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2))
  const date = computed(() => new Date(`${post.value.date}T12:00:00Z`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }))
  onMounted(() => title.value?.focus({ preventScroll: true }))
</script>

<template>
  <PageShell>
    <article v-if="post" class="pg-article">
      <nav aria-label="Você está em" class="pg-crumbs">
        <a href="/">Início</a><span aria-hidden="true">/</span><a href="/blog">{{ c.blog.title }}</a>
      </nav>
      <p class="eyebrow">{{ post.category }}</p>
      <h1 ref="title" tabindex="-1">{{ post.title }}</h1>
      <p class="pg-article-meta">
        <time :datetime="post.date">{{ date }}</time>
        <span v-if="post.readingTime">Leitura: {{ post.readingTime }}</span>
        <span>Por {{ c.brand.officeName }}</span>
      </p>
      <template v-for="(block, i) in post.body" :key="i">
        <h2 v-if="block.type === 'h2'">{{ block.text }}</h2>
        <ul v-else-if="block.type === 'ul'"><li v-for="item in block.items" :key="item">{{ item }}</li></ul>
        <p v-else>{{ block.text }}</p>
      </template>
      <p v-if="c.blog.disclaimer" class="pg-note">{{ c.blog.disclaimer }}</p>
      <div v-if="area" class="pg-actions">
        <a class="pg-btn pg-btn--ghost" :href="`/areas/${area.slug}`">Conheça a área: {{ area.title }}</a>
      </div>
    </article>
    <PageCta :message="`Olá! Li o artigo “${post?.title}” no site e gostaria de orientação.`" />
    <section v-if="more.length > 0" aria-labelledby="more-title" class="pg-section">
      <h2 id="more-title">Continue lendo</h2>
      <ul class="pg-cards"><PostCard v-for="p in more" :key="p.slug" :post="p" /></ul>
    </section>
  </PageShell>
</template>
