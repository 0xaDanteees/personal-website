import './App.css'
import { Header } from "./components/molecules/Header"
import Home from './pages/Home'
import { I18nProvider } from './i18n/I18nProvider'
import { useI18n } from './i18n/useI18n'
import { localeFromPath } from './i18n/config'

function Footer() {
  const { t } = useI18n()
  return (
    <footer className="py-8 text-center text-xs text-[var(--text)]/40 border-t border-[var(--text)]/5 relative z-10">
      &copy; {new Date().getFullYear()} {t.footer.rights}
    </footer>
  )
}

export default function App() {
  // Resolved before the provider mounts so hydration starts on the same locale
  // the page was prerendered with; otherwise /es would hydrate as English and
  // React would discard the prerendered markup.
  const initialLocale = localeFromPath(window.location.pathname)

  return (
    <I18nProvider initialLocale={initialLocale}>
      <div className="site-shell min-h-screen bg-[var(--bg)] text-[var(--text)] relative overflow-x-hidden">
        <Header />
        <div className="mx-auto max-w-6xl relative z-10">
          <Home />
        </div>
        <Footer />
      </div>
    </I18nProvider>
  )
}