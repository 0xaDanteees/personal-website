import clsx from 'clsx'
import { useReversibleReveal } from '../hooks/useReversibleReveal'

type Props = {
  children: React.ReactNode
  className?: string
  /** Position within the group; drives entry order and reverses it on exit. */
  index?: number
  /** Total siblings in the group, so the exit can unwind back to front. */
  total?: number
  /** Per-step stagger in ms. */
  step?: number
  as?: 'div' | 'section' | 'li' | 'article'
}

/**
 * Reveals on entry and un-reveals on exit. Scrolling back up plays the motion in
 * reverse rather than snapping content away, so a section reads as being packed
 * up in the order it was laid out.
 */
export function Reveal({
  children,
  className,
  index = 0,
  total = 1,
  step = 70,
  as: Tag = 'div',
}: Props) {
  const { ref, state, delay } = useReversibleReveal<HTMLElement>({ index, total, step })

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={clsx('reveal-item', state === 'visible' && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
