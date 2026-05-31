import React from "react";
import { WindowHeader } from "./WindowHeader";
import { FilterTabs } from "./FilterTabs";
import { ItemRow } from "./ItemRow";
import { DetailCard, buildBullets } from "./DetailCard";
import { BackFooter } from "./BackFooter";
import { cn } from "@/lib/cn";
import type { ProjectFilter, ProjectItem } from "@/types";

const PROJECT_FILTERS: readonly ProjectFilter[] = ["all", "swe", "ml/data"];

const labelForFilter = (filter: ProjectFilter) =>
  filter.charAt(0).toUpperCase() + filter.slice(1);

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
  projectFilter: ProjectFilter;
  setProjectFilter: (value: ProjectFilter) => void;
  setProjectIndex: (value: number) => void;
  hoveredProjectIndex: number | null;
  setHoveredProjectIndex: (value: number | null) => void;
  filteredProjects: ProjectItem[];
  projectsData: ProjectItem[];
  selectProject: string;
  setSelectProject: (value: string) => void;
  selectedLinkIndex: number;
  setExpandWindow: (value: string) => void;
  setSelectedWindow: (value: string) => void;
  projectFilterCounts: Record<ProjectFilter, number>;
};

type CollapsedProps = Omit<
  SharedProps,
  "projectsData" | "selectProject" | "selectedLinkIndex"
>;

export const ProjectsCollapsed = ({
  isDark,
  selectedWindow,
  expandWindow,
  windowThemeClass,
  headerClass,
  tabClass,
  projectFilter,
  setProjectFilter,
  setProjectIndex,
  hoveredProjectIndex,
  setHoveredProjectIndex,
  filteredProjects,
  setExpandWindow,
  setSelectedWindow,
  setSelectProject,
  projectFilterCounts,
}: CollapsedProps) => {
  return (
    <div
      className={cn(
        windowThemeClass,
        "col-span-2 lg:col-span-1 rounded-xl flex flex-col h-[300px] lg:h-[260px] min-h-0 overflow-hidden order-5 row-start-3 lg:row-start-2",
        expandWindow && "opacity-0",
        "transition-opacity duration-500",
      )}
      onClick={() => setSelectedWindow("projects")}
    >
      <WindowHeader
        title={isDark ? "projects — zsh" : "Projects"}
        isDark={isDark}
        selected={selectedWindow === "projects"}
        headerClass={headerClass}
        onMaximize={() => setExpandWindow("projects")}
      />
      <FilterTabs<ProjectFilter>
        filters={PROJECT_FILTERS}
        active={projectFilter}
        counts={projectFilterCounts}
        onChange={(filter) => {
          setProjectFilter(filter);
          setProjectIndex(0);
        }}
        isDark={isDark}
        tabClass={tabClass}
        labelFor={isDark ? (f) => f : labelForFilter}
      />
      <div className="mt-2 mx-4 flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth">
        {filteredProjects.map((project, index) => (
          <ItemRow
            key={project.title}
            index={index}
            label={project.compactTitle ?? project.title}
            isDark={isDark}
            isHovered={hoveredProjectIndex === index}
            onMouseEnter={() => setHoveredProjectIndex(index)}
            onMouseLeave={() => setHoveredProjectIndex(null)}
            onClick={() => {
              setExpandWindow("projects");
              setProjectIndex(index);
              setSelectProject(project.title);
            }}
          />
        ))}
        {filteredProjects.length === 0 && (
          <p className={emptyClasses(isDark)}>no projects in this category</p>
        )}
      </div>
    </div>
  );
};

type ProjectEntryProps = {
  project: ProjectItem;
  isDark: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
};

/** Rich project card for the expanded grid — name, year, blurb, tag, repo. */
const ProjectEntry: React.FC<ProjectEntryProps> = ({
  project,
  isDark,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    className={cn(
      "group flex flex-col rounded-xl p-4 sm:p-5 cursor-pointer transition-all duration-200",
      isDark
        ? isHovered
          ? "bg-white/[0.06] border border-white/20"
          : "bg-white/[0.03] border border-white/10"
        : isHovered
          ? "bg-white border border-transparent apple-shadow-hover"
          : "bg-white border border-[#E5E5EA] apple-shadow",
    )}
  >
    <div className="flex items-baseline justify-between gap-3">
      <h3
        className={cn(
          "font-semibold text-[14.5px] sm:text-[15px] leading-tight",
          isDark ? "text-white" : "text-[#1D1D1F]",
        )}
      >
        {project.title}
      </h3>
      <span
        className={cn(
          "shrink-0 text-[11px] font-mono",
          isDark ? "text-[#3FB950]" : "text-[#0E8B3A]",
        )}
      >
        {project.date}
      </span>
    </div>
    <p
      className={cn(
        "mt-2 text-[12.5px] leading-relaxed flex-1",
        isDark ? "text-gray-400" : "text-[#515154]",
      )}
    >
      {project.description}
    </p>
    <div className="flex items-center justify-between gap-2 mt-3.5">
      <span
        className={cn(
          "text-[10px] font-mono px-1.5 py-0.5 rounded",
          isDark ? "bg-white/[0.06] text-gray-400" : "bg-[#F2F2F7] text-[#86868B]",
        )}
      >
        {project.category}
      </span>
      {project.links?.[0] && (
        <a
          href={project.links[0].url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "inline-flex items-center gap-1 text-[12px] font-semibold transition-colors",
            isDark
              ? "text-[#60A5FA] hover:text-[#93c5fd]"
              : "text-[#007AFF] hover:text-[#0066D6]",
          )}
        >
          {project.links[0].name}
          <span aria-hidden>↗</span>
        </a>
      )}
    </div>
  </div>
);

export const ProjectsExpanded = ({
  isDark,
  selectedWindow,
  windowThemeClass,
  headerClass,
  tabClass,
  projectFilter,
  setProjectFilter,
  setProjectIndex,
  hoveredProjectIndex,
  setHoveredProjectIndex,
  filteredProjects,
  projectsData,
  selectProject,
  setSelectProject,
  selectedLinkIndex,
  setExpandWindow,
  projectFilterCounts,
}: SharedProps) => {
  if (selectProject !== "") {
    const data = projectsData.find((p) => p.title === selectProject);

    return (
      <div className={cn(windowThemeClass, expandedShellClasses)}>
        <WindowHeader
          title={data?.window ?? "project"}
          isDark={isDark}
          selected={selectedWindow === "projects"}
          headerClass={headerClass}
          sticky
          onClose={() => setExpandWindow("")}
          onMinimize={() => {
            setExpandWindow("");
            setSelectProject("");
          }}
          onMaximize={() => setExpandWindow("projects")}
        />
        <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth min-h-0">
          {data ? (
            <DetailCard
              isDark={isDark}
              image={data.image}
              windowTitle={data.window}
              subtitle={data.title}
              date={data.date}
              category={data.category ?? undefined}
              bulletPoints={buildBullets(data.description)}
              links={data.links}
              selectedLinkIndex={selectedLinkIndex}
            />
          ) : (
            <p className="m-4">Project not found.</p>
          )}
        </div>
        {data && (
          <BackFooter
            isDark={isDark}
            label="projects"
            isFocused={selectedLinkIndex === data.links.length}
            onClick={() => {
              setSelectProject("");
              setExpandWindow("");
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn(windowThemeClass, expandedShellClasses)}>
      <WindowHeader
        title={isDark ? "projects — zsh" : "Projects"}
        isDark={isDark}
        selected={selectedWindow === "projects"}
        headerClass={headerClass}
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("projects")}
      />
      <FilterTabs<ProjectFilter>
        filters={PROJECT_FILTERS}
        active={projectFilter}
        counts={projectFilterCounts}
        onChange={(filter) => {
          setProjectFilter(filter);
          setProjectIndex(0);
        }}
        isDark={isDark}
        tabClass={tabClass}
        labelFor={isDark ? (f) => f : labelForFilter}
      />
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-7 pt-5 pb-8">
          {isDark && (
            <p className="font-mono text-[12.5px] mb-5">
              <span className="text-[#3FB950] font-semibold">justin@unc</span>
              <span className="text-[#768390]"> ~ %</span>
              <span className="text-[#E6EDF3] font-semibold"> ls ~/projects</span>
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProjects.map((project, index) => (
              <ProjectEntry
                key={project.title}
                project={project}
                isDark={isDark}
                isHovered={hoveredProjectIndex === index}
                onMouseEnter={() => setHoveredProjectIndex(index)}
                onMouseLeave={() => setHoveredProjectIndex(null)}
                onClick={() => setSelectProject(project.title)}
              />
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <p className={emptyClasses(isDark)}>no projects in this category</p>
          )}
        </div>
      </div>
    </div>
  );
};
