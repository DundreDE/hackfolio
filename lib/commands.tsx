import type { ReactNode } from "react";

type Command = { desc: string; run: (args: string[]) => ReactNode };

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
    run: () => "I am Jakob an 14 year guy from Germany.",
  },
  ls: {
    desc: "List Projects",
    run: () => "vocabulator/ ",
  },
};

export function execute(input: string): ReactNode {
  const [name, ...args] = input.trim().split(/\s+/);
  const cmd = commands[name];
  return cmd ? cmd.run(args) : `command not found: ${name}`;
}
