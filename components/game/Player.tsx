import Image from "next/image";

type Props = {
  x: number;
  y: number;
};

export default function Player({ x, y }: Props) {
  return (
    <div
      className="absolute z-20"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: 64,
        height: 64,
      }}
      aria-label="Player"
    >
      <Image
        src="/sprites/character.png"
        alt="Joseph character"
        width={64}
        height={64}
        priority
        className="select-none pointer-events-none drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)]"
      />
    </div>
  );
}
