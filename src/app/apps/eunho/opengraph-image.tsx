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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px 100px",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(circle at 85% 50%, rgba(0, 229, 255, 0.22), transparent 55%), radial-gradient(circle at 10% 100%, rgba(0, 229, 255, 0.08), transparent 60%)",
          color: "#F5F5F5",
          fontFamily:
            '"Georgia", "Times New Roman", ui-serif, serif',
        }}
      >
        {/* LEFT: text block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#8B8B8B",
              marginBottom: 32,
              fontFamily:
                '"Helvetica Neue", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            }}
          >
            The single-habit tracker
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 220,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 0.92,
              display: "flex",
            }}
          >
            <span>eunho</span>
            <span style={{ color: "#00E5FF" }}>.</span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 56,
              fontStyle: "italic",
              fontWeight: 400,
              marginTop: 28,
              color: "#F5F5F5",
              letterSpacing: "-0.01em",
            }}
          >
            One habit. Held daily.
          </div>
        </div>

        {/* RIGHT: cyan ring */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 280,
            height: 280,
            marginLeft: 60,
          }}
        >
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: 999,
              border: "10px solid #00E5FF",
              boxShadow:
                "0 0 24px rgba(0, 229, 255, 0.8), 0 0 80px rgba(0, 229, 255, 0.35), 0 0 160px rgba(0, 229, 255, 0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 999,
                backgroundColor: "#00E5FF",
                boxShadow: "0 0 18px rgba(0, 229, 255, 0.9)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
