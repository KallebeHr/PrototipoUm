import { reactive } from 'vue'
import { originSuffix } from '../composables/useOrigin.js'

export const siteConfig = reactive({
  brand: {
    officeName: 'Advocacia Fernanda Natale',
    shortName: 'Fernanda Natale',
    professionalName: 'Fernanda Natale',
    oab: 'OAB/MG 158.406',
    logo: '/LogoPng3.png',
    initials: 'FN',
    favicon: '/LogoPng3.png',
    developer: 'Max Sistemas',
  },

  theme: {
    primary: '#7A6252',
    primaryDark: '#523E32',
    secondary: '#C5A059',
    accent: '#E6D5C3',
    surface: '#FFFFFF',
    surfaceSoft: '#F7F4F0',
    text: '#2C2A29',
  },

  hero: {
    eyebrow: 'Fernanda Natale | Advocacia',
    title: 'Advocacia especializada em Direito das Famílias e Sucessões e Direito Previdenciário.',
    highlight: 'seus direitos',
    subtitle: 'Atuação jurídica com atendimento online e presencial, oferecendo orientação e acompanhamento responsável. Atuação em todo o território nacional.',
    video: '/IMG-VIDEOS/Teste.mp4',
    backgroundImage: '/media/Banner3.png',
    ctaLabel: 'Entre em contato',
    highlights: [
      'Direito das Famílias e Sucessões',
      'Direito Previdenciário',
      'Atuação Nacional',
    ],
  },

  contact: {
    phone: '(37) 9952-6966',
    phoneRaw: '553799526966',
    whatsapp: '553799526966',
    whatsappMessage: 'Olá! Vim pelo site da Advocacia Fernanda Natale e gostaria de receber orientação jurídica.',
    email: '',
    address: 'Rua Pio XII, n. 26, sala 201, Centro',
    city: 'Formiga/MG',
    zipCode: '35570-130',
    businessHours: '',
    emergencyPhone: '',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Pio+XII+26+sala+201+Centro+Formiga+MG+35570-130',
    mapZoom: 16,
    latitude: -20.4623,
    longitude: -45.4272,
  },

  booking: {
    url: '',
    modes: ['Presencial', 'Online'],
  },

  documentChecklists: [
    {
      area: 'Direito das Famílias',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documento de identificação do interessado',
        'Certidões e documentos pessoais relacionados à situação familiar',
        'Documentos e comprovantes relacionados à demanda jurídica',
      ],
    },
    {
      area: 'Direito de Sucessões',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documento de identificação dos interessados',
        'Certidão de óbito, quando aplicável',
        'Documentos relacionados aos bens e à situação sucessória',
      ],
    },
    {
      area: 'Direito Previdenciário',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documento de identificação',
        'Carteira de trabalho e documentos relacionados à vida profissional',
        'Documentos previdenciários e comprovantes relacionados à solicitação',
      ],
    },
    {
      area: 'Atendimento Jurídico',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documento de identificação do interessado',
        'Documentos relacionados à questão jurídica apresentada',
        'Comprovantes, notificações ou outros registros disponíveis',
      ],
    },
    {
      area: 'Orientação em Direito das Famílias',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documento de identificação do interessado',
        'Certidões e documentos pertinentes ao caso',
        'Documentos complementares relacionados à demanda',
      ],
    },
    {
      area: 'Orientação Previdenciária',
      approved: false,
      reviewedBy: '',
      reviewedAt: '',
      items: [
        'Documento de identificação do interessado',
        'Documentos relativos ao histórico previdenciário',
        'Comprovantes e registros relacionados à solicitação',
      ],
    },
  ],

  professionalProfiles: [
    {
      slug: 'fernanda-natale',
      registration: '',
      education: [],
      areas: [
        'Direito das Famílias e Sucessões',
        'Direito Previdenciário',
      ],
      biography: 'Fernanda Natale atua nas áreas de Direito das Famílias e Sucessões e Direito Previdenciário, oferecendo atendimento jurídico online e presencial, com atuação em todo o território nacional.',
      email: '',
      whatsapp: '',
    },
  ],

  social: {
    instagram: 'https://www.instagram.com/fernandanataleadvocacia/',
  },

  linkBio: {
    title: 'Fernanda Natale',
    eyebrow: 'Advocacia',
    description: 'Atuação nas áreas de Direito das Famílias e Sucessões e Direito Previdenciário. Atendimento online e presencial, com atuação em todo o território nacional.',
    coverImage: '',
    coverAlt: '',
    teamTitle: 'Entre em contato com a advogada',
    whatsappMessage: 'Olá! Vim pelo link da bio da Advocacia Fernanda Natale e gostaria de receber orientação jurídica.',
    // Mostra no máximo 3 pessoas de team. Para ocultar uma, use linkBio: false nela.
    quickLinks: [
      {
        label: 'Conheça nosso escritório',
        description: 'Advocacia em Direito das Famílias e Sucessões e Direito Previdenciário.',
        href: '#inicio',
        icon: 'mdi-web',
      },
      {
        label: 'Entre em contato',
        description: 'Atendimento online e presencial em todo o território nacional.',
        href: '#contato',
        icon: 'mdi-message-text-outline',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PRODUTOS E SERVIÇOS DIGITAIS (mentoria, curso, e-book, consultoria etc.)
  // enabled: false  → nada aparece no site nem no link na bio.
  // enabled: true   → cada item vira um banner horizontal com título e botão.
  // Cada item pode ser escondido do site ou da bio com showOnSite / showOnLinkBio.
  // Imagens: coloque em /public e informe o caminho (ex.: '/media/mentoria.jpg').
  // Proporção recomendada da arte: 1200 x 480 px (horizontal).
  // O botão aceita link externo (https://...), âncora do site (#contato) ou
  // WhatsApp (use whatsappMessage em vez de url para abrir uma conversa).
  // ─────────────────────────────────────────────────────────────────────────
  products: {
    enabled: true,
    showOnSite: true,
    showOnLinkBio: true,
    eyebrow: 'Conteúdo e orientação',
    title: 'Mentorias e materiais',
    description: 'Aprofunde seu conhecimento com conteúdos preparados pela advogada.',
    items: [
      {
        title: 'Mentoria para advogados',
        description: 'Acompanhamento individual para estruturar sua advocacia. (Texto de exemplo: substitua pelo real.)',
        image: '/media/produto-exemplo.svg',
        imageAlt: 'Arte de divulgação da mentoria',
        badge: 'Novo',
        price: '',
        buttonLabel: 'Saiba mais',
        url: '',
        whatsappMessage: 'Olá! Vi a mentoria no site e gostaria de saber mais.',
        external: true,
        showOnSite: true,
        showOnLinkBio: true,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTIONÁRIO DE AJUDA (página /ajuda)
  // enabled: false  → a página e os botões deixam de existir.
  // enabled: true   → botão no site e na bio levam ao quiz; no final, as respostas
  //                   são enviadas ao WhatsApp já organizadas.
  // type da pergunta: 'single' (uma opção) | 'multiple' (várias) | 'text' (linha)
  //                   | 'textarea' (texto longo) | 'phone' (telefone com DDD)
  // required: true obriga a responder. help: explicação didática abaixo da pergunta.
  // ─────────────────────────────────────────────────────────────────────────
  quiz: {
    enabled: true,
    showOnSite: true,
    showOnLinkBio: true,
    buttonLabel: 'Responder questionário',
    buttonDescription: 'Leva 2 minutos e agiliza seu atendimento',
    pageTitle: 'Vamos entender o seu caso',
    pageIntro: 'Responda algumas perguntas rápidas. No final, enviamos tudo organizado para o WhatsApp da advogada, para que o atendimento comece mais rápido.',
    estimatedTime: '2 minutos',
    privacyNote: 'Não inclua senhas, números de documentos ou dados sensíveis. Você só envia o que quiser: nada é salvo em servidor.',
    whatsapp: '', // vazio: usa contact.whatsapp
    requireConsent: true, // true: o botão de envio só libera após o aceite
    consentText: 'Concordo em compartilhar estas informações com o escritório pelo WhatsApp para receber orientação.',
    messageIntro: 'Olá! Respondi o questionário do site da Advocacia Fernanda Natale. Seguem minhas respostas:',
    finishTitle: 'Tudo pronto!',
    finishText: 'Confira o resumo e toque no botão para enviar suas respostas pelo WhatsApp.',
    finishButton: 'Enviar respostas pelo WhatsApp',
    questions: [
      {
        id: 'nome',
        label: 'Nome',
        title: 'Como podemos te chamar?',
        help: 'Usamos seu nome apenas para começar a conversa de forma mais pessoal.',
        type: 'text',
        placeholder: 'Seu nome',
        required: true,
        icon: 'mdi-account-outline',
      },
      {
        // Cada opção pode ser texto simples ou um objeto:
        //   { label: 'Texto exibido', value: 'chave-curta', whatsapp: '5537999999999' }
        // • value: chave usada nas regras "showIf" das perguntas seguintes.
        // • whatsapp: se preenchido, as respostas desta pessoa vão para ESTE número
        //   (ex.: previdenciário para uma advogada, famílias para outra).
        //   Vazio = usa quiz.whatsapp ou contact.whatsapp.
        id: 'area',
        label: 'Área do assunto',
        title: 'Sobre qual assunto você precisa de ajuda?',
        help: 'Escolha a opção que mais se aproxima. Se não tiver certeza, marque “Não sei”: a advogada ajuda a identificar.',
        type: 'single',
        required: true,
        icon: 'mdi-scale-balanced',
        options: [
          { label: 'Direito das Famílias (divórcio, pensão, guarda)', value: 'familias', whatsapp: '' },
          { label: 'Sucessões (inventário, herança, testamento)', value: 'sucessoes', whatsapp: '' },
          { label: 'Previdenciário (aposentadoria, benefícios INSS)', value: 'previdenciario', whatsapp: '' },
          { label: 'Não sei / outro assunto', value: 'outro' },
        ],
      },
      // ── Perguntas que só aparecem conforme a resposta anterior (showIf) ──
      {
        id: 'beneficio',
        label: 'Benefício',
        title: 'Qual benefício você quer entender?',
        help: 'Isso nos ajuda a separar os documentos certos do INSS.',
        type: 'single',
        required: true,
        icon: 'mdi-file-certificate-outline',
        showIf: { question: 'area', is: ['previdenciario'] },
        options: [
          'Aposentadoria',
          'Auxílio por incapacidade (doença ou acidente)',
          'Pensão por morte',
          'Benefício assistencial (BPC/LOAS)',
          'Meu pedido foi negado pelo INSS',
          'Não sei qual',
        ],
      },
      {
        id: 'falecimento',
        label: 'Tempo desde o falecimento',
        title: 'O falecimento aconteceu há quanto tempo?',
        help: 'Existem prazos para abrir o inventário. Saber a data aproximada já ajuda a avaliar a urgência.',
        type: 'single',
        required: true,
        icon: 'mdi-calendar-clock-outline',
        showIf: { question: 'area', is: ['sucessoes'] },
        options: [
          'Menos de 2 meses',
          'Entre 2 e 12 meses',
          'Mais de 1 ano',
          'Ainda não houve falecimento (quero me planejar)',
        ],
      },
      {
        id: 'filhos',
        label: 'Filhos menores envolvidos',
        title: 'Há filhos menores de idade envolvidos?',
        help: 'Isso influencia o caminho possível (por exemplo, divórcio em cartório ou na Justiça).',
        type: 'single',
        required: true,
        icon: 'mdi-account-child-outline',
        showIf: { question: 'area', is: ['familias'] },
        options: ['Sim', 'Não', 'Não se aplica'],
      },
      {
        id: 'momento',
        label: 'Situação atual',
        title: 'Em que ponto está a sua situação?',
        help: 'Isso ajuda a entender se existe algum prazo correndo.',
        type: 'single',
        required: true,
        icon: 'mdi-timeline-clock-outline',
        options: [
          { label: 'Ainda estou me informando', value: 'informando' },
          { label: 'Já tenho um problema, mas nada foi aberto', value: 'problema' },
          { label: 'Já existe processo ou pedido em andamento', value: 'andamento' },
          { label: 'Recebi uma notificação ou tenho prazo próximo', value: 'prazo' },
        ],
      },
      {
        id: 'data_prazo',
        label: 'Data do prazo ou audiência',
        title: 'Você sabe a data limite ou da audiência?',
        help: 'Se tiver a data, informe. Se não souber, pode deixar em branco.',
        type: 'text',
        placeholder: 'Ex.: 25/12 ou “em 10 dias”',
        required: false,
        icon: 'mdi-alarm',
        showIf: { question: 'momento', is: ['prazo'] },
      },
      {
        id: 'documentos',
        label: 'Documentos disponíveis',
        title: 'Quais documentos você já tem em mãos?',
        help: 'Pode marcar mais de uma. Não precisa enviar nada agora, só nos dizer o que existe.',
        type: 'multiple',
        required: false,
        icon: 'mdi-file-document-multiple-outline',
        options: [
          'Documento de identificação',
          'Certidões (casamento, nascimento, óbito)',
          'Documentos do INSS / CNIS',
          'Comprovantes e contratos',
          'Ainda não separei nada',
        ],
      },
      {
        id: 'atendimento',
        label: 'Formato preferido',
        title: 'Como prefere ser atendido?',
        help: 'O escritório atende presencialmente em Formiga/MG e online em todo o Brasil.',
        type: 'single',
        required: true,
        icon: 'mdi-video-outline',
        options: ['Online (vídeo ou WhatsApp)', 'Presencial', 'Tanto faz'],
      },
      {
        id: 'relato',
        label: 'Resumo do caso',
        title: 'Quer contar em poucas palavras o que aconteceu?',
        help: 'Opcional. Um resumo curto já ajuda muito. Os detalhes ficam para a conversa.',
        type: 'textarea',
        placeholder: 'Ex.: Meu pai faleceu e não sei como começar o inventário...',
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
  // privacy.enabled → página /privacidade e link no rodapé.
  // O texto da página é montado a partir destes dados e do que está ligado no site
  // (quiz, avaliações, analytics). Deve ser revisado pela advogada antes de publicar.
  // analytics.enabled: false → nenhum cookie de medição, nenhum aviso de cookies.
  // analytics.enabled: true  → aparece o aviso de cookies; GA4/Meta Pixel só carregam
  //                            depois que a pessoa aceita.
  // ─────────────────────────────────────────────────────────────────────────
  privacy: {
    enabled: true,
    lastUpdate: '18/11/2026',
    controllerName: '', // vazio: usa brand.officeName
    document: '', // CPF/CNPJ do escritório (opcional)
    contactEmail: '', // vazio: usa contact.email; se também vazio, usa o WhatsApp
    retentionNote: 'Mantemos as informações pelo tempo necessário para o atendimento solicitado e para cumprir obrigações legais e profissionais.',
  },

  analytics: {
    enabled: false,
    ga4Id: '', // ex.: 'G-XXXXXXXXXX'
    metaPixelId: '', // ex.: '1234567890'
    bannerTitle: 'Sua privacidade',
    bannerText: 'Usamos cookies de medição para entender como o site é usado e melhorar o atendimento. Eles só são ativados se você aceitar.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ARTIGOS (blog) → páginas /blog e /blog/<slug>
  // enabled: false → a seção, as páginas e o menu somem.
  // body aceita blocos: { type: 'p' | 'h2' | 'ul', text | items }.
  // Os artigos abaixo são MODELOS informativos: revise antes de publicar.
  // ─────────────────────────────────────────────────────────────────────────
  blog: {
    enabled: true,
    title: 'Artigos',
    eyebrow: 'Informação jurídica',
    description: 'Conteúdos informativos sobre Direito das Famílias, Sucessões e Previdenciário.',
    showOnHome: true,
    disclaimer: 'Conteúdo informativo, de caráter geral. Não substitui a análise do seu caso por advogado(a).',
    posts: [
      {
        slug: 'inventario-extrajudicial-quem-pode-fazer',
        title: 'Inventário extrajudicial: quem pode fazer em cartório?',
        excerpt: 'Entenda em que situações o inventário pode ser feito em cartório, quais são os requisitos gerais e quando o caminho judicial é necessário.',
        date: '2026-11-10',
        category: 'Sucessões',
        area: 'direito-de-sucessoes',
        readingTime: '3 min',
        image: '',
        body: [
          { type: 'p', text: 'Quando uma pessoa falece, os bens deixados precisam ser formalmente transferidos aos herdeiros. Esse procedimento se chama inventário e pode acontecer de duas formas: em cartório (extrajudicial) ou no Judiciário.' },
          { type: 'h2', text: 'Quando o inventário pode ser feito em cartório' },
          { type: 'p', text: 'De modo geral, a via extrajudicial é possível quando todos os herdeiros são maiores e capazes e estão de acordo quanto à divisão dos bens. O procedimento é feito por escritura pública e exige a assistência de advogado.' },
          { type: 'ul', items: [
            'Todos os herdeiros concordam com a partilha;',
            'Todos são maiores de idade e capazes;',
            'Há documentação básica do falecido e dos bens;',
            'Há advogado acompanhando o procedimento.',
          ] },
          { type: 'h2', text: 'Quando pode ser necessário o inventário judicial' },
          { type: 'p', text: 'Divergência entre herdeiros, presença de herdeiros menores ou incapazes e outras particularidades podem exigir o caminho judicial. A existência de testamento também merece análise específica, pois as regras podem variar.' },
          { type: 'h2', text: 'Prazos' },
          { type: 'p', text: 'A lei prevê prazo para abrir o inventário, e a legislação estadual pode prever multa sobre o imposto de transmissão em caso de atraso. Por isso, é recomendável buscar orientação logo após o falecimento.' },
        ],
      },
      {
        slug: 'cnis-o-que-e-e-como-conferir',
        title: 'CNIS: o que é e por que conferir antes de pedir a aposentadoria',
        excerpt: 'O CNIS reúne seus vínculos e contribuições no INSS. Saiba o que ele mostra e por que conferi-lo antes de qualquer pedido.',
        date: '2026-11-03',
        category: 'Previdenciário',
        area: 'direito-previdenciario',
        readingTime: '3 min',
        image: '',
        body: [
          { type: 'p', text: 'O Cadastro Nacional de Informações Sociais (CNIS) é o registro do INSS com os vínculos de trabalho e as contribuições de cada pessoa. É com base nele que o tempo de contribuição costuma ser analisado.' },
          { type: 'h2', text: 'O que conferir' },
          { type: 'ul', items: [
            'Se todos os vínculos de emprego aparecem;',
            'Se as datas de início e de fim estão corretas;',
            'Se existem períodos sem registro, indicadores ou pendências;',
            'Se as contribuições como autônomo ou facultativo constam.',
          ] },
          { type: 'h2', text: 'Como consultar' },
          { type: 'p', text: 'O extrato pode ser acessado no aplicativo ou no site Meu INSS, com a conta gov.br. Ao encontrar lacunas ou erros, em geral é possível pedir a correção apresentando documentos, como carteira de trabalho, contratos e comprovantes.' },
          { type: 'h2', text: 'Por que isso importa' },
          { type: 'p', text: 'Um registro incompleto pode alterar a análise do direito ao benefício. Como as regras dependem do histórico de cada pessoa, a avaliação individual é o caminho mais seguro.' },
        ],
      },
      {
        slug: 'pensao-alimenticia-como-e-definida',
        title: 'Pensão alimentícia: como o valor é definido?',
        excerpt: 'Não existe um percentual único. Veja os critérios usados para fixar e rever a pensão alimentícia.',
        date: '2026-10-27',
        category: 'Famílias',
        area: 'direito-das-familias',
        readingTime: '2 min',
        image: '',
        body: [
          { type: 'p', text: 'Uma dúvida comum é se a pensão alimentícia tem um valor ou percentual padrão. Não tem. O valor é definido em acordo ou por decisão judicial, de acordo com as circunstâncias de cada família.' },
          { type: 'h2', text: 'Os critérios principais' },
          { type: 'p', text: 'A lei considera a necessidade de quem recebe e a possibilidade de quem paga, buscando um equilíbrio entre os dois. Despesas como alimentação, moradia, saúde, educação e lazer costumam ser levadas em conta.' },
          { type: 'h2', text: 'O valor pode mudar?' },
          { type: 'p', text: 'Sim. Se a situação financeira de quem paga ou as necessidades de quem recebe se alteram, é possível pedir a revisão do valor, por acordo ou pela via judicial.' },
          { type: 'h2', text: 'Em caso de atraso' },
          { type: 'p', text: 'Quando a pensão deixa de ser paga, existem instrumentos legais para cobrar os valores em atraso. Cada situação exige análise, por isso vale buscar orientação especializada.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CONVERSÃO
  // originInMessage: acrescenta "(Origem: instagram / bio)" às mensagens de WhatsApp,
  //   usando UTM da URL (utm_source, utm_medium, utm_campaign) ou o site de origem.
  //   Exemplo de link para o Instagram: https://seusite.com.br/?utm_source=instagram&utm_medium=bio
  // floatingWhatsapp: botão fixo de WhatsApp. A mensagem muda conforme a seção
  //   visível na tela (sectionMessages) e conforme a página (áreas, artigos).
  // sectionMessages: chave = id da seção do site; valor = mensagem pré-escrita.
  // ─────────────────────────────────────────────────────────────────────────
  conversion: {
    originInMessage: true,
    floatingWhatsapp: {
      enabled: true,
    },
    sectionMessages: {
      areas: 'Olá! Estava vendo as áreas de atuação no site e gostaria de orientação.',
      produtos: 'Olá! Vi as mentorias e materiais no site e gostaria de saber mais.',
      equipe: 'Olá! Conheci a equipe pelo site e gostaria de conversar com a advogada.',
      artigos: 'Olá! Li os artigos do site e tenho uma dúvida sobre o meu caso.',
      avaliacoes: 'Olá! Vi as avaliações do escritório e gostaria de atendimento.',
      contato: 'Olá! Vim pela seção de contato do site e gostaria de atendimento.',
    },
  },

  // As notas e avaliações são obtidas pelo servidor; nunca preencha notas fictícias.
  googleReviews: {
    enabled: true,
    showOnLinkBio: true,
    endpoint: '/api/google-reviews',
    title: 'Avaliações no Google',
    description: 'Conheça as avaliações compartilhadas sobre o atendimento da Advocacia Fernanda Natale.',
    profileUrl: '',
    writeReviewUrl: '',
  },

  about: {
    title: 'Advocacia com compromisso, responsabilidade e atenção aos seus direitos',
    photo: '/media/Equipe5.png',
    photoAlt: 'Advocacia Fernanda Natale',
    text: 'A Advocacia Fernanda Natale atua nas áreas de Direito das Famílias e Sucessões e Direito Previdenciário. Com atendimento online e presencial, o escritório oferece orientação jurídica e acompanhamento responsável, atendendo clientes em todo o território nacional. O compromisso é proporcionar um atendimento pautado pela ética, transparência e atenção às necessidades de cada cliente.',
    subtitle: 'Atendimento jurídico online e presencial, com atuação nacional.',
    cards: [
      {
        icon: 'fa-solid fa-scale-balanced',
        title: 'Segurança jurídica',
        desc: 'Orientação jurídica responsável para auxiliar na proteção dos seus direitos.',
      },
      {
        icon: 'fa-solid fa-handshake-angle',
        title: 'Atendimento humanizado',
        desc: 'Atendimento próximo e individualizado, respeitando as necessidades de cada cliente.',
      },
      {
        icon: 'fa-solid fa-gavel',
        title: 'Atuação jurídica',
        desc: 'Acompanhamento e orientação nas áreas de Direito das Famílias e Sucessões e Direito Previdenciário.',
      },
      {
        icon: 'fa-solid fa-laptop',
        title: 'Atendimento acessível',
        desc: 'Atendimento online e presencial, com atuação em todo o território nacional.',
      },
    ],
  },

  practiceAreas: [
    {
      slug: 'direito-das-familias',
      page: true,
      title: 'Direito das Famílias',
      description: 'Atuação jurídica em questões relacionadas ao Direito das Famílias, com orientação e acompanhamento de acordo com as particularidades de cada situação.',
      icon: 'fa-solid fa-people-roof',
      pageTitle: 'Advogada de Direito das Famílias em Formiga/MG e online',
      intro: 'Questões de família costumam envolver emoção e decisões importantes. O atendimento busca explicar cada etapa com clareza, apresentar os caminhos possíveis e acompanhar o que for necessário, de forma ética e respeitosa.',
      topics: [
        'Divórcio e dissolução de união estável',
        'Pensão alimentícia (fixação, revisão e execução)',
        'Guarda e regime de convivência',
        'Partilha de bens do casal',
        'Reconhecimento de paternidade',
      ],
      faq: [
        {
          question: 'O divórcio pode ser feito em cartório?',
          answer: 'Em regra, sim, quando há acordo entre os cônjuges e não há filhos menores ou incapazes nem gestação em curso. Nos demais casos, costuma ser necessário o caminho judicial. A advogada analisa a sua situação para indicar a via adequada.',
        },
        {
          question: 'A pensão alimentícia tem valor fixo?',
          answer: 'Não. O valor é definido por acordo ou por decisão judicial, considerando a necessidade de quem recebe e a possibilidade de quem paga. Ele também pode ser revisto se as circunstâncias mudarem.',
        },
      ],
    },
    {
      slug: 'direito-de-sucessoes',
      page: true,
      title: 'Direito de Sucessões',
      description: 'Orientação jurídica em questões relacionadas ao Direito das Sucessões, com atenção aos direitos e interesses envolvidos em cada caso.',
      icon: 'fa-solid fa-scale-balanced',
      pageTitle: 'Advogada de Sucessões, inventário e herança em Formiga/MG e online',
      intro: 'Após a perda de um familiar, é comum surgirem dúvidas sobre bens, prazos e documentos. O atendimento orienta sobre o procedimento adequado e acompanha o inventário e a partilha com transparência.',
      topics: [
        'Inventário judicial e extrajudicial',
        'Partilha de bens e herança',
        'Testamento e planejamento sucessório',
        'Doações e adiantamento de herança',
        'Questões entre herdeiros',
      ],
      faq: [
        {
          question: 'Existe prazo para abrir o inventário?',
          answer: 'A lei processual prevê que o inventário seja iniciado em até dois meses após o falecimento e concluído nos doze meses seguintes, com possibilidade de prorrogação. A legislação estadual também pode prever multa sobre o imposto de transmissão em caso de atraso. Por isso, vale buscar orientação logo.',
        },
        {
          question: 'Quem são os herdeiros necessários?',
          answer: 'São os descendentes, os ascendentes e o cônjuge (e, conforme o caso, o companheiro). A ordem e a participação de cada um dependem da situação familiar e dos bens, o que exige análise individual.',
        },
      ],
    },
    {
      slug: 'direito-previdenciario',
      page: true,
      title: 'Direito Previdenciário',
      description: 'Orientação e acompanhamento jurídico em demandas relacionadas ao Direito Previdenciário, considerando as particularidades de cada solicitação.',
      icon: 'fa-solid fa-file-shield',
      pageTitle: 'Advogada Previdenciarista: aposentadoria e benefícios do INSS, online e em Formiga/MG',
      intro: 'As regras da Previdência dependem do histórico de cada pessoa. O atendimento analisa vínculos e contribuições, explica as alternativas e acompanha o pedido ou o recurso, administrativo ou judicial.',
      topics: [
        'Aposentadorias e análise de tempo de contribuição',
        'Auxílio por incapacidade temporária ou permanente',
        'Pensão por morte',
        'Benefício assistencial (BPC/LOAS)',
        'Recursos e revisão de benefícios negados ou concedidos',
      ],
      faq: [
        {
          question: 'O que é o CNIS e por que ele é importante?',
          answer: 'O Cadastro Nacional de Informações Sociais reúne vínculos e contribuições registrados no INSS. Ele é a base para analisar o tempo de contribuição, e pode ser consultado pelo aplicativo ou site Meu INSS. Erros ou lacunas costumam precisar de comprovação por documentos.',
        },
        {
          question: 'O INSS negou meu pedido. Ainda tenho como contestar?',
          answer: 'Em muitos casos, sim. Normalmente existe um prazo para recurso administrativo, em geral de 30 dias, e também pode haver a via judicial. Como os prazos correm, procure orientação o quanto antes.',
        },
      ],
    },
    {
      slug: 'atendimento-online',
      page: false,
      title: 'Atendimento Online',
      description: 'Atendimento jurídico online, proporcionando praticidade e comodidade para clientes de diferentes localidades.',
      icon: 'fa-solid fa-laptop',
    },
    {
      slug: 'atendimento-presencial',
      page: false,
      title: 'Atendimento Presencial',
      description: 'Atendimento presencial na Rua Pio XII, n. 26, sala 201, Centro, Formiga/MG.',
      icon: 'fa-solid fa-building',
    },
  ],

  serviceJourney: [
    {
      icon: 'mdi-message-text-outline',
      title: 'Primeiro contato',
      text: 'Entre em contato pelos canais disponíveis e apresente sua necessidade jurídica. O atendimento pode ser realizado online ou presencialmente.',
    },
    {
      icon: 'mdi-account-search-outline',
      title: 'Análise inicial',
      text: 'As informações apresentadas são avaliadas para compreender as particularidades da situação e identificar a documentação necessária.',
    },
    {
      icon: 'mdi-file-sign',
      title: 'Orientação e estratégia',
      text: 'Após a análise, são apresentadas as orientações jurídicas e os próximos passos adequados ao caso.',
    },
  ],

  faq: [
    {
      question: 'Quais áreas do Direito a advogada atende?',
      answer: 'A Advocacia Fernanda Natale atua nas áreas de Direito das Famílias e Sucessões e Direito Previdenciário.',
    },
    {
      question: 'Onde fica o escritório?',
      answer: 'O escritório está localizado na Rua Pio XII, n. 26, sala 201, Centro, Formiga/MG, CEP 35570-130.',
    },
    {
      question: 'O escritório oferece atendimento online?',
      answer: 'Sim. A Advocacia Fernanda Natale oferece atendimento online e presencial, com atuação em todo o território nacional.',
    },
    {
      question: 'Como funciona o primeiro atendimento?',
      answer: 'Você entra em contato pelo WhatsApp ou responde ao questionário do site. A equipe entende a sua situação, indica a documentação necessária e explica os próximos passos. Não é preciso ir ao escritório para começar.',
    },
    {
      question: 'Quais documentos preciso separar?',
      answer: 'Em geral, um documento de identificação e os documentos ligados ao seu assunto (certidões, contratos, comprovantes ou documentos do INSS). A lista varia conforme o caso; na seção de documentos do site e no questionário você encontra um ponto de partida.',
    },
    {
      question: 'Posso enviar documentos e dados pessoais pelo WhatsApp?',
      answer: 'No primeiro contato, prefira informar apenas o essencial e evite enviar senhas ou documentos completos. A equipe orienta qual é a forma mais adequada de envio durante o atendimento.',
    },
    {
      question: 'O inventário sempre precisa ser judicial?',
      answer: 'Não necessariamente. Quando todos os herdeiros são maiores e capazes e há acordo, o inventário pode ser feito em cartório, com a assistência de advogado. Em outras situações, pode ser necessário o caminho judicial. Cada caso exige análise.',
    },
    {
      question: 'Como saber se já posso me aposentar?',
      answer: 'Depende da idade, do tempo de contribuição, do histórico de vínculos e das regras aplicáveis à sua situação. A análise do CNIS e dos documentos é o primeiro passo para saber quais alternativas existem.',
    },
    {
      question: 'Meu pedido no INSS foi negado. O que fazer?',
      answer: 'Verifique o motivo da negativa e o prazo para recurso, que costuma ser curto. Procure orientação o quanto antes para avaliar a via administrativa ou judicial.',
    },
    {
      question: 'Minhas respostas do questionário ficam guardadas no site?',
      answer: 'Não. As respostas são montadas no seu aparelho e enviadas pelo WhatsApp somente quando você toca no botão de envio. Detalhes estão na Política de Privacidade.',
    },
    {
      question: 'Vocês atendem em outros estados?',
      answer: 'Sim. O atendimento é online e a atuação abrange todo o território nacional, observadas as particularidades de cada caso.',
    },
  ],

  team: [
    {
      name: 'Fernanda Natale',
      role: 'Advogada',
      description: 'Atuação nas áreas de Direito das Famílias e Sucessões e Direito Previdenciário. Atendimento online e presencial, com atuação nacional.',
      photo: '/IMGADV/5.png',
      instagram: 'https://www.instagram.com/fernandanataleadvocacia/',
      linkedin: '',
    },
  ],

  testimonials: [],

  seo: {
    title: 'Fernanda Natale Advocacia | Direito das Famílias e Sucessões e Previdenciário',
    description: 'Advocacia Fernanda Natale. Atuação em Direito das Famílias e Sucessões e Direito Previdenciário. Atendimento online e presencial. Escritório em Formiga/MG e atuação nacional.',
    // Endereço público do site (https://www.seudominio.com.br), sem barra no final.
    // Necessário para a imagem de compartilhamento, canonical e sitemap.xml.
    // Se ficar vazio, o build usa a variável SITE_URL ou o domínio da Vercel.
    siteUrl: '',
    ogImage: '/og-image.jpg',
    ogImageAlt: 'Advocacia Fernanda Natale',
  },

  whatsappWidget: {
    messages: [
      'Precisa de orientação jurídica? Entre em contato com a Advocacia Fernanda Natale.',
      'Atendimento em Direito das Famílias e Sucessões e Direito Previdenciário. Atendimento online e presencial.',
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
