export default function LandingPage({ onEnter }) {
  return (
    <div className="h-screen bg-cockpit-bg cockpit-grid relative overflow-hidden flex flex-col items-center justify-center">
      <div className="cockpit-noise absolute inset-0 pointer-events-none" />
      <div className="cockpit-scanlines absolute inset-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Drone icon */}
        <div className="w-20 h-20 mb-6 animate-drone-glow">
          <svg viewBox="0 0 64 64" className="w-20 h-20" fill="none">
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

        {/* Name */}
        <h1 className="font-instrument text-body-text text-xl font-extrabold tracking-[0.2em] leading-tight mb-2">
          REMOTEPILOTREADY
        </h1>

        {/* Subtitle */}
        <p className="font-instrument text-phosphor text-xs tracking-[0.15em] glow-phosphor-text mb-6">
          PART 107 CERTIFICATION STUDY
        </p>

        {/* One-liner */}
        <p className="text-secondary-text text-sm max-w-xs leading-relaxed mb-10">
          200+ questions with spaced repetition, exam simulator, chart trainer, METAR decoder, and E6B calculator.
        </p>

        {/* CTA */}
        <button
          onClick={onEnter}
          className="px-8 py-3 bg-phosphor text-cockpit-bg font-instrument font-bold text-sm tracking-[0.1em] rounded-lg animate-cta-glow transition-transform active:scale-95"
        >
          START STUDYING
        </button>

        {/* Copyright */}
        <p className="text-inactive text-[0.625rem] mt-8">
          &copy; 2026 Anand Mandapati, High Gain Design
        </p>
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
