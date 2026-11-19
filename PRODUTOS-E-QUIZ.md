# Produtos/mentorias e questionário `/ajuda`

Tudo é controlado em **`src/config/siteConfig.js`** com interruptores `true` / `false`.
Depois de editar, rode `npm run build` e publique (ou veja na hora com `npm run dev`).

---

## 1. Vitrine de produtos (mentoria, curso, e-book, consultoria…)

Bloco `products`:

| Campo | O que faz |
| --- | --- |
| `enabled` | **`false`** = nada aparece. **`true`** = a vitrine aparece. |
| `showOnSite` / `showOnLinkBio` | Liga ou desliga a vitrine só no site ou só na bio. |
| `eyebrow`, `title`, `description` | Textos acima dos banners (no site). A bio mostra só o título. |
| `items` | Lista de banners. Adicione um objeto por produto. |

Cada item de `items`:

| Campo | O que faz |
| --- | --- |
| `title` | Título exibido sobre a arte. |
| `description` | Texto curto (aparece no site, não na bio). |
| `image` | Caminho da arte dentro de `public` (ex.: `/media/mentoria.jpg`). Tamanho ideal: **1200 × 480 px**. Vazio ou com erro: aparece um fundo com as cores do site. |
| `imageAlt` | Descrição da imagem para leitores de tela. |
| `badge` | Selo opcional (ex.: `Novo`, `Vagas abertas`). |
| `price` | Preço opcional (texto livre). |
| `buttonLabel` | Texto do botão. Padrão: `Saiba mais`. |
| `url` | Link de destino (página de vendas, Hotmart, etc.). **Se ficar vazio**, o botão abre o WhatsApp do escritório. |
| `whatsappMessage` | Mensagem usada quando `url` está vazio. |
| `showOnSite` / `showOnLinkBio` | Esconde só este item do site ou da bio. |

Exemplo:

```js
{
  title: 'Mentoria para advogados',
  description: 'Acompanhamento individual de 3 meses.',
  image: '/media/mentoria.jpg',
  imageAlt: 'Arte da mentoria',
  badge: 'Vagas abertas',
  buttonLabel: 'Saiba mais',
  url: 'https://pay.exemplo.com/mentoria',
}
```

---

## 2. Questionário de ajuda (`/ajuda`)

Bloco `quiz`:

| Campo | O que faz |
| --- | --- |
| `enabled` | **`false`** = a página, os botões e o link no menu somem; quem abrir `/ajuda` volta ao site. **`true`** = ativa tudo. |
| `showOnSite` / `showOnLinkBio` | Mostra o botão só no site ou só na bio. |
| `buttonLabel`, `buttonDescription` | Texto do botão/faixa. |
| `pageTitle`, `pageIntro`, `estimatedTime`, `privacyNote` | Textos da tela inicial do questionário. |
| `whatsapp` | Número que recebe as respostas. Vazio: usa `contact.whatsapp`. |
| `messageIntro` | Primeira frase da mensagem enviada. |
| `finishTitle`, `finishText`, `finishButton` | Textos da tela final. |
| `questions` | As perguntas, na ordem em que aparecem. |

Cada pergunta:

| Campo | O que faz |
| --- | --- |
| `id` | Identificador único (sem espaços). |
| `title` | A pergunta mostrada ao cliente. |
| `label` | Nome curto usado no resumo e na mensagem do WhatsApp. |
| `help` | Explicação didática exibida num quadro de dica sob a pergunta. |
| `type` | `single` (uma opção), `multiple` (várias), `text`, `textarea` ou `phone`. |
| `options` | Lista de opções (para `single` e `multiple`). |
| `allowOther` | `true` adiciona a opção "Outro" com campo de texto. |
| `required` | `true` obriga a responder. |
| `placeholder` | Texto de exemplo nos campos livres. |
| `icon` | Ícone [Material Design Icons](https://pictogrammers.com/library/mdi/) (ex.: `mdi-scale-balanced`). |

### Como funciona para o cliente

1. Toca em **Responder questionário** (faixa no site, item no menu, rodapé ou botão logo abaixo do WhatsApp na bio).
2. Responde uma pergunta por vez, com barra de progresso e animações. Perguntas obrigatórias são validadas; o telefone é formatado com DDD.
3. Na tela final confere o resumo (pode editar qualquer resposta) e toca em **Enviar respostas pelo WhatsApp**: a conversa abre com a mensagem pronta, por exemplo:

```
Olá! Respondi o questionário do site... Seguem minhas respostas:

*1. Nome*
Maria Souza

*2. Área do assunto*
Sucessões (inventário, herança, testamento)
...
```

As respostas **não passam por servidor**: ficam só no aparelho até o cliente enviar. Há também o botão "Copiar texto".

### Endereços

- Quiz: `https://seu-dominio.com.br/ajuda` (também funciona `/#/quiz`)
- O botão "Voltar" do quiz retorna à bio se a pessoa veio de lá, ou ao site.

---

## Arquivos desta atualização

- `src/config/siteConfig.js`: blocos `products` e `quiz`.
- `src/composables/useOffers.js`: regras de visibilidade, links e montagem da mensagem.
- `src/components/ProductShowcase.vue`: banners horizontais (site e bio).
- `src/components/QuizCallout.vue`: faixa do site e botão da bio.
- `src/components/QuizPage.vue`: página `/ajuda`.
- `src/App.vue`: rota `#/ajuda`, título da aba e redirecionamento quando desativado.
- `InstitutionalSite.vue`, `LinkBioPage.vue`, `HeaderNavigation.vue`, `FooterSection.vue`: onde os blocos aparecem (menu, busca e rodapé incluídos).
- `public/media/produto-exemplo.svg`: arte de exemplo. **Troque por uma arte real.**

> Os textos de mentoria e as perguntas do quiz são **exemplos**. Revise-os (especialmente perguntas jurídicas) antes de publicar.
