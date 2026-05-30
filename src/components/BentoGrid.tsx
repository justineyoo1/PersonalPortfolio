import React from "react";
import {
  ToolboxCollapsed,
  ToolboxExpanded,
} from "./windows/ToolboxWindow";
import {
  LeetCodeCollapsed,
  LeetCodeExpanded,
} from "./windows/LeetCodeWindow";
import {
  ExperienceCollapsed,
  ExperienceExpanded,
} from "./windows/ExperienceWindow";
import {
  ProjectsCollapsed,
  ProjectsExpanded,
} from "./windows/ProjectsWindow";
import { MeCollapsed, MeExpanded } from "./windows/MeWindow";
import { CliCollapsed, CliExpanded } from "./windows/CliWindow";
import { AppsCollapsed } from "./windows/AppsWindow";
import { cn } from "@/lib/cn";
import type {
  ExperienceFilter,
  ExperienceItem,
  ExperienceViewMode,
  LeetCodeData,
  PersonalInfo,
  ProjectFilter,
  ProjectItem,
  ToolboxTab,
} from "@/types";
import type { DisplayItem } from "@/hooks/useCli";

type SkillsCoursesCerts = {
  skills: { group: string; items: string[] }[];
  courses: string[];
  certs: { name: string; issuer: string; date: string }[];
};

type CliState = {
  command: string;
  setCommand: (value: string) => void;
  lastCommand: string;
  response: string;
  isResponding: boolean;
  displayHistory: DisplayItem[];
  inputRef: React.RefObject<HTMLInputElement>;
  focusInput: () => void;
  handleCommand: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
  renderTextWithLinks: (text: string) => React.ReactNode;
};

type ThemeClasses = {
  isDark: boolean;
  windowThemeClass: string;
  gridThemeClass: string;
  headerClass: (selected: boolean) => string;
  tabClass: (active: boolean) => string;
};

type WindowSelection = {
  selectedWindow: string;
  setSelectedWindow: (value: string) => void;
  expandWindow: string;
  setExpandWindow: (value: string) => void;
};

type ExperienceState = {
  experiencesData: ExperienceItem[];
  filteredExperiences: ExperienceItem[];
  experienceFilter: ExperienceFilter;
  setExperienceFilter: (value: ExperienceFilter) => void;
  setExperienceIndex: (value: number) => void;
  hoveredExperienceIndex: number | null;
  setHoveredExperienceIndex: (value: number | null) => void;
  selectExperience: string;
  setSelectExperience: (value: string) => void;
  selectedExperienceLinkIndex: number;
  experienceViewMode: ExperienceViewMode;
  setExperienceViewMode: (value: ExperienceViewMode) => void;
  experienceFilterCounts: Record<ExperienceFilter, number>;
};

type ProjectState = {
  projectsData: ProjectItem[];
  filteredProjects: ProjectItem[];
  projectFilter: ProjectFilter;
  setProjectFilter: (value: ProjectFilter) => void;
  setProjectIndex: (value: number) => void;
  hoveredProjectIndex: number | null;
  setHoveredProjectIndex: (value: number | null) => void;
  selectProject: string;
  setSelectProject: (value: string) => void;
  selectedLinkIndex: number;
  projectFilterCounts: Record<ProjectFilter, number>;
};

type ToolboxState = {
  skillsCoursesCerts: SkillsCoursesCerts;
  toolboxTab: ToolboxTab;
  setToolboxTab: (value: ToolboxTab) => void;
  hoveredToolboxIndex: number | null;
  setHoveredToolboxIndex: (value: number | null) => void;
};

type BentoGridProps = {
  theme: ThemeClasses;
  windowSelection: WindowSelection;
  selectedAscii: string;
  personalInfo: PersonalInfo;
  time: Date | null;
  meWindowRef: React.RefObject<HTMLDivElement>;
  leetCode: LeetCodeData | null;
  leetCodeError: string;
  cli: CliState;
  experience: ExperienceState;
  project: ProjectState;
  toolbox: ToolboxState;
};

export const BentoGrid: React.FC<BentoGridProps> = ({
  theme,
  windowSelection,
  selectedAscii,
  personalInfo,
  time,
  meWindowRef,
  leetCode,
  leetCodeError,
  cli,
  experience,
  project,
  toolbox,
}) => {
  const { isDark, windowThemeClass, gridThemeClass, headerClass, tabClass } = theme;
  const { selectedWindow, setSelectedWindow, expandWindow, setExpandWindow } =
    windowSelection;
  const isExpanded = Boolean(expandWindow);

  // Closing choreography: when an expanded window is dismissed we keep it
  // mounted briefly so the backdrop + window can play their exit animation,
  // then actually clear the state. Re-maximizing (non-empty value) passes
  // straight through. Esc (handled in useWindowNavigation) closes instantly.
  const [closing, setClosing] = React.useState(false);
  const requestClose = React.useCallback(
    (value: string) => {
      if (value === "") {
        setClosing(true);
        window.setTimeout(() => {
          setClosing(false);
          setExpandWindow("");
        }, 200);
      } else {
        setExpandWindow(value);
      }
    },
    [setExpandWindow],
  );

  return (
    <div
      className={cn(
        "relative grid grid-cols-2 lg:grid-cols-4 lg:row-span-4 w-full mx-1 rounded-2xl max-w-6xl 2xl:max-w-7xl",
        gridThemeClass,
        isDark ? "gap-2 p-1.5 shadow-xl 2xl:gap-3" : "gap-4 p-4 2xl:gap-5",
      )}
    >
      <MeCollapsed
        isDark={isDark}
        selectedWindow={selectedWindow}
        windowThemeClass={windowThemeClass}
        headerClass={headerClass}
        selectedAscii={selectedAscii}
        personalInfo={personalInfo}
        time={time}
        setExpandWindow={requestClose}
        setSelectedWindow={setSelectedWindow}
        isHidden={isExpanded}
      />

      <ToolboxCollapsed
        isDark={isDark}
        selectedWindow={selectedWindow}
        expandWindow={expandWindow}
        windowThemeClass={windowThemeClass}
        headerClass={headerClass}
        tabClass={tabClass}
        toolboxTab={toolbox.toolboxTab}
        setToolboxTab={toolbox.setToolboxTab}
        hoveredToolboxIndex={toolbox.hoveredToolboxIndex}
        setHoveredToolboxIndex={toolbox.setHoveredToolboxIndex}
        setSelectedWindow={setSelectedWindow}
        setExpandWindow={requestClose}
        skillsCoursesCerts={toolbox.skillsCoursesCerts}
      />

      <LeetCodeCollapsed
        isDark={isDark}
        selectedWindow={selectedWindow}
        windowThemeClass={windowThemeClass}
        headerClass={headerClass}
        setExpandWindow={requestClose}
        socialLeetCodeUrl={personalInfo.socialLinks.leetcode}
        leetCode={leetCode}
        leetCodeError={leetCodeError}
        isHidden={isExpanded}
        onSelect={() => setSelectedWindow("leetcode")}
      />

      <CliCollapsed
        isDark={isDark}
        selectedWindow={selectedWindow}
        windowThemeClass={windowThemeClass}
        headerClass={headerClass}
        setExpandWindow={requestClose}
        command={cli.command}
        setCommand={cli.setCommand}
        lastCommand={cli.lastCommand}
        response={cli.response}
        isResponding={cli.isResponding}
        displayHistory={cli.displayHistory}
        renderTextWithLinks={cli.renderTextWithLinks}
        inputRef={cli.inputRef}
        focusInput={cli.focusInput}
        handleCommand={cli.handleCommand}
        setSelectedWindow={setSelectedWindow}
        isHidden={isExpanded}
      />

      <ExperienceCollapsed
        isDark={isDark}
        selectedWindow={selectedWindow}
        expandWindow={expandWindow}
        windowThemeClass={windowThemeClass}
        headerClass={headerClass}
        tabClass={tabClass}
        experienceFilter={experience.experienceFilter}
        setExperienceFilter={experience.setExperienceFilter}
        setExperienceIndex={experience.setExperienceIndex}
        hoveredExperienceIndex={experience.hoveredExperienceIndex}
        setHoveredExperienceIndex={experience.setHoveredExperienceIndex}
        filteredExperiences={experience.filteredExperiences}
        setExpandWindow={requestClose}
        setSelectedWindow={setSelectedWindow}
        setSelectExperience={experience.setSelectExperience}
        experienceFilterCounts={experience.experienceFilterCounts}
      />

      <ProjectsCollapsed
        isDark={isDark}
        selectedWindow={selectedWindow}
        expandWindow={expandWindow}
        windowThemeClass={windowThemeClass}
        headerClass={headerClass}
        tabClass={tabClass}
        projectFilter={project.projectFilter}
        setProjectFilter={project.setProjectFilter}
        setProjectIndex={project.setProjectIndex}
        hoveredProjectIndex={project.hoveredProjectIndex}
        setHoveredProjectIndex={project.setHoveredProjectIndex}
        filteredProjects={project.filteredProjects}
        setExpandWindow={requestClose}
        setSelectedWindow={setSelectedWindow}
        setSelectProject={project.setSelectProject}
        projectFilterCounts={project.projectFilterCounts}
      />

      <AppsCollapsed
        isDark={isDark}
        selectedWindow={selectedWindow}
        windowThemeClass={windowThemeClass}
        headerClass={headerClass}
        setExpandWindow={requestClose}
        setSelectedWindow={setSelectedWindow}
        isHidden={isExpanded}
      />

      {isExpanded && (
        <>
          {/* Full-viewport scrim: blurs + dims the particles and grid so the
              expanded window reads as floating above the page. Click to close. */}
          <div
            className={cn("fixed inset-0 z-20 overlay-backdrop cursor-pointer", closing && "is-closing")}
            onClick={() => requestClose("")}
            aria-hidden
          />
          <div
          onClick={(e) => {
            if (e.target === e.currentTarget) requestClose("");
          }}
          className={cn(
            "expanded-stage z-30 lg:absolute lg:inset-0 fixed inset-0 lg:h-full h-screen max-h-screen flex items-center justify-center lg:items-stretch lg:justify-stretch p-3 sm:p-5 lg:p-6 2xl:p-8",
            closing && "is-closing",
          )}
        >
          {expandWindow === "me" && (
            <MeExpanded
              isDark={isDark}
              selectedWindow={selectedWindow}
              windowThemeClass={windowThemeClass}
              headerClass={headerClass}
              selectedAscii={selectedAscii}
              personalInfo={personalInfo}
              time={time}
              setExpandWindow={requestClose}
              meWindowRef={meWindowRef}
            />
          )}
          {expandWindow === "experience" && (
            <ExperienceExpanded
              isDark={isDark}
              selectedWindow={selectedWindow}
              expandWindow={expandWindow}
              windowThemeClass={windowThemeClass}
              headerClass={headerClass}
              tabClass={tabClass}
              experienceFilter={experience.experienceFilter}
              setExperienceFilter={experience.setExperienceFilter}
              setExperienceIndex={experience.setExperienceIndex}
              hoveredExperienceIndex={experience.hoveredExperienceIndex}
              setHoveredExperienceIndex={experience.setHoveredExperienceIndex}
              filteredExperiences={experience.filteredExperiences}
              experiencesData={experience.experiencesData}
              selectExperience={experience.selectExperience}
              setSelectExperience={experience.setSelectExperience}
              selectedExperienceLinkIndex={experience.selectedExperienceLinkIndex}
              setExpandWindow={requestClose}
              setSelectedWindow={setSelectedWindow}
              experienceViewMode={experience.experienceViewMode}
              setExperienceViewMode={experience.setExperienceViewMode}
              experienceFilterCounts={experience.experienceFilterCounts}
            />
          )}
          {expandWindow === "projects" && (
            <ProjectsExpanded
              isDark={isDark}
              selectedWindow={selectedWindow}
              expandWindow={expandWindow}
              windowThemeClass={windowThemeClass}
              headerClass={headerClass}
              tabClass={tabClass}
              projectFilter={project.projectFilter}
              setProjectFilter={project.setProjectFilter}
              setProjectIndex={project.setProjectIndex}
              hoveredProjectIndex={project.hoveredProjectIndex}
              setHoveredProjectIndex={project.setHoveredProjectIndex}
              filteredProjects={project.filteredProjects}
              projectsData={project.projectsData}
              selectProject={project.selectProject}
              setSelectProject={project.setSelectProject}
              selectedLinkIndex={project.selectedLinkIndex}
              setExpandWindow={requestClose}
              setSelectedWindow={setSelectedWindow}
              projectFilterCounts={project.projectFilterCounts}
            />
          )}
          {expandWindow === "skills" && (
            <ToolboxExpanded
              isDark={isDark}
              selectedWindow={selectedWindow}
              windowThemeClass={windowThemeClass}
              headerClass={headerClass}
              tabClass={tabClass}
              toolboxTab={toolbox.toolboxTab}
              setToolboxTab={toolbox.setToolboxTab}
              hoveredToolboxIndex={toolbox.hoveredToolboxIndex}
              setHoveredToolboxIndex={toolbox.setHoveredToolboxIndex}
              setSelectedWindow={setSelectedWindow}
              setExpandWindow={requestClose}
              skillsCoursesCerts={toolbox.skillsCoursesCerts}
            />
          )}
          {expandWindow === "leetcode" && (
            <LeetCodeExpanded
              isDark={isDark}
              selectedWindow={selectedWindow}
              windowThemeClass={windowThemeClass}
              headerClass={headerClass}
              setExpandWindow={requestClose}
              socialLeetCodeUrl={personalInfo.socialLinks.leetcode}
              leetCode={leetCode}
              leetCodeError={leetCodeError}
            />
          )}
          {expandWindow === "cli" && (
            <CliExpanded
              isDark={isDark}
              selectedWindow={selectedWindow}
              windowThemeClass={windowThemeClass}
              headerClass={headerClass}
              setExpandWindow={requestClose}
              command={cli.command}
              setCommand={cli.setCommand}
              lastCommand={cli.lastCommand}
              response={cli.response}
              isResponding={cli.isResponding}
              displayHistory={cli.displayHistory}
              renderTextWithLinks={cli.renderTextWithLinks}
              inputRef={cli.inputRef}
              focusInput={cli.focusInput}
              handleCommand={cli.handleCommand}
            />
          )}
          </div>
        </>
      )}
    </div>
  );
};
