import { useState } from 'react'
import { useLiquidGlassState } from '../hooks/useLiquidGlassState'
import { SVGFilters } from '../atoms/SVGFilters'
import { SplashScreen } from '../molecules/SplashScreen'
import { HeroLiquidGlass } from '../molecules/HeroLiquidGlass'

type Props = {
  onScrollRequest?: () => void
}

export function LiquidGlass({ onScrollRequest }: Props) {
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  
  const { isVisible, isHiding, isSplashActive, splashDone } = useLiquidGlassState({
    isMobile,
    onScrollRequest,
  })

  if (!isVisible && isMobile) return null

  return (
    <>
      <SVGFilters />
      
      {isSplashActive && (
        <>
          {isMobile ? (
            <SplashScreen variant="mobile" isHiding={isHiding} />
          ) : (
            <SplashScreen variant="desktop" />
          )}
        </>
      )}

      {!isMobile && (
        <HeroLiquidGlass isHiding={isHiding} splashDone={splashDone} />
      )}
    </>
  )
}
