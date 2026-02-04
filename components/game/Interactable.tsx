type Props = {
  x: number;
  y: number;
  label: string;
};

export default function Interactable({ x, y, label }: Props) {
  return (
    <div
      className="absolute h-10 w-10 rounded bg-yellow-400"
      style={{ left: x, top: y }}
      aria-label={label}
    />
  );
}
