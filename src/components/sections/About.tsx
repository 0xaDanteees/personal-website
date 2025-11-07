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
          Specialized in <span className="text-[var(--primary)] font-medium">React</span>, <span className="text-[var(--primary)] font-medium">Django</span>, and <span className="text-[var(--primary)] font-medium">Web3</span> technologies. 
          Experience with real-time data systems, AI agents, and DeFi platforms.
        </p>
      </div>
    </section>
  )
}