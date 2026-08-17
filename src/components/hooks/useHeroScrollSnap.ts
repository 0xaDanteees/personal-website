import { useEffect } from 'react'

type HeroScrollSnapConfig = {
  enabled: boolean
  onSnapStart: () => void
}

export function useHeroScrollSnap({ enabled, onSnapStart }: HeroScrollSnapConfig) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let consumed = false

    const trigger = () => {
      if (consumed) return
      consumed = true
      onSnapStart()
    }

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0) return
      // Must be non-passive for this to hold the page still.
      e.preventDefault()
      trigger()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return
      if (['ArrowDown', 'PageDown', 'Space', ' '].includes(e.key)) {
        e.preventDefault()
        trigger()
      }
    }

    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0]?.clientY ?? 0
      // Finger moving up = content scrolling down.
      if (touchStartY - currentY > 8) {
        e.preventDefault()
        trigger()
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [enabled, onSnapStart])
}
