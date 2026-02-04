type Props = {
  x: number;
  y: number;
  label: string;
};

export default function NPC({ x, y, label }: Props) {
  return (
   <div
  className="absolute h-10 w-10 rounded-full bg-blue-500
             flex items-center justify-center
             text-xs text-white
             transition-all duration-200
             hover:scale-105 animate-pulse"
  style={{ left: x, top: y }}
  aria-label={label}
>
  NPC
</div>

  );
}
