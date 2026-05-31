import React, { useEffect, useMemo, useState } from "react";
import { WindowHeader } from "./WindowHeader";
import { cn } from "@/lib/cn";

type ToolboxTab = "skills" | "certs";

type SkillsCoursesCerts = {
  skills: Array<{ group: string; items: string[] }>;
  courses: string[];
  certs: Array<{ name: string; issuer: string; date: string }>;
};

type ToolboxRow = {
  id: string;
  label: string;
  meta: string;
  details: string;
};

type ToolboxWindowProps = {
  isDark: boolean;
  selectedWindow: string;
  expandWindow: string;
  windowThemeClass: string;
  headerClass: (selected: boolean) => string;
  tabClass: (active: boolean) => string;
  toolboxTab: ToolboxTab;
  setToolboxTab: (tab: ToolboxTab) => void;
  hoveredToolboxIndex: number | null;
  setHoveredToolboxIndex: (index: number | null) => void;
  setSelectedWindow: (window: string) => void;
  setExpandWindow: (window: string) => void;
  skillsCoursesCerts: SkillsCoursesCerts;
};

const buildRows = (
  toolboxTab: ToolboxTab,
  skillsCoursesCerts: SkillsCoursesCerts,
): ToolboxRow[] => {
  if (toolboxTab === "skills") {
    return skillsCoursesCerts.skills.map((section) => ({
      id: section.group,
      label: section.group,
      meta: `(${section.items.length})`,
      details: section.items.join(", "),
    }));
  }

  return skillsCoursesCerts.certs.map((cert) => ({
    id: cert.name,
    label: cert.name,
    meta: `${cert.issuer} • ${cert.date}`,
    details: `${cert.issuer} | ${cert.date}`,
  }));
};

const ToolboxBody = ({
  isDark,
  toolboxTab,
  hoveredToolboxIndex,
  setHoveredToolboxIndex,
  skillsCoursesCerts,
}: {
  isDark: boolean;
  toolboxTab: ToolboxTab;
  hoveredToolboxIndex: number | null;
  setHoveredToolboxIndex: (index: number | null) => void;
  skillsCoursesCerts: SkillsCoursesCerts;
}) => {
  const rows = useMemo(
    () => buildRows(toolboxTab, skillsCoursesCerts),
    [toolboxTab, skillsCoursesCerts],
  );
  const [selectedToolboxIndex, setSelectedToolboxIndex] = useState(0);

  useEffect(() => {
    setSelectedToolboxIndex(0);
    setHoveredToolboxIndex(null);
  }, [toolboxTab, setHoveredToolboxIndex]);

  useEffect(() => {
    if (selectedToolboxIndex >= rows.length) {
      setSelectedToolboxIndex(0);
    }
  }, [rows.length, selectedToolboxIndex]);

  const selectedIndex =
    hoveredToolboxIndex !== null && hoveredToolboxIndex < rows.length
      ? hoveredToolboxIndex
      : rows.length > 0
        ? selectedToolboxIndex
        : null;

  const selectedRow = selectedIndex !== null ? rows[selectedIndex] : null;

  const previewText = selectedRow?.details ?? "";

  return (
    <div className={`mt-2 mx-4 pb-2 flex-1 min-h-0 flex flex-col gap-2 ${isDark ? "font-mono" : ""} overflow-hidden`}>
      <div
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth"
        onMouseLeave={() => setHoveredToolboxIndex(null)}
      >
        <div className="space-y-1 pr-1">
          {rows.map((row, index) => {
            const isSelected = hoveredToolboxIndex === index;
            return (
              <button
                key={row.id}
                className={`w-full ${isDark ? "h-7 rounded-md" : "h-9 rounded-xl"} transition-all duration-200 text-left px-3 ${isDark ? "text-[13px]" : "text-[14px]"} leading-normal flex items-center gap-2 ${
                  isSelected
                    ? isDark
                      ? "bg-gray-200 text-black"
                      : "bg-[#007AFF]/12 text-[#007AFF] font-bold"
                    : isDark
                      ? "bg-transparent text-[#60A5FA] hover:bg-gray-800/55"
                      : "bg-transparent text-[#1D1D1F] font-medium hover:bg-[#E8E8ED]"
                }`}
                onMouseEnter={() => setHoveredToolboxIndex(index)}
                onMouseLeave={() => setHoveredToolboxIndex(null)}
                onClick={() => setSelectedToolboxIndex(index)}
              >
                <span className="shrink-0">{isSelected ? (isDark ? "▌" : "") : " "}</span>
                <span className="min-w-0 truncate">{row.label}</span>
                <span className={`ml-auto shrink-0 text-[12px] ${
                  isSelected ? "" : isDark ? "opacity-80" : "text-[#86868B] font-medium"
                }`}>
                  {row.meta}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`h-[92px] shrink-0 rounded-lg px-2 py-2 overflow-y-auto ${
          isDark ? "border border-gray-700 bg-gray-900/35" : "bg-gradient-to-br from-[#EAEAF0] to-[#E2E2EA] border border-[#D5D5DC]/40 rounded-xl"
        }`}
      >
        {selectedRow ? (
          <>
            <p className={`text-[13px] font-bold leading-snug ${isDark ? "text-gray-100" : "text-[#1D1D1F]"}`}>
              {selectedRow.label}
            </p>
            <p className={`text-xs mt-1 leading-relaxed ${isDark ? "text-gray-300" : "text-[#515154]"}`}>
              {previewText}
            </p>
          </>
        ) : (
          <p className={`text-[11px] ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            no items in this tab
          </p>
        )}
      </div>
    </div>
  );
};

export const ToolboxCollapsed = ({
  isDark,
  selectedWindow,
  expandWindow,
  windowThemeClass,
  headerClass,
  tabClass,
  toolboxTab,
  setToolboxTab,
  hoveredToolboxIndex,
  setHoveredToolboxIndex,
  setSelectedWindow,
  setExpandWindow,
  skillsCoursesCerts,
}: ToolboxWindowProps) => {
  const toolboxTabCounts: Record<ToolboxTab, number> = {
    skills: skillsCoursesCerts.skills.length,
    certs: skillsCoursesCerts.certs.length,
  };

  return (
    <div
      className={` ${windowThemeClass} col-span-2 lg:col-span-1 lg:row-span-1 rounded-xl flex flex-col h-[300px] lg:h-[320px] min-h-0 overflow-hidden order-2 ${
        expandWindow ? "opacity-0" : ""
      } transition-opacity duration-500`}
      onClick={() => {
        setSelectedWindow("skills");
      }}
    >
      <WindowHeader
        title={isDark ? "toolbox — zsh" : "Toolbox"}
        isDark={isDark}
        selected={selectedWindow === "skills"}
        headerClass={headerClass}
        onMaximize={() => setExpandWindow("skills")}
      />
      <div
        className={`text-xs flex flex-nowrap items-center overflow-x-auto whitespace-nowrap ${isDark ? "px-4 pt-2 pb-2 font-mono border-b border-gray-700 gap-1.5" : "mx-4 mt-2 p-0.5 bg-[#DDDDE3] rounded-lg gap-0"}`}
      >
        {(["skills", "certs"] as ToolboxTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setToolboxTab(tab)}
            className={`${tabClass(toolboxTab === tab)} ${!isDark ? "flex-1 text-center" : ""}`}
          >
            {isDark ? `[${tab} (${toolboxTabCounts[tab]})]` : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <ToolboxBody
        isDark={isDark}
        toolboxTab={toolboxTab}
        hoveredToolboxIndex={hoveredToolboxIndex}
        setHoveredToolboxIndex={setHoveredToolboxIndex}
        skillsCoursesCerts={skillsCoursesCerts}
      />
    </div>
  );
};

export const ToolboxExpanded = ({
  isDark,
  selectedWindow,
  windowThemeClass,
  headerClass,
  tabClass,
  toolboxTab,
  setToolboxTab,
  hoveredToolboxIndex,
  setHoveredToolboxIndex,
  setSelectedWindow,
  setExpandWindow,
  skillsCoursesCerts,
}: Omit<ToolboxWindowProps, "expandWindow">) => {
  const toolboxTabCounts: Record<ToolboxTab, number> = {
    skills: skillsCoursesCerts.skills.length,
    certs: skillsCoursesCerts.certs.length,
  };

  return (
    <div
      className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-hidden flex flex-col overscroll-none`}
    >
      <WindowHeader
        title={isDark ? "toolbox — zsh" : "Toolbox"}
        isDark={isDark}
        selected={selectedWindow === "skills"}
        headerClass={headerClass}
        sticky
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("skills")}
      />
      <div
        className={`text-xs flex flex-nowrap items-center overflow-x-auto whitespace-nowrap ${isDark ? "px-4 pt-2 pb-2 font-mono border-b border-gray-700 gap-1.5" : "mx-4 mt-2 p-0.5 bg-[#DDDDE3] rounded-lg gap-0"}`}
      >
        {(["skills", "certs"] as ToolboxTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setToolboxTab(tab)}
            className={`${tabClass(toolboxTab === tab)} ${!isDark ? "flex-1 text-center" : ""}`}
          >
            {isDark ? `[${tab} (${toolboxTabCounts[tab]})]` : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-7 pt-5 pb-8">
          {isDark && (
            <p className="font-mono text-[12.5px] mb-5">
              <span className="text-[#3FB950] font-semibold">justin@unc</span>
              <span className="text-[#768390]"> ~ %</span>
              <span className="text-[#E6EDF3] font-semibold">
                {toolboxTab === "skills" ? " skills --all" : " cat certs.txt"}
              </span>
            </p>
          )}
          {toolboxTab === "skills" ? (
            <div className="space-y-5">
              {skillsCoursesCerts.skills.map((group) => (
                <div key={group.group}>
                  <div className="flex items-baseline gap-2 mb-2.5">
                    <h3
                      className={cn(
                        "font-semibold text-[14px]",
                        isDark ? "text-white" : "text-[#1D1D1F]",
                      )}
                    >
                      {group.group}
                    </h3>
                    <span
                      className={cn(
                        "text-[11px] font-mono",
                        isDark ? "text-gray-500" : "text-[#86868B]",
                      )}
                    >
                      {group.items.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className={cn(
                          "rounded-md px-2.5 py-1 text-[12.5px] transition-colors",
                          isDark
                            ? "bg-white/[0.04] border border-white/10 text-gray-300 font-mono hover:border-white/25 hover:text-white"
                            : "bg-white border border-[#E5E5EA] text-[#1D1D1F] apple-shadow",
                        )}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillsCoursesCerts.certs.map((cert) => (
                <div
                  key={cert.name}
                  className={cn(
                    "rounded-xl p-4 transition-all duration-200",
                    isDark
                      ? "bg-white/[0.03] border border-white/10 hover:border-white/20"
                      : "bg-white border border-[#E5E5EA] apple-shadow",
                  )}
                >
                  <h3
                    className={cn(
                      "font-semibold text-[14px] leading-tight",
                      isDark ? "text-white" : "text-[#1D1D1F]",
                    )}
                  >
                    {cert.name}
                  </h3>
                  <p
                    className={cn(
                      "text-[12.5px] mt-1",
                      isDark ? "text-gray-400" : "text-[#515154]",
                    )}
                  >
                    {cert.issuer}
                  </p>
                  <p
                    className={cn(
                      "text-[11px] font-mono mt-1.5",
                      isDark ? "text-[#3FB950]" : "text-[#0E8B3A]",
                    )}
                  >
                    {cert.date}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
