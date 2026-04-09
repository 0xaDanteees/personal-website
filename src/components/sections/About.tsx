import { SectionTitle } from '../atoms/SectionTitle'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

export default function About() {
  const sectionRef = useRevealOnScroll<HTMLElement>()

  return (
    <section id="about" ref={sectionRef} className="px-5 md:px-8 py-20">
      <SectionTitle>About Me</SectionTitle>
      <div className="max-w-2xl space-y-6">
        <p className="text-lg md:text-xl text-[var(--text)] leading-relaxed reveal">
          I build scalable web applications with a focus on performance and user experience.
        </p>
        <p className="text-base text-[var(--secondary)]/80 leading-relaxed reveal">
          Career spans <span className="text-[var(--primary)] font-medium">crypto infrastructure</span>, <span className="text-[var(--primary)] font-medium">IoT</span>, <span className="text-[var(--primary)] font-medium">ETL pipelines</span>, web scraping, and <span className="text-[var(--primary)] font-medium">AI agents</span> for compliance and legal workflows. Contributed as frontend lead on a DeFi trading platform and currently driving backend architecture and infrastructure decisions on a Real Estate tokenization (RWA) platform.
        </p>
      </div>
    </section>
  )
}