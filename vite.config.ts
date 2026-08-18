import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import en from './src/i18n/dictionaries/en.json'
import es from './src/i18n/dictionaries/es.json'
import it from './src/i18n/dictionaries/it.json'

const SITE_URL = 'https://danor.dev'
const DICTS = { en, es, it } as const
const LOCALES = ['en', 'es', 'it'] as const
type Locale = (typeof LOCALES)[number]

const localePath = (l: Locale) => (l === 'en' ? '/' : `/${l}/`)

/**
 * Writes a real index.html per locale, with that language's title, description
 * and hreflang set already in the markup.
 *
 * A client-only switch would leave every crawler seeing the English page: bots
 * do not click the language selector. Emitting one document per locale is what
 * actually makes the translations indexable.
 */
function i18nHtmlPlugin(): Plugin {
  return {
    name: 'i18n-html',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = bundle['index.html']
      if (!html || html.type !== 'asset') return

      const template = String(html.source)

      const alternates = [
        ...LOCALES.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE_URL}${localePath(l)}" />`),
        `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`,
      ].join('\n    ')

      for (const locale of LOCALES) {
        const dict = DICTS[locale]
        let out = template

        out = out.replace(/<html lang="[^"]*"/, `<html lang="${locale}"`)
        out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${dict.meta.title}</title>`)
        out = out.replace(
          /(<meta name="title" content=")[^"]*(")/,
          `$1${dict.meta.title}$2`
        )
        out = out.replace(
          /(<meta name="description" content=")[^"]*(")/,
          `$1${dict.meta.description}$2`
        )
        out = out.replace(
          /(<meta property="og:title" content=")[^"]*(")/,
          `$1${dict.meta.title}$2`
        )
        out = out.replace(
          /(<meta property="og:description" content=")[^"]*(")/,
          `$1${dict.meta.description}$2`
        )
        out = out.replace(
          /(<meta property="og:locale" content=")[^"]*(")/,
          `$1${dict.meta.locale}$2`
        )
        out = out.replace(
          /(<meta property="og:url" content=")[^"]*(")/,
          `$1${SITE_URL}${localePath(locale)}$2`
        )
        out = out.replace(
          /(<meta name="twitter:title" content=")[^"]*(")/,
          `$1${dict.meta.title}$2`
        )
        out = out.replace(
          /(<meta name="twitter:description" content=")[^"]*(")/,
          `$1${dict.meta.description}$2`
        )
        // The structured data has to name the locale it describes, or all three
        // pages claim to be the same English profile. Parsed rather than
        // regexed so it cannot silently stop matching if the block is reformatted.
        out = out.replace(
          /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/,
          (_full, open, json, close) => {
            try {
              const data = JSON.parse(json)
              for (const node of data['@graph'] ?? []) {
                if (node['@type'] === 'ProfilePage') {
                  node.url = `${SITE_URL}${localePath(locale)}`
                  node.inLanguage = locale
                }
                if (node['@type'] === 'Person') {
                  node.description = dict.meta.description
                }
              }
              return `${open}\n${JSON.stringify(data, null, 6)}\n    ${close}`
            } catch {
              return _full
            }
          }
        )
        out = out.replace(
          /<link rel="canonical" href="[^"]*" \/>/,
          `<link rel="canonical" href="${SITE_URL}${localePath(locale)}" />\n    ${alternates}`
        )

        if (locale === 'en') {
          html.source = out
        } else {
          this.emitFile({
            type: 'asset',
            fileName: `${locale}/index.html`,
            source: out,
          })
        }
      }
    },
    closeBundle() {
      // Static hosts need a sitemap to discover the localized routes.
      const urls = LOCALES.map(
        (l) => `  <url>
    <loc>${SITE_URL}${localePath(l)}</loc>
${LOCALES.map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${SITE_URL}${localePath(alt)}" />`).join('\n')}
  </url>`
      ).join('\n')

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
      const dist = resolve(process.cwd(), 'dist')
      mkdirSync(dist, { recursive: true })
      writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)

      // AI crawlers are named explicitly rather than relying on the wildcard:
      // being listed is what several of them check before indexing.
      writeFileSync(
        resolve(dist, 'robots.txt'),
        [
          'User-agent: *',
          'Allow: /',
          '',
          '# AI assistants and answer engines',
          'User-agent: GPTBot',
          'Allow: /',
          '',
          'User-agent: OAI-SearchBot',
          'Allow: /',
          '',
          'User-agent: ClaudeBot',
          'Allow: /',
          '',
          'User-agent: PerplexityBot',
          'Allow: /',
          '',
          'User-agent: Google-Extended',
          'Allow: /',
          '',
          `Sitemap: ${SITE_URL}/sitemap.xml`,
          '',
        ].join('\n')
      )

      // llms.txt: a plain-text summary for language models, so an agent can
      // answer questions about this person without parsing the page.
      const p = en.projects.items
      writeFileSync(
        resolve(dist, 'llms.txt'),
        `# Daniel Ortega — Fullstack Developer

> ${en.meta.description}

Based in Mexico City, Mexico. Available for freelance projects, collaborations
and full-time roles. Contact: adros.dev17@gmail.com

## Focus

${en.about.body.replace(/<\/?k>/g, '')}

## Current role

Fullstack Software Developer at Rubidex (2025—present): backend and cloud
infrastructure for a Real Estate and Crypto (RWA) investment ecosystem, banking
integration under US compliance, KYC/KYB for US and CA users, AWS with Terraform.

## Selected projects

${Object.values(p).map((x) => `- ${x.title}: ${x.description}`).join('\n')}

## Stack

Infrastructure: AWS, Terraform, GCP, Azure, Docker, CentOS/Httpd, Vercel
Data: PostgreSQL, Neo4j, Redis, pgvector, SQLAlchemy
Backend: Python, FastAPI, Django, Node.js/Express, GraphQL, WebSockets, SSE
Queues & pipelines: BullMQ, RabbitMQ, Celery, pg-boss, ETL, Selenium, Playwright
AI: RAG, agentic workflows, semantic search, Claude, OpenAI, Azure Document Intelligence, OCR
Interface: React, Next.js, TypeScript, TailwindCSS, Atomic Design
Web3 & compliance: Solidity, ethers.js, SIWE, EVM/Ethereum, MetaMask, BitQuery, KYC/KYB, ACH
Observability: Sentry, CloudWatch, Pytest, Jest, Google Analytics

## Languages

Spanish (native), English (C1), Italian (A2)

## Credentials

Google Data Analytics, Coursera, 2023 — credential N7K4JQR8BHZA

## Site

- English: ${SITE_URL}/
- Español: ${SITE_URL}/es/
- Italiano: ${SITE_URL}/it/
`
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), i18nHtmlPlugin()],
})
