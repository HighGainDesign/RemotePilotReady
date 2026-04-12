# RemotePilotReady — App Redesign Spec

## Overview

Restructure the Part 107 study app from 6 flat tabs into a focused 4-tab architecture with spaced repetition, chunked study rounds, exam simulation, and an aviation instrument panel aesthetic with full accessibility compliance.

## App Structure

### Navigation — 4 Tabs (all mounted, CSS-hidden)

| Tab | Purpose |
|-----|---------|
| Study | Chunked rounds across 4 tracks with spaced repetition |
| Exam | 60-question timed practice exam mirroring the real PSI test |
| E6B | Aviation calculator (density alt, heading, crosswind, TSD, converter, guide) |
| Reference | Quick reference cards for key Part 107 numbers |

All tab components stay mounted (CSS `display: none` when inactive) so state is preserved across tab switches. Critical for: exam timer continuing while using E6B, study round progress persisting.

### Study Tab — Sub-Navigation

Segmented control at top with 4 tracks:
- **Questions** — 200+ multiple choice from question bank
- **Scenarios** — 15-20 interactive decision scenarios
- **Charts** — 10 sectional chart exercises with SVG illustrations
- **METAR** — 5-8 decode + quiz exercises

Each track maintains independent round state. Default opens to Questions (or last-used track).

## Study Mode — Round Flow

### Round Structure

| Track | Questions per Round |
|-------|-------------------|
| Questions | 10 |
| Scenarios | 3 |
| Charts | 3 |
| METAR | 2 |

Rounds are mixed across categories, weighted toward weak areas (categories with lower retention %).

### Round Flow

```
Start Round → Q1 → Answer → Feedback + Explanation → Q2 → ... → Q10 → Reward Screen
```

- Each question: answer, see immediate feedback (correct/wrong), see explanation, tap Next
- No recycling within the round — wrong answers are scheduled for future sessions via SR
- Round is always the fixed size — answer and move on
- Round complete → Reward screen with retention dashboard

### Reward Screen (after each round)

- Gauge animation showing retention rate update
- Category bars showing what shifted
- Score for this round (e.g., "8/10 correct")
- Progress progress (e.g., "62% of material seen")
- "Next Round" button or exit

## Spaced Repetition — Session-Based SM-2

### Why Session-Based (not Day-Based)

- Users may cram multiple sessions in one day before an exam
- Users may skip days/weeks — day-based would dump overdue items
- No push notifications to enforce daily schedule
- Sessions increment naturally as the user studies

### Per-Question State

```js
{
  questionId: "q_42",
  source: "questions",           // questions | scenarios | charts | metar
  categories: ["Weather"],       // 1-2 categories per question
  interval: 4,                   // sessions until next review
  sessionsSinceLastSeen: 5,      // incremented each completed round
  easeFactor: 2.5,               // SM-2 ease modifier (starts 2.5)
  correctStreak: 3,              // consecutive correct answers
  totalSeen: 5,                  // times appeared
  totalCorrect: 4,               // times answered correctly
  mastered: false                // true when interval >= 16
}
```

### Algorithm

**On correct answer:**
```
correctStreak++
interval = round(interval * easeFactor)    // grows: 1→2→4→8→16+
easeFactor += 0.1 (max 3.0)
sessionsSinceLastSeen = 0
if interval >= 16 → mastered = true
```

**On wrong answer:**
```
correctStreak = 0
interval = 1                               // see next session
easeFactor -= 0.2 (min 1.3)
sessionsSinceLastSeen = 0
mastered = false
```

### Round Question Selection (priority order)

1. **Due for review**: `sessionsSinceLastSeen >= interval`
2. **Recently missed**: `interval = 1` (short cycle)
3. **New unseen questions**: fill remaining slots

Weighted toward weak categories (lower retention %).

### Session Counter

Shared across all tracks. Incremented each time any round is completed. All tracks use the same session counter so intervals are consistent.

## Retention Model

### Two Metrics

- **Retention** = mastered / attempted (%) — "How well do I remember what I've studied?"
- **Progress** = attempted / total (%) — "How much material have I worked through?"

Both shown as percentages so they remain stable when the question bank grows.

### Category Retention (unified across tracks)

Categories: Regulations, Airspace, Weather, Operations, Crew Roles, Performance, Airport Operations, Physiology

All sources (questions, scenarios, charts, METAR) are tagged with 1-2 categories. Category retention aggregates across all sources:

```
Airspace retention = all mastered Airspace-tagged items / all attempted Airspace-tagged items
```

### Track Progress (separate)

```
Questions: 72/200 attempted
Scenarios: 6/15 attempted
Charts: 7/10 attempted
METAR: 3/8 attempted
```

### Category Tags by Source

Questions: already have `category` field, add `categories` array for consistency.

Scenarios: add `categories` array. Example mappings:
- "Drone approaching controlled airspace" → [Airspace, Regulations]
- "Thunderstorm approaching" → [Weather, Operations]

Charts: add `categories` array. Example mappings:
- Class D Airport → [Airspace, Airport Operations]
- MOA → [Airspace, Regulations]
- TFR & NOTAMs → [Regulations, Operations]

METAR: add `categories` array. Primarily [Weather], some touch [Regulations] for visibility/cloud clearance questions.

## Exam Mode

### Setup Screen

- Brief intro text: "60 questions, 2 hours, 70% to pass"
- "Begin Exam" button
- Previous exam score shown if exists

### During Exam

- **Timer**: top corner, small monospace, counts down from 2:00:00
- **Question counter**: "Q 12/60"
- **Flag count**: number of flagged questions
- **Navigation**: Prev/Next buttons, flag toggle button
- **Question navigator**: dot grid (filled = answered, hollow = unanswered, flag icon = flagged), tap to jump
- **No explanations** during exam
- **Can change answers** — go back and revise
- **Can skip** — leave unanswered and return later

### Review Screen (before submit)

- Grid showing all 60 questions with status (answered/unanswered/flagged)
- Warning: "You have X unanswered and Y flagged questions"
- "Submit Exam" or "Continue Reviewing"

### Results Screen (after submit)

- Pass/fail with score: "PASSED — 82%" or "FAILED — 64%"
- 70% threshold to pass
- Category breakdown showing strong/weak areas
- "Review Answers" button → step through each question showing:
  - Your answer (highlighted)
  - Correct answer (shown)
  - Explanation (now revealed)
- Results saved to exam history in localStorage

### Question Pool

~60 questions drawn from all sources:
- ~45 from question bank (direct MC questions)
- ~8 scenario-based (scenario description + single MC question extracted from each scenario's question set)
- ~4 chart-based (chart SVG shown + single MC question extracted from each chart's question set)
- ~3 METAR-based (METAR string shown + single MC question extracted from each METAR's quiz)

In exam mode, multi-question scenarios/charts/METARs are decomposed into individual standalone questions. Each appears as: context (scenario text / chart SVG / METAR string) + one MC question. Weighted toward weak categories. Approximate distribution varies per exam.

### Exam Readiness Gate

If progress < 50%, show warning: "You've covered X% of the material. Consider studying more before taking a practice exam." Advisory only — don't block.

## Persistence (localStorage)

```js
"rpr_questions"     // Per-question SR state (all sources keyed by id)
"rpr_session"       // Session counter (number)
"rpr_active_round"  // Current round state (track, questionIds, currentIndex, answers)
"rpr_active_exam"   // Exam state (questionIds, answers, flagged, startTime, timeRemaining)
"rpr_exam_history"  // Array of past exam results
```

All data is per-browser, per-device. No cross-device sync (future consideration requiring a backend).

## Visual Design

### Aesthetic: Aviation Instrument Panel (Accessible)

**Color palette:**
```
Primary accent:    #4afc92  (boosted phosphor green)
Background:        #080e1a  (deep navy-black)
Surface:           #0c1a2e  (cards, elevated areas)
Border:            rgba(74,252,146,0.12)  (subtle green tint)
Body text:         #e2e8f0  (high contrast cream-white)
Secondary text:    #94a3b8  (muted labels — 4.6:1 contrast, passes AA)
Inactive:          #64748b  (inactive tabs, secondary nav — 4.6:1, passes AA)
Dividers:          #1e293b  (structural lines)

Correct:           #4afc92 + ✓ icon + 2px solid border
Wrong:             #f87171 + ✗ icon + 2px dashed border
Warning/weak:      #fbbf24  (amber)
```

**Important**: Never use opacity to dim accessible text. Use lighter/heavier font-weight for visual hierarchy instead of reducing opacity, which drops contrast below AA thresholds.

### Typography

- **Display/Instrument** (`'JetBrains Mono', monospace`): labels, data readouts, category tags, timers, CFR references, navigation, round indicators. The cockpit voice. Distinctive and highly legible at small sizes.
- **Body** (`'Plus Jakarta Sans', sans-serif`): question text, explanations, option text, body copy. Geometric, modern, very readable. More personality than system font.
- Loaded via Google Fonts: `JetBrains+Mono:wght@400;600;700;800` and `Plus+Jakarta+Sans:wght@400;500;600;700;800`
- All sizes in `rem` — no fixed `px` for text. Respects browser font scaling.
- Minimum body text: `0.8125rem` (13px equivalent at default zoom).

### Atmospheric Effects

- **Noise texture overlay**: subtle film grain via inline SVG filter, adds LCD display depth. `pointer-events: none`, purely decorative.
- **Faint scanlines**: barely visible horizontal lines via `repeating-linear-gradient`, CRT/instrument display feel. `pointer-events: none`.
- **Grid background**: subtle 20px grid pattern, like avionics graph paper. Applied via `background-image` on the main surface.
- **Phosphor glow**: active elements emit soft green light via `box-shadow: 0 0 Npx rgba(74,252,146,0.X)` and `text-shadow`. Additive only (makes things brighter, never reduces contrast).
- **Backdrop blur**: `backdrop-filter: blur(2-4px)` on option cards and overlays for glass-panel depth.

All effects are decorative overlays — they do not affect text contrast or readability.

### Header — Dual Metrics

The header badge shows both retention and progress:
```
[90% RET · 60% PROG]
```
Both in JetBrains Mono. Retention is primary (brighter), progress is secondary (slightly lighter weight). Both must pass AA contrast.

### Single-Screen Constraint

Text-only questions (question bank, scenarios) must fit on a single phone screen with no scrolling. Target layout budget on iPhone SE (484px usable):

```
Header + sub-nav:       ~80px
Round indicator + bar:  ~30px
Question card:          ~80-120px (max 3 lines)
4 option buttons:       ~200px (4 × 48px + gaps)
Total:                  ~390-430px  ← fits within 484px
```

Rules:
- Question text: max 3 lines at body size. Longer questions scroll internally — options stay visible.
- Option text: single line preferred, wraps to 2 lines max.
- Explanation appears only after answering, below the fold — acceptable since the user has already committed.
- Category pills and stats: single compact row.

Visual questions (Charts, METAR) are exempt — the chart SVG or METAR string is the primary content and takes ~200px. Options appear below the fold; a short scroll is acceptable since studying the visual IS the exercise.

### Accessibility (WCAG AA)

- All text: minimum 4.5:1 contrast ratio against background
- State indication: always color + icon + border weight (never color alone)
- Font sizes in `rem` (respects user zoom and browser font-size settings)
- Touch targets: minimum 44x44px
- Layout: no clipping or horizontal scroll at 200% browser zoom
- Color-blind safe: #4afc92 has high luminance, distinguishable for protanopia/deuteranopia. State redundancy (icon + border) eliminates reliance on color perception.
- Visual hierarchy via font-weight, not opacity — never dim text below AA contrast
- Inactive tabs use #64748b (4.6:1), not #334155 (1.8:1 — fails)

### Components

- Gauge arcs (SVG) for retention visualization, with phosphor glow
- Cards with subtle green-tinted borders and backdrop blur
- Rounded corners: `0.625rem` (10px) cards, `0.5rem` (8px) buttons
- Option buttons: letter badge (JetBrains Mono) + text (Plus Jakarta Sans), multi-signal feedback
- Progress bars: thin (2-3px), green fill with glow on dark track
- Tab bar: glowing dot indicator for active tab, JetBrains Mono labels
- Round indicator: "RND 03" with gradient fade line (HUD style)
- Category indicator: glowing dot + monospace label

### Micro-interactions (CSS only)

- Gauge arc: `stroke-dashoffset` transition on retention update
- Correct answer: brief green pulse glow (box-shadow animation)
- Wrong answer: brief horizontal shake (transform keyframes)
- Round complete: gauge sweep animation on reward screen
- Tab switch: subtle opacity fade
- Progress bar fill: glow intensifies at leading edge

## Implementation Scope

### New Files

| File | Purpose |
|------|---------|
| `src/components/StudyMode.jsx` | Wrapper with sub-nav, delegates to track components, shows reward screen |
| `src/components/ExamMode.jsx` | Full exam flow: setup, questions, review, results |
| `src/components/Dashboard.jsx` | Gauge, category bars, progress — used in reward screen and exam results |
| `src/components/RoundEngine.jsx` | Shared question presentation, answer handling, explanation display |
| `src/lib/spaced-repetition.js` | SR algorithm, round question selection, retention calculation |
| `src/lib/storage.js` | localStorage helpers with JSON serialization |

### Modified Files

| File | Changes |
|------|---------|
| `src/App.jsx` | 4 tabs (down from 6), all components mounted with CSS hidden, new tab icons |
| `src/components/Flashcards.jsx` | Refactor to receive questions from RoundEngine, remove self-managed state |
| `src/components/ScenarioTrainer.jsx` | Refactor for RoundEngine integration |
| `src/components/ChartTrainer.jsx` | Refactor for RoundEngine, add explanations for wrong answers |
| `src/components/MetarDecoder.jsx` | Refactor for RoundEngine, add explanations for wrong answers |
| `src/index.css` | New color tokens (#4afc92), rem type scale, remove old card-flip CSS |

### Modified Data Files

| File | Changes |
|------|---------|
| `src/data/flashcards.js` | Expand to 200+ questions, add `categories` array field |
| `src/data/scenarios.js` | Add `categories` array field, expand to 15-20 scenarios |
| `src/data/charts.js` | Add `categories` array field |
| `src/data/metars.js` | Add `categories` array field, expand to 5-8 METARs |

### No Changes

- `src/components/Calculator.jsx` — already complete
- `src/components/QuickReference.jsx` — already complete

### Out of Scope

- Cross-device sync (requires backend)
- Push notifications
- Sound effects
- User accounts / auth
- Native iOS wrapper (future phase)
