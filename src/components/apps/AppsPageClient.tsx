"use client";

import { useState, useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Github, Linkedin, Sun, Moon, ArrowLeft } from "lucide-react";
import { apps } from "@/data/apps";
import type { AppInfo } from "@/data/apps";

export function AppsPageClient() {
  const { theme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedApps, setSelectedApps] = useState<Set<string>>(new Set());
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [joinedApps, setJoinedApps] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("waitlist-joined");
    if (stored) {
      setJoinedApps(new Set(JSON.parse(stored)));
    }
  }, []);

  const isDark = theme === "dark";

  if (!mounted) {
    return (
      <main className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const toggleApp = (slug: string) => {
    setSelectedApps((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const toggleAll = () => {
    const unjoinedApps = apps.filter((a) => !joinedApps.has(a.slug));
    if (selectedApps.size === unjoinedApps.length) {
      setSelectedApps(new Set());
    } else {
      setSelectedApps(new Set(unjoinedApps.map((a) => a.slug)));
    }
  };

  const handleSubmit = async () => {
    if (!email || selectedApps.size === 0) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, apps: Array.from(selectedApps) }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
        return;
      }

      const newJoined = new Set(Array.from(joinedApps).concat(Array.from(selectedApps)));
      setJoinedApps(newJoined);
      localStorage.setItem("waitlist-joined", JSON.stringify(Array.from(newJoined)));
      setSelectedApps(new Set());
      setEmail("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const allJoined = apps.every((a) => joinedApps.has(a.slug));
  const unjoinedApps = apps.filter((a) => !joinedApps.has(a.slug));
  const allSelected =
    unjoinedApps.length > 0 && selectedApps.size === unjoinedApps.length;

  return (
    <main className={`relative z-10 min-h-screen flex flex-col items-center px-4 pt-5 pb-16 ${!isDark ? "bg-[#F5F5F7]" : ""}`}>
      <div className="w-full max-w-2xl">
        {/* Header with brief intro */}
        <header
          className={`mb-4 opacity-0 animate-[fade-in-up_0.4s_ease-out_both] ${isDark ? "text-center" : "text-left"}`}
        >
          {isDark ? (
            <>
              <div className="font-mono text-sm mb-1">
                <span className="text-[#60A5FA]">{">"}</span>
                <span className="text-gray-200 ml-2">ls ~/apps</span>
                <span className="inline-block w-2 h-4 ml-1 align-middle bg-gray-300 animate-pulse" />
              </div>
              <p className="font-mono text-xs text-gray-500">
                4 iOS apps — built by a CS student at UNC
              </p>
            </>
          ) : (
            <div className="text-left">
              <h1 className="text-[17px] font-semibold text-[#1D1D1F] tracking-tight">
                Justin Yoo
              </h1>
              <p className="text-[12px] text-[#86868B]">
                CS @ UNC — Building iOS apps for focus & fitness
              </p>
            </div>
          )}
        </header>

        {/* Select All / Join All toggle */}
        {!allJoined && (
          <div
            className="flex items-center justify-between mb-3 opacity-0 animate-[fade-in-up_0.4s_ease-out_both]"
            style={{ animationDelay: "150ms" }}
          >
            <button
              onClick={toggleAll}
              className={`text-[13px] font-medium transition-all ${
                isDark
                  ? "font-mono text-[#60A5FA] hover:text-[#93C5FD]"
                  : "px-4 py-1.5 rounded-full bg-[#007AFF] text-white hover:bg-[#0066D6] shadow-[0_2px_8px_rgba(0,122,255,0.25)]"
              }`}
            >
              {allSelected
                ? isDark
                  ? "$ deselect --all"
                  : "Deselect All"
                : isDark
                  ? "$ select --all"
                  : "Select All"}
            </button>
            {selectedApps.size > 0 && (
              <span
                className={`text-[12px] ${
                  isDark
                    ? "font-mono text-gray-500"
                    : "text-[#86868B]"
                }`}
              >
                {selectedApps.size} selected
              </span>
            )}
          </div>
        )}

        {/* App cards */}
        <div className="grid grid-cols-2 gap-2.5">
          {apps.map((app, i) => (
            <WaitlistCard
              key={app.slug}
              app={app}
              index={i}
              isDark={isDark}
              isSelected={selectedApps.has(app.slug)}
              isJoined={joinedApps.has(app.slug)}
              onToggle={() => toggleApp(app.slug)}
            />
          ))}
        </div>

        {/* Waitlist form */}
        {selectedApps.size > 0 && (
          <div
            className={`mt-6 flex gap-2 opacity-0 animate-[fade-in-up_0.3s_ease-out_both] ${
              isDark ? "" : ""
            }`}
          >
            <input
              type="email"
              placeholder={isDark ? "email@example.com" : "Enter your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className={`flex-1 min-w-0 px-4 py-3 text-sm rounded-xl outline-none transition-all ${
                isDark
                  ? "font-mono bg-[#0B0F14] border border-gray-700 text-gray-200 placeholder-gray-500 focus:border-[#60A5FA]"
                  : "bg-white border border-[#E5E5EA] text-[#1D1D1F] placeholder-[#86868B] focus:border-[#007AFF] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              }`}
            />
            <button
              onClick={handleSubmit}
              disabled={submitting || !email}
              className={`px-5 py-3 text-sm font-semibold rounded-xl transition-all whitespace-nowrap disabled:opacity-50 ${
                isDark
                  ? "font-mono bg-[#60A5FA]/15 text-[#60A5FA] border border-[#60A5FA]/30 hover:bg-[#60A5FA]/25"
                  : "bg-[#007AFF] text-white hover:bg-[#0066D6] shadow-[0_2px_8px_rgba(0,122,255,0.25)]"
              }`}
            >
              {submitting
                ? isDark
                  ? "$ joining..."
                  : "Joining..."
                : isDark
                  ? "$ join"
                  : "Join Waitlist"}
            </button>
          </div>
        )}

        {/* Success message */}
        {submitted && (
          <p
            className={`text-center text-sm mt-3 animate-[fade-in-up_0.3s_ease-out_both] ${
              isDark
                ? "font-mono text-emerald-400"
                : "text-[#34C759] font-medium"
            }`}
          >
            {isDark ? "✓ added to waitlist" : "You're on the list!"}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p
            className={`text-center text-sm mt-3 ${
              isDark
                ? "font-mono text-red-400"
                : "text-[#FF3B30] font-medium"
            }`}
          >
            {error}
          </p>
        )}

        {/* All joined state */}
        {allJoined && (
          <p
            className={`text-center text-sm mt-6 ${
              isDark
                ? "font-mono text-emerald-400"
                : "text-[#34C759] font-medium"
            }`}
          >
            {isDark
              ? "✓ waitlisted for all apps"
              : "You're on the waitlist for all apps!"}
          </p>
        )}

      </div>

      {/* Bottom navbar */}
      <div
          className={`fixed bottom-3 z-50 flex items-center gap-2 px-3 py-2 rounded-[20px] ${
            isDark
              ? "shadow-xl border border-gray-700 bg-gray-950"
              : "bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
          }`}
        >
          <a
            href="/"
            className={`rounded-xl p-1.5 transition-colors ${
              isDark
                ? "border border-gray-700 bg-gray-900"
                : "hover:bg-[#F2F2F7]"
            }`}
          >
            <ArrowLeft
              className="w-6 h-6"
              color={isDark ? "white" : "#1D1D1F"}
            />
          </a>
          <div
            className={`border-l h-5 ${
              isDark ? "border-gray-700" : "border-[#E5E5EA]"
            }`}
          />
          <a
            href="https://github.com/justineyoo1"
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-xl p-1.5 transition-colors ${
              isDark
                ? "border border-gray-700 bg-gray-900"
                : "hover:bg-[#F2F2F7]"
            }`}
          >
            <Github
              className="w-6 h-6"
              color={isDark ? "white" : "#1D1D1F"}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/justineyoo"
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-xl p-1.5 transition-colors ${
              isDark
                ? "border border-gray-700 bg-gray-900"
                : "hover:bg-[#F2F2F7]"
            }`}
          >
            <Linkedin
              className="w-6 h-6"
              color={isDark ? "white" : "#1D1D1F"}
            />
          </a>
          <a
            href="https://x.com/jstnyoo"
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-xl p-1.5 transition-colors ${
              isDark
                ? "border border-gray-700 bg-gray-900"
                : "hover:bg-[#F2F2F7]"
            }`}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill={isDark ? "white" : "#1D1D1F"}
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <div
            className={`border-l h-5 ${
              isDark ? "border-gray-700" : "border-[#E5E5EA]"
            }`}
          />
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`rounded-xl p-1.5 transition-colors ${
              isDark
                ? "border border-gray-700"
                : "hover:bg-[#F2F2F7]"
            }`}
          >
            {isDark ? (
              <Sun className="w-6 h-6" color="white" />
            ) : (
              <Moon className="w-6 h-6" color="#1D1D1F" />
            )}
          </button>
        </div>
    </main>
  );
}

function WaitlistCard({
  app,
  index,
  isDark,
  isSelected,
  isJoined,
  onToggle,
}: {
  app: AppInfo;
  index: number;
  isDark: boolean;
  isSelected: boolean;
  isJoined: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className={`opacity-0 animate-[fade-in-up_0.4s_ease-out_both] overflow-hidden transition-all duration-200 flex flex-col ${
        isDark
          ? `rounded-xl border bg-[#0B0F14]/90 ${
              isSelected
                ? "border-[#60A5FA]/50 shadow-[0_0_15px_rgba(96,165,250,0.1)]"
                : "border-gray-700/90"
            }`
          : `rounded-2xl apple-card-lift border ${
              isSelected
                ? "bg-white ring-2 ring-[#007AFF]/40 border-transparent apple-shadow"
                : "bg-white border-[#E5E5EA]/50 apple-shadow"
            }`
      }`}
      style={{ animationDelay: `${index * 80 + 150}ms` }}
    >
      {/* Dark mode: mini terminal header */}
      {isDark && (
        <div className="flex relative py-1 px-2.5 bg-gray-800/80 items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono tracking-wide text-gray-500">
            {app.slug}
          </span>
        </div>
      )}

      {/* Card body */}
      <div className={`flex-1 ${isDark ? "p-2.5 pb-1.5" : "p-2.5 pb-1.5"}`}>
        {/* Icon + Name row */}
        <div className="flex items-center gap-2.5">
          {app.icon ? (
            <img
              src={app.icon}
              alt={`${app.name} icon`}
              width={40}
              height={40}
              className={`w-9 h-9 rounded-xl shrink-0 object-cover ${
                app.iconBg === "dark"
                  ? "bg-gray-900"
                  : app.iconBg === "light"
                    ? isDark
                      ? "bg-white p-0.5"
                      : ""
                    : ""
              }`}
            />
          ) : (
            <div
              className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-base font-bold ${
                isDark ? "border" : ""
              }`}
              style={{
                backgroundColor: `${app.accentColor}15`,
                color: app.accentColor,
                borderColor: `${app.accentColor}40`,
              }}
            >
              {app.name[0]}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2
              className={`font-bold truncate ${
                isDark ? "font-mono text-gray-100 text-[13px]" : "text-[#1D1D1F] text-[15px] !font-semibold"
              }`}
            >
              {app.name}
            </h2>
            <p
              className={`truncate ${
                isDark ? "font-mono text-gray-500 text-[10px]" : "text-[#86868B] text-[11px]"
              }`}
            >
              {app.tagline}
            </p>
          </div>
        </div>

        {/* Description — one line */}
        <p
          className={`mt-1.5 leading-snug line-clamp-2 ${
            isDark
              ? "font-mono text-[10px] text-gray-400"
              : "text-[11px] text-[#515154]"
          }`}
        >
          {app.description}
        </p>

        {/* Features */}
        {isDark ? (
          <ul className="mt-1.5 space-y-0.5">
            {app.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-1.5 text-[9px] font-mono text-gray-500"
              >
                <span
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: app.accentColor }}
                />
                {feature}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-1.5 space-y-0.5">
            {app.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-1.5 text-[9px] text-[#86868B]"
              >
                <span className="w-1 h-1 rounded-full bg-[#007AFF] shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTA */}
      <div className="px-2.5 pb-2.5">
        {isJoined ? (
          <div
            className={`flex items-center justify-center w-full py-1.5 text-[11px] ${
              isDark
                ? "font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg"
                : "text-[#34C759] bg-[#34C759]/8 font-medium rounded-full"
            }`}
          >
            {isDark ? "✓ waitlisted" : "On the Waitlist ✓"}
          </div>
        ) : (
          <button
            onClick={onToggle}
            className={`flex items-center justify-center w-full py-1.5 text-[11px] font-semibold transition-all duration-200 ${
              isDark
                ? "font-mono font-normal rounded-lg"
                : "rounded-full"
            } ${
              isSelected
                ? isDark
                  ? "bg-[#60A5FA]/20 text-[#60A5FA] border border-[#60A5FA]/40"
                  : "bg-[#007AFF] text-white"
                : isDark
                  ? "bg-transparent border border-gray-600 text-gray-300 hover:border-[#60A5FA]/40 hover:text-[#60A5FA]"
                  : "bg-[#F2F2F7] text-[#007AFF] border border-[#E5E5EA] hover:bg-[#E8E8ED]"
            }`}
          >
            {isSelected
              ? isDark
                ? "✓ selected"
                : "Selected ✓"
              : isDark
                ? "$ select"
                : "Join Waitlist"}
          </button>
        )}
      </div>
    </article>
  );
}
