import { ImageResponse } from "next/og";

// 32x32 favicon. Terminal-cursor aesthetic to match the OS-style
// home page (zsh windows, $ prompts in the apps dock chip).
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
          background: "#000000",
          color: "#00FF66",
          fontSize: 22,
          fontWeight: 700,
          fontFamily:
            "ui-monospace, SFMono-Regular, 'JetBrains Mono', Menlo, monospace",
          letterSpacing: "-0.04em",
          // Slight nudge so the optical baseline reads centered: the `>` is
          // a triangle with its centroid below the geometric center, and
          // the underscore sits at the descender line.
          paddingBottom: 2,
        }}
      >
        {">_"}
      </div>
    ),
    { ...size },
  );
}
