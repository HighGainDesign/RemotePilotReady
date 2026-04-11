import { useState } from 'react'
import metarExamples from '../data/metars'

export default function MetarDecoder() {
  const [mode, setMode] = useState('practice') // 'practice' | 'decode'
  const [currentExample, setCurrentExample] = useState(0)
  const [expandedField, setExpandedField] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [customMetar, setCustomMetar] = useState('')
  const [decodedCustom, setDecodedCustom] = useState(null)

  const example = metarExamples[currentExample]

  const handleQuizAnswer = (questionIndex, answer) => {
    if (quizAnswers[`${currentExample}-${questionIndex}`]) return
    setQuizAnswers(prev => ({
      ...prev,
      [`${currentExample}-${questionIndex}`]: answer
    }))
  }

  const decodeMetar = (raw) => {
    const parts = raw.trim().split(/\s+/)
    const decoded = []

    for (let i = 0; i < parts.length; i++) {
      const p = parts[i]

      // Station ID (4 letter ICAO)
      if (i === 0 && /^[A-Z]{4}$/.test(p)) {
        decoded.push({ field: p, label: "Station ID", explanation: `ICAO identifier: ${p}` })
        continue
      }

      // Date/Time
      if (/^\d{6}Z$/.test(p)) {
        const day = p.slice(0, 2)
        const hour = p.slice(2, 4)
        const min = p.slice(4, 6)
        decoded.push({ field: p, label: "Date/Time", explanation: `Day ${day} at ${hour}:${min} Zulu (UTC)` })
        continue
      }

      // Wind
      if (/^\d{5}(G\d{2,3})?KT$/.test(p) || p === '00000KT') {
        if (p === '00000KT') {
          decoded.push({ field: p, label: "Wind", explanation: "Calm wind" })
        } else {
          const dir = p.slice(0, 3)
          const speed = p.slice(3, 5)
          const gustMatch = p.match(/G(\d{2,3})/)
          let exp = `Wind from ${dir}° at ${speed} knots`
          if (gustMatch) exp += `, gusting to ${gustMatch[1]} knots`
          decoded.push({ field: p, label: "Wind", explanation: exp })
        }
        continue
      }

      // Variable wind direction
      if (/^\d{3}V\d{3}$/.test(p)) {
        decoded.push({ field: p, label: "Variable Wind", explanation: `Wind direction variable between ${p.slice(0, 3)}° and ${p.slice(4)}°` })
        continue
      }

      // Visibility
      if (/^\d+SM$/.test(p) || /^\d+\/\d+SM$/.test(p)) {
        decoded.push({ field: p, label: "Visibility", explanation: `${p.replace('SM', '')} statute miles visibility` })
        continue
      }

      // Runway visual range
      if (/^R\d{2}/.test(p)) {
        decoded.push({ field: p, label: "RVR", explanation: `Runway visual range: ${p}` })
        continue
      }

      // Weather phenomena
      const wxCodes = {
        'RA': 'Rain', '-RA': 'Light rain', '+RA': 'Heavy rain',
        'SN': 'Snow', '-SN': 'Light snow', '+SN': 'Heavy snow',
        'FG': 'Fog', 'BR': 'Mist', 'HZ': 'Haze',
        'TS': 'Thunderstorm', '+TS': 'Severe thunderstorm',
        'TSRA': 'Thunderstorm with rain',
        'DZ': 'Drizzle', '-DZ': 'Light drizzle',
        'FU': 'Smoke', 'VA': 'Volcanic ash',
        'SQ': 'Squall', 'FC': 'Funnel cloud',
        'GR': 'Hail', 'GS': 'Small hail',
        'FZRA': 'Freezing rain', 'FZDZ': 'Freezing drizzle',
        'BLSN': 'Blowing snow', 'DRSN': 'Drifting snow',
        'PL': 'Ice pellets', 'SH': 'Showers',
        '-SHRA': 'Light rain showers', 'SHRA': 'Rain showers',
      }
      if (wxCodes[p]) {
        decoded.push({ field: p, label: "Weather", explanation: wxCodes[p] })
        continue
      }

      // Cloud layers
      if (/^(FEW|SCT|BKN|OVC|CLR|SKC|VV)\d{3}/.test(p)) {
        const coverMap = {
          'FEW': 'Few (1-2 oktas)',
          'SCT': 'Scattered (3-4 oktas)',
          'BKN': 'Broken (5-7 oktas)',
          'OVC': 'Overcast (8 oktas)',
          'VV': 'Vertical visibility (sky obscured)'
        }
        if (p === 'CLR' || p === 'SKC') {
          decoded.push({ field: p, label: "Clouds", explanation: "Clear skies" })
        } else {
          const type = p.match(/^(FEW|SCT|BKN|OVC|VV)/)[1]
          const alt = parseInt(p.slice(type.length, type.length + 3)) * 100
          decoded.push({ field: p, label: "Clouds", explanation: `${coverMap[type]} at ${alt.toLocaleString()} feet AGL` })
        }
        continue
      }
      if (p === 'CLR' || p === 'SKC') {
        decoded.push({ field: p, label: "Clouds", explanation: "Clear skies" })
        continue
      }

      // Temperature/Dewpoint
      if (/^M?\d{2}\/M?\d{2}$/.test(p)) {
        const [temp, dew] = p.split('/')
        const tVal = temp.startsWith('M') ? `-${temp.slice(1)}` : temp
        const dVal = dew.startsWith('M') ? `-${dew.slice(1)}` : dew
        const spread = parseInt(tVal) - parseInt(dVal)
        decoded.push({ field: p, label: "Temp/Dewpoint", explanation: `Temperature ${tVal}°C, dewpoint ${dVal}°C (spread: ${spread}°C)` })
        continue
      }

      // Altimeter
      if (/^A\d{4}$/.test(p)) {
        const val = p.slice(1, 3) + '.' + p.slice(3)
        decoded.push({ field: p, label: "Altimeter", explanation: `Altimeter setting ${val} inches of mercury` })
        continue
      }

      // Remarks section
      if (p === 'RMK') {
        decoded.push({ field: 'RMK...', label: "Remarks", explanation: "Remarks section follows — contains supplementary information" })
        break
      }

      // Catch-all
      decoded.push({ field: p, label: "Other", explanation: p })
    }

    return decoded
  }

  const handleCustomDecode = () => {
    if (!customMetar.trim()) return
    setDecodedCustom(decodeMetar(customMetar))
  }

  return (
    <div className="px-4 py-5">
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setMode('practice')}
          className={`tap-highlight flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            mode === 'practice'
              ? 'bg-sky-500/15 border border-sky-500/30 text-sky-400'
              : 'bg-slate-800 border border-slate-700/50 text-slate-400 active:bg-slate-700'
          }`}
        >
          Practice METARs
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`tap-highlight flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            mode === 'decode'
              ? 'bg-sky-500/15 border border-sky-500/30 text-sky-400'
              : 'bg-slate-800 border border-slate-700/50 text-slate-400 active:bg-slate-700'
          }`}
        >
          Decode Your Own
        </button>
      </div>

      {mode === 'decode' ? (
        /* Custom Decoder */
        <div>
          <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/50 p-5">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Paste a METAR
            </label>
            <textarea
              value={customMetar}
              onChange={e => setCustomMetar(e.target.value.toUpperCase())}
              placeholder="KJFK 121856Z 31012G20KT 10SM FEW045..."
              className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono placeholder-slate-600 focus:outline-none focus:border-sky-500/50 resize-none"
              rows={3}
            />
            <button
              onClick={handleCustomDecode}
              className="tap-highlight w-full mt-3 py-3 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 text-sm font-medium active:bg-sky-500/25 transition-colors"
            >
              Decode METAR
            </button>
          </div>

          {decodedCustom && (
            <div className="mt-4 space-y-2">
              {decodedCustom.map((item, i) => (
                <div key={i} className="rounded-xl bg-slate-800/80 border border-slate-700/30 p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sky-400 text-sm font-mono font-semibold">{item.field}</code>
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{item.label}</span>
                  </div>
                  <p className="text-xs text-slate-400">{item.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Practice Mode */
        <div>
          {/* Example Selector */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
            {metarExamples.map((ex, i) => (
              <button
                key={i}
                onClick={() => { setCurrentExample(i); setExpandedField(null) }}
                className={`tap-highlight px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  i === currentExample
                    ? 'bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/30'
                    : 'bg-slate-800 text-slate-400 active:bg-slate-700'
                }`}
              >
                {ex.breakdown[0].field}
              </button>
            ))}
          </div>

          {/* Raw METAR */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/50 p-5 mb-4">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Raw METAR</p>
            <p className="text-sm font-mono text-sky-300 leading-relaxed break-all">{example.raw}</p>
          </div>

          {/* Breakdown */}
          <div className="space-y-2 mb-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Field Breakdown</p>
            {example.breakdown.map((item, i) => (
              <button
                key={i}
                onClick={() => setExpandedField(expandedField === i ? null : i)}
                className="tap-highlight w-full text-left rounded-xl bg-slate-800/80 border border-slate-700/30 p-3.5 transition-colors active:bg-slate-700/60"
              >
                <div className="flex items-center justify-between">
                  <code className="text-sky-400 text-sm font-mono font-semibold">{item.field}</code>
                  <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{item.label}</span>
                </div>
                {expandedField === i && (
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">{item.explanation}</p>
                )}
              </button>
            ))}
          </div>

          {/* Quiz */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 border border-amber-500/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v.01M12 8a2.5 2.5 0 011.13 4.73c-.42.25-.77.6-.97 1.02A1.5 1.5 0 0012 15" />
              </svg>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Quiz</span>
            </div>
            <div className="space-y-5">
              {example.questions.map((q, qi) => {
                const answerKey = `${currentExample}-${qi}`
                const userAnswer = quizAnswers[answerKey]
                return (
                  <div key={qi}>
                    <p className="text-sm text-slate-200 font-medium mb-2">{q.question}</p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, oi) => {
                        let style = 'bg-slate-900/60 border-slate-700/50 text-slate-300 active:bg-slate-800'
                        if (userAnswer) {
                          if (opt === q.answer) {
                            style = 'bg-green-500/10 border-green-500/40 text-green-400'
                          } else if (opt === userAnswer && opt !== q.answer) {
                            style = 'bg-red-500/10 border-red-500/40 text-red-400'
                          } else {
                            style = 'bg-slate-900/30 border-slate-700/30 text-slate-600'
                          }
                        }
                        return (
                          <button
                            key={oi}
                            onClick={() => handleQuizAnswer(qi, opt)}
                            disabled={!!userAnswer}
                            className={`tap-highlight w-full text-left px-3 py-2.5 rounded-lg border text-xs transition-all ${style}`}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
