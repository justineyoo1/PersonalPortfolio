import { useEffect } from "react";

type LinkItem = { name: string; url: string };

type ExperienceItem = {
  title: string;
  links: LinkItem[];
};

type ProjectItem = {
  title: string;
  links: LinkItem[];
};

type UseWindowNavigationArgs = {
  selectedWindow: string;
  setSelectedWindow: (value: string) => void;
  expandWindow: string;
  setExpandWindow: (value: string) => void;
  meWindowRef: React.RefObject<HTMLDivElement>;
  isResumeOpen: boolean;
  isMediaPlayerOpen: boolean;
  isTimerOpen: boolean;
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
}: UseWindowNavigationArgs) => {
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
            const scrollAmount = 50;
            if (e.key === "ArrowUp") {
              meWindowRef.current.scrollTop -= scrollAmount;
            } else {
              meWindowRef.current.scrollTop += scrollAmount;
            }
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
          const selectedExperienceData = experiencesData.find(
            (exp) => exp.title === selectExperience,
          );
          if (selectedExperienceData) {
            const totalItems = selectedExperienceData.links.length + 1;

            if (e.key === "ArrowUp") {
              e.preventDefault();
              setSelectedExperienceLinkIndex(
                (prev) => (prev - 1 + totalItems) % totalItems,
              );
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              setSelectedExperienceLinkIndex((prev) => (prev + 1) % totalItems);
            } else if (e.key === "Enter") {
              e.preventDefault();
              if (
                selectedExperienceLinkIndex <
                selectedExperienceData.links.length
              ) {
                window.open(
                  selectedExperienceData.links[selectedExperienceLinkIndex].url,
                  "_blank",
                );
              } else {
                setSelectExperience("");
                setExpandWindow("");
              }
            }
          }
        } else {
          if (filteredExperiences.length === 0) return;
          if (e.key === "ArrowUp") {
            setExperienceIndex((prev) => {
              const newIndex =
                prev === 0 ? filteredExperiences.length - 1 : prev - 1;
              setHoveredExperienceIndex(newIndex);
              return newIndex;
            });
          } else if (e.key === "ArrowDown") {
            setExperienceIndex((prev) => {
              const newIndex = (prev + 1) % filteredExperiences.length;
              setHoveredExperienceIndex(newIndex);
              return newIndex;
            });
          } else if (e.key === "Enter") {
            setSelectExperience(filteredExperiences[experienceIndex].title);
            setExpandWindow("experience");
          }
        }
      } else if (selectedWindow === "projects") {
        if (selectProject) {
          const selectedProjectData = projectsData.find(
            (p) => p.title === selectProject,
          );
          if (selectedProjectData) {
            const totalItems = selectedProjectData.links.length + 1;
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setSelectedLinkIndex(
                (prev) => (prev - 1 + totalItems) % totalItems,
              );
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              setSelectedLinkIndex((prev) => (prev + 1) % totalItems);
            } else if (e.key === "Enter") {
              e.preventDefault();
              if (selectedLinkIndex < selectedProjectData.links.length) {
                window.open(
                  selectedProjectData.links[selectedLinkIndex].url,
                  "_blank",
                );
              } else {
                setSelectProject("");
                setExpandWindow("");
              }
            }
          }
        } else {
          if (filteredProjects.length === 0) return;
          if (e.key === "ArrowUp") {
            setProjectIndex((prev) => {
              const newIndex =
                prev === 0 ? filteredProjects.length - 1 : prev - 1;
              setHoveredProjectIndex(newIndex);
              return newIndex;
            });
          } else if (e.key === "ArrowDown") {
            setProjectIndex((prev) => {
              const newIndex = (prev + 1) % filteredProjects.length;
              setHoveredProjectIndex(newIndex);
              return newIndex;
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
    isMediaPlayerOpen,
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

  useEffect(() => {
    if (selectProject) {
      const selectedProjectData = projectsData.find(
        (p) => p.title === selectProject,
      );
      if (selectedProjectData) {
        setSelectedLinkIndex(selectedProjectData.links.length);
      }
    } else {
      setSelectedLinkIndex(0);
    }
  }, [selectProject, projectsData, setSelectedLinkIndex]);

  useEffect(() => {
    if (selectExperience) {
      const selectedExperienceData = experiencesData.find(
        (exp) => exp.title === selectExperience,
      );
      if (selectedExperienceData) {
        setSelectedExperienceLinkIndex(selectedExperienceData.links.length);
      }
    } else {
      setSelectedExperienceLinkIndex(0);
    }
  }, [selectExperience, experiencesData, setSelectedExperienceLinkIndex]);

  useEffect(() => {
    if (expandWindow === "me" && meWindowRef.current) {
      meWindowRef.current.focus();
    }
  }, [expandWindow, meWindowRef]);

  useEffect(() => {
    if (isResumeOpen || isMediaPlayerOpen) return;

    const windowOrder = isTimerOpen
      ? ["me", "experience", "projects", "skills", "timer", "cli", "apps"]
      : ["me", "experience", "projects", "skills", "leetcode", "cli", "apps"];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (expandWindow) return;

      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const currentIndex = windowOrder.indexOf(selectedWindow);
        let nextIndex;
        if (e.key === "ArrowRight") {
          nextIndex = (currentIndex + 1) % windowOrder.length;
        } else {
          nextIndex = (currentIndex - 1 + windowOrder.length) % windowOrder.length;
        }
        setSelectedWindow(windowOrder[nextIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedWindow,
    expandWindow,
    isTimerOpen,
    isResumeOpen,
    isMediaPlayerOpen,
    setSelectedWindow,
  ]);
};
