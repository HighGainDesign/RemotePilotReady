import { useState, useCallback, useMemo } from 'react'
import flashcards, { categories } from '../data/flashcards'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const LETTERS = ['A', 'B', 'C', 'D']

export default function Flashcards() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 })
  const [shuffleKey, setShuffleKey] = useState(0)

  const shuffled = useMemo(() => shuffle(flashcards), [shuffleKey])

  const filtered = activeCategory === 'All'
    ? shuffled
    : shuffled.filter(c => c.category === activeCategory)

  const card = filtered[currentIndex]
  const total = filtered.length
  const answered = selectedIndex !== null
  const isCorrect = answered && selectedIndex === card?.correctIndex

  const handleSelect = useCallback((idx) => {
    if (selectedIndex !== null) return
    setSelectedIndex(idx)
    setStats(prev => ({
      correct: prev.correct + (idx === card.correctIndex ? 1 : 0),
      incorrect: prev.incorrect + (idx === card.correctIndex ? 0 : 1),
    }))
  }, [selectedIndex, card])

  const goNext = useCallback(() => {
    setSelectedIndex(null)
    setCurrentIndex(i => (i + 1) % total)
  }, [total])

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat)
    setCurrentIndex(0)
    setSelectedIndex(null)
  }, [])

  const resetQuiz = useCallback(() => {
    setStats({ correct: 0, incorrect: 0 })
    setCurrentIndex(0)
    setSelectedIndex(null)
    setShuffleKey(k => k + 1)
  }, [])

  if (!card) return null

  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0

  const optionClass = (idx) => {
    if (!answered) {
      return 'bg-slate-800 border border-slate-700/50 text-slate-200 active:bg-slate-700'
    }
    if (idx === card.correctIndex) {
      return 'bg-green-500/15 border border-green-500/40 text-green-400'
    }
    if (idx === selectedIndex) {
      return 'bg-red-500/15 border border-red-500/40 text-red-400'
    }
    return 'bg-slate-800 border border-slate-700/50 text-slate-500'
  }

  const letterClass = (idx) => {
    if (!answered) {
      return 'bg-slate-700 text-slate-400'
    }
    if (idx === card.correctIndex) {
      return 'bg-green-500/25 text-green-400'
    }
    if (idx === selectedIndex) {
      return 'bg-red-500/25 text-red-400'
    }
    return 'bg-slate-700/50 text-slate-600'
  }

  return (
    <div className="px-4 py-5">
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`tap-highlight px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/30'
                : 'bg-slate-800 text-slate-400 active:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between mb-4 text-xs">
        <div className="flex gap-3">
          <span className="text-green-400 font-medium">{stats.correct} correct</span>
          <span className="text-red-400 font-medium">{stats.incorrect} incorrect</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">{currentIndex + 1} / {total}</span>
          <button onClick={resetQuiz} className="text-slate-500 hover:text-slate-300 transition-colors">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 019-9 9 9 0 016.36 2.64M21 12a9 9 0 01-9 9 9 9 0 01-6.36-2.64" />
              <path d="M21 3v6h-6M3 21v-6h6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-0.5 bg-slate-800 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-sky-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/50 p-5 mb-4">
        <div className="mb-4">
          <span className="px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 text-[10px] font-semibold uppercase tracking-wider">
            {card.category}
          </span>
        </div>
        <p className="text-lg text-slate-200 text-center leading-relaxed font-medium">
          {card.question}
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2.5 mb-4">
        {card.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            disabled={answered}
            className={`tap-highlight flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${optionClass(idx)}`}
          >
            <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${letterClass(idx)}`}>
              {LETTERS[idx]}
            </span>
            <span className="text-sm leading-snug">{option}</span>
          </button>
        ))}
      </div>

      {/* Explanation */}
      {answered && (
        <div className="rounded-xl bg-sky-500/5 border border-sky-500/15 p-4 mb-4">
          <p className="text-sm text-slate-300 leading-relaxed mb-2">{card.explanation}</p>
          <p className="text-xs text-amber-400/80 font-mono">{card.reference}</p>
        </div>
      )}

      {/* Next Button */}
      {answered && (
        <button
          onClick={goNext}
          className="tap-highlight w-full py-3 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 text-sm font-medium active:bg-sky-500/25 transition-colors"
        >
          Next Question
        </button>
      )}
    </div>
  )
}
