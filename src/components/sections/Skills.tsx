import { useEffect, useRef, useState } from 'react'
import { SectionTitle } from '../atoms/SectionTitle'
import { Tag } from '../atoms/Tag'
import { useI18n } from '../../i18n/useI18n'

/**
 * Ordered as a system gets built, from the ground up: infrastructure, then the
 * data it holds, the services on top, the intelligence layered onto those, and
 * finally the interface. Reading top to bottom tells that story, which is what
 * a flat grid of eight cards could not do.
 *
 * Every entry appears exactly once — a tool repeated across categories reads as
 * padding and costs the list its credibility.
 *
 * Only titles and captions are translated; product names read the same in every
 * language, which is how engineers actually scan them.
 */
const stackLayers = [
  {
    key: 'infrastructure',
    skills: ['AWS', 'Terraform', 'GCP', 'Azure', 'Docker', 'CentOS / Httpd', 'Vercel'],
  },
  {
    key: 'data',
    skills: ['PostgreSQL', 'Neo4j', 'Redis', 'pgvector', 'SQLAlchemy'],
  },
  {
    key: 'backend',
    skills: ['Python', 'FastAPI', 'Django', 'Node.js / Express', 'GraphQL', 'WebSockets', 'SSE'],
  },
  {
    key: 'queues',
    skills: ['BullMQ', 'RabbitMQ', 'Celery', 'pg-boss', 'ETL', 'Selenium', 'Playwright'],
  },
  {
    key: 'ai',
    skills: ['RAG', 'Agentic Workflows', 'Semantic Search', 'Claude', 'OpenAI', 'Azure Document Intelligence', 'OCR'],
  },
  {
    key: 'interface',
    skills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Atomic Design'],
  },
  {
    key: 'web3',
    skills: ['Solidity', 'ethers.js', 'SIWE', 'EVM / Ethereum', 'MetaMask', 'BitQuery', 'KYC / KYB', 'ACH'],
  },
  {
    key: 'observability',
    skills: ['Sentry', 'CloudWatch', 'Pytest', 'Jest', 'Google Analytics', 'AdSense', 'Adsterra'],
  },
] as const

type LayerProps = {
  layer: (typeof stackLayers)[number]
  index: number
}

/**
 * Each layer settles into place on its own: the rule draws itself left to right,
 * the label rises, and the tags land one after another. Sequencing them — rather
 * than fading the whole row in at once — is what makes the section read as a
 * stack being assembled while you scroll.
 */
function StackLayer({ layer, index }: LayerProps) {
  const { t } = useI18n()
  const copy = t.skills.layers[layer.key]
  const ref = useRef<HTMLDivElement>(null)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSettled(true)
      return
    }

    // Kept connected so the layer packs itself away on the way back up, in the
    // reverse order it was assembled.
    const observer = new IntersectionObserver(
      ([entry]) => setSettled(entry.isIntersecting),
      { threshold: 0.25, rootMargin: '0px 0px -80px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`stack-layer ${settled ? 'is-settled' : ''}`}
      style={{
        '--layer-index': index,
        '--tag-count': layer.skills.length,
      } as React.CSSProperties}
    >
      <div className="grid grid-cols-1 md:grid-cols-[13rem_1fr] gap-x-8 gap-y-3 py-6">
        <div className="stack-layer__label">
          <h3 className="type-h3 text-[var(--text)]">{copy.title}</h3>
          <p className="stack-layer__caption type-meta text-[var(--secondary)]/50 mt-0.5">
            {copy.caption}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 content-start">
          {layer.skills.map((skill, i) => (
            <span
              key={skill}
              className="stack-layer__tag"
              style={{ '--tag-index': i } as React.CSSProperties}
            >
              <Tag>{skill}</Tag>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useI18n()

  return (
    <section id="skills" className="px-5 md:px-8">
      <SectionTitle>{t.skills.title}</SectionTitle>

      {/* Dimming the siblings on hover isolates the row being read, so the
          section stays scannable even once every layer has settled. */}
      <div className="max-w-4xl stack-layers">
        {stackLayers.map((layer, idx) => (
          <StackLayer key={layer.key} layer={layer} index={idx} />
        ))}
      </div>
    </section>
  )
}
