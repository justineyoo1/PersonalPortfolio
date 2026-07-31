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
  title: "Bord. Finance takes. Every side. You call it.",
  description:
    "Five AI voices debate your real finances in a feed. Plaid-linked, multi-model, never auto-trades. You make the call.",
  openGraph: {
    title: "Bord. Finance takes. Every side. You call it.",
    description:
      "Five AI voices debate your real finances in a feed. Plaid-linked, multi-model, never auto-trades.",
    url: "https://jstnyoo.com/apps/bord",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bord. Finance takes. Every side. You call it.",
    description:
      "Five AI voices debate your real finances in a feed. Plaid-linked, multi-model, never auto-trades.",
  },
};

const BORD_CSS = `
:root { color-scheme: dark; }
.bord-root {
  background-color: #040907;
  color: #fff;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  background-image:
    radial-gradient(1100px 520px at 50% -6%, rgba(93, 229, 181, 0.16), transparent 60%),
    radial-gradient(900px 460px at 90% 30%, rgba(93, 229, 181, 0.05), transparent 60%),
    linear-gradient(#081410, #040907 80%);
  background-attachment: fixed;
}
.bord-root .wordmark-period { color: #5DE5B5; }
.bord-root .hero-glow { position: relative; }
.bord-root .hero-glow::before {
  content: "";
  position: absolute;
  inset: -60% -60% -40% -60%;
  background: radial-gradient(closest-side, rgba(93,229,181,0.4), rgba(93,229,181,0.14) 40%, transparent 70%);
  filter: blur(20px);
  z-index: 0;
  pointer-events: none;
}
.bord-root .hero-glow > * { position: relative; z-index: 1; }
.bord-root .chip {
  border: 1px solid rgba(93, 229, 181, 0.2);
  background: rgba(93, 229, 181, 0.05);
}
.bord-root .num-badge {
  font-feature-settings: "tnum" 1;
  background: linear-gradient(180deg, #8FF0CE, #5DE5B5);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.bord-root .hairline { background: linear-gradient(90deg, transparent, rgba(93,229,181,0.25), transparent); height: 1px; }
.bord-root ::selection { background: #5DE5B5; color: #040907; }
.bord-root { padding-bottom: 96px; }

/* Feed mock */
.bord-root .feed-card {
  border: 1px solid rgba(255,255,255,0.08);
  background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01));
  box-shadow: 0 30px 60px -20px rgba(0,0,0,0.7), 0 10px 30px -10px rgba(93,229,181,0.12);
}
.bord-root .feed-post { border-top: 1px solid rgba(255,255,255,0.06); }
.bord-root .feed-post:first-child { border-top: none; }
.bord-root .voice-dot {
  width: 26px; height: 26px;
  border-radius: 999px;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 800;
  color: #040907;
  flex-shrink: 0;
}
@media (prefers-reduced-motion: reduce) {
  .bord-root *, .bord-root *::before, .bord-root *::after {
    animation-duration: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0s !important;
    scroll-behavior: auto !important;
  }
  .bord-root .hero-glow::before { display: none; }
  .bord-root { background-attachment: scroll; }
}
`;

const FEED_POSTS = [
  {
    voice: "CFO",
    color: "#5DE5B5",
    time: "7:02 AM",
    text: "Dining out is up 31% this month. That is three months in a row. Worth a look before Friday.",
  },
  {
    voice: "MKT",
    color: "#8FB7F0",
    time: "7:04 AM",
    text: "Your cash position has not moved in 60 days. There are at least three ways to read that.",
  },
  {
    voice: "RSK",
    color: "#F0A38F",
    time: "7:05 AM",
    text: "Three months of runway is not the same as safe. Strategist disagrees with me. Ask us both.",
  },
];

export default function BordLandingPage() {
  return (
    <main
      className={`${inter.className} bord-root relative z-10 min-h-screen overflow-x-hidden`}
    >
      <style dangerouslySetInnerHTML={{ __html: BORD_CSS }} />

      {/* Tiny back link, matching the other app pages. */}
      <a
        href="/apps"
        className="fixed top-5 left-5 z-50 text-[11px] tracking-[0.18em] uppercase text-[#9CA3AF] hover:text-[#5DE5B5] transition-colors font-medium"
      >
        ← All apps
      </a>

      {/* HERO */}
      <header id="top" className="min-h-screen flex items-center pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="relative inline-block hero-glow mb-5">
              <img
                src="/img/apps/bord/icon-1024-dark.png"
                alt="Bord app icon"
                width={76}
                height={76}
                className="w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] rounded-2xl"
              />
            </div>

            <h1 className="font-extrabold tracking-tight leading-[0.9] text-[56px] sm:text-[76px] md:text-[84px] lg:text-[96px]">
              Bord<span className="wordmark-period">.</span>
            </h1>

            <p className="mt-3 text-2xl sm:text-3xl md:text-[28px] lg:text-[34px] font-extrabold tracking-tight text-balance">
              Finance takes. Every side. You call it.
            </p>

            <p className="mt-3 text-sm sm:text-base text-[#9CA3AF] font-medium max-w-md mx-auto lg:mx-0 text-balance">
              A board of AI voices debating your actual money in a feed. Real
              bank data in, five perspectives out. The decision stays yours.
            </p>

            <ul className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs sm:text-sm">
              <li className="chip rounded-full px-3 py-1 text-white/90">CFO</li>
              <li className="chip rounded-full px-3 py-1 text-white/90">Strategist</li>
              <li className="chip rounded-full px-3 py-1 text-white/90">Risk</li>
              <li className="chip rounded-full px-3 py-1 text-white/90">Markets</li>
              <li className="chip rounded-full px-3 py-1 text-white/90">You</li>
            </ul>

            <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="https://bordmoney.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#5DE5B5] text-[#040907] px-5 py-3 font-extrabold tracking-tight hover:brightness-110 transition"
              >
                Open the preview
                <span aria-hidden>→</span>
              </a>
              <span className="text-xs text-[#9CA3AF] font-medium">
                Closed beta &nbsp;·&nbsp; By invitation
              </span>
            </div>
          </div>

          {/* RIGHT: feed mock */}
          <div className="flex justify-center md:justify-end">
            <div className="feed-card rounded-3xl w-full max-w-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#9CA3AF] font-bold">
                  Morning brief
                </span>
                <span className="text-[11px] text-[#5DE5B5] font-bold">Live</span>
              </div>
              {FEED_POSTS.map((post) => (
                <div key={post.voice} className="feed-post px-5 py-4 flex gap-3">
                  <div
                    className="voice-dot"
                    style={{ backgroundColor: post.color }}
                    aria-hidden
                  >
                    {post.voice}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-[#9CA3AF] font-semibold">
                      {post.voice === "CFO"
                        ? "The CFO"
                        : post.voice === "MKT"
                          ? "Markets"
                          : "Risk"}{" "}
                      · {post.time}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-white/90">
                      {post.text}
                    </p>
                  </div>
                </div>
              ))}
              <div className="px-5 py-4 border-t border-white/[0.06]">
                <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] text-[#9CA3AF]">
                  Reply to the board…
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="hairline max-w-7xl mx-auto"></div>

      {/* SUPPORTING BAND */}
      <section id="how" className="min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-bold tracking-[0.3em] text-[#5DE5B5] uppercase mb-2">
                How it works
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-balance max-w-2xl">
                You check social feeds daily and your bank app weekly. Bord
                makes those <span className="num-badge">the same app</span>.
              </h2>
            </div>
            <div className="flex items-end gap-6 shrink-0">
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold num-badge leading-none">
                  5
                </div>
                <div className="text-[10px] tracking-widest text-[#9CA3AF] mt-1">
                  AI VOICES
                </div>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold leading-none">
                  5
                </div>
                <div className="text-[10px] tracking-widest text-[#9CA3AF] mt-1">
                  FRONTIER MODELS
                </div>
              </div>
            </div>
          </div>

          <ol className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <li>
              <div className="text-2xl font-extrabold num-badge leading-none">01</div>
              <h3 className="mt-2 text-base sm:text-lg font-extrabold leading-snug">
                Connect your accounts.
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#9CA3AF] font-medium">
                Plaid links your spending, portfolio, and goals. Read-only, and
                encrypted at rest.
              </p>
            </li>
            <li>
              <div className="text-2xl font-extrabold num-badge leading-none">02</div>
              <h3 className="mt-2 text-base sm:text-lg font-extrabold leading-snug">
                The board starts posting.
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#9CA3AF] font-medium">
                Balance shifts, spending anomalies, and portfolio moves trigger
                the feed. Each voice runs on a different frontier model, and
                they disagree.
              </p>
            </li>
            <li>
              <div className="text-2xl font-extrabold num-badge leading-none">03</div>
              <h3 className="mt-2 text-base sm:text-lg font-extrabold leading-snug">
                You call it.
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#9CA3AF] font-medium">
                Commentary, not directives. Bord never auto-trades. DM any
                voice to push back.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <AppPageFooter currentSlug="bord" />
      <ThemedAppsBottomNav />
    </main>
  );
}
