"use client";
import { commands, execute } from "@/lib/commands";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Entry = { input: string; output: ReactNode };

export default function Terminal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [pos, setPos] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [entries]);

  function runCommand(input: string) {
    if (!input.trim()) return;
    if (input.trim() === "clear") {
      setEntries([]);
    } else {
      setEntries((e) => [...e, { input, output: execute(input) }]);
    }
    setHistory((h) => [input, ...h]);
    setPos(-1);
    setValue("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") runCommand(value);
    if (e.key === "ArrowUp") {
      KeyboardEvent;
      e.preventDefault();
      const next = Math.min(pos + 1, history.length - 1);
      setPos(next);
      setValue(history[next] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(pos - 1, -1);
      setPos(next);
      setValue(next === -1 ? "" : history[next]);
    }
    if (e.key === "Tab") {
      e.preventDefault();

      const parts = value.trimStart().split(/\s+/);
      if (/\s$/.test(value)) parts.push("");

      const current = parts[parts.length - 1].toLowerCase();
      if (parts.length === 1 && current === "") return;

      const candidates =
        parts.length === 1
          ? Object.keys(commands)
          : (commands[parts[0]]?.complete?.(parts.slice(1, -1)) ?? []);

      const matches = candidates.filter((c) =>
        c.toLowerCase().startsWith(current),
      );
      if (matches.length === 0) return;

      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        setValue(parts.join(" ") + " ");
      } else {
        let prefix = matches[0];
        for (const m of matches)
          while (!m.toLowerCase().startsWith(prefix.toLowerCase()))
            prefix = prefix.slice(0, -1);
        parts[parts.length - 1] = prefix;
        setValue(parts.join(" "));
        setEntries((en) => [
          ...en,
          { input: value, output: matches.join("  ") },
        ]);
      }
    }
  }
  return (
    <main
      className="min-h-dvh bg-black p-4 font-mono text-green-400"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mb-4">
        <p>Welcome to my Portfolio.</p>
        <p>Type help for all Commands.</p>
      </div>
      {entries.map((e, i) => (
        <div key={i} className="mb-2">
          <div>
            <span className="text-cyan-400">guest@jakob:~$</span> {e.input}
          </div>
          <div className="whitespace-pre-wrap">{e.output}</div>
        </div>
      ))}
      <div className="flex gap-2">
        <span className="text-cyan-400">guest@jakob:~$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className="flex-1 bg-transparent text-base outline-none"
        />
      </div>
      <div ref={bottomRef} />
    </main>
  );
}
