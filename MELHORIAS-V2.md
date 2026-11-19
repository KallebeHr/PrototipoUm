# Melhorias V2: privacidade, SEO, conteúdo e conversão

Tudo é controlado em **`src/config/siteConfig.js`**. Depois de editar: `npm run build` e publique.

## 1. Antes de publicar (importante)

1. **`seo.siteUrl`**: informe o endereço final (ex.: `https://www.fernandanatale.com.br`). Sem ele não há canonical, `og:url` nem `sitemap.xml`. Alternativa: variável de ambiente `SITE_URL` no build (na Vercel o domínio de produção é detectado sozinho).
2. **Revisão jurídica**: a Política de Privacidade, os 3 artigos e as respostas do FAQ/áreas são **modelos informativos**. A advogada deve revisar tudo, inclusive conforme as regras de publicidade da OAB (Provimento 205/2021).
3. **`contact.email`**: está vazio. Enquanto vazio, o item "E-mail" some do site e do perfil (nada de `mailto:` quebrado). Preencha para exibir.
4. Substitua a arte `public/media/produto-exemplo.svg` e os textos de exemplo da mentoria.

## 2. Rotas reais

Antes: `/#/linkbio`. Agora: **`/linkbio`**, **`/ajuda`**, **`/privacidade`**, **`/blog`**, **`/blog/<slug>`**, **`/areas/<slug>`**, **`/equipe/<slug>`**.
Links antigos com `#/` continuam funcionando (viram a rota nova automaticamente).
Na hospedagem é preciso redirecionar qualquer caminho para `index.html`: o arquivo **`vercel.json`** já faz isso. Em outra hospedagem (Netlify, Apache etc.), crie a regra equivalente.

## 3. SEO

- No build, cada rota gera um **HTML próprio** com título, descrição, Open Graph (prévia no WhatsApp/Instagram), canonical e dados estruturados. Também gera `sitemap.xml` e acrescenta o sitemap ao `robots.txt`.
- **Dados estruturados (JSON-LD):** `LegalService` (endereço, telefone, área de atuação, redes), `FAQPage` (home e áreas), `BlogPosting` e `BreadcrumbList`.
- **Imagem de compartilhamento:** `public/og-image.jpg` (1200×630). Troque quando quiser; o caminho fica em `seo.ogImage`. Cada artigo pode ter `image` própria.
- O WhatsApp guarda prévias em cache: após publicar, teste com um link novo ou use o depurador de compartilhamento da Meta.
- Com `npm run dev` as tags são ajustadas pelo navegador; o HTML individual por rota só existe após `npm run build`.

## 4. LGPD e cookies

- **Página `/privacidade`** (`privacy.enabled`): o texto é montado conforme o que está ligado no site (quiz, avaliações, medição). Preencha `privacy.controllerName`, `privacy.document` e `privacy.contactEmail` se desejar.
- **Aviso de cookies**: só aparece se `analytics.enabled: true` **e** houver `ga4Id` ou `metaPixelId`. GA4 e Meta Pixel **só carregam depois do "Aceitar"**; "Recusar" não dispara nada. A pessoa pode mudar a escolha em "Cookies", no rodapé.
- **Quiz com aceite**: `quiz.requireConsent: true` exige marcar o consentimento antes de liberar o botão de envio.

## 5. Conversão e rastreamento

Eventos enviados ao GA4 e ao Meta Pixel (somente com aceite):

| Evento | Quando |
| --- | --- |
| `page_view` | cada página aberta |
| `whatsapp_click` | qualquer clique em link de WhatsApp (inclui `section` e a página) |
| `quiz_open` | clique para abrir o questionário (site, bio, contato) |
| `quiz_start` | botão "Começar" do quiz |
| `quiz_complete` | botão de envio ao WhatsApp |
| `product_click` | clique em banner de mentoria/produto |

No Meta Pixel, `whatsapp_click` vira **Contact** e `quiz_complete` vira **Lead**.

**Origem (UTM):** `conversion.originInMessage: true` acrescenta `(Origem: instagram / bio)` às mensagens. Use links com UTM nas redes, por exemplo `https://seusite.com.br/?utm_source=instagram&utm_medium=bio&utm_campaign=lancamento`. Sem UTM, usa o site de referência quando houver. A origem fica só na sessão do navegador.

**Quiz mais esperto** (`quiz.questions`):
- `options` aceita texto ou `{ label, value, whatsapp }`. Com `whatsapp` preenchido, quem escolhe aquela opção é encaminhado para **esse número** (ex.: previdenciário para uma advogada, famílias para outra).
- `showIf: { question: 'area', is: ['previdenciario'] }` mostra a pergunta só quando a resposta anterior combina (usa o `value` da opção).
- A pergunta final "melhor horário para contato" já está no fluxo.

**Botão fixo de WhatsApp** (`conversion.floatingWhatsapp`): a mensagem muda conforme a seção visível (`conversion.sectionMessages`, chave = id da seção) e conforme a página (áreas e artigos). Fica oculto enquanto o aviso de cookies está aberto.

## 6. Conteúdo

- **Artigos** (`blog`): `/blog` e `/blog/<slug>`; 3 modelos incluídos. Cada post tem `slug`, `title`, `excerpt`, `date`, `category`, `area` (liga à página da área), `image` opcional e `body` (blocos `p`, `h2`, `ul`). `blog.enabled: false` desliga tudo.
- **Páginas por área** (`practiceAreas` com `page: true` e `slug`): `/areas/<slug>` com introdução, situações atendidas, perguntas frequentes e chamadas para WhatsApp e quiz.
- **FAQ** ampliado de 3 para 11 perguntas.
- **Hero no celular**: título maior (até ~1.95rem), com etiqueta acima.
- **Perfis duplicados** corrigidos: `professionalProfiles` tinha 3 entradas com o mesmo `slug`; agora há 1 por pessoa da equipe.

## 7. Arquivos novos

`seoRoutes.js`, `useConsent.js`, `useOrigin.js`, `useOffers.js`, `prerenderPlugin.mjs` (em `dev/`), `vercel.json`, `public/robots.txt`, `public/og-image.jpg`, `styles/pages.css` e os componentes `PageShell`, `PageCta`, `PostCard`, `BlogSection`, `BlogIndexPage`, `BlogPostPage`, `AreaPage`, `NotFoundPage`, `PrivacyPage`, `CookieBanner`, `FloatingWhatsApp`, `ProductShowcase`, `QuizCallout`, `QuizPage`.
