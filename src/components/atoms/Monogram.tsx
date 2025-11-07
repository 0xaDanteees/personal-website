type Props = {
  variant?: 'mobile' | 'desktop'
}

export function Monogram({ variant = 'desktop' }: Props) {
  const isMobile = variant === 'mobile'
  
  const containerClass = isMobile ? 'splash-logo-container' : 'splash-logo-container-desktop'
  const logoClass = isMobile ? 'splash-logo' : 'splash-logo-desktop'
  const textClass = isMobile ? 'splash-logo-text' : 'splash-logo-text-desktop'
  const ringClass = isMobile ? 'splash-logo-ring' : 'splash-logo-ring-desktop'
  const ring2Class = isMobile ? 'splash-logo-ring-2' : 'splash-logo-ring-2-desktop'
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10" aria-hidden="true">
      <div className={containerClass}>
        <div className={logoClass}>
          <span className={`${textClass} font-bold`}>DO</span>
        </div>
        <div className={ringClass} />
        <div className={ring2Class} />
        {!isMobile && <div className="splash-logo-ring-3-desktop" />}
      </div>
    </div>
  )
}