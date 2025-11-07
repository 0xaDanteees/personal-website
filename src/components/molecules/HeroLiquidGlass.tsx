import { LiquidBlob } from '../atoms/LiquidBlob'

type Props = {
  isHiding: boolean
  splashDone: boolean
}

export function HeroLiquidGlass({ isHiding, splashDone }: Props) {
  const visibilityClass = splashDone 
    ? (isHiding ? 'opacity-0 translate-x-20' : 'opacity-100 translate-x-0') 
    : 'opacity-0 translate-x-20'

  return (
    <div 
      className={`hidden md:block absolute right-0 top-0 bottom-0 w-1/3 z-0 overflow-hidden transition-all duration-1000 ease-out ${visibilityClass}`}
      aria-hidden="true"
    >
      <div className="liquid-glass-container">
        <LiquidBlob variant="desktop-hero" index={1} />
        <LiquidBlob variant="desktop-hero" index={2} />
        <LiquidBlob variant="desktop-hero" index={3} />
        
        <div className="liquid-glass-gradient" />
      </div>
    </div>
  )
}
