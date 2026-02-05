import { Package } from "lucide-react";

export default function Interactable({ x, y, label }) {
  return (
    <div className="absolute flex flex-col items-center gap-1" style={{ transform: `translate(${x}px, ${y}px)` }}>
      <Package className="h-14 w-14 text-yellow-400 drop-shadow-lg" />
      <span className="text-xs text-white/70">{label}</span>
    </div>
  );
}
