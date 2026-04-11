import { useState } from 'react'
import scenarios from '../data/scenarios'

export default function ScenarioTrainer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const scenario = scenarios[currentIndex]

  const handleSelect = (optionIndex) => {
    if (selectedOption !== null) return
    setSelectedOption(optionIndex)
    setShowExplanation(true)
    const isCorrect = scenario.options[optionIndex].correct
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }))
  }

  const handleNext = () => {
    setSelectedOption(null)
    setShowExplanation(false)
    setCurrentIndex(i => (i + 1) % scenarios.length)
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setSelectedOption(null)
    setShowExplanation(false)
    setScore({ correct: 0, total: 0 })
  }

  return (
    <div className="px-4 py-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-300">Scenario Trainer</h2>
          <p className="text-xs text-slate-500">Can you fly here? Make the call.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            {score.correct}/{score.total} correct
          </span>
          <button onClick={handleReset} className="text-slate-500 hover:text-slate-300 transition-colors">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 019-9 9 9 0 016.36 2.64M21 12a9 9 0 01-9 9 9 9 0 01-6.36-2.64" />
              <path d="M21 3v6h-6M3 21v-6h6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {scenarios.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i === currentIndex
                ? 'bg-sky-500'
                : i < currentIndex
                ? 'bg-sky-500/30'
                : 'bg-slate-800'
            }`}
          />
        ))}
      </div>

      {/* Scenario Card */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/50 overflow-hidden">
        {/* Title */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold flex items-center justify-center">
              {currentIndex + 1}
            </span>
            <h3 className="text-sm font-semibold text-white">{scenario.title}</h3>
          </div>
        </div>

        {/* Situation */}
        <div className="px-5 pb-4">
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/30">
            <p className="text-sm text-slate-300 leading-relaxed">{scenario.situation}</p>
          </div>
        </div>

        {/* Question */}
        <div className="px-5 pb-3">
          <p className="text-sm font-medium text-sky-400">{scenario.question}</p>
        </div>

        {/* Options */}
        <div className="px-5 pb-5 space-y-2">
          {scenario.options.map((option, i) => {
            let style = 'bg-slate-800/80 border-slate-700/50 text-slate-300 active:bg-slate-700/80'
            if (selectedOption !== null) {
              if (option.correct) {
                style = 'bg-green-500/10 border-green-500/40 text-green-400'
              } else if (i === selectedOption && !option.correct) {
                style = 'bg-red-500/10 border-red-500/40 text-red-400'
              } else {
                style = 'bg-slate-800/40 border-slate-700/30 text-slate-500'
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selectedOption !== null}
                className={`tap-highlight w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${style}`}
              >
                <span className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{option.text}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="border-t border-slate-700/50">
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Explanation</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                {scenario.explanation}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {scenario.references.map((ref, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-amber-400/70">
                    {ref}
                  </span>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <div className="px-5 pb-5">
              <button
                onClick={handleNext}
                className="tap-highlight w-full py-3 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 text-sm font-medium active:bg-sky-500/25 transition-colors"
              >
                Next Scenario →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
