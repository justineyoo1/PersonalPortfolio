import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          backgroundColor: "#000000",
          color: "#FFFFFF",
          fontFamily:
            '"JetBrains Mono", "SF Mono", "Menlo", "Consolas", ui-monospace, monospace',
          position: "relative",
        }}
      >
        {/* Scanline overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            opacity: 0.5,
          }}
        >
          {Array.from({ length: 180 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 1,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                marginBottom: 2,
              }}
            />
          ))}
        </div>

        {/* Top marker */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "0.2em",
            color: "#00FF66",
            marginBottom: 32,
            textTransform: "uppercase",
            zIndex: 1,
            textShadow:
              "0 0 8px rgba(0, 255, 102, 0.6), 0 0 18px rgba(0, 255, 102, 0.3)",
          }}
        >
          &gt; SYSTEM ONLINE
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            fontSize: 180,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: "#FFFFFF",
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          UNINSTALL
        </div>

        {/* Green underline accent */}
        <div
          style={{
            display: "flex",
            width: 280,
            height: 6,
            backgroundColor: "#00FF66",
            marginTop: 32,
            boxShadow:
              "0 0 12px rgba(0, 255, 102, 0.8), 0 0 32px rgba(0, 255, 102, 0.4)",
            zIndex: 1,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontWeight: 500,
            letterSpacing: "0.02em",
            marginTop: 32,
            color: "#FFFFFF",
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          &gt; THE APP BLOCKER THAT
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontWeight: 500,
            letterSpacing: "0.02em",
            marginTop: 8,
            color: "#FFFFFF",
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          &nbsp;&nbsp;REFUSES YOUR ESCAPE.
        </div>
      </div>
    ),
    { ...size },
  );
}
