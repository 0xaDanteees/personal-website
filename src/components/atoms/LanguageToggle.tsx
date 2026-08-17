import { useEffect, useRef, useState } from 'react'
import { Languages } from 'lucide-react'
import { LOCALES, LOCALE_META } from '../../i18n/config'
import { useI18n } from '../../i18n/useI18n'

/**
 * Three locales is too many for a toggle and too few for a select, so this is a
 * small popover: one click to open, one to choose. The trigger shows the active
 * code so the current language is legible without opening anything.
 */
export function LanguageToggle() {
  const { locale, t, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className="lang-toggle" ref={containerRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="lang-toggle__trigger rounded-md px-3 py-2 text-sm bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--primary)] hover:text-[var(--bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-[var(--bg)]"
        aria-label={t.nav.languageAria}
        aria-expanded={open}
        aria-haspopup="listbox"
        title={t.nav.language}
      >
        <Languages size={16} aria-hidden="true" />
        <span className="lang-toggle__code">{LOCALE_META[locale].label}</span>
      </button>

      <ul
        className={`lang-toggle__menu ${open ? 'is-open' : ''}`}
        role="listbox"
        aria-label={t.nav.language}
      >
        {LOCALES.map((code, i) => (
          <li key={code} role="none" style={{ '--item-index': i } as React.CSSProperties}>
            <button
              role="option"
              aria-selected={code === locale}
              lang={LOCALE_META[code].htmlLang}
              className={`lang-toggle__option ${code === locale ? 'is-active' : ''}`}
              onClick={() => {
                setLocale(code)
                setOpen(false)
              }}
              tabIndex={open ? 0 : -1}
            >
              <span className="lang-toggle__option-code type-meta">{LOCALE_META[code].label}</span>
              <span>{LOCALE_META[code].native}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
