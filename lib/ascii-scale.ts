const RAMP = " .:-=+*#%@";

export function artWidth(art: string) {
  return Math.max(...art.split("\n").map((r) => r.length));
}

export function downscale(art: string, factor: number) {
  if (factor <= 1) return art;
  const rows = art.split("\n");
  const width = artWidth(art);
  const grid = rows.map((r) => r.padEnd(width, " "));
  const out: string[] = [];

  for (let y = 0; y < grid.length; y += factor) {
    let line = "";
    for (let x = 0; x < width; x += factor) {
      let sum = 0;
      let n = 0;
      for (let dy = 0; dy < factor && y + dy < grid.length; dy++)
        for (let dx = 0; dx < factor && x + dx < width; dx++) {
          sum += Math.max(0, RAMP.indexOf(grid[y + dy][x + dx]));
          n++;
        }
      line += RAMP[Math.round(sum / n)];
    }
    out.push(line);
  }
  return out.join("\n");
}
