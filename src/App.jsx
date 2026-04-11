import { useState } from 'react'
import Flashcards from './components/Flashcards'
import ScenarioTrainer from './components/ScenarioTrainer'
import MetarDecoder from './components/MetarDecoder'
import QuickReference from './components/QuickReference'

const tabs = [
  { id: 'flashcards', label: 'Flashcards', icon: CardIcon },
  { id: 'scenarios', label: 'Scenarios', icon: ScenarioIcon },
  { id: 'metar', label: 'METAR', icon: MetarIcon },
  { id: 'reference', label: 'Reference', icon: ReferenceIcon },
]

function CardIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 10h6M9 14h4" />
    </svg>
  )
}

function ScenarioIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v6m0 0l-3-2m3 2l3-2M6 13l-2 3h4l-2 3M18 13l-2 3h4l-2 3M12 13v4m0 0l-2-1.5M12 17l2-1.5" />
    </svg>
  )
}

function MetarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 15h2m4 0h2m4 0h2m2 0h2" />
      <path d="M5 9a4 4 0 017-2.6A3.5 3.5 0 0118 9a3 3 0 01-1 5.8" />
      <path d="M8 19l1-2m3 2l1-2m3 2l1-2" />
    </svg>
  )
}

function ReferenceIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16v16H4z" />
      <path d="M4 9h16M9 4v16" />
    </svg>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('flashcards')

  return (
    <div className="flex flex-col h-full min-h-screen bg-slate-925">
      {/* Header */}
      <header className="safe-top bg-slate-925/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L20 14L12 10L4 14Z" opacity="0.9"/>
              <path d="M12 10L20 14L12 22L4 14Z" opacity="0.6"/>
            </svg>
          </div>
          <div>
            <h1 className="text-base font-semibold text-white leading-tight">RemotePilotReady</h1>
            <p className="text-xs text-slate-400">Part 107 Certification Study</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {activeTab === 'flashcards' && <Flashcards />}
          {activeTab === 'scenarios' && <ScenarioTrainer />}
          {activeTab === 'metar' && <MetarDecoder />}
          {activeTab === 'reference' && <QuickReference />}
        </div>
      </main>

      {/* Tab Bar */}
      <nav className="safe-bottom bg-slate-925/90 backdrop-blur-md border-t border-slate-700/50 sticky bottom-0 z-50">
        <div className="max-w-2xl mx-auto flex">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tap-highlight flex-1 flex flex-col items-center gap-1 py-2 pt-3 transition-colors ${
                  isActive
                    ? 'text-sky-400'
                    : 'text-slate-500 active:text-slate-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
