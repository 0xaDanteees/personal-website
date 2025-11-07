type Props = {
  variant?: 'mobile' | 'desktop'
}

export function ShimmerOverlay({ variant = 'mobile' }: Props) {
  const className = variant === 'desktop' 
    ? 'splash-shimmer-desktop' 
    : 'splash-shimmer'

  return <div className={className} aria-hidden="true" />
}
