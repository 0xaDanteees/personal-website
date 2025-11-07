type Props = {
  children: React.ReactNode
  variant?: 'default' | 'primary'
}

export function Tag({ children, variant = 'default' }: Props) {
  const variants = {
    default: 'px-3 py-1 text-sm rounded-md bg-[var(--surface)] text-[var(--secondary)] border border-[var(--text)]/10 dark:bg-[var(--bg)] dark:border-white/5',
    primary: 'px-2 py-1 text-xs rounded bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30 dark:border-[var(--primary)]/20'
  }

  return (
    <span className={variants[variant]}>
      {children}
    </span>
  )
}