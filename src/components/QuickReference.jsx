import quickReference from '../data/quickReference'

const iconMap = {
  gauge: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  cloud: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 19a4 4 0 01-.88-7.9A5.5 5.5 0 0115.9 8 3.5 3.5 0 0118 15h-1.5" />
      <path d="M6 19h12" />
    </svg>
  ),
  airspace: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 20h18M7 16l5-12 5 12" />
      <path d="M9.5 11h5" />
    </svg>
  ),
  moon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  ),
  people: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      <circle cx="17" cy="10" r="2" />
      <path d="M21 21v-1.5a3 3 0 00-3-3h-.5" />
    </svg>
  ),
  pilot: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0113 0" />
      <path d="M8 7h8" />
    </svg>
  ),
  report: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16v16H4z" rx="2" />
      <path d="M8 8h8M8 12h6M8 16h4" />
    </svg>
  ),
  prohibition: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M5.5 5.5l13 13" />
    </svg>
  ),
  broadcast: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="2" />
      <path d="M8.5 8.5a5 5 0 017 0M5.5 5.5a9 9 0 0113 0" />
      <path d="M8.5 15.5a5 5 0 007 0M5.5 18.5a9 9 0 0013 0" />
    </svg>
  ),
}

const accentColors = [
  'from-phosphor/10 to-phosphor/5 border-phosphor/20',
  'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20',
  'from-amber-accent/10 to-amber-accent/5 border-amber-accent/20',
  'from-violet-500/10 to-violet-600/5 border-violet-500/20',
  'from-rose-500/10 to-rose-600/5 border-rose-500/20',
  'from-cyan-500/10 to-cyan-600/5 border-cyan-500/20',
  'from-orange-500/10 to-orange-600/5 border-orange-500/20',
  'from-pink-500/10 to-pink-600/5 border-pink-500/20',
  'from-teal-500/10 to-teal-600/5 border-teal-500/20',
]

const textColors = [
  'text-phosphor',
  'text-emerald-400',
  'text-amber-accent',
  'text-violet-400',
  'text-rose-400',
  'text-cyan-400',
  'text-orange-400',
  'text-pink-400',
  'text-teal-400',
]

export default function QuickReference() {
  return (
    <div className="px-4 py-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-body-text">Quick Reference</h2>
        <p className="text-xs text-inactive">Key numbers and limits for Part 107</p>
      </div>

      <div className="space-y-4">
        {quickReference.map((section, si) => (
          <div
            key={si}
            className={`rounded-2xl bg-gradient-to-br ${accentColors[si % accentColors.length]} border p-5`}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className={textColors[si % textColors.length]}>
                {iconMap[section.icon] || iconMap.gauge}
              </span>
              <h3 className={`text-sm font-semibold font-instrument ${textColors[si % textColors.length]}`}>{section.title}</h3>
            </div>

            <div className="space-y-0">
              {section.items.map((item, ii) => (
                <div
                  key={ii}
                  className={`flex items-start justify-between py-2.5 ${
                    ii !== section.items.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <p className="text-xs text-secondary-text">{item.label}</p>
                    {item.note && (
                      <p className="text-[10px] text-inactive mt-0.5">{item.note}</p>
                    )}
                  </div>
                  <span className={`text-sm font-semibold font-instrument ${textColors[si % textColors.length]} text-right whitespace-nowrap`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 px-4 py-3 rounded-xl bg-cockpit-surface/50 border border-cockpit-border">
        <p className="text-[10px] text-inactive text-center leading-relaxed">
          Based on 14 CFR Part 107 regulations. Always verify current regulations
          before flight operations. This app is a study aid and not a substitute
          for official FAA materials.
        </p>
      </div>
    </div>
  )
}
