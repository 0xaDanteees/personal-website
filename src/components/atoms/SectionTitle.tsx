import { Reveal } from './Reveal'

type Props = {
  children: React.ReactNode
  className?: string
}

export function SectionTitle({ children, className = '' }: Props) {
  return (
    <Reveal className={`mb-8 ${className}`}>
      <h2 className="text-3xl font-bold text-[var(--text)]">
        {children}
      </h2>
    </Reveal>
  )
}
