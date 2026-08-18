import { SectionTitle } from '../atoms/SectionTitle'
import { useReversibleReveal } from '../hooks/useReversibleReveal'
import { useI18n } from '../../i18n/useI18n'

function FaqItem({ q, a, index, total }: {
  q: string
  a: string
  index: number
  total: number
}) {
  const { ref, state, delay } = useReversibleReveal<HTMLDetailsElement>({
    index,
    total,
    step: 50,
    threshold: 0.1,
  })

  return (
    <details
      ref={ref}
      className={`faq-item ${state === 'visible' ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <summary className="faq-item__q type-body">{q}</summary>
      <p className="faq-item__a type-body measure">{a}</p>
    </details>
  )
}

export default function Faq() {
  const { t } = useI18n()

  return (
    <section id="faq" className="px-5 md:px-8">
      <SectionTitle>{t.faq_title}</SectionTitle>
      <div className="max-w-3xl">
        {t.faq.map((item, i) => (
          <FaqItem
            key={item.q}
            q={item.q}
            a={item.a}
            index={i}
            total={t.faq.length}
          />
        ))}
      </div>
    </section>
  )
}
