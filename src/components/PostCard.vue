<script setup>
  defineProps({ post: { type: Object, required: true } })
  const formatDate = iso => new Date(`${iso}T12:00:00Z`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' })
</script>

<template>
  <li class="pg-card">
    <img
      v-if="post.image"
      alt=""
      class="pg-card-art"
      height="320"
      loading="lazy"
      :src="post.image"
      width="640"
    >
    <div v-else aria-hidden="true" class="pg-card-art"><i class="mdi mdi-text-box-outline" /></div>
    <div class="pg-card-body">
      <p class="pg-card-meta">{{ post.category }} · {{ formatDate(post.date) }}</p>
      <h3><a :href="`/blog/${post.slug}`">{{ post.title }}</a></h3>
      <p>{{ post.excerpt }}</p>
      <span aria-hidden="true" class="pg-card-more">Ler artigo →</span>
    </div>
  </li>
</template>
