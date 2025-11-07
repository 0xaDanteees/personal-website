import { SectionTitle } from '../atoms/SectionTitle'
import { Card } from '../atoms/Card'
import { Tag } from '../atoms/Tag'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const projects = [
  {
    title: 'DeFi Trading Platform',
    description: 'Decentralized trading gamified platform with real-time market data, smart contract integration, and SIWE authentication.',
    tech: ['TypeScript', 'ethers.js', 'WebSockets', 'BitQuery', 'Graphql', 'SIWE'],
  },
  {
    title: 'ETL processes with RAG',
    description: 'ETL processes with agentic properties for legal entities.',
    tech: ['Django', 'PostgreSQL', 'pgvector', 'React', 'Azure', 'CentOs'],
  },
  {
    title: 'IoT Building Management System',
    description: 'Real-time alert system with WebSockets for IoT devices, MFA authentication, and monitoring dashboard.',
    tech: ['React', 'WebSockets', 'JWT', 'Docker'],
  },
  {
    title: 'Crypto Trading Bots & algorithms',
    description: 'Algorithmic bots for automated trading with on-chain analysis, risk monitoring, and quantitative strategies.',
    tech: ['Python', 'Web3.py', 'PyVollib', 'Pandas', 'NumPy'],
  }
]

export default function Projects() {
  const sectionRef = useRevealOnScroll<HTMLElement>()

  return (
    <section id="projects" ref={sectionRef} className="px-5 md:px-8">
      <SectionTitle>Featured Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {projects.map((project, idx) => (
          <Card key={idx} hover className="reveal">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-2">{project.title}</h3>
                <p className="text-sm text-[var(--secondary)] leading-relaxed">
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
        ))}
      </div>
    </section>
  )
}
