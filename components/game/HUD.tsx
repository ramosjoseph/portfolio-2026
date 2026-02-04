export default function HUD() {
  return (
    <div className="absolute top-0 left-0 z-20 w-full border-b border-white/10 bg-black/70 px-4 py-2 text-white backdrop-blur">
      <div className="flex items-center justify-between text-sm">
        {/* Left: Name & Role */}
        <div className="font-semibold tracking-wide">
          🎮 Joseph William Ramos
          <span className="ml-2 text-xs text-gray-400">
            Web Developer
          </span>
        </div>

        {/* Right: Controls */}
        <div className="text-xs text-gray-300">
          Move: ⬅ ⬆ ⬇ ➡ | Interact: <strong>E</strong>
        </div>
      </div>
    </div>
  );
}
