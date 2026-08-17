/**
 * A sparse node-and-edge lattice rather than free-floating dots — closer to the
 * filament structure of a cosmic web, and a better fit for someone who builds
 * distributed systems: the relationships are the point, not the particles.
 *
 * Coordinates are fixed rather than random so the composition stays deliberate,
 * and the whole thing is a single inline SVG: no canvas, no rAF loop.
 */

type Node = { x: number; y: number; r: number; delay: number }

const nodes: Node[] = [
  { x: 12, y: 22, r: 2.5, delay: 0 },
  { x: 26, y: 14, r: 1.6, delay: 0.4 },
  { x: 33, y: 34, r: 2, delay: 0.8 },
  { x: 18, y: 46, r: 1.4, delay: 1.2 },
  { x: 8, y: 62, r: 1.8, delay: 0.6 },
  { x: 24, y: 72, r: 2.2, delay: 1.6 },
  { x: 42, y: 58, r: 1.5, delay: 1 },
  { x: 78, y: 20, r: 2, delay: 0.2 },
  { x: 88, y: 33, r: 1.5, delay: 1.4 },
  { x: 70, y: 42, r: 2.4, delay: 0.9 },
  { x: 84, y: 58, r: 1.7, delay: 1.8 },
  { x: 66, y: 70, r: 1.4, delay: 0.5 },
  { x: 90, y: 78, r: 2, delay: 1.3 },
]

/** Edges are drawn only between nodes close enough to plausibly relate. */
const MAX_EDGE_DISTANCE = 26

const edges = nodes.flatMap((a, i) =>
  nodes.slice(i + 1).flatMap((b, j) => {
    const distance = Math.hypot(a.x - b.x, a.y - b.y)
    if (distance > MAX_EDGE_DISTANCE) return []
    return [{
      key: `${i}-${i + 1 + j}`,
      x1: a.x, y1: a.y, x2: b.x, y2: b.y,
      // Nearer pairs hold a stronger line, so the lattice has density gradients
      // instead of reading as a uniform mesh. Floored so the longest edges stay
      // faintly present rather than vanishing.
      opacity: 0.25 + 0.55 * (1 - distance / MAX_EDGE_DISTANCE),
      delay: Math.min(a.delay, b.delay),
    }]
  })
)

export function ParticleEffect() {
  return (
    // xMidYMid keeps circles circular; `preserveAspectRatio="none"` stretched
    // them into ovals and squashed the hairlines below a visible width.
    <svg
      className="filament-web"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className="filament-web__edges">
        {edges.map((e) => (
          <line
            key={e.key}
            x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke="currentColor"
            // viewBox units: 0.1 of a 100-unit box scales to roughly a hairline
            // at desktop widths. See the CSS for why non-scaling-stroke is out.
            strokeWidth="0.1"
            opacity={e.opacity}
            // Normalises every edge to length 1 so one dash pair draws them all,
            // regardless of their real length.
            pathLength={1}
            style={{ animationDelay: `${e.delay}s` }}
          />
        ))}
      </g>
      <g className="filament-web__nodes">
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x} cy={n.y} r={n.r * 0.32}
            fill="currentColor"
            style={{ animationDelay: `${n.delay}s` }}
          />
        ))}
      </g>
    </svg>
  )
}
