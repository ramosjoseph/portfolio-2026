export default function HUD() {
  return (
    <div
      className="absolute top-0 left-0 z-30 w-full
                 flex items-center justify-between
                 px-6 py-3
                 bg-black/60 backdrop-blur-md
                 border-b border-white/15
                 text-white"
    >
      <div className="flex items-center gap-2 font-semibold tracking-wide text-sm">
        <span className="opacity-90">🎮</span>
        <span>Joseph William Ramos — Interactive Portfolio</span>
      </div>

      <div className="hidden md:flex items-center gap-6 text-xs text-white/80">
        <div className="flex items-center gap-2">
          <span className="kbd">W</span>
          <span className="kbd">A</span>
          <span className="kbd">S</span>
          <span className="kbd">D</span>
          <span className="opacity-70">or</span>
          <span className="kbd">↑</span>
          <span className="kbd">←</span>
          <span className="kbd">↓</span>
          <span className="kbd">→</span>
          <span>Move</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="kbd">E</span>
          <span>Interact</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="kbd">Esc</span>
          <span>Close</span>
        </div>
      </div>
    </div>
  );
}
