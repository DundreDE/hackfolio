import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#09090b",
        color: "#4ade80",
        fontFamily: "monospace",
        fontSize: 56,
      }}
    >
      <div>guest@jakob:~$ whoami</div>
      <div>A 14 year old programer</div>
    </div>,
  );
}
