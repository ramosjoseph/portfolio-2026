import { NextResponse } from "next/server";

export type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "ReSourceHub — Sustainable Resource Exchange Platform",
    description:
      "Built a mobile + web platform that enables communities to buy, sell, and trade reusable materials via direct exchange and competitive bidding. Designed for real-time sync, secure auth, image handling, push notifications, and AI-assisted item classification to reduce waste and support circular-economy behavior.",
    tech: ["Flutter", "Dart", "Firebase", "Cloudinary", "OneSignal", "Teachable Machine"],
  },
  {
    id: 2,
    title: "JS Scent — Order Management System",
    description:
      "An ordering and tracking system designed to automate order flow, reduce manual follow-ups, and keep customers updated through structured status and notifications.",
    tech: ["Next.js", "TypeScript", "REST API"],
  },
  {
    id: 3,
    title: "Interactive Game Portfolio",
    description:
      "A mini-game portfolio demonstrating component architecture, state handling, accessibility, and performance-focused UI decisions—built to be fun but engineered like a real product.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Accessibility"],
  },
];

export async function GET() {
  return NextResponse.json(projects);
}
