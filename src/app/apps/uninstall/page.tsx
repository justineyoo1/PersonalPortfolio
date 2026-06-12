import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { AppPageFooter } from "@/components/apps/AppPageFooter";
import { ThemedAppsBottomNav } from "@/components/apps/ThemedAppsBottomNav";
import { IPhoneFrame } from "@/components/IPhoneFrame";
import { CountUp } from "@/components/apps/CountUp";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Uninstall · 312 hours reclaimed. 0% escape rate.",
  description:
    "The app blocker with no off switch. Set a block, lose the cancel button. The only exit is a 10-second hold. The average iOS user loses 8.4 days a month to apps they regret. Get the time back.",
  openGraph: {
    title: "Uninstall · The app blocker with no off switch",
    description:
      "Set a block, lose the cancel button. No cancel, no pause, no bypass. The only exit is a 10-second hold.",
    url: "https://jstnyoo.com/apps/uninstall",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uninstall · The app blocker with no off switch",
    description:
      "Set a block, lose the cancel button. The only exit is a 10-second hold.",
  },
};

const CSS = `
.uninstall-root {
  --green: #00FF66;
  --red: #FF3B30;
  --g4: #D1D5DB;
  --g5: #9CA3AF;
  --g6: #6B7280;
  --line: #1c1c1f;
  background: #000;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  padding-bottom: 110px;
}
.uninstall-root ::selection { background: var(--green); color: #000; }
.uninstall-root .grain {
  position: fixed; inset: 0; pointer-events: none; z-index: 1;
  background:
    repeating-linear-gradient(to bottom,
      rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px,
      transparent 1px, transparent 3px);
  mix-blend-mode: screen;
}
.uninstall-root .ambient {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(720px 520px at 78% 8%, rgba(0,255,102,0.10), transparent 62%),
    radial-gradient(620px 480px at 8% 92%, rgba(0,255,102,0.05), transparent 60%);
}
.uninstall-root .mono { font-feature-settings: "tnum" 1; }
.uninstall-root .crt {
  text-shadow: 0 0 8px rgba(0,255,102,0.55), 0 0 22px rgba(0,255,102,0.22);
}
.uninstall-root .wordmark {
  color: #fff;
  font-weight: 800;
  letter-spacing: 0.06em;
  line-height: 0.9;
  text-shadow: 0 0 8px rgba(0,255,102,0.45), 0 0 34px rgba(0,255,102,0.22);
}
.uninstall-root .marker {
  color: var(--g5); font-size: 0.7rem; letter-spacing: 0.24em;
  text-transform: uppercase; font-weight: 500;
}
.uninstall-root .marker-dim { color: var(--g6); }
.uninstall-root .btn {
  display: inline-flex; align-items: center; justify-content: center;
  border: 2px solid #fff; color: #fff; background: #000;
  padding: 0.85rem 1.6rem; font-weight: 800; letter-spacing: 0.04em;
  text-transform: uppercase; cursor: pointer; position: relative; z-index: 10;
  transition: background 90ms linear, color 90ms linear, box-shadow 220ms ease;
}
.uninstall-root .btn:hover, .uninstall-root .btn:focus-visible {
  background: #fff; color: #000; outline: none;
  box-shadow: 0 0 0 5px rgba(0,255,102,0.16), 0 0 34px rgba(0,255,102,0.34);
}
.uninstall-root .btn-lg { padding: 1.15rem 3.2rem; font-size: 1.05rem; letter-spacing: 0.08em; }
.uninstall-root .cursor::after {
  content: '\\2588'; margin-left: 0.35em; color: var(--green);
  animation: uninstallBlink 1s steps(2, start) infinite;
  text-shadow: 0 0 8px rgba(0,255,102,0.7);
}
@keyframes uninstallBlink { to { visibility: hidden; } }
.uninstall-root .statbox { background: #050505; border: 1px solid var(--line); }
.uninstall-root .receipt {
  background:
    linear-gradient(180deg, transparent, rgba(0,0,0,0.85) 86%),
    #050505;
}
.uninstall-root .recline { color: var(--g5); }
.uninstall-root .recline .deny { color: var(--red); font-weight: 700; }
.uninstall-root .ticker { position: relative; overflow: hidden; }
.uninstall-root .ticker-track {
  display: inline-flex; gap: 2.5rem; white-space: nowrap;
  animation: uninstallScroll 26s linear infinite; will-change: transform;
}
@keyframes uninstallScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.uninstall-root .shot {
  border: 1px solid var(--line); background: #050505;
  transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;
}
.uninstall-root .shot:hover {
  border-color: rgba(0,255,102,0.4);
  box-shadow: 0 0 0 1px rgba(0,255,102,0.25), 0 30px 70px -40px rgba(0,255,102,0.5);
  transform: translateY(-3px);
}
@media (prefers-reduced-motion: reduce) {
  .uninstall-root .ticker-track { animation: none; }
  .uninstall-root .cursor::after { animation: none; }
}
`;

const RECEIPT_LINES = [
  ["07:14:02", "INSTAGRAM", "OPEN ATTEMPT"],
  ["08:47:12", "SCREEN TIME", "OVERRIDE"],
  ["09:13:44", "TIKTOK", "OPEN ATTEMPT"],
  ["11:02:09", "SETTINGS", "DATE ROLLBACK"],
  ["12:30:51", "REDDIT", "OPEN ATTEMPT"],
  ["14:22:07", "UNINSTALL", "DELETE + REINSTALL"],
  ["16:58:33", "X", "OPEN ATTEMPT"],
  ["19:41:20", "YOUTUBE", "OPEN ATTEMPT"],
  ["23:48:30", "FOCUS BYPASS", "VPN TRICK"],
];

export default function UninstallLandingPage() {
  return (
    <main
      className={`${jetbrainsMono.className} uninstall-root relative z-10 min-h-screen overflow-x-hidden`}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ambient" aria-hidden />
      <div className="grain" aria-hidden />

      <a
        href="/apps"
        className="fixed top-5 left-5 z-50 text-[11px] tracking-[0.2em] uppercase text-gray-500 hover:text-white transition-colors"
      >
        ← ALL APPS
      </a>

      {/* HERO — brand wordmark leads, the reclaimed number proves it */}
      <section className="relative border-b border-[#1c1c1f] min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pt-24 pb-4 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-5">
            <img src="/uninstall/assets/icon-white.png" alt="UNINSTALL" className="w-8 h-8" />
            <p className="marker">&gt; APP BLOCKER · NO TAKEBACKS</p>
          </div>
          <h1 className="wordmark uppercase" style={{ fontSize: "clamp(44px, 11vw, 120px)" }}>
            Uninstall
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pb-20 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="marker mb-4">&gt; RECLAIMED · ALL TIME</p>
            <div className="flex items-end gap-3 leading-none">
              <span className="crt mono text-green-400 font-extrabold tracking-tight text-[22vw] sm:text-[16vw] lg:text-[10rem] xl:text-[11rem]" style={{ color: "var(--green)" }}>
                <CountUp to={312} />
              </span>
              <span className="crt mono font-extrabold text-3xl sm:text-5xl lg:text-6xl mb-3 sm:mb-5" style={{ color: "var(--green)" }}>
                H
              </span>
              <span className="mono font-bold text-xl sm:text-3xl lg:text-4xl mb-3 sm:mb-6 text-gray-500">
                20M
              </span>
            </div>

            <h2 className="mt-6 text-balance text-white font-extrabold uppercase tracking-tight leading-[1.02] text-2xl sm:text-3xl lg:text-[2.4rem] max-w-[24ch]">
              Given back by the app blocker with{" "}
              <span style={{ color: "var(--green)" }}>no off switch.</span>
            </h2>

            <p className="mt-6 text-[#D1D5DB] text-sm sm:text-base leading-relaxed max-w-xl">
              The average iOS user burns{" "}
              <span className="text-white font-bold">4H 27M</span> a day in apps
              they regret,{" "}
              <span className="text-white font-bold">8.4 days</span> every month.
              Set a block, lose the cancel button.{" "}
              <span style={{ color: "var(--red)" }} className="font-bold">
                Get the time back.
              </span>
            </p>

            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-5">
              <a
                href="https://apps.apple.com/app/id6761068093"
                target="_blank"
                rel="noopener noreferrer"
                className="btn cursor"
              >
                [ DOWNLOAD ]
              </a>
              <span className="marker marker-dim">
                iOS 16+ &nbsp;·&nbsp; 14 MB &nbsp;·&nbsp; 3-DAY TRIAL
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <IPhoneFrame
              src="/uninstall/assets/home-idle.png"
              alt="UNINSTALL home screen showing reclaimed hours and block stats"
              width={300}
            />
          </div>
        </div>
      </section>

      {/* STATS BAND — the app's own numbers, exploded */}
      <section className="border-b border-[#1c1c1f] relative min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
          <p className="marker mb-10">&gt; STATS · LIFETIME</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1c1c1f] border border-[#1c1c1f]">
            {[
              { n: <><CountUp to={312} />H</>, l: "RECLAIMED" },
              { n: <CountUp to={73} />, l: "BLOCKS RUN" },
              { n: "04:30", l: "LONGEST BLOCK" },
              { n: <><CountUp to={0} />%</>, l: "ESCAPE RATE" },
            ].map((s, i) => (
              <div key={i} className="statbox p-6 sm:p-8">
                <div className="crt mono font-extrabold text-4xl sm:text-5xl lg:text-6xl" style={{ color: "var(--green)" }}>
                  {s.n}
                </div>
                <div className="marker marker-dim mt-3">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="marker marker-dim mt-6">
            &gt; APPLE FAMILY CONTROLS · DEVICEACTIVITY · ON-DEVICE · NO ACCOUNT · NO SERVER
          </p>
        </div>
      </section>

      {/* THE PROTOCOL — real screens, shown large */}
      <section className="border-b border-[#1c1c1f] relative min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24">
          <div className="grid sm:grid-cols-12 gap-6 items-end mb-14">
            <h2 className="sm:col-span-8 text-balance text-white font-extrabold uppercase tracking-tight leading-[1] text-3xl sm:text-4xl lg:text-5xl max-w-[16ch]">
              Three taps to a wall you can&apos;t talk your way past.
            </h2>
            <p className="sm:col-span-4 text-gray-500 text-sm leading-relaxed">
              Pick targets. Set a duration. Lock it. Once it&apos;s armed, cancel,
              pause and bypass are gone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
            {[
              {
                src: "/uninstall/assets/setblock-onetime.png",
                n: "01",
                t: "SET THE DURATION",
                d: "Minutes to months. One app or fifty. Apps, categories, whole websites.",
              },
              {
                src: "/uninstall/assets/setblock-activated.png",
                n: "02",
                t: "OR LET IT RUN ITSELF",
                d: "Routines arm on a weekly schedule. The block shows up so you don't have to.",
              },
              {
                src: "/uninstall/assets/hold-to-break.png",
                n: "03",
                t: "THE ONLY WAY OUT",
                d: "Hold 10 seconds, then a 5-minute lockout. Long enough to change your mind.",
              },
            ].map((c) => (
              <article key={c.n} className="shot p-5 sm:p-6 flex flex-col">
                <div className="flex items-baseline justify-between mb-5">
                  <span className="crt mono font-extrabold text-2xl" style={{ color: "var(--green)" }}>
                    {c.n}
                  </span>
                  <span className="card-title text-white font-bold uppercase text-sm tracking-wide text-right max-w-[18ch]">
                    {c.t}
                  </span>
                </div>
                <div className="flex justify-center py-2">
                  <IPhoneFrame src={c.src} alt={c.t} width={210} />
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mt-5 uppercase tracking-wide">
                  {c.d}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RECEIPTS — the proof: every escape, denied */}
      <section className="border-b border-[#1c1c1f] relative min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 className="text-white font-extrabold uppercase tracking-tight text-2xl sm:text-3xl lg:text-4xl max-w-[20ch]">
              Every way out. Tried. Denied.
            </h2>
            <div className="text-right">
              <div className="crt mono font-extrabold text-4xl sm:text-5xl" style={{ color: "var(--green)" }}>
                0.0%
              </div>
              <div className="marker marker-dim mt-1">ESCAPE RATE</div>
            </div>
          </div>

          <div className="receipt border border-[#1c1c1f] p-6 sm:p-8">
            <div className="space-y-2.5">
              {RECEIPT_LINES.map((r, i) => (
                <div
                  key={i}
                  className="recline mono flex items-center gap-3 sm:gap-6 text-xs sm:text-sm uppercase tracking-wide"
                >
                  <span className="text-gray-600 shrink-0">{r[0]}</span>
                  <span className="text-gray-300 w-28 sm:w-40 shrink-0">{r[1]}</span>
                  <span className="text-gray-500 flex-1 truncate hidden sm:block">{r[2]}</span>
                  <span className="deny shrink-0 ml-auto">DENIED</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ticker mt-8 border-y border-[#1c1c1f] py-3">
            <div className="ticker-track marker marker-dim">
              {[...Array(2)].flatMap((_, k) =>
                [
                  "NO CANCEL",
                  "NO PAUSE",
                  "NO BYPASS",
                  "NO SNOOZE",
                  "NO ACCOUNT",
                  "NO SERVER",
                  "NO EXCUSES",
                ].map((w, i) => (
                  <span key={`${k}-${i}`} className="inline-flex items-center gap-10">
                    <span style={{ color: "var(--green)" }}>{w}</span>
                    <span className="text-gray-700">/</span>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="border-b border-[#1c1c1f] relative min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32 text-center">
          <p className="marker mb-9">&gt; END OF PROTOCOL</p>
          <h2 className="text-white font-extrabold uppercase tracking-tight leading-[0.98] text-3xl sm:text-5xl lg:text-[3.4rem]">
            I&apos;ll be your most
            <br />
            uninstalled app.
          </h2>
          <div className="mt-12 flex flex-col items-center gap-5">
            <a
              href="https://apps.apple.com/app/id6761068093"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg cursor"
            >
              [ DOWNLOAD ]
            </a>
            <span className="marker marker-dim">
              iOS 16+ &nbsp;·&nbsp; 14 MB &nbsp;·&nbsp; 3-DAY TRIAL
            </span>
          </div>
        </div>
      </section>

      <AppPageFooter currentSlug="uninstall" supportUrl="https://jstnyoo.com/app/support" />
      <ThemedAppsBottomNav />
    </main>
  );
}
