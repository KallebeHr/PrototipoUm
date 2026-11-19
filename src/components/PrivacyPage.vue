<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { analyticsConfigured, openCookiePreferences } from '../composables/useConsent'
  import { siteConfig as c } from '../config/siteConfig'
  import PageShell from './PageShell.vue'

  const title = ref(null)
  const p = computed(() => c.privacy)
  const controller = computed(() => p.value.controllerName || c.brand.officeName)
  const email = computed(() => p.value.contactEmail || c.contact.email)
  const quizOn = computed(() => Boolean(c.quiz?.enabled && c.quiz.questions?.length))
  const quizFields = computed(() => (c.quiz?.questions || []).map(q => q.label || q.title))
  const reviewsOn = computed(() => Boolean(c.googleReviews?.enabled))
  const analyticsOn = computed(() => analyticsConfigured())
  const tools = computed(() => [c.analytics?.ga4Id && 'Google Analytics 4', c.analytics?.metaPixelId && 'Meta Pixel'].filter(Boolean).join(' e '))
  onMounted(() => title.value?.focus({ preventScroll: true }))
</script>

<template>
  <PageShell>
    <article class="pg-doc">
      <nav aria-label="Você está em" class="pg-crumbs"><a href="/">Início</a><span aria-hidden="true">/</span><span>Política de Privacidade</span></nav>
      <p class="eyebrow">LGPD · Lei nº 13.709/2018</p>
      <h1 ref="title" tabindex="-1">Política de Privacidade</h1>
      <p class="pg-updated">Última atualização: {{ p.lastUpdate }}</p>

      <p>Esta política explica como o site de {{ c.brand.officeName }} trata dados pessoais, em linguagem simples e conforme a Lei Geral de Proteção de Dados (LGPD).</p>

      <h2>1. Quem é o responsável</h2>
      <p>
        O controlador dos dados é <strong>{{ controller }}</strong><template v-if="p.document"> ({{ p.document }})</template>,
        {{ c.brand.oab }}, com endereço em {{ c.contact.address }}, {{ c.contact.city }}<template v-if="c.contact.zipCode">, CEP {{ c.contact.zipCode }}</template>.
      </p>

      <h2>2. Quais dados tratamos e como</h2>
      <ul>
        <li><strong>Contato pelo WhatsApp:</strong> ao tocar em um botão de WhatsApp, a conversa é aberta no seu aplicativo. Os dados que você escrever ali ficam sob o tratamento do WhatsApp (Meta) e do escritório.</li>
        <li v-if="quizOn">
          <strong>Questionário de ajuda:</strong> solicitamos {{ quizFields.join(', ') }}.
          As respostas são organizadas no seu próprio aparelho e <strong>não são enviadas nem armazenadas em servidores deste site</strong>.
          Elas só chegam ao escritório se você tocar em enviar, e seguem pelo WhatsApp.
        </li>
        <li><strong>Dados técnicos de acesso:</strong> como em qualquer site, o provedor de hospedagem pode registrar dados como endereço IP, navegador e data/hora do acesso, para segurança e funcionamento do serviço.</li>
        <li v-if="reviewsOn"><strong>Avaliações do Google:</strong> exibimos informações públicas do perfil do escritório no Google Maps. Veja a <a href="/avaliacoes/privacidade">privacidade das avaliações</a>.</li>
        <li><strong>Recurso de Libras (VLibras):</strong> só é carregado, a partir do portal do Governo Federal, quando você ativa esse recurso no menu de acessibilidade.</li>
        <li><strong>Preferências de acessibilidade:</strong> ficam apenas no seu navegador.</li>
        <li v-if="analyticsOn"><strong>Cookies de medição ({{ tools }}):</strong> usados para entender como o site é utilizado e a origem dos contatos. Só são ativados se você aceitar no aviso de cookies.</li>
        <li v-else><strong>Cookies:</strong> este site não utiliza cookies de publicidade ou de medição de audiência.</li>
      </ul>

      <h2>3. Para que usamos e em que base legal</h2>
      <ul>
        <li><strong>Responder ao seu contato e iniciar o atendimento:</strong> procedimentos preliminares a pedido seu (art. 7º, V, da LGPD) e, quando você preenche o questionário, o seu consentimento (art. 7º, I).</li>
        <li><strong>Segurança e funcionamento do site, e cumprimento de obrigações legais e profissionais:</strong> art. 7º, II e IX.</li>
        <li v-if="analyticsOn"><strong>Medição de audiência:</strong> seu consentimento (art. 7º, I), que você pode revogar a qualquer momento.</li>
      </ul>
      <p>Não vendemos dados pessoais e não os usamos para decisões automatizadas. Evite enviar dados sensíveis, senhas ou documentos completos no primeiro contato.</p>

      <h2>4. Compartilhamento</h2>
      <p>
        Os dados podem ser tratados por prestadores necessários ao serviço: WhatsApp/Meta, a hospedagem do site
        <template v-if="reviewsOn">, Google (avaliações e mapas)</template><template v-if="analyticsOn"> e {{ tools }}</template>.
        Também podemos compartilhar informações com autoridades quando houver obrigação legal. As informações do seu caso são protegidas pelo sigilo profissional da advocacia.
      </p>
      <p>Alguns desses serviços podem armazenar dados fora do Brasil. Nesses casos, adotamos serviços que declaram observar padrões adequados de proteção.</p>

      <h2>5. Por quanto tempo guardamos</h2>
      <p>{{ p.retentionNote }}</p>

      <h2>6. Seus direitos</h2>
      <p>Você pode solicitar, a qualquer momento (art. 18 da LGPD):</p>
      <ul>
        <li>confirmação de que tratamos seus dados e acesso a eles;</li>
        <li>correção de dados incompletos ou desatualizados;</li>
        <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
        <li>portabilidade, quando aplicável;</li>
        <li>informações sobre compartilhamento e sobre a possibilidade de não consentir;</li>
        <li>revogação do consentimento.</li>
      </ul>
      <p>
        Para exercer esses direitos, fale com a gente
        <template v-if="email">por e-mail em <a :href="`mailto:${email}`">{{ email }}</a> ou </template>pelo
        <a :href="`https://wa.me/${c.contact.whatsapp}`" rel="noopener noreferrer" target="_blank">WhatsApp (abre em nova aba)</a>.
        Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
      </p>

      <h2 v-if="analyticsOn">7. Cookies de medição</h2>
      <p v-if="analyticsOn">
        Você pode mudar sua escolha quando quiser.
        <button class="pg-btn pg-btn--ghost" type="button" @click="openCookiePreferences">Gerenciar preferências de cookies</button>
      </p>

      <h2>{{ analyticsOn ? '8' : '7' }}. Segurança e crianças</h2>
      <p>Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados. Este site não é direcionado a crianças; no caso de menores, o contato deve ser feito pelo responsável legal.</p>

      <h2>{{ analyticsOn ? '9' : '8' }}. Atualizações</h2>
      <p>Esta política pode ser atualizada. A data da última revisão aparece no topo desta página.</p>
    </article>
  </PageShell>
</template>