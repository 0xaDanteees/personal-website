import { useEffect, useState } from 'react'

type SplashTimingConfig = {
  isMobile: boolean
  splashDuration: number
  contentDelay: number
  animationDelay: number
}

export function useSplashTiming() {
  // Starts visible on both sides so the prerendered HTML and the first client
  // render agree — and so crawlers get the hero content rather than `opacity-0`.
  // The splash hides it again in an effect, which runs after hydration.
  const [showContent, setShowContent] = useState(true)
  const [startAnimation, setStartAnimation] = useState(false)
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const config: SplashTimingConfig = isMobile
      ? {
          isMobile: true,
          splashDuration: 2300,
          contentDelay: 2300,
          // Comfortably after the content has faded in, so the letters are
          // fully visible while they drop rather than finishing under an
          // opacity-0 wrapper.
          animationDelay: 2900,
        }
      : {
          isMobile: false,
          splashDuration: 2000,
          contentDelay: 2000,
          animationDelay: 2600,
        }

    // Hidden immediately on the client so the splash still plays over an empty
    // hero; the prerendered HTML keeps the visible state for crawlers.
    setShowContent(false)

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
