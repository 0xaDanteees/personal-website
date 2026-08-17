import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false }: Props) {
  return (
    <div
      className={clsx(
        'relative p-6 rounded-xl',
        'border border-[var(--text)]/10 bg-[var(--surface)]',
        'transition-[background-color,border-color] duration-300 ease-out',
        hover && 'group hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/5',
        className
      )}
    >
      {children}
    </div>
  )
}
