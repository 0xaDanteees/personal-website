type Props = {
  children: React.ReactNode
  className?: string
}

export function SectionTitle({ children, className = '' }: Props) {
  return (
    <h2 className={`text-3xl font-bold mb-8 text-[var(--text)] ${className}`}>
      {children}
    </h2>
  )
}
