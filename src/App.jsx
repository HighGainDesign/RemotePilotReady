import { useState, useEffect, useCallback } from 'react'
import LandingPage from './components/LandingPage'
import About from './components/About'
import StudyMode from './components/StudyMode'
import ExamMode from './components/ExamMode'
import Calculator from './components/Calculator'
import QuickReference from './components/QuickReference'
import { loadState, saveState, KEYS } from './lib/storage'
import { calcRetention, calcProgress } from './lib/spaced-repetition'
import { getTotalQuestions } from './lib/question-data'

const tabs = [
  { id: 'study', label: 'STUDY', icon: StudyIcon },
  { id: 'exam', label: 'EXAM', icon: ExamIcon },
  { id: 'e6b', label: 'E6B', icon: E6BIcon },
  { id: 'reference', label: 'REF', icon: RefIcon },
]

function StudyIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 10h6M9 14h4" />
    </svg>
  )
}

function ExamIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  )
}

function E6BIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="3" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="21" />
      <line x1="3" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="21" y2="12" />
      <line x1="12" y1="12" x2="15" y2="8" />
    </svg>
  )
}

function RefIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16v16H4z" />
      <path d="M4 9h16M9 4v16" />
    </svg>
  )
}


export default function App() {
  const [hasVisited, setHasVisited] = useState(() => loadState('rpr_has_visited', false))
  const [showAbout, setShowAbout] = useState(false)
  const [activeTab, setActiveTab] = useState('study')
  const [questionStates, setQuestionStates] = useState(() => loadState(KEYS.QUESTIONS, {}))

  const handleEnterApp = useCallback(() => {
    saveState('rpr_has_visited', true)
    setHasVisited(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setQuestionStates(loadState(KEYS.QUESTIONS, {}))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const retention = Math.round(calcRetention(questionStates))
  const progress = Math.round(calcProgress(questionStates, getTotalQuestions()))

  if (!hasVisited) {
    return <LandingPage onEnter={handleEnterApp} />
  }

  return (
    <div className="flex flex-col h-full min-h-screen bg-cockpit-bg">
      {/* Header */}
      <header className="safe-top bg-cockpit-bg/80 backdrop-blur-md border-b border-cockpit-border sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => setShowAbout(true)} className="tap-highlight w-9 h-9 shrink-0" aria-label="About" style={{ filter: 'drop-shadow(0 0 6px rgba(74,252,146,0.3))' }}>
            <svg viewBox="0 0 64 64" className="w-9 h-9" fill="none">
              {/* iOS squircle background */}
              <path d="M12 0h40c6.6 0 10.4 1.2 12 4s4 5.4 4 12v32c0 6.6-1.2 10.4-4 12s-5.4 4-12 4H12c-6.6 0-10.4-1.2-12-4S-4 54.6-4 48V16C-4 9.4-2.8 5.6 0 4S5.4 0 12 0z" fill="#0c1a2e" stroke="#4afc92" strokeWidth="1.5" strokeOpacity="0.25" />
              {/* Drone body */}
              <rect x="26" y="28" width="12" height="8" rx="2" fill="#4afc92" />
              {/* Arms */}
              <line x1="28" y1="30" x2="18" y2="22" stroke="#4afc92" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
              <line x1="36" y1="30" x2="46" y2="22" stroke="#4afc92" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
              <line x1="28" y1="34" x2="18" y2="42" stroke="#4afc92" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
              <line x1="36" y1="34" x2="46" y2="42" stroke="#4afc92" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
              {/* Rotors */}
              <ellipse cx="18" cy="22" rx="7" ry="2" fill="#4afc92" opacity="0.3" />
              <ellipse cx="46" cy="22" rx="7" ry="2" fill="#4afc92" opacity="0.3" />
              <ellipse cx="18" cy="42" rx="7" ry="2" fill="#4afc92" opacity="0.3" />
              <ellipse cx="46" cy="42" rx="7" ry="2" fill="#4afc92" opacity="0.3" />
              {/* Motor hubs */}
              <circle cx="18" cy="22" r="2.5" fill="#4afc92" />
              <circle cx="46" cy="22" r="2.5" fill="#4afc92" />
              <circle cx="18" cy="42" r="2.5" fill="#4afc92" />
              <circle cx="46" cy="42" r="2.5" fill="#4afc92" />
              {/* Camera */}
              <circle cx="32" cy="37" r="2" fill="#080e1a" stroke="#4afc92" strokeWidth="0.8" />
            </svg>
          </button>
          <div>
            <h1 className="font-instrument text-body-text text-[0.875rem] font-extrabold tracking-[0.15em] leading-tight">
              RPR
            </h1>
            <p className="font-instrument text-inactive text-[0.5rem] tracking-[0.15em]">PART 107</p>
          </div>
          <div className="ml-auto flex gap-1.5">
            <span className="font-instrument text-phosphor text-[0.625rem] font-bold glow-phosphor-text">
              {retention}% <span className="text-phosphor/60 font-semibold">RET</span>
            </span>
            <span className="text-divider">&middot;</span>
            <span className="font-instrument text-phosphor text-[0.625rem] font-bold glow-phosphor-text">
              {progress}% <span className="text-phosphor/60 font-semibold">PROG</span>
            </span>
          </div>
        </div>
      </header>

      {/* Content — all tabs mounted, display toggled */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div style={{ display: activeTab === 'study' ? 'block' : 'none' }}>
            <StudyMode />
          </div>
          <div style={{ display: activeTab === 'exam' ? 'block' : 'none' }}>
            <ExamMode />
          </div>
          <div style={{ display: activeTab === 'e6b' ? 'block' : 'none' }}>
            <Calculator />
          </div>
          <div style={{ display: activeTab === 'reference' ? 'block' : 'none' }}>
            <QuickReference />
          </div>
        </div>
      </main>

      {/* Tab Bar */}
      <nav className="safe-bottom bg-cockpit-bg/90 backdrop-blur-md border-t border-cockpit-border sticky bottom-0 z-50">
        <div className="max-w-2xl mx-auto flex" role="tablist">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-label={`${tab.label} tab`}
                aria-current={isActive ? 'page' : undefined}
                className={`tap-highlight flex-1 flex flex-col items-center gap-1 py-2 pt-3 transition-colors relative ${
                  isActive ? 'text-phosphor' : 'text-inactive active:text-secondary-text'
                }`}
              >
                {isActive && (
                  <div
                    className="w-[5px] h-[5px] rounded-full bg-phosphor absolute top-1"
                    style={{ boxShadow: '0 0 6px rgba(74,252,146,0.5)' }}
                  />
                )}
                <Icon className="w-5 h-5" />
                <span className="font-instrument text-[0.5rem] font-semibold tracking-wider">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* About modal */}
      {showAbout && <About onClose={() => setShowAbout(false)} />}
    </div>
  )
}
