"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Interactable from "./Interactable";
import Dialog from "./Dialog";
import { useProjects } from "./hooks/useProjects";
import HUD from "./HUD";
import NPC from "./NPC";
import Terminal from "./Terminal";
import Board from "./Board";
import Player from "./Player";

type Position = { x: number; y: number };

const WORLD = { w: 1100, h: 680 }; // BIGGER
const HUD_HEIGHT = 64;

const NPC_POSITION = { x: 160, y: 150 };
const INTERACTABLE = { x: 860, y: 150 };
const TERMINAL_POSITION = { x: 160, y: 500 };
const BOARD_POSITION = { x: 860, y: 500 };

export default function Game() {
  const { projects, loading } = useProjects();

  const [player, setPlayer] = useState<Position>({ x: 520, y: 320 });

  const [nearProjects, setNearProjects] = useState(false);
  const [nearNPC, setNearNPC] = useState(false);
  const [nearTerminal, setNearTerminal] = useState(false);
  const [nearBoard, setNearBoard] = useState(false);

  const [showProjects, setShowProjects] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const anyDialogOpen = showProjects || showAbout || showSkills || showContact;

  // --- Smooth movement loop ---
  const keysRef = useRef<Record<string, boolean>>({});
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);

  // tweak this to make movement faster/slower
  const SPEED = 420; // pixels per second (FAST + SMOOTH)

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const check = useMemo(() => {
    return (p: Position, t: Position) => Math.hypot(p.x - t.x, p.y - t.y) < 70; // bigger interaction radius
  }, []);

  // collisions update whenever player changes
  useEffect(() => {
    setNearProjects(check(player, INTERACTABLE));
    setNearNPC(check(player, NPC_POSITION));
    setNearTerminal(check(player, TERMINAL_POSITION));
    setNearBoard(check(player, BOARD_POSITION));
  }, [player, check]);

  // keyboard listeners + interaction
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();

      if (k === "escape") {
        setShowProjects(false);
        setShowAbout(false);
        setShowSkills(false);
        setShowContact(false);
        return;
      }

      // interaction (even while standing still)
      if (k === "e" && !anyDialogOpen) {
        if (nearProjects) setShowProjects(true);
        else if (nearNPC) setShowAbout(true);
        else if (nearTerminal) setShowSkills(true);
        else if (nearBoard) setShowContact(true);
        return;
      }

      keysRef.current[k] = true;
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [anyDialogOpen, nearProjects, nearNPC, nearTerminal, nearBoard]);

  // movement RAF loop
  useEffect(() => {
    const tick = (t: number) => {
      rafRef.current = requestAnimationFrame(tick);

      // stop movement while any dialog open
      if (anyDialogOpen) {
        lastRef.current = t;
        return;
      }

      const dt = lastRef.current ? (t - lastRef.current) / 1000 : 0;
      lastRef.current = t;
      if (!dt) return;

      const keys = keysRef.current;
      const up = keys["w"] || keys["arrowup"];
      const down = keys["s"] || keys["arrowdown"];
      const left = keys["a"] || keys["arrowleft"];
      const right = keys["d"] || keys["arrowright"];

      if (!up && !down && !left && !right) return;

      // normalize diagonal movement
      let vx = 0;
      let vy = 0;
      if (up) vy -= 1;
      if (down) vy += 1;
      if (left) vx -= 1;
      if (right) vx += 1;

      const mag = Math.hypot(vx, vy) || 1;
      vx /= mag;
      vy /= mag;

      setPlayer((p) => {
        const nx = clamp(p.x + vx * SPEED * dt, 0, WORLD.w - 64);
        const ny = clamp(p.y + vy * SPEED * dt, HUD_HEIGHT, WORLD.h - 64);
        return { x: nx, y: ny };
      });
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [anyDialogOpen]);

  const promptText = useMemo(() => {
  if (anyDialogOpen) return null;
  if (nearProjects) return "to open Projects";
  if (nearNPC) return "to talk (About Me)";
  if (nearTerminal) return "to view Skills";
  if (nearBoard) return "to open Contact";
  return null;
}, [anyDialogOpen, nearProjects, nearNPC, nearTerminal, nearBoard]);

  return (
    <section
      className="relative rounded-2xl border border-white/15 bg-[#0b0f1a] overflow-hidden"
      style={{ width: WORLD.w, height: WORLD.h }}
      role="application"
      aria-label="Portfolio game"
    >
      <HUD />

      {/* subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* world objects */}
      <NPC x={NPC_POSITION.x} y={NPC_POSITION.y} label="About Me" />
      <Terminal x={TERMINAL_POSITION.x} y={TERMINAL_POSITION.y} label="Skills" />
      <Interactable x={INTERACTABLE.x} y={INTERACTABLE.y} label="Projects" />
      <Board x={BOARD_POSITION.x} y={BOARD_POSITION.y} label="Contact" />

      {/* player */}
      <Player x={player.x} y={player.y} />

      {/* prompt */}
      {promptText && (
  <div
    className="absolute bottom-4 left-1/2 -translate-x-1/2
               rounded-lg bg-black/75 px-4 py-2 text-base text-white
               border border-white/10 flex items-center gap-2"
    aria-live="polite"
  >
    <span>Press</span>
    <span className="kbd">E</span>
    <span>{promptText}</span>
  </div>
)}


      {/* PROJECTS */}
      {showProjects && (
        <Dialog
          title="📦 Projects"
          onClose={() => setShowProjects(false)}
          content={
            loading ? (
              <p aria-live="polite">Loading projects…</p>
            ) : (
              <ul className="space-y-4">
                {projects.map((p) => (
                  <li key={p.id} className="rounded-xl bg-white/5 p-4 border border-white/10">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-bold">{p.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-white/85 leading-relaxed">{p.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 border border-white/10"
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

      {/* ABOUT */}
      {showAbout && (
        <Dialog
          title="👋 About Me"
          onClose={() => setShowAbout(false)}
         content={
  <div className="space-y-4">
    <p>
      I’m <strong>Joseph William Ramos</strong>. I’m a web developer who enjoys
      building interactive UI that feels responsive and easy to use.
    </p>
    <p>
      Most of my work is in <strong>React / Next.js / TypeScript</strong>, and I
      care about the practical stuff: clean components, predictable state,
      performance, and accessibility.
    </p>
    <p className="text-white/80 text-sm">
      Move with <span className="kbd">WASD</span> / arrow keys, interact with{" "}
      <span className="kbd">E</span>.
    </p>
  </div>
}
        />
      )}

      {/* SKILLS */}
{showSkills && (
  <Dialog
    title="💻 Skills"
    onClose={() => setShowSkills(false)}
    content={
      <div className="space-y-4 text-base">
        <div>
          <h3 className="font-semibold mb-1">Frontend</h3>
          <ul className="list-disc ml-5 text-white/90 space-y-1">
            <li>React</li>
            <li>Next.js (App Router)</li>
            <li>TypeScript</li>
            <li>JavaScript (ES6+)</li>
            <li>HTML5 & CSS3</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Backend & APIs</h3>
          <ul className="list-disc ml-5 text-white/90 space-y-1">
            <li>Node.js</li>
            <li>REST API integration</li>
            <li>Basic GraphQL</li>
            <li>Firebase (Authentication, Firestore)</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Capstone Project — ReSourceHub</h3>
          <ul className="list-disc ml-5 text-white/90 space-y-1">
            <li>Flutter & Dart</li>
            <li>Firebase (Auth, Firestore, Cloud Storage)</li>
            <li>Cloudinary (image uploads & management)</li>
            <li>OneSignal (push notifications)</li>
            <li>Teachable Machine (AI-assisted item classification)</li>
            <li>Real-time data synchronization</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Tools & Practices</h3>
          <ul className="list-disc ml-5 text-white/90 space-y-1">
            <li>Git & GitHub</li>
            <li>Vercel deployment</li>
            <li>Accessibility fundamentals (keyboard navigation, ARIA)</li>
            <li>Performance optimization basics</li>
          </ul>
        </div>
      </div>
    }
  />
)}


      {/* CONTACT */}
{showContact && (
  <Dialog
    title="📬 Contact"
    onClose={() => setShowContact(false)}
    content={
      <div className="space-y-4 text-base">
        <p className="text-white/85">
          If you’d like to get in touch,
          here’s where you can find me.
        </p>

        <ul className="space-y-2">
          <li>
            📧{" "}
            <a
              className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
              href="mailto:ramosjoseph0212@gmail.com"
            >
              ramosjoseph0212@gmail.com
            </a>
          </li>

          <li>
            💻{" "}
            <a
              className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
              href="https://github.com/ramosjoseph"
              target="_blank"
              rel="noreferrer"
            >
              github.com/ramosjoseph
            </a>
          </li>

          <li>
            🔗{" "}
            <a
              className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
              href="https://www.linkedin.com/in/joseph-william-ramos/"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/joseph-william-ramos
            </a>
          </li>
        </ul>

        <div className="pt-3">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg
                       border border-white/15 bg-white/5
                       px-4 py-2 font-semibold text-cyan-200
                       hover:bg-white/10"
          >
            📄 Download resume
          </a>

          <p className="mt-2 text-sm text-white/60">
            I’m currently applying for web developer internships and
            happy to share more details if needed.
          </p>
        </div>
      </div>
    }
  />
)}
    </section>
  );
}
