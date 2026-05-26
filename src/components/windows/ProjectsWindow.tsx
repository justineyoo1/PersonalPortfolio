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
      <div className="mt-2 mx-4 overflow-y-auto overscroll-contain scroll-smooth pb-4 min-h-0">
        {filteredProjects.map((project, index) => (
          <ItemRow
            key={project.title}
            index={index}
            label={project.compactTitle ?? project.title}
            variant="expanded"
            isDark={isDark}
            isHovered={hoveredProjectIndex === index}
            onMouseEnter={() => setHoveredProjectIndex(index)}
            onMouseLeave={() => setHoveredProjectIndex(null)}
            onClick={() => setSelectProject(project.title)}
          />
        ))}
        {filteredProjects.length === 0 && (
          <p className={emptyClasses(isDark)}>no projects in this category</p>
        )}
      </div>
    </div>
  );
};
