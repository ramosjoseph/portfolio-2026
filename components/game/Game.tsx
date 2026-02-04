"use client";

import { useEffect, useState } from "react";
import Interactable from "./Interactable";
import Dialog from "./Dialog";

type Position = {
  x: number;
  y: number;
};

const INTERACTABLE = {
  x: 300,
  y: 150,
  size: 40,
};

export default function Game() {
  const [player, setPlayer] = useState<Position>({ x: 50, y: 50 });
  const [canInteract, setCanInteract] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showDialog && e.key === "Escape") {
        setShowDialog(false);
        return;
      }

      if (showDialog) return;

      setPlayer((prev) => {
        const step = 10;
        let next = { ...prev };

        if (e.key === "ArrowUp") next.y = Math.max(prev.y - step, 0);
        if (e.key === "ArrowDown") next.y = Math.min(prev.y + step, 360);
        if (e.key === "ArrowLeft") next.x = Math.max(prev.x - step, 0);
        if (e.key === "ArrowRight") next.x = Math.min(prev.x + step, 560);

        return next;
      });

      if (e.key.toLowerCase() === "e" && canInteract) {
        setShowDialog(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canInteract, showDialog]);

  // Collision detection
  useEffect(() => {
    const dx = player.x - INTERACTABLE.x;
    const dy = player.y - INTERACTABLE.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    setCanInteract(distance < 40);
  }, [player]);

  return (
    <section
      className="relative h-[400px] w-[600px] border border-white bg-gray-900"
      role="application"
      aria-label="Portfolio game"
    >
      <Interactable
        x={INTERACTABLE.x}
        y={INTERACTABLE.y}
        label="Projects Chest"
      />

      {/* Player */}
      <div
        className="absolute h-8 w-8 rounded bg-green-500"
        style={{ transform: `translate(${player.x}px, ${player.y}px)` }}
        aria-label="Player"
      />

      {/* Interaction Prompt */}
      {canInteract && !showDialog && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded bg-black px-3 py-1 text-sm text-white">
          Press <strong>E</strong> to interact
        </div>
      )}

      {/* Dialog */}
      {showDialog && (
        <Dialog
          title="📦 Projects"
          onClose={() => setShowDialog(false)}
          content={
            <p>
              This chest will soon load my projects from an API.
              <br />
              <strong>(Coming next step!)</strong>
            </p>
          }
        />
      )}
    </section>
  );
}
