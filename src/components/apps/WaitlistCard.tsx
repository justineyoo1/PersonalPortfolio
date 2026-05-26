import React from "react";
import { cn } from "@/lib/cn";
import type { AppInfo } from "@/data/apps";

type WaitlistCardProps = {
  app: AppInfo;
  index: number;
  isDark: boolean;
  isSelected: boolean;
  isJoined: boolean;
  onToggle: () => void;
};

const cardShellClasses = (
  isDark: boolean,
  isSelected: boolean,
): string => {
  if (isDark) {
    return cn(
      "rounded-xl border bg-[#0B0F14]/90",
      isSelected
        ? "border-[#60A5FA]/50 shadow-[0_0_15px_rgba(96,165,250,0.1)]"
        : "border-gray-700/90",
    );
  }
  return cn(
    "rounded-2xl apple-card-lift border",
    isSelected
      ? "bg-white ring-2 ring-[#007AFF]/40 border-transparent apple-shadow"
      : "bg-white border-[#E5E5EA]/50 apple-shadow",
  );
};

const ctaClasses = (isDark: boolean, isSelected: boolean): string =>
  cn(
    "flex items-center justify-center w-full py-1.5 text-[11px] font-semibold transition-all duration-200",
    isDark ? "font-mono font-normal rounded-lg" : "rounded-full",
    isSelected
      ? isDark
        ? "bg-[#60A5FA]/20 text-[#60A5FA] border border-[#60A5FA]/40"
        : "bg-[#007AFF] text-white"
      : isDark
        ? "bg-transparent border border-gray-600 text-gray-300 hover:border-[#60A5FA]/40 hover:text-[#60A5FA]"
        : "bg-[#F2F2F7] text-[#007AFF] border border-[#E5E5EA] hover:bg-[#E8E8ED]",
  );

const ctaLabel = (isDark: boolean, isSelected: boolean) =>
  isSelected
    ? isDark
      ? "✓ selected"
      : "Selected ✓"
    : isDark
      ? "$ select"
      : "Join Waitlist";

const AppIcon: React.FC<{ app: AppInfo; isDark: boolean }> = ({ app, isDark }) => {
  if (app.icon) {
    return (
      <img
        src={app.icon}
        alt={`${app.name} icon`}
        width={40}
        height={40}
        className={cn(
          "w-9 h-9 rounded-xl shrink-0 object-cover",
          app.iconBg === "dark" && "bg-gray-900",
          app.iconBg === "light" && isDark && "bg-white p-0.5",
        )}
      />
    );
  }
  return (
    <div
      className={cn(
        "w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-base font-bold",
        isDark && "border",
      )}
      style={{
        backgroundColor: `${app.accentColor}15`,
        color: app.accentColor,
        borderColor: `${app.accentColor}40`,
      }}
    >
      {app.name[0]}
    </div>
  );
};

const FeatureList: React.FC<{ app: AppInfo; isDark: boolean }> = ({
  app,
  isDark,
}) => (
  <ul className="mt-1.5 space-y-0.5">
    {app.features.map((feature) => (
      <li
        key={feature}
        className={cn(
          "flex items-center gap-1.5",
          isDark ? "text-[9px] font-mono text-gray-500" : "text-[9px] text-[#86868B]",
        )}
      >
        <span
          className="w-1 h-1 rounded-full shrink-0"
          style={{
            backgroundColor: isDark ? app.accentColor : "#007AFF",
          }}
        />
        {feature}
      </li>
    ))}
  </ul>
);

export const WaitlistCard: React.FC<WaitlistCardProps> = ({
  app,
  index,
  isDark,
  isSelected,
  isJoined,
  onToggle,
}) => {
  return (
    <article
      className={cn(
        "opacity-0 animate-[fade-in-up_0.4s_ease-out_both] overflow-hidden transition-all duration-200 flex flex-col",
        cardShellClasses(isDark, isSelected),
      )}
      style={{ animationDelay: `${index * 80 + 150}ms` }}
    >
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

      <div className="flex-1 p-2.5 pb-1.5">
        <div className="flex items-center gap-2.5">
          <AppIcon app={app} isDark={isDark} />
          <div className="flex-1 min-w-0">
            <h2
              className={cn(
                "font-bold truncate",
                isDark
                  ? "font-mono text-gray-100 text-[13px]"
                  : "text-[#1D1D1F] text-[15px] !font-semibold",
              )}
            >
              {app.name}
            </h2>
            <p
              className={cn(
                "truncate",
                isDark
                  ? "font-mono text-gray-500 text-[10px]"
                  : "text-[#86868B] text-[11px]",
              )}
            >
              {app.tagline}
            </p>
          </div>
        </div>

        <p
          className={cn(
            "mt-1.5 leading-snug line-clamp-2",
            isDark
              ? "font-mono text-[10px] text-gray-400"
              : "text-[11px] text-[#515154]",
          )}
        >
          {app.description}
        </p>

        <FeatureList app={app} isDark={isDark} />
      </div>

      <div className="px-2.5 pb-2.5">
        {isJoined ? (
          <div
            className={cn(
              "flex items-center justify-center w-full py-1.5 text-[11px]",
              isDark
                ? "font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg"
                : "text-[#34C759] bg-[#34C759]/8 font-medium rounded-full",
            )}
          >
            {isDark ? "✓ waitlisted" : "On the Waitlist ✓"}
          </div>
        ) : (
          <button onClick={onToggle} className={ctaClasses(isDark, isSelected)}>
            {ctaLabel(isDark, isSelected)}
          </button>
        )}
      </div>
    </article>
  );
};
