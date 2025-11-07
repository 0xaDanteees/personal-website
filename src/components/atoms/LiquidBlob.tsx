type Props = {
  variant: 'mobile-splash' | 'desktop-splash' | 'desktop-hero'
  index: 1 | 2 | 3 | 4
}

export function LiquidBlob({ variant, index }: Props) {
  const variantClass = {
    'mobile-splash': 'blob-mobile-splash',
    'desktop-splash': 'blob-desktop-splash',
    'desktop-hero': '',
  }[variant]

  const positionClass = variant === 'desktop-hero' 
    ? `blob-desktop-${index}` 
    : `blob-${index}`

  return (
    <div 
      className={`liquid-glass-blob ${positionClass} ${variantClass}`}
      aria-hidden="true"
    />
  )
}
