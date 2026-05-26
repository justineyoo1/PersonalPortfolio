import React from "react";
import { WindowHeader } from "./WindowHeader";
import { FilterTabs } from "./FilterTabs";
import { ItemRow } from "./ItemRow";
import { DetailCard, buildBullets } from "./DetailCard";
import { BackFooter } from "./BackFooter";
import { cn } from "@/lib/cn";
import type {
  ExperienceFilter,
  ExperienceItem,
  ExperienceViewMode,
} from "@/types";

const EXPERIENCE_FILTERS: readonly ExperienceFilter[] = [
  "all",
  "work",
  "research",
];

const labelForFilter = (filter: ExperienceFilter) =>
  filter === "research" ? "School" : filter.charAt(0).toUpperCase() + filter.slice(1);

const labelForFilterDark = (filter: ExperienceFilter) =>
  filter === "research" ? "school" : filter;

const expandedShellClasses =
  "w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[92vh] lg:max-w-none lg:max-h-none rounded-xl overflow-hidden flex flex-col";

const emptyClasses = (isDark: boolean) =>
  isDark ? "text-gray-400" : "text-gray-500";

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

type CollapsedProps = Omit<
  SharedProps,
  | "experiencesData"
  | "selectExperience"
  | "selectedExperienceLinkIndex"
  | "experienceViewMode"
  | "setExperienceViewMode"
>;

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
}: CollapsedProps) => {
  return (
    <div
      className={cn(
        windowThemeClass,
        "col-span-2 lg:col-span-1 rounded-xl flex flex-col h-[300px] lg:h-[260px] min-h-0 overflow-hidden order-4 row-start-2",
        expandWindow && "opacity-0",
        "transition-opacity duration-500",
      )}
      onClick={() => setSelectedWindow("experience")}
    >
      <WindowHeader
        title={isDark ? "experience — zsh" : "Experience"}
        isDark={isDark}
        selected={selectedWindow === "experience"}
        headerClass={headerClass}
        onMaximize={() => setExpandWindow("experience")}
      />
      <FilterTabs<ExperienceFilter>
        filters={EXPERIENCE_FILTERS}
        active={experienceFilter}
        counts={experienceFilterCounts}
        onChange={(filter) => {
          setExperienceFilter(filter);
          setExperienceIndex(0);
        }}
        isDark={isDark}
        tabClass={tabClass}
        labelFor={isDark ? labelForFilterDark : labelForFilter}
      />
      <div className="my-2 mx-4 flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth">
        {filteredExperiences.map((experience, index) => (
          <ItemRow
            key={experience.title}
            index={index}
            label={experience.compactTitle ?? experience.title}
            isDark={isDark}
            isHovered={hoveredExperienceIndex === index}
            onMouseEnter={() => setHoveredExperienceIndex(index)}
            onMouseLeave={() => setHoveredExperienceIndex(null)}
            onClick={() => {
              setExpandWindow("experience");
              setSelectExperience(experience.title);
            }}
          />
        ))}
        {filteredExperiences.length === 0 && (
          <p className={emptyClasses(isDark)}>no experiences in this category</p>
        )}
      </div>
    </div>
  );
};

type TimelineCardProps = {
  experience: ExperienceItem;
  index: number;
  isDark: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
};

const TimelineCard: React.FC<TimelineCardProps> = ({
  experience,
  isDark,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const isSelected = isHovered;
  const excerpt = experience.description.split(".")[0].trim();

  return (
    <div
      className={cn(
        "relative mb-3 rounded-md cursor-pointer px-3 py-2 transition-all duration-150",
        isSelected
          ? isDark
            ? "bg-gray-200 text-black"
            : "bg-[#007AFF] text-white"
          : isDark
            ? "bg-gray-900/40 text-[#60A5FA] hover:bg-gray-800/55"
            : "bg-[#F2F2F7]/60 text-[#007AFF] hover:bg-[#F2F2F7]",
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <span
        className={cn(
          "absolute -left-5 top-3 h-3 w-3 rounded-full border",
          isDark
            ? "border-gray-500 bg-[#60A5FA]"
            : "border-[#E5E5EA] bg-[#007AFF]",
        )}
      />
      <p className={isDark ? "text-gray-300" : "text-[#86868B]"}>
        {experience.date}
      </p>
      <p className="font-semibold text-[13px] leading-[1.25] whitespace-nowrap overflow-hidden text-ellipsis">
        {isSelected ? (isDark ? "▌ " : "") : "  "}
        {experience.compactTitle ?? experience.title}
      </p>
      <p className={cn("mt-1", isDark ? "text-gray-300" : "text-[#515154]")}>
        {excerpt}
        {excerpt.length > 0 ? "..." : ""}
      </p>
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
  if (selectExperience !== "") {
    const data = experiencesData.find((p) => p.title === selectExperience);
    if (!data) {
      return <p>Experience not found.</p>;
    }
    const bullets = buildBullets(data.description);
    const isFocusedOnBack =
      isDark && selectedExperienceLinkIndex === data.links.length;

    return (
      <div className={cn(windowThemeClass, expandedShellClasses)}>
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
          <DetailCard
            isDark={isDark}
            image={data.image}
            windowTitle={data.window}
            subtitle={data.title}
            date={data.date}
            category={
              data.category === "clubs" ? "school" : data.category ?? undefined
            }
            bulletPoints={bullets}
            links={data.links}
            selectedLinkIndex={selectedExperienceLinkIndex}
          />
        </div>
        <BackFooter
          isDark={isDark}
          label="experiences"
          isFocused={isFocusedOnBack}
          onClick={() => {
            setSelectExperience("");
            setExpandWindow("");
          }}
        />
      </div>
    );
  }

  return (
    <div className={cn(windowThemeClass, expandedShellClasses)}>
      <WindowHeader
        title={isDark ? "experience — zsh" : "Experience"}
        isDark={isDark}
        selected={selectedWindow === "experience"}
        headerClass={headerClass}
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
      />
      <FilterTabs<ExperienceFilter>
        filters={EXPERIENCE_FILTERS}
        active={experienceFilter}
        counts={experienceFilterCounts}
        onChange={(filter) => {
          setExperienceFilter(filter);
          setExperienceIndex(0);
        }}
        isDark={isDark}
        tabClass={tabClass}
        labelFor={isDark ? labelForFilterDark : labelForFilter}
      />
      <div
        className={cn(
          "text-xs flex",
          isDark
            ? "px-4 pt-2 font-mono gap-1.5"
            : "mx-4 mt-1 p-0.5 bg-[#DDDDE3] rounded-lg gap-0 w-fit",
        )}
      >
        {(["list", "timeline"] as ExperienceViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setExperienceViewMode(mode)}
            className={cn(tabClass(experienceViewMode === mode), !isDark && "px-4")}
          >
            {isDark ? `[${mode}]` : mode}
          </button>
        ))}
      </div>
      <div className="mt-2 mx-4 pb-4 overflow-y-auto overscroll-contain scroll-smooth min-h-0">
        {experienceViewMode === "list" ? (
          filteredExperiences.map((experience, index) => (
            <ItemRow
              key={experience.title}
              index={index}
              label={experience.title}
              variant="expanded"
              isDark={isDark}
              isHovered={hoveredExperienceIndex === index}
              onMouseEnter={() => setHoveredExperienceIndex(index)}
              onMouseLeave={() => setHoveredExperienceIndex(null)}
              onClick={() => setSelectExperience(experience.title)}
            />
          ))
        ) : (
          <div className="relative pl-6">
            <div
              className={cn(
                "absolute left-2.5 top-1 bottom-2 w-px",
                isDark ? "bg-gray-700" : "bg-[#E5E5EA]",
              )}
            />
            {filteredExperiences.map((experience, index) => (
              <TimelineCard
                key={experience.title}
                experience={experience}
                index={index}
                isDark={isDark}
                isHovered={hoveredExperienceIndex === index}
                onMouseEnter={() => setHoveredExperienceIndex(index)}
                onMouseLeave={() => setHoveredExperienceIndex(null)}
                onClick={() => setSelectExperience(experience.title)}
              />
            ))}
          </div>
        )}
        {filteredExperiences.length === 0 && (
          <p className={emptyClasses(isDark)}>no experiences in this category</p>
        )}
      </div>
    </div>
  );
};
