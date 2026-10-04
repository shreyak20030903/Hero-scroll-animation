// Inline SVG car. Each wheel is drawn around (0,0) and moved into place with a
// translate() on the OUTER group. The INNER group (.wheel-spin) is the only
// thing that rotates, so it always spins around its own centre.
function Wheel({ cx }) {
  return (
    <g transform={`translate(${cx} 148)`}>
      {/* tyre */}
      <circle r="34" fill="#0a0820" />
      {/* rotating part: rim + spokes */}
      <g className="wheel-spin">
        <circle r="22" fill="#2c2760" />
        {[0, 60, 120].map((deg) => (
          <rect
            key={deg}
            x="-1.5"
            y="-17"
            width="3"
            height="34"
            rx="1.5"
            fill="#f2eeff"
            opacity="0.85"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="5" fill="#ff9f4a" />
      </g>
    </g>
  )
}

export default function Car({ className = '' }) {
  return (
    <svg viewBox="0 0 520 190" className={className} role="img" aria-label="Car driving across the screen">
      {/* headlight beam */}
      <path d="M505 118 L640 80 L640 150 Z" fill="#ff9f4a" opacity="0.18" />
      {/* body */}
      <path
        d="M18 132 L38 102 Q58 92 120 88 L168 52 Q184 40 214 40 L330 40 Q366 42 386 70 L420 88 Q482 94 502 114 L506 132 Q506 148 490 148 L30 148 Q14 148 18 132 Z"
        fill="#f2eeff"
      />
      {/* windows */}
      <path d="M178 60 Q188 50 214 50 L262 50 L262 88 L148 88 Z" fill="#1b1740" />
      <path d="M274 50 L326 50 Q352 52 366 72 L378 88 L274 88 Z" fill="#1b1740" />
      {/* headlight + taillight */}
      <rect x="486" y="108" width="16" height="10" rx="4" fill="#ff9f4a" />
      <rect x="18" y="112" width="12" height="9" rx="3" fill="#ff5d5d" />
      <Wheel cx={120} />
      <Wheel cx={398} />
    </svg>
  )
}
