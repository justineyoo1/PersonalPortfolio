import type { CSSProperties, ReactNode } from "react";

/**
 * IPhoneFrame — Apple's official iPhone 16 Pro Natural Titanium bezel.
 *
 * Asset: /public/devices/iphone-16-pro-natural.png (1350x2760, transparent
 * screen cutout, extracted from Apple's Bezel-iPhone-16.dmg under the App
 * Store Marketing Artwork License Agreement).
 *
 * Per the license, the bezel must be used "as is and without modification":
 *  - no recoloring
 *  - no decorative shadows ON the bezel itself (drop-shadow on the wrapper
 *    container is fine — that follows the PNG alpha and lands under the
 *    physical device, not painted onto it)
 *  - no cropping / rotating / tilting
 *  - promo copy beside, not on top
 *
 * Pass `src` to render a static screenshot inside, or `children` to render
 * interactive content (e.g. the eunho HoldRing).
 */

type Props =
  | {
      src: string;
      alt: string;
      children?: never;
      width?: number;
      className?: string;
      style?: CSSProperties;
      objectPosition?: string;
      priority?: boolean;
    }
  | {
      src?: never;
      alt?: never;
      children: ReactNode;
      width?: number;
      className?: string;
      style?: CSSProperties;
      objectPosition?: string;
      priority?: boolean;
    };

// Display aspect from Apple's PNG (1350 × 2760 = 0.489)
const ASPECT = "1350 / 2760";

// Tuned to Apple's PNG screen cutout. iPhone 16 Pro physical bezel is
// ~3.6 mm uniform around the screen at 460 ppi ≈ 65 px in the source PNG.
// 65 / 1350 ≈ 4.8% horizontal inset, 65 / 2760 ≈ 2.4% vertical.
const SCREEN_INSET = "2.4% 4.8%";

// Screen corner radius is ~14% of the screen width (after inset). With
// `border-radius: 12.5%` on a roughly square aspect, this lands very close
// to Apple's actual continuous-curve screen radius.
const SCREEN_RADIUS = "12.5%";

export function IPhoneFrame({
  src,
  alt,
  children,
  width = 300,
  className,
  style,
  objectPosition = "center top",
}: Props) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        width,
        aspectRatio: ASPECT,
        // Layered drop-shadow: tight contact + ambient. Follows the alpha
        // silhouette of the bezel PNG, so the shadow looks like a real device
        // resting in light.
        filter:
          "drop-shadow(0 24px 48px rgba(0,0,0,0.28)) drop-shadow(0 8px 16px rgba(0,0,0,0.16))",
        ...style,
      }}
    >
      {/* Screen content. Sits BEHIND the bezel PNG via DOM order + the bezel
          being absolute-positioned at inset:0 with a transparent screen cutout. */}
      <div
        style={{
          position: "absolute",
          inset: SCREEN_INSET,
          borderRadius: SCREEN_RADIUS,
          overflow: "hidden",
          background: "#000",
        }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition,
            }}
          />
        ) : (
          // Children render edge-to-edge inside the screen area. For
          // interactive content (eunho HoldRing), they own their own
          // background.
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {children}
          </div>
        )}
      </div>

      {/* Apple's transparent bezel on top. Screen cutout is alpha:0 so the
          screenshot behind shows through. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/devices/iphone-16-pro-natural.png"
        alt=""
        aria-hidden
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
}
