import { FileText } from "lucide-react";

type Props = {
  x: number;
  y: number;
  label: string;
};

export default function Board({ x, y, label }: Props) {
  return (
    <div
      className="absolute flex flex-col items-center gap-1 select-none"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <FileText className="h-14 w-14 text-pink-400 drop-shadow-lg" />
      <span className="text-xs text-white/70">{label}</span>
    </div>
  );
}
