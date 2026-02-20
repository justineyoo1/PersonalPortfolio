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
        title="experience — zsh"
        selected={selectedWindow === "experience"}
        headerClass={headerClass}
        onMaximize={() => setExpandWindow("experience")}
      />
      <div
        className={`px-4 pt-2 pb-2 text-xs font-mono flex gap-2 border-b ${
          isDark ? "border-gray-700" : "border-gray-300"
        }`}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setExperienceFilter(filter);
              setExperienceIndex(0);
            }}
            className={tabClass(experienceFilter === filter)}
          >
            [{filter === "research" ? "school" : filter} (
            {experienceFilterCounts[filter]})]
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
              className={`rounded-md text-[12px] lg:text-[13px] leading-[1.25] transition-all duration-150 cursor-pointer my-1.5 lg:my-1 h-7 flex items-center px-2 whitespace-nowrap overflow-hidden text-ellipsis ${
                isSelected
                  ? isDark
                    ? "bg-gray-200 text-black"
                    : "bg-gray-800 text-white"
                  : isHovered
                    ? isDark
                      ? "bg-gray-800/55 text-blue-200"
                      : "bg-gray-200/65 text-[#2563EB]"
                    : isDark
                      ? "bg-transparent text-[#60A5FA]"
                      : "bg-transparent text-[#2563EB]"
              }`}
              onMouseEnter={() => setHoveredExperienceIndex(index)}
              onMouseLeave={() => setHoveredExperienceIndex(null)}
              onClick={() => {
                setExpandWindow("experience");
                setSelectExperience(experience.title);
              }}
            >
              {isSelected ? "▌ " : "  "}
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
          selected={selectedWindow === "experience"}
          headerClass={headerClass}
          sticky
          onClose={() => setExpandWindow("")}
          onMinimize={() => {
            setExpandWindow("");
            setSelectExperience("");
          }}
        />
        <div className="m-4 flex-1 overflow-y-auto overscroll-contain scroll-smooth min-h-0">
          <div className="pb-4">
            <img
              src={selectedExperienceData.image}
              alt={selectedExperienceData.title}
              className="w-full h-48 object-contain rounded-lg mb-4 max-w-2xl mx-auto"
            />
            <div className="max-w-[70ch] mx-auto mt-1">
              <p
                className={`text-xl lg:text-2xl font-semibold tracking-[0.02em] ${
                  isDark ? "text-blue-300" : "text-blue-700"
                }`}
              >
                {selectedExperienceData.window}
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {selectedExperienceData.date}
              </p>
            </div>
            <ul
              className={`mt-2 max-w-[70ch] mx-auto list-disc pl-5 space-y-1 leading-relaxed ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {bulletPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="mt-4 max-w-[70ch] mx-auto flex flex-col">
              {selectedExperienceData.links.map((link, index) => (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={link.name}
                  className={`inline-block rounded transition-all duration-150 ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  } ${index === selectedExperienceLinkIndex ? " font-bold" : ""}`}
                >
                  {link.name} {index === selectedExperienceLinkIndex ? "❮ " : ""}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`shrink-0 px-4 py-3 border-t ${
            isDark ? "border-gray-700 bg-gray-900/35" : "border-gray-300 bg-gray-100/55"
          }`}
        >
          <button
            className={`rounded px-2 py-1 text-sm transition-all duration-150 ${
              selectedExperienceLinkIndex === selectedExperienceData.links.length
                ? isDark
                  ? "text-gray-200 underline decoration-gray-500 underline-offset-2"
                  : "text-gray-800 underline decoration-gray-500 underline-offset-2"
                : isDark
                  ? "text-gray-400 hover:text-gray-200 hover:underline"
                  : "text-gray-500 hover:text-gray-800 hover:underline"
            }`}
            onClick={() => {
              setSelectExperience("");
              setExpandWindow("");
            }}
          >
            back to experiences
            {selectedExperienceLinkIndex === selectedExperienceData.links.length
              ? " <"
              : ""}
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
        title="experience — zsh"
        selected={selectedWindow === "experience"}
        headerClass={headerClass}
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
      />
      <div
        className={`px-4 pt-2 pb-2 text-xs font-mono flex gap-2 border-b ${
          isDark ? "border-gray-700" : "border-gray-300"
        }`}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setExperienceFilter(filter);
              setExperienceIndex(0);
            }}
            className={tabClass(experienceFilter === filter)}
          >
            [{filter === "research" ? "school" : filter} (
            {experienceFilterCounts[filter]})]
          </button>
        ))}
      </div>
      <div className="px-4 pt-2 text-xs font-mono flex gap-2">
        {(["list", "timeline"] as ExperienceViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setExperienceViewMode(mode)}
            className={tabClass(experienceViewMode === mode)}
          >
            [{mode}]
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
                        : "bg-gray-800 text-white"
                      : isHovered
                        ? isDark
                          ? "bg-gray-800/55 text-blue-200"
                          : "bg-gray-200/65 text-[#2563EB]"
                        : isDark
                          ? "bg-transparent text-[#60A5FA]"
                          : "bg-transparent text-[#2563EB]"
                  }`}
                  onMouseEnter={() => setHoveredExperienceIndex(index)}
                  onMouseLeave={() => setHoveredExperienceIndex(null)}
                  onClick={() => setSelectExperience(experience.title)}
                >
                  {isSelected ? "▌ " : "  "}
                  {experience.title}
                </div>
              );
            })}
          </>
        ) : (
          <div className="relative pl-6">
            <div
              className={`absolute left-2.5 top-1 bottom-2 w-px ${
                isDark ? "bg-gray-700" : "bg-gray-300"
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
                        : "bg-gray-800 text-white"
                      : isDark
                        ? "bg-gray-900/40 text-[#60A5FA] hover:bg-gray-800/55"
                        : "bg-gray-100/40 text-[#2563EB] hover:bg-gray-200/65"
                  }`}
                  onMouseEnter={() => setHoveredExperienceIndex(index)}
                  onMouseLeave={() => setHoveredExperienceIndex(null)}
                  onClick={() => setSelectExperience(experience.title)}
                >
                  <span
                    className={`absolute -left-5 top-3 h-3 w-3 rounded-full border ${
                      isDark
                        ? "border-gray-500 bg-[#60A5FA]"
                        : "border-gray-400 bg-[#2563EB]"
                    }`}
                  />
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                    {experience.date}
                  </p>
                  <p className="font-semibold text-[13px] leading-[1.25] whitespace-nowrap overflow-hidden text-ellipsis">
                    {isSelected ? "▌ " : "  "}
                    {experience.compactTitle ?? experience.title}
                  </p>
                  <p className={`mt-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
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
