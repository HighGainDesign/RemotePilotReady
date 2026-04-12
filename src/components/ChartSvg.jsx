/* ------------------------------------------------------------------ */
/*  SVG chart illustrations — one per chartType                        */
/*  Exported for use in ChartTrainer and StudyMode                     */
/* ------------------------------------------------------------------ */

function AirportClassD() {
  return (
    <svg viewBox="0 0 300 240" className="w-full h-auto">
      {/* Background */}
      <rect width="300" height="240" fill="#0f172a" rx="8" />
      {/* Dashed blue circle — Class D boundary */}
      <circle cx="150" cy="115" r="80" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="8 4" />
      {/* Airport symbol — crossed runways */}
      <g transform="translate(150,115)">
        <rect x="-18" y="-2" width="36" height="4" rx="1" fill="#60a5fa" />
        <rect x="-2" y="-14" width="4" height="28" rx="1" fill="#60a5fa" />
        <rect x="-12" y="-12" width="24" height="24" rx="12" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
      </g>
      {/* CT frequency label */}
      <text x="200" y="80" fill="#60a5fa" fontSize="11" fontFamily="monospace" fontWeight="bold">CT 125.3</text>
      {/* Airspace label */}
      {/* Altitude annotation */}
      <text x="68" y="70" fill="#94a3b8" fontSize="9" fontFamily="monospace">[SFC — 2500 AGL]</text>
    </svg>
  )
}

function AirportClassC() {
  return (
    <svg viewBox="0 0 300 240" className="w-full h-auto">
      <rect width="300" height="240" fill="#0f172a" rx="8" />
      {/* Outer ring — 10 NM */}
      <circle cx="150" cy="120" r="100" fill="none" stroke="#e879f9" strokeWidth="2" />
      {/* Inner ring — 5 NM */}
      <circle cx="150" cy="120" r="55" fill="none" stroke="#e879f9" strokeWidth="2" />
      {/* Airport symbol */}
      <g transform="translate(150,120)">
        <rect x="-14" y="-2" width="28" height="4" rx="1" fill="#e879f9" />
        <rect x="-2" y="-12" width="4" height="24" rx="1" fill="#e879f9" />
      </g>
      {/* Altitude labels */}
      <text x="150" y="110" fill="#e879f9" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">40</text>
      <text x="150" y="140" fill="#e879f9" fontSize="9" fontFamily="monospace" textAnchor="middle">SFC</text>
      {/* Outer shelf label */}
      <text x="220" y="82" fill="#e879f9" fontSize="10" fontFamily="monospace" fontWeight="bold">40</text>
      <text x="220" y="94" fill="#e879f9" fontSize="9" fontFamily="monospace">20</text>
    </svg>
  )
}

function ClassB() {
  return (
    <svg viewBox="0 0 300 240" className="w-full h-auto">
      <rect width="300" height="240" fill="#0f172a" rx="8" />
      {/* Three concentric tiers — wedding cake */}
      <circle cx="150" cy="125" r="105" fill="none" stroke="#60a5fa" strokeWidth="2" />
      <circle cx="150" cy="125" r="70" fill="none" stroke="#60a5fa" strokeWidth="2" />
      <circle cx="150" cy="125" r="38" fill="none" stroke="#60a5fa" strokeWidth="2" />
      {/* Airport symbol */}
      <g transform="translate(150,125)">
        <rect x="-12" y="-2" width="24" height="4" rx="1" fill="#60a5fa" />
        <rect x="-2" y="-10" width="4" height="20" rx="1" fill="#60a5fa" />
      </g>
      {/* Tier altitude labels */}
      <text x="150" y="115" fill="#60a5fa" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">100/SFC</text>
      <text x="215" y="100" fill="#60a5fa" fontSize="9" fontFamily="monospace" fontWeight="bold">100/30</text>
      <text x="248" y="72" fill="#60a5fa" fontSize="9" fontFamily="monospace" fontWeight="bold">100/60</text>
      {/* Tier lines for visual clarity */}
      <line x1="170" y1="118" x2="205" y2="100" stroke="#60a5fa" strokeWidth="0.5" opacity="0.5" />
      <line x1="205" y1="100" x2="240" y2="75" stroke="#60a5fa" strokeWidth="0.5" opacity="0.5" />
    </svg>
  )
}

function ClassE() {
  return (
    <svg viewBox="0 0 300 240" className="w-full h-auto">
      <rect width="300" height="240" fill="#0f172a" rx="8" />
      {/* Dashed magenta line — Class E to surface */}
      <path d="M30,120 Q80,60 150,60 Q220,60 270,120" fill="none" stroke="#e879f9" strokeWidth="2" strokeDasharray="8 4" />
      {/* Faded/gradient area below — 700 AGL transition */}
      <path d="M30,170 Q80,130 150,130 Q220,130 270,170" fill="none" stroke="#e879f9" strokeWidth="2" opacity="0.4" />
      {/* Magenta shading/gradient zone */}
      <rect x="30" y="130" width="240" height="40" fill="url(#classEGrad)" opacity="0.15" />
      <defs>
        <linearGradient id="classEGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e879f9" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#e879f9" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function Obstructions() {
  return (
    <svg viewBox="0 0 300 240" className="w-full h-auto">
      <rect width="300" height="240" fill="#0f172a" rx="8" />
      {/* Lighted tower (with lightning bolt) */}
      <g transform="translate(100,100)">
        {/* Dot on top */}
        <circle cx="0" cy="-28" r="3" fill="#60a5fa" />
        {/* Upside-down V */}
        <line x1="0" y1="-25" x2="-14" y2="10" stroke="#60a5fa" strokeWidth="2" />
        <line x1="0" y1="-25" x2="14" y2="10" stroke="#60a5fa" strokeWidth="2" />
        {/* Base line */}
        <line x1="-14" y1="10" x2="14" y2="10" stroke="#60a5fa" strokeWidth="1.5" />
        {/* Lightning bolt — lighted */}
        <path d="M4,-18 L-2,-10 L3,-10 L-3,-2" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
        {/* Elevation labels */}
        <text x="0" y="28" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">1548</text>
        <text x="0" y="40" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">(305)</text>
      </g>
      {/* Unlighted tower */}
      <g transform="translate(200,100)">
        <circle cx="0" cy="-28" r="3" fill="#60a5fa" />
        <line x1="0" y1="-25" x2="-14" y2="10" stroke="#60a5fa" strokeWidth="2" />
        <line x1="0" y1="-25" x2="14" y2="10" stroke="#60a5fa" strokeWidth="2" />
        <line x1="-14" y1="10" x2="14" y2="10" stroke="#60a5fa" strokeWidth="1.5" />
        {/* Elevation labels */}
        <text x="0" y="28" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">987</text>
        <text x="0" y="40" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">(210)</text>
      </g>
    </svg>
  )
}

function VfrWaypoints() {
  return (
    <svg viewBox="0 0 300 240" className="w-full h-auto">
      <rect width="300" height="240" fill="#0f172a" rx="8" />
      {/* VFR Waypoint — flag/pennant shape */}
      <g transform="translate(100,100)">
        <rect x="-1" y="-20" width="2" height="40" fill="#e879f9" />
        <polygon points="1,-20 20,-14 1,-8" fill="#e879f9" />
        <text x="0" y="35" fill="#e879f9" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">VPBCH</text>
      </g>
      {/* VFR Waypoint with tick mark (checkpoint) */}
      <g transform="translate(200,100)">
        <rect x="-1" y="-20" width="2" height="40" fill="#e879f9" />
        <polygon points="1,-20 20,-14 1,-8" fill="#e879f9" />
        {/* Tick/check mark for checkpoint */}
        <circle cx="0" cy="0" r="8" fill="none" stroke="#e879f9" strokeWidth="1.5" />
        <line x1="-4" y1="0" x2="-1" y2="3" stroke="#e879f9" strokeWidth="1.5" />
        <line x1="-1" y1="3" x2="5" y2="-3" stroke="#e879f9" strokeWidth="1.5" />
        <text x="0" y="35" fill="#e879f9" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">VPCPT</text>
      </g>
    </svg>
  )
}

function Moa() {
  return (
    <svg viewBox="0 0 300 240" className="w-full h-auto">
      <rect width="300" height="240" fill="#0f172a" rx="8" />
      {/* MOA boundary — magenta hatched */}
      <defs>
        <pattern id="moaHatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#e879f9" strokeWidth="1" opacity="0.4" />
        </pattern>
      </defs>
      <polygon
        points="50,50 250,40 270,140 220,200 80,190 30,130"
        fill="url(#moaHatch)"
        stroke="#e879f9"
        strokeWidth="2"
        strokeDasharray="12 4"
      />
      {/* MOA label */}
      <text x="150" y="110" fill="#e879f9" fontSize="13" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">BRUSHY MOA</text>
      <text x="150" y="130" fill="#e879f9" fontSize="10" fontFamily="monospace" textAnchor="middle">8000 MSL to FL180</text>
      <text x="150" y="148" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">Intermittent by NOTAM</text>
    </svg>
  )
}

function RestrictedArea() {
  return (
    <svg viewBox="0 0 300 240" className="w-full h-auto">
      <rect width="300" height="240" fill="#0f172a" rx="8" />
      {/* Restricted area boundary — blue hatched */}
      <defs>
        <pattern id="restrictHatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />
        </pattern>
      </defs>
      {/* Restricted area R-2502 */}
      <polygon
        points="30,50 140,45 150,130 90,160 25,120"
        fill="url(#restrictHatch)"
        stroke="#60a5fa"
        strokeWidth="2"
      />
      <text x="85" y="95" fill="#60a5fa" fontSize="12" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">R-2502</text>
      <text x="85" y="112" fill="#60a5fa" fontSize="9" fontFamily="monospace" textAnchor="middle">SFC TO 8000 MSL</text>
      {/* Prohibited area P-56 */}
      <circle cx="220" cy="100" r="45" fill="url(#restrictHatch)" stroke="#60a5fa" strokeWidth="2" />
      <text x="220" y="97" fill="#60a5fa" fontSize="12" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">P-56</text>
      <text x="220" y="112" fill="#60a5fa" fontSize="9" fontFamily="monospace" textAnchor="middle">SFC TO UNL</text>
    </svg>
  )
}

function Tfr() {
  return (
    <svg viewBox="0 0 300 240" className="w-full h-auto">
      <rect width="300" height="240" fill="#0f172a" rx="8" />
      {/* TFR boundary — red/orange dashed circle */}
      <circle cx="150" cy="110" r="75" fill="none" stroke="#f97316" strokeWidth="2.5" strokeDasharray="10 5" />
      <circle cx="150" cy="110" r="75" fill="#f97316" fillOpacity="0.06" />
      {/* Fire icon in center */}
      <g transform="translate(150,100)">
        <path d="M0,-18 C-6,-8 -12,2 -8,12 C-6,18 -2,20 0,20 C2,20 6,18 8,12 C12,2 6,-8 0,-18Z" fill="#f97316" opacity="0.7" />
        <path d="M0,-6 C-3,0 -6,6 -4,12 C-3,16 -1,17 0,17 C1,17 3,16 4,12 C6,6 3,0 0,-6Z" fill="#fbbf24" opacity="0.8" />
      </g>
      {/* Radius and altitude data — as shown on apps/NOTAMs */}
      <text x="150" y="200" fill="#f97316" fontSize="10" fontFamily="monospace" textAnchor="middle">3 NM / SFC — 3000 AGL</text>
    </svg>
  )
}

function AirportData() {
  return (
    <svg viewBox="0 0 300 240" className="w-full h-auto">
      <rect width="300" height="240" fill="#0f172a" rx="8" />
      {/* Non-towered airport symbol — magenta */}
      <g transform="translate(110,100)">
        <rect x="-16" y="-2" width="32" height="4" rx="1" fill="#e879f9" />
        <rect x="-2" y="-12" width="4" height="24" rx="1" fill="#e879f9" />
        <circle cx="0" cy="0" r="16" fill="none" stroke="#e879f9" strokeWidth="1.5" />
      </g>
      {/* Data block */}
      <g transform="translate(160,70)">
        <text x="0" y="0" fill="#e879f9" fontSize="11" fontFamily="monospace" fontWeight="bold">SMITHVILLE (6J2)</text>
        <text x="0" y="16" fill="#e879f9" fontSize="10" fontFamily="monospace">1280</text>
        <text x="40" y="16" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">MSL</text>
        <text x="0" y="32" fill="#e879f9" fontSize="10" fontFamily="monospace">L 72</text>
        <text x="40" y="32" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">longest rwy</text>
        <text x="0" y="48" fill="#e879f9" fontSize="10" fontFamily="monospace">122.8</text>
        <text x="45" y="48" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">CTAF</text>
      </g>
    </svg>
  )
}

export const chartRenderers = {
  airport_class_d: AirportClassD,
  airport_class_c: AirportClassC,
  class_b: ClassB,
  class_e: ClassE,
  obstructions: Obstructions,
  vfr_waypoints: VfrWaypoints,
  moa: Moa,
  restricted_area: RestrictedArea,
  tfr: Tfr,
  airport_data: AirportData,
}
