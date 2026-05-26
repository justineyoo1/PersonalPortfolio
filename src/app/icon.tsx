import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A0605 0%, #1A0F0A 100%)",
          color: "#F59E0B",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          borderRadius: 6,
        }}
      >
        JY
      </div>
    ),
    { ...size },
  );
}
