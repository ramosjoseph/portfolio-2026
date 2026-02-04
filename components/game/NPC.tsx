type Props = {
  x: number;
  y: number;
  label: string;
};

export default function NPC({ x, y, label }: Props) {
  return (
    <div
      className="absolute h-10 w-10 rounded-full bg-blue-500 
                 shadow-md shadow-blue-500/40"
      style={{ left: x, top: y }}
      aria-label={label}
    />
  );
}
