// src/components/sections/Experience.tsx
import { SectionTitle } from '../atoms/SectionTitle'

const experiences = [
  { company: 'Rubidex', role: 'Frontend Developer', period: 'Present' },
  { company: 'ASCM (CDMX Government)', role: 'Fullstack Developer', period: '2024-2025' },
  { company: 'Stealth Startup DeFi', role: 'Lead Frontend', period: '2023-2024' },
  { company: 'Freelance', role: 'Fullstack Developer', period: '2022-2023' },
  { company: 'Crypto background', role: 'Having fun', period: '2020-2022' }
]

export default function Experience() {
  return (
    <section id="experience" className="px-5 md:px-8 py-20">
      <SectionTitle>Experience</SectionTitle>
      <div className="max-w-2xl space-y-6">
        {experiences.map((exp, idx) => (
          <div key={idx} className="group">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                {exp.role}
              </h3>
              <span className="text-sm text-[var(--secondary)]/60">{exp.period}</span>
            </div>
            <p className="text-sm text-[var(--secondary)]/80 mt-1">{exp.company}</p>
          </div>
        ))}
      </div>
    </section>
  )
}