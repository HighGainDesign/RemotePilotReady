import { useState, useCallback } from 'react'
import chartScenarios from '../data/charts'
import { chartRenderers } from './ChartSvg'

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export default function ChartTrainer() {
  const [activeScenario, setActiveScenario] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [scenarioScore, setScenarioScore] = useState(0)
  const [scenarioComplete, setScenarioComplete] = useState(false)
  const [completedScenarios, setCompletedScenarios] = useState(new Set())

  const scenario = chartScenarios[activeScenario]
  const question = scenario?.questions[questionIndex]
  const ChartSvg = chartRenderers[scenario?.chartType]

  const handleSelectScenario = useCallback((index) => {
    setActiveScenario(index)
    setQuestionIndex(0)
    setSelectedOption(null)
    setShowExplanation(false)
    setScenarioScore(0)
    setScenarioComplete(false)
  }, [])

  const handleAnswer = useCallback((optionIndex) => {
    if (selectedOption !== null) return
    setSelectedOption(optionIndex)
    setShowExplanation(true)
    if (optionIndex === question.correctIndex) {
      setScenarioScore(prev => prev + 1)
    }
  }, [selectedOption, question])

  const handleNextQuestion = useCallback(() => {
    const nextQ = questionIndex + 1
    if (nextQ >= scenario.questions.length) {
      setScenarioComplete(true)
      setCompletedScenarios(prev => new Set([...prev, activeScenario]))
    } else {
      setQuestionIndex(nextQ)
      setSelectedOption(null)
      setShowExplanation(false)
    }
  }, [questionIndex, scenario, activeScenario])

  const handleNextScenario = useCallback(() => {
    const next = (activeScenario + 1) % chartScenarios.length
    handleSelectScenario(next)
  }, [activeScenario, handleSelectScenario])

  const handleReset = useCallback(() => {
    setActiveScenario(0)
    setQuestionIndex(0)
    setSelectedOption(null)
    setShowExplanation(false)
    setScenarioScore(0)
    setScenarioComplete(false)
    setCompletedScenarios(new Set())
  }, [])

  return (
    <div className="px-4 py-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-300">Sectional Chart Trainer</h2>
          <p className="text-xs text-slate-500">Learn to read sectional charts</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            {completedScenarios.size}/{chartScenarios.length} completed
          </span>
          <button onClick={handleReset} className="tap-highlight text-slate-500 hover:text-slate-300 transition-colors">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 019-9 9 9 0 016.36 2.64M21 12a9 9 0 01-9 9 9 9 0 01-6.36-2.64" />
              <path d="M21 3v6h-6M3 21v-6h6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scenario selector — horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4 scrollbar-none">
        {chartScenarios.map((s, i) => {
          const isActive = i === activeScenario
          const isDone = completedScenarios.has(i)
          return (
            <button
              key={s.id}
              onClick={() => handleSelectScenario(i)}
              className={`tap-highlight shrink-0 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                isActive
                  ? 'bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/30 border-sky-500/30'
                  : isDone
                  ? 'bg-green-500/10 text-green-400/70 border-green-500/20'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700/40'
              }`}
            >
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
                {isDone ? '\u2713' : i + 1}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active scenario card */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/50 overflow-hidden">
        {/* Title — hidden until scenario is completed to avoid spoilers */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-full bg-sky-500/15 text-sky-400 text-xs font-bold flex items-center justify-center">
              {activeScenario + 1}
            </span>
            <h3 className="text-sm font-semibold text-white">
              {completedScenarios.has(activeScenario) ? scenario.title : 'Identify the chart symbols below'}
            </h3>
          </div>
          {completedScenarios.has(activeScenario) && (
            <p className="text-xs text-slate-400 leading-relaxed ml-8">{scenario.description}</p>
          )}
        </div>

        {/* SVG Chart illustration */}
        <div className="px-5 pb-4">
          <div className="bg-slate-900/60 rounded-xl border border-slate-700/30 p-3 flex items-center justify-center">
            {ChartSvg && <ChartSvg />}
          </div>
        </div>

        {/* Feature callout pills — only shown after completion */}
        {completedScenarios.has(activeScenario) && (
          <div className="px-5 pb-4">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1.5">Key features</p>
            <div className="flex flex-wrap gap-1.5">
              {scenario.features.map((feat, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400/80 text-[10px] font-medium ring-1 ring-sky-500/20"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quiz or completion */}
        {scenarioComplete ? (
          <div className="border-t border-slate-700/50">
            <div className="px-5 py-5 text-center">
              <div className="text-3xl mb-2">
                {scenarioScore === scenario.questions.length ? '\u2705' : '\u2b50'}
              </div>
              <p className="text-sm font-semibold text-white mb-1">
                Scenario Complete
              </p>
              <p className="text-xs text-slate-400 mb-4">
                {scenarioScore}/{scenario.questions.length} correct
              </p>
              <button
                onClick={handleNextScenario}
                className="tap-highlight w-full py-3 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 text-sm font-medium active:bg-sky-500/25 transition-colors"
              >
                Next Scenario &rarr;
              </button>
            </div>
          </div>
        ) : (
          <div className="border-t border-slate-700/50">
            {/* Question progress */}
            <div className="px-5 pt-4 pb-2 flex items-center justify-between">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Question {questionIndex + 1} of {scenario.questions.length}
              </p>
              <div className="flex gap-1">
                {scenario.questions.map((_, qi) => (
                  <div
                    key={qi}
                    className={`w-1.5 h-1.5 rounded-full ${
                      qi === questionIndex
                        ? 'bg-sky-400'
                        : qi < questionIndex
                        ? 'bg-sky-500/40'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question text */}
            <div className="px-5 pb-3">
              <p className="text-sm font-medium text-sky-400">{question.question}</p>
            </div>

            {/* Options */}
            <div className="px-5 pb-4 space-y-2">
              {question.options.map((opt, i) => {
                let style = 'bg-slate-800 border-slate-700/50 text-slate-200 active:bg-slate-700/80'
                if (selectedOption !== null) {
                  if (i === question.correctIndex) {
                    style = 'bg-green-500/15 border-green-500/40 text-green-400'
                  } else if (i === selectedOption) {
                    style = 'bg-red-500/15 border-red-500/40 text-red-400'
                  } else {
                    style = 'bg-slate-800/40 border-slate-700/30 text-slate-500'
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={selectedOption !== null}
                    className={`tap-highlight w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${style}`}
                  >
                    <span className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="px-5 pb-5">
                <div className="bg-sky-500/5 border border-sky-500/15 rounded-xl p-4 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4m0 4h.01" />
                    </svg>
                    <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Explanation</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{question.explanation}</p>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="tap-highlight w-full py-3 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 text-sm font-medium active:bg-sky-500/25 transition-colors"
                >
                  {questionIndex + 1 < scenario.questions.length ? 'Next Question \u2192' : 'See Results'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
