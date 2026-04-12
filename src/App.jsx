import { useState, useEffect } from 'react'
import StudyMode from './components/StudyMode'
import ExamMode from './components/ExamMode'
import Calculator from './components/Calculator'
import QuickReference from './components/QuickReference'
import { loadState, KEYS } from './lib/storage'
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
  const [activeTab, setActiveTab] = useState('study')
  const [questionStates, setQuestionStates] = useState(() => loadState(KEYS.QUESTIONS, {}))

  useEffect(() => {
    const interval = setInterval(() => {
      setQuestionStates(loadState(KEYS.QUESTIONS, {}))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const retention = Math.round(calcRetention(questionStates))
  const progress = Math.round(calcProgress(questionStates, getTotalQuestions()))

  return (
    <div className="flex flex-col h-full min-h-screen bg-cockpit-bg">
      {/* Header */}
      <header className="safe-top bg-cockpit-bg/80 backdrop-blur-md border-b border-cockpit-border sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-phosphor flex items-center justify-center glow-phosphor">
            <span className="text-phosphor text-[0.875rem]" style={{ filter: 'drop-shadow(0 0 4px rgba(74,252,146,0.4))' }}>✦</span>
          </div>
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
    </div>
  )
}
