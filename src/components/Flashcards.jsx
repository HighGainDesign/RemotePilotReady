import { useState, useCallback, useRef } from 'react'
import flashcards, { categories } from '../data/flashcards'

export default function Flashcards() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [swipeClass, setSwipeClass] = useState('')
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 })
  const [answered, setAnswered] = useState(new Set())

  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)
  const cardRef = useRef(null)

  const filtered = activeCategory === 'All'
    ? flashcards
    : flashcards.filter(c => c.category === activeCategory)

  const card = filtered[currentIndex]
  const total = filtered.length

  const goNext = useCallback(() => {
    setIsFlipped(false)
    setSwipeClass('')
    setCurrentIndex(i => (i + 1) % total)
  }, [total])

  const markAnswer = useCallback((correct) => {
    if (!card || answered.has(card.id)) {
      goNext()
      return
    }
    setAnswered(prev => new Set(prev).add(card.id))
    setStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
    }))
    setSwipeClass(correct ? 'swipe-right' : 'swipe-left')
    setTimeout(goNext, 300)
  }, [card, answered, goNext])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
  }

  const handleTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
    if (cardRef.current) {
      const rotate = touchDeltaX.current * 0.08
      cardRef.current.style.transform = `translateX(${touchDeltaX.current}px) rotate(${rotate}deg)`
    }
  }

  const handleTouchEnd = () => {
    const delta = touchDeltaX.current
    if (cardRef.current) {
      cardRef.current.style.transform = ''
    }
    if (Math.abs(delta) > 80) {
      if (!isFlipped) setIsFlipped(true)
      setTimeout(() => markAnswer(delta > 0), 150)
    }
  }

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setCurrentIndex(0)
    setIsFlipped(false)
    setSwipeClass('')
  }

  const resetStats = () => {
    setStats({ correct: 0, incorrect: 0 })
    setAnswered(new Set())
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  if (!card) return null

  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0

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
          <button onClick={resetStats} className="text-slate-500 hover:text-slate-300 transition-colors">
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

      {/* Card */}
      <div
        className="relative mx-auto"
        style={{ perspective: '1000px', minHeight: '320px' }}
      >
        <div
          ref={cardRef}
          className={`card-swipe ${swipeClass}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`card-inner cursor-pointer ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(f => !f)}
          >
            {/* Front */}
            <div className="card-front absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/50 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 text-[10px] font-semibold uppercase tracking-wider">
                  {card.category}
                </span>
                <span className="text-slate-600 text-xs">Tap to flip</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-lg text-slate-200 text-center leading-relaxed font-medium">
                  {card.question}
                </p>
              </div>
            </div>

            {/* Back */}
            <div className="card-back absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 border border-sky-500/30 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 text-[10px] font-semibold uppercase tracking-wider">
                  Answer
                </span>
                <span className="text-slate-600 text-xs">Tap to flip</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-base text-slate-200 text-center leading-relaxed">
                  {card.answer}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/50">
                <p className="text-xs text-amber-400/80 font-mono text-center">
                  {card.reference}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={() => markAnswer(false)}
          className="tap-highlight w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 active:bg-red-500/20 transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <button
          onClick={() => setIsFlipped(f => !f)}
          className="tap-highlight w-10 h-10 rounded-full bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-slate-400 active:bg-slate-600/50 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 3l-5 5 5 5M15 21l5-5-5-5" />
            <path d="M4 8h10a4 4 0 010 8h-2" />
          </svg>
        </button>
        <button
          onClick={() => markAnswer(true)}
          className="tap-highlight w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 active:bg-green-500/20 transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </button>
      </div>

      <p className="text-center text-xs text-slate-600 mt-4">
        Swipe right = knew it &middot; Swipe left = needs review
      </p>
    </div>
  )
}
