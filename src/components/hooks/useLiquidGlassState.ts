import { useEffect, useState } from 'react'

type LiquidGlassConfig = {
  isMobile: boolean
  onHeroVisibilityChange?: (isHeroVisible: boolean) => void
}

export function useLiquidGlassState({ isMobile, onHeroVisibilityChange }: LiquidGlassConfig) {
  const [isVisible, setIsVisible] = useState(true)
  const [isHiding, setIsHiding] = useState(false)
  const [isSplashActive, setIsSplashActive] = useState(false)
  const [splashDone, setSplashDone] = useState(false)

  // Initial splash screen
  useEffect(() => {
    setIsSplashActive(true)

    const splashDuration = isMobile ? 1500 : 2000
    const hideDuration = isMobile ? 800 : 0

    const timer = setTimeout(() => {
      if (isMobile) {
        setIsHiding(true)
        setTimeout(() => {
          setIsVisible(false)
          setIsSplashActive(false)
          setSplashDone(true)
        }, hideDuration)
      } else {
        setIsSplashActive(false)
        setSplashDone(true)
      }
    }, splashDuration)

    return () => clearTimeout(timer)
  }, [isMobile])

  // Desktop: hero visibility drives the glass in both directions, no matter how
  // the user got there (wheel, keyboard, chevron click or anchor jump).
  useEffect(() => {
    if (isMobile || !splashDone) return

    const heroSection = document.getElementById('hero')
    if (!heroSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isHeroVisible = entry.isIntersecting
        setIsHiding(!isHeroVisible)
        if (isHeroVisible) setIsVisible(true)
        onHeroVisibilityChange?.(isHeroVisible)
      },
      // Shrinking the viewport box keeps the old ~100px dead zone at both edges,
      // so the glass does not flicker while the hero is barely peeking in.
      { rootMargin: '-100px 0px -100px 0px', threshold: 0 }
    )

    observer.observe(heroSection)
    return () => observer.disconnect()
  }, [isMobile, splashDone, onHeroVisibilityChange])

  return {
    isVisible,
    isHiding,
    isSplashActive,
    splashDone,
  }
}
