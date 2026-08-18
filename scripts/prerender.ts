import { build } from 'vite'
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import react from '@vitejs/plugin-react-swc'

import { LOCALES, type Locale } from '../src/i18n/config'

const ROOT = process.cwd()
const DIST = resolve(ROOT, 'dist')
const SSR_OUT = resolve(ROOT, '.ssr-tmp')

const localeDir = (l: Locale) => (l === 'en' ? '' : `${l}/`)

/**
 * Renders the app to static HTML at build time, one file per locale.
 *
 * Google executes JavaScript, so the client-rendered version was fine for it.
 * GPTBot, ClaudeBot, PerplexityBot and Bingbot do not — they were served an
 * empty `<div id="root">`. Every social preview scraper had the same problem.
 * Baking the markup in makes the content readable without a JS runtime while
 * leaving the interactive app to hydrate over it unchanged.
 */
async function prerender() {
  // A separate SSR bundle, because the browser build targets the DOM.
  await build({
    logLevel: 'warn',
    plugins: [react()],
    build: {
      ssr: resolve(ROOT, 'src/entry-prerender.tsx'),
      outDir: SSR_OUT,
      emptyOutDir: true,
      rollupOptions: {
        output: { entryFileNames: 'entry-prerender.js' },
      },
    },
  })

  const entry = pathToFileURL(resolve(SSR_OUT, 'entry-prerender.js')).href
  const { render } = (await import(entry)) as { render: (l: Locale) => Promise<string> }

  for (const locale of LOCALES) {
    const file = resolve(DIST, `${localeDir(locale)}index.html`)
    if (!existsSync(file)) {
      console.warn(`  prerender: ${locale} skipped, ${file} not found`)
      continue
    }

    const html = readFileSync(file, 'utf-8')
    const markup = await render(locale)

    // Only the root container is replaced; the head that the i18n build plugin
    // already localised stays exactly as it is.
    const out = html.replace(
      '<div id="root"></div>',
      `<div id="root">${markup}</div>`
    )

    writeFileSync(file, out)
    const bytes = markup.replace(/<[^>]+>/g, '').trim().length
    console.log(`  prerender: ${locale.padEnd(2)} → ${localeDir(locale) || './'}index.html (${bytes} chars of text)`)
  }

  rmSync(SSR_OUT, { recursive: true, force: true })
}

prerender().catch((err) => {
  console.error('prerender failed:', err)
  process.exit(1)
})
