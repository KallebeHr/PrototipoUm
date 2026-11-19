<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { siteConfig as c } from '../config/siteConfig'
  import PageCta from './PageCta.vue'
  import PageShell from './PageShell.vue'
  import PostCard from './PostCard.vue'

  const title = ref(null)
  const posts = computed(() => [...(c.blog.posts || [])].sort((a, b) => b.date.localeCompare(a.date)))
  onMounted(() => title.value?.focus({ preventScroll: true }))
</script>

<template>
  <PageShell>
    <nav aria-label="Você está em" class="pg-crumbs"><a href="/">Início</a><span aria-hidden="true">/</span><span>{{ c.blog.title }}</span></nav>
    <header class="pg-hero">
      <p class="eyebrow">{{ c.blog.eyebrow }}</p>
      <h1 ref="title" tabindex="-1">{{ c.blog.title }}</h1>
      <p class="pg-lead">{{ c.blog.description }}</p>
    </header>
    <ul class="pg-cards"><PostCard v-for="post in posts" :key="post.slug" :post="post" /></ul>
    <p v-if="c.blog.disclaimer" class="pg-note">{{ c.blog.disclaimer }}</p>
    <PageCta />
  </PageShell>
</template>
