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

/** Compact row for the expanded view's left rail (master–detail layout). */
const RailRow: React.FC<{
  experience: ExperienceItem;
  isDark: boolean;
  isActive: boolean;
  onClick: () => void;
}> = ({ experience, isDark, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-current={isActive ? "true" : undefined}
    className={cn(
      "w-full text-left flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150",
      isDark
        ? isActive
          ? "bg-white/[0.09]"
          : "hover:bg-white/[0.05]"
        : isActive
          ? "bg-[#007AFF]/[0.09]"
          : "hover:bg-black/[0.035]",
    )}
  >
    <span
      className={cn(
        "shrink-0 w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center",
        isDark ? "bg-white" : "bg-[#F2F2F7]",
      )}
    >
      <img
        src={experience.image}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-contain p-1"
        loading="lazy"
      />
    </span>
    <span className="min-w-0 flex-1">
      <span
        className={cn(
          "block text-[13.5px] font-medium leading-tight truncate",
          isDark
            ? isActive
              ? "text-white"
              : "text-gray-300"
            : isActive
              ? "text-[#007AFF]"
              : "text-[#1D1D1F]",
        )}
      >
        {experience.compactTitle ?? experience.title}
      </span>
      <span
        className={cn(
          "block text-[11.5px] mt-0.5 tabular-nums",
          isDark ? "text-gray-500" : "text-[#86868B]",
        )}
      >
        {experience.date}
      </span>
    </span>
  </button>
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
  const data = selectExperience
    ? experiencesData.find((p) => p.title === selectExperience)
    : undefined;
  const bullets = data ? buildBullets(data.description) : [];
  const isFocusedOnBack =
    isDark && data ? selectedExperienceLinkIndex === data.links.length : false;

  // Master–detail: the list stays put in a left rail and the detail fills the
  // right pane, so a short entry no longer leaves a full screen of dead space.
  // Below `lg` there isn't room for two columns, so the panes swap.
  return (
    <div className={cn(windowThemeClass, expandedShellClasses)}>
      <WindowHeader
        title={isDark ? "experience — zsh" : "Experience"}
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

      <div className="flex-1 min-h-0 flex">
        {/* Left rail: filters + compact list */}
        <div
          className={cn(
            "flex-col min-h-0 w-full lg:w-[320px] lg:shrink-0",
            data ? "hidden lg:flex" : "flex",
            isDark ? "lg:border-r lg:border-white/10" : "lg:border-r lg:border-black/[0.07]",
          )}
        >
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
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth px-2.5 py-2 space-y-0.5">
            {filteredExperiences.map((experience) => (
              <RailRow
                key={experience.title}
                experience={experience}
                isDark={isDark}
                isActive={experience.title === selectExperience}
                onClick={() => setSelectExperience(experience.title)}
              />
            ))}
            {filteredExperiences.length === 0 && (
              <p className={cn("px-2 py-3 text-[13px]", emptyClasses(isDark))}>
                no experiences in this category
              </p>
            )}
          </div>
        </div>

        {/* Right pane: detail, or a prompt when nothing is selected */}
        <div
          className={cn(
            "flex-1 min-h-0 flex-col",
            data ? "flex" : "hidden lg:flex",
          )}
        >
          {data ? (
            <>
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth">
                <DetailCard
                  isDark={isDark}
                  image={data.image}
                  windowTitle={data.window}
                  subtitle={data.title}
                  org={data.org}
                  date={data.date}
                  category={
                    data.category === "clubs" ? "school" : data.category ?? undefined
                  }
                  bulletPoints={bullets}
                  links={data.links}
                  selectedLinkIndex={selectedExperienceLinkIndex}
                />
              </div>
              {/* On wide screens the list is always visible, so "back" is only
                  meaningful in the stacked layout. */}
              <div className="lg:hidden">
                <BackFooter
                  isDark={isDark}
                  label="experiences"
                  isFocused={isFocusedOnBack}
                  onClick={() => setSelectExperience("")}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center px-8">
              <p
                className={cn(
                  "text-[13.5px] text-center",
                  isDark ? "font-mono text-gray-600" : "text-[#A1A1A6]",
                )}
              >
                {isDark
                  ? "select a role to read the details"
                  : "Select a role to read the details"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
