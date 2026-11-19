<script setup>
  import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
  import { consent } from '../composables/useConsent'
  import { whatsappLink } from '../composables/useOffers'
  import { siteConfig as c } from '../config/siteConfig'

  // Botão fixo de WhatsApp. A mensagem muda conforme a seção visível (home)
  // ou a página aberta (pageMessage), para o contato já chegar contextualizado.
  const props = defineProps({ pageMessage: { type: String, default: '' } })

  const section = ref('')
  const bubble = ref(false)
  const dismissed = ref(false)
  const messageIndex = ref(0)
  let ticking = false
  let firstTimer
  let intervalTimer
  let hideTimer
  let scanTimer

  const message = computed(() => props.pageMessage || c.conversion?.sectionMessages?.[section.value] || c.contact.whatsappMessage)
  const href = computed(() => whatsappLink(c.contact.whatsapp, message.value))
  const enabled = computed(() => c.conversion?.floatingWhatsapp?.enabled !== false)

  function showBubble () {
    if (dismissed.value || document.hidden) return
    bubble.value = true
    hideTimer = setTimeout(() => {
      bubble.value = false
      messageIndex.value++
    }, 9000)
  }

  // Descobre a seção "atual": a que cruza a linha de leitura (45% da altura da tela).
  // No fim da página, vale a última seção listada que esteja visível.
  function detectSection () {
    ticking = false
    const line = window.innerHeight * 0.45
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8
    let found = ''
    let lastVisible = ''
    for (const id of Object.keys(c.conversion?.sectionMessages || {})) {
      const el = document.querySelector(`#${id}`)
      if (!el) continue
      const r = el.getBoundingClientRect()
      if (r.top <= line && r.bottom > line) found = id
      if (r.top < window.innerHeight && r.bottom > 0) lastVisible = id
    }
    section.value = atBottom && lastVisible ? lastVisible : found
  }
  function onScroll () {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(detectSection)
    }
  }
  function watchSections () {
    if (props.pageMessage) return
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    detectSection()
  }

  onMounted(async () => {
    await nextTick()
    watchSections()
    scanTimer = setTimeout(detectSection, 1500) // seções carregadas depois (ex.: avaliações)
    firstTimer = setTimeout(showBubble, c.whatsappWidget.firstDelay)
    intervalTimer = setInterval(showBubble, c.whatsappWidget.interval)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    clearTimeout(firstTimer)
    clearTimeout(hideTimer)
    clearTimeout(scanTimer)
    clearInterval(intervalTimer)
  })
</script>

<template>
  <Teleport to="body">
    <div v-if="enabled" v-show="!consent.bannerOpen" class="whatsapp-widget">
      <div v-if="bubble" class="whatsapp-bubble">
        <button aria-label="Não mostrar mais mensagens" @click="dismissed = true; bubble = false">
          <i aria-hidden="true" class="mdi mdi-close" />
        </button>
        <p>{{ c.whatsappWidget.messages[messageIndex % c.whatsappWidget.messages.length] }}</p>
        <a :data-section="section || 'topo'" :href="href" rel="noopener" target="_blank">Iniciar conversa</a>
      </div>
      <a
        aria-label="Conversar pelo WhatsApp (abre em nova aba)"
        class="whatsapp-button"
        :data-section="section || 'topo'"
        :href="href"
        rel="noopener"
        target="_blank"
      >
        <i aria-hidden="true" class="mdi mdi-whatsapp" />
      </a>
    </div>
  </Teleport>
</template>
