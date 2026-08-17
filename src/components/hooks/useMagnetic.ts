import { useEffect, useRef } from 'react'

type MagneticConfig = {
  /** Max px the element drifts toward the cursor. */
  strength?: number
  /** How far outside the element the pull starts, in px. */
  radius?: number
}

/**
 * Pulls an element gently toward the cursor while it hovers nearby, then lets it
 * spring back. The drift is small on purpose: it should register as responsiveness,
 * not as an effect.
 */
export function useMagnetic<T extends HTMLElement>({
  strength = 8,
  radius = 24,
}: MagneticConfig = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Pointer pull is meaningless without a precise pointer, and unwanted when
    // the user asked for reduced motion.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let offsetX = 0
    let offsetY = 0

    /**
     * The element's rect already includes the offset we applied, so measuring it
     * directly makes the element chase its own position: it drifts toward the
     * cursor, the gap shrinks, the vector flips, and it oscillates. Subtracting
     * the current offset recovers the untransformed centre and breaks that loop.
     */
    const restingCentre = () => {
      const rect = el.getBoundingClientRect()
      return {
        x: rect.left + rect.width / 2 - offsetX,
        y: rect.top + rect.height / 2 - offsetY,
        w: rect.width,
        h: rect.height,
      }
    }

    const apply = (x: number, y: number) => {
      offsetX = x
      offsetY = y
      // Tracking uses a short linear transition; only the return to rest gets the
      // longer eased one, so the spring-back stays but the tracking doesn't lag.
      if (x === 0 && y === 0) {
        el.dataset.magnetic = 'resting'
      } else {
        delete el.dataset.magnetic
      }
      el.style.setProperty('--magnetic-x', `${x}px`)
      el.style.setProperty('--magnetic-y', `${y}px`)
    }

    const onPointerMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const { x: cx, y: cy, w, h } = restingCentre()
        const dx = e.clientX - cx
        const dy = e.clientY - cy

        const reach = Math.max(w, h) / 2 + radius
        const distance = Math.hypot(dx, dy)

        if (distance > reach) {
          if (offsetX !== 0 || offsetY !== 0) apply(0, 0)
          return
        }

        // Ease in with distance from the edge...
        const falloff = 1 - distance / reach
        // ...and back out again right at the centre. The direction vector flips
        // sign as the pointer crosses the middle, so without this the offset
        // would jump the full width of the pull in a single frame. Fading it to
        // zero over the innermost band makes the crossing continuous.
        const core = Math.max(w, h) / 4
        const settle = Math.min(1, distance / core)

        const unitX = distance === 0 ? 0 : dx / distance
        const unitY = distance === 0 ? 0 : dy / distance
        const pull = falloff * settle * strength
        apply(unitX * pull, unitY * pull)
      })
    }

    const reset = () => {
      cancelAnimationFrame(frame)
      apply(0, 0)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('blur', reset)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', reset)
      reset()
    }
  }, [strength, radius])

  return ref
}
