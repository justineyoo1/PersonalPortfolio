import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppPageFooter } from "@/components/apps/AppPageFooter";
import { ThemedAppsBottomNav } from "@/components/apps/ThemedAppsBottomNav";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Brik. Mornings you don't snooze.",
  description:
    "The alarm rings. The mission runs. Only completing the mission silences the alarm. No skip. No negotiate.",
  openGraph: {
    title: "Brik. Mornings you don't snooze.",
    description:
      "The alarm rings. The mission runs. Only completing the mission silences the alarm.",
    url: "https://jstnyoo.com/apps/brik",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brik. Mornings you don't snooze.",
    description:
      "The alarm rings. The mission runs. Only completing the mission silences the alarm.",
  },
};

const BRIK_CSS = `
:root { color-scheme: dark; }
.brik-root {
  background-color: #0A0605;
  color: #fff;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  background-image:
    radial-gradient(1100px 520px at 50% -6%, rgba(234, 88, 12, 0.22), transparent 60%),
    radial-gradient(900px 460px at 90% 30%, rgba(245, 158, 11, 0.06), transparent 60%),
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='120' viewBox='0 0 240 120'><g fill='none' stroke='%23F59E0B' stroke-opacity='0.04' stroke-width='1'><path d='M0 0H240'/><path d='M0 60H240'/><path d='M0 120H240'/><path d='M0 0V60M80 0V60M160 0V60M240 0V60'/><path d='M40 60V120M120 60V120M200 60V120'/></g></svg>"),
    linear-gradient(#1A0F0A, #0A0605 80%);
  background-attachment: fixed;
}
.brik-root .wordmark-period { color: #EA580C; }
.brik-root .hero-glow { position: relative; }
.brik-root .hero-glow::before {
  content: "";
  position: absolute;
  inset: -60% -60% -40% -60%;
  background: radial-gradient(closest-side, rgba(234,88,12,0.55), rgba(234,88,12,0.18) 40%, transparent 70%);
  filter: blur(20px);
  z-index: 0;
  pointer-events: none;
}
.brik-root .hero-glow > * { position: relative; z-index: 1; }
.brik-root .nav-blur {
  background: rgba(10, 6, 5, 0.6);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border-bottom: 1px solid rgba(245, 158, 11, 0.08);
}
.brik-root .chip {
  border: 1px solid rgba(245, 158, 11, 0.18);
  background: rgba(245, 158, 11, 0.04);
}
.brik-root .ring-card {
  border: 1px solid rgba(255,255,255,0.06);
  background: linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005));
}
.brik-root .ribbon {
  position: absolute;
  top: 14px;
  right: -34px;
  transform: rotate(35deg);
  background: linear-gradient(90deg, #F59E0B, #EA580C);
  color: #0A0605;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 5px 38px;
  font-size: 11px;
  box-shadow: 0 6px 18px rgba(234,88,12,0.35);
}
.brik-root .num-badge {
  font-feature-settings: "tnum" 1;
  background: linear-gradient(180deg, #F59E0B, #EA580C);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.brik-root .hairline { background: linear-gradient(90deg, transparent, rgba(245,158,11,0.22), transparent); height: 1px; }
.brik-root ::selection { background: #EA580C; color: #fff; }
.brik-root { padding-bottom: 96px; }

/* iPhone 15 Pro mockup */
.brik-root .phone {
  position: relative;
  display: inline-block;
  width: var(--pw, 280px);
  aspect-ratio: 393 / 852;
  isolation: isolate;
}
.brik-root .phone::after {
  content: "";
  position: absolute;
  left: 8%; right: 8%;
  bottom: -3%;
  height: 4%;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, transparent 70%);
  filter: blur(8px);
  z-index: -1;
}
.brik-root .phone-frame {
  position: absolute;
  inset: 0;
  border-radius: 13.2%;
  padding: 2.2%;
  background: linear-gradient(135deg, #6e6a66 0%, #2c2825 25%, #141210 50%, #2c2825 75%, #6e6a66 100%);
  box-shadow:
    0 30px 60px -10px rgba(0,0,0,0.75),
    0 20px 30px -10px rgba(234,88,12,0.18),
    inset 0 0 0 1px rgba(255,255,255,0.06),
    inset 0 1px 0 rgba(255,255,255,0.18),
    inset 0 -1px 0 rgba(0,0,0,0.7);
}
.brik-root .phone-frame::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(115deg,
    transparent 30%,
    rgba(255,255,255,0.08) 45%,
    rgba(255,255,255,0.16) 50%,
    rgba(255,255,255,0.05) 55%,
    transparent 70%);
  pointer-events: none;
  mix-blend-mode: screen;
}
.brik-root .phone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 11.6%;
  overflow: hidden;
  background: #0A0605;
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,0.06),
    inset 0 0 0 2px rgba(0,0,0,0.5);
}
.brik-root .phone-screen img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
.brik-root .phone-island {
  position: absolute;
  top: 2.8%;
  left: 50%;
  transform: translateX(-50%);
  width: 32%;
  height: 4.4%;
  background: #000;
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
  z-index: 3;
}
.brik-root .phone-island::after {
  content: "";
  position: absolute;
  right: 12%;
  top: 50%;
  transform: translateY(-50%);
  width: 6px; height: 6px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #1a1a1a 0%, #050505 70%);
}
.brik-root .phone-status {
  position: absolute;
  top: 2.8%;
  left: 0;
  right: 0;
  height: 4.4%;
  padding: 0 7%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85em;
  color: #fff;
  font-weight: 600;
  z-index: 2;
  pointer-events: none;
}
.brik-root .phone-status .time { font-feature-settings: "tnum" 1; }
.brik-root .phone-status .icons { display: flex; gap: 6px; align-items: center; opacity: 0.95; }
.brik-root .phone-home {
  position: absolute;
  bottom: 1.4%;
  left: 50%;
  transform: translateX(-50%);
  width: 36%;
  height: 0.6%;
  background: rgba(255,255,255,0.45);
  border-radius: 999px;
  z-index: 3;
}
/* Side button */
.brik-root .phone-frame::after {
  content: "";
  position: absolute;
  left: -1.1%;
  top: 22%;
  width: 1.2%;
  height: 8%;
  background: linear-gradient(90deg, #3a2c25, #5a473e 40%, #3a2c25);
  border-radius: 2px 0 0 2px;
  box-shadow: 0 6%/0 6% 0 #3a2c25;
}
.brik-root .phone-float { animation: brikPhoneFloat 7s ease-in-out infinite; }
@keyframes brikPhoneFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@media (prefers-reduced-motion: reduce) {
  .brik-root *, .brik-root *::before, .brik-root *::after {
    animation-duration: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0s !important;
    scroll-behavior: auto !important;
  }
  .brik-root .hero-glow::before { display: none; }
  .brik-root .phone-frame::before { display: none; }
  .brik-root { background-attachment: scroll; }
}
`;

export default function BrikLandingPage() {
  return (
    <main
      className={`${inter.className} brik-root relative z-10 min-h-screen overflow-x-hidden`}
    >
      <style dangerouslySetInnerHTML={{ __html: BRIK_CSS }} />

      {/* NAV */}
      <nav className="nav-blur fixed top-0 inset-x-0 z-50">
        <div className="px-5 sm:px-8 lg:px-12 h-14 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href="/apps"
              className="text-[11px] tracking-[0.18em] uppercase text-[#9CA3AF] hover:text-amber-500 transition-colors font-medium"
            >
              ← All apps
            </a>
            <a href="#top" className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight">
                Brik<span className="wordmark-period">.</span>
              </span>
            </a>
          </div>
          <a
            href="#download"
            className="inline-flex items-center gap-2 rounded-full bg-white text-[#0A0605] font-bold text-sm px-4 py-1.5 hover:bg-amber-500 transition-colors"
          >
            Download
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="min-h-screen flex items-center pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="relative inline-block hero-glow mb-5">
              <img
                src="/brik/assets/logo.png"
                alt="Brik logo, four orange to amber bricks stacked"
                width={76}
                height={76}
                className="w-[68px] h-[68px] sm:w-[76px] sm:h-[76px]"
              />
            </div>

            <h1 className="font-extrabold tracking-tight leading-[0.9]">
              <span className="block text-[56px] sm:text-[76px] md:text-[84px] lg:text-[96px]">
                Brik<span className="wordmark-period">.</span>
              </span>
            </h1>

            <p className="mt-3 text-2xl sm:text-3xl md:text-[28px] lg:text-[34px] font-extrabold tracking-tight text-balance">
              Build your morning, brick by brick.
            </p>

            <p className="mt-3 text-sm sm:text-base text-[#9CA3AF] font-medium max-w-md mx-auto lg:mx-0 text-balance">
              Pushups, math, photos. Whatever it takes. Brik makes sure you
              actually get out of bed.
            </p>

            <ul className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs sm:text-sm">
              <li className="chip rounded-full px-3 py-1 text-white/90">Pushups</li>
              <li className="chip rounded-full px-3 py-1 text-white/90">Math</li>
              <li className="chip rounded-full px-3 py-1 text-white/90">Sky photo</li>
              <li className="chip rounded-full px-3 py-1 text-white/90">Streaks</li>
            </ul>

            <div
              className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3"
              id="download"
            >
              <a
                href="https://apps.apple.com/app/id6761065846?platform=iphone&app=jstnyoo-brik"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl bg-black text-white px-5 py-3 border border-white/10 hover:border-white/25 transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.365 1.43c0 1.14-.42 2.22-1.12 3.04-.79.92-2.08 1.64-3.13 1.55-.13-1.1.45-2.27 1.13-3.06.78-.91 2.13-1.59 3.12-1.53zM20.5 17.06c-.51 1.18-.75 1.71-1.4 2.76-.91 1.46-2.19 3.28-3.78 3.3-1.41.01-1.78-.92-3.7-.91-1.92.01-2.33.93-3.74.91-1.59-.02-2.8-1.66-3.71-3.12C1.74 16.04 1.46 11.4 3.05 9c1.12-1.7 2.9-2.69 4.57-2.69 1.7 0 2.77.93 4.18.93 1.36 0 2.19-.94 4.16-.94 1.49 0 3.07.81 4.19 2.21-3.68 2.01-3.08 7.27.35 8.55z" />
                </svg>
                <span className="text-left leading-tight">
                  <span className="block text-[9px] font-medium tracking-widest text-white/70 uppercase">
                    Download on the
                  </span>
                  <span className="block text-base font-extrabold tracking-tight">
                    App Store
                  </span>
                </span>
              </a>
              <span className="text-xs text-[#9CA3AF] font-medium">
                iOS 17. iPhone only.
              </span>
            </div>
          </div>

          {/* RIGHT: hero phone */}
          <div className="flex justify-center md:justify-end">
            <div
              className="phone phone-float"
              style={{ ["--pw" as string]: "clamp(220px, 28vw, 360px)" }}
            >
              <div className="phone-frame">
                <div className="phone-screen">
                  <img
                    src="/brik/assets/hero.png"
                    alt="Brik lock screen mid mission, alarm ringing, two of three pushups complete."
                  />
                  <div className="phone-island"></div>
                  <div className="phone-status">
                    <span className="time">9:41</span>
                    <span className="icons" aria-hidden="true">
                      <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
                        <path d="M1 9h2v2H1zM4 7h2v4H4zM7 5h2v6H7zM10 3h2v8H10zM13 1h2v10h-2z" />
                      </svg>
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
                        <path d="M7 9.5a1 1 0 100-2 1 1 0 000 2zM4 6.5l1.4 1.4a2 2 0 013.2 0L10 6.5a4 4 0 00-6 0zM1 3.5l1.4 1.4a6 6 0 018.2 0L12 3.5a8 8 0 00-11 0z" />
                      </svg>
                      <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
                        <rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="currentColor" opacity="0.6" />
                        <rect x="2" y="2" width="14" height="7" rx="1.2" fill="currentColor" />
                        <rect x="21" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.6" />
                      </svg>
                    </span>
                  </div>
                  <div className="phone-home"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="hairline max-w-7xl mx-auto"></div>

      {/* SUPPORTING BAND */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-bold tracking-[0.3em] text-amber-500 uppercase mb-2">
                How it works
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-balance max-w-2xl">
                The average person snoozes{" "}
                <span className="num-badge">4 times</span> before getting up.
                Brik removes the snooze button.
              </h2>
            </div>
            <div className="flex items-end gap-6 shrink-0">
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold num-badge leading-none">
                  47
                </div>
                <div className="text-[10px] tracking-widest text-[#9CA3AF] mt-1">
                  DAY STREAK
                </div>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold leading-none">
                  98<span className="text-2xl text-[#9CA3AF]">%</span>
                </div>
                <div className="text-[10px] tracking-widest text-[#9CA3AF] mt-1">
                  MISSION SUCCESS
                </div>
              </div>
            </div>
          </div>

          <ol className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <li className="flex items-center gap-4 sm:gap-5">
              <div
                className="phone shrink-0"
                style={{ ["--pw" as string]: "clamp(96px, 14vw, 130px)" }}
              >
                <div className="phone-frame">
                  <div className="phone-screen">
                    <img
                      src="/brik/assets/proof.png"
                      alt="Alarm setup with mission picker."
                    />
                    <div className="phone-island"></div>
                    <div className="phone-home"></div>
                  </div>
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-2xl font-extrabold num-badge leading-none">
                  01
                </div>
                <h3 className="mt-1 text-base sm:text-lg font-extrabold leading-snug">
                  Set the alarm. Pick a mission.
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#9CA3AF] font-medium">
                  Pushups, math, sky photo, or made bed.
                </p>
              </div>
            </li>

            <li className="flex items-center gap-4 sm:gap-5">
              <div
                className="phone shrink-0"
                style={{ ["--pw" as string]: "clamp(96px, 14vw, 130px)" }}
              >
                <div className="phone-frame">
                  <div className="phone-screen">
                    <img
                      src="/brik/assets/mission-math.png"
                      alt="Math problem running while the alarm rings."
                    />
                    <div className="phone-island"></div>
                    <div className="phone-home"></div>
                  </div>
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-2xl font-extrabold num-badge leading-none">
                  02
                </div>
                <h3 className="mt-1 text-base sm:text-lg font-extrabold leading-snug">
                  Alarm rings. Mission runs.
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#9CA3AF] font-medium">
                  No skip. No back button.
                </p>
              </div>
            </li>

            <li className="flex items-center gap-4 sm:gap-5">
              <div
                className="phone shrink-0"
                style={{ ["--pw" as string]: "clamp(96px, 14vw, 130px)" }}
              >
                <div className="phone-frame">
                  <div className="phone-screen">
                    <img
                      src="/brik/assets/win.png"
                      alt="Mission complete screen, alarm silenced."
                    />
                    <div className="phone-island"></div>
                    <div className="phone-home"></div>
                  </div>
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-2xl font-extrabold num-badge leading-none">
                  03
                </div>
                <h3 className="mt-1 text-base sm:text-lg font-extrabold leading-snug">
                  Mission completes. Alarm silences.
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#9CA3AF] font-medium">
                  You&apos;re up. The day is yours.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <AppPageFooter currentSlug="brik" supportUrl="https://jstnyoo.com/app/support" />
      <ThemedAppsBottomNav />
    </main>
  );
}
