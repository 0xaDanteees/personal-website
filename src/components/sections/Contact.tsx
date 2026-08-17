import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { SectionTitle } from '../atoms/SectionTitle'
import { Reveal } from '../atoms/Reveal'
import { useMagnetic } from '../hooks/useMagnetic'
import { EXTERNAL_LINKS, SOCIAL_HANDLES, CONTACT_EMAIL } from '../../config/constants'
import { useI18n } from '../../i18n/useI18n'
import { interpolate } from '../../i18n/interpolate'

/**
 * The closing section, so it has one job: make the next step obvious. The email
 * spans the measure and is the largest thing here; everything else recedes to a
 * metadata row.
 *
 * This was a 2×2 grid of cards — the only cards left on the page once Skills and
 * Projects moved to hairline rows, and four boxes of equal weight asked for
 * nothing in particular.
 */
export default function Contact() {
  const { t } = useI18n()
  const emailRef = useMagnetic<HTMLAnchorElement>({ strength: 5, radius: 14 })
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<number>(undefined)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
    } catch {
      // Older browsers and non-secure contexts reject the async clipboard.
      const field = document.createElement('textarea')
      field.value = CONTACT_EMAIL
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      document.body.removeChild(field)
    }

    setCopied(true)
    window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => () => window.clearTimeout(resetTimer.current), [])

  const links = [
    {
      key: 'github',
      href: EXTERNAL_LINKS.github,
      label: t.contact.github,
      value: `@${SOCIAL_HANDLES.github}`,
      aria: t.contact.githubAria,
    },
    {
      key: 'linkedin',
      href: EXTERNAL_LINKS.linkedin,
      label: t.contact.linkedin,
      value: 'Daniel Ortega',
      aria: t.contact.linkedinAria,
    },
  ]

  return (
    <section id="contact" className="px-5 md:px-8">
      <SectionTitle>{t.contact.title}</SectionTitle>

      <div className="max-w-3xl">
        <Reveal index={0} total={4}>
          <p className="type-body-lg measure text-[var(--secondary)]">{t.contact.lead}</p>
        </Reveal>

        {/* The primary action. Sized as a heading rather than a control, so it
            reads as an invitation instead of a button to be evaluated.

            Copy sits beside the mailto rather than inside it — a button nested
            in an anchor is invalid markup, and plenty of people paste the
            address into a webmail client instead of opening a mail app. */}
        <Reveal index={1} total={4}>
          <div className="contact-email">
            <a
              ref={emailRef}
              href={`mailto:${CONTACT_EMAIL}`}
              className="contact-email__link magnetic"
              aria-label={interpolate(t.contact.emailAria, { email: CONTACT_EMAIL })}
            >
              <span className="contact-email__address">{CONTACT_EMAIL}</span>
              <ArrowUpRight size={22} aria-hidden="true" className="contact-email__icon" />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className={`contact-email__copy ${copied ? 'is-copied' : ''}`}
              // The only label there is, now that the text is gone.
              aria-label={copied ? t.contact.copied : t.contact.copyAria}
              title={copied ? t.contact.copied : t.contact.copy}
            >
              {/* Icon only, in both directions. A text label had to change width
                  between "Copy" and "Copied" — and again per locale — which is
                  what pushed the button onto its own line. The state lives in
                  the glyph and the accessible name instead. */}
              {copied ? (
                <Check size={16} aria-hidden="true" className="contact-email__copy-icon" />
              ) : (
                <Copy size={16} aria-hidden="true" className="contact-email__copy-icon" />
              )}
            </button>
            {/* With no visible label, the confirmation would be silent for
                screen reader users; this announces it without showing anything. */}
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? t.contact.copied : ''}
            </span>
          </div>
        </Reveal>

        <Reveal index={2} total={4}>
          <ul className="contact-meta">
            {links.map((link, i) => (
              <li key={link.key} style={{ '--meta-index': i } as React.CSSProperties}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-meta__link"
                  aria-label={link.aria}
                >
                  <span className="contact-meta__label type-meta">{link.label}</span>
                  <span className="contact-meta__value">
                    {link.value}
                    <ArrowUpRight size={13} aria-hidden="true" className="contact-meta__icon" />
                  </span>
                </a>
              </li>
            ))}
            <li style={{ '--meta-index': links.length } as React.CSSProperties}>
              <div className="contact-meta__static">
                <span className="contact-meta__label type-meta">{t.contact.location}</span>
                <span className="contact-meta__value">{t.contact.locationValue}</span>
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal index={3} total={4}>
          <p className="contact-languages type-meta text-[var(--secondary)]/50">
            {t.contact.languages}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
