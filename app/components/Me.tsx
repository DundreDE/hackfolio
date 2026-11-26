"use client";
import { artWidth, downscale } from "@/lib/ascii-scale";
import { useEffect, useMemo, useRef, useState } from "react";

const MIN_FONT_PX = 6;
const MAX_FONT_PX = 10;
const CHAR_RATIO = 0.6;

export default function Me() {
  const ref = useRef<HTMLPreElement>(null);
  const [width, setWidth] = useState(0);
  const [raw, setRaw] = useState("");

  useEffect(() => {
    fetch("/ascii/me.txt")
      .then((r) => r.text())
      .then((t) => setRaw(t.replace(/\r/g, "").trimEnd()));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (raw)
      console.log(
        "Lines:",
        raw.split("\n").length,
        "Start:",
        raw.slice(0, 200),
      );
  }, [raw]);

  const fullWidth = useMemo(() => (raw ? artWidth(raw) : 0), [raw]);
  const maxCols = Math.floor(width / (MIN_FONT_PX * CHAR_RATIO));
  const factor =
    width && fullWidth ? Math.max(1, Math.ceil(fullWidth / maxCols)) : 1;
  const art = useMemo(() => (raw ? downscale(raw, factor) : ""), [raw, factor]);

  const cols = Math.ceil(fullWidth / factor);
  const fontSize = cols
    ? Math.min(MAX_FONT_PX, width / (cols * CHAR_RATIO))
    : 0;

  return (
    <>
      <p>Me:</p>
      {!raw && <p>loading...</p>}
      <pre
        ref={ref}
        className="w-full overflow-hidden leading-none"
        style={{ fontSize }}
      >
        {art}
      </pre>
    </>
  );
}
