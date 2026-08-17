import { Mail, Github, Linkedin, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionTitle } from '../atoms/SectionTitle'
import { Card } from '../atoms/Card'
import { IconBadge } from '../atoms/IconBadge'
import { Reveal } from '../atoms/Reveal'
import { useMagnetic } from '../hooks/useMagnetic'
import { EXTERNAL_LINKS, SOCIAL_HANDLES, CONTACT_EMAIL } from '../../config/constants'

type ContactCardProps = {
  icon: LucideIcon
  label: string
  value: string
}

function ContactCard({ icon, label, value }: ContactCardProps) {
  return (
    <Card hover className="flex items-center gap-3 h-full">
      <IconBadge icon={icon} size={20} />
      <div>
        <p className="text-sm text-[var(--secondary)]">{label}</p>
        <p className="text-[var(--text)] font-medium group-hover:text-[var(--primary)] transition-colors">
          {value}
        </p>
      </div>
    </Card>
  )
}

type ContactLinkProps = ContactCardProps & {
  href: string
  external?: boolean
  ariaLabel: string
  delay: number
}

function ContactLink({ href, external, ariaLabel, delay, ...card }: ContactLinkProps) {
  const magneticRef = useMagnetic<HTMLAnchorElement>({ strength: 6, radius: 16 })

  return (
    <Reveal delay={delay}>
      <a
        ref={magneticRef}
        href={href}
        className="magnetic block h-full rounded-xl"
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        <ContactCard {...card} />
      </a>
    </Reveal>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="px-5 md:px-8">
      <SectionTitle>Contact</SectionTitle>
      <div className="max-w-3xl space-y-6">
        <Reveal delay={60}>
          <p className="text-[var(--secondary)] text-lg">
            Available for freelance projects, collaborations, and full-time opportunities.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ContactLink
            href={`mailto:${CONTACT_EMAIL}`}
            ariaLabel={`Send email to ${CONTACT_EMAIL}`}
            delay={120}
            icon={Mail}
            label="Email"
            value="Send message"
          />
          <ContactLink
            href={EXTERNAL_LINKS.github}
            external
            ariaLabel="Visit GitHub profile"
            delay={190}
            icon={Github}
            label="GitHub"
            value={`@${SOCIAL_HANDLES.github}`}
          />
          <ContactLink
            href={EXTERNAL_LINKS.linkedin}
            external
            ariaLabel="Visit LinkedIn profile"
            delay={260}
            icon={Linkedin}
            label="LinkedIn"
            value="Daniel Ortega"
          />
          <Reveal delay={330}>
            <ContactCard icon={MapPin} label="Location" value="CDMX, México" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
