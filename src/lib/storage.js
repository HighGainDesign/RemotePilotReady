export const KEYS = {
  QUESTIONS: 'rpr_questions',
  SESSION: 'rpr_session',
  ACTIVE_ROUND: 'rpr_active_round',
  ACTIVE_EXAM: 'rpr_active_exam',
  EXAM_HISTORY: 'rpr_exam_history',
}

export function loadState(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return defaultValue
    return JSON.parse(raw)
  } catch {
    return defaultValue
  }
}

export function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeState(key) {
  localStorage.removeItem(key)
}
