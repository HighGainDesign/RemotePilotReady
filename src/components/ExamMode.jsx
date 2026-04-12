import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { chartRenderers } from './ChartSvg'
import { loadState, saveState, removeState, KEYS } from '../lib/storage'
import { getQuestionData, getTotalQuestions } from '../lib/question-data'
import { getQuestionIds as getFlashcardIds } from '../data/flashcards'
import { getQuestionIds as getScenarioIds } from '../data/scenarios'
import { getQuestionIds as getChartIds } from '../data/charts'
import { getQuestionIds as getMetarIds } from '../data/metars'
import { calcProgress } from '../lib/spaced-repetition'

const EXAM_DURATION = 2 * 60 * 60 * 1000 // 2 hours in ms
const EXAM_SIZE = 60
const PASS_THRESHOLD = 0.7

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function formatTime(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function QuestionContext({ context }) {
  if (!context) return null

  if (context.type === 'scenario') {
    return (
      <div className="mb-4 p-3 rounded-lg bg-cockpit-bg/50 border border-cockpit-border">
        <div className="font-instrument text-phosphor text-[0.625rem] tracking-widest mb-1">{context.title}</div>
        <p className="text-secondary-text text-[0.8125rem] leading-relaxed">{context.situation}</p>
      </div>
    )
  }

  if (context.type === 'chart') {
    const Renderer = chartRenderers[context.chartType]
    if (!Renderer) return null
    return (
      <div className="mb-4 rounded-lg overflow-hidden border border-cockpit-border">
        <Renderer />
      </div>
    )
  }

  if (context.type === 'metar') {
    return (
      <div className="mb-4 p-3 rounded-lg bg-cockpit-bg/50 border border-cockpit-border">
        <div className="font-instrument text-phosphor text-[0.625rem] tracking-widest mb-1">METAR</div>
        <code className="text-body-text text-[0.8125rem] font-mono">{context.raw}</code>
      </div>
    )
  }

  return null
}

// --- Setup Screen ---
function SetupScreen({ onBegin }) {
  const questionStates = loadState(KEYS.QUESTIONS, {})
  const total = getTotalQuestions()
  const progress = calcProgress(questionStates, total)
  const examHistory = loadState(KEYS.EXAM_HISTORY, [])
  const lastExam = examHistory.length > 0 ? examHistory[examHistory.length - 1] : null

  return (
    <div className="px-4 py-12 text-center">
      <div className="font-instrument text-phosphor text-[0.6875rem] font-bold tracking-widest mb-4 glow-phosphor-text">
        PRACTICE EXAM
      </div>
      <p className="text-body-text text-[0.9375rem] mb-1 font-medium">60 questions · 2 hours · 70% to pass</p>
      <p className="text-secondary-text text-[0.8125rem] mb-6">
        Simulates the FAA Part 107 knowledge test
      </p>

      {lastExam && (
        <div className="mb-4 p-3 rounded-lg bg-cockpit-surface border border-cockpit-border inline-block">
          <span className="text-secondary-text text-[0.75rem]">Last score: </span>
          <span className={`font-instrument text-[0.875rem] font-bold ${lastExam.passed ? 'text-phosphor' : 'text-[#f87171]'}`}>
            {Math.round((lastExam.score / lastExam.total) * 100)}%
          </span>
        </div>
      )}

      {progress < 50 && (
        <div className="mb-6 p-3 rounded-lg bg-[#78350f]/20 border border-[#f59e0b]/30 text-[#fbbf24] text-[0.8125rem]">
          You've covered {Math.round(progress)}% of the material. Consider studying more before taking a practice exam.
        </div>
      )}

      <button
        onClick={onBegin}
        className="px-8 py-3 rounded-lg bg-phosphor/10 border-2 border-phosphor text-phosphor font-instrument font-bold tracking-wider text-[0.875rem] hover:bg-phosphor/20 active:bg-phosphor/30 transition-colors glow-phosphor"
      >
        BEGIN EXAM
      </button>
    </div>
  )
}

// --- Dot Navigator ---
function DotNavigator({ questionIds, answers, flagged, currentIndex, onJump }) {
  return (
    <div className="flex flex-wrap gap-1.5 justify-center px-2 py-3">
      {questionIds.map((id, i) => {
        const isAnswered = answers[id] != null
        const isFlagged = flagged.has(id)
        const isCurrent = i === currentIndex
        return (
          <button
            key={id}
            onClick={() => onJump(i)}
            className={`w-5 h-5 rounded-full text-[0.5rem] font-mono flex items-center justify-center transition-all relative
              ${isCurrent ? 'ring-2 ring-phosphor ring-offset-1 ring-offset-cockpit-bg' : ''}
              ${isAnswered ? 'bg-phosphor/80 text-cockpit-bg' : 'bg-cockpit-surface border border-cockpit-border text-inactive'}
            `}
            title={`Q${i + 1}${isFlagged ? ' (flagged)' : ''}${isAnswered ? ' (answered)' : ''}`}
          >
            {isFlagged && (
              <span className="absolute -top-0.5 -right-0.5 text-[0.4rem] text-[#f59e0b]">⚑</span>
            )}
            {i + 1}
          </button>
        )
      })}
    </div>
  )
}

// --- Exam Screen ---
function ExamScreen({ questionIds, answers, setAnswers, flagged, setFlagged, currentIndex, setCurrentIndex, timeRemaining, onReview }) {
  const qId = questionIds[currentIndex]
  const qData = getQuestionData(qId)
  const selectedOption = answers[qId] ?? null
  const isFlagged = flagged.has(qId)
  const [showNav, setShowNav] = useState(false)

  const answeredCount = Object.keys(answers).length
  const flaggedCount = flagged.size

  const selectOption = (idx) => {
    setAnswers(prev => ({ ...prev, [qId]: idx }))
  }

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(qId)) next.delete(qId)
      else next.add(qId)
      return next
    })
  }

  if (!qData) return <div className="p-4 text-inactive">Question not found</div>

  const letters = ['A', 'B', 'C', 'D']

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-cockpit-border bg-cockpit-surface/50">
        <span className="font-mono text-secondary-text text-[0.75rem]">
          {formatTime(timeRemaining)}
        </span>
        <span className="font-instrument text-body-text text-[0.75rem] font-semibold tracking-wider">
          Q {currentIndex + 1}/{EXAM_SIZE}
        </span>
        <button
          onClick={() => setShowNav(v => !v)}
          className="font-mono text-secondary-text text-[0.6875rem] px-2 py-1 rounded border border-cockpit-border hover:text-phosphor"
        >
          {answeredCount}/{EXAM_SIZE} · ⚑{flaggedCount}
        </button>
      </div>

      {/* Navigator panel */}
      {showNav && (
        <div className="border-b border-cockpit-border bg-cockpit-surface/30">
          <DotNavigator
            questionIds={questionIds}
            answers={answers}
            flagged={flagged}
            currentIndex={currentIndex}
            onJump={(i) => { setCurrentIndex(i); setShowNav(false) }}
          />
        </div>
      )}

      {/* Question content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <QuestionContext context={qData.context} />
        <p className="text-body-text text-[0.9375rem] leading-relaxed mb-5">{qData.question}</p>

        <div className="space-y-2">
          {qData.options.map((opt, idx) => {
            const isSelected = selectedOption === idx
            return (
              <button
                key={idx}
                onClick={() => selectOption(idx)}
                className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-colors
                  ${isSelected
                    ? 'border-phosphor bg-phosphor/10 text-body-text'
                    : 'border-cockpit-border bg-cockpit-surface/30 text-secondary-text hover:border-secondary-text'
                  }`}
              >
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[0.75rem] font-bold border
                  ${isSelected ? 'bg-phosphor text-cockpit-bg border-phosphor' : 'border-cockpit-border text-inactive'}`}>
                  {letters[idx]}
                </span>
                <span className="text-[0.875rem] leading-relaxed pt-0.5">{opt}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-cockpit-border bg-cockpit-surface/50">
        <button
          onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-lg border border-cockpit-border text-secondary-text text-[0.8125rem] font-instrument disabled:text-divider disabled:border-divider disabled:cursor-not-allowed hover:text-body-text"
        >
          PREV
        </button>

        <button
          onClick={toggleFlag}
          className={`px-3 py-2 rounded-lg border text-[0.8125rem] font-instrument transition-colors
            ${isFlagged ? 'border-[#f59e0b] text-[#f59e0b] bg-[#f59e0b]/10' : 'border-cockpit-border text-inactive hover:text-[#f59e0b]'}`}
        >
          ⚑ FLAG
        </button>

        {currentIndex === EXAM_SIZE - 1 ? (
          <button
            onClick={onReview}
            className="px-4 py-2 rounded-lg border-2 border-phosphor text-phosphor text-[0.8125rem] font-instrument font-bold hover:bg-phosphor/10"
          >
            REVIEW
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(i => Math.min(EXAM_SIZE - 1, i + 1))}
            className="px-4 py-2 rounded-lg border border-cockpit-border text-secondary-text text-[0.8125rem] font-instrument hover:text-body-text"
          >
            NEXT
          </button>
        )}
      </div>
    </div>
  )
}

// --- Review Screen ---
function ReviewScreen({ questionIds, answers, flagged, onSubmit, onContinue }) {
  const unanswered = questionIds.filter(id => answers[id] == null).length
  const flaggedCount = flagged.size

  return (
    <div className="px-4 py-8">
      <div className="font-instrument text-phosphor text-[0.6875rem] font-bold tracking-widest mb-4 glow-phosphor-text text-center">
        REVIEW BEFORE SUBMIT
      </div>

      {(unanswered > 0 || flaggedCount > 0) && (
        <div className="mb-4 p-3 rounded-lg bg-[#78350f]/20 border border-[#f59e0b]/30 text-[#fbbf24] text-[0.8125rem] text-center">
          {unanswered > 0 && <span>You have {unanswered} unanswered question{unanswered !== 1 ? 's' : ''}</span>}
          {unanswered > 0 && flaggedCount > 0 && <span> and </span>}
          {flaggedCount > 0 && <span>{flaggedCount} flagged question{flaggedCount !== 1 ? 's' : ''}</span>}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 justify-center mb-6">
        {questionIds.map((id, i) => {
          const isAnswered = answers[id] != null
          const isFlagged = flagged.has(id)
          return (
            <div
              key={id}
              className={`w-6 h-6 rounded text-[0.5rem] font-mono flex items-center justify-center relative
                ${isAnswered ? 'bg-phosphor/80 text-cockpit-bg' : 'bg-cockpit-surface border border-[#f87171]/50 text-[#f87171]'}
              `}
            >
              {isFlagged && (
                <span className="absolute -top-0.5 -right-0.5 text-[0.4rem] text-[#f59e0b]">⚑</span>
              )}
              {i + 1}
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-3 items-center">
        <button
          onClick={onSubmit}
          className="px-8 py-3 rounded-lg bg-phosphor/10 border-2 border-phosphor text-phosphor font-instrument font-bold tracking-wider text-[0.875rem] hover:bg-phosphor/20 active:bg-phosphor/30 transition-colors glow-phosphor"
        >
          SUBMIT EXAM
        </button>
        <button
          onClick={onContinue}
          className="px-6 py-2 rounded-lg border border-cockpit-border text-secondary-text font-instrument text-[0.8125rem] hover:text-body-text"
        >
          CONTINUE REVIEWING
        </button>
      </div>
    </div>
  )
}

// --- Results Screen ---
function ResultsScreen({ examResult, questionIds, onReset }) {
  const [reviewIndex, setReviewIndex] = useState(null)
  const percent = Math.round((examResult.score / examResult.total) * 100)

  if (reviewIndex !== null) {
    const qId = questionIds[reviewIndex]
    const qData = getQuestionData(qId)
    const userAnswer = examResult.answers[qId]
    const letters = ['A', 'B', 'C', 'D']

    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-2 border-b border-cockpit-border bg-cockpit-surface/50">
          <span className="font-instrument text-secondary-text text-[0.75rem]">
            Review Q{reviewIndex + 1}/{EXAM_SIZE}
          </span>
          <button
            onClick={() => setReviewIndex(null)}
            className="text-phosphor text-[0.75rem] font-instrument"
          >
            BACK TO RESULTS
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {qData && (
            <>
              <QuestionContext context={qData.context} />
              <p className="text-body-text text-[0.9375rem] leading-relaxed mb-4">{qData.question}</p>

              <div className="space-y-2 mb-4">
                {qData.options.map((opt, idx) => {
                  const isCorrect = idx === qData.correctIndex
                  const isUserAnswer = idx === userAnswer
                  const isWrong = isUserAnswer && !isCorrect
                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 p-3 rounded-lg border
                        ${isCorrect ? 'border-phosphor bg-phosphor/10' : ''}
                        ${isWrong ? 'border-[#f87171] bg-[#f87171]/10' : ''}
                        ${!isCorrect && !isWrong ? 'border-cockpit-border bg-cockpit-surface/30' : ''}
                      `}
                    >
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[0.75rem] font-bold border
                        ${isCorrect ? 'bg-phosphor text-cockpit-bg border-phosphor' : ''}
                        ${isWrong ? 'bg-[#f87171] text-cockpit-bg border-[#f87171]' : ''}
                        ${!isCorrect && !isWrong ? 'border-cockpit-border text-inactive' : ''}
                      `}>
                        {letters[idx]}
                      </span>
                      <span className={`text-[0.875rem] leading-relaxed pt-0.5
                        ${isCorrect ? 'text-phosphor' : isWrong ? 'text-[#f87171]' : 'text-secondary-text'}
                      `}>{opt}</span>
                    </div>
                  )
                })}
              </div>

              {qData.explanation && (
                <div className="p-3 rounded-lg bg-cockpit-surface border border-cockpit-border">
                  <div className="font-instrument text-phosphor text-[0.625rem] tracking-widest mb-1">EXPLANATION</div>
                  <p className="text-secondary-text text-[0.8125rem] leading-relaxed">{qData.explanation}</p>
                  {qData.reference && (
                    <p className="text-inactive text-[0.6875rem] mt-2">{qData.reference}</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-cockpit-border bg-cockpit-surface/50">
          <button
            onClick={() => setReviewIndex(i => Math.max(0, i - 1))}
            disabled={reviewIndex === 0}
            className="px-4 py-2 rounded-lg border border-cockpit-border text-secondary-text text-[0.8125rem] font-instrument disabled:text-divider disabled:border-divider disabled:cursor-not-allowed"
          >
            PREV
          </button>
          <button
            onClick={() => setReviewIndex(i => Math.min(EXAM_SIZE - 1, i + 1))}
            disabled={reviewIndex === EXAM_SIZE - 1}
            className="px-4 py-2 rounded-lg border border-cockpit-border text-secondary-text text-[0.8125rem] font-instrument disabled:text-divider disabled:border-divider disabled:cursor-not-allowed"
          >
            NEXT
          </button>
        </div>
      </div>
    )
  }

  // Category breakdown
  const categoryScores = examResult.categoryScores || {}

  return (
    <div className="px-4 py-8">
      <div className={`text-center mb-6 ${examResult.passed ? '' : ''}`}>
        <div className={`font-instrument text-[1.5rem] font-extrabold tracking-wider mb-1
          ${examResult.passed ? 'text-phosphor glow-phosphor-text' : 'text-[#f87171]'}`}>
          {examResult.passed ? 'PASSED' : 'FAILED'}
        </div>
        <div className={`font-mono text-[2rem] font-bold ${examResult.passed ? 'text-phosphor' : 'text-[#f87171]'}`}>
          {percent}%
        </div>
        <p className="text-secondary-text text-[0.8125rem] mt-1">
          {examResult.score}/{examResult.total} correct · 70% required
        </p>
      </div>

      {/* Category breakdown */}
      {Object.keys(categoryScores).length > 0 && (
        <div className="mb-6">
          <div className="font-instrument text-secondary-text text-[0.625rem] tracking-widest mb-2">CATEGORY BREAKDOWN</div>
          <div className="space-y-2">
            {Object.entries(categoryScores)
              .sort((a, b) => a[1].percent - b[1].percent)
              .map(([cat, data]) => (
                <div key={cat} className="flex items-center gap-2">
                  <span className="text-secondary-text text-[0.75rem] flex-1 truncate">{cat}</span>
                  <div className="w-24 h-1.5 rounded-full bg-cockpit-surface overflow-hidden">
                    <div
                      className={`h-full rounded-full ${data.percent >= 70 ? 'bg-phosphor' : 'bg-[#f87171]'}`}
                      style={{ width: `${data.percent}%` }}
                    />
                  </div>
                  <span className={`font-mono text-[0.6875rem] w-8 text-right ${data.percent >= 70 ? 'text-phosphor' : 'text-[#f87171]'}`}>
                    {Math.round(data.percent)}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 items-center">
        <button
          onClick={() => setReviewIndex(0)}
          className="px-6 py-2 rounded-lg border border-cockpit-border text-secondary-text font-instrument text-[0.8125rem] hover:text-body-text"
        >
          REVIEW ANSWERS
        </button>
        <button
          onClick={onReset}
          className="px-6 py-2 rounded-lg border border-phosphor text-phosphor font-instrument text-[0.8125rem] hover:bg-phosphor/10"
        >
          NEW EXAM
        </button>
      </div>
    </div>
  )
}

// --- Main ExamMode Component ---
export default function ExamMode() {
  const [screen, setScreen] = useState('setup')
  const [questionIds, setQuestionIds] = useState([])
  const [answers, setAnswers] = useState({})
  const [flagged, setFlagged] = useState(new Set())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DURATION)
  const [examResult, setExamResult] = useState(null)
  const timerRef = useRef(null)
  const answersRef = useRef(answers)
  useEffect(() => { answersRef.current = answers }, [answers])

  // Restore active exam on mount
  useEffect(() => {
    const saved = loadState(KEYS.ACTIVE_EXAM, null)
    if (saved) {
      setQuestionIds(saved.questionIds)
      setAnswers(saved.answers || {})
      setFlagged(new Set(saved.flagged || []))
      setCurrentIndex(saved.currentIndex || 0)
      // Compute wall-clock elapsed time since exam started
      const elapsed = Date.now() - (saved.startTime || Date.now())
      const remaining = Math.max(0, EXAM_DURATION - elapsed)
      setTimeRemaining(remaining)
      setScreen('exam')
      // If time already expired, auto-submit after state is set
      if (remaining <= 0) {
        setTimeout(() => submitExamRef.current(), 0)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Persist exam state on changes
  const [examStartTime, setExamStartTime] = useState(() => {
    const saved = loadState(KEYS.ACTIVE_EXAM, null)
    return saved?.startTime || null
  })
  useEffect(() => {
    if (screen === 'exam' && questionIds.length > 0) {
      saveState(KEYS.ACTIVE_EXAM, {
        questionIds,
        answers,
        flagged: [...flagged],
        currentIndex,
        timeRemaining,
        startTime: examStartTime,
      })
    }
  }, [screen, questionIds, answers, flagged, currentIndex, timeRemaining, examStartTime])

  // Timer
  useEffect(() => {
    if (screen === 'exam') {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          const next = prev - 1000
          if (next <= 0) {
            clearInterval(timerRef.current)
            submitExamRef.current()
            return 0
          }
          return next
        })
      }, 1000)
      return () => clearInterval(timerRef.current)
    }
  }, [screen, questionIds.length]) // eslint-disable-line react-hooks/exhaustive-deps

  const submitExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)

    // Calculate score — use ref to avoid stale closure when called from timer
    const currentAnswers = answersRef.current
    let score = 0
    const categoryScores = {}

    for (const qId of questionIds) {
      const qData = getQuestionData(qId)
      if (!qData) continue
      const userAnswer = currentAnswers[qId]
      const correct = userAnswer === qData.correctIndex
      if (correct) score++

      const cat = qData.category || 'Other'
      if (!categoryScores[cat]) categoryScores[cat] = { correct: 0, total: 0 }
      categoryScores[cat].total++
      if (correct) categoryScores[cat].correct++
    }

    // Compute percentages
    for (const cat of Object.keys(categoryScores)) {
      const d = categoryScores[cat]
      d.percent = d.total > 0 ? (d.correct / d.total) * 100 : 0
    }

    const result = {
      score,
      total: questionIds.length,
      passed: score / questionIds.length >= PASS_THRESHOLD,
      categoryScores,
      answers: { ...currentAnswers },
      timestamp: Date.now(),
    }

    setExamResult(result)
    setScreen('results')

    // Save to history
    const history = loadState(KEYS.EXAM_HISTORY, [])
    history.push(result)
    saveState(KEYS.EXAM_HISTORY, history)

    // Remove active exam
    removeState(KEYS.ACTIVE_EXAM)
  }, [questionIds])

  const submitExamRef = useRef(submitExam)
  useEffect(() => { submitExamRef.current = submitExam }, [submitExam])

  const beginExam = useCallback(() => {
    // Stratified selection matching real Part 107 exam distribution
    const qIds = shuffle(getFlashcardIds()).slice(0, 45)
    const sIds = shuffle(getScenarioIds()).slice(0, 8)
    const cIds = shuffle(getChartIds()).slice(0, 4)
    const mIds = shuffle(getMetarIds()).slice(0, 3)
    const selected = shuffle([...qIds, ...sIds, ...cIds, ...mIds])
    setQuestionIds(selected)
    setAnswers({})
    setFlagged(new Set())
    setCurrentIndex(0)
    setTimeRemaining(EXAM_DURATION)
    setExamStartTime(Date.now())
    setExamResult(null)
    setScreen('exam')
  }, [])

  const resetExam = useCallback(() => {
    setScreen('setup')
    setQuestionIds([])
    setAnswers({})
    setFlagged(new Set())
    setCurrentIndex(0)
    setTimeRemaining(EXAM_DURATION)
    setExamResult(null)
  }, [])

  if (screen === 'setup') {
    return <SetupScreen onBegin={beginExam} />
  }

  if (screen === 'exam') {
    return (
      <ExamScreen
        questionIds={questionIds}
        answers={answers}
        setAnswers={setAnswers}
        flagged={flagged}
        setFlagged={setFlagged}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        timeRemaining={timeRemaining}
        onReview={() => setScreen('review')}
      />
    )
  }

  if (screen === 'review') {
    return (
      <ReviewScreen
        questionIds={questionIds}
        answers={answers}
        flagged={flagged}
        onSubmit={submitExam}
        onContinue={() => setScreen('exam')}
      />
    )
  }

  if (screen === 'results') {
    return (
      <ResultsScreen
        examResult={examResult}
        questionIds={questionIds}
        onReset={resetExam}
      />
    )
  }

  return null
}
