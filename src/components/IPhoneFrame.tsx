"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

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
 *
 * `float` (default true): the device fades + drifts up into place when it
 * scrolls into view — a soft "float in" entrance. Honors reduced-motion and
 * degrades to instantly-visible where IntersectionObserver is unavailable.
 */

type BaseProps = {
  width?: number;
  className?: string;
  style?: CSSProperties;
  objectPosition?: string;
  imgStyle?: CSSProperties;
  imgClassName?: string;
  priority?: boolean;
  float?: boolean;
};

type Props =
  | (BaseProps & { src: string; alt: string; children?: never })
  | (BaseProps & { src?: never; alt?: never; children: ReactNode });

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

// Premium, layered contact→ambient shadow. Follows the alpha silhouette of the
// bezel PNG, so it reads like a real device resting in light.
const DEVICE_SHADOW =
  "drop-shadow(0 2px 4px rgba(0,0,0,0.45)) drop-shadow(0 14px 34px rgba(0,0,0,0.4)) drop-shadow(0 38px 80px rgba(0,0,0,0.45))";

export function IPhoneFrame({
  src,
  alt,
  children,
  width = 300,
  className,
  style,
  objectPosition = "center top",
  imgStyle,
  imgClassName,
  float = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(!float);

  useEffect(() => {
    if (!float) return;
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [float]);

  const revealStyle: CSSProperties = float
    ? {
        opacity: revealed ? 1 : 0,
        transform: revealed ? "none" : "translateY(48px) scale(0.985)",
        transition:
          "opacity 700ms cubic-bezier(.2,.7,.2,1), transform 850ms cubic-bezier(.2,.7,.2,1)",
        willChange: "opacity, transform",
      }
    : {};

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        width,
        aspectRatio: ASPECT,
        filter: DEVICE_SHADOW,
        ...revealStyle,
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
            className={imgClassName}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition,
              ...imgStyle,
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

        {/* Subtle glass gloss — a faint top-left sheen for a premium feel.
            Above the screenshot, below the bezel (shows through the cutout). */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: SCREEN_RADIUS,
            pointerEvents: "none",
            background:
              "linear-gradient(125deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 11%, rgba(255,255,255,0) 32%)",
            mixBlendMode: "screen",
          }}
        />
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
