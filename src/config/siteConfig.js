import { reactive } from 'vue'
import { originSuffix } from '../composables/useOrigin.js'

// ═════════════════════════════════════════════════════════════════════════
// Conteúdo reunido de:
//   • https://arlleyabelha.com.br/  (site principal, com CNPJ e razão social)
//   • https://abelha.adv.br/        (site secundário, mesmo conteúdo, outro WhatsApp)
//   • Hotmart: Mapa da Inquirição - Arlley Abelha
//
// ⚠ ITENS MARCADOS COM "CONFIRMAR" não constavam nos sites e precisam ser
//   preenchidos/validados pelo escritório antes de publicar.
// ═════════════════════════════════════════════════════════════════════════

export const siteConfig = reactive({
  brand: {
    officeName: 'Arlley Abelha Advocacia',
    shortName: 'Arlley Abelha',
    professionalName: 'Arlley Abelha',
    oab: 'OAB/MG 101.840',
    logo: '/LogoPng04.png',
    initials: 'AA',
    favicon: '/LogoPng04.png',
    developer: 'Kallebe Max',
  },

  theme: {
    primary: '#7A6252',
    primaryDark: '#6D090A',
    secondary: '#6D090A',
    accent: '#E6D5C3',
    surface: '#FFFFFF',
    surfaceSoft: '#F7F4F0',
    text: '#2C2A29',
  },

  hero: {
    eyebrow: 'Arlley Abelha | Advocacia',
    title: 'Precisando de um especialista em execução penal?',
    highlight: 'execução penal',
    subtitle: 'Assistência jurídica para pessoas privadas de liberdade e seus familiares, com atendimento humanizado. Atuamos em todo o Brasil.',
    video: '/IMG-VIDEOS/Teste.mp4', // CONFIRMAR: trocar pelo vídeo do Arlley
    backgroundImage: '/media/Banner3.png', // CONFIRMAR: trocar pela imagem do novo site
    ctaLabel: 'Fale com um especialista agora',
    highlights: [
      'Execução penal',
      'Atendimento humanizado',
      'Atuação em todo o Brasil',
    ],
  },

  contact: {
    // WhatsApp principal: o do site arlleyabelha.com.br.
    // O site abelha.adv.br usa outro número: (31) 97264-8424 → 5531972648424.
    // Para dividir os atendimentos entre os dois, use quiz.whatsapp ou o campo
    // "whatsapp" em cada opção do quiz.
    phone: '(31) 99655-4528',
    phoneRaw: '5531996554528',
    whatsapp: '5531996554528',
    whatsappMessage: 'Olá, vim pelo site, preciso de um especialista em execução penal.',
    email: '', // CONFIRMAR: os sites exibiam um e-mail de exemplo (email@email.com.br)
    address: 'Avenida Presidente Kubitschek, 474, sala 101, 1º andar, Centro',
    city: 'Betim/MG',
    zipCode: '', // CONFIRMAR: CEP não consta nos sites
    businessHours: '', // CONFIRMAR
    emergencyPhone: '',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Avenida+Presidente+Kubitschek+474+Centro+Betim+MG',
    mapZoom: 16,
    latitude: -19.9677,
    longitude: -44.1984,
  },

  booking: {
    url: '',
    modes: ['Presencial', 'Online'],
  },

  // Listas de documentos exibidas no site. "approved: false" = ainda não revisada
  // pelo advogado. Revise e mude para true (com reviewedBy/reviewedAt) para publicar.
  documentChecklists: [
    {
      area: 'Pedidos de progressão de regime',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documento de identificação de quem está fazendo o contato',
        'Nome completo e, se souber, número de matrícula da pessoa presa',
        'Número do processo de execução ou da guia de execução, se houver',
        'Sentença, acórdão ou atestado de pena, se disponíveis',
      ],
    },
    {
      area: 'Relatórios processuais',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Número do processo de execução, se houver',
        'Nome completo da pessoa presa e unidade prisional',
        'Documentos do processo que a família já possua',
      ],
    },
    {
      area: 'Habilitação para casamento de pessoas privadas de liberdade',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documentos de identificação dos dois noivos',
        'Certidões de nascimento ou de casamento anterior com averbação, conforme o caso',
        'Informações da unidade prisional onde a pessoa está',
      ],
    },
    {
      area: 'Defesa em processo administrativo disciplinar',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Comunicado ou documento que informe a falta atribuída',
        'Data do fato e unidade prisional',
        'Número do processo de execução, se houver',
      ],
    },
    {
      area: 'Pedidos de livramento condicional',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Número do processo de execução, se houver',
        'Sentença, acórdão ou atestado de pena, se disponíveis',
        'Informações sobre trabalho, estudo e comportamento, se a família tiver',
      ],
    },
    {
      area: 'Atendimento Jurídico',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documento de identificação de quem está fazendo o contato',
        'Dados da pessoa presa (nome completo e unidade prisional)',
        'Qualquer documento do processo que a família já possua',
      ],
    },
  ],

  professionalProfiles: [
    {
      slug: 'arlley-abelha',
      registration: 'OAB/MG 101.840',
      education: [], // CONFIRMAR: formação, especializações
      areas: [
        'Execução penal',
        'Advocacia criminal',
      ],
      // CONFIRMAR: o "mais de 20 anos" vem da descrição do curso na Hotmart.
      biography: 'Arlley Abelha é advogado inscrito na OAB/MG sob o número 101.840 e dirige um escritório de assistência jurídica para pessoas privadas de liberdade e seus familiares. Atua em execução penal, com atendimento humanizado e atuação em todo o Brasil, e tem mais de 20 anos de experiência em advocacia criminal.',
      email: '',
      whatsapp: '',
    },
  ],

  social: {
    instagram: '', // CONFIRMAR: o Instagram não consta nos sites
  },

  linkBio: {
    title: 'Arlley Abelha',
    eyebrow: 'Advocacia · Execução Penal',
    description: 'Assistência jurídica para pessoas privadas de liberdade e seus familiares, com atendimento humanizado. Atuação em todo o Brasil.',
    coverImage: '',
    coverAlt: '',
    teamTitle: 'Fale com o advogado',
    whatsappMessage: 'Olá! Vim pelo link da bio e preciso de um especialista em execução penal.',
    // Mostra no máximo 3 pessoas de team. Para ocultar uma, use linkBio: false nela.
    quickLinks: [
      {
        label: 'Conheça o escritório',
        description: 'Assistência jurídica em execução penal, com atuação em todo o Brasil.',
        href: '#inicio',
        icon: 'mdi-web',
      },
      {
        label: 'Entre em contato',
        description: 'Atendimento online e presencial em Betim/MG.',
        href: '#contato',
        icon: 'mdi-message-text-outline',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUTOS E SERVIÇOS DIGITAIS
  // enabled: false  → nada aparece no site nem no link na bio.
  // enabled: true   → cada item vira um banner horizontal com título e botão.
  // Imagens: coloque em /public e informe o caminho (ex.: '/media/mapa.jpg').
  // Proporção recomendada da arte: 1200 x 480 px (horizontal).
  // ─────────────────────────────────────────────────────────────────────────
  products: {
    enabled: true,
    showOnSite: true,
    showOnLinkBio: true,
    eyebrow: 'Materiais e cursos',
    title: 'Conhecimento que também vira material',
    description: 'Além do atendimento jurídico, o escritório compartilha o que aprendeu na prática em cursos e materiais. Escolha o que faz sentido para você.',
    // Aviso (popup) que apresenta os produtos à venda. Aparece uma vez por visitante
    // dentro de `frequencyDays`, só na página inicial, depois do aviso de cookies.
    popup: {
      enabled: true,
      delayMs: 9000, // abre após este tempo...
      scrollPercent: 35, // ...ou quando a pessoa rolar esta % da página (o que vier primeiro)
      frequencyDays: 3, // depois de fechado, só volta a aparecer após N dias
      eyebrow: 'Novidade no escritório',
      title: 'Agora temos materiais à venda',
      text: 'Além do atendimento jurídico, você já pode conhecer os cursos e materiais do Arlley Abelha, feitos para quem quer aprender com a prática.',
      buttonLabel: 'Conhecer o material',
      dismissLabel: 'Agora não',
      allLabel: 'Ver todos os materiais',
    },
    // Desconto exibido no aviso, no popup, na vitrine e na página de vendas.
    // IMPORTANTE: o desconto precisa existir de verdade na Hotmart (preço promocional ou cupom).
    // `endsAt` (opcional, ex.: '2026-12-31T23:59:00-03:00') liga a contagem regressiva;
    // depois dessa data o desconto some sozinho de todo o site. Deixe '' para não usar prazo.
    discount: {
      enabled: true,
      percent: 20,
      label: 'de desconto',
      coupon: '', // CONFIRMAR: cupom da Hotmart (opcional). Aparece com botão "copiar".
      endsAt: '',
    },
    // Notificação no canto superior direito. Textos aceitam {percent}, {product} e {count}.
    toast: {
      enabled: true,
      firstDelayMs: 12000, // 1ª aparição
      intervalMs: 20000, // intervalo entre as aparições
      durationMs: 7000, // quanto tempo fica na tela
      maxShows: 0, // 0 = sem limite
      stopWhenDismissed: true, // se a pessoa fechar no X, não aparece mais nesta visita
      buttonLabel: 'Ver oferta',
      messages: [
        '{percent}% de desconto no {product}',
        'Mais de {count} advogados já aprendem com este método',
        'Aprenda a conduzir audiências com mais confiança',
      ],
    },
    // Página completa de vendas (rota própria). Para desligar: enabled: false.
    page: {
      enabled: true,
      path: '/produtos',
      navLabel: 'Produtos',
      eyebrow: 'Curso para advogados',
      title: 'Conduza audiências com mais segurança e perguntas mais certeiras',
      lead: 'O Mapa da Inquirição ensina a identificar os 4 perfis de testemunhas e a adaptar suas perguntas a cada um. Método prático de quem atua na área.',
      chips: ['Acesso pela Hotmart', 'Conteúdo prático', 'Para advogados e advogadas'],
      buyLabel: 'Quero o Mapa da Inquirição',
      questionsLabel: 'Tirar dúvidas no WhatsApp',
      proof: {
        stats: [
          { value: 50, prefix: '+', label: 'advogados satisfeitos' }, // CONFIRMAR: número real e comprovável
          { value: 4, prefix: '', label: 'perfis de testemunhas no método' },
        ],
        testimonials: [
          // { name: 'Nome', role: 'Advogado(a) · OAB/UF', text: 'Depoimento autorizado.' },
        ],
      },
      methodTitle: 'Como o método funciona',
      methodLead: 'Três movimentos simples para sair do improviso e entrar na audiência com um roteiro.',
      // CONFIRMAR: ajuste os textos ao conteúdo real do curso.
      steps: [
        { icon: 'mdi-account-search-outline', title: 'Identifique o perfil', text: 'Aprenda a reconhecer, logo nos primeiros minutos, com qual dos 4 perfis de testemunha você está lidando.' },
        { icon: 'mdi-help-circle-outline', title: 'Faça as perguntas certas', text: 'Adapte a forma e a ordem das perguntas ao perfil da testemunha para obter respostas úteis ao seu caso.' },
        { icon: 'mdi-shield-check-outline', title: 'Conduza com confiança', text: 'Entre na audiência com um caminho claro, menos improviso e mais controle sobre a inquirição.' },
      ],
      offerTitle: 'Condição especial para você começar agora',
      offerNote: 'O acesso e o pagamento são feitos com segurança pela Hotmart.',
      guarantee: '', // CONFIRMAR: política de garantia/reembolso da Hotmart (deixe vazio para não exibir)
      faqTitle: 'Perguntas frequentes',
      faq: [
        { question: 'Para quem é o Mapa da Inquirição?', answer: 'Para advogados e advogadas que atuam em audiências e querem conduzir a inquirição de testemunhas com mais método.' },
        { question: 'Como recebo o acesso?', answer: 'A compra é feita na Hotmart. Depois da confirmação do pagamento, o acesso é liberado por lá.' },
        { question: 'Posso tirar dúvidas antes de comprar?', answer: 'Sim. Use o botão de WhatsApp desta página e fale com o escritório.' },
      ],
      finalTitle: 'Pronto para levar mais método à sua próxima audiência?',
      finalText: 'Conheça o conteúdo e comece quando quiser.',
      disclaimer: 'Conteúdo educativo, sem promessa de resultado em processos. Cada caso depende de suas circunstâncias.',
    },
    items: [
      {
        title: 'Mapa da Inquirição',
        description: 'Aprenda a identificar os 4 perfis de testemunhas e a fazer as perguntas certas para conduzir audiências com mais confiança.',
        // CONFIRMAR: imagem hospedada na Hotmart (quadrada, pode ser cortada no banner).
        // Ideal: baixar, criar uma arte horizontal 1200x480 e salvar em /public/media/.
        image: '/media/mapa.png',
        imageAlt: 'Capa do curso Mapa da Inquirição',
        badge: 'Para advogados',
        audience: 'advogados', // 'advogados' | 'clientes' (usado nos filtros da vitrine)
        price: '', // CONFIRMAR: preço atual na Hotmart (texto livre, ex.: 'R$ 197')
        priceValue: 0, // CONFIRMAR: valor com desconto (número, ex.: 197). Com os dois valores, o preço "cai" animado na página de vendas.
        oldPriceValue: 0, // CONFIRMAR: valor sem desconto (número, ex.: 247)
        buttonLabel: 'Saiba mais',
        url: 'https://hotmart.com/pt-br/marketplace/produtos/mapa-da-inquiricao/M102229646W',
        whatsappMessage: 'Olá! Vi o Mapa da Inquirição no site e gostaria de saber mais.',
        external: true,
        showOnSite: true,
        showOnLinkBio: true,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTIONÁRIO DE AJUDA (página /ajuda)
  // enabled: false  → a página e os botões deixam de existir.
  // type da pergunta: 'single' | 'multiple' | 'text' | 'textarea' | 'phone'
  // showIf mostra a pergunta só se a resposta anterior combinar (usa "value").
  // Em options, { label, value, whatsapp }: com whatsapp preenchido, quem escolhe
  // aquela opção é encaminhado para esse número.
  // ─────────────────────────────────────────────────────────────────────────
  quiz: {
    enabled: false,
    showOnSite: false,
    showOnLinkBio: false,
    buttonLabel: 'Responder questionário',
    buttonDescription: 'Leva cerca de 3 minutos e agiliza seu atendimento',
    pageTitle: 'Vamos entender o caso',
    pageIntro: 'Responda algumas perguntas rápidas sobre a situação da pessoa que está cumprindo pena. No final, enviamos tudo organizado para o WhatsApp do escritório, para que o atendimento comece mais rápido.',
    estimatedTime: '3 minutos',
    privacyNote: 'Se tiver o número do processo, pode informar. Não envie senhas nem fotos de documentos. Nada é salvo em servidor: você só envia o que quiser.',
    whatsapp: '', // vazio: usa contact.whatsapp
    requireConsent: true,
    consentText: 'Concordo em compartilhar estas informações com o escritório pelo WhatsApp para receber orientação.',
    messageIntro: 'Olá! Respondi o questionário do site de Arlley Abelha Advocacia. Seguem minhas respostas:',
    finishTitle: 'Tudo pronto!',
    finishText: 'Confira o resumo e toque no botão para enviar suas respostas pelo WhatsApp.',
    finishButton: 'Enviar respostas pelo WhatsApp',
    questions: [
      {
        id: 'nome',
        label: 'Nome de quem está falando',
        title: 'Como podemos te chamar?',
        help: 'Usamos seu nome apenas para começar a conversa de forma mais pessoal.',
        type: 'text',
        placeholder: 'Seu nome',
        required: true,
        icon: 'mdi-account-outline',
      },
      {
        id: 'quem',
        label: 'Quem está pedindo ajuda',
        title: 'Quem está pedindo ajuda?',
        help: 'Muitos contatos vêm de familiares. A pessoa presa também pode ser atendida.',
        type: 'single',
        required: true,
        icon: 'mdi-account-group-outline',
        options: [
          { label: 'Sou familiar ou companheiro(a) de uma pessoa presa', value: 'familiar' },
          { label: 'Sou a própria pessoa (liberdade condicional ou regime aberto)', value: 'proprio' },
          { label: 'Sou advogado(a) ou outro profissional', value: 'profissional' },
        ],
      },
      {
        id: 'area',
        label: 'Assunto',
        title: 'Sobre qual assunto você precisa de ajuda?',
        help: 'Escolha o que mais se aproxima. Se não tiver certeza, marque a última opção: o advogado ajuda a identificar.',
        type: 'single',
        required: true,
        icon: 'mdi-scale-balance',
        options: [
          { label: 'Pedido de progressão de regime', value: 'progressao' },
          { label: 'Relatório do processo (entender a situação)', value: 'relatorio' },
          { label: 'Casamento com pessoa privada de liberdade', value: 'casamento' },
          { label: 'Defesa em processo disciplinar (falta na unidade)', value: 'pad' },
          { label: 'Pedido de livramento condicional', value: 'livramento' },
          { label: 'Outro assunto de execução penal / não sei', value: 'outro' },
        ],
      },
      {
        id: 'regime',
        label: 'Regime atual',
        title: 'Em qual regime a pessoa está?',
        help: 'Se não souber, marque “Não sei”. O advogado confere no processo.',
        type: 'single',
        required: true,
        icon: 'mdi-home-lock-outline',
        options: [
          'Fechado',
          'Semiaberto',
          'Aberto ou prisão domiciliar',
          'Livramento condicional',
          'Ainda aguardando julgamento (sem condenação definitiva)',
          'Não sei',
        ],
      },
      // ── Perguntas que só aparecem conforme a resposta anterior (showIf) ──
      {
        id: 'pena',
        label: 'Pena e tempo cumprido',
        title: 'Você sabe o tempo da pena e quanto já foi cumprido?',
        help: 'Uma ideia aproximada já ajuda a avaliar a situação. Pode deixar em branco.',
        type: 'text',
        placeholder: 'Ex.: pena de 8 anos, cumpridos cerca de 3',
        required: false,
        icon: 'mdi-calendar-range',
        showIf: { question: 'area', is: ['progressao', 'livramento', 'relatorio'] },
      },
      {
        id: 'pad_fase',
        label: 'Fase do processo disciplinar',
        title: 'Em que fase está o processo disciplinar?',
        help: 'A falta grave pode afetar os benefícios, então o prazo importa.',
        type: 'single',
        required: true,
        icon: 'mdi-gavel',
        showIf: { question: 'area', is: ['pad'] },
        options: [
          'Foi informada uma falta, mas o procedimento ainda não começou',
          'O procedimento disciplinar está em andamento',
          'Já houve decisão reconhecendo a falta',
          'Não sei',
        ],
      },
      {
        id: 'casamento_fase',
        label: 'Etapa do casamento',
        title: 'Em que etapa está o casamento?',
        help: 'Assim sabemos por onde começar a organização dos documentos.',
        type: 'single',
        required: true,
        icon: 'mdi-ring',
        showIf: { question: 'area', is: ['casamento'] },
        options: [
          'Ainda não iniciamos',
          'Já temos alguns documentos',
          'Já iniciamos a habilitação no cartório',
        ],
      },
      {
        id: 'processo',
        label: 'Número do processo',
        title: 'Você tem o número do processo de execução?',
        help: 'Opcional. Se tiver, ajuda a localizar o andamento. Se não tiver, tudo bem.',
        type: 'text',
        placeholder: 'Número do processo (opcional)',
        required: false,
        icon: 'mdi-file-document-outline',
      },
      {
        id: 'urgencia',
        label: 'Audiência, prazo ou decisão próxima',
        title: 'Há audiência, prazo ou decisão próxima?',
        help: 'Isso ajuda a equipe a priorizar casos com data marcada.',
        type: 'single',
        required: true,
        icon: 'mdi-alarm',
        options: [
          { label: 'Sim, nos próximos dias', value: 'dias' },
          { label: 'Sim, nas próximas semanas', value: 'semanas' },
          { label: 'Não que eu saiba', value: 'nao' },
          { label: 'Não sei', value: 'nsei' },
        ],
      },
      {
        id: 'data_prazo',
        label: 'Data da audiência ou do prazo',
        title: 'Você sabe a data?',
        help: 'Se tiver a data, informe. Se não souber, pode deixar em branco.',
        type: 'text',
        placeholder: 'Ex.: 25/12 ou “em 10 dias”',
        required: false,
        icon: 'mdi-calendar-alert',
        showIf: { question: 'urgencia', is: ['dias', 'semanas'] },
      },
      {
        id: 'atendimento',
        label: 'Formato preferido',
        title: 'Como prefere ser atendido?',
        help: 'O escritório fica em Betim/MG e atende online em todo o Brasil.',
        type: 'single',
        required: true,
        icon: 'mdi-video-outline',
        options: ['Online (WhatsApp ou vídeo)', 'Presencial em Betim/MG', 'Tanto faz'],
      },
      {
        id: 'relato',
        label: 'Resumo do caso',
        title: 'Quer contar em poucas palavras a situação?',
        help: 'Opcional. Um resumo curto já ajuda muito. Os detalhes ficam para a conversa.',
        type: 'textarea',
        placeholder: 'Ex.: Meu irmão está no regime fechado e queremos saber se já pode pedir progressão...',
        required: false,
        icon: 'mdi-text-box-outline',
      },
      {
        id: 'telefone',
        label: 'Telefone para retorno',
        title: 'Qual o melhor telefone para retorno?',
        help: 'Com DDD. Usamos somente para responder a este contato.',
        type: 'phone',
        placeholder: '(00) 00000-0000',
        required: true,
        icon: 'mdi-phone-outline',
      },
      {
        id: 'horario',
        label: 'Melhor horário para contato',
        title: 'Qual o melhor horário para falarmos com você?',
        help: 'Assim a equipe retorna quando for mais conveniente para você.',
        type: 'single',
        required: true,
        icon: 'mdi-clock-outline',
        options: [
          'Manhã (8h às 12h)',
          'Tarde (12h às 18h)',
          'Noite (18h às 21h)',
          'Tanto faz',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PRIVACIDADE (LGPD) E COOKIES
  // analytics.enabled: true + ga4Id/metaPixelId → aparece o aviso de cookies.
  // O site antigo arlleyabelha.com.br usava Google Tag Manager (GTM-MHKLJ74R).
  // Para continuar medindo, informe aqui o ID do GA4 (G-XXXXXXXXXX) que alimenta
  // essa conta, e/ou o ID do Pixel da Meta.
  // ─────────────────────────────────────────────────────────────────────────
  privacy: {
    enabled: true,
    lastUpdate: '19/11/2026',
    controllerName: 'Arlley Abelha Sociedade Individual de Advocacia',
    document: 'CNPJ 52.547.721/0001-10',
    contactEmail: '', // vazio: usa contact.email; se também vazio, usa o WhatsApp
    retentionNote: 'Mantemos as informações pelo tempo necessário para o atendimento solicitado e para cumprir obrigações legais e profissionais.',
  },

  analytics: {
    enabled: true,
    ga4Id: 'G-7QV205T34P', 
    metaPixelId: '',
    bannerTitle: 'Sua privacidade',
    bannerText: 'Usamos cookies de medição para entender como o site é usado e melhorar o atendimento. Eles só são ativados se você aceitar..',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ARTIGOS (blog) → /blog e /blog/<slug>
  // Os artigos abaixo são MODELOS informativos escritos a partir dos serviços
  // do site. CONFIRMAR: o advogado deve revisar tudo antes de publicar.
  // ─────────────────────────────────────────────────────────────────────────
  blog: {
    enabled: false,
    title: 'Artigos',
    eyebrow: 'Informação jurídica',
    description: 'Conteúdos informativos sobre execução penal para pessoas presas e seus familiares.',
    showOnHome: false,
    disclaimer: 'Conteúdo informativo, de caráter geral. Não substitui a análise do caso por advogado(a).',
    posts: [
      {
        slug: 'progressao-de-regime-como-funciona',
        title: 'Progressão de regime: como funciona o cumprimento da pena?',
        excerpt: 'Entenda como a pena é cumprida de forma progressiva e o que costuma ser analisado no pedido de progressão de regime.',
        date: '2026-11-12',
        category: 'Progressão de regime',
        area: 'progressao-de-regime',
        readingTime: '3 min',
        image: '',
        body: [
          { type: 'p', text: 'No Brasil, a pena privativa de liberdade é cumprida de forma progressiva. Conforme o tempo cumprido e o comportamento da pessoa, ela pode passar para um regime mais brando: por exemplo, do fechado para o semiaberto e do semiaberto para o aberto.' },
          { type: 'h2', text: 'O que costuma ser analisado' },
          { type: 'ul', items: [
            'Quanto da pena já foi cumprido (o percentual varia conforme o crime e a situação de cada pessoa);',
            'O comportamento durante o cumprimento da pena;',
            'Outros requisitos previstos em lei para cada caso.',
          ] },
          { type: 'h2', text: 'Quem decide' },
          { type: 'p', text: 'O pedido é analisado pelo juízo da execução penal, que avalia a documentação e o histórico do processo.' },
          { type: 'h2', text: 'Por que acompanhar o processo de perto' },
          { type: 'p', text: 'Datas e percentuais dependem de cálculos que mudam com fatores como remição e faltas disciplinares. Um relatório do processo ajuda a família a entender o que esperar. Cada caso exige análise individual.' },
        ],
      },
      {
        slug: 'falta-grave-o-que-e-e-por-que-a-defesa-importa',
        title: 'Falta grave na prisão: o que é e por que a defesa importa',
        excerpt: 'A pessoa presa pode responder a procedimento disciplinar. Veja por que a falta grave preocupa e por que a defesa técnica é importante.',
        date: '2026-11-05',
        category: 'Processo disciplinar',
        area: 'defesa-processo-disciplinar',
        readingTime: '3 min',
        image: '',
        body: [
          { type: 'p', text: 'Quando a pessoa presa é acusada de descumprir regras da unidade prisional, pode responder a um procedimento disciplinar. As faltas são classificadas como leves, médias ou graves.' },
          { type: 'h2', text: 'Por que a falta grave preocupa' },
          { type: 'ul', items: [
            'Pode afetar a concessão de benefícios;',
            'Pode levar à regressão de regime;',
            'Pode reduzir dias já remidos;',
            'Pode alterar a data usada para calcular novos benefícios.',
          ] },
          { type: 'h2', text: 'A importância da defesa técnica' },
          { type: 'p', text: 'O procedimento deve respeitar o direito de defesa. Uma defesa técnica e bem fundamentada busca evitar a aplicação da falta ou reduzir seus efeitos. Não há garantia de resultado: cada caso depende das provas e da análise de quem decide.' },
          { type: 'h2', text: 'O que a família pode fazer' },
          { type: 'p', text: 'Reúna as informações recebidas (comunicado, datas e unidade prisional) e procure orientação o quanto antes, pois existem prazos.' },
        ],
      },
      {
        slug: 'livramento-condicional-o-que-e',
        title: 'Livramento condicional: o que é e como funciona',
        excerpt: 'A lei permite que parte da pena seja cumprida em liberdade. Entenda os requisitos gerais e as condições do benefício.',
        date: '2026-10-29',
        category: 'Livramento condicional',
        area: 'livramento-condicional',
        readingTime: '2 min',
        image: '',
        body: [
          { type: 'p', text: 'O livramento condicional permite que a pessoa cumpra o restante da pena em liberdade, desde que preencha os requisitos da lei e respeite as condições impostas pela Justiça.' },
          { type: 'h2', text: 'Requisitos gerais' },
          { type: 'ul', items: [
            'Cumprimento de parte da pena (a fração varia conforme o caso);',
            'Comportamento satisfatório durante a execução;',
            'Outros requisitos previstos em lei.',
          ] },
          { type: 'h2', text: 'Durante o livramento' },
          { type: 'p', text: 'A pessoa deve cumprir as condições fixadas pelo juízo. O descumprimento pode levar à revogação do benefício.' },
          { type: 'h2', text: 'Como o pedido é analisado' },
          { type: 'p', text: 'O pedido é analisado pelo juízo da execução penal, com base no processo. Por isso, conferir a situação atual da pena é o primeiro passo.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CONVERSÃO (origem UTM na mensagem + botão fixo de WhatsApp por seção)
  // ─────────────────────────────────────────────────────────────────────────
  conversion: {
    originInMessage: true,
    floatingWhatsapp: {
      enabled: true,
    },
    sectionMessages: {
      areas: 'Olá! Estava vendo os serviços de execução penal no site e gostaria de orientação.',
      produtos: 'Olá! Vi o Mapa da Inquirição no site e gostaria de saber mais.',
      equipe: 'Olá! Conheci o escritório pelo site e gostaria de falar com o advogado.',
      artigos: 'Olá! Li os artigos do site e tenho uma dúvida sobre um caso de execução penal.',
      avaliacoes: 'Olá! Vi as avaliações do escritório e gostaria de atendimento.',
      contato: 'Olá! Vim pela seção de contato do site e preciso de um especialista em execução penal.',
    },
  },
 
  // As notas e avaliações são obtidas pelo servidor; nunca preencha notas fictícias.
  // ATENÇÃO: desligado de propósito. O servidor de avaliações usa o perfil do Google
  // configurado no ambiente; só ligue depois de conectar o perfil do Arlley Abelha,
  // para não exibir avaliações de outro escritório.
googleReviews: {
  enabled: true,
  showOnLinkBio: true,
  endpoint: '/api/google-reviews',
  title: 'Avaliações no Google',
  description: 'Veja o que os clientes dizem sobre o atendimento do escritório Arlley Abelha Advocacia.',
  profileUrl: 'https://www.google.com/maps/search/?api=1&query=Arlley+Abelha+Advocacia+Betim+MG',
  writeReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJR4zfmEvDpgAR-jyMfr7R_hY',
},

  about: {
    title: 'Assistência jurídica humanizada para pessoas privadas de liberdade e seus familiares',
    photo: '/media/banners.png', // CONFIRMAR: trocar pela foto do escritório/advogado
    photoAlt: 'Arlley Abelha Advocacia',
    // CONFIRMAR: o número de processos muda com o tempo. Atualize ou remova a frase final.
    text: 'Somos um escritório de assistência jurídica para pessoas que estão privadas de liberdade. Com um atendimento humanizado, lutamos pelos direitos do recluso e de seus familiares. O escritório é dirigido por Arlley Abelha, advogado ativo na OAB/MG sob o número 101.840, atualmente ativo em 1.387 processos.',
    subtitle: 'Execução penal com atendimento humanizado e atuação em todo o Brasil.',
    cards: [
      {
        icon: 'fa-solid fa-handshake-angle',
        title: 'Atendimento humanizado',
        desc: 'Atendimento próximo, que acolhe a pessoa presa e a sua família.',
      },
      {
        icon: 'fa-solid fa-gavel',
        title: 'Defesa técnica',
        desc: 'Atuação técnica na execução penal para resguardar os direitos do reeducando.',
      },
      {
        icon: 'fa-solid fa-file-lines',
        title: 'Clareza para a família',
        desc: 'Relatórios que explicam a situação do processo de forma clara e objetiva.',
      },
      {
        icon: 'fa-solid fa-earth-americas',
        title: 'Atuação em todo o Brasil',
        desc: 'Atendimento online e presencial, com escritório em Betim/MG.',
      },
    ],
  },

  practiceAreas: [
    {
      slug: 'progressao-de-regime',
      page: true,
      title: 'Pedidos de progressão de regime',
      description: 'O sistema prisional estabelece o cumprimento da pena de forma progressiva: conforme o tempo cumprido e o comportamento, a pessoa pode passar para um regime mais brando, como do fechado para o semiaberto e do semiaberto para o aberto.',
      icon: 'fa-solid fa-stairs',
      pageTitle: 'Pedido de progressão de regime: advogado de execução penal em Betim/MG e todo o Brasil',
      intro: 'A progressão de regime permite que a pena seja cumprida de forma mais branda quando a lei autoriza. O escritório analisa o processo, verifica os requisitos e acompanha o pedido até a decisão.',
      topics: [
        'Análise do tempo de pena cumprido e dos requisitos',
        'Pedido de progressão do regime fechado para o semiaberto',
        'Pedido de progressão do regime semiaberto para o aberto',
        'Acompanhamento do andamento e das decisões',
      ],
      faq: [
        {
          question: 'O que é progressão de regime?',
          answer: 'É a passagem da pessoa condenada para um regime de cumprimento de pena mais brando, por exemplo do fechado para o semiaberto e do semiaberto para o aberto, de acordo com o tempo cumprido e o comportamento.',
        },
        {
          question: 'Toda pessoa presa tem direito à progressão?',
          answer: 'A lei prevê a progressão quando os requisitos são cumpridos, como o tempo de pena e o comportamento. Os critérios variam conforme o crime e a situação de cada pessoa, por isso é necessário analisar o processo.',
        },
      ],
    },
    {
      slug: 'relatorios-processuais',
      page: true,
      title: 'Relatórios processuais',
      description: 'Muitas vezes os familiares não conseguem entender a situação atual e futura do processo. O relatório permite compreender, de forma clara e objetiva, os benefícios a que o reeducando tem direito.',
      icon: 'fa-solid fa-file-lines',
      pageTitle: 'Relatório do processo de execução penal: entenda a situação da pena',
      intro: 'O relatório processual traduz o processo para uma linguagem clara, para que a família saiba onde o caso está e o que pode acontecer nos próximos passos.',
      topics: [
        'Situação atual do processo de execução',
        'Benefícios a que a pessoa pode ter direito e previsão de datas',
        'Explicação em linguagem clara para os familiares',
      ],
      faq: [
        {
          question: 'Para quem serve o relatório processual?',
          answer: 'Para familiares e para a própria pessoa que cumpre pena e quer entender o andamento do processo e as possibilidades de benefícios, sem depender de termos técnicos.',
        },
        {
          question: 'O relatório garante a concessão de benefícios?',
          answer: 'Não. Ele explica a situação e as possibilidades. A concessão de qualquer benefício depende da análise do juízo da execução, conforme os requisitos da lei.',
        },
      ],
    },
    {
      slug: 'habilitacao-para-casamento',
      page: true,
      title: 'Habilitação para casamento de pessoas privadas de liberdade',
      description: 'O sonho do casamento muitas vezes é deixado de lado pela dificuldade e burocracia. O escritório se estruturou para realizá-lo, com apoio processual, documental e pessoal.',
      icon: 'fa-solid fa-ring',
      pageTitle: 'Casamento com pessoa privada de liberdade: habilitação e apoio completo',
      intro: 'Casar com uma pessoa que está presa envolve burocracia e etapas específicas. O escritório oferece apoio processual, documental e pessoal para que o casamento aconteça.',
      topics: [
        'Orientação sobre a documentação necessária',
        'Habilitação para o casamento',
        'Organização do ato junto à unidade prisional',
        'Apoio processual quando necessário',
      ],
      faq: [
        {
          question: 'Uma pessoa presa pode se casar?',
          answer: 'É possível. Há etapas e burocracia próprias, e o escritório auxilia em todo o caminho, com apoio processual, documental e pessoal.',
        },
        {
          question: 'Quais documentos são necessários?',
          answer: 'Em geral, documentos de identificação e certidões dos noivos, além do que o cartório e a unidade prisional exigirem. A lista varia conforme o caso, e o escritório orienta cada etapa.',
        },
      ],
    },
    {
      slug: 'defesa-processo-disciplinar',
      page: true,
      title: 'Defesa em processo administrativo disciplinar',
      description: 'Quando a pessoa presa é acusada de infringir uma norma, pode receber falta leve, média ou grave. A falta grave impede o usufruto de benefícios, por isso a defesa técnica e eficaz é importante.',
      icon: 'fa-solid fa-shield-halved',
      pageTitle: 'Defesa em processo disciplinar no presídio: falta grave e seus efeitos',
      intro: 'A falta grave pode impedir o acesso a benefícios previstos em lei. Uma defesa técnica busca evitar a falta ou reduzir seus efeitos, resguardando os direitos do reeducando.',
      topics: [
        'Defesa em procedimento disciplinar na unidade prisional',
        'Acompanhamento de faltas leves, médias e graves',
        'Atuação para resguardar benefícios do reeducando',
      ],
      faq: [
        {
          question: 'O que é falta grave?',
          answer: 'É a infração disciplinar mais séria no cumprimento da pena. Ela pode afetar benefícios, levar à regressão de regime e reduzir dias remidos, entre outros efeitos.',
        },
        {
          question: 'Por que a defesa é importante?',
          answer: 'Porque o procedimento deve respeitar o direito de defesa, e uma defesa técnica busca evitar a aplicação da falta ou reduzir suas consequências. Não é possível garantir resultado, pois cada caso depende das provas e da decisão.',
        },
      ],
    },
    {
      slug: 'livramento-condicional',
      page: true,
      title: 'Pedidos de livramento condicional',
      description: 'A lei permite que a pessoa presa cumpra parte do restante da pena em liberdade.',
      icon: 'fa-solid fa-lock-open',
      pageTitle: 'Pedido de livramento condicional: cumprir parte da pena em liberdade',
      intro: 'O livramento condicional permite cumprir parte do restante da pena em liberdade, quando os requisitos da lei são atendidos. O escritório analisa o processo e acompanha o pedido.',
      topics: [
        'Análise dos requisitos do livramento condicional',
        'Elaboração e acompanhamento do pedido',
        'Orientação sobre as condições durante o livramento',
      ],
      faq: [
        {
          question: 'O que é livramento condicional?',
          answer: 'É o benefício que permite à pessoa presa cumprir parte do restante da pena em liberdade, desde que preencha os requisitos legais e cumpra as condições fixadas pela Justiça.',
        },
        {
          question: 'Quais são os requisitos?',
          answer: 'De modo geral, é preciso cumprir parte da pena (a fração varia conforme o caso), ter comportamento satisfatório e atender aos demais requisitos da lei. O advogado analisa o processo para indicar se o pedido é viável.',
        },
      ],
    },
    {
      slug: 'atendimento-online',
      page: false,
      title: 'Atendimento Online',
      description: 'Atendimento jurídico online, com atuação em todo o Brasil.',
      icon: 'fa-solid fa-laptop',
    },
    {
      slug: 'atendimento-presencial',
      page: false,
      title: 'Atendimento Presencial',
      description: 'Atendimento presencial na Avenida Presidente Kubitschek, 474, sala 101, Centro, Betim/MG.',
      icon: 'fa-solid fa-building',
    },
  ],

  serviceJourney: [
    {
      icon: 'mdi-message-text-outline',
      title: 'Primeiro contato',
      text: 'Fale com o escritório pelo WhatsApp ou responda ao questionário do site e conte a situação da pessoa que está cumprindo pena.',
    },
    {
      icon: 'mdi-account-search-outline',
      title: 'Análise do processo',
      text: 'O advogado analisa o processo de execução para entender a situação atual, os prazos e os benefícios possíveis.',
    },
    {
      icon: 'mdi-file-sign',
      title: 'Orientação e atuação',
      text: 'Você recebe orientação clara sobre os próximos passos e o escritório atua nos pedidos e defesas necessários.',
    },
  ],

  faq: [
    {
      question: 'Quais serviços o escritório oferece?',
      answer: 'O escritório atua em execução penal: pedidos de progressão de regime, relatórios processuais, habilitação para casamento de pessoas privadas de liberdade, defesa em processo administrativo disciplinar e pedidos de livramento condicional.',
    },
    {
      question: 'O escritório atende em todo o Brasil?',
      answer: 'Sim. O escritório atua em todo o Brasil, com atendimento online, e também atende presencialmente em Betim/MG.',
    },
    {
      question: 'Onde fica o escritório?',
      answer: 'Avenida Presidente Kubitschek, 474, sala 101, 1º andar, Centro, Betim/MG.',
    },
    {
      question: 'O que é execução penal?',
      answer: 'É a fase em que a pena imposta pela Justiça é cumprida e acompanhada. Nela são analisados temas como progressão de regime, livramento condicional e faltas disciplinares.',
    },
    {
      question: 'Um familiar pode contratar o escritório?',
      answer: 'Sim. A família pode procurar o escritório e iniciar o atendimento. A atuação no processo depende da procuração da própria pessoa presa, e a equipe orienta como providenciá-la.',
    },
    {
      question: 'Como funciona a progressão de regime?',
      answer: 'A pena é cumprida de forma progressiva: conforme o tempo cumprido e o comportamento, a pessoa pode passar para um regime mais brando, como do fechado para o semiaberto e do semiaberto para o aberto. Cada caso exige análise do processo.',
    },
    {
      question: 'O que é livramento condicional?',
      answer: 'É o benefício que permite cumprir parte do restante da pena em liberdade, quando os requisitos da lei são atendidos e mediante o cumprimento de condições.',
    },
    {
      question: 'O que é falta grave e por que ela preocupa?',
      answer: 'É a infração disciplinar mais séria no cumprimento da pena. Pode impedir benefícios, levar à regressão de regime e reduzir dias remidos. Por isso, a defesa técnica no procedimento disciplinar é importante.',
    },
    {
      question: 'O que é o relatório processual?',
      answer: 'É um relatório que explica, de forma clara e objetiva, a situação atual e futura do processo de execução e os benefícios a que a pessoa pode ter direito.',
    },
    {
      question: 'Uma pessoa presa pode se casar?',
      answer: 'É possível. Há etapas e burocracia próprias, e o escritório oferece apoio processual, documental e pessoal para a habilitação e a realização do casamento.',
    },
    {
      question: 'O escritório garante o resultado?',
      answer: 'Não. Nenhum advogado pode garantir resultado. O escritório analisa o processo, orienta com transparência e atua com defesa técnica; a decisão cabe ao juízo da execução.',
    },
    {
      question: 'Minhas respostas do questionário ficam guardadas no site?',
      answer: 'Não. As respostas são montadas no seu aparelho e enviadas pelo WhatsApp somente quando você toca no botão de envio. Detalhes estão na Política de Privacidade.',
    },
  ],

  team: [
    {
      name: 'Arlley Abelha',
      role: 'Advogado · OAB/MG 101.840',
      description: 'Dirige o escritório de assistência jurídica a pessoas privadas de liberdade e seus familiares, com atuação em execução penal em todo o Brasil.',
      photo: '/IMGADV/primeiro.png', // CONFIRMAR: trocar pela foto do Arlley
      instagram: '', // CONFIRMAR
      linkedin: '',
    },
  ],

  testimonials: [],

  seo: {
    title: 'Arlley Abelha | Advogado de Execução Penal em Betim/MG e todo o Brasil',
    description: 'Assistência jurídica a pessoas privadas de liberdade e seus familiares: progressão de regime, livramento condicional e mais. Betim/MG e todo o Brasil.',
    // Endereço público do site (https://www.seudominio.com.br), sem barra no final.
    // Necessário para a imagem de compartilhamento, canonical e sitemap.xml.
    siteUrl: '',
    ogImage: '/og-image.jpg',
    ogImageAlt: 'Arlley Abelha Advocacia · Execução Penal',
  },

  whatsappWidget: {
    messages: [
      'Precisando de um especialista em execução penal? Fale com o escritório de Arlley Abelha.',
      'Atendimento humanizado para pessoas privadas de liberdade e seus familiares. Atuamos em todo o Brasil.',
    ],
    firstDelay: 12_000,
    interval: 60_000,
  },
})

export const whatsappUrl = customMessage => {
  const base = customMessage || siteConfig.contact.whatsappMessage
  const origin = siteConfig.conversion?.originInMessage && !base.includes('(Origem:') ? originSuffix() : ''
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(base + origin)}`
}