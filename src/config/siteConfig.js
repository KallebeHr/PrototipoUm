import { reactive } from 'vue'
import { originSuffix } from '../composables/useOrigin.js'

// ═════════════════════════════════════════════════════════════════════════
// Conteúdo reunido de:
//   • https://mfsolucoes.com/  (site antigo: telefone, e-mails, CNPJ, áreas, dica de contratos)
//   • Bio do Instagram (especialidades, slogan e os dois endereços)
//   • Logo (paleta: azul-marinho, prata e azul vivo)
//
// ⚠ ITENS MARCADOS COM "CONFIRMAR" não constavam nas fontes e precisam ser
//   preenchidos/validados pelo escritório antes de publicar.
// ═════════════════════════════════════════════════════════════════════════

export const siteConfig = reactive({
  brand: {
    officeName: 'MF Soluções',
    shortName: 'MF Soluções',
    professionalName: 'Marcos Ferreira',
    oab: '', // CONFIRMAR: número da OAB do Dr. Marcos Ferreira (não consta no site nem na bio)
    logo: '/LogoPng05.png', // CONFIRMAR: salvar a logo enviada em /public/logo-mf.png
    initials: 'MF',
    favicon: '/LogoPng05.png',
    developer: 'Kallebe Max',
  },

  // Paleta tirada da logo: fundo azul-marinho, letras em prata e detalhes em azul vivo.
  theme: {
    primary: '#0B1F3F',
    primaryDark: '#050E1F',
    secondary: '#2F7FD8',
    accent: '#C9CED6',
    surface: '#FFFFFF',
    surfaceSoft: '#F2F5F9',
    text: '#1A2433',
  },

  hero: {
    eyebrow: 'MF Soluções | Jurídico',
    title: 'Precisando proteger seus direitos financeiros?',
    highlight: 'direitos financeiros',
    subtitle: 'Especialistas em Direito Bancário, Previdenciário e Agrário, com ética, agilidade e eficiência. Soluções inteligentes para problemas reais.',
    video: '/IMG-VIDEOS/Teste.mp4', // CONFIRMAR: trocar pelo vídeo do escritório
    backgroundImage: '/media/Banner3.png', // CONFIRMAR: trocar pela imagem do novo site
    ctaLabel: 'Fale com um especialista agora',
    highlights: [
      'Bancário, Previdenciário e Agrário',
      'Ética, agilidade e eficiência',
      'Escritórios na Barra da Tijuca e em Sepetiba',
    ],
  },

  contact: {
    // Telefone/WhatsApp do site antigo: (21) 99451-7621.
    phone: '(21) 99451-7621',
    phoneRaw: '5521994517621',
    whatsapp: '5521994517621',
    whatsappMessage: 'Olá, vim pelo site e preciso de orientação jurídica com a MF Soluções.',
    // Outros e-mails do site antigo: suporte@mfsolucoes.com e comercial@mfsolucoes.com
    email: 'contato@mfsolucoes.com',
    // Dois escritórios (bio do Instagram). O primeiro é usado como endereço principal.
    address: 'Avenida das Américas, 4200, bloco C1, sala 305, Barra da Tijuca | Estrada de Sepetiba, 5.615, sala 4, Sepetiba',
    city: 'Rio de Janeiro/RJ',
    zipCode: '23535-450', // CONFIRMAR: CEP da bio (23535-450 parece ser o de Sepetiba; falta o da Barra da Tijuca)
    businessHours: '', // CONFIRMAR
    emergencyPhone: '',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Avenida+das+Americas+4200+Barra+da+Tijuca+Rio+de+Janeiro+RJ',
    mapZoom: 16,
    latitude: -23.0003, // CONFIRMAR: coordenadas aproximadas da Barra da Tijuca
    longitude: -43.3660,
  },

  booking: {
    url: '',
    modes: ['Presencial', 'Online'],
  },

  // Listas de documentos exibidas no site. "approved: false" = ainda não revisada
  // pelo advogado. Revise e mude para true (com reviewedBy/reviewedAt) para publicar.
  documentChecklists: [
    {
      area: 'Litígio bancário',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documento de identificação com foto e CPF',
        'Contrato bancário completo (empréstimo, financiamento, cartão ou cheque especial)',
        'Extratos, boletos e comprovantes de pagamento',
        'Prints de simulações, conversas de WhatsApp e e-mails com o banco',
      ],
    },
    {
      area: 'Direito previdenciário',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documento de identificação com foto e CPF',
        'Extrato do CNIS e carteira de trabalho, se tiver',
        'Carta de concessão ou de indeferimento do INSS, se houver',
        'Laudos e relatórios médicos, quando o caso envolver saúde',
      ],
    },
    {
      area: 'Direito agrário',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documento de identificação e CPF/CNPJ do produtor',
        'Documentos da propriedade (matrícula, CAR, ITR ou contrato de arrendamento)',
        'Cédulas, contratos de crédito rural e comprovantes de pagamento',
        'Notificações e cobranças recebidas',
      ],
    },
    {
      area: 'Direito criminal',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documento de identificação de quem está fazendo o contato',
        'Intimações, citações, boletim de ocorrência ou decisões recebidas',
        'Número do processo ou do inquérito, se houver',
      ],
    },
    {
      area: 'Consultoria e estratégia processual',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documento de identificação com foto e CPF/CNPJ',
        'Contratos, notificações e demais documentos relacionados ao caso',
        'Número de processos já em andamento, se houver',
      ],
    },
    {
      area: 'Atendimento Jurídico',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documento de identificação com foto',
        'Resumo da situação e datas importantes',
        'Qualquer documento que você já tenha sobre o assunto',
      ],
    },
  ],

  professionalProfiles: [
    {
      slug: 'marcos-ferreira',
      registration: '', // CONFIRMAR: OAB
      education: [], // CONFIRMAR: formação, especializações
      areas: [
        'Direito bancário',
        'Direito previdenciário',
        'Direito agrário',
        'Direito criminal',
      ],
      biography: 'Marcos Ferreira é presidente e advogado líder da MF Soluções, escritório com atuação em Direito Bancário, Previdenciário e Agrário, e também em Direito Criminal. Defende que uma defesa eficaz transforma disputas complexas em resoluções claras, capacitando os clientes em cada etapa.',
      email: 'contato@mfsolucoes.com',
      whatsapp: '',
    },
  ],

  social: {
    instagram: '', // CONFIRMAR: @ do Instagram do escritório
  },

  linkBio: {
    title: 'MF Soluções',
    eyebrow: 'Jurídico · Bancário · Previdenciário · Agrário',
    description: 'Ética, agilidade e eficiência. Protegendo seus direitos financeiros com dedicação.',
    coverImage: '',
    coverAlt: '',
    teamTitle: 'Fale com o advogado',
    whatsappMessage: 'Olá! Vim pelo link da bio e preciso de orientação jurídica com a MF Soluções.',
    // Mostra no máximo 3 pessoas de team. Para ocultar uma, use linkBio: false nela.
    quickLinks: [
      {
        label: 'Conheça o escritório',
        description: 'Especialistas em Direito Bancário, Previdenciário e Agrário.',
        href: '#inicio',
        icon: 'mdi-web',
      },
      {
        label: 'Entre em contato',
        description: 'Escritórios na Barra da Tijuca e em Sepetiba, Rio de Janeiro/RJ.',
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
  // O MF Soluções não vende cursos ou materiais: seção desligada.
  // ─────────────────────────────────────────────────────────────────────────
  products: {
    enabled: false,
    showOnSite: false,
    showOnLinkBio: false,
    eyebrow: '',
    title: '',
    description: '',
    popup: {
      enabled: false,
      delayMs: 9000,
      scrollPercent: 35,
      frequencyDays: false,
      eyebrow: '',
      title: '',
      text: '',
      buttonLabel: '',
      dismissLabel: 'Agora não',
      allLabel: '',
    },
    discount: {
      enabled: false,
      percent: 0,
      label: 'de desconto',
      coupon: '',
      endsAt: '',
    },
    toast: {
      enabled: false,
      firstDelayMs: 1000,
      intervalMs: 5000,
      durationMs: 7000,
      maxShows: 0,
      stopWhenDismissed: false,
      buttonLabel: '',
      messages: [],
    },
    page: {
      enabled: false,
      path: '/produtos',
      navLabel: 'Produtos',
      eyebrow: '',
      title: '',
      lead: '',
      chips: [],
      buyLabel: '',
      questionsLabel: '',
      proof: {
        stats: [],
        testimonials: [],
      },
      methodTitle: '',
      methodLead: '',
      steps: [],
      offerTitle: '',
      offerNote: '',
      guarantee: '',
      faqTitle: '',
      faq: [],
      finalTitle: '',
      finalText: '',
      disclaimer: '',
    },
    items: [],
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
    enabled: true,
    showOnSite: true,
    showOnLinkBio: true,
    buttonLabel: 'Responder questionário',
    buttonDescription: 'Leva cerca de 3 minutos e agiliza seu atendimento',
    pageTitle: 'Vamos entender o seu caso',
    pageIntro: 'Responda algumas perguntas rápidas sobre a sua situação. No final, enviamos tudo organizado para o WhatsApp do escritório, para que o atendimento comece mais rápido.',
    estimatedTime: '3 minutos',
    privacyNote: 'Se tiver o número do processo, pode informar. Não envie senhas, códigos SMS nem fotos de documentos. Nada é salvo em servidor: você só envia o que quiser.',
    whatsapp: '', // vazio: usa contact.whatsapp
    requireConsent: true,
    consentText: 'Concordo em compartilhar estas informações com o escritório pelo WhatsApp para receber orientação.',
    messageIntro: 'Olá! Respondi o questionário do site da MF Soluções. Seguem minhas respostas:',
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
        label: 'Perfil de quem pede ajuda',
        title: 'Quem está pedindo ajuda?',
        help: 'Isso nos ajuda a direcionar o atendimento para o especialista certo.',
        type: 'single',
        required: true,
        icon: 'mdi-account-group-outline',
        options: [
          { label: 'Pessoa física (eu mesmo)', value: 'pf' },
          { label: 'Produtor rural / proprietário de terras', value: 'rural' },
          { label: 'Empresa ou empreendedor', value: 'empresa' },
          { label: 'Familiar ou outra pessoa em nome de alguém', value: 'familiar' },
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
          { label: 'Direito bancário (empréstimos, financiamentos, juros, cobranças)', value: 'bancario' },
          { label: 'Direito previdenciário (INSS, aposentadoria, benefícios)', value: 'previdenciario' },
          { label: 'Direito agrário (propriedade rural, crédito e dívidas rurais)', value: 'agrario' },
          { label: 'Direito criminal', value: 'criminal' },
          { label: 'Avaliação jurídica / outro assunto / não sei', value: 'outro' },
        ],
      },
      // ── Perguntas que só aparecem conforme a resposta anterior (showIf) ──
      {
        id: 'bancario_tipo',
        label: 'Tipo de problema bancário',
        title: 'Qual é a situação com o banco?',
        help: 'Escolha a opção mais próxima. Os detalhes ficam para a conversa.',
        type: 'single',
        required: true,
        icon: 'mdi-bank-outline',
        showIf: { question: 'area', is: ['bancario'] },
        options: [
          'Juros ou tarifas que parecem abusivos',
          'Venda casada (seguro ou capitalização imposto)',
          'Descontos automáticos na conta ou no benefício',
          'Financiamento de imóvel ou veículo em atraso (alienação fiduciária)',
          'Cobrança indevida, negativação ou fraude',
          'Quero uma análise preventiva do contrato',
          'Outro / não sei',
        ],
      },
      {
        id: 'previdenciario_tipo',
        label: 'Tipo de assunto previdenciário',
        title: 'O que você precisa na área previdenciária?',
        help: 'Escolha a opção mais próxima do seu caso.',
        type: 'single',
        required: true,
        icon: 'mdi-card-account-details-outline',
        showIf: { question: 'area', is: ['previdenciario'] },
        options: [
          'Aposentadoria',
          'Benefício negado ou cortado pelo INSS',
          'Auxílio por incapacidade (doença ou acidente)',
          'Pensão por morte',
          'Revisão de benefício',
          'Outro / não sei',
        ],
      },
      {
        id: 'agrario_tipo',
        label: 'Tipo de assunto agrário',
        title: 'O que você precisa na área agrária?',
        help: 'Escolha a opção mais próxima do seu caso.',
        type: 'single',
        required: true,
        icon: 'mdi-barn',
        showIf: { question: 'area', is: ['agrario'] },
        options: [
          'Dívida ou financiamento rural com o banco',
          'Cédula ou contrato de crédito rural',
          'Regularização ou disputa de terras',
          'Contrato de arrendamento ou parceria rural',
          'Outro / não sei',
        ],
      },
      {
        id: 'criminal_fase',
        label: 'Fase do caso criminal',
        title: 'Em que fase está o caso?',
        help: 'Se não souber, marque “Não sei”. O advogado confere.',
        type: 'single',
        required: true,
        icon: 'mdi-gavel',
        showIf: { question: 'area', is: ['criminal'] },
        options: [
          'Investigação / inquérito',
          'Processo em andamento',
          'Já houve sentença',
          'Preciso de orientação antes de qualquer coisa',
          'Não sei',
        ],
      },
      {
        id: 'processo',
        label: 'Número do processo',
        title: 'Você tem o número de algum processo relacionado?',
        help: 'Opcional. Se tiver, ajuda a localizar o andamento. Se não tiver, tudo bem.',
        type: 'text',
        placeholder: 'Número do processo (opcional)',
        required: false,
        icon: 'mdi-file-document-outline',
      },
      {
        id: 'urgencia',
        label: 'Audiência, prazo ou cobrança próxima',
        title: 'Há audiência, prazo ou cobrança próxima?',
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
        help: 'O escritório tem unidades na Barra da Tijuca e em Sepetiba, no Rio de Janeiro.',
        type: 'single',
        required: true,
        icon: 'mdi-video-outline',
        options: [
          'Online (WhatsApp ou vídeo)',
          'Presencial na Barra da Tijuca',
          'Presencial em Sepetiba',
          'Tanto faz',
        ],
      },
      {
        id: 'relato',
        label: 'Resumo do caso',
        title: 'Quer contar em poucas palavras a situação?',
        help: 'Opcional. Um resumo curto já ajuda muito. Os detalhes ficam para a conversa.',
        type: 'textarea',
        placeholder: 'Ex.: Fiz um empréstimo e os juros cobrados estão muito acima do contratado...',
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
  // ─────────────────────────────────────────────────────────────────────────
  privacy: {
    enabled: true,
    lastUpdate: '23/11/2026',
    controllerName: 'MF Soluções', // CONFIRMAR: razão social completa (consta apenas o CNPJ no site antigo)
    document: 'CNPJ 61.689.269/0001-11',
    contactEmail: '', // vazio: usa contact.email
    retentionNote: 'Mantemos as informações pelo tempo necessário para o atendimento solicitado e para cumprir obrigações legais e profissionais.',
  },

  analytics: {
    enabled: false, // ligue quando houver ID próprio do cliente
    ga4Id: '', // CONFIRMAR: ID do GA4 (G-XXXXXXXXXX) do MF Soluções
    metaPixelId: '',
    bannerTitle: 'Sua privacidade',
    bannerText: 'Usamos cookies de medição para entender como o site é usado e melhorar o atendimento. Eles só são ativados se você aceitar.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ARTIGOS (blog) → /blog e /blog/<slug>
  // O artigo abaixo vem do site antigo ("10 Estratégias para Proteger Seus
  // Contratos Bancários"). CONFIRMAR: o advogado deve revisar antes de publicar.
  // ─────────────────────────────────────────────────────────────────────────
  blog: {
    enabled: true,
    title: 'Artigos',
    eyebrow: 'Informação jurídica',
    description: 'Conteúdos informativos sobre Direito Bancário, Previdenciário e Agrário.',
    showOnHome: true,
    disclaimer: 'Conteúdo informativo, de caráter geral. Não substitui a análise do caso por advogado(a).',
    posts: [
      {
        slug: '10-estrategias-para-proteger-seus-contratos-bancarios',
        title: '10 estratégias para proteger seus contratos bancários',
        excerpt: 'Venda casada, CET, multas e alienação fiduciária: dicas práticas para analisar um contrato antes e depois de assinar.',
        date: '2026-11-23',
        category: 'Direito bancário',
        area: 'litigio-bancario',
        readingTime: '3 min',
        image: '',
        body: [
          { type: 'p', text: 'Contratos bancários costumam ter cláusulas que passam despercebidas e encarecem a dívida. Estes cuidados ajudam a proteger seu patrimônio.' },
          { type: 'h2', text: 'Antes de assinar' },
          { type: 'ul', items: [
            'Cuidado com a venda casada: o banco não pode obrigar você a contratar seguros ou títulos de capitalização para liberar o crédito;',
            'Olhe o CET (Custo Efetivo Total), e não apenas os juros: é nele que aparecem tarifas e taxas que encarecem o contrato;',
            'Exija a sua cópia na hora e não feche o aplicativo sem salvar a sua via assinada, pois ela é essencial para qualquer defesa futura;',
            'Assine contratos digitais somente por links oficiais e nunca envie códigos SMS ou links de validação para intermediários;',
            'Em contratos de valores altos, uma análise com especialistas antes de assinar evita juros abusivos e processos demorados.',
          ] },
          { type: 'h2', text: 'Durante o contrato' },
          { type: 'ul', items: [
            'Guarde todas as provas: prints de simulações, conversas de WhatsApp e e-mails com o gerente;',
            'Confira se o contrato garante o direito de quitar parcelas antes do prazo com abatimento proporcional dos juros;',
            'Fique atento a cláusulas que autorizam descontos automáticos na conta-salário ou na poupança para cobrir parcelas vencidas.',
          ] },
          { type: 'h2', text: 'Financiamentos e atrasos' },
          { type: 'ul', items: [
            'Em financiamentos de imóveis ou veículos (alienação fiduciária), entenda os prazos de retomada do bem em caso de atraso;',
            'A multa por atraso em contratos de consumo não pode ultrapassar o teto de 2% previsto no Código de Defesa do Consumidor.',
          ] },
          { type: 'p', text: 'Cada contrato tem particularidades. Uma análise individual indica o que pode ser feito no seu caso, sem garantia de resultado.' },
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
      areas: 'Olá! Estava vendo as áreas de atuação no site da MF Soluções e gostaria de orientação.',
      produtos: 'Olá! Vim pelo site da MF Soluções e gostaria de saber mais.',
      equipe: 'Olá! Conheci o escritório pelo site e gostaria de falar com o advogado.',
      artigos: 'Olá! Li os artigos do site e tenho uma dúvida sobre um contrato ou caso.',
      avaliacoes: 'Olá! Vi as avaliações do escritório e gostaria de atendimento.',
      contato: 'Olá! Vim pela seção de contato do site e preciso de orientação jurídica.',
    },
  },

  // As notas e avaliações são obtidas pelo servidor; nunca preencha notas fictícias.
  // ATENÇÃO: desligado de propósito. O servidor de avaliações usa o perfil do Google
  // configurado no ambiente; só ligue depois de conectar o perfil do MF Soluções,
  // para não exibir avaliações de outro escritório.
  googleReviews: {
    enabled: false,
    showOnLinkBio: false,
    endpoint: '/api/google-reviews',
    title: 'Avaliações no Google',
    description: 'Veja o que os clientes dizem sobre o atendimento da MF Soluções.',
    profileUrl: 'https://www.google.com/maps/search/?api=1&query=MF+Solucoes+Advocacia+Rio+de+Janeiro',
    writeReviewUrl: '', // CONFIRMAR: link "escrever avaliação" do perfil do Google (placeid do MF Soluções)
  },

  about: {
    title: 'Soluções inteligentes para problemas reais, com ética, agilidade e eficiência',
    photo: '/media/banners1.png', // CONFIRMAR: trocar pela foto do escritório/advogado
    photoAlt: 'MF Soluções',
    text: 'A MF Soluções é um escritório de alto nível, com abordagem baseada em evidências que busca resultados mensuráveis e protege seus interesses jurídicos. Somos especialistas em Direito Bancário, Previdenciário e Agrário, e também atuamos em Direito Criminal, protegendo seus direitos financeiros com dedicação. O escritório é presidido por Marcos Ferreira e atende na Barra da Tijuca e em Sepetiba, no Rio de Janeiro.',
    subtitle: 'Direito Bancário, Previdenciário e Agrário com ética, agilidade e eficiência.',
    cards: [
      {
        icon: 'fa-solid fa-handshake-angle',
        title: 'Ética',
        desc: 'Transparência e respeito em cada etapa do atendimento.',
      },
      {
        icon: 'fa-solid fa-gavel',
        title: 'Defesa técnica',
        desc: 'Estratégia processual baseada em evidências para proteger seus interesses.',
      },
      {
        icon: 'fa-solid fa-bolt',
        title: 'Agilidade e eficiência',
        desc: 'Análise rápida do contrato ou do caso, com explicações em linguagem clara.',
      },
      {
        icon: 'fa-solid fa-location-dot',
        title: 'Dois escritórios no Rio',
        desc: 'Unidades na Barra da Tijuca e em Sepetiba, Rio de Janeiro/RJ.',
      },
    ],
  },

  practiceAreas: [
    {
      slug: 'litigio-bancario',
      page: true,
      title: 'Litígio bancário',
      description: 'Para quem enfrenta custos elevados de empréstimos e termos bancários injustos, soluções jurídicas decisivas para proteger seus direitos financeiros.',
      icon: 'fa-solid fa-building-columns',
      pageTitle: 'Advogado bancário no Rio de Janeiro: juros abusivos, contratos e cobranças',
      intro: 'Empreendedores e pessoas físicas enfrentam juros elevados, tarifas escondidas e cláusulas injustas. O escritório analisa o contrato, identifica possíveis abusos e atua para proteger seu patrimônio.',
      topics: [
        'Análise de contratos de empréstimo e financiamento',
        'Venda casada, tarifas e Custo Efetivo Total (CET)',
        'Alienação fiduciária de imóveis e veículos',
        'Descontos automáticos e cobranças indevidas',
        'Auditoria bancária preventiva antes de assinar',
      ],
      faq: [
        {
          question: 'O banco pode me obrigar a contratar um seguro para liberar o crédito?',
          answer: 'Não. A venda casada, que condiciona o crédito à contratação de seguros ou títulos de capitalização, é prática ilegal. Cada caso deve ser analisado pelo advogado.',
        },
        {
          question: 'Por que olhar o CET e não só os juros?',
          answer: 'Porque o Custo Efetivo Total reúne tarifas, taxas e encargos que encarecem o contrato e muitas vezes não aparecem na taxa de juros anunciada.',
        },
        {
          question: 'Qual é o limite da multa por atraso?',
          answer: 'Em contratos de consumo, a multa por atraso não pode ultrapassar 2%, conforme o Código de Defesa do Consumidor. Cada caso exige análise do contrato.',
        },
      ],
    },
    {
      slug: 'direito-previdenciario',
      page: true,
      title: 'Direito previdenciário',
      description: 'Orientação e atuação em benefícios do INSS, para que você receba o que a lei garante com segurança e agilidade.', // CONFIRMAR: o site antigo não detalha esta área
      icon: 'fa-solid fa-user-shield',
      pageTitle: 'Advogado previdenciário no Rio de Janeiro: INSS, aposentadoria e benefícios',
      intro: 'Aposentadorias, auxílios e pensões envolvem regras e prazos que mudam de caso a caso. O escritório analisa a sua situação e orienta os próximos passos com clareza.',
      topics: [
        'Análise para pedido de aposentadoria',
        'Benefícios negados ou cortados pelo INSS',
        'Auxílio por incapacidade e pensão por morte',
        'Revisão de benefícios',
      ],
      faq: [
        {
          question: 'O que o escritório faz na área previdenciária?',
          answer: 'Analisa a sua situação, orienta sobre os benefícios possíveis e atua nos pedidos e recursos necessários junto ao INSS ou na Justiça, conforme o caso.',
        },
        {
          question: 'O escritório garante a concessão do benefício?',
          answer: 'Não. Nenhum advogado pode garantir resultado. A concessão depende da análise do INSS ou do juízo, conforme os requisitos da lei.',
        },
      ],
    },
    {
      slug: 'direito-agrario',
      page: true,
      title: 'Direito agrário',
      description: 'Atuação para produtores e proprietários rurais, incluindo disputas bancárias que ameaçam as finanças da propriedade.', // CONFIRMAR: o texto do site antigo para esta área parecia ser um modelo genérico
      icon: 'fa-solid fa-wheat-awn',
      pageTitle: 'Advogado agrário no Rio de Janeiro: crédito rural, dívidas e propriedade',
      intro: 'Dívidas e contratos rurais podem colocar a propriedade em risco. O escritório analisa o contrato, explica as regras bancárias em linguagem clara e conduz o caso com estratégia.',
      topics: [
        'Análise de contratos e cédulas de crédito rural',
        'Dívidas e financiamentos rurais',
        'Orientação sobre propriedade e arrendamento rural',
        'Estratégia processual para proteger a propriedade',
      ],
      faq: [
        {
          question: 'O escritório atua em dívidas de produtores rurais?',
          answer: 'Sim. A análise do contrato e das condições do crédito rural é parte da atuação, em conjunto com a área bancária do escritório.',
        },
        {
          question: 'Preciso levar quais documentos?',
          answer: 'Em geral, documentos pessoais, contratos ou cédulas, comprovantes de pagamento e documentos da propriedade. A equipe orienta conforme o caso.',
        },
      ],
    },
    {
      slug: 'direito-criminal',
      page: true,
      title: 'Direito criminal',
      description: 'A liberdade é o maior bem de um indivíduo. Defesa criminal atenta, com escuta paciente e acompanhamento em cada etapa.',
      icon: 'fa-solid fa-scale-balanced',
      pageTitle: 'Advogado criminalista no Rio de Janeiro: defesa em inquérito e processo criminal',
      intro: 'Quando alguém é acusado em um processo criminal, orientação rápida e defesa técnica fazem diferença. O escritório ouve o caso com atenção e acompanha cada etapa.',
      topics: [
        'Orientação em inquérito policial',
        'Defesa em processo criminal',
        'Acompanhamento de audiências e prazos',
      ],
      faq: [
        {
          question: 'Quando devo procurar um advogado criminalista?',
          answer: 'O quanto antes: ao receber uma intimação, ser chamado em uma delegacia ou ao saber de uma investigação. Quanto mais cedo, mais opções de defesa.',
        },
        {
          question: 'O escritório garante o resultado do processo?',
          answer: 'Não. O escritório atua com defesa técnica e transparência, mas o resultado depende das provas e da decisão da Justiça.',
        },
      ],
    },
    {
      slug: 'consultoria-juridica',
      page: true,
      title: 'Consultoria e estratégia processual',
      description: 'Definir objetivos jurídicos claros impulsiona ações decisivas: avaliação jurídica gratuita e estratégia sob medida para o seu caso.', // CONFIRMAR: gratuidade da avaliação (consta no site antigo)
      icon: 'fa-solid fa-lightbulb',
      pageTitle: 'Consultoria jurídica e estratégia processual no Rio de Janeiro',
      intro: 'Cada interação revela uma oportunidade de proteger direitos ou resolver disputas. Começamos com uma avaliação jurídica para definir objetivos claros e o melhor caminho.',
      topics: [
        'Avaliação jurídica inicial',
        'Definição de objetivos e estratégia do caso',
        'Consultoria preventiva em contratos',
      ],
      faq: [
        {
          question: 'A avaliação jurídica é gratuita?',
          answer: 'O site anterior do escritório divulgava uma avaliação jurídica gratuita. Confirme as condições atuais pelo WhatsApp.', // CONFIRMAR
        },
        {
          question: 'Para quem serve a consultoria?',
          answer: 'Para pessoas e empresas que querem entender seus direitos, analisar um contrato ou definir a melhor estratégia antes de agir.',
        },
      ],
    },
    {
      slug: 'escritorio-barra-da-tijuca',
      page: false,
      title: 'Escritório na Barra da Tijuca',
      description: 'Atendimento presencial na Avenida das Américas, 4200, bloco C1, sala 305, Barra da Tijuca, Rio de Janeiro/RJ.',
      icon: 'fa-solid fa-building',
    },
    {
      slug: 'escritorio-sepetiba',
      page: false,
      title: 'Escritório em Sepetiba',
      description: 'Atendimento presencial na Estrada de Sepetiba, 5.615, sala 4, Sepetiba, Rio de Janeiro/RJ.',
      icon: 'fa-solid fa-building',
    },
  ],

  serviceJourney: [
    {
      icon: 'mdi-message-text-outline',
      title: 'Primeiro contato',
      text: 'Fale com o escritório pelo WhatsApp ou responda ao questionário do site e conte a sua situação.',
    },
    {
      icon: 'mdi-account-search-outline',
      title: 'Análise do caso',
      text: 'O advogado analisa contratos, documentos e prazos para entender a situação e as possibilidades de atuação.',
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
      answer: 'O escritório é especializado em Direito Bancário, Previdenciário e Agrário, e também atua em Direito Criminal, com consultoria jurídica e estratégia processual.',
    },
    {
      question: 'Onde ficam os escritórios?',
      answer: 'Avenida das Américas, 4200, bloco C1, sala 305, Barra da Tijuca, e Estrada de Sepetiba, 5.615, sala 4, Sepetiba, ambos no Rio de Janeiro/RJ.',
    },
    {
      question: 'O escritório atende online?',
      answer: 'Sim, o atendimento pode começar pelo WhatsApp, e o escritório também atende presencialmente nas duas unidades.', // CONFIRMAR: abrangência do atendimento online
    },
    {
      question: 'O banco pode me obrigar a contratar seguro para liberar um empréstimo?',
      answer: 'Não. A venda casada é ilegal. Se isso aconteceu com você, guarde as provas e procure orientação.',
    },
    {
      question: 'O que é o CET e por que ele importa?',
      answer: 'O Custo Efetivo Total reúne juros, tarifas e encargos do contrato. É nele que ficam as taxas que encarecem o crédito, por isso deve ser analisado antes de assinar.',
    },
    {
      question: 'Quais provas devo guardar em um problema com o banco?',
      answer: 'Contrato assinado, extratos, boletos, prints de simulações, conversas de WhatsApp e e-mails com o gerente. O banco deve cumprir o que prometeu.',
    },
    {
      question: 'O escritório atua com direito previdenciário?',
      answer: 'Sim. O escritório orienta e atua em temas do INSS, como aposentadoria, benefícios negados e auxílios. Cada caso exige análise individual.',
    },
    {
      question: 'O escritório atua com produtores rurais?',
      answer: 'Sim. O escritório atua em Direito Agrário, incluindo disputas bancárias e contratos de crédito rural.',
    },
    {
      question: 'Um familiar pode procurar o escritório em meu nome?',
      answer: 'Sim, o atendimento pode ser iniciado por um familiar. A atuação formal no caso exige procuração da própria pessoa, e a equipe orienta como providenciá-la.',
    },
    {
      question: 'O escritório garante o resultado?',
      answer: 'Não. Nenhum advogado pode garantir resultado. O escritório analisa o caso, orienta com transparência e atua com defesa técnica; a decisão cabe ao juízo ou ao órgão responsável.',
    },
    {
      question: 'Minhas respostas do questionário ficam guardadas no site?',
      answer: 'Não. As respostas são montadas no seu aparelho e enviadas pelo WhatsApp somente quando você toca no botão de envio. Detalhes estão na Política de Privacidade.',
    },
  ],

  team: [
    {
      name: 'Marcos Ferreira',
      role: 'Presidente e Advogado Líder', // CONFIRMAR: incluir OAB
      description: 'Presidente da MF Soluções. Acredita que uma defesa eficaz transforma disputas complexas em resoluções claras, capacitando os clientes em cada etapa.',
      photo: '/IMGADV/segundo.png', // CONFIRMAR: trocar pela foto do Marcos Ferreira
      instagram: '', // CONFIRMAR
      linkedin: '',
    },
  ],

  // O site antigo exibia 2 depoimentos que pareciam modelos (fotos de banco de imagens
  // e texto cortado). Não foram usados. Adicione apenas depoimentos reais e autorizados.
  testimonials: [],

  seo: {
    title: 'MF Soluções | Advogados Bancário, Previdenciário e Agrário no Rio de Janeiro',
    description: 'Especialistas em Direito Bancário, Previdenciário e Agrário, com ética, agilidade e eficiência. Escritórios na Barra da Tijuca e em Sepetiba, Rio de Janeiro/RJ.',
    // Endereço público do site (https://www.seudominio.com.br), sem barra no final.
    // Necessário para a imagem de compartilhamento, canonical e sitemap.xml.
    siteUrl: '', // CONFIRMAR: o domínio antigo era https://mfsolucoes.com
    ogImage: '/og-image.jpg',
    ogImageAlt: 'MF Soluções · Soluções inteligentes para problemas reais',
  },

  whatsappWidget: {
    messages: [
      'Problemas com banco, INSS ou dívidas rurais? Fale com os especialistas da MF Soluções.',
      'Ética, agilidade e eficiência. Protegendo seus direitos financeiros com dedicação.',
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