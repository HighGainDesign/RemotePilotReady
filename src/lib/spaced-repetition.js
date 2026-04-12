/**
 * Session-based SM-2 spaced repetition algorithm.
 * Intervals are in sessions (not days).
 */

export function createQuestionState(questionId, source, categories) {
  return {
    questionId,
    source,
    categories,
    interval: 0,
    sessionsSinceLastSeen: 0,
    easeFactor: 2.5,
    correctStreak: 0,
    totalSeen: 0,
    totalCorrect: 0,
    mastered: false,
  }
}

export function processAnswer(state, correct) {
  const updated = { ...state, totalSeen: state.totalSeen + 1 }

  if (correct) {
    updated.totalCorrect = state.totalCorrect + 1
    updated.correctStreak = state.correctStreak + 1
    updated.easeFactor = Math.min(3.0, state.easeFactor + 0.1)
    updated.interval = state.interval === 0
      ? 1
      : Math.round(state.interval * updated.easeFactor)
    updated.mastered = updated.interval >= 16
  } else {
    updated.correctStreak = 0
    updated.interval = 1
    updated.easeFactor = Math.max(1.3, state.easeFactor - 0.2)
    updated.mastered = false
  }

  updated.sessionsSinceLastSeen = 0
  return updated
}

export function incrementSessionCounters(states) {
  const updated = {}
  for (const [id, state] of Object.entries(states)) {
    // Only increment for questions that have been seen and have a review interval
    if (state.totalSeen > 0) {
      updated[id] = {
        ...state,
        sessionsSinceLastSeen: state.sessionsSinceLastSeen + 1,
      }
    } else {
      updated[id] = state
    }
  }
  return updated
}

export function selectRoundQuestions(states, allIds, count, currentSession, categoryRetention = {}) {
  const due = []
  const missed = []
  const unseen = []

  for (const id of allIds) {
    const state = states[id]
    if (!state || state.totalSeen === 0) {
      unseen.push(id)
    } else if (state.interval === 1 && state.sessionsSinceLastSeen >= 1) {
      missed.push(id)
    } else if (state.sessionsSinceLastSeen >= state.interval) {
      due.push(id)
    }
  }

  const shuffle = (arr) => {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  // Sort unseen questions so weak-category questions come first
  if (Object.keys(categoryRetention).length > 0) {
    unseen.sort((a, b) => {
      const stateA = states[a]
      const stateB = states[b]
      const catsA = stateA?.categories || []
      const catsB = stateB?.categories || []
      const weakA = Math.min(...catsA.map(c => categoryRetention[c] ?? 50), 100)
      const weakB = Math.min(...catsB.map(c => categoryRetention[c] ?? 50), 100)
      return weakA - weakB  // lower retention = higher priority
    })
  }

  const pool = [
    ...shuffle(due),
    ...shuffle(missed),
    ...unseen,
  ]

  return pool.slice(0, count)
}

export function calcRetention(states) {
  const attempted = Object.values(states).filter(s => s.totalSeen > 0)
  if (attempted.length === 0) return 0
  const mastered = attempted.filter(s => s.mastered).length
  return (mastered / attempted.length) * 100
}

export function calcProgress(states, totalQuestions) {
  if (totalQuestions === 0) return 0
  const attempted = Object.values(states).filter(s => s.totalSeen > 0).length
  return (attempted / totalQuestions) * 100
}

export function calcCategoryRetention(states) {
  const categories = {}

  for (const state of Object.values(states)) {
    if (state.totalSeen === 0) continue
    for (const cat of state.categories) {
      if (!categories[cat]) categories[cat] = { attempted: 0, mastered: 0 }
      categories[cat].attempted++
      if (state.mastered) categories[cat].mastered++
    }
  }

  const result = {}
  for (const [cat, counts] of Object.entries(categories)) {
    result[cat] = (counts.mastered / counts.attempted) * 100
  }
  return result
}
