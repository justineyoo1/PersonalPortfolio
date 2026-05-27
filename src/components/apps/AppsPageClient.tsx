"use client";

import { useState, useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { apps, type AppInfo } from "@/data/apps";
import { cn } from "@/lib/cn";
import { AppsBottomNav } from "./AppsBottomNav";
import { AppStoreLink } from "./AppStoreBadge";

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

const LiveBadge: React.FC<{ isDark: boolean }> = ({ isDark }) => (
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
      "group rounded-2xl p-5 sm:p-6 flex flex-col gap-4 opacity-0 animate-[fade-in-up_0.4s_ease-out_both] transition-all duration-200",
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
          <LiveBadge isDark={isDark} />
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

    {/* CTA row. Primary "Open <App>" pill picks up the accent color and grows
        its chevron on card hover. Secondary App Store badge sits at the right
        for users who skip the landing page. */}
    <div className="flex items-center justify-between gap-3 pt-1 mt-auto">
      <a
        href={`/apps/${app.slug}`}
        aria-label={`Open ${app.name} landing page`}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all",
          isDark
            ? "border bg-white/[0.04] hover:bg-white/[0.08]"
            : "border bg-white hover:bg-[#F2F2F7]",
        )}
        style={{
          color: app.accentColor,
          borderColor: isDark ? `${app.accentColor}33` : `${app.accentColor}44`,
        }}
      >
        Open {app.name}
        <span
          aria-hidden
          className="transition-transform duration-200 ease-out group-hover:translate-x-1"
        >
          →
        </span>
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  if (!mounted) {
    return (
      <main className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  // Only show live apps on the public index. Waitlist apps (Shwup) stay
  // visible inside the home page's "apps" window but don't merit their own
  // card with an inline email form here.
  const liveApps = apps.filter((a) => a.status === "available");

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
      </div>

      <LegalFooter isDark={isDark} />

      <AppsBottomNav
        isDark={isDark}
        onToggleTheme={() => setTheme(isDark ? "light" : "dark")}
      />
    </main>
  );
}
