import React from "react";
import { WindowHeader } from "./WindowHeader";

type ExperienceFilter = "all" | "work" | "research";
type ExperienceViewMode = "list" | "timeline";

type ExperienceItem = {
  title: string;
  compactTitle?: string;
  window: string;
  category?: string;
  date: string;
  description: string;
  image: string;
  links: Array<{ name: string; url: string }>;
};

type SharedProps = {
  isDark: boolean;
  selectedWindow: string;
  expandWindow: string;
  windowThemeClass: string;
  headerClass: (selected: boolean) => string;
  tabClass: (active: boolean) => string;
  experienceFilter: ExperienceFilter;
  setExperienceFilter: (value: ExperienceFilter) => void;
  setExperienceIndex: (value: number) => void;
  hoveredExperienceIndex: number | null;
  setHoveredExperienceIndex: (value: number | null) => void;
  filteredExperiences: ExperienceItem[];
  experiencesData: ExperienceItem[];
  selectExperience: string;
  setSelectExperience: (value: string) => void;
  selectedExperienceLinkIndex: number;
  setExpandWindow: (value: string) => void;
  setSelectedWindow: (value: string) => void;
  experienceViewMode: ExperienceViewMode;
  setExperienceViewMode: (value: ExperienceViewMode) => void;
  experienceFilterCounts: Record<ExperienceFilter, number>;
};

export const ExperienceCollapsed = ({
  isDark,
  selectedWindow,
  expandWindow,
  windowThemeClass,
  headerClass,
  tabClass,
  experienceFilter,
  setExperienceFilter,
  setExperienceIndex,
  hoveredExperienceIndex,
  setHoveredExperienceIndex,
  filteredExperiences,
  setExpandWindow,
  setSelectedWindow,
  setSelectExperience,
  experienceFilterCounts,
}: Omit<
  SharedProps,
  | "experiencesData"
  | "selectExperience"
  | "selectedExperienceLinkIndex"
  | "experienceViewMode"
  | "setExperienceViewMode"
>) => {
  const filters: ExperienceFilter[] = ["all", "work", "research"];

  return (
    <div
      className={`${windowThemeClass} col-span-2 lg:col-span-1 rounded-xl flex flex-col h-[300px] lg:h-[260px] min-h-0 overflow-hidden order-4 row-start-2 ${
        expandWindow ? "opacity-0" : ""
      } transition-opacity duration-500`}
      onClick={() => setSelectedWindow("experience")}
    >
      <WindowHeader
        title={isDark ? "experience — zsh" : "Experience"}
        isDark={isDark}
        selected={selectedWindow === "experience"}
        headerClass={headerClass}
        onMaximize={() => setExpandWindow("experience")}
      />
      <div
        className={`text-xs flex ${isDark ? "px-4 pt-2 pb-2 font-mono border-b border-gray-700 gap-1.5" : "mx-4 mt-2 p-0.5 bg-[#DDDDE3] rounded-lg gap-0"}`}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setExperienceFilter(filter);
              setExperienceIndex(0);
            }}
            className={`${tabClass(experienceFilter === filter)} ${!isDark ? "flex-1 text-center" : ""}`}
          >
            {isDark ? `[${filter === "research" ? "school" : filter} (${experienceFilterCounts[filter]})]` : (filter === "research" ? "School" : filter.charAt(0).toUpperCase() + filter.slice(1))}
          </button>
        ))}
      </div>
      <div className="my-2 mx-4 flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth">
        {filteredExperiences.map((experience, index) => {
          const isHovered = hoveredExperienceIndex === index;
          const isSelected = isHovered;

          return (
            <div
              key={index}
              className={`${isDark ? "text-[13px] lg:text-sm" : "text-[14px]"} leading-normal transition-all duration-200 cursor-pointer my-1.5 lg:my-1 ${isDark ? "h-7" : "h-9"} flex items-center px-3 whitespace-nowrap overflow-hidden text-ellipsis ${isDark ? "rounded-md" : "rounded-xl"} ${
                isSelected
                  ? isDark
                    ? "bg-gray-200 text-black"
                    : "bg-[#007AFF]/12 text-[#007AFF] font-bold"
                  : isHovered
                    ? isDark
                      ? "bg-gray-800/55 text-blue-200"
                      : "bg-[#E8E8ED] text-[#1D1D1F] font-semibold"
                    : isDark
                      ? "bg-transparent text-[#60A5FA]"
                      : "bg-transparent text-[#1D1D1F] font-medium"
              }`}
              onMouseEnter={() => setHoveredExperienceIndex(index)}
              onMouseLeave={() => setHoveredExperienceIndex(null)}
              onClick={() => {
                setExpandWindow("experience");
                setSelectExperience(experience.title);
              }}
            >
              {isDark ? (isSelected ? "▌ " : "  ") : <span className={`${isSelected ? "text-[#007AFF]" : "text-[#B0B0B5]"} text-[11px] shrink-0 font-mono mr-2.5 tracking-tight`}>/{String(index + 1).padStart(2, "0")}</span>}
              {experience.compactTitle ?? experience.title}
            </div>
          );
        })}
        {filteredExperiences.length === 0 && (
          <p className={isDark ? "text-gray-400" : "text-gray-500"}>
            no experiences in this category
          </p>
        )}
      </div>
    </div>
  );
};

export const ExperienceExpanded = ({
  isDark,
  selectedWindow,
  windowThemeClass,
  headerClass,
  tabClass,
  experienceFilter,
  setExperienceFilter,
  setExperienceIndex,
  hoveredExperienceIndex,
  setHoveredExperienceIndex,
  filteredExperiences,
  experiencesData,
  selectExperience,
  setSelectExperience,
  selectedExperienceLinkIndex,
  setExpandWindow,
  experienceViewMode,
  setExperienceViewMode,
  experienceFilterCounts,
}: SharedProps) => {
  const filters: ExperienceFilter[] = ["all", "work", "research"];

  if (selectExperience !== "") {
    const selectedExperienceData = experiencesData.find(
      (p) => p.title === selectExperience,
    );
    const bulletPoints = selectedExperienceData?.description
      .split(". ")
      .map((sentence) => sentence.trim())
      .filter(Boolean)
      .map((sentence) =>
        sentence.endsWith(".") ? sentence : `${sentence}.`,
      ) ?? [];

    if (!selectedExperienceData) {
      return <p>Experience not found.</p>;
    }

    return (
      <div
        className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[92vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-hidden flex flex-col`}
      >
        <WindowHeader
          title={selectExperience}
          isDark={isDark}
          selected={selectedWindow === "experience"}
          headerClass={headerClass}
          sticky
          onClose={() => setExpandWindow("")}
          onMinimize={() => {
            setExpandWindow("");
            setSelectExperience("");
          }}
        />
        <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth min-h-0">
          {isDark ? (
            /* Dark mode - unchanged terminal layout */
            <div className="m-4 pb-4">
              <img
                src={selectedExperienceData.image}
                alt={selectedExperienceData.title}
                className="w-full h-48 object-contain rounded-lg mb-4 max-w-2xl mx-auto"
              />
              <div className="max-w-[70ch] mx-auto mt-1">
                <p className="text-xl lg:text-2xl font-semibold tracking-[0.02em] text-blue-300">
                  {selectedExperienceData.window}
                </p>
                <p className="text-sm font-semibold mt-1 text-gray-200">
                  {selectedExperienceData.date}
                </p>
              </div>
              <ul className="mt-2 max-w-[70ch] mx-auto list-disc pl-5 space-y-1 leading-relaxed text-gray-200">
                {bulletPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="mt-4 max-w-[70ch] mx-auto flex flex-col">
                {selectedExperienceData.links.map((link, index) => (
                  <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name}
                    className={`inline-block rounded transition-all duration-150 text-gray-200 ${index === selectedExperienceLinkIndex ? " font-bold" : ""}`}>
                    {link.name} {index === selectedExperienceLinkIndex ? "❮ " : ""}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            /* Light mode - App Store card layout */
            <div className="pb-4">
              {/* Hero image with gradient overlay */}
              <div className="relative w-full h-56 lg:h-64 overflow-hidden">
                <img
                  src={selectedExperienceData.image}
                  alt={selectedExperienceData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    {selectedExperienceData.window}
                  </h2>
                  <p className="text-sm text-white/80 font-medium mt-1">
                    {selectedExperienceData.title}
                  </p>
                </div>
              </div>

              {/* Metadata pills */}
              <div className="flex flex-wrap gap-2 px-5 lg:px-6 mt-4">
                <span className="bg-[#E8E8ED] text-[#515154] text-xs font-semibold px-3 py-1.5 rounded-lg">
                  {selectedExperienceData.date}
                </span>
                {selectedExperienceData.category && (
                  <span className="bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold px-3 py-1.5 rounded-lg">
                    {selectedExperienceData.category === "clubs" ? "school" : selectedExperienceData.category}
                  </span>
                )}
              </div>

              {/* Description card */}
              <div className="mx-5 lg:mx-6 mt-4 bg-[#F0F0F5] rounded-2xl p-5">
                <div className="space-y-3">
                  {bulletPoints.map((point) => (
                    <p key={point} className="text-[15px] leading-relaxed text-[#1D1D1F]">
                      {point}
                    </p>
                  ))}
                </div>
              </div>

              {/* Links as pill buttons */}
              {selectedExperienceData.links.length > 0 && (
                <div className="flex flex-wrap gap-3 px-5 lg:px-6 mt-4">
                  {selectedExperienceData.links.map((link) => (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={link.name}
                      className="inline-flex items-center gap-1.5 bg-[#007AFF] text-white text-sm font-semibold rounded-full px-5 py-2.5 apple-transition hover:bg-[#0066D6]"
                    >
                      {link.name}
                      <span className="text-white/70">↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`shrink-0 px-5 py-3 ${
            isDark ? "border-t border-gray-700 bg-gray-900/35" : ""
          }`}
        >
          <button
            className={`rounded px-2 py-1 text-sm transition-all duration-150 ${
              isDark
                ? selectedExperienceLinkIndex === selectedExperienceData.links.length
                  ? "text-gray-200 underline decoration-gray-500 underline-offset-2"
                  : "text-gray-400 hover:text-gray-200 hover:underline"
                : "text-[#007AFF] font-medium hover:text-[#0066D6] apple-transition"
            }`}
            onClick={() => {
              setSelectExperience("");
              setExpandWindow("");
            }}
          >
            {isDark ? (
              <>back to experiences{selectedExperienceLinkIndex === selectedExperienceData.links.length ? " <" : ""}</>
            ) : (
              "← Back"
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[92vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-hidden flex flex-col`}
    >
      <WindowHeader
        title={isDark ? "experience — zsh" : "Experience"}
        isDark={isDark}
        selected={selectedWindow === "experience"}
        headerClass={headerClass}
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
      />
      <div
        className={`text-xs flex ${isDark ? "px-4 pt-2 pb-2 font-mono border-b border-gray-700 gap-1.5" : "mx-4 mt-2 p-0.5 bg-[#DDDDE3] rounded-lg gap-0"}`}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setExperienceFilter(filter);
              setExperienceIndex(0);
            }}
            className={`${tabClass(experienceFilter === filter)} ${!isDark ? "flex-1 text-center" : ""}`}
          >
            {isDark ? `[${filter === "research" ? "school" : filter} (${experienceFilterCounts[filter]})]` : (filter === "research" ? "School" : filter.charAt(0).toUpperCase() + filter.slice(1))}
          </button>
        ))}
      </div>
      <div className={`text-xs flex ${isDark ? "px-4 pt-2 font-mono gap-1.5" : "mx-4 mt-1 p-0.5 bg-[#DDDDE3] rounded-lg gap-0 w-fit"}`}>
        {(["list", "timeline"] as ExperienceViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setExperienceViewMode(mode)}
            className={`${tabClass(experienceViewMode === mode)} ${!isDark ? "px-4" : ""}`}
          >
            {isDark ? "[" : ""}{mode}{isDark ? "]" : ""}
          </button>
        ))}
      </div>
      <div className="mt-2 mx-4 pb-4 overflow-y-auto overscroll-contain scroll-smooth min-h-0">
        {experienceViewMode === "list" ? (
          <>
            {filteredExperiences.map((experience, index) => {
              const isHovered = hoveredExperienceIndex === index;
              const isSelected = isHovered;

              return (
                <div
                  key={index}
                  className={`rounded-md transition-all duration-150 cursor-pointer px-2 py-1 ${
                    isSelected
                      ? isDark
                        ? "bg-gray-200 text-black"
                        : "bg-[#007AFF]/10 text-[#007AFF] font-semibold"
                      : isHovered
                        ? isDark
                          ? "bg-gray-800/55 text-blue-200"
                          : "bg-[#F2F2F7] text-[#1D1D1F]"
                        : isDark
                          ? "bg-transparent text-[#60A5FA]"
                          : "bg-transparent text-[#1D1D1F] font-medium"
                  }`}
                  onMouseEnter={() => setHoveredExperienceIndex(index)}
                  onMouseLeave={() => setHoveredExperienceIndex(null)}
                  onClick={() => setSelectExperience(experience.title)}
                >
                  {isDark ? (isSelected ? "▌ " : "  ") : <span className={`${isSelected ? "text-[#007AFF]" : "text-[#86868B]"} text-[12px] w-5 shrink-0 font-medium mr-1`}>{index + 1}</span>}
                  {experience.title}
                </div>
              );
            })}
          </>
        ) : (
          <div className="relative pl-6">
            <div
              className={`absolute left-2.5 top-1 bottom-2 w-px ${
                isDark ? "bg-gray-700" : "bg-[#E5E5EA]"
              }`}
            />
            {filteredExperiences.map((experience, index) => {
              const isHovered = hoveredExperienceIndex === index;
              const isSelected = isHovered;
              const excerpt = experience.description.split(".")[0].trim();

              return (
                <div
                  key={experience.title}
                  className={`relative mb-3 rounded-md cursor-pointer px-3 py-2 transition-all duration-150 ${
                    isSelected
                      ? isDark
                        ? "bg-gray-200 text-black"
                        : "bg-[#007AFF] text-white"
                      : isDark
                        ? "bg-gray-900/40 text-[#60A5FA] hover:bg-gray-800/55"
                        : "bg-[#F2F2F7]/60 text-[#007AFF] hover:bg-[#F2F2F7]"
                  }`}
                  onMouseEnter={() => setHoveredExperienceIndex(index)}
                  onMouseLeave={() => setHoveredExperienceIndex(null)}
                  onClick={() => setSelectExperience(experience.title)}
                >
                  <span
                    className={`absolute -left-5 top-3 h-3 w-3 rounded-full border ${
                      isDark
                        ? "border-gray-500 bg-[#60A5FA]"
                        : "border-[#E5E5EA] bg-[#007AFF]"
                    }`}
                  />
                  <p className={isDark ? "text-gray-300" : "text-[#86868B]"}>
                    {experience.date}
                  </p>
                  <p className="font-semibold text-[13px] leading-[1.25] whitespace-nowrap overflow-hidden text-ellipsis">
                    {isSelected ? (isDark ? "▌ " : "") : "  "}
                    {experience.compactTitle ?? experience.title}
                  </p>
                  <p className={`mt-1 ${isDark ? "text-gray-300" : "text-[#515154]"}`}>
                    {excerpt}
                    {excerpt.length > 0 ? "..." : ""}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        {filteredExperiences.length === 0 && (
          <p className={isDark ? "text-gray-400" : "text-gray-500"}>
            no experiences in this category
          </p>
        )}
      </div>
    </div>
  );
};
