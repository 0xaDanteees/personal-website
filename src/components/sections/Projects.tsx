import { SectionTitle } from '../atoms/SectionTitle'
import { Card } from '../atoms/Card'
import { Tag } from '../atoms/Tag'
import { Reveal } from '../atoms/Reveal'

const projects = [
  {
    title: 'Agentic Companion Platform',
    period: 'Sept 2025 — Present',
    description: 'FastAPI microservices system with API gateway, SQLAlchemy + PostgreSQL, Vercel deployment, and integrated chat & voice AI with streaming.',
    tech: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Sentry', 'Vercel', 'Docker'],
  },
  {
    title: 'Agentic Voice Assistant',
    period: 'Jan 2026 — Feb 2026',
    description: 'Agentic voice assistant for a US restaurant chain capable of taking orders and advertising new menus, built with OpenAI and Vapi.',
    tech: ['OpenAI', 'Vapi', 'Python', 'FastAPI'],
  },
  {
    title: 'DeFi Trading Platform',
    period: 'Jun 2024 — Mar 2025',
    description: 'Decentralized trading platform with real-time market data, SIWE + JWT authentication, BitQuery integration, and high-performance Go WebSocket proxy.',
    tech: ['TypeScript', 'Next.js', 'ethers.js', 'WebSockets', 'BitQuery', 'GraphQL', 'SIWE'],
  },
  {
    title: 'AI Agents & ETL for Legal Audit',
    period: 'May 2024 — Feb 2025',
    description: 'AI-driven ETL pipelines and RAG systems for legal audit workflows achieving 82% reduction in processing times and 96% OCR accuracy.',
    tech: ['Django', 'PostgreSQL', 'pgvector', 'React', 'Azure', 'CentOS'],
  },
  {
    title: 'Consulting: ASCM Data Pipelines',
    period: 'Jun 2025 — Aug 2025',
    description: 'Automated contract validation, preprocessing pipelines for public procurement, PDF annotation UI, schema optimization, and improved RAG scoring.',
    tech: ['Python', 'PostgreSQL', 'RAG', 'React'],
  },
  {
    title: 'Crypto Trading Bots & Algorithms',
    period: '2020 — 2023',
    description: 'Algorithmic trading systems with on-chain analysis, risk monitoring, Solidity contract analysis, and quantitative non-directional strategies.',
    tech: ['Python', 'Web3.py', 'Pandas', 'NumPy', 'Solidity'],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="px-5 md:px-8">
      <SectionTitle>Featured Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {projects.map((project, idx) => (
          <Reveal key={idx} delay={(idx % 2) * 70}>
            <Card hover className="h-full">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="type-h3 text-[var(--text)]">{project.title}</h3>
                  {project.period && (
                    <span className="type-meta text-[var(--secondary)]/50 whitespace-nowrap mt-1">{project.period}</span>
                  )}
                </div>
                <p className="type-body text-[var(--secondary)]">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <Tag key={i} variant="primary">{tech}</Tag>
                ))}
              </div>
            </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
