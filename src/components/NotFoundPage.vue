<script setup>
  import { onMounted, ref } from 'vue'
  import PageShell from './PageShell.vue'
  const title = ref(null)
  onMounted(() => title.value?.focus({ preventScroll: true }))
</script>

<template>
  <PageShell>
    <header class="pg-hero">
      <p class="eyebrow">Erro 404</p>
      <h1 ref="title" tabindex="-1">Página não encontrada</h1>
      <p class="pg-lead">O endereço pode ter mudado ou não existir mais. Volte ao início para encontrar o que procura.</p>
      <div class="pg-actions"><a class="pg-btn" href="/">Ir para o início</a></div>
    </header>
  </PageShell>
</template>
