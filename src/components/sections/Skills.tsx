import { Code2, Database, Cloud, Blocks } from 'lucide-react'
import { SectionTitle } from '../atoms/SectionTitle'
import { Card } from '../atoms/Card'
import { IconBadge } from '../atoms/IconBadge'
import { Tag } from '../atoms/Tag'

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'WebSockets', 'Vite']
  },
  {
    title: 'Backend',
    icon: Database,
    skills: ['Django', 'FastAPI', 'Node.js', 'PostgreSQL', 'pgvector']
  },
  {
    title: 'Web3 & DeFi',
    icon: Blocks,
    skills: ['Thirdweb', 'ethers.js', 'Hardhat', 'SIWE', 'Solidity', 'BitQuery']
  },
  {
    title: 'Tools',
    icon: Cloud,
    skills: ['Docker', 'Azure', 'AWS', 'CentOS', 'Git', 'JWT/MFA']
  }
]

export default function Skills() {
  return (
    <section id="skills" className="px-5 md:px-8">
      <SectionTitle>Tech Stack</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {skillCategories.map((category, idx) => (
          <Card key={idx} hover>
            <div className="flex items-center gap-3 mb-4">
              <IconBadge icon={category.icon} />
              <h3 className="text-xl font-semibold text-[var(--text)]">{category.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <Tag key={i}>{skill}</Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
