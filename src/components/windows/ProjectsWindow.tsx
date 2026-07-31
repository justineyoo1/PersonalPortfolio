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

/** Compact row for the expanded view's left rail (master–detail layout). */
const ProjectRailRow: React.FC<{
  project: ProjectItem;
  isDark: boolean;
  isActive: boolean;
  onClick: () => void;
}> = ({ project, isDark, isActive, onClick }) => (
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
        isDark ? "bg-white/10" : "bg-[#F2F2F7]",
      )}
    >
      <img
        src={project.image}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
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
        {project.compactTitle ?? project.title}
      </span>
      <span
        className={cn(
          "block text-[11.5px] mt-0.5",
          isDark ? "text-gray-500" : "text-[#86868B]",
        )}
      >
        {project.category ?? project.date}
      </span>
    </span>
  </button>
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
  const data = selectProject
    ? projectsData.find((p) => p.title === selectProject)
    : undefined;

  // Master-detail: list stays in a left rail, detail fills the right pane.
  // Below `lg` there isn't room for two columns, so the panes swap.
  return (
    <div className={cn(windowThemeClass, expandedShellClasses)}>
      <WindowHeader
        title={isDark ? "projects — zsh" : "Projects"}
        isDark={isDark}
        selected={selectedWindow === "projects"}
        headerClass={headerClass}
        sticky
        onClose={() => setExpandWindow("")}
        onMinimize={() => {
          setExpandWindow("");
          setSelectProject("");
        }}
      />

      <div className="flex-1 min-h-0 flex">
        <div
          className={cn(
            "flex-col min-h-0 w-full lg:w-[320px] lg:shrink-0",
            data ? "hidden lg:flex" : "flex",
            isDark
              ? "lg:border-r lg:border-white/10"
              : "lg:border-r lg:border-black/[0.07]",
          )}
        >
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
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth px-2.5 py-2 space-y-0.5">
            {filteredProjects.map((project) => (
              <ProjectRailRow
                key={project.title}
                project={project}
                isDark={isDark}
                isActive={project.title === selectProject}
                onClick={() => setSelectProject(project.title)}
              />
            ))}
            {filteredProjects.length === 0 && (
              <p className={cn("px-2 py-3 text-[13px]", emptyClasses(isDark))}>
                no projects in this category
              </p>
            )}
          </div>
        </div>

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
                  date={data.date}
                  category={data.category ?? undefined}
                  bulletPoints={buildBullets(data.description)}
                  links={data.links}
                  selectedLinkIndex={selectedLinkIndex}
                />
              </div>
              <div className="lg:hidden">
                <BackFooter
                  isDark={isDark}
                  label="projects"
                  isFocused={selectedLinkIndex === data.links.length}
                  onClick={() => setSelectProject("")}
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
                  ? "select a project to read the details"
                  : "Select a project to read the details"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
