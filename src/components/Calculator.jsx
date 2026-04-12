import { useState, useMemo } from 'react'

const TABS = [
  { id: 'density', label: 'Density Alt' },
  { id: 'heading', label: 'Heading' },
  { id: 'crosswind', label: 'Crosswind' },
  { id: 'converter', label: 'Converter' },
  { id: 'tsd', label: 'Time/Spd/Dist' },
  { id: 'guide', label: 'E6B Guide' },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function clampDeg(d) {
  return ((d % 360) + 360) % 360
}

function toRad(deg) {
  return (deg * Math.PI) / 180
}

function toDeg(rad) {
  return (rad * 180) / Math.PI
}

function fmt(n, decimals = 0) {
  if (n == null || isNaN(n)) return '--'
  return Number(n).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// ── Shared UI pieces ─────────────────────────────────────────────────────────

function InputField({ label, value, onChange, unit, placeholder, min, max, step }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-secondary-text uppercase tracking-wider mb-1.5 font-instrument">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || '0'}
          min={min}
          max={max}
          step={step || 'any'}
          className="w-full bg-cockpit-bg/60 border border-cockpit-border rounded-xl px-4 py-3 text-base text-body-text font-mono placeholder-inactive focus:outline-none focus:border-phosphor/30 transition-colors appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-inactive font-medium pointer-events-none font-instrument">
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}

function ResultRow({ label, value, unit, accent }) {
  const colorClass = accent === 'amber' ? 'text-amber-accent'
    : accent === 'green' ? 'text-green-400'
    : accent === 'red' ? 'text-red-400'
    : 'text-phosphor'
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-cockpit-border last:border-0">
      <span className="text-xs text-secondary-text">{label}</span>
      <span className={`text-sm font-semibold font-instrument ${colorClass}`}>
        {value}{unit ? <span className="text-xs text-inactive ml-1 font-sans">{unit}</span> : null}
      </span>
    </div>
  )
}

function ToggleButton({ options, value, onChange }) {
  return (
    <div className="inline-flex rounded-lg bg-cockpit-bg/60 border border-cockpit-border p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`tap-highlight px-3 py-1.5 rounded-md text-xs font-medium transition-colors font-instrument ${
            value === opt.value
              ? 'bg-phosphor/15 text-phosphor'
              : 'text-inactive active:text-body-text'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function InfoBox({ children }) {
  return (
    <div className="mt-3 px-3 py-2.5 rounded-xl bg-amber-accent/5 border border-amber-accent/15">
      <div className="flex gap-2">
        <svg className="w-3.5 h-3.5 text-amber-accent mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v.01M12 8v4" />
        </svg>
        <p className="text-[11px] text-amber-accent/80 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

// ── 1. Density Altitude ──────────────────────────────────────────────────────

function DensityAltitude() {
  const [fieldElev, setFieldElev] = useState('')
  const [altimeter, setAltimeter] = useState('29.92')
  const [temp, setTemp] = useState('')
  const [tempUnit, setTempUnit] = useState('C')

  const results = useMemo(() => {
    const elev = parseFloat(fieldElev)
    const alt = parseFloat(altimeter)
    const t = parseFloat(temp)
    if (isNaN(elev) || isNaN(alt) || isNaN(t)) return null

    const oatC = tempUnit === 'F' ? (t - 32) * (5 / 9) : t
    const pressureAlt = (29.92 - alt) * 1000 + elev
    const isaTemp = 15 - (pressureAlt / 1000) * 2
    const densityAlt = pressureAlt + 120 * (oatC - isaTemp)

    return { pressureAlt, isaTemp, oatC, densityAlt }
  }, [fieldElev, altimeter, temp, tempUnit])

  return (
    <div className="space-y-4">
      <InputField label="Field Elevation" value={fieldElev} onChange={setFieldElev} unit="ft" placeholder="5000" />
      <InputField label="Altimeter Setting" value={altimeter} onChange={setAltimeter} unit="inHg" placeholder="29.92" step="0.01" />
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-semibold text-secondary-text uppercase tracking-wider font-instrument">
            Outside Air Temperature
          </label>
          <ToggleButton
            options={[
              { label: '\u00b0C', value: 'C' },
              { label: '\u00b0F', value: 'F' },
            ]}
            value={tempUnit}
            onChange={setTempUnit}
          />
        </div>
        <div className="relative">
          <input
            type="number"
            inputMode="decimal"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            placeholder="25"
            step="any"
            className="w-full bg-cockpit-bg/60 border border-cockpit-border rounded-xl px-4 py-3 text-base text-body-text font-mono placeholder-inactive focus:outline-none focus:border-phosphor/30 transition-colors appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-inactive font-medium pointer-events-none font-instrument">
            {tempUnit === 'C' ? '\u00b0C' : '\u00b0F'}
          </span>
        </div>
      </div>

      {results && (
        <div className="rounded-2xl bg-gradient-to-br from-cockpit-surface to-cockpit-surface border border-cockpit-border p-4">
          <p className="text-[10px] font-semibold text-inactive uppercase tracking-wider mb-2 font-instrument">Results</p>
          <ResultRow label="Pressure Altitude" value={fmt(results.pressureAlt)} unit="ft" />
          <ResultRow label="ISA Temp at Press. Alt" value={fmt(results.isaTemp, 1)} unit={'\u00b0C'} />
          <ResultRow label="OAT" value={fmt(results.oatC, 1)} unit={'\u00b0C'} />
          <ResultRow
            label="Density Altitude"
            value={fmt(results.densityAlt)}
            unit="ft"
            accent={results.densityAlt > 8000 ? 'red' : results.densityAlt > 5000 ? 'amber' : 'green'}
          />
        </div>
      )}

      <InfoBox>
        PA = (29.92 - altimeter) x 1000 + field elev. DA = PA + 120 x (OAT - ISA). Higher DA means degraded aircraft performance.
      </InfoBox>
    </div>
  )
}

// ── 2. Magnetic Heading ──────────────────────────────────────────────────────

function MagneticHeading() {
  const [trueCourse, setTrueCourse] = useState('')
  const [magVar, setMagVar] = useState('')
  const [varDir, setVarDir] = useState('W')
  const [windDir, setWindDir] = useState('')
  const [windSpd, setWindSpd] = useState('')
  const [tas, setTas] = useState('')

  const results = useMemo(() => {
    const tc = parseFloat(trueCourse)
    const mv = parseFloat(magVar)
    const wd = parseFloat(windDir)
    const ws = parseFloat(windSpd)
    const airspeed = parseFloat(tas)
    if (isNaN(tc) || isNaN(mv)) return null

    // Magnetic course: East is least (subtract), West is best (add)
    let magCourse = varDir === 'E' ? tc - mv : tc + mv
    magCourse = clampDeg(magCourse)

    // If no wind data, just return magnetic course
    if (isNaN(wd) || isNaN(ws) || isNaN(airspeed) || airspeed === 0) {
      return { magCourse, magHeading: magCourse, groundspeed: airspeed || null, windCorrectionAngle: 0, hasWind: false }
    }

    // Wind correction angle
    // Angle between wind direction and true course
    const windAngle = toRad(wd - tc)
    const sinWCA = (ws * Math.sin(windAngle)) / airspeed
    const clampedSinWCA = Math.max(-1, Math.min(1, sinWCA))
    const wca = toDeg(Math.asin(clampedSinWCA))

    // True heading = true course + WCA (into the wind)
    const trueHeading = tc + wca
    // Magnetic heading
    let mh = varDir === 'E' ? trueHeading - mv : trueHeading + mv
    mh = clampDeg(mh)

    // Groundspeed
    const gs = airspeed * Math.cos(Math.asin(clampedSinWCA)) + ws * Math.cos(windAngle)

    return {
      magCourse,
      magHeading: mh,
      groundspeed: Math.max(0, gs),
      windCorrectionAngle: wca,
      hasWind: true,
    }
  }, [trueCourse, magVar, varDir, windDir, windSpd, tas])

  return (
    <div className="space-y-4">
      <InputField label="True Course" value={trueCourse} onChange={setTrueCourse} unit={'\u00b0'} placeholder="270" min="0" max="360" />
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-semibold text-secondary-text uppercase tracking-wider font-instrument">
            Magnetic Variation
          </label>
          <ToggleButton
            options={[
              { label: 'East', value: 'E' },
              { label: 'West', value: 'W' },
            ]}
            value={varDir}
            onChange={setVarDir}
          />
        </div>
        <div className="relative">
          <input
            type="number"
            inputMode="decimal"
            value={magVar}
            onChange={(e) => setMagVar(e.target.value)}
            placeholder="10"
            min="0"
            max="90"
            step="any"
            className="w-full bg-cockpit-bg/60 border border-cockpit-border rounded-xl px-4 py-3 text-base text-body-text font-mono placeholder-inactive focus:outline-none focus:border-phosphor/30 transition-colors appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-inactive font-medium pointer-events-none font-instrument">
            {'\u00b0 ' + varDir}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-cockpit-border">
        <p className="text-[10px] font-semibold text-inactive uppercase tracking-wider mb-3 font-instrument">Wind Correction (optional)</p>
        <div className="grid grid-cols-3 gap-3">
          <InputField label="Wind Dir" value={windDir} onChange={setWindDir} unit={'\u00b0'} placeholder="180" />
          <InputField label="Wind Spd" value={windSpd} onChange={setWindSpd} unit="kts" placeholder="15" />
          <InputField label="TAS" value={tas} onChange={setTas} unit="kts" placeholder="100" />
        </div>
      </div>

      {results && (
        <div className="rounded-2xl bg-gradient-to-br from-cockpit-surface to-cockpit-surface border border-cockpit-border p-4">
          <p className="text-[10px] font-semibold text-inactive uppercase tracking-wider mb-2 font-instrument">Results</p>
          <ResultRow label="Magnetic Course" value={fmt(results.magCourse)} unit={'\u00b0'} />
          {results.hasWind && (
            <>
              <ResultRow label="Wind Correction Angle" value={(results.windCorrectionAngle >= 0 ? '+' : '') + fmt(results.windCorrectionAngle, 1)} unit={'\u00b0'} accent="amber" />
              <ResultRow label="Magnetic Heading" value={fmt(results.magHeading)} unit={'\u00b0'} accent="green" />
              <ResultRow label="Groundspeed" value={fmt(results.groundspeed)} unit="kts" />
            </>
          )}
          {!results.hasWind && (
            <ResultRow label="Magnetic Heading" value={fmt(results.magHeading)} unit={'\u00b0'} accent="green" />
          )}
        </div>
      )}

      <InfoBox>
        "East is least, West is best" -- For East variation, subtract from true course. For West variation, add to true course.
      </InfoBox>
    </div>
  )
}

// ── 3. Crosswind / Headwind ──────────────────────────────────────────────────

function WindIndicator({ runwayHdg, windDir, headwind, crosswind, windSpd }) {
  // Angle of wind relative to runway (from runway perspective)
  const relAngle = windDir - runwayHdg
  const windRad = toRad(relAngle)
  // Arrow points FROM the wind direction toward center
  const arrowLen = 38
  const startX = 60 + arrowLen * Math.sin(windRad)
  const startY = 60 - arrowLen * Math.cos(windRad)
  const endX = 60
  const endY = 60
  // Arrowhead
  const angle = Math.atan2(endY - startY, endX - startX)
  const headLen = 7
  const ax1 = endX - headLen * Math.cos(angle - 0.45)
  const ay1 = endY - headLen * Math.sin(angle - 0.45)
  const ax2 = endX - headLen * Math.cos(angle + 0.45)
  const ay2 = endY - headLen * Math.sin(angle + 0.45)

  return (
    <div className="flex items-center justify-center my-2">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Runway strip */}
        <rect x="56" y="15" width="8" height="90" rx="2" fill="#334155" />
        {/* Runway center line dashes */}
        <line x1="60" y1="22" x2="60" y2="30" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="60" y1="40" x2="60" y2="60" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="60" y1="70" x2="60" y2="90" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
        {/* Runway heading label */}
        <text x="60" y="12" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
          {String(Math.round(runwayHdg / 10)).padStart(2, '0')}
        </text>
        {/* Wind arrow */}
        <line x1={startX} y1={startY} x2={endX} y2={endY} stroke="#4afc92" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points={`${endX},${endY} ${ax1},${ay1} ${ax2},${ay2}`} fill="#4afc92" />
        {/* Wind label */}
        <text x={startX} y={startY - 5} textAnchor="middle" fill="#4afc92" fontSize="8" fontFamily="monospace">
          {windSpd}kt
        </text>
        {/* Crosswind indicator line (perpendicular to runway) */}
        <line x1="30" y1="60" x2="90" y2="60" stroke="#475569" strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>
    </div>
  )
}

function CrosswindCalc() {
  const [runwayHdg, setRunwayHdg] = useState('')
  const [windDir, setWindDir] = useState('')
  const [windSpd, setWindSpd] = useState('')

  const results = useMemo(() => {
    const rwy = parseFloat(runwayHdg)
    const wd = parseFloat(windDir)
    const ws = parseFloat(windSpd)
    if (isNaN(rwy) || isNaN(wd) || isNaN(ws)) return null

    const angleDiff = toRad(wd - rwy)
    const crosswind = ws * Math.sin(angleDiff)
    const headwind = ws * Math.cos(angleDiff)

    return {
      crosswind,       // positive = from right, negative = from left
      headwind,        // positive = headwind, negative = tailwind
      absCrosswind: Math.abs(crosswind),
      absHeadwind: Math.abs(headwind),
      crossDir: crosswind >= 0 ? 'right' : 'left',
      headType: headwind >= 0 ? 'headwind' : 'tailwind',
    }
  }, [runwayHdg, windDir, windSpd])

  return (
    <div className="space-y-4">
      <InputField label="Runway Heading" value={runwayHdg} onChange={setRunwayHdg} unit={'\u00b0'} placeholder="270" min="1" max="360" />
      <div className="grid grid-cols-2 gap-3">
        <InputField label="Wind Direction" value={windDir} onChange={setWindDir} unit={'\u00b0'} placeholder="240" min="0" max="360" />
        <InputField label="Wind Speed" value={windSpd} onChange={setWindSpd} unit="kts" placeholder="20" />
      </div>

      {results && (
        <>
          <WindIndicator
            runwayHdg={parseFloat(runwayHdg)}
            windDir={parseFloat(windDir)}
            headwind={results.headwind}
            crosswind={results.crosswind}
            windSpd={parseFloat(windSpd)}
          />

          <div className="rounded-2xl bg-gradient-to-br from-cockpit-surface to-cockpit-surface border border-cockpit-border p-4">
            <p className="text-[10px] font-semibold text-inactive uppercase tracking-wider mb-2 font-instrument">Components</p>
            <ResultRow
              label={results.headType === 'headwind' ? 'Headwind Component' : 'Tailwind Component'}
              value={fmt(results.absHeadwind, 1)}
              unit="kts"
              accent={results.headType === 'tailwind' ? 'red' : 'green'}
            />
            <ResultRow
              label={`Crosswind Component (from ${results.crossDir})`}
              value={fmt(results.absCrosswind, 1)}
              unit="kts"
              accent={results.absCrosswind > 15 ? 'red' : results.absCrosswind > 10 ? 'amber' : 'green'}
            />
          </div>
        </>
      )}

      <InfoBox>
        Crosswind = wind speed x sin(angle). Headwind = wind speed x cos(angle). Angle is the difference between wind direction and runway heading.
      </InfoBox>
    </div>
  )
}

// ── 4. Unit Converter ────────────────────────────────────────────────────────

const CONVERSIONS = [
  {
    id: 'kts_mph',
    labelA: 'Knots',
    labelB: 'MPH',
    unitA: 'kts',
    unitB: 'mph',
    aToB: (v) => v * 1.15078,
    bToA: (v) => v / 1.15078,
  },
  {
    id: 'c_f',
    labelA: '\u00b0C',
    labelB: '\u00b0F',
    unitA: '\u00b0C',
    unitB: '\u00b0F',
    aToB: (v) => v * (9 / 5) + 32,
    bToA: (v) => (v - 32) * (5 / 9),
  },
  {
    id: 'ft_m',
    labelA: 'Feet',
    labelB: 'Meters',
    unitA: 'ft',
    unitB: 'm',
    aToB: (v) => v * 0.3048,
    bToA: (v) => v / 0.3048,
  },
  {
    id: 'sm_nm',
    labelA: 'Statute Miles',
    labelB: 'Nautical Miles',
    unitA: 'SM',
    unitB: 'NM',
    aToB: (v) => v * 0.868976,
    bToA: (v) => v / 0.868976,
  },
  {
    id: 'inhg_hpa',
    labelA: 'inHg',
    labelB: 'hPa',
    unitA: 'inHg',
    unitB: 'hPa',
    aToB: (v) => v * 33.8639,
    bToA: (v) => v / 33.8639,
  },
]

function ConverterRow({ conv }) {
  const [valA, setValA] = useState('')
  const [valB, setValB] = useState('')

  const handleA = (v) => {
    setValA(v)
    const n = parseFloat(v)
    if (!isNaN(n)) {
      setValB(conv.aToB(n).toFixed(2))
    } else {
      setValB('')
    }
  }

  const handleB = (v) => {
    setValB(v)
    const n = parseFloat(v)
    if (!isNaN(n)) {
      setValA(conv.bToA(n).toFixed(2))
    } else {
      setValA('')
    }
  }

  return (
    <div className="rounded-xl bg-cockpit-surface/60 border border-cockpit-border p-3">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="block text-[10px] font-semibold text-inactive uppercase tracking-wider mb-1 font-instrument">
            {conv.labelA}
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={valA}
            onChange={(e) => handleA(e.target.value)}
            placeholder="0"
            step="any"
            className="w-full bg-cockpit-bg/60 border border-cockpit-border rounded-lg px-3 py-2.5 text-sm text-body-text font-mono placeholder-inactive focus:outline-none focus:border-phosphor/30 transition-colors appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <div className="pt-4">
          <svg className="w-4 h-4 text-inactive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M7 16l-4-4m0 0l4-4m-4 4h18M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
        <div className="flex-1">
          <label className="block text-[10px] font-semibold text-inactive uppercase tracking-wider mb-1 font-instrument">
            {conv.labelB}
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={valB}
            onChange={(e) => handleB(e.target.value)}
            placeholder="0"
            step="any"
            className="w-full bg-cockpit-bg/60 border border-cockpit-border rounded-lg px-3 py-2.5 text-sm text-body-text font-mono placeholder-inactive focus:outline-none focus:border-phosphor/30 transition-colors appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  )
}

function UnitConverter() {
  return (
    <div className="space-y-3">
      {CONVERSIONS.map((conv) => (
        <ConverterRow key={conv.id} conv={conv} />
      ))}
      <InfoBox>
        Key for Part 107: 1 NM = 1.15 SM. Standard pressure is 29.92 inHg (1013.25 hPa). Freezing is 0{'\u00b0'}C / 32{'\u00b0'}F.
      </InfoBox>
    </div>
  )
}

// ── 5. Time / Speed / Distance ──────────────────────────────────────────────

function TimeSpeedDistance() {
  const [distance, setDistance] = useState('')
  const [groundspeed, setGroundspeed] = useState('')
  const [time, setTime] = useState('')
  const [fuelFlow, setFuelFlow] = useState('')

  const results = useMemo(() => {
    const d = parseFloat(distance)
    const gs = parseFloat(groundspeed)
    const t = parseFloat(time)
    const ff = parseFloat(fuelFlow)

    const filled = [!isNaN(d), !isNaN(gs), !isNaN(t)].filter(Boolean).length
    if (filled < 2) return null

    let calcDist = d, calcGs = gs, calcTime = t, solving = ''

    if (isNaN(d) && !isNaN(gs) && !isNaN(t)) {
      calcDist = gs * (t / 60)
      solving = 'distance'
    } else if (isNaN(gs) && !isNaN(d) && !isNaN(t)) {
      calcGs = t > 0 ? d / (t / 60) : 0
      solving = 'groundspeed'
    } else if (isNaN(t) && !isNaN(d) && !isNaN(gs)) {
      calcTime = gs > 0 ? (d / gs) * 60 : 0
      solving = 'time'
    } else {
      // All three filled -- treat as informational, recalc distance from GS + time
      calcDist = gs * (t / 60)
      solving = 'distance'
    }

    const fuelUsed = !isNaN(ff) && calcTime > 0 ? ff * (calcTime / 60) : null

    return { distance: calcDist, groundspeed: calcGs, time: calcTime, fuelUsed, solving }
  }, [distance, groundspeed, time, fuelFlow])

  return (
    <div className="space-y-4">
      <p className="text-[10px] font-semibold text-inactive uppercase tracking-wider font-instrument">
        Enter any 2 to calculate the 3rd
      </p>
      <InputField label="Distance" value={distance} onChange={setDistance} unit="NM" placeholder="--" />
      <InputField label="Groundspeed" value={groundspeed} onChange={setGroundspeed} unit="kts" placeholder="--" />
      <InputField label="Time" value={time} onChange={setTime} unit="min" placeholder="--" />

      <div className="pt-2 border-t border-cockpit-border">
        <p className="text-[10px] font-semibold text-inactive uppercase tracking-wider mb-3 font-instrument">Fuel Burn (optional)</p>
        <InputField label="Fuel Flow" value={fuelFlow} onChange={setFuelFlow} unit="gal/hr" placeholder="0" />
      </div>

      {results && (
        <div className="rounded-2xl bg-gradient-to-br from-cockpit-surface to-cockpit-surface border border-cockpit-border p-4">
          <p className="text-[10px] font-semibold text-inactive uppercase tracking-wider mb-2 font-instrument">Results</p>
          <ResultRow
            label="Distance"
            value={fmt(results.distance, 1)}
            unit="NM"
            accent={results.solving === 'distance' ? 'green' : undefined}
          />
          <ResultRow
            label="Groundspeed"
            value={fmt(results.groundspeed, 1)}
            unit="kts"
            accent={results.solving === 'groundspeed' ? 'green' : undefined}
          />
          <ResultRow
            label="Time"
            value={fmt(results.time, 1)}
            unit="min"
            accent={results.solving === 'time' ? 'green' : undefined}
          />
          {results.fuelUsed != null && (
            <ResultRow label="Fuel Used" value={fmt(results.fuelUsed, 1)} unit="gal" accent="amber" />
          )}
        </div>
      )}

      <InfoBox>
        Distance = GS x Time/60. Groundspeed = Distance / (Time/60). Time = (Distance / GS) x 60. Fuel = Flow x Time/60.
      </InfoBox>
    </div>
  )
}

// ── 6. E6B Guide ────────────────────────────────────────────────────────────

function E6BGuide() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-cockpit-surface/60 border border-cockpit-border p-4">
        <h3 className="text-xs font-semibold text-phosphor uppercase tracking-wider mb-2 font-instrument">What is an E6B?</h3>
        <p className="text-xs text-secondary-text leading-relaxed">
          The E6B flight computer is a circular slide rule used by pilots since the 1940s. It has two sides: the wind side
          (a rotating compass card with a sliding grid) and the calculator side (two concentric logarithmic scales). For Part
          107, you may see E6B-style problems involving wind correction, time/speed/distance, and fuel calculations.
        </p>
      </div>

      <div className="rounded-xl bg-cockpit-surface/60 border border-cockpit-border p-4">
        <h3 className="text-xs font-semibold text-phosphor uppercase tracking-wider mb-2 font-instrument">Wind Side</h3>
        <p className="text-xs text-secondary-text leading-relaxed">
          The wind side solves the wind triangle -- the relationship between true course, true heading, wind direction/speed,
          groundspeed, and wind correction angle. You plot the wind vector on a sliding card, then read off the heading
          correction needed to maintain your desired course and the resulting groundspeed.
        </p>
      </div>

      <div className="rounded-xl bg-cockpit-surface/60 border border-cockpit-border p-4">
        <h3 className="text-xs font-semibold text-phosphor uppercase tracking-wider mb-2 font-instrument">Calculator Side</h3>
        <p className="text-xs text-secondary-text leading-relaxed">
          The calculator side handles time/speed/distance problems (e.g., "How long to fly 45 NM at 90 kts?"), fuel burn
          calculations (given flow rate and time), unit conversions, and density altitude/true airspeed corrections. Align
          values on the outer and inner scales to multiply, divide, or convert between units -- the same math this app's
          calculator tabs perform digitally.
        </p>
      </div>

      <InfoBox>
        On the Part 107 exam, E6B questions typically involve finding groundspeed, fuel burn, or estimated time en route.
        The calculator tabs in this app cover these same calculations.
      </InfoBox>
    </div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function Calculator() {
  const [activeTab, setActiveTab] = useState('density')

  return (
    <div className="px-4 py-5">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-body-text">Aviation Calculator</h2>
        <p className="text-xs text-inactive">Part 107 flight calculation tools</p>
      </div>

      {/* Tab bar / segmented control */}
      <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tap-highlight flex-1 min-w-0 py-2.5 px-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap font-instrument ${
              activeTab === tab.id
                ? 'bg-phosphor/15 border border-phosphor/30 text-phosphor'
                : 'bg-cockpit-surface border border-cockpit-border text-secondary-text active:bg-divider'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Calculator cards */}
      <div className="rounded-2xl bg-gradient-to-br from-cockpit-surface to-cockpit-surface border border-cockpit-border p-5">
        {activeTab === 'density' && <DensityAltitude />}
        {activeTab === 'heading' && <MagneticHeading />}
        {activeTab === 'crosswind' && <CrosswindCalc />}
        {activeTab === 'converter' && <UnitConverter />}
        {activeTab === 'tsd' && <TimeSpeedDistance />}
        {activeTab === 'guide' && <E6BGuide />}
      </div>

      {/* Disclaimer */}
      <div className="mt-5 px-4 py-3 rounded-xl bg-cockpit-surface/50 border border-cockpit-border">
        <p className="text-[10px] text-inactive text-center leading-relaxed">
          These calculators use simplified formulas suitable for Part 107 study.
          For actual flight operations, always use official aviation tools and current data.
        </p>
      </div>
    </div>
  )
}
