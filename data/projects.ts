export type Project = {
  short_name: string;
  name: string;
  description: string;
  stack: string[];
  status: "live" | "wip" | "aborted";
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    short_name: "Vocabulator",
    name: "Vocabulator",
    description: "A flashcardtrainer with Spaced Repetition.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    status: "live",
    links: [
      { label: "Demo", href: "https://vocabulator-cyan.vercel.app" },
      { label: "GitHub", href: "https://github.com/DundreDE/vocabulator" },
    ],
  },
];
