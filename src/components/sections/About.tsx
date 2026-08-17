import { SectionTitle } from '../atoms/SectionTitle'
import { Reveal } from '../atoms/Reveal'
import { useI18n } from '../../i18n/useI18n'

/**
 * Dictionary copy marks emphasised terms with <k>…</k>. Splitting on those here
 * keeps the translations as plain strings — no markup in JSON, and no
 * dangerouslySetInnerHTML.
 */
function Highlighted({ text }: { text: string }) {
  return (
    <>
      {text.split(/<k>|<\/k>/).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-[var(--primary)] font-medium">{part}</span>
        ) : (
          part
        )
      )}
    </>
  )
}

export default function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="px-5 md:px-8 py-20">
      <SectionTitle>{t.about.title}</SectionTitle>
      <div className="measure space-y-6">
        <Reveal index={0} total={2}>
          <p className="type-body-lg text-[var(--text)]">{t.about.lead}</p>
        </Reveal>
        <Reveal index={1} total={2}>
          <p className="type-body text-[var(--secondary)]/80">
            <Highlighted text={t.about.body} />
          </p>
        </Reveal>
      </div>
    </section>
  )
}
