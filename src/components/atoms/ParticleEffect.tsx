export function ParticleEffect() {
  return (
    <div className="splash-particles" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`particle particle-${i}`} />
      ))}
    </div>
  )
}
