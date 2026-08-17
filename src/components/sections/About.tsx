import { SectionTitle } from '../atoms/SectionTitle'
import { Reveal } from '../atoms/Reveal'

export default function About() {
  return (
    <section id="about" className="px-5 md:px-8 py-20">
      <SectionTitle>About Me</SectionTitle>
      <div className="max-w-2xl space-y-6">
        <Reveal delay={60}>
          <p className="text-lg md:text-xl text-[var(--text)] leading-relaxed">
            I build scalable web applications with a focus on performance and user experience.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-base text-[var(--secondary)]/80 leading-relaxed">
            Career spans <span className="text-[var(--primary)] font-medium">crypto infrastructure</span>, <span className="text-[var(--primary)] font-medium">IoT</span>, <span className="text-[var(--primary)] font-medium">ETL pipelines</span>, web scraping, and <span className="text-[var(--primary)] font-medium">AI agents</span> for compliance and legal workflows. Contributed as frontend lead on a DeFi trading platform and currently driving backend architecture and infrastructure decisions on a Real Estate tokenization (RWA) platform.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
