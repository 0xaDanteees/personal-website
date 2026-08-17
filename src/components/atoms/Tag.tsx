type Props = {
  children: React.ReactNode
  variant?: 'default' | 'primary'
}

export function Tag({ children, variant = 'default' }: Props) {
  // Mono here is doing work, not decoration: tech names are identifiers, and the
  // even rhythm makes a wrapped cluster of them scan as a list.
  const variants = {
    default: 'px-3 py-1 type-meta rounded-md bg-[var(--surface)] text-[var(--secondary)] border border-[var(--text)]/10',
    primary: 'px-2 py-1 type-meta text-[0.8125rem] rounded bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30'
  }

  return (
    <span className={variants[variant]}>
      {children}
    </span>
  )
}