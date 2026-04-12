import { useState, useCallback } from 'react'

export default function RoundEngine({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  categoryLabel,
  contextElement,
}) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const isAnswered = selectedIndex !== null
  const isCorrect = selectedIndex === question.correctIndex

  const handleSelect = useCallback((index) => {
    if (isAnswered) return
    setSelectedIndex(index)
    onAnswer(index === question.correctIndex)
  }, [isAnswered, question.correctIndex, onAnswer])

  const handleNext = useCallback(() => {
    setSelectedIndex(null)
    onNext()
  }, [onNext])

  const letters = ['A', 'B', 'C', 'D']

  return (
    <div>
      {/* Round progress */}
      <div className="flex items-center gap-2 mb-2">
        <span className="font-instrument text-phosphor text-[0.5625rem] font-extrabold tracking-[0.15em] glow-phosphor-text">
          RND {String(questionNumber).padStart(2, '0')}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-phosphor/15 to-transparent" />
        <span className="font-instrument text-inactive text-[0.5625rem]">
          {String(questionNumber).padStart(2, '0')}/{String(totalQuestions).padStart(2, '0')}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] bg-divider rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-phosphor rounded-full transition-all duration-300"
          style={{
            width: `${(questionNumber / totalQuestions) * 100}%`,
            boxShadow: '0 0 8px rgba(74,252,146,0.4)',
          }}
        />
      </div>

      {/* Context element (chart, METAR, scenario) */}
      {contextElement && (
        <div className="mb-3">
          {contextElement}
        </div>
      )}

      {/* Question card */}
      <div className="bg-phosphor/[0.02] border border-cockpit-border rounded-xl p-4 mb-3" style={{ backdropFilter: 'blur(2px)' }}>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-phosphor" style={{ boxShadow: '0 0 6px rgba(74,252,146,0.5)' }} />
          <span className="font-instrument text-phosphor text-[0.5625rem] font-bold tracking-[0.15em]">
            {categoryLabel}
          </span>
        </div>
        <p className="text-body-text text-[0.875rem] font-semibold leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-1.5 mb-3">
        {question.options.map((opt, i) => {
          let borderClass = 'border-cockpit-border'
          let bgClass = 'bg-cockpit-surface/60'
          let textClass = 'text-secondary-text'
          let letterBg = 'bg-divider'
          let letterColor = 'text-inactive'
          let extraStyle = {}
          let icon = null

          if (isAnswered) {
            if (i === question.correctIndex) {
              borderClass = 'border-phosphor/40'
              bgClass = 'bg-phosphor/[0.08]'
              textClass = 'text-[#bbf7d0]'
              letterBg = 'bg-phosphor/20'
              letterColor = 'text-phosphor'
              extraStyle = { borderWidth: '2px' }
              icon = '✓'
            } else if (i === selectedIndex) {
              borderClass = 'border-red-accent/40'
              bgClass = 'bg-red-accent/[0.08]'
              textClass = 'text-red-300'
              letterBg = 'bg-red-accent/20'
              letterColor = 'text-red-accent'
              extraStyle = { borderWidth: '2px', borderStyle: 'dashed' }
              icon = '✗'
            } else {
              textClass = 'text-inactive'
              letterColor = 'text-inactive/50'
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isAnswered}
              aria-label={`Option ${letters[i]}: ${opt}`}
              className={`tap-highlight w-full text-left px-3 py-2.5 rounded-[0.625rem] border ${borderClass} ${bgClass} ${textClass} text-[0.8125rem] transition-all flex items-center gap-2.5`}
              style={{ backdropFilter: 'blur(2px)', ...extraStyle }}
            >
              <span className={`w-[1.375rem] h-[1.375rem] rounded-[0.4375rem] ${letterBg} flex items-center justify-center text-[0.625rem] font-extrabold ${letterColor} font-instrument shrink-0`}>
                {icon || letters[i]}
              </span>
              <span className={isAnswered && i === question.correctIndex ? 'font-semibold' : ''}>
                {opt}
              </span>
            </button>
          )
        })}
      </div>

      {/* Explanation (after answering) */}
      {isAnswered && (
        <div className={`mb-3 ${isCorrect ? 'animate-pulse-glow' : 'animate-shake'}`}>
          <div className="bg-phosphor/[0.03] border border-phosphor/10 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="font-instrument text-phosphor text-[0.5625rem] font-bold tracking-widest">
                EXPLANATION
              </span>
            </div>
            <p className="text-secondary-text text-[0.8125rem] leading-relaxed">
              {question.explanation}
            </p>
            {question.reference && (
              <p className="font-instrument text-amber-accent/70 text-[0.6875rem] mt-1.5">
                {question.reference}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Next button */}
      {isAnswered && (
        <button
          onClick={handleNext}
          className="tap-highlight w-full py-3 rounded-xl bg-phosphor/10 border border-phosphor/25 text-phosphor text-[0.875rem] font-semibold active:bg-phosphor/15 transition-colors glow-phosphor"
        >
          {questionNumber < totalQuestions ? 'Next Question →' : 'See Results'}
        </button>
      )}
    </div>
  )
}
