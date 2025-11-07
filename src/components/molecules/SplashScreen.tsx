import { LiquidBlob } from '../atoms/LiquidBlob'
import { Monogram } from '../atoms/Monogram'
import { ShimmerOverlay } from '../atoms/ShimmerOverlay'
import { ParticleEffect } from '../atoms/ParticleEffect'

type Props = {
  variant: 'mobile' | 'desktop'
  isHiding?: boolean
}

export function SplashScreen({ variant, isHiding = false }: Props) {
  const isMobile = variant === 'mobile'
  
  const containerClass = isMobile
    ? `md:hidden fixed inset-0 z-50 liquid-glass-splash ${isHiding ? 'liquid-glass-hiding' : ''}`
    : 'hidden md:block fixed inset-0 z-50 liquid-glass-splash-desktop'

  const blobVariant = isMobile ? 'mobile-splash' : 'desktop-splash'
  const blobCount = isMobile ? 3 : 4

  return (
    <div className={containerClass}>
      {Array.from({ length: blobCount }, (_, i) => (
        <LiquidBlob 
          key={i} 
          variant={blobVariant} 
          index={(i + 1) as 1 | 2 | 3 | 4} 
        />
      ))}
      
      <Monogram variant={variant} />
      <ShimmerOverlay variant={variant} />
      {!isMobile && <ParticleEffect />}
      
    </div>
  )
}
