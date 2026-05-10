import { Metadata } from "next";
import { ArrowLeft, Github, Linkedin } from "lucide-react";
import { ThemeToggle } from "@/components/legal/ThemeToggle";

// Force static generation: no dynamic data, and we want App Store review
// crawlers to receive the full page body on first byte (not a spinner).
export const dynamic = "force-static";

const LAST_UPDATED = "May 10, 2026";
const SUPPORT_EMAIL = "justinyoou@gmail.com";

export const metadata: Metadata = {
  title: "Support — Justin Yoo",
  description: "Support and FAQ for Eunho, Brik, Uninstall, and Shwup.",
  openGraph: {
    title: "Support — Justin Yoo",
    description: "Support and FAQ for Eunho, Brik, Uninstall, and Shwup.",
    url: "https://jstnyoo.com/app/support",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Support — Justin Yoo",
    description: "Support and FAQ for Eunho, Brik, Uninstall, and Shwup.",
  },
};

export default function SupportPage() {
  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center px-4 pt-5 pb-20 bg-[#F5F5F7] dark:bg-transparent">
      <article className="w-full max-w-2xl">
        {/* Header — dark variant (terminal-style, mirrors /app/privacy) */}
        <header className="hidden dark:block mb-6 text-center">
          <div aria-hidden="true" className="font-mono text-sm mb-1">
            <span className="text-[#60A5FA]">{">"}</span>
            <span className="text-gray-200 ml-2">cat support.md</span>
            <span className="inline-block w-2 h-4 ml-1 align-middle bg-gray-300 animate-pulse" />
          </div>
          {/* Real semantic h1 for screen readers; the terminal command above is
              decorative and aria-hidden so the reader reaches this. */}
          <h1 className="sr-only">Support</h1>
          <p className="font-mono text-xs text-gray-500">
            Last updated: {LAST_UPDATED}
          </p>
        </header>
        {/* Header — light variant (Apple-style) */}
        <header className="dark:hidden mb-6">
          <h1 className="text-[28px] font-bold text-[#1D1D1F] tracking-tight">
            Support
          </h1>
          <p className="text-[13px] text-[#86868B] mt-1">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        {/* Content card */}
        <div className="rounded-2xl p-5 sm:p-8 bg-white border border-[#E5E5EA]/50 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:bg-[#0B0F14]/90 dark:border-gray-700/90 dark:shadow-none">
          {/* Intro */}
          <p className="text-sm leading-relaxed mb-3 text-[#515154] dark:font-mono dark:text-gray-300">
            Need help with one of our apps? You&apos;re in the right place. Email
            us at the address below — we typically respond within 1–2 business
            days.
          </p>

          {/* Apps we support */}
          <SectionTitle>Apps we support</SectionTitle>
          <ul className="text-sm leading-relaxed mb-3 space-y-2 text-[#515154] dark:font-mono dark:text-gray-300">
            <li>
              <strong className="text-[#1D1D1F] dark:text-gray-100">
                Uninstall
              </strong>{" "}
              — self-control & focus app
            </li>
            <li>
              <strong className="text-[#1D1D1F] dark:text-gray-100">
                Brik
              </strong>{" "}
              — morning accountability alarm
            </li>
            <li>
              <strong className="text-[#1D1D1F] dark:text-gray-100">
                Eunho
              </strong>{" "}
              — single-habit tracker
            </li>
            <li>
              <strong className="text-[#1D1D1F] dark:text-gray-100">
                Shwup
              </strong>{" "}
              — gym logging
            </li>
          </ul>

          {/* Contact (prominent) */}
          <SectionTitle>Contact</SectionTitle>
          <div className="rounded-xl p-4 mb-3 bg-[#F2F2F7] border border-[#E5E5EA] dark:bg-gray-800/50 dark:border-gray-700">
            <p className="text-sm text-[#515154] dark:font-mono dark:text-gray-300">
              <span className="text-[#1D1D1F] font-medium dark:text-gray-100 dark:font-normal">
                Email:
              </span>{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[#007AFF] font-medium hover:underline dark:text-[#60A5FA] dark:font-normal dark:hover:text-[#93C5FD]"
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
            <p className="text-xs text-[#86868B] mt-1 dark:font-mono dark:text-gray-500">
              Typical response time: 1–2 business days.
            </p>
          </div>

          {/* FAQ */}
          <SectionTitle>Frequently asked questions</SectionTitle>
          <div className="space-y-2 mb-3">
            <FAQ question="How do I cancel a subscription?">
              Go to Settings → tap your name at the top → Subscriptions →
              select the app → Cancel Subscription. Cancellation takes effect
              at the end of the current billing period.
            </FAQ>
            <FAQ question="How do I restore a previous purchase on a new device?">
              Open the app, go to the paywall (Settings → Premium, or any
              locked feature), and tap &quot;Restore Purchases.&quot; Make sure
              you&apos;re signed into the same Apple ID you originally
              subscribed with.
            </FAQ>
            <FAQ question="How do I request a refund?">
              Refunds for App Store purchases are handled by Apple, not by us.
              Visit{" "}
              <a
                href="https://reportaproblem.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007AFF] hover:underline dark:text-[#60A5FA]"
              >
                reportaproblem.apple.com
              </a>
              , sign in with your Apple ID, and request a refund directly.
              Apple usually responds within 48 hours.
            </FAQ>
          </div>

          {/* Privacy & Terms (in-card) */}
          <SectionTitle>Privacy & Terms</SectionTitle>
          <ul className="text-sm space-y-1.5 text-[#515154] dark:font-mono dark:text-gray-300">
            <li>
              <a
                href="/app/privacy"
                className="text-[#007AFF] hover:underline dark:text-[#60A5FA] dark:hover:text-[#93C5FD]"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/app/terms"
                className="text-[#007AFF] hover:underline dark:text-[#60A5FA] dark:hover:text-[#93C5FD]"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Footer link row — mirrors /app/privacy and /app/terms */}
        <div className="w-full max-w-2xl mt-8 flex justify-center gap-4">
          <a
            href="/app/privacy"
            className="text-xs text-[#86868B] hover:text-[#007AFF] transition-colors dark:font-mono dark:text-gray-500 dark:hover:text-[#60A5FA]"
          >
            Privacy Policy
          </a>
          <span className="text-xs text-[#D1D1D6] dark:text-gray-700">|</span>
          <a
            href="/app/terms"
            className="text-xs text-[#86868B] hover:text-[#007AFF] transition-colors dark:font-mono dark:text-gray-500 dark:hover:text-[#60A5FA]"
          >
            Terms of Service
          </a>
        </div>
      </article>

      {/* Bottom navbar — same shape as legal pages. Static links are server-
          rendered; only ThemeToggle is a client island. */}
      <nav
        aria-label="Site navigation"
        className="fixed bottom-3 z-50 flex items-center gap-2 px-3 py-2 rounded-[20px] bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.08)] dark:bg-gray-950 dark:border-gray-700 dark:shadow-xl"
      >
        <a
          href="/"
          aria-label="Home"
          className="rounded-xl p-1.5 transition-colors hover:bg-[#F2F2F7] dark:hover:bg-transparent dark:border dark:border-gray-700 dark:bg-gray-900"
        >
          <ArrowLeft className="w-6 h-6 text-[#1D1D1F] dark:text-white" />
        </a>
        <div className="border-l h-5 border-[#E5E5EA] dark:border-gray-700" />
        <a
          href="https://github.com/justineyoo1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="rounded-xl p-1.5 transition-colors hover:bg-[#F2F2F7] dark:hover:bg-transparent dark:border dark:border-gray-700 dark:bg-gray-900"
        >
          <Github className="w-6 h-6 text-[#1D1D1F] dark:text-white" />
        </a>
        <a
          href="https://www.linkedin.com/in/justineyoo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="rounded-xl p-1.5 transition-colors hover:bg-[#F2F2F7] dark:hover:bg-transparent dark:border dark:border-gray-700 dark:bg-gray-900"
        >
          <Linkedin className="w-6 h-6 text-[#1D1D1F] dark:text-white" />
        </a>
        <div className="border-l h-5 border-[#E5E5EA] dark:border-gray-700" />
        <ThemeToggle />
      </nav>
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  // Single h2 — light style by default, dark mode adds a `## ` prefix and
  // mono styling via `before:content`. Keeps a single heading in the a11y tree.
  return (
    <h2
      className={[
        "text-[17px] font-semibold text-[#1D1D1F] mt-6 mb-2",
        "dark:font-mono dark:font-bold dark:text-sm dark:text-[#60A5FA]",
        "dark:before:content-['##_']",
      ].join(" ")}
    >
      {children}
    </h2>
  );
}

function FAQ({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <details
      className={[
        "group rounded-xl border bg-white p-4 transition-colors",
        "border-[#E5E5EA]",
        "dark:bg-[#0B0F14]/50 dark:border-gray-700",
      ].join(" ")}
    >
      <summary
        className={[
          "cursor-pointer list-none flex items-start justify-between gap-3",
          "text-sm font-medium text-[#1D1D1F]",
          "dark:font-mono dark:font-normal dark:text-gray-100",
          "[&::-webkit-details-marker]:hidden",
        ].join(" ")}
      >
        <span>{question}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-[#86868B] transition-transform duration-200 group-open:rotate-180 dark:text-gray-500"
        >
          ▾
        </span>
      </summary>
      <div className="text-sm leading-relaxed mt-3 text-[#515154] dark:font-mono dark:text-gray-300">
        {children}
      </div>
    </details>
  );
}
