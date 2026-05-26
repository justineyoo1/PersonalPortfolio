"use client";

import { useState, useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { apps, type AppInfo } from "@/data/apps";
import { cn } from "@/lib/cn";
import { AppsBottomNav } from "./AppsBottomNav";
import { AppStoreLink } from "./AppStoreBadge";

const WAITLIST_STORAGE_KEY = "waitlist-joined";

const readJoinedApps = (): string[] => {
  try {
    const stored = localStorage.getItem(WAITLIST_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
};

const writeJoinedApps = (slugs: string[]) => {
  try {
    localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // ignore quota / unavailable storage
  }
};

const Header: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <header className="mb-8 opacity-0 animate-[fade-in-up_0.4s_ease-out_both]">
    <h1
      className={cn(
        "text-2xl sm:text-3xl font-semibold tracking-tight",
        isDark ? "text-white" : "text-[#1D1D1F]",
      )}
    >
      Apps by Justin Yoo
    </h1>
    <p
      className={cn(
        "mt-2 text-sm sm:text-base",
        isDark ? "text-gray-400" : "text-[#515154]",
      )}
    >
      Three apps about friction beating willpower. One that ships at the morning alarm,
      one at the daily ritual, one in the moment you reach for the wrong app.
    </p>
  </header>
);

const StatusBadge: React.FC<{ status: AppInfo["status"]; isDark: boolean }> = ({
  status,
  isDark,
}) => {
  if (status === "available") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium",
          isDark
            ? "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20"
            : "bg-[#34C759]/10 text-[#0E8B3A]",
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        Live on App Store
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium",
        isDark
          ? "bg-amber-400/10 text-amber-300 border border-amber-400/20"
          : "bg-amber-500/10 text-amber-700",
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      Coming soon
    </span>
  );
};

const AppIcon: React.FC<{ app: AppInfo; size?: number }> = ({ app, size = 56 }) => {
  if (!app.icon) {
    return (
      <div
        className="rounded-2xl shrink-0 flex items-center justify-center font-bold"
        style={{
          width: size,
          height: size,
          backgroundColor: `${app.accentColor}20`,
          color: app.accentColor,
        }}
      >
        {app.name[0]}
      </div>
    );
  }
  return (
    <img
      src={app.icon}
      alt={`${app.name} app icon`}
      width={size}
      height={size}
      className="rounded-2xl shrink-0 object-cover shadow-md"
      style={{ width: size, height: size }}
    />
  );
};

const LiveAppCard: React.FC<{ app: AppInfo; index: number; isDark: boolean }> = ({
  app,
  index,
  isDark,
}) => (
  <article
    className={cn(
      "rounded-2xl p-5 sm:p-6 flex flex-col gap-4 opacity-0 animate-[fade-in-up_0.4s_ease-out_both] transition-all duration-200",
      isDark
        ? "bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
        : "bg-white border border-[#E5E5EA] hover:border-transparent apple-shadow apple-card-lift",
    )}
    style={{ animationDelay: `${index * 80 + 100}ms` }}
  >
    <div className="flex items-start gap-4">
      <AppIcon app={app} size={56} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h2
            className={cn(
              "text-lg font-semibold tracking-tight",
              isDark ? "text-white" : "text-[#1D1D1F]",
            )}
          >
            {app.name}
          </h2>
          <StatusBadge status={app.status} isDark={isDark} />
        </div>
        <p
          className={cn(
            "text-sm",
            isDark ? "text-gray-300" : "text-[#1D1D1F]",
          )}
        >
          {app.tagline}
        </p>
      </div>
    </div>

    <p
      className={cn(
        "text-sm leading-relaxed",
        isDark ? "text-gray-400" : "text-[#515154]",
      )}
    >
      {app.description}
    </p>

    <div className="flex items-center justify-between gap-3 pt-1 mt-auto">
      <a
        href={`/apps/${app.slug}`}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium transition-colors",
          isDark
            ? "text-white hover:text-gray-300"
            : "text-[#007AFF] hover:text-[#0066D6]",
        )}
        style={{ color: isDark ? app.accentColor : undefined }}
      >
        View
        <span aria-hidden>→</span>
      </a>
      {app.appStoreId && (
        <AppStoreLink
          appStoreId={app.appStoreId}
          appName={app.name}
          slug={app.slug}
          variant={isDark ? "white" : "black"}
          className="h-10 w-auto"
        />
      )}
    </div>
  </article>
);

type ShwupCardProps = {
  app: AppInfo;
  isDark: boolean;
  isJoined: boolean;
  onJoin: () => void;
  email: string;
  setEmail: (v: string) => void;
  submitting: boolean;
  error: string;
};

const ShwupCard: React.FC<ShwupCardProps> = ({
  app,
  isDark,
  isJoined,
  onJoin,
  email,
  setEmail,
  submitting,
  error,
}) => (
  <article
    className={cn(
      "rounded-2xl p-5 sm:p-6 flex flex-col gap-4 opacity-0 animate-[fade-in-up_0.4s_ease-out_both] transition-all duration-200",
      isDark
        ? "bg-white/[0.03] border border-white/10"
        : "bg-white border border-[#E5E5EA] apple-shadow",
    )}
    style={{ animationDelay: "340ms" }}
  >
    <div className="flex items-start gap-4">
      <AppIcon app={app} size={56} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h2
            className={cn(
              "text-lg font-semibold tracking-tight",
              isDark ? "text-white" : "text-[#1D1D1F]",
            )}
          >
            {app.name}
          </h2>
          <StatusBadge status={app.status} isDark={isDark} />
        </div>
        <p
          className={cn(
            "text-sm",
            isDark ? "text-gray-300" : "text-[#1D1D1F]",
          )}
        >
          {app.tagline}
        </p>
      </div>
    </div>

    <p
      className={cn(
        "text-sm leading-relaxed",
        isDark ? "text-gray-400" : "text-[#515154]",
      )}
    >
      {app.description}
    </p>

    {isJoined ? (
      <div
        className={cn(
          "rounded-xl px-4 py-3 text-sm font-medium text-center",
          isDark
            ? "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20"
            : "bg-[#34C759]/10 text-[#0E8B3A]",
        )}
      >
        You are on the waitlist.
      </div>
    ) : (
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onJoin()}
          className={cn(
            "flex-1 min-w-0 px-4 py-2.5 text-sm rounded-xl outline-none transition-all",
            isDark
              ? "bg-[#0B0F14] border border-gray-700 text-gray-200 placeholder-gray-500 focus:border-emerald-400/50"
              : "bg-white border border-[#E5E5EA] text-[#1D1D1F] placeholder-[#86868B] focus:border-[#007AFF]",
          )}
        />
        <button
          onClick={onJoin}
          disabled={submitting || !email}
          className={cn(
            "px-5 py-2.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap disabled:opacity-50",
            isDark
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-[#1D1D1F] text-white hover:bg-black",
          )}
        >
          {submitting ? "Joining..." : "Join waitlist"}
        </button>
      </div>
    )}

    {error && (
      <p
        className={cn(
          "text-xs",
          isDark ? "text-red-400" : "text-[#FF3B30] font-medium",
        )}
      >
        {error}
      </p>
    )}
  </article>
);

const LegalFooter: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const linkClasses = cn(
    "text-xs transition-colors",
    isDark
      ? "text-gray-500 hover:text-gray-300"
      : "text-[#86868B] hover:text-[#007AFF]",
  );
  const sepClasses = cn(
    "text-xs",
    isDark ? "text-gray-700" : "text-[#D1D1D6]",
  );

  return (
    <div className="w-full max-w-3xl mt-12 flex justify-center gap-4">
      <a href="/" className={linkClasses}>
        Home
      </a>
      <span className={sepClasses}>|</span>
      <a href="/app/privacy" className={linkClasses}>
        Privacy
      </a>
      <span className={sepClasses}>|</span>
      <a href="/app/terms" className={linkClasses}>
        Terms
      </a>
    </div>
  );
};

export function AppsPageClient() {
  const { theme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [joinedApps, setJoinedApps] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
    setJoinedApps(new Set(readJoinedApps()));
  }, []);

  const isDark = theme === "dark";

  if (!mounted) {
    return (
      <main className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const liveApps = apps.filter((a) => a.status === "available");
  const shwup = apps.find((a) => a.slug === "shwup");

  const handleShwupJoin = async () => {
    if (!email || !shwup) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, apps: [shwup.slug] }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
        return;
      }
      const next = new Set(joinedApps);
      next.add(shwup.slug);
      setJoinedApps(next);
      writeJoinedApps(Array.from(next));
      setEmail("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      className={cn(
        "relative z-10 min-h-screen flex flex-col items-center px-4 pt-10 pb-24",
        !isDark && "bg-[#F5F5F7]",
      )}
    >
      <div className="w-full max-w-3xl">
        <Header isDark={isDark} />

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {liveApps.map((app, i) => (
            <LiveAppCard key={app.slug} app={app} index={i} isDark={isDark} />
          ))}
        </section>

        {shwup && (
          <section className="mt-4">
            <ShwupCard
              app={shwup}
              isDark={isDark}
              isJoined={joinedApps.has(shwup.slug)}
              onJoin={handleShwupJoin}
              email={email}
              setEmail={setEmail}
              submitting={submitting}
              error={error}
            />
          </section>
        )}
      </div>

      <LegalFooter isDark={isDark} />

      <AppsBottomNav
        isDark={isDark}
        onToggleTheme={() => setTheme(isDark ? "light" : "dark")}
      />
    </main>
  );
}
