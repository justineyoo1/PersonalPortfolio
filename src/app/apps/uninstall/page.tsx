import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { AppPageFooter } from "@/components/apps/AppPageFooter";
import { ThemedAppsBottomNav } from "@/components/apps/ThemedAppsBottomNav";
import { IPhoneFrame } from "@/components/IPhoneFrame";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "UNINSTALL · THE APP BLOCKER THAT REFUSES YOUR ESCAPE",
  description:
    "Pick apps. Set duration. Lock. No cancel. No pause. No bypass. The only exit is uninstalling this app.",
  openGraph: {
    title: "UNINSTALL · THE APP BLOCKER THAT REFUSES YOUR ESCAPE",
    description:
      "Pick apps. Set duration. Lock. No cancel. No pause. No bypass.",
    url: "https://jstnyoo.com/apps/uninstall",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UNINSTALL · THE APP BLOCKER THAT REFUSES YOUR ESCAPE",
    description:
      "Pick apps. Set duration. Lock. No cancel. No pause. No bypass.",
  },
};

const UNINSTALL_CSS = `
.uninstall-root {
  --green: #00FF66;
  --red: #FF3B30;
  --gray-400: #D1D5DB;
  --gray-500: #9CA3AF;
  --gray-600: #9CA3AF;
  --gray-700: #6B7280;
  background: #000000;
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
}
.uninstall-root button,
.uninstall-root input,
.uninstall-root textarea,
.uninstall-root select,
.uninstall-root .card,
.uninstall-root .btn-bracket,
.uninstall-root header,
.uninstall-root footer,
.uninstall-root section,
.uninstall-root article,
.uninstall-root nav,
.uninstall-root ul,
.uninstall-root li { border-radius: 0; }
.uninstall-root .scanlines {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 60;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.025) 0px,
    rgba(255, 255, 255, 0.025) 1px,
    transparent 1px,
    transparent 3px
  );
  mix-blend-mode: screen;
}
.uninstall-root .scanline-drift {
  position: fixed;
  left: 0; right: 0;
  height: 2px;
  background: rgba(0, 255, 102, 0.18);
  box-shadow: 0 0 12px rgba(0, 255, 102, 0.35);
  pointer-events: none;
  z-index: 61;
  animation: uninstallDrift 8s linear infinite;
}
@keyframes uninstallDrift {
  0%   { top: -2px; }
  100% { top: 100vh; }
}
.uninstall-root .crt-glow {
  text-shadow:
    0 0 6px rgba(0, 255, 102, 0.55),
    0 0 14px rgba(0, 255, 102, 0.25);
}
.uninstall-root .cursor-blink::after {
  content: '\\2588';
  margin-left: 0.3em;
  color: var(--green);
  animation: uninstallBlink 1s steps(2, start) infinite;
  text-shadow: 0 0 8px rgba(0,255,102,0.65);
}
@keyframes uninstallBlink { to { visibility: hidden; } }
.uninstall-root .btn-bracket {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffffff;
  color: #ffffff;
  background: transparent;
  padding: 0.7rem 1.25rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: background-color 80ms linear, color 80ms linear;
  text-transform: uppercase;
  cursor: pointer;
}
.uninstall-root .btn-bracket:hover,
.uninstall-root .btn-bracket:focus-visible {
  background: #ffffff;
  color: #000000;
  outline: none;
}
.uninstall-root .btn-bracket-sm {
  padding: 0.4rem 0.75rem;
  border-width: 1px;
  font-size: 0.7rem;
  white-space: nowrap;
}
.uninstall-root .marker {
  color: var(--gray-500);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
.uninstall-root .marker-num {
  color: var(--gray-600);
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
.uninstall-root .card-title {
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 1.1;
}
.uninstall-root .card-desc {
  color: #9CA3AF;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  line-height: 1.65;
  text-transform: uppercase;
}
.uninstall-root .body-line {
  color: #D1D5DB;
  font-size: 0.875rem;
  letter-spacing: 0.04em;
  line-height: 1.75;
  text-transform: uppercase;
}
.uninstall-root .meta-strip {
  color: var(--gray-600);
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  line-height: 1.7;
  text-transform: uppercase;
}
.uninstall-root .text-balance { text-wrap: balance; }
.uninstall-root .iphone {
  position: relative;
  aspect-ratio: 380 / 780;
  background:
    linear-gradient(135deg, #5e5e62 0%, #1c1c1e 25%, #0a0a0c 50%, #1c1c1e 75%, #5e5e62 100%);
  padding: 8px;
  border-radius: 52px;
  box-shadow:
    0 40px 60px -28px rgba(0,0,0,0.95),
    0 18px 28px -16px rgba(0,0,0,0.7),
    0 0 0 1px rgba(255,255,255,0.06) inset,
    0 1px 0 rgba(255,255,255,0.22) inset,
    0 -1px 0 rgba(0,0,0,0.7) inset;
}
.uninstall-root .iphone::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 47px;
  background: linear-gradient(
    to right,
    rgba(255,255,255,0.14) 0%,
    rgba(255,255,255,0) 6%,
    rgba(255,255,255,0) 94%,
    rgba(255,255,255,0.14) 100%);
  pointer-events: none;
  z-index: 2;
}
.uninstall-root .iphone::after {
  content: '';
  position: absolute;
  left: -2px;
  top: 22%;
  width: 2px;
  height: 4%;
  background: #0a0a0a;
  box-shadow:
    0 calc(1px + 7%) 0 #0a0a0a,
    0 calc(1px + 14%) 0 #0a0a0a;
  border-radius: 1px;
  pointer-events: none;
}
.uninstall-root .iphone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 42px;
  overflow: hidden;
}
.uninstall-root .iphone-screen > img,
.uninstall-root .iphone-screen > svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uninstall-root .iphone-island {
  position: absolute;
  top: 3.2%;
  left: 50%;
  transform: translateX(-50%);
  width: 33%;
  height: 3.6%;
  background: #000;
  border-radius: 999px;
  z-index: 5;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.03);
}
.uninstall-root .iphone-island::before,
.uninstall-root .iphone-island::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 18%;
  aspect-ratio: 1;
  background: radial-gradient(circle, #0a0a0a 35%, #1c1c1f 70%);
  border-radius: 999px;
  transform: translateY(-50%);
}
.uninstall-root .iphone-island::before { left: 6%; }
.uninstall-root .iphone-island::after  { right: 6%; opacity: 0.55; }
.uninstall-root .iphone-gloss {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 42px;
  background:
    linear-gradient(118deg,
      rgba(255,255,255,0.10) 0%,
      rgba(255,255,255,0.02) 18%,
      rgba(255,255,255,0) 38%,
      rgba(255,255,255,0) 62%,
      rgba(255,255,255,0.04) 82%,
      rgba(255,255,255,0.09) 100%);
  z-index: 4;
  mix-blend-mode: screen;
}
.uninstall-root .iphone-screen::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 42px;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.04) inset;
  pointer-events: none;
  z-index: 3;
}
.uninstall-root .phone-glow {
  filter:
    drop-shadow(0 0 18px rgba(0, 255, 102, 0.12))
    drop-shadow(0 30px 40px rgba(0, 0, 0, 0.55));
}
@media (prefers-reduced-motion: reduce) {
  .uninstall-root *,
  .uninstall-root *::before,
  .uninstall-root *::after {
    animation-duration: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0s !important;
  }
  .uninstall-root .scanline-drift { display: none; }
}
.uninstall-root ::selection { background: #00FF66; color: #000; }
.uninstall-root { padding-bottom: 96px; }
`;

export default function UninstallLandingPage() {
  return (
    <main
      className={`${jetbrainsMono.className} uninstall-root relative z-10 min-h-screen overflow-x-hidden bg-black text-white`}
    >
      <style dangerouslySetInnerHTML={{ __html: UNINSTALL_CSS }} />

      <div className="scanlines" aria-hidden="true"></div>
      <div className="scanline-drift" aria-hidden="true"></div>

      {/* Tiny back link — no nav bar; hero owns the top of the page. */}
      <a
        href="/apps"
        className="fixed top-5 left-5 z-50 text-[11px] tracking-[0.2em] uppercase text-gray-500 hover:text-white transition-colors font-mono"
      >
        ← ALL APPS
      </a>

      {/* HERO */}
      <section id="top" className="border-b border-gray-800 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full py-16 sm:py-20 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-10">
              <img
                src="/uninstall/assets/icon-white.png"
                alt="UNINSTALL LOGO"
                className="w-11 h-11"
              />
              <p className="marker">&gt; SYSTEM ONLINE</p>
            </div>

            <h1 className="text-balance text-white font-bold uppercase tracking-tight leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] max-w-[22ch]">
              THE APP BLOCKER THAT REFUSES YOUR ESCAPE.
            </h1>

            <p className="mt-8 body-line max-w-xl">
              Average iOS user loses{" "}
              <span className="text-white font-bold">4H 27M</span> a day in apps
              they regret. That&apos;s{" "}
              <span className="text-white font-bold">8.4 days</span> of your
              life every month.{" "}
              <span style={{ color: "var(--red)" }} className="font-bold">
                Gone.
              </span>
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5">
              <a
                id="download"
                href="https://apps.apple.com/app/id6761068093?platform=iphone&app=jstnyoo-uninstall"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bracket text-sm sm:text-base cursor-blink"
              >
                [ DOWNLOAD ]
              </a>
              <span className="marker">
                iOS 16+ &nbsp;·&nbsp; 14 MB &nbsp;·&nbsp; 7-day trial
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <IPhoneFrame
              src="/uninstall/assets/home-idle.png"
              alt="UNINSTALL HOME · IDLE"
              width={320}
            />
          </div>
        </div>
      </section>

      {/* PROTOCOL */}
      <section className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24">
          <div className="mb-14 sm:mb-16">
            <p className="marker mb-4">&gt; PROTOCOL</p>
            <h2 className="text-balance text-white font-bold uppercase tracking-tight leading-[1] text-3xl sm:text-4xl md:text-5xl max-w-[18ch]">
              THE WALL STAYS A WALL.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800 border border-gray-800">
            <article className="bg-black p-7 sm:p-8 flex flex-col">
              <p className="marker-num mb-3">&gt; 01</p>
              <p className="card-title mb-3">SELECT APPS</p>
              <p className="card-desc mb-7">
                Choose targets. One or fifty.
              </p>
              <div className="mt-auto flex justify-center">
                <IPhoneFrame
                  src="/uninstall/assets/setblock-onetime.png"
                  alt="SELECT APPS"
                  width={140}
                />
              </div>
            </article>
            <article className="bg-black p-7 sm:p-8 flex flex-col">
              <p className="marker-num mb-3">&gt; 02</p>
              <p className="card-title mb-3">SET DURATION</p>
              <p className="card-desc mb-7">Minutes to months.</p>
              <div className="mt-auto flex justify-center">
                <IPhoneFrame
                  src="/uninstall/assets/setblock-schedule.png"
                  alt="SET DURATION"
                  width={140}
                />
              </div>
            </article>
            <article className="bg-black p-7 sm:p-8 flex flex-col">
              <p className="marker-num mb-3">&gt; 03</p>
              <p className="card-title mb-3">INITIALIZE LOCK</p>
              <p className="card-desc mb-7">
                Cancel, pause, bypass disabled.
              </p>
              <div className="mt-auto flex justify-center">
                <IPhoneFrame
                  src="/uninstall/assets/setblock-activated.png"
                  alt="LOCK ACTIVE"
                  width={140}
                />
              </div>
            </article>
            <article className="bg-black p-7 sm:p-8 flex flex-col">
              <p className="marker-num mb-3">&gt; 04</p>
              <p className="card-title mb-3">NO ESCAPE</p>
              <p className="card-desc mb-7">
                Hold 10 seconds. Or delete the app.
              </p>
              <div className="mt-auto flex justify-center">
                <IPhoneFrame
                  src="/uninstall/assets/hold-to-break.png"
                  alt="HOLD TO BREAK"
                  width={140}
                />
              </div>
            </article>
          </div>

          <div className="mt-10 sm:mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="meta-strip">
              Apple Family Controls &nbsp;·&nbsp; DeviceActivity &nbsp;·&nbsp;
              On-device
            </p>
            <p className="meta-strip">
              No server &nbsp;·&nbsp; No tracking &nbsp;·&nbsp; No accounts
            </p>
          </div>
        </div>
      </section>


      <AppPageFooter currentSlug="uninstall" supportUrl="https://jstnyoo.com/app/support" />
      <ThemedAppsBottomNav />
    </main>
  );
}
