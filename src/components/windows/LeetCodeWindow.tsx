import React from "react";
import ContribHeatmap from "../ContribHeatmap";
import { WindowHeader } from "./WindowHeader";

type LeetCodeData = {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSolved: number;
  submissionCalendar: Record<string, number>;
};

type BaseProps = {
  isDark: boolean;
  selectedWindow: string;
  windowThemeClass: string;
  headerClass: (selected: boolean) => string;
  setExpandWindow: (window: string) => void;
  socialLeetCodeUrl: string;
  leetCode: LeetCodeData | null;
  leetCodeError: string;
};

const NEETCODE_URL = "https://neetcode.io";

const NeetCodeMark = ({ size = 52 }: { size?: number }) => (
  <a
    href={NEETCODE_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Open NeetCode"
    className="shrink-0 rounded-2xl flex items-center justify-center font-mono font-bold shadow-md transition-transform hover:scale-105"
    style={{
      width: size,
      height: size,
      background: "linear-gradient(145deg, #34d399 0%, #0ea5a4 100%)",
      color: "#04150d",
    }}
  >
    <span style={{ fontSize: size * 0.32, letterSpacing: "-0.04em" }}>{"</>"}</span>
  </a>
);

const keyFor = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

function computeStats(cal: Record<string, number>) {
  const days = new Set<string>();
  for (const ts of Object.keys(cal || {})) {
    const d = new Date(parseInt(ts) * 1000);
    const local = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    if ((Number(cal[ts]) || 0) > 0) days.add(keyFor(local));
  }
  // current streak: walk back from today (today not yet done is allowed)
  let streak = 0;
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 0; ; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() - i);
    if (days.has(keyFor(d))) streak++;
    else if (i === 0) continue;
    else break;
  }
  return { streak, activeDays: days.size };
}

const DiffRow = ({
  label,
  count,
  total,
  color,
  isDark,
  big,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
  isDark: boolean;
  big?: boolean;
}) => {
  const pct = total > 0 ? Math.max(2, Math.round((count / total) * 100)) : 0;
  return (
    <div className={`flex items-center gap-2.5 ${big ? "text-sm" : "text-xs"}`}>
      <span className="w-14 shrink-0 font-mono" style={{ color }}>
        {label}
      </span>
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${count > 0 ? pct : 0}%`, backgroundColor: color }}
        />
      </div>
      <span
        className={`w-5 text-right tabular-nums font-mono ${isDark ? "text-gray-200" : "text-[#1D1D1F]"}`}
      >
        {count}
      </span>
    </div>
  );
};

const StatPill = ({
  value,
  label,
  isDark,
}: {
  value: React.ReactNode;
  label: string;
  isDark: boolean;
}) => (
  <div
    className={`flex flex-col items-center justify-center rounded-xl px-4 py-2 ${
      isDark ? "bg-white/[0.04] border border-white/10" : "bg-white border border-[#E5E5EA]"
    }`}
  >
    <span className={`font-mono font-bold ${isDark ? "text-white" : "text-[#1D1D1F]"} text-lg leading-none`}>
      {value}
    </span>
    <span className={`text-[10px] mt-1 ${isDark ? "text-gray-500" : "text-[#86868B]"}`}>{label}</span>
  </div>
);

const NeetCodeBody = ({
  isDark,
  leetCode,
  leetCodeError,
  socialLeetCodeUrl,
  expanded,
}: {
  isDark: boolean;
  leetCode: LeetCodeData | null;
  leetCodeError: string;
  socialLeetCodeUrl: string;
  expanded?: boolean;
}) => {
  if (!leetCode) {
    return (
      <p className={`text-sm p-4 font-mono ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        {leetCodeError || "fetching neetcode stats..."}
      </p>
    );
  }

  const { streak, activeDays } = computeStats(leetCode.submissionCalendar || {});
  const total = leetCode.totalSolved;

  return (
    <div className={`w-full ${expanded ? "max-w-[600px]" : "max-w-[300px]"} mx-auto`}>
      {/* header: mark + total */}
      <div className="flex items-center gap-3.5">
        <NeetCodeMark size={expanded ? 56 : 46} />
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span
              className={`font-mono font-bold leading-none ${isDark ? "text-white" : "text-[#1D1D1F]"} ${
                expanded ? "text-4xl" : "text-2xl"
              }`}
            >
              {total}
            </span>
            <span className={`text-xs ${isDark ? "text-gray-400" : "text-[#86868B]"}`}>solved</span>
          </div>
          <a
            href={NEETCODE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[11px] font-mono transition-colors ${
              isDark ? "text-[#34d399] hover:text-[#6ee7b7]" : "text-[#0E8B3A] hover:text-[#0a6e2e]"
            }`}
          >
            neetcode.io ↗
          </a>
        </div>
      </div>

      {/* difficulty bars */}
      <div className={`flex flex-col gap-2 ${expanded ? "mt-5" : "mt-3"}`}>
        <DiffRow label="easy" count={leetCode.easySolved} total={total} color="#3FB950" isDark={isDark} big={expanded} />
        <DiffRow label="medium" count={leetCode.mediumSolved} total={total} color="#E3B341" isDark={isDark} big={expanded} />
        <DiffRow label="hard" count={leetCode.hardSolved} total={total} color="#F85149" isDark={isDark} big={expanded} />
      </div>

      {/* streak stats (expanded only) */}
      {expanded && (
        <div className="flex gap-3 mt-5">
          <StatPill value={`${streak}d`} label="current streak" isDark={isDark} />
          <StatPill value={activeDays} label="active days" isDark={isDark} />
          <StatPill value={total} label="total solved" isDark={isDark} />
        </div>
      )}

      {/* activity heatmap */}
      <div className={`${expanded ? "mt-6" : "mt-4"} overflow-x-auto`}>
        <p className={`text-[11px] mb-2 font-mono ${isDark ? "text-gray-500" : "text-[#86868B]"}`}>
          submission activity
        </p>
        <ContribHeatmap
          submissionCalendar={leetCode.submissionCalendar}
          isDark={isDark}
          weeks={expanded ? 30 : 14}
          cell={expanded ? 15 : 9}
          gap={expanded ? 3 : 2}
        />
      </div>

      {/* secondary: stats source */}
      {expanded && (
        <a
          href={socialLeetCodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block mt-5 text-[11px] font-mono transition-colors ${
            isDark ? "text-gray-500 hover:text-gray-300" : "text-[#86868B] hover:text-[#1D1D1F]"
          }`}
        >
          stats synced from leetcode ↗
        </a>
      )}
    </div>
  );
};

export const LeetCodeCollapsed = ({
  isDark,
  selectedWindow,
  windowThemeClass,
  headerClass,
  setExpandWindow,
  socialLeetCodeUrl,
  leetCode,
  leetCodeError,
  isHidden,
  onSelect,
}: BaseProps & { isHidden: boolean; onSelect: () => void }) => {
  return (
    <div
      className={` ${windowThemeClass} col-span-2 lg:col-span-1 rounded-xl flex flex-col h-[300px] lg:h-[260px] min-h-0 overflow-hidden order-7 row-start-6 lg:row-start-2 ${
        isHidden ? "opacity-0" : ""
      } transition-opacity duration-500`}
      onClick={onSelect}
    >
      <WindowHeader
        title={isDark ? "neetcode - zsh" : "NeetCode"}
        isDark={isDark}
        selected={selectedWindow === "leetcode"}
        headerClass={headerClass}
        onMaximize={() => setExpandWindow("leetcode")}
      />
      <div className="w-full flex-1 min-h-0 overflow-hidden flex flex-col items-center justify-center px-3 py-2">
        <NeetCodeBody
          isDark={isDark}
          leetCode={leetCode}
          leetCodeError={leetCodeError}
          socialLeetCodeUrl={socialLeetCodeUrl}
        />
      </div>
    </div>
  );
};

export const LeetCodeExpanded = ({
  isDark,
  selectedWindow,
  windowThemeClass,
  headerClass,
  setExpandWindow,
  socialLeetCodeUrl,
  leetCode,
  leetCodeError,
}: BaseProps) => {
  return (
    <div
      className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-hidden flex flex-col`}
    >
      <WindowHeader
        title={isDark ? "neetcode - zsh" : "NeetCode"}
        isDark={isDark}
        selected={selectedWindow === "leetcode"}
        headerClass={headerClass}
        sticky
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("leetcode")}
      />
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col items-center justify-center py-8 px-6">
        <NeetCodeBody
          isDark={isDark}
          leetCode={leetCode}
          leetCodeError={leetCodeError}
          socialLeetCodeUrl={socialLeetCodeUrl}
          expanded
        />
      </div>
    </div>
  );
};
