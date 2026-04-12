import { describe, it, expect } from 'vitest'
import {
  createQuestionState,
  processAnswer,
  selectRoundQuestions,
  calcRetention,
  calcProgress,
  calcCategoryRetention,
} from '../spaced-repetition'

describe('createQuestionState', () => {
  it('creates default state for a new question', () => {
    const state = createQuestionState('q_1', 'questions', ['Regulations'])
    expect(state).toEqual({
      questionId: 'q_1',
      source: 'questions',
      categories: ['Regulations'],
      interval: 0,
      sessionsSinceLastSeen: 0,
      easeFactor: 2.5,
      correctStreak: 0,
      totalSeen: 0,
      totalCorrect: 0,
      mastered: false,
    })
  })
})

describe('processAnswer', () => {
  it('increases interval and ease on correct answer', () => {
    const state = createQuestionState('q_1', 'questions', ['Regulations'])
    state.interval = 1
    state.totalSeen = 1
    const updated = processAnswer(state, true)
    expect(updated.correctStreak).toBe(1)
    expect(updated.interval).toBeGreaterThan(1)
    expect(updated.easeFactor).toBeCloseTo(2.6)
    expect(updated.totalCorrect).toBe(1)
    expect(updated.totalSeen).toBe(2)
    expect(updated.sessionsSinceLastSeen).toBe(0)
  })

  it('resets interval to 1 and decreases ease on wrong answer', () => {
    const state = createQuestionState('q_1', 'questions', ['Regulations'])
    state.interval = 8
    state.correctStreak = 3
    state.easeFactor = 2.7
    const updated = processAnswer(state, false)
    expect(updated.interval).toBe(1)
    expect(updated.correctStreak).toBe(0)
    expect(updated.easeFactor).toBeCloseTo(2.5)
    expect(updated.totalSeen).toBe(1)
    expect(updated.totalCorrect).toBe(0)
    expect(updated.mastered).toBe(false)
  })

  it('marks question as mastered when interval >= 16', () => {
    const state = createQuestionState('q_1', 'questions', ['Regulations'])
    state.interval = 10
    state.easeFactor = 2.0
    state.totalSeen = 5
    state.totalCorrect = 5
    const updated = processAnswer(state, true)
    expect(updated.interval).toBeGreaterThanOrEqual(16)
    expect(updated.mastered).toBe(true)
  })

  it('clamps easeFactor to minimum 1.3', () => {
    const state = createQuestionState('q_1', 'questions', ['Regulations'])
    state.easeFactor = 1.4
    const updated = processAnswer(state, false)
    expect(updated.easeFactor).toBeGreaterThanOrEqual(1.3)
  })

  it('clamps easeFactor to maximum 3.0', () => {
    const state = createQuestionState('q_1', 'questions', ['Regulations'])
    state.easeFactor = 2.95
    const updated = processAnswer(state, true)
    expect(updated.easeFactor).toBeLessThanOrEqual(3.0)
  })

  it('sets interval to 1 on first correct answer when interval is 0', () => {
    const state = createQuestionState('q_1', 'questions', ['Regulations'])
    expect(state.interval).toBe(0)
    const updated = processAnswer(state, true)
    expect(updated.interval).toBe(1)
  })
})

describe('selectRoundQuestions', () => {
  const makeStates = (count) => {
    const states = {}
    for (let i = 0; i < count; i++) {
      const id = `q_${i}`
      states[id] = createQuestionState(id, 'questions', ['Regulations'])
    }
    return states
  }
  const makeAllIds = (count) => Array.from({ length: count }, (_, i) => `q_${i}`)

  it('selects the requested number of questions', () => {
    const states = makeStates(50)
    const allIds = makeAllIds(50)
    const selected = selectRoundQuestions(states, allIds, 10, 5)
    expect(selected).toHaveLength(10)
  })

  it('prioritizes due questions over unseen', () => {
    const states = makeStates(20)
    states['q_0'].interval = 2
    states['q_0'].sessionsSinceLastSeen = 3
    states['q_0'].totalSeen = 1
    const allIds = makeAllIds(20)
    const selected = selectRoundQuestions(states, allIds, 10, 5)
    expect(selected).toContain('q_0')
  })

  it('returns fewer questions if not enough available', () => {
    const states = makeStates(3)
    const allIds = makeAllIds(3)
    const selected = selectRoundQuestions(states, allIds, 10, 5)
    expect(selected).toHaveLength(3)
  })
})

describe('calcRetention', () => {
  it('returns 0 when nothing attempted', () => {
    expect(calcRetention({})).toBe(0)
  })

  it('returns percentage of mastered over attempted', () => {
    const states = {
      q_1: { totalSeen: 3, mastered: true },
      q_2: { totalSeen: 2, mastered: false },
      q_3: { totalSeen: 1, mastered: true },
      q_4: { totalSeen: 0, mastered: false },
    }
    expect(calcRetention(states)).toBeCloseTo(66.7, 0)
  })
})

describe('calcProgress', () => {
  it('returns percentage of attempted over total', () => {
    const states = {
      q_1: { totalSeen: 3 },
      q_2: { totalSeen: 0 },
      q_3: { totalSeen: 1 },
    }
    expect(calcProgress(states, 5)).toBeCloseTo(40, 0)
  })
})

describe('calcCategoryRetention', () => {
  it('returns per-category retention', () => {
    const states = {
      q_1: { categories: ['Weather'], totalSeen: 2, mastered: true },
      q_2: { categories: ['Weather'], totalSeen: 1, mastered: false },
      q_3: { categories: ['Regulations'], totalSeen: 3, mastered: true },
    }
    const result = calcCategoryRetention(states)
    expect(result['Weather']).toBeCloseTo(50, 0)
    expect(result['Regulations']).toBeCloseTo(100, 0)
  })

  it('excludes categories with no attempted questions', () => {
    const states = {
      q_1: { categories: ['Weather'], totalSeen: 0, mastered: false },
    }
    const result = calcCategoryRetention(states)
    expect(result['Weather']).toBeUndefined()
  })
})
