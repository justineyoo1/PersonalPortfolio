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
          backgroundColor: "#0A0605",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(234, 88, 12, 0.35), transparent 55%), radial-gradient(circle at 15% 90%, rgba(245, 158, 11, 0.18), transparent 60%), linear-gradient(180deg, #1A0F0A, #0A0605 75%)",
          color: "#FFFFFF",
          fontFamily:
            '"Helvetica Neue", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
          position: "relative",
        }}
      >
        {/* Subtle brick-pattern hint */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            opacity: 0.06,
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((row) => (
            <div
              key={row}
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: row % 2 === 0 ? 0 : -60,
                height: 90,
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((col) => (
                <div
                  key={col}
                  style={{
                    width: 120,
                    height: 90,
                    border: "1px solid #F59E0B",
                    boxSizing: "border-box",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Logo dot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 36,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#EA580C",
              boxShadow: "0 0 24px rgba(234, 88, 12, 0.8)",
            }}
          />
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.28em",
              color: "#F59E0B",
              textTransform: "uppercase",
            }}
          >
            jstnyoo
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 220,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            display: "flex",
            zIndex: 1,
          }}
        >
          <span>Brik</span>
          <span style={{ color: "#EA580C" }}>.</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginTop: 24,
            color: "#FFFFFF",
            zIndex: 1,
          }}
        >
          Build your morning, brick by brick.
        </div>

        {/* Sub line */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: "0.04em",
            color: "#F59E0B",
            marginTop: 18,
            zIndex: 1,
          }}
        >
          Mornings you don&apos;t snooze.
        </div>
      </div>
    ),
    { ...size },
  );
}
