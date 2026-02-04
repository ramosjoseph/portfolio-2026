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
    title: "JS Scent Order Management System",
    description:
      "A web-based ordering system to automate perfume orders and notifications.",
    tech: ["Next.js", "TypeScript", "REST API"],
  },
  {
    id: 2,
    title: "Interactive Game Portfolio",
    description:
      "A game-like portfolio demonstrating frontend architecture and UX.",
    tech: ["React", "Tailwind", "Accessibility"],
  },
];

export async function GET() {
  return NextResponse.json(projects);
}
