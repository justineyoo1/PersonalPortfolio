import React from "react";
import LeetCodeCalendar from "../LeetCodeCalendar";
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

const LeetCodeBody = ({
  isDark,
  leetCode,
  leetCodeError,
  socialLeetCodeUrl,
  compact,
  expanded,
}: {
  isDark: boolean;
  leetCode: LeetCodeData | null;
  leetCodeError: string;
  socialLeetCodeUrl: string;
  compact?: boolean;
  expanded?: boolean;
}) => {
  return (
    <>
      {leetCode ? (
        <div className={`flex items-center gap-4 ${expanded ? "w-full max-w-[430px] gap-3" : ""}`}>
          <a
            href={socialLeetCodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${expanded ? "w-16 h-16" : "w-16 h-16"} rounded-xl p-1 flex items-center justify-center cursor-pointer ${
              isDark ? "bg-gray-100" : "bg-[#F2F2F7]"
            }`}
          >
            <img
              src="/img/Logos/leetcode_color.png"
              alt="LeetCode Logo"
              className={`${expanded ? "w-16 h-16" : "w-16 h-16"} rounded-xl p-1 object-contain ${
                isDark ? "bg-gray-100" : "bg-[#F2F2F7]"
              }`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/img/Logos/leetcode.png";
              }}
            />
          </a>
          <div className="flex-grow">
            <p
              className={`${expanded ? "text-[1.8rem] leading-tight" : "text-sm"} font-bold ${
                isDark ? "text-white" : "text-[#1D1D1F] tracking-tight"
              }`}
            >
              {isDark ? "total solved" : "Total Solved"}: {leetCode.totalSolved}
            </p>
            <div className={`flex flex-col justify-between ${expanded ? "text-[1.55rem] leading-tight mt-1" : "text-sm"}`}>
              <p className={isDark ? "text-green-400" : "text-[#34C759] font-semibold"}>{isDark ? "easy" : "Easy"}: {leetCode.easySolved}</p>
              <p className={isDark ? "text-yellow-400" : "text-[#FF9500] font-semibold"}>{isDark ? "medium" : "Medium"}: {leetCode.mediumSolved}</p>
              <p className={isDark ? "text-red-400" : "text-[#FF3B30] font-semibold"}>{isDark ? "hard" : "Hard"}: {leetCode.hardSolved}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className={`text-sm mt-4 p-4 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
          {leetCodeError || "fetching leetcode stats..."}
        </p>
      )}
      {leetCode && leetCode.submissionCalendar && (
        compact ? (
          <LeetCodeCalendar submissionCalendar={leetCode.submissionCalendar} isDark={isDark} />
        ) : (
          <div className={`w-full ${expanded ? "max-w-[620px]" : "min-w-xs lg:min-w-md"}`}>
            <LeetCodeCalendar
              submissionCalendar={leetCode.submissionCalendar}
              viewMode="month"
              isDark={isDark}
              size={expanded ? "expanded" : "compact"}
            />
          </div>
        )
      )}
    </>
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
        title={isDark ? "leetcode - zsh" : "LeetCode"}
        isDark={isDark}
        selected={selectedWindow === "leetcode"}
        headerClass={headerClass}
        onMaximize={() => setExpandWindow("leetcode")}
      />
      <div className="w-full flex-1 min-h-0 overflow-hidden flex flex-col items-center justify-center my-2">
        <LeetCodeBody
          isDark={isDark}
          leetCode={leetCode}
          leetCodeError={leetCodeError}
          socialLeetCodeUrl={socialLeetCodeUrl}
          compact
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
      className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-hidden`}
    >
      <WindowHeader
        title={isDark ? "leetcode - zsh" : "LeetCode"}
        isDark={isDark}
        selected={selectedWindow === "leetcode"}
        headerClass={headerClass}
        sticky
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("leetcode")}
      />
      <div className="w-full h-full flex flex-col items-center justify-start mt-3 px-6">
        <LeetCodeBody
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
