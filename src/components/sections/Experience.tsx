import { ExternalLink } from 'lucide-react'
import { SectionTitle } from '../atoms/SectionTitle'
import { useReversibleReveal } from '../hooks/useReversibleReveal'
import { useI18n } from '../../i18n/useI18n'
import { interpolate } from '../../i18n/interpolate'
import { CERTIFICATIONS } from '../../config/constants'

/**
 * Roles are keyed rather than inlined: the copy lives in the dictionaries so all
 * three languages stay in sync, while periods and structure stay here.
 */
const experiences = [
  { key: 'rubidex', period: '2025 — {present}' },
  { key: 'walletInsight', period: '2024 — 2025' },
  { key: 'ascm', period: '2024 — 2025' },
  { key: 'freelance', period: '2023 — 2024' },
  { key: 'crypto', period: '2020 — 2023' },
] as const

/**
 * On the way in: the heading arrives, then its bullets unfold beneath it.
 * On the way back up the order inverts — bullets collapse first, and only once
 * the role is empty does the whole entry slide off to the left. The record
 * closes itself before it is filed away.
 */
function ExperienceEntry({ exp, index, total }: {
  exp: (typeof experiences)[number]
  index: number
  total: number
}) {
  const { t } = useI18n()
  const copy = t.experience.roles[exp.key]
  // "Present" is the only translated fragment inside an otherwise numeric range.
  const period = exp.period.replace('{present}', t.experience.present)

  const { ref, state, delay } = useReversibleReveal<HTMLDivElement>({
    index,
    total,
    step: 60,
    threshold: 0.1,
  })

  return (
    <div
      ref={ref}
      className={`experience-entry group ${state === 'visible' ? 'is-visible' : ''}`}
      style={{
        transitionDelay: `${delay}ms`,
        '--bullet-count': copy.bullets.length,
      } as React.CSSProperties}
    >
      <div className="experience-entry__head">
        <div className="flex justify-between items-baseline flex-wrap gap-1">
          <h3 className="type-h3 text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
            {copy.role}
          </h3>
          <span className="type-meta text-[var(--secondary)]/60">{period}</span>
        </div>
        <p className="type-meta text-[var(--primary)]/80 mt-0.5 mb-3">{copy.company}</p>
      </div>
      <ul className="space-y-1.5">
        {copy.bullets.map((b: string, i: number) => (
          <li
            key={i}
            className="experience-entry__bullet type-body text-[var(--secondary)]/70 pl-3 border-l border-[var(--primary)]/20"
            style={{ '--bullet-index': i } as React.CSSProperties}
          >
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Certifications() {
  const { t } = useI18n()
  const { ref, state, delay } = useReversibleReveal<HTMLDivElement>({
    threshold: 0.2,
  })

  return (
    <div
      ref={ref}
      className={`certifications ${state === 'visible' ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="certifications__label type-meta text-[var(--secondary)]/50">
        {t.experience.certifications}
      </h3>
      <ul className="certifications__list">
        {CERTIFICATIONS.map((cert) => (
          <li key={cert.credentialId} className="certifications__item">
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="certifications__link"
              aria-label={interpolate(t.experience.credentialAria, {
                name: cert.name,
                issuer: cert.issuer,
                year: cert.year,
              })}
            >
              <span className="type-body text-[var(--text)]">{cert.name}</span>
              <ExternalLink size={13} aria-hidden="true" className="certifications__icon" />
            </a>
            <p className="type-meta text-[var(--secondary)]/60">
              {cert.issuer} · {cert.year}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Experience() {
  const { t } = useI18n()

  return (
    <section id="experience" className="px-5 md:px-8 py-20">
      <SectionTitle>{t.experience.title}</SectionTitle>
      <div className="max-w-2xl space-y-10">
        {experiences.map((exp, idx) => (
          <ExperienceEntry
            key={exp.key}
            exp={exp}
            index={idx}
            total={experiences.length}
          />
        ))}
        <Certifications />
      </div>
    </section>
  )
}