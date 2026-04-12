import { describe, it, expect, beforeEach } from 'vitest'
import { loadState, saveState, KEYS } from '../storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('KEYS', () => {
    it('exports all required key constants', () => {
      expect(KEYS.QUESTIONS).toBe('rpr_questions')
      expect(KEYS.SESSION).toBe('rpr_session')
      expect(KEYS.ACTIVE_ROUND).toBe('rpr_active_round')
      expect(KEYS.ACTIVE_EXAM).toBe('rpr_active_exam')
      expect(KEYS.EXAM_HISTORY).toBe('rpr_exam_history')
    })
  })

  describe('loadState', () => {
    it('returns defaultValue when key does not exist', () => {
      expect(loadState(KEYS.SESSION, 0)).toBe(0)
    })

    it('returns parsed JSON when key exists', () => {
      localStorage.setItem(KEYS.SESSION, '42')
      expect(loadState(KEYS.SESSION, 0)).toBe(42)
    })

    it('returns defaultValue on corrupted JSON', () => {
      localStorage.setItem(KEYS.SESSION, '{broken')
      expect(loadState(KEYS.SESSION, 0)).toBe(0)
    })
  })

  describe('saveState', () => {
    it('serializes and stores value', () => {
      saveState(KEYS.SESSION, 42)
      expect(localStorage.getItem(KEYS.SESSION)).toBe('42')
    })

    it('stores objects as JSON', () => {
      const obj = { interval: 4, easeFactor: 2.5 }
      saveState(KEYS.QUESTIONS, obj)
      expect(JSON.parse(localStorage.getItem(KEYS.QUESTIONS))).toEqual(obj)
    })
  })
})
