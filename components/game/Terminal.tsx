type Props = {
  x: number;
  y: number;
  label: string;
};

export default function Terminal({ x, y, label }: Props) {
  return (
    <div
      className="absolute h-10 w-12 rounded bg-gray-700 
                 border border-gray-500
                 shadow-md shadow-cyan-500/30
                 flex items-center justify-center
                 text-cyan-400 text-xs font-mono"
      style={{ left: x, top: y }}
      aria-label={label}
    >
      &gt;_
    </div>
  );
}
