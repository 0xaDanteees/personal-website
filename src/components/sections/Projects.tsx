import { SectionTitle } from '../atoms/SectionTitle'
import { useReversibleReveal } from '../hooks/useReversibleReveal'

const projects = [
  {
    title: 'Foundry AI for Drug Development',
    period: '2026',
    description: 'Agentic workflows with log auditing over clinical data. Insights for preclinical research powered by pg-boss queues orchestrate distributed scraping jobs, and a Neo4j knowledge graph backs relationship queries across sources.',
    tech: ['Node.js', 'pg-boss', 'Neo4j', 'PostgreSQL', 'Agentic Workflows', 'GCP'],
  },
  {
    title: 'Agentic Companion Platform',
    period: '2025',
    description: 'FastAPI microservices system with API gateway, SQLAlchemy + PostgreSQL, Vercel deployment, and integrated chat & voice AI with streaming.',
    tech: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Sentry', 'Vercel', 'Docker'],
  },
  {
    title: 'PoleanaMX',
    period: '2026',
    description: 'Took over an existing frontend and refactored it onto Atomic Design principles, cut WebSocket consumption overhead, and integrated Google Analytics, AdSense and Adsterra.',
    tech: ['React', 'TypeScript', 'Atomic Design', 'WebSockets', 'Google Analytics', 'AdSense', 'Adsterra'],
  },
  {
    title: 'Agentic Voice Assistant',
    period: '2026',
    description: 'Agentic voice assistant for a US restaurant chain capable of taking orders and advertising new menus, built with OpenAI and Vapi.',
    tech: ['OpenAI', 'Vapi', 'Python', 'FastAPI'],
  },
  {
    title: 'DeFi Trading Platform',
    period: '2024 — 2025',
    description: 'Decentralized trading platform with real-time market data, SIWE + JWT authentication, BitQuery integration, and high-performance Go WebSocket proxy.',
    tech: ['TypeScript', 'Next.js', 'ethers.js', 'WebSockets', 'BitQuery', 'GraphQL', 'SIWE'],
  },
  {
    title: 'AI Agents & ETL for Legal Audit',
    period: '2024 — 2025',
    description: 'AI-driven ETL pipelines and RAG systems for legal audit workflows achieving 82% reduction in processing times and 96% OCR accuracy.',
    tech: ['Django', 'PostgreSQL', 'pgvector', 'React', 'Azure', 'CentOS'],
  },
  {
    title: 'ASCM Data Pipelines',
    period: '2025',
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

/**
 * Title, then description, then the stack as a real list. Sequenced the same way
 * a project gets explained out loud: what it is, what it does, what it runs on.
 *
 * Deliberately not a carousel — slides hide most of the content behind an
 * interaction, which costs both crawlability and scannability. Everything here
 * stays in the document at full width.
 */
function ProjectEntry({ project, index, total }: {
  project: (typeof projects)[number]
  index: number
  total: number
}) {
  const { ref, state, delay } = useReversibleReveal<HTMLElement>({
    index,
    total,
    step: 60,
    threshold: 0.12,
  })

  return (
    <article
      ref={ref as React.Ref<HTMLElement>}
      className={`project-entry ${state === 'visible' ? 'is-visible' : ''}`}
      style={{
        transitionDelay: `${delay}ms`,
        '--tech-count': project.tech.length,
      } as React.CSSProperties}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-8 items-baseline">
        <h3 className="project-entry__title type-h3 text-[var(--text)]">
          {project.title}
        </h3>
        {project.period && (
          <span className="project-entry__period type-meta text-[var(--secondary)]/50 whitespace-nowrap">
            {project.period}
          </span>
        )}
      </div>

      <p className="project-entry__description type-body measure text-[var(--secondary)] mt-2">
        {project.description}
      </p>

      <ul className="project-entry__stack mt-4">
        {project.tech.map((tech, i) => (
          <li
            key={tech}
            className="project-entry__tech type-meta"
            style={{ '--tech-index': i } as React.CSSProperties}
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="px-5 md:px-8">
      <SectionTitle>Featured Projects</SectionTitle>
      <div className="max-w-3xl project-list">
        {projects.map((project, idx) => (
          <ProjectEntry
            key={project.title}
            project={project}
            index={idx}
            total={projects.length}
          />
        ))}
      </div>
    </section>
  )
}
