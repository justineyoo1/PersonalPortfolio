import React from "react";
import { WindowHeader } from "./WindowHeader";

type ProjectFilter = "all" | "swe" | "ml/data";

type ProjectItem = {
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
}: Omit<SharedProps, "projectsData" | "selectProject" | "selectedLinkIndex">) => {
  return (
    <div
      className={` ${windowThemeClass} col-span-2 lg:col-span-1 rounded-xl flex flex-col h-[300px] lg:h-[260px] min-h-0 overflow-hidden order-5 row-start-3 lg:row-start-2 ${
        expandWindow ? "opacity-0" : ""
      } transition-opacity duration-500`}
      onClick={() => setSelectedWindow("projects")}
    >
      <WindowHeader
        title="projects — zsh"
        selected={selectedWindow === "projects"}
        headerClass={headerClass}
        onMaximize={() => setExpandWindow("projects")}
      />
      <div
        className={`px-4 pt-2 pb-2 text-xs font-mono flex gap-2 border-b ${
          isDark ? "border-gray-700" : "border-gray-300"
        }`}
      >
        {(["all", "swe", "ml/data"] as ProjectFilter[]).map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setProjectFilter(filter);
              setProjectIndex(0);
            }}
            className={tabClass(projectFilter === filter)}
          >
            [{filter} ({projectFilterCounts[filter]})]
          </button>
        ))}
      </div>
      <div className="mt-2 mx-4 flex-1 min-h-0 overflow-y-auto overscroll-contain scroll-smooth">
        {filteredProjects.map((project, index) => {
          const isHovered = hoveredProjectIndex === index;
          const isSelected = isHovered;

          return (
            <div
              key={index}
              className={`rounded-md text-[12px] lg:text-[13px] leading-[1.25] transition-all duration-150 cursor-pointer my-1.5 lg:my-1 h-7 flex items-center px-2 whitespace-nowrap overflow-hidden text-ellipsis ${
                isSelected
                  ? isDark
                    ? "bg-gray-200 text-black"
                    : "bg-gray-800 text-white"
                  : isDark
                    ? "bg-transparent text-[#60A5FA]"
                    : "bg-transparent text-[#2563EB]"
              }`}
              onMouseEnter={() => setHoveredProjectIndex(index)}
              onMouseLeave={() => setHoveredProjectIndex(null)}
              onClick={() => {
                setExpandWindow("projects");
                setProjectIndex(index);
                setSelectProject(project.title);
              }}
            >
              {isSelected ? "▌ " : "  "}
              {project.compactTitle ?? project.title}
            </div>
          );
        })}
        {filteredProjects.length === 0 && (
          <p className={isDark ? "text-gray-400" : "text-gray-500"}>
            no projects in this category
          </p>
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
    const selectedProjectData = projectsData.find((p) => p.title === selectProject);
    const projectBulletPoints = selectedProjectData?.description
      .split(". ")
      .map((sentence) => sentence.trim())
      .filter(Boolean)
      .map((sentence) =>
        sentence.endsWith(".") ? sentence : `${sentence}.`,
      ) ?? [];

    return (
      <div
        className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[92vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-hidden flex flex-col`}
      >
        <WindowHeader
          title={selectedProjectData?.window ?? "project"}
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
        <div className="m-4 flex-1 overflow-y-auto overscroll-contain scroll-smooth min-h-0">
          {selectedProjectData ? (
            <div className="pb-4">
              <img
                src={selectedProjectData.image}
                alt={selectedProjectData.title}
                className="mx-auto h-48 object-contain rounded-lg mb-4"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/image.jpg";
                }}
              />
              <div className="max-w-[70ch] mx-auto mt-1">
                <p
                  className={`text-xl lg:text-2xl font-semibold tracking-[0.02em] ${
                    isDark ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  {selectedProjectData.window}
                </p>
              </div>
              <ul
                className={`text-gray-400 mt-2 max-w-[70ch] mx-auto list-disc pl-5 space-y-1 leading-relaxed ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {projectBulletPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="mt-4 max-w-[70ch] mx-auto flex flex-col">
                {selectedProjectData.links.map((link, index) => (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={link.name}
                    className={`inline-block ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    } rounded transition-all duration-150 ${
                      index === selectedLinkIndex ? " font-bold" : ""
                    }`}
                  >
                    {link.name} {index === selectedLinkIndex ? "❮ " : ""}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <p>Project not found.</p>
          )}
        </div>
        {selectedProjectData && (
          <div
            className={`shrink-0 px-4 py-3 border-t ${
              isDark ? "border-gray-700 bg-gray-900/35" : "border-gray-300 bg-gray-100/55"
            }`}
          >
            <button
              className={`rounded px-2 py-1 text-sm transition-all duration-150 ${
                selectedLinkIndex === selectedProjectData.links.length
                  ? isDark
                    ? "text-gray-200 underline decoration-gray-500 underline-offset-2"
                    : "text-gray-800 underline decoration-gray-500 underline-offset-2"
                  : isDark
                    ? "text-gray-400 hover:text-gray-200 hover:underline"
                    : "text-gray-500 hover:text-gray-800 hover:underline"
              }`}
              onClick={() => {
                setSelectProject("");
                setExpandWindow("");
              }}
            >
              back to projects
              {selectedLinkIndex === selectedProjectData.links.length ? " <" : ""}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[92vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-hidden flex flex-col`}
    >
      <WindowHeader
        title="splitprojects — zsh"
        selected={selectedWindow === "projects"}
        headerClass={headerClass}
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("projects")}
      />
      <div
        className={`px-4 pt-2 pb-2 text-xs font-mono flex gap-2 border-b ${
          isDark ? "border-gray-700" : "border-gray-300"
        }`}
      >
        {(["all", "swe", "ml/data"] as ProjectFilter[]).map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setProjectFilter(filter);
              setProjectIndex(0);
            }}
            className={tabClass(projectFilter === filter)}
          >
            [{filter} ({projectFilterCounts[filter]})]
          </button>
        ))}
      </div>
      <div className="mt-2 mx-4 overflow-y-auto overscroll-contain scroll-smooth pb-4 min-h-0">
        {filteredProjects.map((project, index) => {
          const isHovered = hoveredProjectIndex === index;
          const isSelected = isHovered;

          return (
            <div
              key={index}
              className={`rounded-md text-[13px] leading-[1.25] whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-150 cursor-pointer h-7 flex items-center px-2 ${
                isSelected
                  ? isDark
                    ? "bg-gray-200 text-black"
                    : "bg-gray-800 text-white"
                  : isDark
                    ? "bg-transparent text-[#60A5FA]"
                    : "bg-transparent text-[#2563EB]"
              }`}
              onMouseEnter={() => setHoveredProjectIndex(index)}
              onMouseLeave={() => setHoveredProjectIndex(null)}
              onClick={() => setSelectProject(project.title)}
            >
              {isSelected ? "▌ " : "  "}
              {project.compactTitle ?? project.title}
            </div>
          );
        })}
        {filteredProjects.length === 0 && (
          <p className={isDark ? "text-gray-400" : "text-gray-500"}>
            no projects in this category
          </p>
        )}
      </div>
    </div>
  );
};
