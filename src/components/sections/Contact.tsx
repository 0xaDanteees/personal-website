import { Mail, Github, Linkedin, MapPin } from 'lucide-react'
import { SectionTitle } from '../atoms/SectionTitle'
import { Card } from '../atoms/Card'
import { IconBadge } from '../atoms/IconBadge'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

export default function Contact() {
  const sectionRef = useRevealOnScroll<HTMLElement>()

  return (
    <section id="contact" ref={sectionRef} className="px-5 md:px-8">
      <SectionTitle>Contact</SectionTitle>
      <div className="max-w-3xl space-y-6">
        <p className="text-[var(--secondary)] text-lg reveal">
          Available for freelance projects, collaborations, and full-time opportunities.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="mailto:adros.dev17@gmail.com" className="reveal">
            <Card hover className="flex items-center gap-3">
              <IconBadge icon={Mail} size={20} />
              <div>
                <p className="text-sm text-[var(--secondary)]">Email</p>
                <p className="text-[var(--text)] font-medium group-hover:text-[var(--primary)] transition-colors">
                  Send message
                </p>
              </div>
            </Card>
          </a>

          <a href="https://github.com/0xaDanteees" target="_blank" rel="noreferrer" className="reveal">
            <Card hover className="flex items-center gap-3">
              <IconBadge icon={Github} size={20} />
              <div>
                <p className="text-sm text-[var(--secondary)]">GitHub</p>
                <p className="text-[var(--text)] font-medium group-hover:text-[var(--primary)] transition-colors">
                  @0xaDanteees
                </p>
              </div>
            </Card>
          </a>

          <a href="https://www.linkedin.com/in/daniel-r-ortega/" target="_blank" rel="noreferrer" className="reveal">
            <Card hover className="flex items-center gap-3">
              <IconBadge icon={Linkedin} size={20} />
              <div>
                <p className="text-sm text-[var(--secondary)]">LinkedIn</p>
                <p className="text-[var(--text)] font-medium group-hover:text-[var(--primary)] transition-colors">
                  Daniel Ortega
                </p>
              </div>
            </Card>
          </a>

          <div className="reveal">
            <Card className="flex items-center gap-3">
              <IconBadge icon={MapPin} size={20} />
              <div>
                <p className="text-sm text-[var(--secondary)]">Location</p>
                <p className="text-[var(--text)] font-medium">CDMX, México</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
