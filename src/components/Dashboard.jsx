import { useMemo } from 'react'

function GaugeArc({ value, size = 120 }) {
  const radius = 45
  const circumference = Math.PI * radius
  const filled = (value / 100) * circumference
  const cx = size / 2
  const cy = size / 2 + 10

  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size * 0.7 }}>
      <path
        d={`M ${cx - radius},${cy} A ${radius},${radius} 0 0,1 ${cx + radius},${cy}`}
        fill="none"
        stroke="#0f2e1c"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d={`M ${cx - radius},${cy} A ${radius},${radius} 0 0,1 ${cx + radius},${cy}`}
        fill="none"
        stroke="#4afc92"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circumference}`}
        style={{
          filter: 'drop-shadow(0 0 6px rgba(74,252,146,0.4))',
          transition: 'stroke-dasharray 0.8s ease-out',
        }}
      />
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fill="#e0fde8"
        fontSize="1.375rem"
        fontWeight="800"
        fontFamily="'Plus Jakarta Sans', sans-serif"
      >
        {Math.round(value)}%
      </text>
      <text
        x={cx}
        y={cy + 8}
        textAnchor="middle"
        fill="#4afc92"
        fontSize="0.5rem"
        fontWeight="700"
        letterSpacing="2"
        fontFamily="'JetBrains Mono', monospace"
      >
        RETENTION
      </text>
    </svg>
  )
}

function CategoryBar({ name, value }) {
  const color = value >= 70 ? '#4afc92' : value >= 50 ? '#fbbf24' : '#f87171'
  return (
    <div className="mb-2 last:mb-0">
      <div className="flex justify-between mb-0.5">
        <span className="text-secondary-text text-[0.6875rem]">{name}</span>
        <span className="font-instrument text-body-text text-[0.6875rem] font-bold">
          {Math.round(value)}%
        </span>
      </div>
      <div className="h-[3px] bg-divider rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${value}%`,
            backgroundColor: color,
            boxShadow: `0 0 6px ${color}66`,
          }}
        />
      </div>
    </div>
  )
}

export default function Dashboard({ retention, progress, categoryRetention, roundScore, roundTotal }) {
  const sortedCategories = useMemo(() => {
    return Object.entries(categoryRetention || {})
      .sort(([, a], [, b]) => a - b)
  }, [categoryRetention])

  return (
    <div className="space-y-4">
      {/* Gauge */}
      <div className="flex justify-center">
        <GaugeArc value={retention} />
      </div>

      {/* Round score (if provided) */}
      {roundScore !== undefined && (
        <div className="text-center">
          <span className="font-instrument text-phosphor text-[0.8125rem] font-bold">
            {roundScore}/{roundTotal} correct
          </span>
        </div>
      )}

      {/* Progress bar */}
      <div className="px-1">
        <div className="flex justify-between mb-1">
          <span className="font-instrument text-phosphor text-[0.5625rem] font-bold tracking-widest">
            PROGRESS
          </span>
          <span className="font-instrument text-body-text text-[0.6875rem] font-bold">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-[3px] bg-divider rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-phosphor transition-all duration-700"
            style={{
              width: `${progress}%`,
              boxShadow: '0 0 6px rgba(74,252,146,0.4)',
            }}
          />
        </div>
      </div>

      {/* Category breakdown */}
      {sortedCategories.length > 0 && (
        <div className="bg-cockpit-surface/60 border border-cockpit-border rounded-xl p-3">
          <div className="font-instrument text-phosphor text-[0.5625rem] font-bold tracking-widest mb-2">
            CATEGORY RETENTION
          </div>
          {sortedCategories.map(([cat, val]) => (
            <CategoryBar key={cat} name={cat} value={val} />
          ))}
        </div>
      )}
    </div>
  )
}
