import { Metadata } from "next";
import {
  ArrowLeft,
  ChevronDown,
  FileText,
  Github,
  HelpCircle,
  Linkedin,
  Mail,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/legal/ThemeToggle";

// Force static generation: no dynamic data, and we want App Store review
// crawlers to receive the full page body on first byte (not a spinner).
export const dynamic = "force-static";

const LAST_UPDATED = "May 10, 2026";
const SUPPORT_EMAIL = "justinyoou@gmail.com";

const SUPPORTED_APPS: Array<{
  name: string;
  tagline: string;
  icon: string;
  iconBg: "light" | "dark";
}> = [
  {
    name: "Uninstall",
    tagline: "self-control & focus app",
    icon: "/img/apps/uninstall.png",
    iconBg: "dark",
  },
  {
    name: "Brik",
    tagline: "morning accountability alarm",
    icon: "/img/apps/brik.png",
    iconBg: "dark",
  },
  {
    name: "Eunho",
    tagline: "single-habit tracker",
    icon: "/img/apps/eunho.png",
    iconBg: "dark",
  },
  {
    name: "Shwup",
    tagline: "gym logging",
    icon: "/img/Logos/shwup_app_logo.png",
    iconBg: "light",
  },
];

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
    <main className="relative z-10 min-h-screen flex flex-col items-center px-4 pt-5 pb-24 bg-[#F5F5F7] dark:bg-transparent">
      <article className="w-full max-w-2xl">
        {/* Header — dark variant (terminal-style, mirrors /app/privacy) */}
        <header className="hidden dark:block mb-6 text-center opacity-0 animate-[fade-in-up_0.4s_ease-out_both]">
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
        <header className="dark:hidden mb-6 opacity-0 animate-[fade-in-up_0.4s_ease-out_both]">
          <h1 className="text-[32px] font-bold text-[#1D1D1F] tracking-tight leading-tight">
            Support
          </h1>
          <p className="text-[15px] text-[#515154] mt-1">
            Get help with our iOS apps — we&apos;re here to help.
          </p>
          <p className="text-[12px] text-[#86868B] mt-2">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        {/* Content card */}
        <div
          className={[
            "rounded-2xl p-5 sm:p-7 opacity-0 animate-[fade-in-up_0.4s_ease-out_both]",
            "bg-white border border-[#E5E5EA]/60 shadow-[0_2px_16px_rgba(0,0,0,0.04)]",
            "dark:bg-[#0B0F14]/90 dark:border-gray-700/90 dark:shadow-none",
          ].join(" ")}
          style={{ animationDelay: "80ms" }}
        >
          {/* Intro */}
          <p className="text-[15px] leading-relaxed text-[#1D1D1F] dark:text-sm dark:font-mono dark:text-gray-300">
            Need help with one of our apps? You&apos;re in the right place.
            Email us at the address below — we typically respond within 1–2
            business days.
          </p>

          {/* Apps we support */}
          <SectionTitle icon={Smartphone}>Apps we support</SectionTitle>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2">
            {SUPPORTED_APPS.map((app) => (
              <li
                key={app.name}
                className={[
                  "flex items-center gap-3 p-3 rounded-xl",
                  "bg-[#F5F5F7] border border-[#E5E5EA]/60",
                  "dark:bg-[#0B0F14]/40 dark:border-gray-700/70",
                ].join(" ")}
              >
                <img
                  src={app.icon}
                  alt=""
                  width={40}
                  height={40}
                  className={[
                    "w-10 h-10 rounded-xl shrink-0 object-cover",
                    app.iconBg === "light"
                      ? "bg-white p-0.5 dark:bg-white"
                      : "bg-gray-900",
                  ].join(" ")}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-[#1D1D1F] dark:font-mono dark:font-bold dark:text-gray-100 truncate">
                    {app.name}
                  </div>
                  <div className="text-[12px] text-[#86868B] dark:font-mono dark:text-gray-500 truncate">
                    {app.tagline}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Contact (prominent CTA card) */}
          <SectionTitle icon={Mail}>Contact</SectionTitle>
          <div
            className={[
              "rounded-2xl p-5 mb-2 relative overflow-hidden",
              // Light: Apple-blue gradient panel
              "bg-gradient-to-br from-[#007AFF] to-[#0A84FF] text-white shadow-[0_8px_24px_rgba(0,122,255,0.25)]",
              // Dark: terminal-aesthetic with blue accent border
              "dark:bg-gradient-to-br dark:from-[#0B0F14] dark:to-[#0B0F14] dark:text-gray-100 dark:shadow-none dark:border dark:border-[#60A5FA]/30",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <div
                className={[
                  "shrink-0 w-11 h-11 rounded-xl flex items-center justify-center",
                  "bg-white/20",
                  "dark:bg-[#60A5FA]/15 dark:border dark:border-[#60A5FA]/30",
                ].join(" ")}
              >
                <Mail
                  className="w-5 h-5 text-white dark:text-[#60A5FA]"
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0">
                <div className="text-[15px] font-semibold dark:font-mono dark:font-bold dark:text-gray-100">
                  Email support
                </div>
                <div className="text-[12px] text-white/85 dark:font-mono dark:text-gray-500">
                  Typical response: 1–2 business days
                </div>
              </div>
            </div>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className={[
                "mt-4 flex items-center justify-center gap-2 w-full rounded-xl py-3 text-[14px] font-semibold transition-all",
                "bg-white text-[#007AFF] hover:bg-white/95 shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
                "dark:bg-[#60A5FA]/15 dark:text-[#60A5FA] dark:font-mono dark:font-normal dark:border dark:border-[#60A5FA]/40 dark:hover:bg-[#60A5FA]/25 dark:shadow-none",
              ].join(" ")}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>{SUPPORT_EMAIL}</span>
            </a>
          </div>

          {/* FAQ */}
          <SectionTitle icon={HelpCircle}>
            Frequently asked questions
          </SectionTitle>
          <div className="space-y-2 mb-2">
            <FAQ question="How do I cancel a subscription?">
              Go to{" "}
              <strong className="font-semibold text-[#1D1D1F] dark:text-gray-100">
                Settings
              </strong>{" "}
              → tap your name at the top →{" "}
              <strong className="font-semibold text-[#1D1D1F] dark:text-gray-100">
                Subscriptions
              </strong>{" "}
              → select the app → tap{" "}
              <strong className="font-semibold text-[#1D1D1F] dark:text-gray-100">
                Cancel Subscription
              </strong>
              . Cancellation takes effect at the end of the current billing
              period.
            </FAQ>
            <FAQ question="How do I restore a previous purchase on a new device?">
              Open the app, go to the paywall (Settings → Premium, or any
              locked feature), and tap{" "}
              <strong className="font-semibold text-[#1D1D1F] dark:text-gray-100">
                Restore Purchases
              </strong>
              . Make sure you&apos;re signed into the same Apple ID you
              originally subscribed with.
            </FAQ>
            <FAQ question="How do I request a refund?">
              Refunds for App Store purchases are handled by Apple, not by us.
              Visit{" "}
              <a
                href="https://reportaproblem.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007AFF] hover:underline font-medium dark:text-[#60A5FA] dark:hover:text-[#93C5FD] dark:font-normal"
              >
                reportaproblem.apple.com
              </a>
              , sign in with your Apple ID, and request a refund directly.
              Apple usually responds within 48 hours.
            </FAQ>
          </div>

          {/* Privacy & Terms (in-card) */}
          <SectionTitle icon={ShieldCheck}>Privacy & Terms</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <PolicyLink
              href="/app/privacy"
              icon={ShieldCheck}
              label="Privacy Policy"
            />
            <PolicyLink
              href="/app/terms"
              icon={FileText}
              label="Terms of Service"
            />
          </div>
        </div>

        {/* Footer link row — mirrors /app/privacy and /app/terms */}
        <div
          className="w-full max-w-2xl mt-8 flex justify-center gap-4 opacity-0 animate-[fade-in-up_0.4s_ease-out_both]"
          style={{ animationDelay: "200ms" }}
        >
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

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  // Single h2 — light style by default, dark mode prepends a `## ` prefix
  // (aria-hidden so screen readers don't announce "hash hash"). Icons (light
  // mode) anchor each section visually.
  return (
    <h2
      className={[
        "flex items-baseline gap-2 mt-7 mb-3",
        "text-[18px] font-semibold text-[#1D1D1F]",
        "dark:font-mono dark:font-bold dark:text-sm dark:text-[#60A5FA] dark:gap-0",
      ].join(" ")}
    >
      {Icon && (
        <Icon
          className="w-[18px] h-[18px] self-center text-[#007AFF] dark:hidden"
          aria-hidden={true}
        />
      )}
      <span aria-hidden="true" className="hidden dark:inline whitespace-pre">
        {"## "}
      </span>
      <span>{children}</span>
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
        "border-[#E5E5EA] hover:border-[#007AFF]/30",
        "dark:bg-[#0B0F14]/50 dark:border-gray-700 dark:hover:border-[#60A5FA]/40",
      ].join(" ")}
    >
      <summary
        className={[
          "cursor-pointer list-none flex items-center justify-between gap-3",
          "text-[14px] font-semibold text-[#1D1D1F]",
          "dark:font-mono dark:font-normal dark:text-gray-100",
          "[&::-webkit-details-marker]:hidden",
        ].join(" ")}
      >
        <span className="flex items-center gap-2.5 min-w-0">
          <HelpCircle
            className="w-4 h-4 shrink-0 text-[#007AFF] dark:text-[#60A5FA]"
            aria-hidden={true}
          />
          <span>{question}</span>
        </span>
        <ChevronDown
          className="w-4 h-4 shrink-0 text-[#86868B] transition-transform duration-200 group-open:rotate-180 dark:text-gray-500"
          aria-hidden={true}
        />
      </summary>
      <div className="text-[14px] leading-relaxed mt-3 ml-6 text-[#515154] dark:font-mono dark:text-sm dark:text-gray-300 dark:ml-0">
        {children}
      </div>
    </details>
  );
}

function PolicyLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <a
      href={href}
      className={[
        "flex items-center gap-3 p-3 rounded-xl border transition-colors group",
        "bg-white border-[#E5E5EA] hover:border-[#007AFF]/40 hover:bg-[#F5F5F7]",
        "dark:bg-[#0B0F14]/50 dark:border-gray-700 dark:hover:border-[#60A5FA]/40",
      ].join(" ")}
    >
      <div className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-[#007AFF]/10 dark:bg-[#60A5FA]/10">
        <Icon
          className="w-4 h-4 text-[#007AFF] dark:text-[#60A5FA]"
          aria-hidden={true}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-medium text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors dark:font-mono dark:text-gray-100 dark:group-hover:text-[#60A5FA]">
          {label}
        </div>
      </div>
    </a>
  );
}
