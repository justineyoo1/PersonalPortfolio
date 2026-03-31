import React from "react";
import { WindowHeader } from "./WindowHeader";
import { apps } from "@/data/apps";

type AppsWindowProps = {
  isDark: boolean;
  selectedWindow: string;
  windowThemeClass: string;
  headerClass: (selected: boolean) => string;
  setExpandWindow: (value: string) => void;
  setSelectedWindow: (value: string) => void;
  isHidden: boolean;
};

export const AppsCollapsed = ({
  isDark,
  selectedWindow,
  windowThemeClass,
  headerClass,
  setExpandWindow,
  setSelectedWindow,
  isHidden,
}: AppsWindowProps) => {
  return (
    <div
      className={`${windowThemeClass} col-span-2 lg:col-span-4 rounded-xl flex flex-col min-h-0 overflow-hidden order-8 ${
        isHidden ? "opacity-0" : ""
      } transition-opacity duration-500`}
      onClick={() => setSelectedWindow("apps")}
    >
      <WindowHeader
        title={isDark ? "apps — zsh" : "Apps"}
        isDark={isDark}
        selected={selectedWindow === "apps"}
        headerClass={headerClass}
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => window.open("/apps", "_blank")}
      />

      <div className={`grid grid-cols-2 lg:grid-cols-4 ${isDark ? "gap-3 p-4" : "gap-1.5 px-3 pt-2 pb-1"}`}>
        {apps.map((app) => (
          <a
            key={app.slug}
            href={app.status === "available" ? app.appStoreUrl : (app.waitlistUrl ?? "/apps")}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-3 ${isDark ? "rounded-lg p-3" : "rounded-xl px-3 py-2"} transition-all duration-200 ${
              isDark
                ? "hover:bg-white/5"
                : "hover:bg-[#E8E8ED] apple-transition hover:shadow-sm"
            }`}
          >
            {/* App icon */}
            {app.icon ? (
              <img
                src={app.icon}
                alt={app.name}
                width={48}
                height={48}
                className={`${isDark ? "w-14 h-14" : "w-10 h-10"} rounded-xl shrink-0 object-cover ${
                  app.iconBg === "dark"
                    ? "bg-gray-900"
                    : isDark
                      ? app.iconBg === "light"
                        ? "bg-white p-1.5"
                        : ""
                      : app.iconBg === "light"
                        ? ""
                        : "bg-gray-900 p-1"
                }`}
              />
            ) : (
              <div
                className={`${isDark ? "w-12 h-12 text-lg" : "w-10 h-10 text-sm"} rounded-xl shrink-0 flex items-center justify-center font-bold ${
                  isDark ? "border" : ""
                }`}
                style={{
                  backgroundColor: isDark ? `${app.accentColor}15` : "#111827",
                  color: isDark ? app.accentColor : "#ffffff",
                  borderColor: isDark ? `${app.accentColor}40` : undefined,
                }}
              >
                {app.name[0]}
              </div>
            )}

            {/* Info */}
            <div className="min-w-0">
              <p
                className={`${isDark ? "text-sm" : "text-[13px]"} font-bold truncate ${isDark ? "font-mono text-gray-100" : "text-[#1D1D1F]"}`}
              >
                {app.name}
              </p>
              <p
                className={`${isDark ? "text-xs" : "text-[11px]"} truncate ${isDark ? "font-mono text-gray-400" : "text-[#86868B]"}`}
              >
                {app.tagline}
              </p>
              {isDark && (
                <span
                  className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-mono"
                  style={{
                    backgroundColor: `${app.accentColor}15`,
                    color: app.accentColor,
                  }}
                >
                  {app.status === "available" ? "$ download" : "$ waitlist"}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>

      {/* CTA to open /apps page */}
      <div className={`px-4 pb-3 ${isDark ? "pt-0" : "pt-0"}`}>
        <a
          href="/apps"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-full py-2.5 text-sm font-semibold transition-all duration-200 ${
            isDark
              ? "font-mono rounded-lg bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/25 hover:bg-[#60A5FA]/20"
              : "rounded-full bg-[#E8E8ED]/80 text-[#515154] hover:bg-[#DDDDE3] hover:text-[#1D1D1F] text-[13px]"
          }`}
        >
          {isDark ? "$ open ~/apps ↗" : "View All Apps ↗"}
        </a>
      </div>
    </div>
  );
};
