# RemotePilotReady

A free, open-source study app for the FAA Part 107 Remote Pilot Certificate exam.

**Live at [rpr.highga.in](https://rpr.highga.in)**

## Features

- **200+ multiple-choice questions** across 8 categories (Regulations, Airspace, Weather, Operations, Crew Roles, Performance, Airport Operations, Physiology)
- **Session-based spaced repetition** — wrong answers come back at increasing intervals until mastered
- **Practice exam simulator** — 60 questions, 2-hour timer, flag/skip/review, 70% pass threshold (mirrors real PSI test)
- **Sectional chart trainer** — SVG-based airspace, obstruction, and airport symbol exercises
- **METAR decoder** — practice decoding real weather reports with comprehension quizzes
- **E6B calculator** — density altitude, magnetic heading, crosswind, time/speed/distance, unit converter
- **Quick reference cards** — key Part 107 numbers at a glance
- **Installable as PWA** — works offline on any device

## Tech Stack

React 19, Vite 8, Tailwind CSS v4, Vitest, Vercel

## Development

```bash
npm install
npm run dev      # dev server at localhost:5173
npm run build    # production build
npm test         # run tests (22 tests)
```

## License

MIT License. Copyright (c) 2026 Anand Mandapati, High Gain Design.
