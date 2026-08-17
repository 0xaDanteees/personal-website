import { SectionTitle } from '../atoms/SectionTitle'
import { useReversibleReveal } from '../hooks/useReversibleReveal'
import { useI18n } from '../../i18n/useI18n'

/**
 * Titles and descriptions live in the dictionaries; periods and tech names stay
 * here since they read identically in all three languages.
 */
const projects = [
  { key: 'foundry', period: '2026 — {present}', tech: ['Node.js', 'pg-boss', 'Neo4j', 'PostgreSQL', 'Agentic Workflows', 'GCP'] },
  { key: 'companion', period: '2025', tech: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Sentry', 'Vercel', 'Docker'] },
  { key: 'poleana', period: '2026', tech: ['React', 'TypeScript', 'Atomic Design', 'WebSockets', 'Google Analytics', 'AdSense'] },
  { key: 'voice', period: '2026', tech: ['OpenAI', 'Vapi', 'Python', 'FastAPI'] },
  { key: 'defi', period: '2024 — 2025', tech: ['TypeScript', 'Next.js', 'ethers.js', 'WebSockets', 'BitQuery', 'GraphQL', 'SIWE'] },
  { key: 'legalAudit', period: '2024 — 2025', tech: ['Django', 'PostgreSQL', 'pgvector', 'React', 'Azure', 'CentOS'] },
  { key: 'ascmPipelines', period: '2025', tech: ['Python', 'PostgreSQL', 'RAG', 'React'] },
  { key: 'tradingBots', period: '2020 — 2023', tech: ['Python', 'Web3.py', 'Pandas', 'NumPy', 'Solidity'] },
] as const

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
  const { t } = useI18n()
  const copy = t.projects.items[project.key]
  const period = project.period.replace('{present}', t.experience.present)

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
          {copy.title}
        </h3>
        {period && (
          <span className="project-entry__period type-meta text-[var(--secondary)]/50 whitespace-nowrap">
            {period}
          </span>
        )}
      </div>

      <p className="project-entry__description type-body measure text-[var(--secondary)] mt-2">
        {copy.description}
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
  const { t } = useI18n()

  return (
    <section id="projects" className="px-5 md:px-8">
      <SectionTitle>{t.projects.title}</SectionTitle>
      <div className="max-w-3xl project-list">
        {projects.map((project, idx) => (
          <ProjectEntry
            key={project.key}
            project={project}
            index={idx}
            total={projects.length}
          />
        ))}
      </div>
    </section>
  )
}
