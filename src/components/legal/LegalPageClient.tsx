"use client";

import { useState, useEffect, ReactNode } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Github, Linkedin, Sun, Moon, ArrowLeft } from "lucide-react";

export function LegalPageClient({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: (isDark: boolean) => ReactNode;
}) {
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

  return (
    <main
      className={`relative z-10 min-h-screen flex flex-col items-center px-4 pt-5 pb-20 ${
        !isDark ? "bg-[#F5F5F7]" : ""
      }`}
    >
      <article className="w-full max-w-2xl opacity-0 animate-[fade-in-up_0.4s_ease-out_both]">
        {/* Header */}
        {isDark ? (
          <header className="mb-6 text-center">
            <div className="font-mono text-sm mb-1">
              <span className="text-[#60A5FA]">{">"}</span>
              <span className="text-gray-200 ml-2">cat {title.toLowerCase().replace(/\s+/g, "-")}.md</span>
              <span className="inline-block w-2 h-4 ml-1 align-middle bg-gray-300 animate-pulse" />
            </div>
            <p className="font-mono text-xs text-gray-500">
              Last updated: {lastUpdated}
            </p>
          </header>
        ) : (
          <header className="mb-6">
            <h1 className="text-[28px] font-bold text-[#1D1D1F] tracking-tight">
              {title}
            </h1>
            <p className="text-[13px] text-[#86868B] mt-1">
              Last updated: {lastUpdated}
            </p>
          </header>
        )}

        {/* Content */}
        <div
          className={`rounded-2xl p-5 sm:p-8 ${
            isDark
              ? "bg-[#0B0F14]/90 border border-gray-700/90"
              : "bg-white border border-[#E5E5EA]/50 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          }`}
        >
          {children(isDark)}
        </div>
      </article>

      {/* Footer links */}
      <div className="w-full max-w-2xl mt-8 flex justify-center gap-4 opacity-0 animate-[fade-in-up_0.4s_ease-out_both]" style={{ animationDelay: "200ms" }}>
        <a
          href="/app/privacy"
          className={`text-xs transition-colors ${
            isDark ? "font-mono text-gray-500 hover:text-[#60A5FA]" : "text-[#86868B] hover:text-[#007AFF]"
          }`}
        >
          Privacy Policy
        </a>
        <span className={`text-xs ${isDark ? "text-gray-700" : "text-[#D1D1D6]"}`}>|</span>
        <a
          href="/app/terms"
          className={`text-xs transition-colors ${
            isDark ? "font-mono text-gray-500 hover:text-[#60A5FA]" : "text-[#86868B] hover:text-[#007AFF]"
          }`}
        >
          Terms of Service
        </a>
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
