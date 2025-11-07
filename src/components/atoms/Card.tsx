import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  className?: string
  hover?: boolean
  accent?: boolean
}

export function Card({ children, className, hover = false, accent = true }: Props) {
  return (
    <div
      className={clsx(
        'relative p-6 rounded-lg transition-all',
        'border border-[var(--text)]/10',
        'bg-[var(--surface)]',
        'dark:border-white/10',
        hover && 'hover:border-[var(--primary)] hover:shadow-lg group',
        className
      )}
    >
      {accent && (
        <div className={clsx(
          'absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)] rounded-l-lg',
          hover && 'group-hover:w-1.5 transition-all'
        )} />
      )}
      {children}
    </div>
  )
}