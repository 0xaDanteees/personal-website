import { renderToString } from 'react-dom/server'
import { Header } from './components/molecules/Header'
import Home from './pages/Home'
import { I18nProvider } from './i18n/I18nProvider'
import { dictionaries, type Locale } from './i18n/config'

/**
 * Server-side render used only at build time.
 *
 * The app shell is duplicated here rather than importing App because App wraps
 * everything in its own provider without an initial locale — prerendering needs
 * to pin the language per output file. Everything below that is the same tree
 * the browser hydrates, which is what keeps the markup matching.
 */
export async function render(locale: Locale): Promise<string> {
  const t = dictionaries[locale]

  return renderToString(
    <I18nProvider initialLocale={locale}>
      <div className="site-shell min-h-screen bg-[var(--bg)] text-[var(--text)] relative overflow-x-hidden">
        <Header />
        <div className="mx-auto max-w-6xl relative z-10">
          <Home />
        </div>
        <footer className="py-8 text-center text-xs text-[var(--text)]/40 border-t border-[var(--text)]/5 relative z-10">
          &copy; {new Date().getFullYear()} {t.footer.rights}
        </footer>
      </div>
    </I18nProvider>
  )
}
