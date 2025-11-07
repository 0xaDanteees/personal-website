import { useEffect, useState } from 'react'

type SplashTimingConfig = {
  isMobile: boolean
  splashDuration: number
  contentDelay: number
  animationDelay: number
}

export function useSplashTiming() {
  const [showContent, setShowContent] = useState(false)
  const [startAnimation, setStartAnimation] = useState(false)
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const config: SplashTimingConfig = isMobile
      ? {
          isMobile: true,
          splashDuration: 2300,
          contentDelay: 2300,
          animationDelay: 2500,
        }
      : {
          isMobile: false,
          splashDuration: 2000,
          contentDelay: 2000,
          animationDelay: 2200,
        }

    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, config.contentDelay)

    const animationTimer = setTimeout(() => {
      setStartAnimation(true)
    }, config.animationDelay)

    return () => {
      clearTimeout(contentTimer)
      clearTimeout(animationTimer)
    }
  }, [isMobile])

  return { showContent, startAnimation, isMobile }
}
