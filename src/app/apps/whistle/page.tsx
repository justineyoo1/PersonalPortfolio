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
  title: "Whistle. Run your leagues by talking to an agent.",
  description:
    "AI-native referee assigning and payments for youth soccer. The agent drafts the weekend, the assignor approves, and officials get paid the next day via Stripe.",
  openGraph: {
    title: "Whistle. Run your leagues by talking to an agent.",
    description:
      "The agent drafts the weekend, the assignor approves, and officials get paid the next day via Stripe.",
    url: "https://jstnyoo.com/apps/whistle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whistle. Run your leagues by talking to an agent.",
    description:
      "The agent drafts the weekend, the assignor approves, and officials get paid the next day via Stripe.",
  },
};

const WHISTLE_CSS = `
:root { color-scheme: dark; }
.whistle-root {
  background-color: #060906;
  color: #fff;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  background-image:
    radial-gradient(1100px 520px at 50% -6%, rgba(90, 140, 109, 0.22), transparent 60%),
    radial-gradient(900px 460px at 90% 30%, rgba(90, 140, 109, 0.06), transparent 60%),
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'><g fill='none' stroke='%235A8C6D' stroke-opacity='0.05' stroke-width='1'><path d='M0 120H240'/><circle cx='120' cy='120' r='40'/></g></svg>"),
    linear-gradient(#0B130D, #060906 80%);
  background-attachment: fixed;
}
.whistle-root .wordmark-period { color: #7DBE96; }
.whistle-root .hero-glow { position: relative; }
.whistle-root .hero-glow::before {
  content: "";
  position: absolute;
  inset: -60% -60% -40% -60%;
  background: radial-gradient(closest-side, rgba(125,190,150,0.4), rgba(90,140,109,0.16) 40%, transparent 70%);
  filter: blur(20px);
  z-index: 0;
  pointer-events: none;
}
.whistle-root .hero-glow > * { position: relative; z-index: 1; }
.whistle-root .chip {
  border: 1px solid rgba(125, 190, 150, 0.22);
  background: rgba(125, 190, 150, 0.05);
}
.whistle-root .num-badge {
  font-feature-settings: "tnum" 1;
  background: linear-gradient(180deg, #A8D8BB, #7DBE96);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.whistle-root .hairline { background: linear-gradient(90deg, transparent, rgba(125,190,150,0.25), transparent); height: 1px; }
.whistle-root ::selection { background: #7DBE96; color: #060906; }
.whistle-root { padding-bottom: 96px; }

/* Agent console mock */
.whistle-root .console-card {
  border: 1px solid rgba(255,255,255,0.08);
  background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01));
  box-shadow: 0 30px 60px -20px rgba(0,0,0,0.7), 0 10px 30px -10px rgba(125,190,150,0.12);
  font-feature-settings: "tnum" 1;
}
.whistle-root .console-line { border-top: 1px solid rgba(255,255,255,0.06); }
.whistle-root .approve-pill {
  background: #7DBE96;
  color: #060906;
  font-weight: 800;
}
.whistle-root .ghost-pill {
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.85);
}
@media (prefers-reduced-motion: reduce) {
  .whistle-root *, .whistle-root *::before, .whistle-root *::after {
    animation-duration: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0s !important;
    scroll-behavior: auto !important;
  }
  .whistle-root .hero-glow::before { display: none; }
  .whistle-root { background-attachment: scroll; }
}
`;

export default function WhistleLandingPage() {
  return (
    <main
      className={`${inter.className} whistle-root relative z-10 min-h-screen overflow-x-hidden`}
    >
      <style dangerouslySetInnerHTML={{ __html: WHISTLE_CSS }} />

      {/* Tiny back link, matching the other app pages. */}
      <a
        href="/apps"
        className="fixed top-5 left-5 z-50 text-[11px] tracking-[0.18em] uppercase text-[#9CA3AF] hover:text-[#7DBE96] transition-colors font-medium"
      >
        ← All apps
      </a>

      {/* HERO */}
      <header id="top" className="min-h-screen flex items-center pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="relative inline-block hero-glow mb-5">
              <img
                src="/img/apps/whistle/icon-1024-dark.png"
                alt="Whistle app icon"
                width={76}
                height={76}
                className="w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] rounded-2xl"
              />
            </div>

            <h1 className="font-extrabold tracking-tight leading-[0.9] text-[56px] sm:text-[76px] md:text-[84px] lg:text-[96px]">
              Whistle<span className="wordmark-period">.</span>
            </h1>

            <p className="mt-3 text-2xl sm:text-3xl md:text-[28px] lg:text-[34px] font-extrabold tracking-tight text-balance">
              Run your leagues by talking to an agent.
            </p>

            <p className="mt-3 text-sm sm:text-base text-[#9CA3AF] font-medium max-w-md mx-auto lg:mx-0 text-balance">
              The agent drafts officiating crews from certifications,
              availability, travel, and fairness. Nothing sends without your
              approval. Officials see the fee up front and get paid the next
              day.
            </p>

            <ul className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs sm:text-sm">
              <li className="chip rounded-full px-3 py-1 text-white/90">Assigning agent</li>
              <li className="chip rounded-full px-3 py-1 text-white/90">Approval inbox</li>
              <li className="chip rounded-full px-3 py-1 text-white/90">Next-day payouts</li>
              <li className="chip rounded-full px-3 py-1 text-white/90">Officials iOS app</li>
            </ul>

            <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#7DBE96] text-[#060906] px-5 py-3 font-extrabold tracking-tight hover:brightness-110 transition"
              >
                How it works
                <span aria-hidden>↓</span>
              </a>
              <span className="text-xs text-[#9CA3AF] font-medium">
                Pre-launch &nbsp;·&nbsp; Building toward launch
              </span>
            </div>
          </div>

          {/* RIGHT: agent console mock */}
          <div className="flex justify-center md:justify-end">
            <div className="console-card rounded-3xl w-full max-w-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#9CA3AF] font-bold">
                  Assigning agent
                </span>
                <span className="text-[11px] text-[#7DBE96] font-bold">
                  12 games unfilled
                </span>
              </div>

              <div className="px-5 py-4">
                <p className="text-[13px] text-white/90 font-semibold">
                  <span className="text-[#7DBE96]">&gt;</span> fill
                  Saturday&apos;s games
                </p>
              </div>

              <div className="console-line px-5 py-4">
                <p className="text-[12px] text-[#9CA3AF] font-semibold">
                  Drafted 12 crews · ranked by certification, travel, and
                  fairness
                </p>
                <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <p className="text-[12px] font-bold text-white/90">
                    Marcus R. · Center · Field 3, 9:00 AM
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#9CA3AF]">
                    Grade 7 · 4.2 mi away · 2 games this month
                  </p>
                </div>
                <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <p className="text-[12px] font-bold text-white/90">
                    Dana K. · AR1 · Field 3, 9:00 AM
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#9CA3AF]">
                    Grade 8 · 1.8 mi away · open all morning
                  </p>
                </div>
              </div>

              <div className="console-line px-5 py-4 flex items-center gap-2">
                <span className="approve-pill rounded-full px-4 py-1.5 text-[12px]">
                  Approve all
                </span>
                <span className="ghost-pill rounded-full px-4 py-1.5 text-[12px]">
                  Review one by one
                </span>
              </div>

              <div className="console-line px-5 py-3">
                <p className="text-[11px] text-[#9CA3AF]">
                  Paid the next day via Stripe Connect
                </p>
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
              <p className="text-[11px] font-bold tracking-[0.3em] text-[#7DBE96] uppercase mb-2">
                How it works
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-balance max-w-2xl">
                Assignors spend hours matching referees to games, then chase
                checks for weeks. Whistle makes it{" "}
                <span className="num-badge">one approval</span>.
              </h2>
            </div>
            <div className="flex items-end gap-6 shrink-0">
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold num-badge leading-none">
                  9
                </div>
                <div className="text-[10px] tracking-widest text-[#9CA3AF] mt-1">
                  AGENT TOOLS
                </div>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold leading-none">
                  0
                </div>
                <div className="text-[10px] tracking-widest text-[#9CA3AF] mt-1">
                  UNAPPROVED SENDS
                </div>
              </div>
            </div>
          </div>

          <ol className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <li>
              <div className="text-2xl font-extrabold num-badge leading-none">01</div>
              <h3 className="mt-2 text-base sm:text-lg font-extrabold leading-snug">
                Tell the agent what you need.
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#9CA3AF] font-medium">
                Plain language in, ranked crews out. It reads fixtures,
                certifications, availability windows, travel time, and who has
                been given the most games.
              </p>
            </li>
            <li>
              <div className="text-2xl font-extrabold num-badge leading-none">02</div>
              <h3 className="mt-2 text-base sm:text-lg font-extrabold leading-snug">
                Approve at your granularity.
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#9CA3AF] font-medium">
                Nothing fires on its own. Every invite waits in an approval
                inbox, one tap per game or per batch, with the agent&apos;s
                reasoning attached.
              </p>
            </li>
            <li>
              <div className="text-2xl font-extrabold num-badge leading-none">03</div>
              <h3 className="mt-2 text-base sm:text-lg font-extrabold leading-snug">
                Officials get paid the next day.
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#9CA3AF] font-medium">
                Accept on the iOS app with the fee shown up front. When the
                game completes, Stripe Connect pays out and earnings show up
                the next morning.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <AppPageFooter currentSlug="whistle" />
      <ThemedAppsBottomNav />
    </main>
  );
}
