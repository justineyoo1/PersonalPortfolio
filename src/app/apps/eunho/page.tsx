import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { AppPageFooter } from "@/components/apps/AppPageFooter";
import { ThemedAppsBottomNav } from "@/components/apps/ThemedAppsBottomNav";

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
          <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
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
        className="relative pt-20 pb-10 min-h-[100vh] flex items-center"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 -translate-x-1/2 top-12 w-[820px] h-[820px] radial-cyan-lg opacity-70"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 w-full grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-6">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 -m-3 radial-cyan rounded-full"></div>
                <div className="relative w-9 h-9 rounded-full bg-[#F5F5F5] grid place-items-center ring-glow-soft">
                  <svg viewBox="0 0 64 64" className="w-5 h-5" aria-hidden="true">
                    <defs>
                      <mask id="eunho-notch">
                        <rect width="64" height="64" fill="white" />
                        <rect x="44" y="29" width="22" height="6" rx="3" fill="black" />
                      </mask>
                    </defs>
                    <g mask="url(#eunho-notch)">
                      <circle
                        cx="32"
                        cy="32"
                        r="22"
                        fill="none"
                        stroke="#0A0A0A"
                        strokeWidth="8"
                      />
                    </g>
                    <rect x="32" y="29" width="14" height="6" rx="2" fill="#0A0A0A" />
                  </svg>
                </div>
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
            className="phone-stage relative mx-auto"
            style={{ maxWidth: "290px", width: "100%" }}
          >
            <div className="absolute -inset-14 radial-cyan opacity-80 pointer-events-none"></div>

            <div className="phone-device mx-auto">
              <div className="phone-screen">
                <div className="dynamic-island"></div>
                <div className="status-bar">
                  <span className="status-time">9:41</span>
                  <span className="status-icons" aria-hidden="true">
                    <svg viewBox="0 0 18 12" width="17" height="11" fill="#F5F5F5">
                      <rect x="0" y="8" width="3" height="4" rx="0.6" />
                      <rect x="5" y="6" width="3" height="6" rx="0.6" />
                      <rect x="10" y="3" width="3" height="9" rx="0.6" />
                      <rect x="15" y="0" width="3" height="12" rx="0.6" />
                    </svg>
                    <svg viewBox="0 0 16 12" width="15" height="11" fill="#F5F5F5">
                      <path d="M8 11.2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3.1-3.7a4.4 4.4 0 0 1 6.2 0l1-1a5.8 5.8 0 0 0-8.2 0l1 1Zm-2.4-2.4a7.8 7.8 0 0 1 11 0l1-1a9.2 9.2 0 0 0-13 0l1 1Z" />
                    </svg>
                    <svg viewBox="0 0 26 12" width="24" height="11">
                      <rect
                        x="0.5"
                        y="0.5"
                        width="22"
                        height="11"
                        rx="3"
                        fill="none"
                        stroke="#F5F5F5"
                        strokeOpacity="0.45"
                      />
                      <rect
                        x="23.5"
                        y="3.5"
                        width="1.5"
                        height="5"
                        rx="0.6"
                        fill="#F5F5F5"
                        fillOpacity="0.45"
                      />
                      <rect
                        x="2"
                        y="2"
                        width="18"
                        height="8"
                        rx="1.5"
                        fill="#F5F5F5"
                      />
                    </svg>
                  </span>
                </div>

                {/* Screen content: real screenshot, edge-to-edge */}
                <img
                  src="/img/apps/eunho/4-hold.png"
                  alt="eunho. Hold the ring for 2.5 seconds."
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ zIndex: 1 }}
                />

                <div className="phone-reflection"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTING BAND */}
      <section className="relative border-t hair py-12">
        <div className="max-w-6xl mx-auto px-6">
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

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
            {/* 1. One habit */}
            <div>
              <div className="mb-4 h-16 flex items-center">
                <div className="grid grid-cols-7 gap-1 w-full">
                  <span className="aspect-square rounded-[2px] bg-white/[0.08]"></span>
                  <span
                    className="aspect-square rounded-[2px]"
                    style={{
                      background: "#00E5FF",
                      boxShadow: "0 0 4px rgba(0,229,255,0.5)",
                    }}
                  ></span>
                  <span
                    className="aspect-square rounded-[2px]"
                    style={{ background: "#00E5FF" }}
                  ></span>
                  <span
                    className="aspect-square rounded-[2px]"
                    style={{ background: "#00E5FF" }}
                  ></span>
                  <span className="aspect-square rounded-[2px] bg-white/[0.08]"></span>
                  <span
                    className="aspect-square rounded-[2px]"
                    style={{ background: "#00E5FF" }}
                  ></span>
                  <span
                    className="aspect-square rounded-[2px]"
                    style={{ background: "#00E5FF" }}
                  ></span>
                  <span
                    className="aspect-square rounded-[2px]"
                    style={{ background: "#00E5FF" }}
                  ></span>
                  <span
                    className="aspect-square rounded-[2px]"
                    style={{ background: "#00E5FF" }}
                  ></span>
                  <span
                    className="aspect-square rounded-[2px]"
                    style={{ background: "#00E5FF" }}
                  ></span>
                  <span
                    className="aspect-square rounded-[2px]"
                    style={{ background: "#00E5FF" }}
                  ></span>
                  <span
                    className="aspect-square rounded-[2px]"
                    style={{ background: "#00E5FF" }}
                  ></span>
                  <span
                    className="aspect-square rounded-[2px]"
                    style={{ background: "#00E5FF" }}
                  ></span>
                  <span
                    className="aspect-square rounded-[2px] border"
                    style={{
                      borderColor: "#00E5FF",
                      boxShadow: "0 0 6px rgba(0,229,255,0.6)",
                    }}
                  ></span>
                </div>
              </div>
              <p className="eyebrow text-[#8B8B8B]">Focus</p>
              <h3
                className="font-serif text-[#F5F5F5] mt-1.5 leading-tight"
                style={{ fontSize: "22px" }}
              >
                One habit. One focus<span className="dot-cyan">.</span>
              </h3>
              <p className="font-serif italic text-[#BEEFF6] mt-1 text-[14px]">
                Not a dashboard.
              </p>
              <p className="text-[#8B8B8B] mt-3 text-[12.5px] leading-relaxed">
                Finish your goal, start the next. The previous habit moves to
                history.
              </p>
            </div>

            {/* 2. Widgets */}
            <div>
              <div className="mb-4 h-16 flex items-center gap-2">
                <div className="aspect-square h-full rounded-md bg-[#141414] border hair grid place-items-center">
                  <div
                    className="w-5 h-5 rounded-full border-[2px]"
                    style={{
                      borderColor: "#00E5FF",
                      boxShadow: "0 0 6px rgba(0,229,255,0.55)",
                    }}
                  ></div>
                </div>
                <div className="h-full flex-1 rounded-md bg-[#141414] border hair px-2 flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full border-[2px]"
                    style={{ borderColor: "#00E5FF" }}
                  ></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-1 rounded-full bg-white/15 w-2/3"></div>
                    <div className="h-1 rounded-full bg-white/10 w-1/2"></div>
                  </div>
                </div>
              </div>
              <p className="eyebrow text-[#8B8B8B]">Widgets &amp; Lock Screen</p>
              <h3
                className="font-serif text-[#F5F5F5] mt-1.5 leading-tight"
                style={{ fontSize: "22px" }}
              >
                Always on the surface<span className="dot-cyan">.</span>
              </h3>
              <p className="text-[#8B8B8B] mt-3 text-[12.5px] leading-relaxed">
                Small, medium, large. Lock screen complication. The ring is one
                tap away.
              </p>
            </div>

            {/* 3. Premium / Insights */}
            <div>
              <div className="mb-4 h-16 flex items-end gap-1">
                <div
                  className="flex-1 rounded-sm bg-white/15"
                  style={{ height: "40%" }}
                ></div>
                <div
                  className="flex-1 rounded-sm bg-white/25"
                  style={{ height: "60%" }}
                ></div>
                <div
                  className="flex-1 rounded-sm"
                  style={{
                    height: "95%",
                    background: "#00E5FF",
                    boxShadow: "0 0 8px rgba(0,229,255,0.55)",
                  }}
                ></div>
                <div
                  className="flex-1 rounded-sm bg-white/25"
                  style={{ height: "58%" }}
                ></div>
                <div
                  className="flex-1 rounded-sm bg-white/20"
                  style={{ height: "48%" }}
                ></div>
                <div
                  className="flex-1 rounded-sm bg-white/[0.12]"
                  style={{ height: "30%" }}
                ></div>
                <div
                  className="flex-1 rounded-sm bg-white/[0.12]"
                  style={{ height: "28%" }}
                ></div>
              </div>
              <p className="eyebrow text-[#8B8B8B]">For daily keepers</p>
              <h3
                className="font-serif italic text-[#F5F5F5] mt-1.5 leading-tight"
                style={{ fontSize: "22px" }}
              >
                Patterns, not pressure.
              </h3>
              <p className="text-[#8B8B8B] mt-3 text-[12.5px] leading-relaxed">
                Day-of-week trends. Streak freeze. Retroactive check-ins. Share
                card.
              </p>
            </div>

            {/* 4. Privacy */}
            <div>
              <div className="mb-4 h-16 flex items-center justify-start">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border hair-strong grid place-items-center">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{
                        background: "#00E5FF",
                        boxShadow: "0 0 12px rgba(0,229,255,0.6)",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="eyebrow text-[#8B8B8B]">Privacy</p>
              <h3
                className="font-serif text-[#F5F5F5] mt-1.5 leading-tight"
                style={{ fontSize: "22px" }}
              >
                Stays on your phone<span className="dot-cyan">.</span>
              </h3>
              <p className="text-[#8B8B8B] mt-3 text-[12.5px] leading-relaxed">
                No accounts. No sync. No cloud. Habit data never leaves the
                device.
              </p>
            </div>
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

      {/* PRICING */}
      <section id="pricing" className="relative border-t hair py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="eyebrow text-[#8B8B8B]">Pricing</p>
              <h2
                className="font-serif font-medium mt-2 leading-[1.0] tracking-tight text-[#F5F5F5]"
                style={{ fontSize: "clamp(32px, 4.6vw, 48px)" }}
              >
                Free to start<span className="dot-cyan">.</span>
              </h2>
            </div>
            <p className="text-[#8B8B8B] text-[12px] max-w-xs">
              Pro auto-renews at $19.99/year until canceled. Cancel anytime in
              Settings.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {/* Free */}
            <div className="card-premium rounded-2xl border hair bg-[#0E0E0E] p-6">
              <p className="eyebrow text-[#8B8B8B]">Free</p>
              <p
                className="font-serif font-medium text-[#F5F5F5] mt-1 leading-none"
                style={{ fontSize: "40px" }}
              >
                $0<span className="dot-cyan">.</span>
              </p>
              <ul className="mt-4 space-y-1.5 text-[#8B8B8B] text-[12px]">
                <li>Full hold ritual</li>
                <li>Basic streak and completion stats</li>
                <li>Home, Lock Screen, StandBy widgets</li>
                <li>Local reminders</li>
              </ul>
              <a
                href="https://apps.apple.com/app/id6761335497"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 pill-cta inline-flex items-center justify-center rounded-full border hair-strong h-10 px-5 text-[12px] font-medium tracking-wide text-[#F5F5F5]"
              >
                Download
              </a>
            </div>

            {/* Pro */}
            <div
              className="card-premium rounded-2xl border bg-[#0E0E0E] p-6 relative"
              style={{ borderColor: "rgba(255,59,122,0.45)" }}
            >
              <div className="flex items-center gap-2">
                <p className="eyebrow" style={{ color: "#FF8FB0" }}>
                  Eunho Pro
                </p>
                <span
                  className="eyebrow inline-block px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255,59,122,0.12)",
                    color: "#FF8FB0",
                    border: "1px solid rgba(255,59,122,0.4)",
                  }}
                >
                  7-day free trial
                </span>
              </div>
              <p
                className="font-serif font-medium text-[#F5F5F5] mt-1 leading-none"
                style={{ fontSize: "40px" }}
              >
                $3.99
                <span
                  className="text-[#F5F5F5]/50 font-serif"
                  style={{ fontSize: "16px" }}
                >
                  /mo
                </span>
                <span className="dot-cyan">.</span>
              </p>
              <p className="text-[#8B8B8B] text-[11.5px] mt-1.5">
                or $19.99 a year. 7-day free trial on annual.
              </p>
              <ul className="mt-4 space-y-1.5 text-[#8B8B8B] text-[12px]">
                <li>Everything in Free</li>
                <li>Retroactive check-ins</li>
                <li>Streak freeze</li>
                <li>Detailed insights and heatmaps</li>
                <li>Share card</li>
              </ul>
              <a
                href="https://apps.apple.com/app/id6761335497"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-full h-10 px-5 text-[13px] font-semibold tracking-wide text-white"
                style={{ background: "#D6195C" }}
              >
                Start Trial
              </a>
            </div>
          </div>
        </div>
      </section>

      <AppPageFooter currentSlug="eunho" supportUrl="https://jstnyoo.com/app/support" />
      <ThemedAppsBottomNav />
    </main>
  );
}
