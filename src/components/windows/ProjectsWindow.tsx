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
        title={isDark ? "projects — zsh" : "Projects"}
        isDark={isDark}
        selected={selectedWindow === "projects"}
        headerClass={headerClass}
        onMaximize={() => setExpandWindow("projects")}
      />
      <div
        className={`text-xs flex ${isDark ? "px-4 pt-2 pb-2 font-mono border-b border-gray-700 gap-1.5" : "mx-4 mt-2 p-0.5 bg-[#DDDDE3] rounded-lg gap-0"}`}
      >
        {(["all", "swe", "ml/data"] as ProjectFilter[]).map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setProjectFilter(filter);
              setProjectIndex(0);
            }}
            className={`${tabClass(projectFilter === filter)} ${!isDark ? "flex-1 text-center" : ""}`}
          >
            {isDark ? `[${filter} (${projectFilterCounts[filter]})]` : filter.charAt(0).toUpperCase() + filter.slice(1)}
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
              className={`${isDark ? "text-[13px] lg:text-sm" : "text-[14px]"} leading-normal transition-all duration-200 cursor-pointer my-1.5 lg:my-1 ${isDark ? "h-7" : "h-9"} flex items-center px-3 whitespace-nowrap overflow-hidden text-ellipsis ${isDark ? "rounded-md" : "rounded-xl"} ${
                isSelected
                  ? isDark
                    ? "bg-gray-200 text-black"
                    : "bg-[#007AFF]/12 text-[#007AFF] font-bold"
                  : isDark
                    ? "bg-transparent text-[#60A5FA]"
                    : "bg-transparent text-[#1D1D1F] font-medium"
              }`}
              onMouseEnter={() => setHoveredProjectIndex(index)}
              onMouseLeave={() => setHoveredProjectIndex(null)}
              onClick={() => {
                setExpandWindow("projects");
                setProjectIndex(index);
                setSelectProject(project.title);
              }}
            >
              {isDark ? (isSelected ? "▌ " : "  ") : <span className={`${isSelected ? "text-[#007AFF]" : "text-[#B0B0B5]"} text-[11px] shrink-0 font-mono mr-2.5 tracking-tight`}>/{String(index + 1).padStart(2, "0")}</span>}
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
          {selectedProjectData ? (
            isDark ? (
              /* Dark mode - unchanged */
              <div className="m-4 pb-4">
                <img
                  src={selectedProjectData.image}
                  alt={selectedProjectData.title}
                  className="mx-auto h-48 object-contain rounded-lg mb-4"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/image.jpg"; }}
                />
                <div className="max-w-[70ch] mx-auto mt-1">
                  <p className="text-xl lg:text-2xl font-semibold tracking-[0.02em] text-blue-300">
                    {selectedProjectData.window}
                  </p>
                </div>
                <ul className="mt-2 max-w-[70ch] mx-auto list-disc pl-5 space-y-1 leading-relaxed text-gray-200">
                  {projectBulletPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="mt-4 max-w-[70ch] mx-auto flex flex-col">
                  {selectedProjectData.links.map((link, index) => (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name}
                      className={`inline-block text-gray-200 rounded transition-all duration-150 ${index === selectedLinkIndex ? " font-bold" : ""}`}>
                      {link.name} {index === selectedLinkIndex ? "❮ " : ""}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              /* Light mode - App Store card */
              <div className="pb-4">
                {/* Hero image with gradient overlay */}
                <div className="relative w-full h-56 lg:h-64 overflow-hidden">
                  <img
                    src={selectedProjectData.image}
                    alt={selectedProjectData.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/image.jpg"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                      {selectedProjectData.window}
                    </h2>
                    <p className="text-sm text-white/80 font-medium mt-1">
                      {selectedProjectData.title}
                    </p>
                  </div>
                </div>

                {/* Metadata pills */}
                <div className="flex flex-wrap gap-2 px-5 lg:px-6 mt-4">
                  {selectedProjectData.date && (
                    <span className="bg-[#E8E8ED] text-[#515154] text-xs font-semibold px-3 py-1.5 rounded-lg">
                      {selectedProjectData.date}
                    </span>
                  )}
                  {selectedProjectData.category && (
                    <span className="bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold px-3 py-1.5 rounded-lg">
                      {selectedProjectData.category}
                    </span>
                  )}
                </div>

                {/* Description card */}
                <div className="mx-5 lg:mx-6 mt-4 bg-[#F0F0F5] rounded-2xl p-5">
                  <div className="space-y-3">
                    {projectBulletPoints.map((point) => (
                      <p key={point} className="text-[15px] leading-relaxed text-[#1D1D1F]">
                        {point}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Links as pill buttons */}
                {selectedProjectData.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 px-5 lg:px-6 mt-4">
                    {selectedProjectData.links.map((link) => (
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
            )
          ) : (
            <p className="m-4">Project not found.</p>
          )}
        </div>
        {selectedProjectData && (
          <div
            className={`shrink-0 px-5 py-3 ${
              isDark ? "border-t border-gray-700 bg-gray-900/35" : ""
            }`}
          >
            <button
              className={`rounded px-2 py-1 text-sm transition-all duration-150 ${
                isDark
                  ? selectedLinkIndex === selectedProjectData.links.length
                    ? "text-gray-200 underline decoration-gray-500 underline-offset-2"
                    : "text-gray-400 hover:text-gray-200 hover:underline"
                  : "text-[#007AFF] font-medium hover:text-[#0066D6] apple-transition"
              }`}
              onClick={() => {
                setSelectProject("");
                setExpandWindow("");
              }}
            >
              {isDark ? (
                <>back to projects{selectedLinkIndex === selectedProjectData.links.length ? " <" : ""}</>
              ) : (
                "← Back"
              )}
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
        title={isDark ? "splitprojects — zsh" : "Projects"}
        isDark={isDark}
        selected={selectedWindow === "projects"}
        headerClass={headerClass}
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("projects")}
      />
      <div
        className={`text-xs flex ${isDark ? "px-4 pt-2 pb-2 font-mono border-b border-gray-700 gap-1.5" : "mx-4 mt-2 p-0.5 bg-[#DDDDE3] rounded-lg gap-0"}`}
      >
        {(["all", "swe", "ml/data"] as ProjectFilter[]).map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setProjectFilter(filter);
              setProjectIndex(0);
            }}
            className={`${tabClass(projectFilter === filter)} ${!isDark ? "flex-1 text-center" : ""}`}
          >
            {isDark ? `[${filter} (${projectFilterCounts[filter]})]` : filter.charAt(0).toUpperCase() + filter.slice(1)}
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
              className={`rounded-md text-sm leading-normal whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-150 cursor-pointer h-7 flex items-center px-2 ${
                isSelected
                  ? isDark
                    ? "bg-gray-200 text-black"
                    : "bg-[#007AFF]/10 text-[#007AFF] font-semibold"
                  : isDark
                    ? "bg-transparent text-[#60A5FA]"
                    : "bg-transparent text-[#1D1D1F] font-medium"
              }`}
              onMouseEnter={() => setHoveredProjectIndex(index)}
              onMouseLeave={() => setHoveredProjectIndex(null)}
              onClick={() => setSelectProject(project.title)}
            >
              {isDark ? (isSelected ? "▌ " : "  ") : <span className={`${isSelected ? "text-[#007AFF]" : "text-[#B0B0B5]"} text-[11px] shrink-0 font-mono mr-2.5 tracking-tight`}>/{String(index + 1).padStart(2, "0")}</span>}
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
