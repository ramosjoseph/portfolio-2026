import Game from "../components/game/Game";

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-6 overflow-auto">
      <div className="mx-auto w-fit">
        <Game />
      </div>
    </main>
  );
}
