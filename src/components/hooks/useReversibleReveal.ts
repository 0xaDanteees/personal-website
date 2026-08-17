import { useEffect, useRef, useState } from 'react'

type ReversibleRevealConfig = {
  /** Position within the group, used to order entry and exit. */
  index?: number
  /** Total siblings, so the exit can run in reverse without extra bookkeeping. */
  total?: number
  /** Per-step stagger in ms. */
  step?: number
  threshold?: number
  rootMargin?: string
}

export type RevealState = 'hidden' | 'visible'

/**
 * Reveals on entry and un-reveals on exit, with the stagger reversed on the way
 * out: the last thing to arrive is the first to leave. That symmetry is what
 * makes scrolling back up feel like the same motion played backwards, rather
 * than content blinking off.
 *
 * The observer is deliberately never disconnected — the whole point is that this
 * keeps responding as the element crosses the viewport in either direction.
 */
export function useReversibleReveal<T extends HTMLElement>({
  index = 0,
  total = 1,
  step = 70,
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
}: ReversibleRevealConfig = {}) {
  const ref = useRef<T>(null)
  const [state, setState] = useState<RevealState>('hidden')
  const [direction, setDirection] = useState<'in' | 'out'>('in')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setDirection(entry.isIntersecting ? 'in' : 'out')
        setState(entry.isIntersecting ? 'visible' : 'hidden')
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  // Entering runs front to back; leaving runs back to front, so the group
  // unwinds in the order it was built. The exit step is a fraction of the entry
  // one — and capped — because a long group leaving one item at a time outlasts
  // the scroll that triggered it and reads as lag rather than choreography.
  const delay =
    direction === 'in'
      ? index * step
      : Math.min((total - 1 - index) * (step * 0.35), 180)

  return { ref, state, direction, delay }
}
