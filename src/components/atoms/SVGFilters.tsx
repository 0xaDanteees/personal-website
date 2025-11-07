export function SVGFilters() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <filter id="liquid-glass-filter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.01 0.008" 
            numOctaves="4" 
            result="turbulence"
          >
            <animate
              attributeName="baseFrequency"
              values="0.01 0.008;0.012 0.01;0.01 0.008"
              dur="8s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feGaussianBlur in="turbulence" stdDeviation="4" result="blur" />
          <feDisplacementMap 
            in2="blur" 
            in="SourceGraphic" 
            scale="15" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>

        <filter id="liquid-glass-glow">
          <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}
