export default function About({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-cockpit-bg/90 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm bg-cockpit-surface border border-cockpit-border rounded-2xl p-6 text-center">
        {/* Drone icon */}
        <div className="w-16 h-16 mx-auto mb-4">
          <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
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

        <h2 className="font-instrument text-body-text text-base font-extrabold tracking-[0.15em] mb-1">
          REMOTEPILOTREADY
        </h2>
        <p className="font-instrument text-phosphor text-[0.625rem] tracking-[0.12em] glow-phosphor-text mb-4">
          PART 107 CERTIFICATION STUDY
        </p>

        <p className="text-secondary-text text-[0.8125rem] leading-relaxed mb-6">
          Free, open-source study app for the FAA Part 107 Remote Pilot Certificate exam. Built with spaced repetition to help you actually remember what you study.
        </p>

        {/* Tip Jar placeholder */}
        {/*
        <a
          href="#"
          className="inline-block px-5 py-2 bg-amber-accent/15 border border-amber-accent/30 text-amber-accent font-instrument text-xs font-bold tracking-wider rounded-lg mb-4 transition-colors active:bg-amber-accent/25"
        >
          TIP JAR
        </a>
        */}

        <div className="border-t border-cockpit-border pt-4 space-y-2">
          <p className="text-inactive text-[0.6875rem]">
            &copy; 2026 Anand Mandapati, High Gain Design
          </p>
          <p className="text-inactive text-[0.6875rem]">
            <a
              href="https://github.com/HighGainDesign/RemotePilotReady"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-text hover:text-phosphor transition-colors"
            >
              MIT Licensed &middot; GitHub
            </a>
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="tap-highlight absolute top-3 right-3 w-8 h-8 rounded-full bg-cockpit-bg/60 border border-cockpit-border flex items-center justify-center text-inactive hover:text-body-text transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
