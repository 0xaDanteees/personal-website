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
      writeFileSync(
        resolve(dist, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), i18nHtmlPlugin()],
})
