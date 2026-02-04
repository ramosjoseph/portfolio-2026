type Props = {
  x: number;
  y: number;
  label: string;
};

export default function Terminal({ x, y, label }: Props) {
  return (
    <div
      className="absolute h-10 w-12 rounded bg-gray-800
           border border-cyan-400/50
           shadow-md shadow-cyan-500/40
           flex items-center justify-center
           text-cyan-400 text-xs font-mono
           animate-[blink_1.5s_steps(2,start)_infinite]"
      style={{ left: x, top: y }}
      aria-label={label}
    >
      &gt;_
    </div>
  );
}
