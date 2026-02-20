import React, { useEffect, useMemo, useState } from "react";
import { WindowHeader } from "./WindowHeader";

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

  const previewText =
    selectedRow && selectedRow.details.length > 120
      ? `${selectedRow.details.slice(0, 120)}...`
      : selectedRow?.details ?? "";

  return (
    <div className="mt-2 mx-4 pb-2 flex-1 min-h-0 flex flex-col gap-2 font-mono overflow-hidden">
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
                className={`w-full h-7 rounded-md transition-all duration-150 text-left px-2 text-[12px] leading-none flex items-center gap-2 ${
                  isSelected
                    ? isDark
                      ? "bg-gray-200 text-black"
                      : "bg-gray-800 text-white"
                    : isDark
                      ? "bg-transparent text-[#60A5FA] hover:bg-gray-800/55"
                      : "bg-transparent text-[#2563EB] hover:bg-gray-200/65"
                }`}
                onMouseEnter={() => setHoveredToolboxIndex(index)}
                onMouseLeave={() => setHoveredToolboxIndex(null)}
                onClick={() => setSelectedToolboxIndex(index)}
              >
                <span className="shrink-0">{isSelected ? "▌" : " "}</span>
                <span className="min-w-0 truncate">{row.label}</span>
                <span className="ml-auto shrink-0 opacity-80 text-[11px]">
                  {row.meta}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`h-[92px] shrink-0 rounded-md border px-2 py-2 overflow-hidden ${
          isDark ? "border-gray-700 bg-gray-900/35" : "border-gray-300 bg-gray-100/60"
        }`}
      >
        {selectedRow ? (
          <>
            <p className={`text-[12px] font-semibold truncate ${isDark ? "text-gray-100" : "text-gray-900"}`}>
              {selectedRow.label}
            </p>
            <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
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
        title="toolbox — zsh"
        selected={selectedWindow === "skills"}
        headerClass={headerClass}
        onMaximize={() => setExpandWindow("skills")}
      />
      <div
        className={`px-4 pt-2 pb-2 text-xs font-mono flex flex-nowrap items-center gap-2 border-b overflow-x-auto whitespace-nowrap ${
          isDark ? "border-gray-700" : "border-gray-300"
        }`}
      >
        {(["skills", "certs"] as ToolboxTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setToolboxTab(tab)}
            className={tabClass(toolboxTab === tab)}
          >
            [{tab} ({toolboxTabCounts[tab]})]
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
        title="toolbox — zsh"
        selected={selectedWindow === "skills"}
        headerClass={headerClass}
        sticky
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("skills")}
      />
      <div
        className={`px-4 pt-2 pb-2 text-xs font-mono flex flex-nowrap items-center gap-2 border-b overflow-x-auto whitespace-nowrap ${
          isDark ? "border-gray-700" : "border-gray-300"
        }`}
      >
        {(["skills", "certs"] as ToolboxTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setToolboxTab(tab)}
            className={tabClass(toolboxTab === tab)}
          >
            [{tab} ({toolboxTabCounts[tab]})]
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
