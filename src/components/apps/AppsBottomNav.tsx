import React from "react";
import { ArrowLeft, Github, Linkedin, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/cn";

const XIcon = ({ fill }: { fill: string }) => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill={fill}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const iconColor = (isDark: boolean) => (isDark ? "white" : "#1D1D1F");

const linkClasses = (isDark: boolean) =>
  cn(
    "rounded-xl p-1.5 transition-colors",
    isDark
      ? "border border-gray-700 bg-gray-900"
      : "hover:bg-[#F2F2F7]",
  );

const buttonClasses = (isDark: boolean) =>
  cn(
    "rounded-xl p-1.5 transition-colors",
    isDark ? "border border-gray-700" : "hover:bg-[#F2F2F7]",
  );

const dividerClasses = (isDark: boolean) =>
  cn("border-l h-5", isDark ? "border-gray-700" : "border-[#E5E5EA]");

type AppsBottomNavProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export const AppsBottomNav: React.FC<AppsBottomNavProps> = ({
  isDark,
  onToggleTheme,
}) => {
  const color = iconColor(isDark);

  return (
    <div
      className={cn(
        "fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-2 rounded-[20px]",
        isDark
          ? "shadow-xl border border-gray-700 bg-gray-950"
          : "bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.08)]",
      )}
    >
      <a href="/" aria-label="Back to home" className={linkClasses(isDark)}>
        <ArrowLeft className="w-6 h-6" color={color} />
      </a>
      <div className={dividerClasses(isDark)} />
      <a
        href="https://github.com/justineyoo1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className={linkClasses(isDark)}
      >
        <Github className="w-6 h-6" color={color} />
      </a>
      <a
        href="https://www.linkedin.com/in/justineyoo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className={linkClasses(isDark)}
      >
        <Linkedin className="w-6 h-6" color={color} />
      </a>
      <a
        href="https://x.com/jstnyoo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X profile"
        className={linkClasses(isDark)}
      >
        <XIcon fill={color} />
      </a>
      <div className={dividerClasses(isDark)} />
      <button onClick={onToggleTheme} aria-label="Toggle theme" className={buttonClasses(isDark)}>
        {isDark ? (
          <Sun className="w-6 h-6" color="white" />
        ) : (
          <Moon className="w-6 h-6" color="#1D1D1F" />
        )}
      </button>
    </div>
  );
};
