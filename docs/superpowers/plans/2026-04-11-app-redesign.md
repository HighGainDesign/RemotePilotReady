# RemotePilotReady App Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the Part 107 study app from 6 flat tabs into a 4-tab architecture with session-based spaced repetition, chunked study rounds, exam simulation, and an accessible aviation instrument panel aesthetic.

**Architecture:** The app is a Vite + React 19 SPA with Tailwind CSS v4, deployed on Vercel. State management uses React hooks + localStorage for persistence. No routing library — tab switching is state-driven. All tab components stay mounted (CSS-hidden) to preserve state across switches. A shared spaced repetition engine selects questions across all study tracks.

**Tech Stack:** React 19, Vite 8, Tailwind CSS v4, Vitest + React Testing Library (new), localStorage, Google Fonts (JetBrains Mono, Plus Jakarta Sans).

**Spec:** `docs/superpowers/specs/2026-04-11-app-redesign-design.md`

---

## File Structure

### New Files

| File | Responsibility |
|------|---------------|
| `src/lib/spaced-repetition.js` | SR algorithm: ease factor updates, interval calculation, round question selection, retention/progress computation |
| `src/lib/storage.js` | localStorage read/write with JSON serialization, key constants, migration helpers |
| `src/components/StudyMode.jsx` | Study tab wrapper: sub-nav (Questions/Scenarios/Charts/METAR), round lifecycle, reward screen |
| `src/components/ExamMode.jsx` | Exam flow: setup screen, question display with flag/nav, review screen, results screen |
| `src/components/Dashboard.jsx` | Retention gauge (SVG arc), category bars, progress metric — used in reward screen and exam results |
| `src/components/RoundEngine.jsx` | Shared question presentation: displays question + options, handles answer selection, shows feedback/explanation |
| `src/lib/__tests__/spaced-repetition.test.js` | Tests for SR algorithm |
| `src/lib/__tests__/storage.test.js` | Tests for storage helpers |

### Modified Files

| File | Changes |
|------|---------|
| `src/App.jsx` | 4 tabs (Study/Exam/E6B/Reference), all mounted with CSS hidden, new icons, font imports |
| `src/index.css` | New color tokens (#4afc92 primary), atmospheric effects (noise/scanlines/grid), rem type scale, font imports |
| `src/data/flashcards.js` | Add `categories` array field, expand to 200+ questions |
| `src/data/scenarios.js` | Add `categories` array, normalize option format to `{options[], correctIndex}` |
| `src/data/charts.js` | Add `categories` array |
| `src/data/metars.js` | Add `categories` array, normalize quiz format to `{options[], correctIndex}` |
| `src/components/ChartTrainer.jsx` | Receive questions from RoundEngine, add explanation for wrong answers |
| `src/components/MetarDecoder.jsx` | Receive questions from RoundEngine, add explanation for wrong answers |
| `index.html` | Add Google Fonts link tags |
| `package.json` | Add vitest, @testing-library/react, @testing-library/jest-dom, jsdom devDependencies |

### Unchanged Files

| File | Reason |
|------|--------|
| `src/components/Calculator.jsx` | Already complete from prior work |
| `src/components/QuickReference.jsx` | Already complete |
| `src/data/quickReference.js` | No changes needed |

### Deleted Files

| File | Reason |
|------|--------|
| `src/components/Flashcards.jsx` | Replaced by RoundEngine + StudyMode |
| `src/components/ScenarioTrainer.jsx` | Replaced by RoundEngine + StudyMode (scenario-specific rendering moves into RoundEngine) |

---

## Phase 1: Foundation

### Task 1: Add Test Infrastructure

**Files:**
- Modify: `package.json`
- Create: `vitest.config.js`
- Create: `src/lib/__tests__/smoke.test.js`

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Create vitest config**

Create `vitest.config.js`:

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: [],
    globals: true,
  },
})
```

- [ ] **Step 3: Add test script to package.json**

Add to `"scripts"` in `package.json`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Write smoke test**

Create `src/lib/__tests__/smoke.test.js`:

```js
import { describe, it, expect } from 'vitest'

describe('test infrastructure', () => {
  it('works', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 5: Run tests to verify setup**

Run: `npm test`
Expected: 1 test passing

- [ ] **Step 6: Commit**

```bash
git add vitest.config.js package.json package-lock.json src/lib/__tests__/smoke.test.js
git commit -m "chore: add vitest test infrastructure"
```

---

### Task 2: Storage Library

**Files:**
- Create: `src/lib/storage.js`
- Create: `src/lib/__tests__/storage.test.js`

- [ ] **Step 1: Write failing tests for storage helpers**

Create `src/lib/__tests__/storage.test.js`:

```js
import { describe, it, expect, beforeEach, vi } from 'vitest'
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — modules not found

- [ ] **Step 3: Implement storage.js**

Create `src/lib/storage.js`:

```js
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/storage.js src/lib/__tests__/storage.test.js
git commit -m "feat: add localStorage storage helpers"
```

---

### Task 3: Spaced Repetition Algorithm

**Files:**
- Create: `src/lib/spaced-repetition.js`
- Create: `src/lib/__tests__/spaced-repetition.test.js`

- [ ] **Step 1: Write failing tests for SR core functions**

Create `src/lib/__tests__/spaced-repetition.test.js`:

```js
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
    // Mark q_0 as due for review
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
    // 3 attempted (totalSeen > 0), 2 mastered = 66.7%
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
    // 2 attempted / 5 total = 40%
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — module not found

- [ ] **Step 3: Implement spaced-repetition.js**

Create `src/lib/spaced-repetition.js`:

```js
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
    updated[id] = {
      ...state,
      sessionsSinceLastSeen: state.sessionsSinceLastSeen + 1,
    }
  }
  return updated
}

export function selectRoundQuestions(states, allIds, count, currentSession) {
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

  // Shuffle each bucket for variety
  const shuffle = (arr) => {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  const pool = [
    ...shuffle(due),
    ...shuffle(missed),
    ...shuffle(unseen),
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/spaced-repetition.js src/lib/__tests__/spaced-repetition.test.js
git commit -m "feat: add session-based spaced repetition algorithm"
```

---

### Task 4: Normalize Data Files and Add Categories

**Files:**
- Modify: `src/data/flashcards.js`
- Modify: `src/data/scenarios.js`
- Modify: `src/data/charts.js`
- Modify: `src/data/metars.js`

This task normalizes all data files to a consistent format and adds `categories` arrays. Each data source must export a function `getAllQuestionIds()` that returns IDs in the format `{source}_{id}`.

- [ ] **Step 1: Add `categories` array to flashcards.js**

Each flashcard already has a `category` string field. Add a `categories` array mirroring it. Also add a named export for all question IDs.

In `src/data/flashcards.js`, add at the bottom before the default export:

```js
// Add categories array to each card (mirrors existing category field)
flashcards.forEach(card => {
  card.categories = [card.category]
})

export function getQuestionIds() {
  return flashcards.map(c => `questions_${c.id}`)
}
```

- [ ] **Step 2: Normalize scenarios.js format and add categories**

The current format uses `options: [{text, correct}]`. Normalize to `{options: [string], correctIndex: number}` and add `categories` array.

Replace the options format in each scenario in `src/data/scenarios.js`. Add `categories` array to each scenario based on its content. Add exports:

```js
// At the end of the file, add:
export function getQuestionIds() {
  return scenarios.map(s => `scenarios_${s.id}`)
}
```

Category mappings for existing 10 scenarios:
- Scenario 1 (downtown real estate): `["Operations", "Regulations"]`
- Scenario 2 (beach twilight): `["Operations", "Regulations"]`
- Scenario 3 (airport inspection): `["Airspace", "Regulations"]`
- Scenario 4 (foggy construction): `["Weather", "Operations"]`
- Scenario 5 (emergency TFR): `["Regulations", "Airspace"]`
- Scenario 6 (rooftop tower): `["Operations", "Performance"]`
- Scenario 7 (multi-drone crop): `["Regulations", "Crew Roles"]`
- Scenario 8 (football game): `["Airspace", "Regulations"]`
- Scenario 9 (highway delivery): `["Operations", "Regulations"]`
- Scenario 10 (post-accident): `["Regulations", "Operations"]`

Normalize each scenario's options from `[{text, correct}]` to `{options: [string], correctIndex: number}`:

```js
// For each scenario, change from:
options: [
  { text: "Option A text", correct: false },
  { text: "Option B text", correct: true },
  { text: "Option C text", correct: false },
  { text: "Option D text", correct: false },
]
// To:
options: ["Option A text", "Option B text", "Option C text", "Option D text"],
correctIndex: 1,
```

- [ ] **Step 3: Add categories to charts.js**

In `src/data/charts.js`, add `categories` array to each scenario. Also add exports:

```js
// At the end, add:
export function getQuestionIds() {
  return chartScenarios.flatMap(s =>
    s.questions.map((_, qi) => `charts_${s.id}_${qi}`)
  )
}
```

Category mappings:
- Scenario 1 (Class D): `["Airspace", "Airport Operations"]`
- Scenario 2 (Class C): `["Airspace"]`
- Scenario 3 (Class B): `["Airspace"]`
- Scenario 4 (Class E): `["Airspace"]`
- Scenario 5 (Obstructions): `["Operations"]`
- Scenario 6 (VFR Waypoints): `["Airport Operations"]`
- Scenario 7 (MOA): `["Airspace", "Regulations"]`
- Scenario 8 (Restricted/Prohibited): `["Airspace", "Regulations"]`
- Scenario 9 (TFR): `["Regulations", "Operations"]`
- Scenario 10 (Airport Data): `["Airport Operations"]`

- [ ] **Step 4: Normalize metars.js and add categories**

METAR quiz questions use `{question, answer, options}` where `answer` is the correct text. Normalize to `{question, options, correctIndex, explanation}`. Add `categories` array (all METARs get `["Weather"]`, some also get `["Regulations"]` if they test visibility/cloud clearance rules).

```js
// At the end, add:
export function getQuestionIds() {
  return metarExamples.flatMap(m =>
    m.questions.map((_, qi) => `metar_${m.id}_${qi}`)
  )
}
```

For each question, find the index of `answer` in `options` and set it as `correctIndex`. Add an `explanation` field explaining why.

- [ ] **Step 5: Run build to verify no syntax errors**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add src/data/flashcards.js src/data/scenarios.js src/data/charts.js src/data/metars.js
git commit -m "feat: normalize data formats and add category tags to all sources"
```

---

### Task 5: Visual Foundation — CSS and Fonts

**Files:**
- Modify: `index.html`
- Modify: `src/index.css`

- [ ] **Step 1: Add Google Fonts to index.html**

In `index.html`, add inside `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Rewrite index.css with new design system**

Replace the contents of `src/index.css` with the new theme:

```css
@import "tailwindcss";

@theme {
  /* Cockpit color palette */
  --color-cockpit-bg: #080e1a;
  --color-cockpit-surface: #0c1a2e;
  --color-cockpit-border: rgba(74, 252, 146, 0.12);
  --color-phosphor: #4afc92;
  --color-phosphor-dim: rgba(74, 252, 146, 0.06);
  --color-amber-accent: #fbbf24;
  --color-red-accent: #f87171;
  --color-body-text: #e2e8f0;
  --color-secondary-text: #94a3b8;
  --color-inactive: #64748b;
  --color-divider: #1e293b;

  /* Legacy aliases for components not yet migrated */
  --color-slate-850: #162031;
  --color-slate-925: #0c1322;
}

html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-cockpit-bg);
  color: var(--color-body-text);
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overscroll-behavior: none;
}

/* Instrument font utility */
.font-instrument {
  font-family: 'JetBrains Mono', monospace;
}

/* Atmospheric noise overlay */
.cockpit-noise::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 128px;
  pointer-events: none;
  z-index: 1;
}

/* Faint scanlines */
.cockpit-scanlines::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(74, 252, 146, 0.008) 2px,
    rgba(74, 252, 146, 0.008) 4px
  );
  pointer-events: none;
  z-index: 2;
}

/* Grid background */
.cockpit-grid {
  background-image:
    linear-gradient(rgba(74, 252, 146, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74, 252, 146, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Phosphor glow utility */
.glow-phosphor {
  box-shadow: 0 0 8px rgba(74, 252, 146, 0.15);
}

.glow-phosphor-text {
  text-shadow: 0 0 8px rgba(74, 252, 146, 0.3);
}

/* Touch feedback */
@media (hover: none) {
  .tap-highlight {
    -webkit-tap-highlight-color: transparent;
  }
}

/* Scrollbar styling */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

/* Safe area padding for iOS */
.safe-bottom { padding-bottom: env(safe-area-inset-bottom, 0px); }
.safe-top { padding-top: env(safe-area-inset-top, 0px); }

/* Animation keyframes */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 rgba(74, 252, 146, 0); }
  50% { box-shadow: 0 0 16px rgba(74, 252, 146, 0.3); }
}

.animate-shake { animation: shake 0.4s ease-in-out; }
.animate-pulse-glow { animation: pulse-glow 0.6s ease-in-out; }
```

- [ ] **Step 3: Run build to verify**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add index.html src/index.css
git commit -m "feat: new cockpit design system — fonts, colors, atmospheric effects"
```

---

## Phase 2: Study Mode

### Task 6: Dashboard Component

**Files:**
- Create: `src/components/Dashboard.jsx`

- [ ] **Step 1: Build the Dashboard component**

This component displays: a retention gauge (SVG arc), category retention bars, and a progress metric. It receives all data via props — no internal state.

Create `src/components/Dashboard.jsx`:

```jsx
import { useMemo } from 'react'

function GaugeArc({ value, size = 120 }) {
  const radius = 45
  const circumference = Math.PI * radius
  const filled = (value / 100) * circumference
  const cx = size / 2
  const cy = size / 2 + 10

  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size * 0.7 }}>
      <path
        d={`M ${cx - radius},${cy} A ${radius},${radius} 0 0,1 ${cx + radius},${cy}`}
        fill="none"
        stroke="#0f2e1c"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d={`M ${cx - radius},${cy} A ${radius},${radius} 0 0,1 ${cx + radius},${cy}`}
        fill="none"
        stroke="#4afc92"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circumference}`}
        style={{
          filter: 'drop-shadow(0 0 6px rgba(74,252,146,0.4))',
          transition: 'stroke-dasharray 0.8s ease-out',
        }}
      />
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fill="#e0fde8"
        fontSize="1.375rem"
        fontWeight="800"
        fontFamily="'Plus Jakarta Sans', sans-serif"
      >
        {Math.round(value)}%
      </text>
      <text
        x={cx}
        y={cy + 8}
        textAnchor="middle"
        fill="#4afc92"
        fontSize="0.5rem"
        fontWeight="700"
        letterSpacing="2"
        fontFamily="'JetBrains Mono', monospace"
      >
        RETENTION
      </text>
    </svg>
  )
}

function CategoryBar({ name, value }) {
  const color = value >= 70 ? '#4afc92' : value >= 50 ? '#fbbf24' : '#f87171'
  return (
    <div className="mb-2 last:mb-0">
      <div className="flex justify-between mb-0.5">
        <span className="text-secondary-text text-[0.6875rem]">{name}</span>
        <span className="font-instrument text-body-text text-[0.6875rem] font-bold">
          {Math.round(value)}%
        </span>
      </div>
      <div className="h-[3px] bg-divider rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${value}%`,
            backgroundColor: color,
            boxShadow: `0 0 6px ${color}66`,
          }}
        />
      </div>
    </div>
  )
}

export default function Dashboard({ retention, progress, categoryRetention, roundScore, roundTotal }) {
  const sortedCategories = useMemo(() => {
    return Object.entries(categoryRetention || {})
      .sort(([, a], [, b]) => a - b)
  }, [categoryRetention])

  return (
    <div className="space-y-4">
      {/* Gauge */}
      <div className="flex justify-center">
        <GaugeArc value={retention} />
      </div>

      {/* Round score (if provided) */}
      {roundScore !== undefined && (
        <div className="text-center">
          <span className="font-instrument text-phosphor text-[0.8125rem] font-bold">
            {roundScore}/{roundTotal} correct
          </span>
        </div>
      )}

      {/* Progress bar */}
      <div className="px-1">
        <div className="flex justify-between mb-1">
          <span className="font-instrument text-phosphor text-[0.5625rem] font-bold tracking-widest">
            PROGRESS
          </span>
          <span className="font-instrument text-body-text text-[0.6875rem] font-bold">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-[3px] bg-divider rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-phosphor transition-all duration-700"
            style={{
              width: `${progress}%`,
              boxShadow: '0 0 6px rgba(74,252,146,0.4)',
            }}
          />
        </div>
      </div>

      {/* Category breakdown */}
      {sortedCategories.length > 0 && (
        <div className="bg-cockpit-surface/60 border border-cockpit-border rounded-xl p-3">
          <div className="font-instrument text-phosphor text-[0.5625rem] font-bold tracking-widest mb-2">
            CATEGORY RETENTION
          </div>
          {sortedCategories.map(([cat, val]) => (
            <CategoryBar key={cat} name={cat} value={val} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Run build to verify**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/Dashboard.jsx
git commit -m "feat: add Dashboard component with retention gauge and category bars"
```

---

### Task 7: RoundEngine Component

**Files:**
- Create: `src/components/RoundEngine.jsx`

This is the shared question presentation component. It receives a question object (from any source) and renders it with options, handles answer selection, shows feedback and explanation.

- [ ] **Step 1: Build the RoundEngine component**

Create `src/components/RoundEngine.jsx`:

```jsx
import { useState, useCallback } from 'react'

/**
 * RoundEngine renders a single question with options and feedback.
 *
 * Props:
 *   question: { question, options, correctIndex, explanation, reference?, category? }
 *   questionNumber: current position in round (1-based)
 *   totalQuestions: total in round
 *   onAnswer: (correct: boolean) => void
 *   onNext: () => void
 *   categoryLabel: string (e.g., "WEATHER")
 *   contextElement: optional JSX to show above the question (chart SVG, METAR string, scenario text)
 */
export default function RoundEngine({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  categoryLabel,
  contextElement,
}) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const isAnswered = selectedIndex !== null
  const isCorrect = selectedIndex === question.correctIndex

  const handleSelect = useCallback((index) => {
    if (isAnswered) return
    setSelectedIndex(index)
    onAnswer(index === question.correctIndex)
  }, [isAnswered, question.correctIndex, onAnswer])

  const handleNext = useCallback(() => {
    setSelectedIndex(null)
    onNext()
  }, [onNext])

  const letters = ['A', 'B', 'C', 'D']

  return (
    <div>
      {/* Round progress */}
      <div className="flex items-center gap-2 mb-2">
        <span className="font-instrument text-phosphor text-[0.5625rem] font-extrabold tracking-[0.15em] glow-phosphor-text">
          RND {String(questionNumber).padStart(2, '0')}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-phosphor/15 to-transparent" />
        <span className="font-instrument text-inactive text-[0.5625rem]">
          {String(questionNumber).padStart(2, '0')}/{String(totalQuestions).padStart(2, '0')}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] bg-divider rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-phosphor rounded-full transition-all duration-300"
          style={{
            width: `${(questionNumber / totalQuestions) * 100}%`,
            boxShadow: '0 0 8px rgba(74,252,146,0.4)',
          }}
        />
      </div>

      {/* Context element (chart, METAR, scenario) */}
      {contextElement && (
        <div className="mb-3">
          {contextElement}
        </div>
      )}

      {/* Question card */}
      <div className="bg-phosphor/[0.02] border border-cockpit-border rounded-xl p-4 mb-3" style={{ backdropFilter: 'blur(2px)' }}>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-phosphor" style={{ boxShadow: '0 0 6px rgba(74,252,146,0.5)' }} />
          <span className="font-instrument text-phosphor text-[0.5625rem] font-bold tracking-[0.15em]">
            {categoryLabel}
          </span>
        </div>
        <p className="text-body-text text-[0.875rem] font-semibold leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-1.5 mb-3">
        {question.options.map((opt, i) => {
          let borderClass = 'border-cockpit-border'
          let bgClass = 'bg-cockpit-surface/60'
          let textClass = 'text-secondary-text'
          let letterBg = 'bg-divider'
          let letterColor = 'text-inactive'
          let extraStyle = {}
          let icon = null

          if (isAnswered) {
            if (i === question.correctIndex) {
              borderClass = 'border-phosphor/40'
              bgClass = 'bg-phosphor/[0.08]'
              textClass = 'text-[#bbf7d0]'
              letterBg = 'bg-phosphor/20'
              letterColor = 'text-phosphor'
              extraStyle = { borderWidth: '2px' }
              icon = '✓'
            } else if (i === selectedIndex) {
              borderClass = 'border-red-accent/40'
              bgClass = 'bg-red-accent/[0.08]'
              textClass = 'text-red-300'
              letterBg = 'bg-red-accent/20'
              letterColor = 'text-red-accent'
              extraStyle = { borderWidth: '2px', borderStyle: 'dashed' }
              icon = '✗'
            } else {
              textClass = 'text-inactive'
              letterColor = 'text-inactive/50'
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isAnswered}
              className={`tap-highlight w-full text-left px-3 py-2.5 rounded-[0.625rem] border ${borderClass} ${bgClass} ${textClass} text-[0.8125rem] transition-all flex items-center gap-2.5`}
              style={{ backdropFilter: 'blur(2px)', ...extraStyle }}
            >
              <span className={`w-[1.375rem] h-[1.375rem] rounded-[0.4375rem] ${letterBg} flex items-center justify-center text-[0.625rem] font-extrabold ${letterColor} font-instrument shrink-0`}>
                {icon || letters[i]}
              </span>
              <span className={isAnswered && i === question.correctIndex ? 'font-semibold' : ''}>
                {opt}
              </span>
            </button>
          )
        })}
      </div>

      {/* Explanation (after answering) */}
      {isAnswered && (
        <div className={`mb-3 ${isCorrect ? 'animate-pulse-glow' : 'animate-shake'}`}>
          <div className="bg-phosphor/[0.03] border border-phosphor/10 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="font-instrument text-phosphor text-[0.5625rem] font-bold tracking-widest">
                EXPLANATION
              </span>
            </div>
            <p className="text-secondary-text text-[0.8125rem] leading-relaxed">
              {question.explanation}
            </p>
            {question.reference && (
              <p className="font-instrument text-amber-accent/70 text-[0.6875rem] mt-1.5">
                {question.reference}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Next button */}
      {isAnswered && (
        <button
          onClick={handleNext}
          className="tap-highlight w-full py-3 rounded-xl bg-phosphor/10 border border-phosphor/25 text-phosphor text-[0.875rem] font-semibold active:bg-phosphor/15 transition-colors glow-phosphor"
        >
          {questionNumber < totalQuestions ? 'Next Question →' : 'See Results'}
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Run build to verify**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/RoundEngine.jsx
git commit -m "feat: add RoundEngine component for shared question presentation"
```

---

### Task 8: StudyMode Component

**Files:**
- Create: `src/components/StudyMode.jsx`

This is the wrapper component for the Study tab. It manages sub-navigation, round lifecycle, question selection, and the reward screen.

- [ ] **Step 1: Build the StudyMode component**

Create `src/components/StudyMode.jsx`. This is the largest component — it orchestrates the study experience.

```jsx
import { useState, useCallback, useMemo, useEffect } from 'react'
import RoundEngine from './RoundEngine'
import Dashboard from './Dashboard'
import ChartTrainer from './ChartTrainer'
import MetarDecoder from './MetarDecoder'
import { loadState, saveState, KEYS } from '../lib/storage'
import {
  createQuestionState,
  processAnswer,
  incrementSessionCounters,
  selectRoundQuestions,
  calcRetention,
  calcProgress,
  calcCategoryRetention,
} from '../lib/spaced-repetition'
import flashcards, { getQuestionIds as getFlashcardIds } from '../data/flashcards'
import scenarios, { getQuestionIds as getScenarioIds } from '../data/scenarios'
import chartScenarios, { getQuestionIds as getChartIds } from '../data/charts'
import metarExamples, { getQuestionIds as getMetarIds } from '../data/metars'

const TRACKS = [
  { id: 'questions', label: 'Questions', roundSize: 10 },
  { id: 'scenarios', label: 'Scenarios', roundSize: 3 },
  { id: 'charts', label: 'Charts', roundSize: 3 },
  { id: 'metar', label: 'METAR', roundSize: 2 },
]

function getAllIds(trackId) {
  switch (trackId) {
    case 'questions': return getFlashcardIds()
    case 'scenarios': return getScenarioIds()
    case 'charts': return getChartIds()
    case 'metar': return getMetarIds()
    default: return []
  }
}

function getQuestionData(questionId) {
  const [source, ...rest] = questionId.split('_')
  switch (source) {
    case 'questions': {
      const id = parseInt(rest[0])
      const card = flashcards.find(c => c.id === id)
      if (!card) return null
      return {
        question: card.question,
        options: card.options,
        correctIndex: card.correctIndex,
        explanation: card.explanation,
        reference: card.reference,
        category: card.category,
        categories: card.categories,
      }
    }
    case 'scenarios': {
      const id = parseInt(rest[0])
      const scenario = scenarios.find(s => s.id === id)
      if (!scenario) return null
      return {
        question: scenario.question,
        options: scenario.options,
        correctIndex: scenario.correctIndex,
        explanation: scenario.explanation,
        reference: scenario.references?.join(', '),
        category: scenario.categories?.[0] || 'Operations',
        categories: scenario.categories || ['Operations'],
        context: { type: 'scenario', title: scenario.title, situation: scenario.situation },
      }
    }
    case 'charts': {
      const scenarioId = parseInt(rest[0])
      const qIndex = parseInt(rest[1])
      const chart = chartScenarios.find(s => s.id === scenarioId)
      if (!chart) return null
      const q = chart.questions[qIndex]
      return {
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        category: chart.categories?.[0] || 'Airspace',
        categories: chart.categories || ['Airspace'],
        context: { type: 'chart', chartType: chart.chartType, scenarioId: chart.id },
      }
    }
    case 'metar': {
      const metarId = parseInt(rest[0])
      const qIndex = parseInt(rest[1])
      const metar = metarExamples.find(m => m.id === metarId)
      if (!metar) return null
      const q = metar.questions[qIndex]
      return {
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        category: 'Weather',
        categories: metar.categories || ['Weather'],
        context: { type: 'metar', raw: metar.raw },
      }
    }
    default: return null
  }
}

function getTotalQuestions(trackId) {
  return getAllIds(trackId).length
}

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

  const startRound = useCallback(() => {
    const allIds = getAllIds(activeTrack)
    const selected = selectRoundQuestions(questionStates, allIds, trackConfig.roundSize, session)
    setRoundIds(selected)
    setRoundIndex(0)
    setRoundScore(0)
    setShowReward(false)
  }, [activeTrack, questionStates, trackConfig, session])

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
    } else {
      setRoundIndex(prev => prev + 1)
    }
  }, [roundIndex, roundIds, session])

  const handleTrackChange = useCallback((trackId) => {
    setActiveTrack(trackId)
    setRoundIds(null)
    setShowReward(false)
  }, [])

  const handleNextRound = useCallback(() => {
    startRound()
  }, [startRound])

  // Calculate metrics
  const retention = useMemo(() => calcRetention(questionStates), [questionStates])
  const allTrackIds = useMemo(() => {
    let total = 0
    TRACKS.forEach(t => { total += getAllIds(t.id).length })
    return total
  }, [])
  const progress = useMemo(() => calcProgress(questionStates, allTrackIds), [questionStates, allTrackIds])
  const categoryRetention = useMemo(() => calcCategoryRetention(questionStates), [questionStates])

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

    // Charts: delegate to ChartTrainer SVG renderer
    if (ctx.type === 'chart') {
      return (
        <div className="bg-cockpit-surface/60 border border-cockpit-border rounded-xl p-3">
          <div className="font-instrument text-phosphor text-[0.5625rem] font-bold tracking-widest mb-1.5">
            IDENTIFY THE CHART SYMBOLS
          </div>
          {/* ChartTrainer SVGs will be extracted to a shared renderer in implementation */}
          <div className="text-secondary-text text-[0.75rem]">
            [Chart SVG for {ctx.chartType}]
          </div>
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
          <span className="text-phosphor text-[0.75rem]" style={{ filter: 'drop-shadow(0 0 4px rgba(74,252,146,0.4))' }}>✦</span>
        </div>
        <span className="font-instrument text-body-text text-[0.8125rem] font-extrabold tracking-[0.15em]">RPR</span>
        <div className="ml-auto flex gap-1.5">
          <span className="font-instrument text-phosphor text-[0.625rem] font-bold glow-phosphor-text">
            {Math.round(retention)}% <span className="text-phosphor/60 font-semibold">RET</span>
          </span>
          <span className="text-divider">·</span>
          <span className="font-instrument text-phosphor text-[0.625rem] font-bold glow-phosphor-text">
            {Math.round(progress)}% <span className="text-phosphor/60 font-semibold">PROG</span>
          </span>
        </div>
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
              Next Round →
            </button>
          </div>
        ) : currentQuestion ? (
          <RoundEngine
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
```

- [ ] **Step 2: Run build to verify**

Run: `npm run build`
Expected: Build succeeds (note: chart SVG rendering is a placeholder — will be connected in Task 10)

- [ ] **Step 3: Commit**

```bash
git add src/components/StudyMode.jsx
git commit -m "feat: add StudyMode with round lifecycle and SR integration"
```

---

### Task 9: Restructure App.jsx — 4 Tabs, All Mounted

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Rewrite App.jsx with 4-tab structure**

Replace `src/App.jsx` entirely. Key changes:
- 4 tabs: Study, Exam, E6B, Reference
- All components mounted, visibility controlled by CSS `display: none`
- New tab icons matching cockpit aesthetic
- Import StudyMode instead of Flashcards/ScenarioTrainer/ChartTrainer/MetarDecoder

```jsx
import { useState } from 'react'
import StudyMode from './components/StudyMode'
import Calculator from './components/Calculator'
import QuickReference from './components/QuickReference'

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

function ExamPlaceholder() {
  return (
    <div className="px-4 py-8 text-center">
      <div className="font-instrument text-phosphor text-[0.6875rem] font-bold tracking-widest mb-2">
        EXAM MODE
      </div>
      <p className="text-secondary-text text-[0.875rem]">Coming soon — 60 questions, 2 hours, 70% to pass.</p>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('study')

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
            <p className="font-instrument text-phosphor/60 text-[0.5rem] tracking-[0.15em]">PART 107</p>
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
            <ExamPlaceholder />
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
        <div className="max-w-2xl mx-auto flex">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tap-highlight flex-1 flex flex-col items-center gap-1 py-2 pt-3 transition-colors ${
                  isActive ? 'text-phosphor' : 'text-inactive active:text-secondary-text'
                }`}
              >
                {isActive && (
                  <div className="w-[5px] h-[5px] rounded-full bg-phosphor absolute -top-0.5"
                    style={{ boxShadow: '0 0 6px rgba(74,252,146,0.5)' }} />
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
```

- [ ] **Step 2: Delete old components that are now replaced**

```bash
rm src/components/Flashcards.jsx src/components/ScenarioTrainer.jsx
```

These are replaced by StudyMode + RoundEngine.

- [ ] **Step 3: Run build to verify**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Test in browser**

Run: `npm run dev`
Verify: App loads with 4 tabs, Study tab shows questions with the new cockpit theme.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: restructure to 4-tab layout with cockpit design system"
```

---

### Task 10: Extract Chart SVG Renderers for Reuse

**Files:**
- Create: `src/components/ChartSvg.jsx`
- Modify: `src/components/ChartTrainer.jsx`
- Modify: `src/components/StudyMode.jsx`

The chart SVG illustrations currently live inside ChartTrainer.jsx. Extract them into a shared component so StudyMode can render them as context elements.

- [ ] **Step 1: Extract SVG renderers into ChartSvg.jsx**

Create `src/components/ChartSvg.jsx` by moving the SVG function components (`AirportClassD`, `AirportClassC`, `ClassB`, `ClassE`, `Obstructions`, `VfrWaypoints`, `Moa`, `RestrictedArea`, `Tfr`, `AirportData`) and the `chartRenderers` map from `ChartTrainer.jsx`.

Export the map:

```jsx
// At the bottom of ChartSvg.jsx:
export const chartRenderers = {
  airport_class_d: AirportClassD,
  airport_class_c: AirportClassC,
  class_b: ClassB,
  class_e: ClassE,
  obstructions: Obstructions,
  vfr_waypoints: VfrWaypoints,
  moa: Moa,
  restricted_area: RestrictedArea,
  tfr: Tfr,
  airport_data: AirportData,
}
```

- [ ] **Step 2: Update ChartTrainer.jsx to import from ChartSvg**

Replace the local SVG definitions with:

```jsx
import { chartRenderers } from './ChartSvg'
```

Remove all the SVG function components from ChartTrainer.jsx.

- [ ] **Step 3: Update StudyMode.jsx chart context rendering**

In `StudyMode.jsx`, replace the placeholder chart rendering with:

```jsx
import { chartRenderers } from './ChartSvg'
import chartScenarios from '../data/charts'

// In the contextElement useMemo, for type === 'chart':
if (ctx.type === 'chart') {
  const chart = chartScenarios.find(s => s.id === ctx.scenarioId)
  const ChartSvg = chartRenderers[ctx.chartType]
  return (
    <div className="bg-cockpit-surface/60 border border-cockpit-border rounded-xl p-3">
      <div className="font-instrument text-phosphor text-[0.5625rem] font-bold tracking-widest mb-1.5">
        IDENTIFY THE CHART SYMBOLS
      </div>
      {ChartSvg && <ChartSvg />}
    </div>
  )
}
```

- [ ] **Step 4: Run build and verify**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/components/ChartSvg.jsx src/components/ChartTrainer.jsx src/components/StudyMode.jsx
git commit -m "refactor: extract chart SVG renderers for reuse across components"
```

---

## Phase 3: Exam Mode

### Task 11: ExamMode Component

**Files:**
- Create: `src/components/ExamMode.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Build the ExamMode component**

Create `src/components/ExamMode.jsx` with four screens: setup, question, review, results.

This is a large component. Key features:
- 60 questions selected from all pools (weighted toward weak categories)
- 2-hour countdown timer (persisted to localStorage on each tick)
- Flag/unflag questions
- Question navigator (dot grid)
- Prev/Next navigation, can change answers
- Review screen before submit
- Results screen with pass/fail, category breakdown, answer review with explanations

```jsx
import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import Dashboard from './Dashboard'
import { loadState, saveState, removeState, KEYS } from '../lib/storage'
import {
  selectRoundQuestions,
  calcCategoryRetention,
} from '../lib/spaced-repetition'
// Import data sources and getQuestionData helper
// (Share getQuestionData from StudyMode by extracting to a utility — see Step 2)

const EXAM_TIME = 2 * 60 * 60 * 1000 // 2 hours in ms
const EXAM_SIZE = 60
const PASS_THRESHOLD = 0.7

// ... Full implementation with:
// - ExamSetup screen
// - ExamQuestion screen with timer, flag, nav
// - ExamReview screen with question grid
// - ExamResults screen with score, category breakdown, answer review
```

The full implementation should follow the patterns established in StudyMode and RoundEngine. The exam state (answers, flags, timer) persists to `KEYS.ACTIVE_EXAM` on every change so it survives tab switches and page refreshes.

- [ ] **Step 2: Extract getQuestionData to shared utility**

Move the `getQuestionData` function from `StudyMode.jsx` to a new file `src/lib/question-data.js` so both StudyMode and ExamMode can use it.

```js
// src/lib/question-data.js
import flashcards from '../data/flashcards'
import scenarios from '../data/scenarios'
import chartScenarios from '../data/charts'
import metarExamples from '../data/metars'

export function getQuestionData(questionId) {
  // ... same implementation as currently in StudyMode
}

export function getAllQuestionIds() {
  // Returns all IDs across all sources
}
```

Update StudyMode.jsx to import from `../lib/question-data`.

- [ ] **Step 3: Replace ExamPlaceholder in App.jsx**

```jsx
import ExamMode from './components/ExamMode'

// Replace <ExamPlaceholder /> with <ExamMode />
```

- [ ] **Step 4: Run build and test**

Run: `npm run build && npm run dev`
Verify: Exam tab shows setup screen, can start exam, timer works, can flag questions, can review and submit.

- [ ] **Step 5: Commit**

```bash
git add src/components/ExamMode.jsx src/lib/question-data.js src/components/StudyMode.jsx src/App.jsx
git commit -m "feat: add ExamMode with timer, flag, navigator, and results"
```

---

## Phase 4: Content Expansion

### Task 12: Expand Question Bank to 200+

**Files:**
- Modify: `src/data/flashcards.js`

- [ ] **Step 1: Expand flashcards to 200+ questions**

Add ~100 more questions across all 8 categories, maintaining the existing format. Target distribution:
- Regulations: 35+ total
- Airspace: 25+ total
- Weather: 25+ total
- Operations: 25+ total
- Crew Roles: 15+ total
- Performance: 20+ total (add E6B-requiring calculation questions)
- Airport Operations: 20+ total
- Physiology: 15+ total

Include questions that require E6B calculator use (density altitude calculations, wind correction, time/speed/distance). These test whether students can switch to the E6B tab and compute answers.

All content must be factually accurate to current Part 107 regulations.

- [ ] **Step 2: Verify question count and format**

```bash
node --input-type=module -e "
import flashcards, { categories } from './src/data/flashcards.js';
console.log('Total:', flashcards.length);
const cats = {};
flashcards.forEach(q => { cats[q.category] = (cats[q.category]||0)+1; });
console.log('Per category:', cats);
const bad = flashcards.filter(q => !q.options || q.options.length !== 4 || q.correctIndex === undefined || !q.explanation);
console.log('Bad format:', bad.length);
"
```

Expected: 200+ total, 0 bad format

- [ ] **Step 3: Commit**

```bash
git add src/data/flashcards.js
git commit -m "feat: expand question bank to 200+ with E6B calculation questions"
```

---

### Task 13: Expand Scenarios and METARs

**Files:**
- Modify: `src/data/scenarios.js`
- Modify: `src/data/metars.js`

- [ ] **Step 1: Add 5-10 more scenarios to scenarios.js**

Target 15-20 total scenarios covering:
- Scenarios requiring E6B calculations (density altitude affecting flight)
- Night operations decisions
- Operations over people (Category 1-4)
- Remote ID compliance situations
- Multi-crew coordination challenges

Each scenario needs: `id`, `title`, `situation`, `question`, `options` (4 strings), `correctIndex`, `explanation`, `references`, `categories`.

- [ ] **Step 2: Add 3-5 more METARs to metars.js**

Target 8 total METARs covering:
- Thunderstorm activity (TS in weather)
- Variable wind conditions
- Low visibility with fog
- High altitude station
- Complex remarks section

Each METAR needs: `id`, `raw`, `breakdown`, `questions` (3 per METAR with normalized format), `categories`.

- [ ] **Step 3: Run build to verify**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/data/scenarios.js src/data/metars.js
git commit -m "feat: expand scenarios to 15+ and METARs to 8"
```

---

## Phase 5: Polish

### Task 14: Update Calculator and QuickReference Styling

**Files:**
- Modify: `src/components/Calculator.jsx`
- Modify: `src/components/QuickReference.jsx`

- [ ] **Step 1: Update Calculator.jsx to use new design tokens**

Replace color references:
- `bg-slate-925` → `bg-cockpit-bg`
- `bg-slate-800` → `bg-cockpit-surface`
- `border-slate-700/50` → `border-cockpit-border`
- `text-sky-400` → `text-phosphor`
- `bg-sky-500/15` → `bg-phosphor/10`
- `text-slate-300` → `text-body-text`
- `text-slate-400` → `text-secondary-text`
- `text-slate-500` → `text-inactive`

Add `font-instrument` class to labels and data readouts.
Change body text font references to use Plus Jakarta Sans (inherited from body).

- [ ] **Step 2: Update QuickReference.jsx similarly**

Same color token replacements as Calculator.

- [ ] **Step 3: Run build and visual check**

Run: `npm run dev`
Verify: E6B and Reference tabs match the cockpit aesthetic.

- [ ] **Step 4: Commit**

```bash
git add src/components/Calculator.jsx src/components/QuickReference.jsx
git commit -m "feat: update Calculator and QuickReference to cockpit design system"
```

---

### Task 15: Push and Deploy

**Files:** None (git operations only)

- [ ] **Step 1: Run full test suite**

```bash
npm test
```

Expected: All tests pass

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build succeeds, no warnings

- [ ] **Step 3: Push to remote**

```bash
git push origin claude/part107-study-app-b6tTW
```

- [ ] **Step 4: Verify Vercel deployment**

Check https://remote-pilot-ready.vercel.app once Vercel finishes building. Verify:
- 4 tabs visible and functional
- Study mode: rounds work, SR persists, reward screen shows
- E6B: switching to E6B and back preserves study state
- Cockpit aesthetic applied consistently
- Mobile viewport: questions fit on screen without scroll

- [ ] **Step 5: Commit any hotfixes if needed**

---

## Task Dependency Graph

```
Task 1 (tests) ─────────────────────────────────────────┐
Task 2 (storage) ──────┐                                 │
Task 3 (SR algorithm) ─┤                                 │
Task 4 (data normalize)┤                                 │
Task 5 (CSS/fonts) ────┤                                 │
                        ├── Task 6 (Dashboard) ──┐       │
                        ├── Task 7 (RoundEngine) ┤       │
                        │                         ├── Task 8 (StudyMode) ──┐
                        │                         │                         ├── Task 9 (App.jsx) ──── Task 10 (ChartSvg) ──┐
                        │                         │                         │                                               │
                        │                         │                         ├── Task 11 (ExamMode) ────────────────────────┤
                        │                         │                         │                                               │
                        │                         │                         ├── Task 12 (expand questions) ────────────────┤
                        │                         │                         │                                               │
                        │                         │                         ├── Task 13 (expand scenarios/metar) ──────────┤
                        │                         │                         │                                               │
                        │                         │                         └── Task 14 (style Calculator/QuickRef) ───────┤
                        │                         │                                                                         │
                        │                         │                                                                         └── Task 15 (push/deploy)
```

Tasks 1-5 can run in parallel.
Tasks 6-7 can run in parallel (depend on Tasks 2-5).
Task 8 depends on 6 and 7.
Task 9 depends on 8.
Tasks 10-14 can mostly run in parallel after Task 9.
Task 15 is the final step.
