import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  className?: string
  /** Stagger offset in ms, for siblings revealed as a group. */
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article'
}

/**
 * Reveals its children the first time they enter the viewport. Replaces the
 * mount-time `section-transition` animation, which fired before the user had
 * scrolled anywhere near the section — so the reveal was never actually seen.
 */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={clsx('reveal-item', shown && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
