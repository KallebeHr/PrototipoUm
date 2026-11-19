<script setup>
  import { computed } from 'vue'
  import { siteConfig as c } from '../config/siteConfig'
  import PostCard from './PostCard.vue'
  import '../styles/pages.css'

  const posts = computed(() => (c.blog?.enabled && c.blog.showOnHome !== false
    ? [...(c.blog.posts || [])].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
    : []))
</script>

<template>
  <section v-if="posts.length > 0" id="artigos" aria-labelledby="blog-title" class="content-section">
    <p v-if="c.blog.eyebrow" class="eyebrow">{{ c.blog.eyebrow }}</p>
    <h2 id="blog-title">{{ c.blog.title }}</h2>
    <p style="max-width:620px;color:#59656d;margin-bottom:28px">{{ c.blog.description }}</p>
    <ul class="pg-cards">
      <PostCard v-for="post in posts" :key="post.slug" :post="post" />
    </ul>
    <div class="pg-actions"><a class="pg-btn pg-btn--ghost" href="/blog">Ver todos os artigos</a></div>
  </section>
</template>
