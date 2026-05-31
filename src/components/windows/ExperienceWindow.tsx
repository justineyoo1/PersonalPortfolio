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

type EntryProps = {
  experience: ExperienceItem;
  isDark: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
};

/** Rich timeline entry shown on the expanded experience view — logo, role,
    date, full blurb and a link, with a connecting rail dot. */
const ExperienceEntry: React.FC<EntryProps> = ({
  experience,
  isDark,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => (
  <div className="relative pl-8">
    {/* rail dot */}
    <span
      className={cn(
        "absolute left-[9px] top-6 h-2.5 w-2.5 rounded-full ring-4 transition-colors",
        isDark
          ? isHovered
            ? "bg-[#3FB950] ring-[#0B0F14]"
            : "bg-[#3FB950]/60 ring-[#0B0F14]"
          : isHovered
            ? "bg-[#007AFF] ring-white"
            : "bg-[#C7C7CC] ring-white",
      )}
    />
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={cn(
        "group mb-3 flex gap-4 rounded-xl p-4 cursor-pointer transition-all duration-200",
        isDark
          ? isHovered
            ? "bg-white/[0.06] border border-white/20"
            : "bg-white/[0.03] border border-white/10"
          : isHovered
            ? "bg-white border border-transparent apple-shadow-hover"
            : "bg-white border border-[#E5E5EA] apple-shadow",
      )}
    >
      <div
        className={cn(
          "shrink-0 w-11 h-11 rounded-lg overflow-hidden flex items-center justify-center",
          isDark ? "bg-white" : "bg-[#F2F2F7]",
        )}
      >
        <img
          src={experience.image}
          alt=""
          className="w-full h-full object-contain p-1.5"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className={cn(
              "font-semibold text-[14px] sm:text-[15px] leading-tight truncate",
              isDark ? "text-white" : "text-[#1D1D1F]",
            )}
          >
            {experience.title}
          </h3>
          <span
            className={cn(
              "shrink-0 text-[11px] font-mono",
              isDark ? "text-[#3FB950]" : "text-[#0E8B3A]",
            )}
          >
            {experience.date}
          </span>
        </div>
        <p
          className={cn(
            "mt-1.5 text-[12.5px] sm:text-[13px] leading-relaxed",
            isDark ? "text-gray-400" : "text-[#515154]",
          )}
        >
          {experience.description}
        </p>
        {experience.links?.[0] && (
          <a
            href={experience.links[0].url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "inline-flex items-center gap-1 mt-2.5 text-[12px] font-semibold transition-colors",
              isDark
                ? "text-[#60A5FA] hover:text-[#93c5fd]"
                : "text-[#007AFF] hover:text-[#0066D6]",
            )}
          >
            {experience.links[0].name}
            <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </div>
  </div>
);

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
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-7 pt-5 pb-8">
          {isDark && (
            <p className="font-mono text-[12.5px] mb-5">
              <span className="text-[#3FB950] font-semibold">justin@unc</span>
              <span className="text-[#768390]"> ~ %</span>
              <span className="text-[#E6EDF3] font-semibold"> cat experience/*.md</span>
            </p>
          )}
          <div className="relative">
            <div
              className={cn(
                "absolute left-[13px] top-3 bottom-3 w-px",
                isDark ? "bg-white/10" : "bg-[#E5E5EA]",
              )}
            />
            {filteredExperiences.map((experience, index) => (
              <ExperienceEntry
                key={experience.title}
                experience={experience}
                isDark={isDark}
                isHovered={hoveredExperienceIndex === index}
                onMouseEnter={() => setHoveredExperienceIndex(index)}
                onMouseLeave={() => setHoveredExperienceIndex(null)}
                onClick={() => setSelectExperience(experience.title)}
              />
            ))}
          </div>
          {filteredExperiences.length === 0 && (
            <p className={emptyClasses(isDark)}>no experiences in this category</p>
          )}
        </div>
      </div>
    </div>
  );
};
