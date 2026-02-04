type Props = {
  x: number;
  y: number;
  label: string;
};

export default function Board({ x, y, label }: Props) {
  return (
    <div
      className="absolute h-12 w-12 rounded-md
                 bg-yellow-700 border border-yellow-500
                 shadow-md shadow-yellow-400/40
                 flex items-center justify-center
                 text-xs font-semibold text-black
                 transition-transform duration-200
                 hover:scale-105"
      style={{ left: x, top: y }}
      aria-label={label}
    >
      📌
    </div>
  );
}
