import { useEffect } from "react";
import type { ExperienceItem, ProjectItem } from "@/types";

const WINDOW_ORDER = [
  "me",
  "experience",
  "projects",
  "skills",
  "leetcode",
  "cli",
  "apps",
] as const;

type UseWindowNavigationArgs = {
  selectedWindow: string;
  setSelectedWindow: (value: string) => void;
  expandWindow: string;
  setExpandWindow: (value: string) => void;
  meWindowRef: React.RefObject<HTMLDivElement>;
  isResumeOpen: boolean;
  experiencesData: ExperienceItem[];
  filteredExperiences: ExperienceItem[];
  experienceIndex: number;
  setExperienceIndex: React.Dispatch<React.SetStateAction<number>>;
  setHoveredExperienceIndex: (value: number | null) => void;
  selectExperience: string;
  setSelectExperience: (value: string) => void;
  selectedExperienceLinkIndex: number;
  setSelectedExperienceLinkIndex: React.Dispatch<React.SetStateAction<number>>;
  projectsData: ProjectItem[];
  filteredProjects: ProjectItem[];
  projectIndex: number;
  setProjectIndex: React.Dispatch<React.SetStateAction<number>>;
  setHoveredProjectIndex: (value: number | null) => void;
  selectProject: string;
  setSelectProject: (value: string) => void;
  selectedLinkIndex: number;
  setSelectedLinkIndex: React.Dispatch<React.SetStateAction<number>>;
  experienceFilter: string;
  projectFilter: string;
};

export const useWindowNavigation = ({
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
}: UseWindowNavigationArgs) => {
  // Main key handler: enter/arrows for the focused window
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isResumeOpen) return;

      if (selectedWindow === "me" && e.key === "Enter") {
        setExpandWindow("me");
      }

      if (expandWindow === "me") {
        if (e.key === "Enter") {
          setExpandWindow("");
        } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
          if (meWindowRef.current) {
            const delta = e.key === "ArrowUp" ? -50 : 50;
            meWindowRef.current.scrollTop += delta;
          }
        }
      }

      if (selectedWindow === "skills" && e.key === "Enter") {
        setExpandWindow("skills");
      }
      if (expandWindow === "skills" && e.key === "Enter") {
        setExpandWindow("");
      }

      if (selectedWindow === "experience") {
        if (selectExperience) {
          const data = experiencesData.find((x) => x.title === selectExperience);
          if (!data) return;
          const total = data.links.length + 1;

          if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedExperienceLinkIndex((prev) => (prev - 1 + total) % total);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedExperienceLinkIndex((prev) => (prev + 1) % total);
          } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedExperienceLinkIndex < data.links.length) {
              window.open(data.links[selectedExperienceLinkIndex].url, "_blank");
            } else {
              setSelectExperience("");
              setExpandWindow("");
            }
          }
        } else if (filteredExperiences.length > 0) {
          if (e.key === "ArrowUp") {
            setExperienceIndex((prev) => {
              const next = prev === 0 ? filteredExperiences.length - 1 : prev - 1;
              setHoveredExperienceIndex(next);
              return next;
            });
          } else if (e.key === "ArrowDown") {
            setExperienceIndex((prev) => {
              const next = (prev + 1) % filteredExperiences.length;
              setHoveredExperienceIndex(next);
              return next;
            });
          } else if (e.key === "Enter") {
            setSelectExperience(filteredExperiences[experienceIndex].title);
            setExpandWindow("experience");
          }
        }
      } else if (selectedWindow === "projects") {
        if (selectProject) {
          const data = projectsData.find((p) => p.title === selectProject);
          if (!data) return;
          const total = data.links.length + 1;

          if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedLinkIndex((prev) => (prev - 1 + total) % total);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedLinkIndex((prev) => (prev + 1) % total);
          } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedLinkIndex < data.links.length) {
              window.open(data.links[selectedLinkIndex].url, "_blank");
            } else {
              setSelectProject("");
              setExpandWindow("");
            }
          }
        } else if (filteredProjects.length > 0) {
          if (e.key === "ArrowUp") {
            setProjectIndex((prev) => {
              const next = prev === 0 ? filteredProjects.length - 1 : prev - 1;
              setHoveredProjectIndex(next);
              return next;
            });
          } else if (e.key === "ArrowDown") {
            setProjectIndex((prev) => {
              const next = (prev + 1) % filteredProjects.length;
              setHoveredProjectIndex(next);
              return next;
            });
          } else if (e.key === "Enter") {
            setSelectProject(filteredProjects[projectIndex].title);
            setExpandWindow("projects");
          }
        }
      }

      if (selectedWindow === "leetcode" && e.key === "Enter") {
        setExpandWindow("leetcode");
      }
      if (expandWindow === "leetcode" && e.key === "Enter") {
        setExpandWindow("");
      }

      if (selectedWindow === "apps" && e.key === "Enter") {
        window.open("/apps", "_blank");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedWindow,
    expandWindow,
    experienceIndex,
    projectIndex,
    selectProject,
    selectedLinkIndex,
    selectExperience,
    selectedExperienceLinkIndex,
    isResumeOpen,
    filteredExperiences,
    filteredProjects,
    experiencesData,
    projectsData,
    meWindowRef,
    setExperienceIndex,
    setExpandWindow,
    setHoveredExperienceIndex,
    setHoveredProjectIndex,
    setProjectIndex,
    setSelectedExperienceLinkIndex,
    setSelectedLinkIndex,
    setSelectExperience,
    setSelectProject,
  ]);

  // Reset hover + clamp index when filters change
  useEffect(() => {
    setHoveredExperienceIndex(null);
    if (experienceIndex >= filteredExperiences.length) {
      setExperienceIndex(0);
    }
  }, [
    experienceFilter,
    experienceIndex,
    filteredExperiences.length,
    setExperienceIndex,
    setHoveredExperienceIndex,
  ]);

  useEffect(() => {
    setHoveredProjectIndex(null);
    if (projectIndex >= filteredProjects.length) {
      setProjectIndex(0);
    }
  }, [
    projectFilter,
    projectIndex,
    filteredProjects.length,
    setProjectIndex,
    setHoveredProjectIndex,
  ]);

  // Default link selection to "back" entry when an item is selected
  useEffect(() => {
    if (selectProject) {
      const data = projectsData.find((p) => p.title === selectProject);
      if (data) setSelectedLinkIndex(data.links.length);
    } else {
      setSelectedLinkIndex(0);
    }
  }, [selectProject, projectsData, setSelectedLinkIndex]);

  useEffect(() => {
    if (selectExperience) {
      const data = experiencesData.find((e) => e.title === selectExperience);
      if (data) setSelectedExperienceLinkIndex(data.links.length);
    } else {
      setSelectedExperienceLinkIndex(0);
    }
  }, [selectExperience, experiencesData, setSelectedExperienceLinkIndex]);

  // Auto-focus me window when expanded for keyboard scroll
  useEffect(() => {
    if (expandWindow === "me" && meWindowRef.current) {
      meWindowRef.current.focus();
    }
  }, [expandWindow, meWindowRef]);

  // Left/right cycle between bento windows when not in expanded view
  useEffect(() => {
    if (isResumeOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (expandWindow) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

      const currentIndex = WINDOW_ORDER.indexOf(
        selectedWindow as (typeof WINDOW_ORDER)[number],
      );
      const length = WINDOW_ORDER.length;
      const nextIndex =
        e.key === "ArrowRight"
          ? (currentIndex + 1) % length
          : (currentIndex - 1 + length) % length;
      setSelectedWindow(WINDOW_ORDER[nextIndex]);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedWindow, expandWindow, isResumeOpen, setSelectedWindow]);
};
