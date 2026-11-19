// Gera, no build, um HTML por rota com título, descrição, Open Graph, canonical e JSON-LD próprios.
// Robôs (WhatsApp, Instagram, Google) leem esses metadados sem executar JavaScript.
// Também cria sitemap.xml e acrescenta a linha Sitemap ao robots.txt.
import fs from 'node:fs'
import path from 'node:path'
import { allRoutes, jsonLdFor, ogImageFor } from '../src/config/seoRoutes.js'
import { siteConfig as c } from '../src/config/siteConfig.js'

const esc = value => String(value ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function siteBase () {
  const env = process.env
  const raw = c.seo.siteUrl || env.SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
  return String(raw).replace(/\/$/, '')
}

function headBlock (route, base) {
  const url = `${base}${route.path === '/' ? '/' : route.path}`
  const image = ogImageFor(route, base)
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}">`,
    '<meta name="robots" content="index, follow">',
    base && `<link rel="canonical" href="${esc(url)}">`,
    `<meta property="og:title" content="${esc(route.title)}">`,
    `<meta property="og:description" content="${esc(route.description)}">`,
    `<meta property="og:type" content="${route.kind === 'post' ? 'article' : 'website'}">`,
    base && `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:site_name" content="${esc(c.brand.officeName)}">`,
    '<meta property="og:locale" content="pt_BR">',
    `<meta property="og:image" content="${esc(image)}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    `<meta property="og:image:alt" content="${esc(c.seo.ogImageAlt)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${esc(route.title)}">`,
    `<meta name="twitter:description" content="${esc(route.description)}">`,
    `<meta name="twitter:image" content="${esc(image)}">`,
  ].filter(Boolean)
  const ld = JSON.stringify(jsonLdFor(route, base || '')).replace(/</g, String.raw`\u003c`)
  tags.push(`<script type="application/ld+json" id="ld-json">${ld}</script>`)
  return tags.join('\n    ')
}

export function prerenderPlugin () {
  let outDir = 'dist'
  return {
    name: 'prerender-seo',
    apply: 'build',
    enforce: 'post',
    configResolved (config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle () {
      const indexPath = path.join(outDir, 'index.html')
      if (!fs.existsSync(indexPath)) {
        return
      }
      const template = fs.readFileSync(indexPath, 'utf8')
      const base = siteBase()
      if (!base) {
        console.warn('\n[seo] seo.siteUrl vazio: defina seo.siteUrl ou a variável SITE_URL para gerar canonical, og:url e sitemap.xml.\n')
      }

      const routes = allRoutes()
      for (const route of routes) {
        const html = template
          .replace(/<title>[\s\S]*?<\/title>/i, '')
          .replace(/<meta\s+name="description"[^>]*>/i, '')
          .replace('</head>', `    ${headBlock(route, base)}\n  </head>`)
        const file = route.path === '/' ? indexPath : path.join(outDir, `${route.path.slice(1)}.html`)
        fs.mkdirSync(path.dirname(file), { recursive: true })
        fs.writeFileSync(file, html)
      }

      if (base) {
        const today = new Date().toISOString().slice(0, 10)
        const urls = routes
          .map(r => `  <url><loc>${esc(base + (r.path === '/' ? '/' : r.path))}</loc><lastmod>${r.post?.updated || r.post?.date || today}</lastmod></url>`)
          .join('\n')
        fs.writeFileSync(path.join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
        const robots = path.join(outDir, 'robots.txt')
        const current = fs.existsSync(robots) ? fs.readFileSync(robots, 'utf8').trimEnd() : 'User-agent: *\nAllow: /'
        fs.writeFileSync(robots, `${current}\n\nSitemap: ${base}/sitemap.xml\n`)
      }
      console.log(`[seo] ${routes.length} páginas pré-renderizadas${base ? ' + sitemap.xml' : ''}.`)
    },
  }
}
