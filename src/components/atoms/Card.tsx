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
        'card-panel relative p-6 rounded-xl',
        hover && 'card-panel--interactive group',
        className
      )}
    >
      {children}
    </div>
  )
}
