import { SectionTitle } from '../atoms/SectionTitle'
import { Reveal } from '../atoms/Reveal'

export default function About() {
  return (
    <section id="about" className="px-5 md:px-8 py-20">
      <SectionTitle>About Me</SectionTitle>
      <div className="measure space-y-6">
        <Reveal index={0} total={2}>
          <p className="type-body-lg text-[var(--text)]">
            I build scalable web applications with a focus on performance and user experience.
          </p>
        </Reveal>
        <Reveal index={1} total={2}>
          <p className="type-body text-[var(--secondary)]/80">
            Career spans <span className="text-[var(--primary)] font-medium">crypto infrastructure</span>, <span className="text-[var(--primary)] font-medium">IoT</span>, <span className="text-[var(--primary)] font-medium">ETL pipelines</span>, web scraping, and <span className="text-[var(--primary)] font-medium">AI agents</span> for compliance and legal workflows. Contributed as frontend lead on a DeFi trading platform and currently driving backend architecture and infrastructure decisions on a Real Estate tokenization (RWA) platform.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
