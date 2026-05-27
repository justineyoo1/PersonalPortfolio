import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { AppPageFooter } from "@/components/apps/AppPageFooter";
import { ThemedAppsBottomNav } from "@/components/apps/ThemedAppsBottomNav";
import { HoldRing } from "./HoldRing";
import { IPhoneFrame } from "@/components/IPhoneFrame";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-eunho-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-eunho-serif",
});

export const metadata: Metadata = {
  title: "eunho. One habit. Held daily.",
  description: "The single-habit tracker. Hold. Don't tap.",
  openGraph: {
    title: "eunho. One habit. Held daily.",
    description: "The single-habit tracker. Hold. Don't tap.",
    url: "https://jstnyoo.com/apps/eunho",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "eunho. One habit. Held daily.",
    description: "The single-habit tracker. Hold. Don't tap.",
  },
};

const EUNHO_CSS = `
.eunho-root {
  --ink: #0A0A0A;
  --paper: #F5F5F5;
  --mute: #8B8B8B;
  --ring: #00E5FF;
  --magenta: #FF3B7A;
  background: var(--ink);
  color: var(--paper);
  font-family: var(--font-eunho-inter), 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.eunho-root .font-serif { font-family: var(--font-eunho-serif), 'Cormorant Garamond', ui-serif, Georgia, serif; font-feature-settings: "liga", "dlig"; }
.eunho-root .dot-cyan { color: var(--ring); }
.eunho-root .eyebrow {
  font-family: var(--font-eunho-inter), 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-weight: 500;
  font-size: 10px;
}
.eunho-root .chip {
  font-family: var(--font-eunho-inter), 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 500;
  font-size: 10px;
  color: #C9C9C9;
}
.eunho-root .chip-sep { color: #3a3a3a; }
.eunho-root .ring-glow {
  box-shadow:
    0 0 14px 1px rgba(0, 229, 255, 0.85),
    0 0 38px 6px rgba(0, 229, 255, 0.45),
    0 0 90px 18px rgba(0, 229, 255, 0.22),
    0 0 180px 40px rgba(0, 229, 255, 0.10);
}
.eunho-root .ring-glow-soft {
  box-shadow:
    0 0 8px 1px rgba(0, 229, 255, 0.55),
    0 0 22px 4px rgba(0, 229, 255, 0.28),
    0 0 50px 12px rgba(0, 229, 255, 0.12);
}
.eunho-root .radial-cyan {
  background: radial-gradient(closest-side, rgba(0,229,255,0.30), rgba(0,229,255,0.08) 55%, transparent 75%);
}
.eunho-root .radial-cyan-lg {
  background: radial-gradient(closest-side, rgba(0,229,255,0.22), rgba(0,229,255,0.06) 55%, transparent 78%);
}
.eunho-root .hair { border-color: rgba(255,255,255,0.08); }
.eunho-root .hair-strong { border-color: rgba(255,255,255,0.14); }
.eunho-root .pill-cta { transition: background-color 200ms ease, border-color 200ms ease, color 200ms ease; }
.eunho-root .pill-cta:hover { background-color: var(--magenta); border-color: var(--magenta); color: #fff; }
.eunho-root .card-premium { transition: border-color 250ms ease, box-shadow 250ms ease; }
.eunho-root .card-premium:hover {
  border-color: var(--magenta);
  box-shadow: 0 0 0 1px rgba(255,59,122,0.25), 0 30px 80px -40px rgba(255,59,122,0.35);
}
@keyframes eunhoRingPulse {
  0%, 100% {
    box-shadow:
      0 0 14px 1px rgba(0, 229, 255, 0.85),
      0 0 38px 6px rgba(0, 229, 255, 0.45),
      0 0 90px 18px rgba(0, 229, 255, 0.22);
  }
  50% {
    box-shadow:
      0 0 18px 2px rgba(0, 229, 255, 0.95),
      0 0 56px 10px rgba(0, 229, 255, 0.55),
      0 0 120px 28px rgba(0, 229, 255, 0.28);
  }
}
.eunho-root .ring-pulse { animation: eunhoRingPulse 3.6s ease-in-out infinite; }
@keyframes eunhoSerifIn {
  from { transform: translateY(6px); letter-spacing: 0.005em; }
  to   { transform: translateY(0);    letter-spacing: 0;      }
}
.eunho-root .serif-in { opacity: 1; animation: eunhoSerifIn 900ms cubic-bezier(.2,.7,.2,1) both; }
@media (prefers-reduced-motion: reduce) {
  .eunho-root .ring-pulse, .eunho-root .serif-in { animation: none !important; }
}
.eunho-root .footlink {
  font-family: var(--font-eunho-inter), 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 500;
  font-size: 10px;
  color: #8B8B8B;
}
.eunho-root .footlink:hover { color: #F5F5F5; }
.eunho-root ::selection { background: rgba(0,229,255,0.35); color: #fff; }
.eunho-root { padding-bottom: 96px; }

.eunho-root .phone-device {
  position: relative;
  border-radius: 50px;
  background:
    linear-gradient(180deg, #2a2a2c 0%, #1a1a1c 25%, #141416 50%, #1a1a1c 75%, #232325 100%);
  padding: 4px;
  box-shadow:
    0 0 0 0.5px rgba(255,255,255,0.18),
    0 1px 0 rgba(255,255,255,0.06) inset,
    0 40px 60px -20px rgba(0,0,0,0.75),
    0 80px 120px -40px rgba(0,0,0,0.6),
    0 0 50px -10px rgba(0, 229, 255, 0.18);
  overflow: visible;
}
.eunho-root .phone-device::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50px;
  pointer-events: none;
  background:
    linear-gradient(90deg,
      rgba(255,255,255,0.10) 0%,
      rgba(255,255,255,0) 6%,
      rgba(255,255,255,0) 94%,
      rgba(255,255,255,0.10) 100%);
  mix-blend-mode: screen;
}
.eunho-root .phone-screen {
  position: relative;
  border-radius: 46px;
  background: #000;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(0,0,0,0.9) inset,
    0 0 0 2px rgba(50,50,52,0.7) inset;
  aspect-ratio: 9 / 19.5;
}
.eunho-root .dynamic-island {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 32%;
  max-width: 110px;
  min-width: 78px;
  height: 26px;
  border-radius: 999px;
  background: #000;
  box-shadow:
    0 0 0 0.5px rgba(255,255,255,0.04),
    0 2px 8px rgba(0,0,0,0.6);
  z-index: 5;
}
.eunho-root .dynamic-island::after {
  content: "";
  position: absolute;
  right: 10px; top: 50%;
  width: 7px; height: 7px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #1a1f29 0%, #050608 70%);
  box-shadow: 0 0 0 0.5px rgba(255,255,255,0.06);
  transform: translateY(-50%);
}
.eunho-root .status-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  z-index: 6;
  color: #F5F5F5;
  font-family: var(--font-eunho-inter), 'Inter', sans-serif;
}
.eunho-root .status-time {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
}
.eunho-root .status-icons {
  display: flex;
  align-items: center;
  gap: 5px;
}
.eunho-root .phone-reflection {
  position: absolute;
  inset: 0;
  border-radius: 46px;
  pointer-events: none;
  z-index: 7;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 18%),
    linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 8%),
    linear-gradient(270deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 12%);
  mix-blend-mode: screen;
}
.eunho-root .phone-stage { position: relative; }
.eunho-root .phone-stage::after {
  content: "";
  position: absolute;
  left: 8%; right: 8%;
  bottom: -22px;
  height: 32px;
  background: radial-gradient(50% 100% at 50% 0%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%);
  filter: blur(6px);
  z-index: -1;
  pointer-events: none;
}
`;

export default function EunhoLandingPage() {
  return (
    <main
      className={`${inter.variable} ${cormorant.variable} eunho-root relative z-10 min-h-screen overflow-x-hidden antialiased`}
    >
      <style dangerouslySetInnerHTML={{ __html: EUNHO_CSS }} />

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50">
        <div className="backdrop-blur-md bg-[#0A0A0A]/60 border-b hair">
          <div className="px-5 sm:px-8 lg:px-12 h-12 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <a
                href="/apps"
                className="text-[11px] tracking-[0.18em] uppercase text-[#8B8B8B] hover:text-[#F5F5F5] transition-colors font-medium"
              >
                ← All apps
              </a>
              <a
                href="#top"
                className="font-serif text-[18px] leading-none tracking-tight text-[#F5F5F5]"
              >
                eunho<span className="dot-cyan">.</span>
              </a>
            </div>
            <a
              href="#download"
              className="pill-cta inline-flex items-center gap-2 rounded-full border hair-strong px-3.5 h-8 text-[11px] font-medium tracking-wide text-[#F5F5F5]"
            >
              Download
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="top"
        className="relative pt-20 pb-10 min-h-screen flex items-center"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 -translate-x-1/2 top-12 w-[820px] h-[820px] radial-cyan-lg opacity-70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 -m-3 radial-cyan rounded-full"></div>
                <img
                  src="/img/apps/eunho/logo-mark.png"
                  alt="eunho logo"
                  width={40}
                  height={40}
                  className="relative w-10 h-10"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(80%) sepia(60%) saturate(2500%) hue-rotate(140deg) brightness(105%) contrast(95%) drop-shadow(0 0 6px rgba(0,229,255,0.55))",
                  }}
                />
              </div>
              <p className="eyebrow text-[#8B8B8B]">The single-habit tracker</p>
            </div>

            <h1
              className="font-serif font-medium leading-[0.92] tracking-tight serif-in text-[#F5F5F5]"
              style={{ fontSize: "clamp(56px, 11vw, 120px)" }}
            >
              eunho<span className="dot-cyan">.</span>
            </h1>

            <p
              className="font-serif italic mt-3 text-[#F5F5F5]/90 serif-in"
              style={{
                animationDelay: "120ms",
                fontSize: "clamp(22px, 4.4vw, 40px)",
                lineHeight: 1.1,
              }}
            >
              One habit. Held daily.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2">
              <span className="chip">Hold</span>
              <span className="chip-sep">·</span>
              <span className="chip">Streak</span>
              <span className="chip-sep">·</span>
              <span className="chip">Widgets</span>
              <span className="chip-sep">·</span>
              <span className="chip">Lock Screen</span>
            </div>

            <div
              id="download"
              className="mt-7 flex items-center justify-center md:justify-start gap-3"
            >
              <a
                href="https://apps.apple.com/app/id6761335497"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-black border hair-strong px-4 h-12 hover:border-white/30 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-[#F5F5F5]"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M16.365 1.43c0 1.14-.42 2.22-1.12 3.04-.79.92-2.08 1.64-3.13 1.55-.13-1.1.45-2.27 1.13-3.06.78-.91 2.13-1.59 3.12-1.53zM20.5 17.06c-.51 1.18-.75 1.71-1.4 2.76-.91 1.46-2.19 3.28-3.78 3.3-1.41.01-1.78-.92-3.7-.91-1.92.01-2.33.93-3.74.91-1.59-.02-2.8-1.66-3.71-3.12C1.74 16.04 1.46 11.4 3.05 9c1.12-1.7 2.9-2.69 4.57-2.69 1.7 0 2.77.93 4.18.93 1.36 0 2.19-.94 4.16-.94 1.49 0 3.07.81 4.19 2.21-3.68 2.01-3.08 7.27.35 8.55z" />
                </svg>
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-[#8B8B8B]">
                    Download on the
                  </span>
                  <span className="text-[16px] font-serif font-medium text-[#F5F5F5] mt-0.5">
                    App Store
                  </span>
                </span>
              </a>
              <a
                href="#pricing"
                className="text-[12px] tracking-wide text-[#8B8B8B] hover:text-[#F5F5F5] transition-colors"
              >
                7-day free trial<span className="dot-cyan">.</span>
              </a>
            </div>
          </div>

          {/* RIGHT: iPhone */}
          <div
            className="phone-stage relative mx-auto w-full max-w-[290px] lg:max-w-[340px] xl:max-w-[380px]"
          >
            <div className="absolute -inset-14 radial-cyan opacity-80 pointer-events-none"></div>

            <IPhoneFrame width={320} className="mx-auto block">
              <HoldRing />
            </IPhoneFrame>
          </div>
        </div>
      </section>

      {/* SUPPORTING BAND */}
      <section className="relative border-t hair">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
          <div className="grid md:grid-cols-2 gap-6 items-end pb-10 border-b hair">
            <div>
              <p className="eyebrow text-[#8B8B8B]">The ritual</p>
              <h2
                className="font-serif font-medium mt-2 leading-[1.0] tracking-tight text-[#F5F5F5]"
                style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
              >
                Hold. Don&apos;t tap<span className="dot-cyan">.</span>
              </h2>
              <p
                className="font-serif italic mt-2"
                style={{ fontSize: "clamp(18px,2.2vw,24px)", color: "#BEEFF6" }}
              >
                2.5 seconds. No accidents.
              </p>
            </div>
            <p className="text-[#8B8B8B] text-[14px] leading-relaxed md:max-w-sm md:justify-self-end">
              The hold is the product. Weighted. Haptic. Satisfying. Look
              forward to doing it.
            </p>
          </div>

          {/* Real App Store screenshots in a row */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {[
              { src: "/img/apps/eunho/1-intro.png", alt: "eunho intro: hold the ring to check in for the day" },
              { src: "/img/apps/eunho/2-100days.png", alt: "100 days, visible on one screen" },
              { src: "/img/apps/eunho/3-widgets.png", alt: "Lock Screen, Home Screen, and StandBy widgets" },
              { src: "/img/apps/eunho/5-insights.png", alt: "Patterns, not pressure: heatmap and weekday trends" },
              { src: "/img/apps/eunho/6-quiet.png", alt: "Quiet proof. Day 21. Quiet, but it counts." },
            ].map((shot) => (
              <div
                key={shot.src}
                className="rounded-[20px] overflow-hidden border hair bg-black"
                style={{ aspectRatio: "1320 / 2868" }}
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  className="block w-full h-auto"
                />
              </div>
            ))}
          </div>

          {/* Social proof inline */}
          <div className="mt-12 pt-10 border-t hair flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <blockquote
              className="font-serif italic text-[#F5F5F5] leading-[1.1]"
              style={{ fontSize: "clamp(22px, 3.2vw, 34px)", maxWidth: "38ch" }}
            >
              &ldquo;Day 21. Quiet, but it counts.&rdquo;
            </blockquote>
            <p className="footlink shrink-0">App Store Review</p>
          </div>
        </div>
      </section>


      <AppPageFooter currentSlug="eunho" supportUrl="https://jstnyoo.com/app/support" />
      <ThemedAppsBottomNav />
    </main>
  );
}
