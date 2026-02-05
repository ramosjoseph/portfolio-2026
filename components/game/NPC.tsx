import { User } from "lucide-react";

export default function NPC({ x, y, label }) {
  return (
    <div className="absolute flex flex-col items-center gap-1" style={{ transform: `translate(${x}px, ${y}px)` }}>
      <User className="h-14 w-14 text-cyan-400 drop-shadow-lg" />
      <span className="text-xs text-white/70">{label}</span>
    </div>
  );
}
