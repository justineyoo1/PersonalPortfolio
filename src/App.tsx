import { useEffect, useMemo, useRef, useState } from "react";
import {
  experiencesData,
  projectsData,
  asciiList,
  personalInfo,
  commandResponses,
  skillsCoursesCerts,
} from "./data/info";
import { Taskbar } from "./components/Taskbar";
import { ResumeWindow } from "./components/windows/ResumeWindow";
import { BentoGrid } from "./components/BentoGrid";
import { useTheme } from "./hooks/useTheme";
import { useCli } from "./hooks/useCli";
import { useWindowNavigation } from "./hooks/useWindowNavigation";
import { useLeetCode } from "./hooks/useLeetCode";
import { useResumeOverlay } from "./hooks/useResumeOverlay";
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";
import { useFitScale } from "./hooks/useFitScale";
import { cn } from "./lib/cn";
import type {
  ExperienceFilter,
  ExperienceViewMode,
  ProjectFilter,
  ToolboxTab,
} from "./types";

const App = () => {
  const {
    theme,
    isDark,
    windowThemeClass,
    gridThemeClass,
    overlayThemeClass,
    headerClass,
    tabClass,
  } = useTheme();

  const [time, setTime] = useState<Date | null>(null);
  const [selectedAscii] = useState(asciiList[0] ?? "");
  const [expandWindow, setExpandWindow] = useState("");
  const [selectedWindow, setSelectedWindow] = useState("me");

  const { leetCode, leetCodeError } = useLeetCode(personalInfo.leetcodeUsername);

  const [experienceIndex, setExperienceIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [selectProject, setSelectProject] = useState("");
  const [selectExperience, setSelectExperience] = useState("");
  const [experienceFilter, setExperienceFilter] = useState<ExperienceFilter>("all");
  const [experienceViewMode, setExperienceViewMode] =
    useState<ExperienceViewMode>("list");
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");
  const [toolboxTab, setToolboxTab] = useState<ToolboxTab>("skills");
  const [hoveredToolboxIndex, setHoveredToolboxIndex] = useState<number | null>(
    null,
  );
  const [selectedLinkIndex, setSelectedLinkIndex] = useState(0);
  const [selectedExperienceLinkIndex, setSelectedExperienceLinkIndex] =
    useState(0);
  const [hoveredExperienceIndex, setHoveredExperienceIndex] = useState<
    number | null
  >(null);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(
    null,
  );

  const meWindowRef = useRef<HTMLDivElement>(null);

  const { isResumeOpen, setIsResumeOpen } = useResumeOverlay();
  const isExpanded = Boolean(expandWindow);
  useBodyScrollLock(isExpanded);

  // Shrink the whole desktop to fit the viewport so nothing needs scrolling
  // (desktop only; disabled while a window is expanded full-screen).
  const { ref: fitRef, scale: fitScale, naturalH: fitNaturalH } =
    useFitScale(true);
  // Apply the shrink only on the collapsed desktop — never while a window is
  // expanded full-screen (its overlay must render at 1:1, and a transformed
  // ancestor would break the fixed/absolute positioning).
  const applyFit = !isExpanded && fitScale < 1;

  const cli = useCli({
    isDark,
    selectedWindow,
    commandResponses,
    experiencesData,
    projectsData,
    setExpandWindow,
    setSelectedWindow,
    setSelectProject,
    setSelectExperience,
  });

  const filteredExperiences = useMemo(
    () =>
      experiencesData.filter((experience) => {
        if (experienceFilter === "all") return true;
        if (experienceFilter === "research") {
          return (
            experience.category === "research" || experience.category === "clubs"
          );
        }
        return experience.category === experienceFilter;
      }),
    [experienceFilter],
  );

  const experienceFilterCounts = useMemo(
    () => ({
      all: experiencesData.length,
      work: experiencesData.filter((e) => e.category === "work").length,
      research: experiencesData.filter(
        (e) => e.category === "research" || e.category === "clubs",
      ).length,
    }),
    [],
  );

  const filteredProjects = useMemo(
    () =>
      projectsData.filter((project) => {
        if (projectFilter === "all") return true;
        return project.category === projectFilter;
      }),
    [projectFilter],
  );

  const projectFilterCounts = useMemo(
    () => ({
      all: projectsData.length,
      swe: projectsData.filter((p) => p.category === "swe").length,
      "ml/data": projectsData.filter((p) => p.category === "ml/data").length,
    }),
    [],
  );

  // update time every second (client-only to avoid hydration mismatch)
  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useWindowNavigation({
    selectedWindow,
    setSelectedWindow,
    expandWindow,
    setExpandWindow,
    meWindowRef,
    isResumeOpen,
    experiencesData,
    filteredExperiences,
    experienceIndex,
    setExperienceIndex,
    setHoveredExperienceIndex,
    selectExperience,
    setSelectExperience,
    selectedExperienceLinkIndex,
    setSelectedExperienceLinkIndex,
    projectsData,
    filteredProjects,
    projectIndex,
    setProjectIndex,
    setHoveredProjectIndex,
    selectProject,
    setSelectProject,
    selectedLinkIndex,
    setSelectedLinkIndex,
    experienceFilter,
    projectFilter,
  });

  useEffect(() => {
    setHoveredToolboxIndex(null);
  }, [toolboxTab]);

  return (
    <div
      className={cn(
        "relative z-10 min-h-screen w-screen flex items-center justify-center py-6 pb-24 lg:py-8 lg:pb-20 overscroll-none",
        isDark
          ? "bg-transparent text-white font-mono"
          : "bg-transparent text-[#1D1D1F] font-sans",
      )}
    >
      <div
        className="w-full flex justify-center items-start"
        style={{
          height: applyFit ? fitNaturalH * fitScale : undefined,
          // items-start keeps the child at its natural height so the measured
          // height can't feed back from align-items: stretch (which caused the
          // scale to oscillate). overflow clips the empty layout space left
          // below the visually-scaled grid.
          overflow: applyFit ? "hidden" : undefined,
        }}
      >
        <div
          ref={fitRef}
          style={{
            transform: applyFit ? `scale(${fitScale})` : undefined,
            transformOrigin: "top center",
          }}
        >
      <BentoGrid
        theme={{
          isDark,
          windowThemeClass,
          gridThemeClass,
          headerClass,
          tabClass,
        }}
        windowSelection={{
          selectedWindow,
          setSelectedWindow,
          expandWindow,
          setExpandWindow,
        }}
        selectedAscii={selectedAscii}
        personalInfo={personalInfo}
        time={time}
        meWindowRef={meWindowRef}
        leetCode={leetCode}
        leetCodeError={leetCodeError}
        cli={cli}
        experience={{
          experiencesData,
          filteredExperiences,
          experienceFilter,
          setExperienceFilter,
          setExperienceIndex,
          hoveredExperienceIndex,
          setHoveredExperienceIndex,
          selectExperience,
          setSelectExperience,
          selectedExperienceLinkIndex,
          experienceViewMode,
          setExperienceViewMode,
          experienceFilterCounts,
        }}
        project={{
          projectsData,
          filteredProjects,
          projectFilter,
          setProjectFilter,
          setProjectIndex,
          hoveredProjectIndex,
          setHoveredProjectIndex,
          selectProject,
          setSelectProject,
          selectedLinkIndex,
          projectFilterCounts,
        }}
        toolbox={{
          skillsCoursesCerts,
          toolboxTab,
          setToolboxTab,
          hoveredToolboxIndex,
          setHoveredToolboxIndex,
        }}
      />
        </div>
      </div>

      <ResumeWindow
        isDark={isDark}
        isOpen={isResumeOpen}
        overlayThemeClass={overlayThemeClass}
        headerClass={headerClass}
        resumeFileName={personalInfo.resumeFileName}
        personName={personalInfo.name}
        onClose={() => setIsResumeOpen(false)}
      />

      <Taskbar theme={theme} />
    </div>
  );
};

export default App;
