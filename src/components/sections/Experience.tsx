import { SectionTitle } from '../atoms/SectionTitle'
import { useReversibleReveal } from '../hooks/useReversibleReveal'

const experiences = [
  {
    company: 'Rubidex',
    role: 'Fullstack Software Developer',
    period: '2025 — Present',
    bullets: [
      'Architected secure, compliant backend and cloud infrastructure for a Real Estate & Crypto investment ecosystem.',
      'Designed banking integration for RWA system meeting US compliance requirements.',
      'Architected KYC/KYB solutions for US and CA users.',
      'Designed database and AWS infrastructure with Terraform for high reliability and scalability.',
      'Implemented RBAC-based frontend architecture and mitigated all documented security vulnerabilities.',
      'Managed WebSocket system for high-reliability IoT device communication.',
    ],
  },
  {
    company: 'Wallet Insight — Remote contractor',
    role: 'Lead Frontend Developer',
    period: '2024 — 2025',
    bullets: [
      'Architected and executed full frontend refactor from pages/app mix to Next.js App Router.',
      'Designed and implemented core trading features with real-time GraphQL data visualization.',
      'Integrated WebSocket connections for live market data with a high-performance Go proxy.',
      'Built SIWE + JWT authentication for a DeFi trading volume-aggregator platform.',
      'Part of the founding team before pre-seed at $2.5M valuation.',
    ],
  },
  {
    company: 'ASCM',
    role: 'Fullstack Developer',
    period: '2024 — 2025',
    bullets: [
      'Migrated legacy enterprise payroll system for a legal Mexican entity.',
      'Architected AI agents with semantic search and conversational capabilities using PostgreSQL pgvector.',
      'Fine-tuned OCR and Azure AI models for data extraction achieving 96% accuracy.',
      'Designed AI-driven ETL pipelines achieving 82% reduction in processing times.',
      'Managed and configured CentOS 9 Stream servers for seamless legacy integration.',
    ],
  },
  {
    company: 'Independent',
    role: 'Freelance Developer',
    period: '2023 — 2024',
    bullets: [
      'Developed backend infrastructure with Django and responsive frontends with React.',
      'Integrated AWS S3 and SES for lead collection.',
      'Crafted data mining scripts in Python for heavy machinery, insurance, and crypto industries.',
      'Built custom datasets for private clients.',
    ],
  },
  {
    company: 'Independent',
    role: 'Crypto & Blockchain',
    period: '2020 — 2023',
    bullets: [
      'Core team member of an ERC20 token-making agency; developed Solidity contracts.',
      'Built automated wallet tracking scripts and ETL pipelines for crypto market analysis.',
      'Developed algorithmic trading systems with real-time order execution and risk management frameworks.',
      'Integrated third-party APIs (FTX, Bybit) and conducted statistical analysis for non-directional strategies.',
    ],
  },
]

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
        '--bullet-count': exp.bullets.length,
      } as React.CSSProperties}
    >
      <div className="experience-entry__head">
        <div className="flex justify-between items-baseline flex-wrap gap-1">
          <h3 className="type-h3 text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
            {exp.role}
          </h3>
          <span className="type-meta text-[var(--secondary)]/60">{exp.period}</span>
        </div>
        <p className="type-meta text-[var(--primary)]/80 mt-0.5 mb-3">{exp.company}</p>
      </div>
      <ul className="space-y-1.5">
        {exp.bullets.map((b, i) => (
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

export default function Experience() {
  return (
    <section id="experience" className="px-5 md:px-8 py-20">
      <SectionTitle>Experience</SectionTitle>
      <div className="max-w-2xl space-y-10">
        {experiences.map((exp, idx) => (
          <ExperienceEntry
            key={exp.company + exp.period}
            exp={exp}
            index={idx}
            total={experiences.length}
          />
        ))}
      </div>
    </section>
  )
}