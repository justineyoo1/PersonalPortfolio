import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  experiencesData,
  projectsData,
  asciiList,
  personalInfo,
  commandResponses,
  skillsCoursesCerts,
} from "./data/info";
import { Taskbar } from "./components/Taskbar";
import {
  ToolboxCollapsed,
  ToolboxExpanded,
} from "./components/windows/ToolboxWindow";
import {
  LeetCodeCollapsed,
  LeetCodeExpanded,
} from "./components/windows/LeetCodeWindow";
import {
  ExperienceCollapsed,
  ExperienceExpanded,
} from "./components/windows/ExperienceWindow";
import {
  ProjectsCollapsed,
  ProjectsExpanded,
} from "./components/windows/ProjectsWindow";
import { MeCollapsed, MeExpanded } from "./components/windows/MeWindow";
import { CliCollapsed, CliExpanded } from "./components/windows/CliWindow";
import { ResumeWindow } from "./components/windows/ResumeWindow";
import { useTheme } from "./hooks/useTheme";
import { useCli } from "./hooks/useCli";
import { useWindowNavigation } from "./hooks/useWindowNavigation";
import { useLeetCode } from "./hooks/useLeetCode";

type ExperienceFilter = "all" | "work" | "research";
type ExperienceViewMode = "list" | "timeline";
type ToolboxTab = "skills" | "certs";
type ProjectFilter = "all" | "swe" | "ml/data";

const App = () => {
  const {
    theme,
    isDark,
    accentTextClass,
    windowThemeClass,
    gridThemeClass,
    overlayThemeClass,
    headerClass,
    tabClass,
  } = useTheme();
  const [time, setTime] = useState(new Date());

  // const [count, setCount] = useState(0);
  const [selectedAscii] = useState(asciiList[0] ?? ""); // selected ascii art
  const [expandWindow, setExpandWindow] = useState(String); // which window is expanded
  const [selectedWindow, setSelectedWindow] = useState("me"); // which window is selected

  const { leetCode, leetCodeError } = useLeetCode(personalInfo.leetcodeUsername);
  // const [currentIndex, setCurrentIndex] = useState(0);

  const [experienceIndex, setExperienceIndex] = useState(0); // index of experience
  const [projectIndex, setProjectIndex] = useState(0); // index of project
  const [selectProject, setSelectProject] = useState(""); // selected project
  const [selectExperience, setSelectExperience] = useState(""); // selected experience
  const [experienceFilter, setExperienceFilter] = useState<ExperienceFilter>("all");
  const [experienceViewMode, setExperienceViewMode] =
    useState<ExperienceViewMode>("list");
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");
  const [toolboxTab, setToolboxTab] = useState<ToolboxTab>("skills");
  const [hoveredToolboxIndex, setHoveredToolboxIndex] = useState<number | null>(
    null,
  );
  const [selectedLinkIndex, setSelectedLinkIndex] = useState(0); // index of selected link within project
  const [selectedExperienceLinkIndex, setSelectedExperienceLinkIndex] =
    useState(0); // index of selected link within experience

  const [hoveredExperienceIndex, setHoveredExperienceIndex] = useState<
    number | null
  >(null);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(
    null,
  );

  // cli
  const meWindowRef = useRef<HTMLDivElement>(null);

  // timer state
  const [timerMinutes, setTimerMinutes] = useState(30); // default pomodoro time
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<"work" | "break" | "longBreak">(
    "work",
  );
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(30);
  const isTimerOpen = false;
  const [selectedTimerButton, setSelectedTimerButton] = useState(0); // 0 for start/pause, 1 for reset
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const isMediaPlayerOpen = false;

  const {
    command,
    setCommand,
    lastCommand,
    response,
    inputRef,
    focusInput,
    handleCommand,
    renderTextWithLinks,
  } = useCli({
    selectedWindow,
    accentTextClass,
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
      work: experiencesData.filter((experience) => experience.category === "work")
        .length,
      research: experiencesData.filter(
        (experience) =>
          experience.category === "research" || experience.category === "clubs",
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
      swe: projectsData.filter((project) => project.category === "swe").length,
      "ml/data": projectsData.filter((project) => project.category === "ml/data")
        .length,
    }),
    [],
  );

  // update time every second
  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  useWindowNavigation({
    selectedWindow,
    setSelectedWindow,
    expandWindow,
    setExpandWindow,
    meWindowRef,
    isResumeOpen,
    isMediaPlayerOpen,
    isTimerOpen,
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

  // Handle closing timer when it's the selected window
  useEffect(() => {
    if (!isTimerOpen && selectedWindow === "timer") {
      setSelectedWindow("skills");
      setExpandWindow("");
    }
  }, [isTimerOpen, selectedWindow]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isTimerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        }
      }, 1000);
    } else if (isTimerRunning && timerMinutes === 0 && timerSeconds === 0) {
      // Timer finished
      setIsTimerRunning(false);
      playNotificationSound();
      handleTimerComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerMinutes, timerSeconds]);

  // Add timer helper functions
  const playNotificationSound = () => {
    // Create audio context for notification sound
    const audioContext = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5,
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const handleTimerComplete = () => {
    if (timerMode === "work") {
      setPomodoroCount((prev) => prev + 1);
      if (pomodoroCount + 1 >= 4) {
        setTimerMode("longBreak");
        setTimerMinutes(15);
        setPomodoroCount(0);
      } else {
        setTimerMode("break");
        setTimerMinutes(5);
      }
    } else {
      setTimerMode("work");
      setTimerMinutes(customMinutes);
    }
    setTimerSeconds(0);
  };

  const startTimer = () => setIsTimerRunning(true);
  const pauseTimer = () => setIsTimerRunning(false);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerMinutes(customMinutes);
    setTimerSeconds(0);
    setTimerMode("work");
    setPomodoroCount(0);
  };

  const setCustomTimer = (minutes: number) => {
    setCustomMinutes(minutes);
    setTimerMinutes(minutes);
    setTimerSeconds(0);
    setIsTimerRunning(false);
  };

  // Add event listener for taskbar resume button
  useEffect(() => {
    const handleOpenResume = () => {
      setIsResumeOpen(true);
    };

    window.addEventListener("openResume", handleOpenResume);
    return () => window.removeEventListener("openResume", handleOpenResume);
  }, []);

  // Handle keyboard navigation for resume overlay
  useEffect(() => {
    if (!isResumeOpen) return;

    const handleResumeKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsResumeOpen(false);
      }
    };

    window.addEventListener("keydown", handleResumeKeyDown);
    return () => window.removeEventListener("keydown", handleResumeKeyDown);
  }, [isResumeOpen]);

  // Media player removed

  // Prevent background scrolling when window is expanded on mobile
  useEffect(() => {
    if (expandWindow) {
      // Lock body scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      // Unlock body scroll
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [expandWindow]);

  // Add this new state variable for expanded timer navigation (near the other timer states around line 45)
  const [selectedExpandedTimerButton, setSelectedExpandedTimerButton] =
    useState(0);
  // 0-2: start/pause, reset, and exit buttons, 3-7: custom timer buttons (5m, 15m, 30m, 45m, 60m)

  // Update the existing timer keyboard navigation useEffect to handle both compact and expanded modes
  useEffect(() => {
    if (selectedWindow !== "timer") return;

    const handleTimerKeyDown = (e: KeyboardEvent) => {
      if (expandWindow === "timer") {
        // Expanded timer navigation with two levels: start/reset/exit (0-2) and custom timers (3-7)
        if (e.key === "ArrowUp") {
          e.preventDefault();
          // Move between levels: if in custom timers (3-7), go to start/reset/exit level
          if (selectedExpandedTimerButton >= 3) {
            setSelectedExpandedTimerButton(0); // Go to start button
          } else {
            // If in start/reset/exit level, go to custom timers
            setSelectedExpandedTimerButton(3); // Go to first custom timer (5m)
          }
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          // Move between levels: if in start/reset/exit (0-2), go to custom timers
          if (selectedExpandedTimerButton <= 2) {
            setSelectedExpandedTimerButton(3); // Go to first custom timer (5m)
          } else {
            // If in custom timers, go to start/reset/exit level
            setSelectedExpandedTimerButton(0); // Go to start button
          }
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (selectedExpandedTimerButton <= 2) {
            // Navigate within start/reset/exit level (0-2)
            setSelectedExpandedTimerButton((prev) => (prev - 1 + 3) % 3);
          } else {
            // Navigate within custom timer level (3-7)
            setSelectedExpandedTimerButton((prev) => Math.max(3, prev - 1));
          }
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          if (selectedExpandedTimerButton <= 2) {
            // Navigate within start/reset/exit level (0-2)
            setSelectedExpandedTimerButton((prev) => (prev + 1) % 3);
          } else {
            // Navigate within custom timer level (3-7)
            setSelectedExpandedTimerButton((prev) => Math.min(7, prev + 1));
          }
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (selectedExpandedTimerButton === 0) {
            isTimerRunning ? pauseTimer() : startTimer();
          } else if (selectedExpandedTimerButton === 1) {
            resetTimer();
          } else if (selectedExpandedTimerButton === 2) {
            setExpandWindow(""); // Exit expanded view
          } else {
            // Custom timer buttons (3-7 correspond to [5, 15, 30, 45, 60])
            const customTimes = [5, 15, 30, 45, 60];
            const timeIndex = selectedExpandedTimerButton - 3;
            setCustomTimer(customTimes[timeIndex]);
          }
        }
      } else {
        // Compact timer navigation (existing code)
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedTimerButton((prev) => (prev - 1 + 3) % 3); // Navigate through 0, 1, 2
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedTimerButton((prev) => (prev + 1) % 3); // Navigate through 0, 1, 2
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (selectedTimerButton === 0) {
            isTimerRunning ? pauseTimer() : startTimer();
          } else if (selectedTimerButton === 1) {
            resetTimer();
          } else if (selectedTimerButton === 2) {
            setExpandWindow("timer"); // Open edit mode
          }
        }
      }
    };

    window.addEventListener("keydown", handleTimerKeyDown);
    return () => window.removeEventListener("keydown", handleTimerKeyDown);
  }, [
    selectedWindow,
    selectedTimerButton,
    selectedExpandedTimerButton,
    isTimerRunning,
    expandWindow,
  ]);

  return (
    <div
      className={`${
        isDark ? "bg-transparent text-white" : "bg-transparent text-black"
      } relative z-10 min-h-screen w-screen flex items-center justify-center py-6 pb-24 lg:py-8 lg:pb-20 overscroll-none`}
    >
      {/* Bento box grid */}
      <div
        // Line 815 - Update the className
        className={`relative grid grid-cols-2 lg:grid-cols-4 lg:row-span-4 w-full mx-1 gap-2 rounded-2xl p-1.5 ${gridThemeClass} max-w-6xl 2xl:max-w-7xl 2xl:gap-3 ${
          isDark ? "shadow-xl" : "shadow-sm"
        }`}
      >
        {/* Main terminal window */}
        <MeCollapsed
          isDark={isDark}
          selectedWindow={selectedWindow}
          windowThemeClass={windowThemeClass}
          headerClass={headerClass}
          selectedAscii={selectedAscii}
          personalInfo={personalInfo}
          time={time}
          setExpandWindow={setExpandWindow}
          setSelectedWindow={setSelectedWindow}
          isHidden={Boolean(expandWindow)}
        />

        {/* Skills/Courses/Certs */}
        <ToolboxCollapsed
          isDark={isDark}
          selectedWindow={selectedWindow}
          expandWindow={expandWindow}
          windowThemeClass={windowThemeClass}
          headerClass={headerClass}
          tabClass={tabClass}
          toolboxTab={toolboxTab}
          setToolboxTab={setToolboxTab}
          hoveredToolboxIndex={hoveredToolboxIndex}
          setHoveredToolboxIndex={setHoveredToolboxIndex}
          setSelectedWindow={setSelectedWindow}
          setExpandWindow={setExpandWindow}
          skillsCoursesCerts={skillsCoursesCerts}
        />

        {/* LeetCode */}
        {!isTimerOpen && (
          <LeetCodeCollapsed
            isDark={isDark}
            selectedWindow={selectedWindow}
            windowThemeClass={windowThemeClass}
            headerClass={headerClass}
            setExpandWindow={setExpandWindow}
            socialLeetCodeUrl={personalInfo.socialLinks.leetcode}
            leetCode={leetCode}
            leetCodeError={leetCodeError}
            isHidden={Boolean(expandWindow)}
            onSelect={() => setSelectedWindow("leetcode")}
          />
        )}

        {/* CLI LLM about me */}
        <CliCollapsed
          isDark={isDark}
          selectedWindow={selectedWindow}
          windowThemeClass={windowThemeClass}
          headerClass={headerClass}
          setExpandWindow={setExpandWindow}
          command={command}
          setCommand={setCommand}
          lastCommand={lastCommand}
          response={response}
          renderTextWithLinks={renderTextWithLinks}
          inputRef={inputRef}
          focusInput={focusInput}
          handleCommand={handleCommand}
          setSelectedWindow={setSelectedWindow}
          isHidden={Boolean(expandWindow)}
        />

        {/* Experience */}
        <ExperienceCollapsed
          isDark={isDark}
          selectedWindow={selectedWindow}
          expandWindow={expandWindow}
          windowThemeClass={windowThemeClass}
          headerClass={headerClass}
          tabClass={tabClass}
          experienceFilter={experienceFilter}
          setExperienceFilter={setExperienceFilter}
          setExperienceIndex={setExperienceIndex}
          hoveredExperienceIndex={hoveredExperienceIndex}
          setHoveredExperienceIndex={setHoveredExperienceIndex}
          filteredExperiences={filteredExperiences}
          setExpandWindow={setExpandWindow}
          setSelectedWindow={setSelectedWindow}
          setSelectExperience={setSelectExperience}
          experienceFilterCounts={experienceFilterCounts}
        />

        {/* Projects */}
        <ProjectsCollapsed
          isDark={isDark}
          selectedWindow={selectedWindow}
          expandWindow={expandWindow}
          windowThemeClass={windowThemeClass}
          headerClass={headerClass}
          tabClass={tabClass}
          projectFilter={projectFilter}
          setProjectFilter={setProjectFilter}
          setProjectIndex={setProjectIndex}
          hoveredProjectIndex={hoveredProjectIndex}
          setHoveredProjectIndex={setHoveredProjectIndex}
          filteredProjects={filteredProjects}
          setExpandWindow={setExpandWindow}
          setSelectedWindow={setSelectedWindow}
          setSelectProject={setSelectProject}
          projectFilterCounts={projectFilterCounts}
        />

        {/* Expanded overlay when user clicks */}
        {expandWindow && (
          <div className="lg:absolute lg:inset-0 fixed inset-0 z-20 transition-opacity duration-300 lg:h-full h-screen max-h-screen overflow-hidden flex items-center justify-center lg:items-stretch lg:justify-stretch">
            {expandWindow === "me" && (
              <MeExpanded
                isDark={isDark}
                selectedWindow={selectedWindow}
                windowThemeClass={windowThemeClass}
                headerClass={headerClass}
                selectedAscii={selectedAscii}
                personalInfo={personalInfo}
                time={time}
                setExpandWindow={setExpandWindow}
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
                experienceFilter={experienceFilter}
                setExperienceFilter={setExperienceFilter}
                setExperienceIndex={setExperienceIndex}
                hoveredExperienceIndex={hoveredExperienceIndex}
                setHoveredExperienceIndex={setHoveredExperienceIndex}
                filteredExperiences={filteredExperiences}
                experiencesData={experiencesData}
                selectExperience={selectExperience}
                setSelectExperience={setSelectExperience}
                selectedExperienceLinkIndex={selectedExperienceLinkIndex}
                setExpandWindow={setExpandWindow}
                setSelectedWindow={setSelectedWindow}
                experienceViewMode={experienceViewMode}
                setExperienceViewMode={setExperienceViewMode}
                experienceFilterCounts={experienceFilterCounts}
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
                projectFilter={projectFilter}
                setProjectFilter={setProjectFilter}
                setProjectIndex={setProjectIndex}
                hoveredProjectIndex={hoveredProjectIndex}
                setHoveredProjectIndex={setHoveredProjectIndex}
                filteredProjects={filteredProjects}
                projectsData={projectsData}
                selectProject={selectProject}
                setSelectProject={setSelectProject}
                selectedLinkIndex={selectedLinkIndex}
                setExpandWindow={setExpandWindow}
                setSelectedWindow={setSelectedWindow}
                projectFilterCounts={projectFilterCounts}
              />
            )}
            {expandWindow === "skills" && (
              <ToolboxExpanded
                isDark={isDark}
                selectedWindow={selectedWindow}
                windowThemeClass={windowThemeClass}
                headerClass={headerClass}
                tabClass={tabClass}
                toolboxTab={toolboxTab}
                setToolboxTab={setToolboxTab}
                hoveredToolboxIndex={hoveredToolboxIndex}
                setHoveredToolboxIndex={setHoveredToolboxIndex}
                setSelectedWindow={setSelectedWindow}
                setExpandWindow={setExpandWindow}
                skillsCoursesCerts={skillsCoursesCerts}
              />
            )}
            {expandWindow === "leetcode" && (
              <LeetCodeExpanded
                isDark={isDark}
                selectedWindow={selectedWindow}
                windowThemeClass={windowThemeClass}
                headerClass={headerClass}
                setExpandWindow={setExpandWindow}
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
                setExpandWindow={setExpandWindow}
                command={command}
                setCommand={setCommand}
                lastCommand={lastCommand}
                response={response}
                renderTextWithLinks={renderTextWithLinks}
                inputRef={inputRef}
                focusInput={focusInput}
                handleCommand={handleCommand}
              />
            )}
          </div>
        )}
      </div>

      <ResumeWindow
        isOpen={isResumeOpen}
        overlayThemeClass={overlayThemeClass}
        headerClass={headerClass}
        resumeFileName={personalInfo.resumeFileName}
        personName={personalInfo.name}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Taskbar menu */}
      <Taskbar theme={theme} />
    </div>
  );
};

export default App;
