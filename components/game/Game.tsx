"use client";

import { useEffect, useState } from "react";
import Interactable from "./Interactable";
import Dialog from "./Dialog";
import { useProjects } from "./hooks/useProjects";
import HUD from "./HUD";
import NPC from "./NPC";
import Terminal from "./Terminal";

type Position = {
  x: number;
  y: number;
};

const INTERACTABLE = {
  x: 300,
  y: 150,
};

const NPC_POSITION = {
  x: 100,
  y: 200,
};

const TERMINAL_POSITION = {
  x: 450,
  y: 250,
};

export default function Game() {
  const [player, setPlayer] = useState<Position>({ x: 50, y: 50 });

  const [canInteract, setCanInteract] = useState(false);
  const [nearNPC, setNearNPC] = useState(false);
  const [nearTerminal, setNearTerminal] = useState(false);

  const [showProjects, setShowProjects] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  const { projects, loading } = useProjects();

  // 🎮 Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close ALL dialogs
      if (e.key === "Escape") {
        setShowProjects(false);
        setShowAbout(false);
        setShowSkills(false);
        return;
      }

      // Stop movement when ANY dialog is open
      if (showProjects || showAbout || showSkills) return;

      // Movement
      setPlayer((prev) => {
        const step = 10;
        let next = { ...prev };

        if (e.key === "ArrowUp") next.y = Math.max(prev.y - step, 0);
        if (e.key === "ArrowDown") next.y = Math.min(prev.y + step, 360);
        if (e.key === "ArrowLeft") next.x = Math.max(prev.x - step, 0);
        if (e.key === "ArrowRight") next.x = Math.min(prev.x + step, 560);

        return next;
      });

      // Interaction
      if (e.key.toLowerCase() === "e") {
        if (canInteract) setShowProjects(true);
        if (nearNPC) setShowAbout(true);
        if (nearTerminal) setShowSkills(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    canInteract,
    nearNPC,
    nearTerminal,
    showProjects,
    showAbout,
    showSkills,
  ]);

  // 📦 Chest collision
  useEffect(() => {
    const dx = player.x - INTERACTABLE.x;
    const dy = player.y - INTERACTABLE.y;
    setCanInteract(Math.sqrt(dx * dx + dy * dy) < 40);
  }, [player]);

  // 🧍 NPC collision
  useEffect(() => {
    const dx = player.x - NPC_POSITION.x;
    const dy = player.y - NPC_POSITION.y;
    setNearNPC(Math.sqrt(dx * dx + dy * dy) < 40);
  }, [player]);

  // 💻 Terminal collision
  useEffect(() => {
    const dx = player.x - TERMINAL_POSITION.x;
    const dy = player.y - TERMINAL_POSITION.y;
    setNearTerminal(Math.sqrt(dx * dx + dy * dy) < 40);
  }, [player]);

  return (
    <section
      className="relative h-[400px] w-[600px] overflow-hidden rounded-lg
                 border border-white/20
                 bg-gradient-to-br from-gray-900 via-black to-gray-800"
      role="application"
      aria-label="Portfolio game"
    >
      {/* HUD */}
      <HUD />

      {/* NPC */}
      <NPC
        x={NPC_POSITION.x}
        y={NPC_POSITION.y}
        label="About Me NPC"
      />

      {/* Skills Terminal */}
      <Terminal
        x={TERMINAL_POSITION.x}
        y={TERMINAL_POSITION.y}
        label="Skills Terminal"
      />

      {/* Projects Chest */}
      <Interactable
        x={INTERACTABLE.x}
        y={INTERACTABLE.y}
        label="Projects Chest"
      />

      {/* Player */}
      <div
        className="absolute h-8 w-8 rounded bg-green-500 shadow-lg shadow-green-500/30"
        style={{ transform: `translate(${player.x}px, ${player.y}px)` }}
        aria-label="Player"
      />

      {/* Interaction Prompt */}
      {(canInteract || nearNPC || nearTerminal) &&
        !showProjects &&
        !showAbout &&
        !showSkills && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2
                          rounded bg-black px-3 py-1 text-sm text-white">
            Press <strong>E</strong> to interact
          </div>
        )}

      {/* 📦 Projects Dialog */}
      {showProjects && (
        <Dialog
          title="📦 Projects"
          onClose={() => setShowProjects(false)}
          content={
            loading ? (
              <p aria-live="polite">Loading projects...</p>
            ) : (
              <ul className="space-y-2">
                {projects.map((project) => (
                  <li key={project.id} className="rounded bg-gray-800 p-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-xs">{project.description}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-gray-700 px-2 py-0.5 text-[10px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )
          }
        />
      )}

      {/* 🧍 About Me Dialog */}
      {showAbout && (
        <Dialog
          title="👋 About Me"
          onClose={() => setShowAbout(false)}
          content={
            <div className="space-y-2">
              <p>
                Hi! I’m <strong>Joseph Ramos</strong>, a web developer who enjoys
                building interactive and accessible web experiences.
              </p>
              <p>
                I work primarily with <strong>React, Next.js, and TypeScript</strong>,
                and I care deeply about performance, clean architecture, and UX.
              </p>
              <p>
                This portfolio is designed as a small game to demonstrate how I
                approach frontend engineering — not just visuals.
              </p>
            </div>
          }
        />
      )}

      {/* 💻 Skills Dialog */}
      {showSkills && (
        <Dialog
          title="💻 Skills Terminal"
          onClose={() => setShowSkills(false)}
          content={
            <div className="font-mono text-sm space-y-3">
              <div>
                <span className="text-cyan-400">$</span> frontend
                <ul className="ml-4 list-disc">
                  <li>React</li>
                  <li>Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>

              <div>
                <span className="text-cyan-400">$</span> backend
                <ul className="ml-4 list-disc">
                  <li>Node.js</li>
                  <li>REST APIs</li>
                  <li>Basic GraphQL</li>
                </ul>
              </div>

              <div>
                <span className="text-cyan-400">$</span> practices
                <ul className="ml-4 list-disc">
                  <li>Accessibility (WCAG)</li>
                  <li>Performance optimization</li>
                  <li>Git & CI/CD</li>
                </ul>
              </div>
            </div>
          }
        />
      )}
    </section>
  );
}
