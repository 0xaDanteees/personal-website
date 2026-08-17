import en from './dictionaries/en.json'
import es from './dictionaries/es.json'
import it from './dictionaries/it.json'

export const LOCALES = ['en', 'es', 'it'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/** English is the canonical shape; the others must match it. */
export type Dictionary = typeof en

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  es: es as Dictionary,
  it: it as Dictionary,
}

export const LOCALE_META: Record<Locale, { label: string; native: string; htmlLang: string }> = {
  en: { label: 'EN', native: 'English', htmlLang: 'en' },
  es: { label: 'ES', native: 'Español', htmlLang: 'es' },
  it: { label: 'IT', native: 'Italiano', htmlLang: 'it' },
}

export const SITE_URL = 'https://danor.dev'

/**
 * The default locale lives at the root rather than at /en, so the canonical URL
 * stays clean and existing links keep working.
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : path
  return locale === DEFAULT_LOCALE ? `/${clean}`.replace('//', '/') : `/${locale}${clean}`
}

/** Reads the locale from the first path segment. */
export function localeFromPath(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0]
  return LOCALES.includes(segment as Locale) ? (segment as Locale) : DEFAULT_LOCALE
}

/** Best matching locale from the browser, used only on a first visit. */
export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE
  for (const lang of navigator.languages ?? [navigator.language]) {
    const base = lang.toLowerCase().split('-')[0]
    if (LOCALES.includes(base as Locale)) return base as Locale
  }
  return DEFAULT_LOCALE
}
