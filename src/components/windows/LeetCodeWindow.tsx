import React from "react";
import { WindowHeader } from "./WindowHeader";
import { neetcode } from "@/data/neetcode";

import type { LeetCodeData } from "@/types";

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

const NEETCODE_URL = neetcode.url;
const DAY_LETTERS = ["S", "M", "T", "W", "T", "F", "S"];

/**
 * NeetCode's own rocket favicon on a rounded tile. The source art is a
 * transparent 48px PNG (the largest neetcode.io publishes), upscaled to 144
 * so it stays sharp on retina, and inset so it reads as an app icon.
 */
const NeetCodeMark = ({
  size = 48,
  solved,
  total,
  isDark,
}: {
  size?: number;
  solved: number;
  total: number;
  isDark: boolean;
}) => (
  <a
    href={NEETCODE_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Open NeetCode — ${solved} of ${total} solved`}
    className={`shrink-0 flex items-center justify-center rounded-2xl transition-transform hover:scale-105 ${
      isDark ? "bg-white/[0.07] border border-white/10" : "bg-[#F2F2F7] border border-black/5"
    }`}
    style={{ width: size, height: size }}
  >
    <img
      src="/img/Logos/neetcode@3x.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{ width: size * 0.68, height: size * 0.68 }}
    />
  </a>
);

/** Current week's daily submission counts (Sun–Sat) from the LeetCode calendar. */
function useWeek(cal: Record<string, number> | undefined) {
  return React.useMemo(() => {
    const counts = new Map<string, number>();
    for (const [ts, c] of Object.entries(cal || {})) {
      const d = new Date(parseInt(ts) * 1000);
      const local = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
      const k = `${local.getFullYear()}-${local.getMonth() + 1}-${local.getDate()}`;
      counts.set(k, (counts.get(k) || 0) + (Number(c) || 0));
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay()); // Sunday
    const days: { date: Date; count: number; isToday: boolean; future: boolean }[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const k = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      days.push({
        date: d,
        count: counts.get(k) || 0,
        isToday: d.getTime() === today.getTime(),
        future: d.getTime() > today.getTime(),
      });
    }
    return days;
  }, [cal]);
}

const cellColor = (count: number, isDark: boolean) => {
  if (count <= 0) return isDark ? "#1b2230" : "#EBEDF0";
  if (count <= 2) return isDark ? "#0e4429" : "#9BE9A8";
  if (count <= 5) return isDark ? "#26a641" : "#40C463";
  return isDark ? "#39d353" : "#216E39";
};

const ProgressBar = ({
  done,
  total,
  color,
  isDark,
  height = 6,
}: {
  done: number;
  total: number;
  color: string;
  isDark: boolean;
  height?: number;
}) => (
  <div
    className="w-full rounded-full overflow-hidden"
    style={{ height, backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)" }}
  >
    <div
      className="h-full rounded-full transition-all duration-700"
      style={{ width: `${total > 0 ? Math.max(done > 0 ? 3 : 0, (done / total) * 100) : 0}%`, backgroundColor: color }}
    />
  </div>
);

const DiffRow = ({
  label,
  done,
  total,
  color,
  isDark,
}: {
  label: string;
  done: number;
  total: number;
  color: string;
  isDark: boolean;
}) => (
  <div className="flex items-center gap-2.5 text-xs">
    <span className="w-14 shrink-0 font-mono" style={{ color }}>
      {label}
    </span>
    <div className="flex-1">
      <ProgressBar done={done} total={total} color={color} isDark={isDark} height={5} />
    </div>
    <span className={`shrink-0 font-mono tabular-nums ${isDark ? "text-gray-300" : "text-[#1D1D1F]"}`}>
      {done}
      <span className={isDark ? "text-gray-600" : "text-[#C7C7CC]"}>/{total}</span>
    </span>
  </div>
);

const WeekStrip = ({
  cal,
  isDark,
  cell,
}: {
  cal: Record<string, number> | undefined;
  isDark: boolean;
  cell: number;
}) => {
  const days = useWeek(cal);
  return (
    <div className="flex gap-1.5">
      {days.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <span className={`text-[10px] font-mono ${isDark ? "text-gray-500" : "text-[#86868B]"}`}>
            {DAY_LETTERS[d.date.getDay()]}
          </span>
          <div
            title={`${d.count} on ${d.date.toLocaleDateString()}`}
            style={{
              width: cell,
              height: cell,
              borderRadius: Math.max(3, Math.round(cell / 4)),
              backgroundColor: d.future ? "transparent" : cellColor(d.count, isDark),
              outline: d.isToday
                ? `1.5px solid ${isDark ? "#34d399" : "#0E8B3A"}`
                : "none",
              outlineOffset: 1,
            }}
          />
        </div>
      ))}
    </div>
  );
};

const NeetCodeBody = ({
  isDark,
  leetCode,
  expanded,
}: {
  isDark: boolean;
  leetCode: LeetCodeData | null;
  expanded?: boolean;
}) => {
  // Prefer live progress (synced server-side from LeetCode AC submissions
  // intersected with the NeetCode 150 list); fall back to the manual snapshot.
  const live = leetCode?.neetcode?.live ? leetCode.neetcode : null;
  const { total, difficulty: snap } = neetcode;
  const solved = live ? live.solved : neetcode.solved;
  const difficulty = live
    ? {
        easy: { done: live.easy, total: snap.easy.total },
        medium: { done: live.medium, total: snap.medium.total },
        hard: { done: live.hard, total: snap.hard.total },
      }
    : snap;
  const pct = Math.round((solved / total) * 100);

  return (
    <div className={`w-full ${expanded ? "max-w-[560px]" : "max-w-[320px]"} mx-auto`}>
      {/* header */}
      <div className="flex items-center gap-3.5">
        <NeetCodeMark size={expanded ? 60 : 46} solved={solved} total={total} isDark={isDark} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span
              className={`font-mono font-bold leading-none ${isDark ? "text-white" : "text-[#1D1D1F]"} ${
                expanded ? "text-3xl" : "text-2xl"
              }`}
            >
              {solved}
              <span className={isDark ? "text-gray-500" : "text-[#C7C7CC]"}>/{total}</span>
            </span>
            <span className={`text-xs ${isDark ? "text-gray-400" : "text-[#86868B]"}`}>NeetCode 150</span>
          </div>
          <a
            href={neetcode.listUrl}
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

      {/* overall progress */}
      <div className={`${expanded ? "mt-5" : "mt-3.5"}`}>
        <div className={`flex justify-between mb-1.5 text-[11px] font-mono ${isDark ? "text-gray-400" : "text-[#86868B]"}`}>
          <span>roadmap progress</span>
          <span>{pct}%</span>
        </div>
        <ProgressBar done={solved} total={total} color="#34d399" isDark={isDark} height={expanded ? 8 : 6} />
      </div>

      {/* difficulty */}
      <div className={`flex flex-col gap-2 ${expanded ? "mt-5" : "mt-3.5"}`}>
        <DiffRow label="easy" done={difficulty.easy.done} total={difficulty.easy.total} color="#3FB950" isDark={isDark} />
        <DiffRow label="medium" done={difficulty.medium.done} total={difficulty.medium.total} color="#E3B341" isDark={isDark} />
        <DiffRow label="hard" done={difficulty.hard.done} total={difficulty.hard.total} color="#F85149" isDark={isDark} />
      </div>

      {/* this week */}
      <div className={`${expanded ? "mt-6" : "mt-4"}`}>
        <p className={`text-[11px] mb-2 font-mono ${isDark ? "text-gray-500" : "text-[#86868B]"}`}>this week</p>
        <WeekStrip cal={leetCode?.submissionCalendar} isDark={isDark} cell={expanded ? 30 : 22} />
      </div>

      {expanded && (
        <p className={`mt-5 text-[11px] font-mono ${isDark ? "text-gray-600" : "text-[#A1A1A6]"}`}>
          {live
            ? "progress synced live from leetcode · neetcode 150 roadmap"
            : "progress synced from neetcode · activity from leetcode"}
        </p>
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
  leetCode,
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
      <div className="w-full flex-1 min-h-0 overflow-hidden flex flex-col items-center justify-start px-3 pt-3 pb-2">
        <NeetCodeBody isDark={isDark} leetCode={leetCode} />
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
  leetCode,
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
        <NeetCodeBody isDark={isDark} leetCode={leetCode} expanded />
      </div>
    </div>
  );
};
