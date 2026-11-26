import { useEffect, useState } from "react";

function formatDuration(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function progressBar(s: number, goal = 1.5 * 3600, width = 20) {
  const filled = Math.min(width, Math.round((s / goal) * width));
  return "█".repeat(filled) + "░".repeat(width - filled);
}

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ok"; seconds: number };

export function StatsCommand() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetch("/api/hackatime")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { seconds: number }) => {
        if (!cancelled) setState({ status: "ok", seconds: data.seconds });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return <p className="text-red-400">stats: fetching data...</p>;
  }

  if (state.status === "error") {
    return <p className="text-red-400">stats: Hackatime is unreachable</p>;
  }

  return (
    <div>
      <p>my coding time today (from hackatime)</p>
      <p>
        <span>{progressBar(state.seconds)}</span>{" "}
        <span>{formatDuration(state.seconds)}</span>
      </p>
      {state.seconds < 60 && <p>no coding time today. Maybe later.</p>}
    </div>
  );
}
