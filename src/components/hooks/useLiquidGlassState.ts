import { useEffect, useState } from 'react'

type LiquidGlassConfig = {
  isMobile: boolean
  onScrollRequest?: () => void
}

export function useLiquidGlassState({ isMobile, onScrollRequest }: LiquidGlassConfig) {
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

  // Desktop: Hero visibility tracking
  useEffect(() => {
    if (isMobile || !splashDone) return

    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      if (!heroSection) return

      const heroRect = heroSection.getBoundingClientRect()
      const isHeroVisible = heroRect.bottom > 100 && heroRect.top < window.innerHeight - 100

      if (!isHeroVisible && !isHiding) {
        setIsHiding(true)
      } else if (isHeroVisible && isHiding) {
        setIsHiding(false)
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile, isHiding, splashDone])

  // External trigger (chevron click)
  // Note: I need to track when we go back to Hero section to show the liquid glass again if the chevron is clicked
  // will to later
  useEffect(() => {
    if (onScrollRequest && !isHiding) {
      setIsHiding(true)
    }
  }, [onScrollRequest, isHiding])

  return {
    isVisible,
    isHiding,
    isSplashActive,
    splashDone,
  }
}
