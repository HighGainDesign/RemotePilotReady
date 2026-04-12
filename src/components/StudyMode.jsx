import { useState, useCallback, useMemo, useEffect } from 'react'
import RoundEngine from './RoundEngine'
import { chartRenderers } from './ChartSvg'
import Dashboard from './Dashboard'
import { loadState, saveState, removeState, KEYS } from '../lib/storage'
import {
  createQuestionState,
  processAnswer,
  incrementSessionCounters,
  selectRoundQuestions,
  calcRetention,
  calcProgress,
  calcCategoryRetention,
} from '../lib/spaced-repetition'
import { getAllIds, getQuestionData, getTotalQuestions } from '../lib/question-data'

const TRACKS = [
  { id: 'questions', label: 'Questions', roundSize: 10 },
  { id: 'scenarios', label: 'Scenarios', roundSize: 3 },
  { id: 'charts', label: 'Charts', roundSize: 3 },
  { id: 'metar', label: 'METAR', roundSize: 2 },
]

export default function StudyMode() {
  const [activeTrack, setActiveTrack] = useState('questions')
  const [questionStates, setQuestionStates] = useState(() => loadState(KEYS.QUESTIONS, {}))
  const [session, setSession] = useState(() => loadState(KEYS.SESSION, 0))
  const [roundIds, setRoundIds] = useState(null)
  const [roundIndex, setRoundIndex] = useState(0)
  const [roundScore, setRoundScore] = useState(0)
  const [showReward, setShowReward] = useState(false)

  // Persist state changes
  useEffect(() => { saveState(KEYS.QUESTIONS, questionStates) }, [questionStates])
  useEffect(() => { saveState(KEYS.SESSION, session) }, [session])

  const trackConfig = TRACKS.find(t => t.id === activeTrack)

  // Calculate metrics (before startRound so categoryRetention is available)
  const retention = useMemo(() => calcRetention(questionStates), [questionStates])
  const totalQuestions = useMemo(() => getTotalQuestions(), [])
  const progress = useMemo(() => calcProgress(questionStates, totalQuestions), [questionStates, totalQuestions])
  const categoryRetention = useMemo(() => calcCategoryRetention(questionStates), [questionStates])

  const startRound = useCallback(() => {
    const allIds = getAllIds(activeTrack)
    const selected = selectRoundQuestions(questionStates, allIds, trackConfig.roundSize, session, categoryRetention)
    setRoundIds(selected)
    setRoundIndex(0)
    setRoundScore(0)
    setShowReward(false)
    saveState(KEYS.ACTIVE_ROUND, { track: activeTrack, questionIds: selected, currentIndex: 0, score: 0 })
  }, [activeTrack, questionStates, trackConfig, session, categoryRetention])

  // Restore active round on mount
  useEffect(() => {
    const savedRound = loadState(KEYS.ACTIVE_ROUND, null)
    if (savedRound && savedRound.track === activeTrack) {
      setRoundIds(savedRound.questionIds)
      setRoundIndex(savedRound.currentIndex)
      setRoundScore(savedRound.score || 0)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-start first round
  useEffect(() => {
    if (!roundIds && !showReward) startRound()
  }, [activeTrack]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswer = useCallback((correct) => {
    if (!roundIds) return
    const qId = roundIds[roundIndex]
    const currentState = questionStates[qId] || createQuestionState(
      qId,
      activeTrack,
      getQuestionData(qId)?.categories || []
    )
    const updated = processAnswer(currentState, correct)
    setQuestionStates(prev => ({ ...prev, [qId]: updated }))
    if (correct) setRoundScore(prev => prev + 1)
  }, [roundIds, roundIndex, questionStates, activeTrack])

  const handleNext = useCallback(() => {
    if (roundIndex + 1 >= roundIds.length) {
      // Round complete
      const newSession = session + 1
      setSession(newSession)
      setQuestionStates(prev => incrementSessionCounters(prev))
      setShowReward(true)
      removeState(KEYS.ACTIVE_ROUND)
    } else {
      setRoundIndex(prev => prev + 1)
      saveState(KEYS.ACTIVE_ROUND, { track: activeTrack, questionIds: roundIds, currentIndex: roundIndex + 1, score: roundScore })
    }
  }, [roundIndex, roundIds, session, activeTrack, roundScore])

  const handleTrackChange = useCallback((trackId) => {
    setActiveTrack(trackId)
    setRoundIds(null)
    setShowReward(false)
  }, [])

  const handleNextRound = useCallback(() => {
    startRound()
  }, [startRound])

  // Current question data
  const currentQuestion = roundIds ? getQuestionData(roundIds[roundIndex]) : null

  // Build context element for non-question tracks
  const contextElement = useMemo(() => {
    if (!currentQuestion?.context) return null
    const ctx = currentQuestion.context

    if (ctx.type === 'scenario') {
      return (
        <div className="bg-cockpit-surface/60 border border-cockpit-border rounded-xl p-3">
          <div className="font-instrument text-phosphor text-[0.5625rem] font-bold tracking-widest mb-1">
            SCENARIO
          </div>
          <p className="text-body-text text-[0.8125rem] font-semibold mb-1.5">{ctx.title}</p>
          <p className="text-secondary-text text-[0.75rem] leading-relaxed">{ctx.situation}</p>
        </div>
      )
    }

    if (ctx.type === 'metar') {
      return (
        <div className="bg-cockpit-surface/60 border border-cockpit-border rounded-xl p-3">
          <div className="font-instrument text-phosphor text-[0.5625rem] font-bold tracking-widest mb-1.5">
            DECODE THIS METAR
          </div>
          <p className="font-instrument text-amber-accent text-[0.8125rem] font-bold break-all leading-relaxed">
            {ctx.raw}
          </p>
        </div>
      )
    }

    if (ctx.type === 'chart') {
      const ChartSvgComponent = chartRenderers[ctx.chartType]
      return (
        <div className="bg-cockpit-surface/60 border border-cockpit-border rounded-xl p-3">
          <div className="font-instrument text-phosphor text-[0.5625rem] font-bold tracking-widest mb-1.5">
            IDENTIFY THE CHART SYMBOLS
          </div>
          {ChartSvgComponent && <ChartSvgComponent />}
        </div>
      )
    }

    return null
  }, [currentQuestion])

  return (
    <div className="px-4 py-4 relative cockpit-noise cockpit-scanlines cockpit-grid">
      {/* Header with metrics */}
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <div className="w-7 h-7 rounded-full border-2 border-phosphor flex items-center justify-center glow-phosphor">
          <span className="text-phosphor text-[0.75rem]" style={{ filter: 'drop-shadow(0 0 4px rgba(74,252,146,0.4))' }}>&#10022;</span>
        </div>
        <span className="font-instrument text-body-text text-[0.8125rem] font-extrabold tracking-[0.15em]">RPR</span>
      </div>

      {/* Sub-nav */}
      <div className="flex gap-0.5 mb-4 bg-cockpit-surface/80 rounded-[0.625rem] p-[3px] border border-cockpit-border relative z-10">
        {TRACKS.map(track => (
          <button
            key={track.id}
            onClick={() => handleTrackChange(track.id)}
            className={`tap-highlight flex-1 py-[7px] rounded-lg font-instrument text-[0.5625rem] font-semibold tracking-wider text-center transition-all ${
              activeTrack === track.id
                ? 'bg-phosphor/10 text-phosphor border border-phosphor/20 glow-phosphor'
                : 'text-inactive'
            }`}
          >
            {track.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {showReward ? (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <span className="font-instrument text-phosphor text-[0.6875rem] font-bold tracking-widest glow-phosphor-text">
                ROUND COMPLETE
              </span>
            </div>
            <Dashboard
              retention={retention}
              progress={progress}
              categoryRetention={categoryRetention}
              roundScore={roundScore}
              roundTotal={roundIds?.length || 0}
            />
            <button
              onClick={handleNextRound}
              className="tap-highlight w-full py-3 rounded-xl bg-phosphor/10 border border-phosphor/25 text-phosphor text-[0.875rem] font-semibold active:bg-phosphor/15 transition-colors glow-phosphor"
            >
              Next Round &rarr;
            </button>
          </div>
        ) : currentQuestion ? (
          <RoundEngine
            key={roundIds[roundIndex]}
            question={currentQuestion}
            questionNumber={roundIndex + 1}
            totalQuestions={roundIds?.length || 0}
            onAnswer={handleAnswer}
            onNext={handleNext}
            categoryLabel={currentQuestion.category?.toUpperCase() || ''}
            contextElement={contextElement}
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-secondary-text text-[0.875rem]">Loading round...</p>
          </div>
        )}
      </div>
    </div>
  )
}
