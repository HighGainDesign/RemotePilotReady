export default function LandingPage({ onEnter }) {
  return (
    <div className="min-h-screen bg-cockpit-bg cockpit-grid relative overflow-x-hidden">
      <div className="cockpit-noise absolute inset-0 pointer-events-none" />
      <div className="cockpit-scanlines absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        {/* Hero */}
        <section className="flex flex-col items-center text-center pt-8 pb-16">
          <div className="w-24 h-24 mb-8 animate-drone-glow">
            <svg viewBox="0 0 64 64" className="w-24 h-24" fill="none">
              <rect x="26" y="28" width="12" height="8" rx="2" fill="#4afc92" />
              <line x1="28" y1="30" x2="18" y2="22" stroke="#4afc92" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
              <line x1="36" y1="30" x2="46" y2="22" stroke="#4afc92" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
              <line x1="28" y1="34" x2="18" y2="42" stroke="#4afc92" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
              <line x1="36" y1="34" x2="46" y2="42" stroke="#4afc92" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
              <ellipse cx="18" cy="22" rx="7" ry="2" fill="#4afc92" opacity="0.3" />
              <ellipse cx="46" cy="22" rx="7" ry="2" fill="#4afc92" opacity="0.3" />
              <ellipse cx="18" cy="42" rx="7" ry="2" fill="#4afc92" opacity="0.3" />
              <ellipse cx="46" cy="42" rx="7" ry="2" fill="#4afc92" opacity="0.3" />
              <circle cx="18" cy="22" r="2.5" fill="#4afc92" />
              <circle cx="46" cy="22" r="2.5" fill="#4afc92" />
              <circle cx="18" cy="42" r="2.5" fill="#4afc92" />
              <circle cx="46" cy="42" r="2.5" fill="#4afc92" />
              <circle cx="32" cy="37" r="2" fill="#080e1a" stroke="#4afc92" strokeWidth="0.8" />
            </svg>
          </div>

          <h1 className="font-instrument text-body-text text-2xl sm:text-3xl font-extrabold tracking-[0.2em] leading-tight mb-3">
            REMOTEPILOTREADY
          </h1>
          <p className="font-instrument text-phosphor text-sm sm:text-base tracking-[0.15em] glow-phosphor-text mb-4">
            Part 107 Certification Study
          </p>
          <p className="text-secondary-text text-base sm:text-lg max-w-md">
            Ace your FAA Part 107 exam
          </p>

          <button
            onClick={onEnter}
            className="mt-10 px-8 py-3 bg-phosphor text-cockpit-bg font-instrument font-bold text-sm tracking-[0.1em] rounded-lg animate-cta-glow transition-transform active:scale-95"
          >
            START STUDYING
          </button>
        </section>

        {/* Features */}
        <section className="pb-16">
          <div className="grid grid-cols-2 gap-3">
            <FeatureCard
              icon={<QuestionsIcon />}
              title="200+ Questions"
              desc="Spaced repetition algorithm adapts to what you know"
            />
            <FeatureCard
              icon={<ExamIcon />}
              title="Exam Simulator"
              desc="60 questions, 2-hour timer, 70% to pass — just like the real test"
            />
            <FeatureCard
              icon={<ChartIcon />}
              title="Chart Trainer"
              desc="Learn to read sectional charts with interactive SVG exercises"
            />
            <FeatureCard
              icon={<MetarIcon />}
              title="METAR Decoder"
              desc="Practice decoding real weather reports"
            />
            <FeatureCard
              icon={<E6BIcon />}
              title="E6B Calculator"
              desc="Density altitude, wind correction, time/speed/distance"
            />
            <FeatureCard
              icon={<ProgressIcon />}
              title="Track Progress"
              desc="Retention and progress metrics show when you're exam-ready"
            />
          </div>
        </section>

        {/* How it works */}
        <section className="pb-16">
          <h2 className="font-instrument text-body-text text-xs tracking-[0.2em] uppercase mb-6 text-center">
            How It Works
          </h2>
          <div className="flex flex-col gap-4">
            <Step num="01" title="Study in rounds" desc="10 questions per round, wrong answers come back later" />
            <Step num="02" title="Build retention" desc="Spaced repetition ensures you remember, not just memorize" />
            <Step num="03" title="Take practice exams" desc="Simulate the real PSI testing experience" />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="pb-16 text-center">
          <button
            onClick={onEnter}
            className="px-8 py-3 bg-phosphor text-cockpit-bg font-instrument font-bold text-sm tracking-[0.1em] rounded-lg animate-cta-glow transition-transform active:scale-95"
          >
            START STUDYING
          </button>
        </section>

        {/* Footer */}
        <footer className="border-t border-cockpit-border pt-8 pb-12 text-center space-y-3">
          <p className="text-inactive text-xs">
            &copy; 2026 Anand Mandapati, High Gain Design
          </p>
          <p className="text-inactive text-xs">
            <a
              href="https://github.com/anandman/RemotePilotReady"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-text hover:text-phosphor transition-colors"
            >
              MIT Licensed
            </a>
          </p>
          <p className="text-inactive text-xs">
            Built with{' '}
            <span className="text-secondary-text">React</span>
            {' + '}
            <span className="text-secondary-text">Vite</span>
            {' + '}
            <span className="text-secondary-text">Tailwind</span>
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes drone-glow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(74,252,146,0.2)); }
          50% { filter: drop-shadow(0 0 20px rgba(74,252,146,0.5)); }
        }
        @keyframes cta-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(74,252,146,0); }
          50% { box-shadow: 0 0 20px rgba(74,252,146,0.35); }
        }
        .animate-drone-glow { animation: drone-glow 3s ease-in-out infinite; }
        .animate-cta-glow { animation: cta-glow 2s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-cockpit-surface border border-cockpit-border rounded-lg p-3 glow-phosphor">
      <div className="w-6 h-6 text-phosphor mb-2">{icon}</div>
      <h3 className="font-instrument text-body-text text-[0.7rem] font-bold tracking-wider mb-1">{title}</h3>
      <p className="text-secondary-text text-[0.65rem] leading-relaxed">{desc}</p>
    </div>
  )
}

function Step({ num, title, desc }) {
  return (
    <div className="flex items-start gap-4 bg-cockpit-surface border border-cockpit-border rounded-lg p-4">
      <span className="font-instrument text-phosphor text-lg font-bold glow-phosphor-text shrink-0">{num}</span>
      <div>
        <h3 className="font-instrument text-body-text text-xs font-bold tracking-wider mb-1">{title}</h3>
        <p className="text-secondary-text text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

/* --- Inline SVG Icons --- */

function QuestionsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 10h6M9 14h4" />
    </svg>
  )
}

function ExamIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 15l5-5 4 4 5-5 4 4" />
    </svg>
  )
}

function MetarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
      <circle cx="12" cy="8" r="4" />
      <path d="M12 4v1M8 8H7M17 8h-1" />
    </svg>
  )
}

function E6BIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
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

function ProgressIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M3 20V10M9 20V4M15 20v-8M21 20v-4" />
    </svg>
  )
}
