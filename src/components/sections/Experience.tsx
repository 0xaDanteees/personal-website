import { SectionTitle } from '../atoms/SectionTitle'

const experiences = [
  {
    company: 'Rubidex',
    role: 'Fullstack Software Developer',
    period: 'Feb 2025 — Present',
    bullets: [
      'Architected secure, compliant backend and cloud infrastructure for a Real Estate & Crypto investment ecosystem.',
      'Designed banking integration for RWA system meeting US compliance requirements.',
      'Architected KYC/KYB solutions for US and CA users.',
      'Designed database and AWS infrastructure for high reliability and scalability.',
      'Implemented RBAC-based frontend architecture and mitigated all documented security vulnerabilities.',
      'Managed WebSocket system for high-reliability IoT device communication.',
    ],
  },
  {
    company: 'ASCM',
    role: 'Fullstack Developer',
    period: 'May 2024 — Feb 2025',
    bullets: [
      'Migrated legacy enterprise payroll system for a legal Mexican entity.',
      'Architected AI agents with semantic search and conversational capabilities using PostgreSQL pgvector.',
      'Fine-tuned OCR and Azure AI models for data extraction achieving 96% accuracy.',
      'Designed AI-driven ETL pipelines achieving 82% reduction in processing times.',
      'Managed and configured CentOS 9 Stream servers for seamless legacy integration.',
    ],
  },
  {
    company: 'Wallet Insight — Remote contractor',
    role: 'Lead Frontend Developer',
    period: 'Jun 2024 — Mar 2025',
    bullets: [
      'Architected and executed full frontend refactor from pages/app mix to Next.js App Router.',
      'Designed and implemented core trading features with real-time GraphQL data visualization.',
      'Integrated WebSocket connections for live market data with a high-performance Go proxy.',
      'Built SIWE + JWT authentication for a DeFi trading volume-aggregator platform.',
      'Part of the founding team before pre-seed at $2.5M valuation.',
    ],
  },
  {
    company: 'Independent',
    role: 'Freelance Developer',
    period: 'Mar 2023 — Jun 2024',
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
    period: 'May 2020 — Mar 2023',
    bullets: [
      'Core team member of an ERC20 token-making agency; developed Solidity contracts.',
      'Built automated wallet tracking scripts and ETL pipelines for crypto market analysis.',
      'Developed algorithmic trading systems with real-time order execution and risk management frameworks.',
      'Integrated third-party APIs (FTX, Bybit) and conducted statistical analysis for non-directional strategies.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="px-5 md:px-8 py-20">
      <SectionTitle>Experience</SectionTitle>
      <div className="max-w-2xl space-y-10">
        {experiences.map((exp, idx) => (
          <div key={idx} className="group">
            <div className="flex justify-between items-baseline flex-wrap gap-1">
              <h3 className="text-lg font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                {exp.role}
              </h3>
              <span className="text-sm text-[var(--secondary)]/60">{exp.period}</span>
            </div>
            <p className="text-sm text-[var(--primary)]/80 mt-0.5 mb-2">{exp.company}</p>
            <ul className="space-y-1">
              {exp.bullets.map((b, i) => (
                <li key={i} className="text-sm text-[var(--secondary)]/70 leading-relaxed pl-3 border-l border-[var(--primary)]/20">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}