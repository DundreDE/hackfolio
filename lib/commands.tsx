import Me from "@/app/components/Me";
import { projects } from "@/data/projects";
import type { ReactNode } from "react";
import { StatsCommand } from "./stats";

type Command = {
  desc: string;
  run: (args: string[]) => ReactNode;
  complete?: (args: string[]) => string[];
};

export const commands: Record<string, Command> = {
  help: {
    desc: "Show all commands",
    run: () => (
      <ul>
        {Object.entries(commands).map(([name, c]) => (
          <li key={name}>
            <span className="text-green-400">{name}</span> - {c.desc}
          </li>
        ))}
      </ul>
    ),
  },
  whoami: {
    desc: "About me",
    run: () =>
      "I am Jakob an 14 year guy from Germany. I love to build web projects",
  },
  me: {
    desc: "A picture from me",
    run: () => (
      <>
        <Me />
      </>
    ),
  },
  contact: {
    desc: "My GitHub.",
    run: () => (
      <ul>
        <a
          href="https://github.com/dundrede"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          GitHub
        </a>
      </ul>
    ),
  },
  ls: {
    desc: "List projects and (projects <name> for a closer look",
    complete: () => projects.map((p) => p.short_name),
    run: ([short_name]) => {
      if (!short_name) {
        return (
          <ul>
            {projects.map((p) => (
              <li key={p.short_name}>
                <span className="text-cyan-400">{p.short_name}</span> [
                {p.status}] - {p.description}
              </li>
            ))}
          </ul>
        );
      }
      const p = projects.find((x) => x.short_name === short_name);
      if (!p) return `project not found: ${short_name}`;
      return (
        <div>
          <div className="text-cyan-400">{p.name}</div>
          <div>{p.description}</div>
          <div>Techstack: {p.stack.join(", ")}</div>
          {p.links.map((l) => (
            <div key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {l.label}
              </a>
            </div>
          ))}
        </div>
      );
    },
  },
  stats: {
    desc: "My coding stats from today",
    run: () => (
      <>
        <StatsCommand />
      </>
    ),
  },
  skills: {
    desc: "What are my skills?",
    run: () =>
      "My skills: Python, HTML, JS, TS, CSS, Tailwind CSS, Next.js, React, Vercel, Git/Github.",
  },
};

export function execute(input: string): ReactNode {
  const [name, ...args] = input.trim().split(/\s+/);
  const cmd = commands[name];
  return cmd ? cmd.run(args) : `command not found: ${name}`;
}
