import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_META,
  SITE_URL,
  dictionaries,
  localeFromPath,
  localePath,
  type Dictionary,
  type Locale,
} from './config'

type I18nValue = {
  locale: Locale
  t: Dictionary
  setLocale: (next: Locale) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const I18nContext = createContext<I18nValue | null>(null)

/**
 * Keeps the document's language metadata in step with the active locale. Search
 * engines read these from the served HTML, so they have to be updated on every
 * change rather than only at build time.
 */
function syncDocument(locale: Locale, t: Dictionary) {
  const { htmlLang } = LOCALE_META[locale]
  document.documentElement.lang = htmlLang

  document.title = t.meta.title

  const setMeta = (selector: string, attr: string, value: string) => {
    const el = document.head.querySelector(selector)
    if (el) el.setAttribute(attr, value)
  }

  setMeta('meta[name="description"]', 'content', t.meta.description)
  setMeta('meta[name="title"]', 'content', t.meta.title)
  setMeta('meta[property="og:title"]', 'content', t.meta.title)
  setMeta('meta[property="og:description"]', 'content', t.meta.description)
  setMeta('meta[property="og:locale"]', 'content', t.meta.locale)
  setMeta('link[rel="canonical"]', 'href', `${SITE_URL}${localePath(locale)}`)

  // hreflang tells Google these are translations of one page rather than
  // duplicates, and which to serve for a given user. The build already emits
  // these into each locale's HTML, so every existing alternate is cleared first
  // — otherwise a client-side switch appends a second, duplicate set.
  document.head.querySelectorAll('link[rel="alternate"]').forEach((el) => el.remove())
  const alternates: Array<[string, Locale | 'x-default']> = [
    ...LOCALES.map((l) => [LOCALE_META[l].htmlLang, l] as [string, Locale]),
    ['x-default', 'x-default'],
  ]

  for (const [hreflang, target] of alternates) {
    const link = document.createElement('link')
    link.rel = 'alternate'
    link.hreflang = hreflang
    link.href = `${SITE_URL}${localePath(target === 'x-default' ? DEFAULT_LOCALE : target)}`
    link.dataset.hreflang = 'true'
    document.head.appendChild(link)
  }
}

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  /** Supplied when prerendering, where there is no location to read. */
  initialLocale?: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(
    () =>
      initialLocale ??
      (typeof window === 'undefined' ? DEFAULT_LOCALE : localeFromPath(window.location.pathname))
  )

  const setLocale = useCallback((next: Locale) => {
    if (typeof window === 'undefined') return
    // The URL is the source of truth: each language is its own indexable page,
    // so switching must change the address, not just component state.
    window.history.pushState({}, '', localePath(next))
    setLocaleState(next)
    try {
      localStorage.setItem('locale', next)
    } catch {
      // Blocked storage only costs the preference on the next visit.
    }
  }, [])

  // Back/forward should move between languages like any other navigation.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onPopState = () => setLocaleState(localeFromPath(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    syncDocument(locale, dictionaries[locale])
  }, [locale])

  const value = useMemo(
    () => ({ locale, t: dictionaries[locale], setLocale }),
    [locale, setLocale]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
