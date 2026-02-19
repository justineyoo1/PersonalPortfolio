import React, { useState, useEffect, useMemo, useRef } from "react";
import type { LeetCodeData } from "./types/indexs";
import {
  experiencesData,
  projectsData,
  asciiList,
  personalInfo,
  commandResponses,
  skillsCoursesCerts,
} from "./data/info";
import { Taskbar } from "./components/Taskbar";
import LeetCodeCalendar from "./components/LeetCodeCalendar";
import AnimatedEllipsis from "./components/AnimatedEllipsis";

type ExperienceFilter = "all" | "work" | "research";
type ToolboxTab = "skills" | "courses" | "certs";
type ProjectFilter = "all" | "swe" | "ml/data";

const App = () => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;

      // Check OS theme preference if no saved preference
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      } else {
        return "light";
      }
    }
    return "dark";
  });
  const [time, setTime] = useState(new Date());

  // const [count, setCount] = useState(0);
  const [selectedAscii] = useState(asciiList[0] ?? ""); // selected ascii art
  const [expandWindow, setExpandWindow] = useState(String); // which window is expanded
  const [selectedWindow, setSelectedWindow] = useState("me"); // which window is selected

  const [leetCode, setLeetCode] = useState<LeetCodeData | null>(null); // leetcode stats
  const [leetCodeError, setLeetCodeError] = useState("");
  // const [currentIndex, setCurrentIndex] = useState(0);

  const [experienceIndex, setExperienceIndex] = useState(0); // index of experience
  const [projectIndex, setProjectIndex] = useState(0); // index of project
  const [selectProject, setSelectProject] = useState(""); // selected project
  const [selectExperience, setSelectExperience] = useState(""); // selected experience
  const [experienceFilter, setExperienceFilter] = useState<ExperienceFilter>("all");
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
  const [command, setCommand] = useState("");
  const [lastCommand, setLastCommand] = useState("");
  const [response, setResponse] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
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

  // Add this near your other CLI state variables (around line 29)
  const [chatHistory, setChatHistory] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);

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

  const filteredProjects = useMemo(
    () =>
      projectsData.filter((project) => {
        if (projectFilter === "all") return true;
        return project.category === projectFilter;
      }),
    [projectFilter],
  );

  useEffect(() => {
    fetchLeetCode().then((data) => setLeetCode(data));
  }, []);

  // update time every second
  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  // handle keyboard navigation between list of exp & projs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isResumeOpen) return;

      if (selectedWindow === "me") {
        if (e.key === "Enter") {
          setExpandWindow("me");
        }
      }
      if (expandWindow === "me") {
        if (e.key === "Enter") {
          setExpandWindow("");
        } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
          if (meWindowRef.current) {
            const scrollAmount = 50; // pixels to scroll
            if (e.key === "ArrowUp") {
              meWindowRef.current.scrollTop -= scrollAmount;
            } else {
              meWindowRef.current.scrollTop += scrollAmount;
            }
          }
        }
      }
      if (selectedWindow === "skills") {
        if (e.key === "Enter") {
          setExpandWindow("skills");
        }
      }
      if (expandWindow === "skills") {
        if (e.key === "Enter") {
          setExpandWindow("");
        }
      }
      if (selectedWindow === "experience") {
        if (selectExperience) {
          // Navigation within expanded experience (for links)
          const selectedExperienceData = experiencesData.find(
            (exp) => exp.title === selectExperience,
          );
          if (selectedExperienceData) {
            const totalItems = selectedExperienceData.links.length + 1; // +1 for "back to experiences" button

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
                // Navigate to selected link
                window.open(
                  selectedExperienceData.links[selectedExperienceLinkIndex].url,
                  "_blank",
                );
              } else {
                // "back to experiences" button selected
                setSelectExperience("");
                setExpandWindow("");
              }
            }
          }
        } else {
          // Navigation between experiences (existing code)
          if (filteredExperiences.length === 0) {
            return;
          }
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
            console.log("hello");
            setExpandWindow("experience");
          }
        }
      } else if (selectedWindow === "projects") {
        if (selectProject) {
          // Navigation within expanded project (for links)
          const selectedProjectData = projectsData.find(
            (p) => p.title === selectProject,
          );
          if (selectedProjectData) {
            const totalItems = selectedProjectData.links.length + 1; // +1 for "back to projects" button

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
                // Navigate to selected link
                window.open(
                  selectedProjectData.links[selectedLinkIndex].url,
                  "_blank",
                );
              } else {
                // "back to projects" button selected
                setSelectProject("");
                setExpandWindow("");
              }
            }
          }
        } else {
          // Navigation between projects (existing code)
          if (filteredProjects.length === 0) {
            return;
          }
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
      if (selectedWindow === "leetcode") {
        if (e.key === "Enter") {
          setExpandWindow("leetcode");
        }
      }
      if (expandWindow === "leetcode") {
        if (e.key === "Enter") {
          setExpandWindow("");
        }
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
  ]);

  useEffect(() => {
    setHoveredExperienceIndex(null);
    if (experienceIndex >= filteredExperiences.length) {
      setExperienceIndex(0);
    }
  }, [experienceFilter, experienceIndex, filteredExperiences.length]);

  useEffect(() => {
    setHoveredProjectIndex(null);
    if (projectIndex >= filteredProjects.length) {
      setProjectIndex(0);
    }
  }, [projectFilter, projectIndex, filteredProjects.length]);

  useEffect(() => {
    setHoveredToolboxIndex(null);
  }, [toolboxTab]);

  // Reset selected link index when project changes - default to "back" button
  useEffect(() => {
    if (selectProject) {
      const selectedProjectData = projectsData.find(
        (p) => p.title === selectProject,
      );
      if (selectedProjectData) {
        // Set to the "back" button index (which is after all links)
        setSelectedLinkIndex(selectedProjectData.links.length);
      }
    } else {
      setSelectedLinkIndex(0);
    }
  }, [selectProject]);

  // Reset selected experience link index when experience changes - default to "back" button
  useEffect(() => {
    if (selectExperience) {
      const selectedExperienceData = experiencesData.find(
        (exp) => exp.title === selectExperience,
      );
      if (selectedExperienceData) {
        // Set to the "back" button index (which is after all links)
        setSelectedExperienceLinkIndex(selectedExperienceData.links.length);
      }
    } else {
      setSelectedExperienceLinkIndex(0);
    }
  }, [selectExperience]);

  async function fetchLeetCode() {
    setLeetCodeError("");

    // Primary path: Vercel function (/api/leetcode), used in production and vercel dev.
    try {
      const res = await fetch("/api/leetcode");
      if (res.ok) {
        return await res.json();
      }
      console.error(await res.text());
    } catch (error) {
      console.error("LeetCode API route failed:", error);
    }

    // Fallback path: direct provider call, useful when running only `vite` locally.
    try {
      const username = personalInfo.leetcodeUsername || "justineyoo";
      const res = await fetch(`https://leetcode-stats.tashif.codes/${username}`);
      if (!res.ok) {
        throw new Error(`Fallback failed: ${res.status}`);
      }

      const data = await res.json();
      return {
        easySolved: data.easySolved ?? 0,
        hardSolved: data.hardSolved ?? 0,
        mediumSolved: data.mediumSolved ?? 0,
        totalSolved: data.totalSolved ?? 0,
        submissionCalendar: data.submissionCalendar ?? {},
      } as LeetCodeData;
    } catch (error) {
      console.error("LeetCode fallback failed:", error);
      setLeetCodeError("unable to load leetcode stats");
      return null;
    }
  }

  // ask question to Gemini with client-side streaming
  // Replace the existing askQuestion function (lines 276-314)
  // Helper function to render text with clickable links and window triggers
  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    // Match patterns like [window:experience:Title Text] for clickable window triggers
    const windowRegex = /\[window:(experience|projects):([^\]]+)\]/g;

    const parts: Array<{
      type: "text" | "link" | "email" | "window";
      content: string;
      window?: string;
    }> = [];
    let lastIndex = 0;

    // Find all URLs, emails, and window triggers
    const matches = [
      ...Array.from(text.matchAll(urlRegex)).map((m) => ({
        index: m.index!,
        length: m[0].length,
        content: m[0],
        type: "link" as const,
        window: undefined as string | undefined,
      })),
      ...Array.from(text.matchAll(emailRegex)).map((m) => ({
        index: m.index!,
        length: m[0].length,
        content: m[0],
        type: "email" as const,
        window: undefined as string | undefined,
      })),
      ...Array.from(text.matchAll(windowRegex)).map((m) => ({
        index: m.index!,
        length: m[0].length,
        content: m[2], // The display text
        window: m[1], // The window name (experience or projects)
        type: "window" as const,
      })),
    ].sort((a, b) => a.index - b.index);

    matches.forEach((match) => {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: text.slice(lastIndex, match.index),
        });
      }

      // Add the match
      parts.push({
        type: match.type,
        content: match.content,
        window: match.window,
      });

      lastIndex = match.index + match.length;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex),
      });
    }

    return (
      <>
        {parts.map((part, index) => {
          if (part.type === "link") {
            return (
              <a
                key={index}
                href={part.content}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-1 rounded ${accentTextClass} hover:bg-gray-800/55 hover:text-white`}
              >
                {part.content}
              </a>
            );
          } else if (part.type === "email") {
            return (
              <a
                key={index}
                href={`mailto:${part.content}`}
                className={`px-1 rounded ${accentTextClass} hover:bg-gray-800/55 hover:text-white`}
              >
                {part.content}
              </a>
            );
          } else if (part.type === "window") {
            return (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandWindow(part.window!);
                  setSelectedWindow(part.window!);
                  // Also select the specific project/experience
                  if (part.window === "projects") {
                    setSelectProject(part.content);
                  } else if (part.window === "experience") {
                    setSelectExperience(part.content);
                  }
                }}
                className={`px-1 rounded ${accentTextClass} hover:bg-gray-800/55 hover:text-white cursor-pointer bg-transparent border-none p-0 font-mono`}
              >
                {part.content}
              </button>
            );
          } else {
            return <span key={index}>{part.content}</span>;
          }
        })}
      </>
    );
  };

  // Helper function to stream static responses word by word
  async function streamStaticResponse(
    text: string,
    onChunk: (chunk: string) => void,
  ) {
    const words = text.split(" ");

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const chunk = (i === 0 ? "" : " ") + word;
      onChunk(chunk);

      // Variable delay based on word length and punctuation for natural feel
      let delay = 25 + Math.random() * 25; // Base 25-50ms

      // Longer pause after punctuation
      if (word.includes(".") || word.includes("!") || word.includes("?")) {
        delay += 200 + Math.random() * 100;
      } else if (word.includes(",") || word.includes(";")) {
        delay += 100 + Math.random() * 50;
      }

      // Shorter delay for short words
      if (word.length <= 2) {
        delay *= 0.7;
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  async function askQuestion(q: string, onChunk: (chunk: string) => void) {
    // Build the conversation history including the new question
    const messages = [...chatHistory, { role: "user" as const, content: q }];

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }), // Send full conversation instead of just question
    });

    const data = await res.json();
    const fullResponse = data.answer;

    // Stream the response word by word for that authentic feel
    const words = fullResponse.split(" ");
    let currentText = "";

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const chunk = (i === 0 ? "" : " ") + word;
      currentText += chunk;
      onChunk(chunk);

      // Variable delay based on word length and punctuation for natural feel
      let delay = 25 + Math.random() * 25; // Base 25-50ms

      // Longer pause after punctuation
      if (word.includes(".") || word.includes("!") || word.includes("?")) {
        delay += 200 + Math.random() * 100;
      } else if (word.includes(",") || word.includes(";")) {
        delay += 100 + Math.random() * 50;
      }

      // Shorter delay for short words
      if (word.length <= 2) {
        delay *= 0.7;
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // After streaming is complete, update chat history
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: q },
      { role: "assistant", content: fullResponse },
    ]);
  }

  // handle command input
  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && command) {
      const trimmedCommand = command.trim().toLowerCase();
      setLastCommand(command);
      setResponse(""); // Clear previous response
      setCommand("");

      // Handle local commands
      if (trimmedCommand === "about") {
        await streamStaticResponse(commandResponses.about, (chunk: string) => {
          setResponse((prev) => prev + chunk);
        });
        setChatHistory((prev) => [
          ...prev,
          { role: "user", content: command },
          { role: "assistant", content: commandResponses.about },
        ]);
        return;
      }

      if (
        trimmedCommand === "experience" ||
        trimmedCommand === "exp" ||
        trimmedCommand === "experiences"
      ) {
        try {
          const experienceList = experiencesData
            .map(
              (exp) =>
                `• [window:experience:${exp.title}] (${exp.date})${exp.description ? "\n  " + exp.description.split("\n")[0].substring(0, 100) + "..." : ""}`,
            )
            .join("\n\n");
          const experienceResponse = `here's my experience so far:\n\n${experienceList}\n\nclick any title to see more details!`;
          await streamStaticResponse(experienceResponse, (chunk: string) => {
            setResponse((prev) => prev + chunk);
          });
          setChatHistory((prev) => [
            ...prev,
            { role: "user", content: command },
            { role: "assistant", content: experienceResponse },
          ]);
        } catch (error) {
          console.error("Error displaying experience:", error);
          setResponse("sorry, something went wrong. try again?");
        }
        return;
      }

      if (trimmedCommand === "projects" || trimmedCommand === "project") {
        try {
          const projectsList = projectsData
            .map(
              (proj) =>
                `• [window:projects:${proj.title}] (${proj.date})${proj.description ? "\n  " + proj.description.split("\n")[0].substring(0, 100) + "..." : ""}`,
            )
            .join("\n\n");
          const projectsResponse = `here are my projects:\n\n${projectsList}\n\nclick any title to see more details!`;
          await streamStaticResponse(projectsResponse, (chunk: string) => {
            setResponse((prev) => prev + chunk);
          });
          setChatHistory((prev) => [
            ...prev,
            { role: "user", content: command },
            { role: "assistant", content: projectsResponse },
          ]);
          return;
        } catch (error) {
          console.error("Error displaying projects:", error);
          setResponse("sorry, something went wrong. try again?");
        }
        return;
      }

      if (trimmedCommand === "skills" || trimmedCommand === "skill") {
        try {
          await streamStaticResponse(commandResponses.skills, (chunk: string) => {
            setResponse((prev) => prev + chunk);
          });
          setChatHistory((prev) => [
            ...prev,
            { role: "user", content: command },
            { role: "assistant", content: commandResponses.skills },
          ]);
          return;
        } catch (error) {
          console.error("Error displaying skills:", error);
          setResponse("sorry, something went wrong. try again?");
        }
      }

      if (trimmedCommand === "goals" || trimmedCommand === "goal") {
        try {
          await streamStaticResponse(commandResponses.goals, (chunk: string) => {
            setResponse((prev) => prev + chunk);
          });
          setChatHistory((prev) => [
            ...prev,
            { role: "user", content: command },
            { role: "assistant", content: commandResponses.goals },
          ]);
          return;
        } catch (error) {
          console.error("Error displaying goals:", error);
          setResponse("sorry, something went wrong. try again?");
        }
        return;
      }

      if (trimmedCommand === "funfact") {
        try {
          await streamStaticResponse(commandResponses.funfact, (chunk: string) => {
            setResponse((prev) => prev + chunk);
          });
          setChatHistory((prev) => [
            ...prev,
            { role: "user", content: command },
            { role: "assistant", content: commandResponses.funfact },
          ]);
          return;
        } catch (error) {
          console.error("Error displaying funfact:", error);
          setResponse("sorry, something went wrong. try again?");
        }
        return;
      }

      if (trimmedCommand === "contact") {
        try {
          await streamStaticResponse(commandResponses.contact, (chunk: string) => {
            setResponse((prev) => prev + chunk);
          });
          setChatHistory((prev) => [
            ...prev,
            { role: "user", content: command },
            { role: "assistant", content: commandResponses.contact },
          ]);
        } catch (error) {
          console.error("Error displaying contact:", error);
          setResponse("sorry, something went wrong. try again?");
        }
        return;
      }

      if (
        trimmedCommand === "commands" ||
        trimmedCommand === "command" ||
        trimmedCommand === "help" ||
        trimmedCommand === "cmd"
      ) {
        try {
          await streamStaticResponse(commandResponses.commands, (chunk: string) => {
            setResponse((prev) => prev + chunk);
          });
          setChatHistory((prev) => [
            ...prev,
            { role: "user", content: command },
            { role: "assistant", content: commandResponses.commands },
          ]);
        } catch (error) {
          console.error("Error displaying commands:", error);
          setResponse("sorry, something went wrong. try again?");
        }
        return;
      }

      // Stream the response from AI for all other commands
      try {
        await askQuestion(command, (chunk: string) => {
          setResponse((prev) => prev + chunk);
        });
      } catch (error) {
        console.error("Error streaming response:", error);
        setResponse("sorry, something went wrong. try again?");
      }
    }
  };

  useEffect(() => {
    if (selectedWindow === "cli") {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [selectedWindow]);

  // Auto-focus the expanded me window for keyboard navigation
  useEffect(() => {
    if (expandWindow === "me" && meWindowRef.current) {
      meWindowRef.current.focus();
    }
  }, [expandWindow]);

  // theme toggle
  useEffect(() => {
    const handler = () =>
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    window.addEventListener("toggleTheme", handler);
    return () => window.removeEventListener("toggleTheme", handler);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const isDark = theme === "dark";
  const accentTextClass = isDark ? "text-[#60A5FA]" : "text-[#2563EB]";
  const mutedTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const windowThemeClass = isDark
    ? "bg-[#0B0F14]/90 border border-gray-700"
    : "bg-[#F6F6F6]/90 border border-gray-300";
  const gridThemeClass = isDark
    ? "bg-[#111827]/45 border border-gray-700"
    : "bg-gray-100/60 border border-gray-300";
  const overlayThemeClass = isDark
    ? "bg-[#0B0F14]/95 border border-gray-700"
    : "bg-white border border-gray-300";
  const headerClass = (selected: boolean) =>
    `py-0.5 text-[13px] tracking-wide ${
      isDark
      ? selected
        ? "bg-white text-black"
        : "bg-gray-500 text-black"
      : selected
        ? "bg-gray-500 text-black"
        : "bg-gray-200 text-black"
    }`;
  const tabClass = (active: boolean) =>
    active
      ? isDark
        ? "px-1.5 py-0.5 rounded shrink-0 leading-none bg-gray-200 text-black"
        : "px-1.5 py-0.5 rounded shrink-0 leading-none bg-gray-800 text-white"
      : isDark
        ? "px-1.5 py-0.5 rounded shrink-0 leading-none text-[#60A5FA] hover:bg-gray-800/55"
        : "px-1.5 py-0.5 rounded shrink-0 leading-none text-[#2563EB] hover:bg-gray-200/65";

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    // keyboard navigation between for windows using < and >

    if (isResumeOpen || isMediaPlayerOpen) return;

    const windowOrder = isTimerOpen
      ? ["me", "experience", "projects", "skills", "timer", "cli"]
      : ["me", "experience", "projects", "skills", "leetcode", "cli"];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (expandWindow) return;

      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const currentIndex = windowOrder.indexOf(selectedWindow);
        let nextIndex;

        if (e.key === "ArrowRight") {
          nextIndex = (currentIndex + 1) % windowOrder.length;
        } else {
          // ArrowLeft
          nextIndex =
            (currentIndex - 1 + windowOrder.length) % windowOrder.length;
        }

        setSelectedWindow(windowOrder[nextIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedWindow,
    expandWindow,
    isTimerOpen,
    isResumeOpen,
    isMediaPlayerOpen,
  ]);

  // Handle closing timer when it's the selected window
  useEffect(() => {
    if (!isTimerOpen && selectedWindow === "timer") {
      setSelectedWindow("skills");
      setExpandWindow("");
    }
  }, [isTimerOpen, selectedWindow]);

  useEffect(() => {
    let interval: number;

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

    return () => clearInterval(interval);
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

  // Add effect to listen for OS theme changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e: MediaQueryListEvent) => {
        // Only update theme if user hasn't manually set a preference
        const savedTheme = localStorage.getItem("theme");
        if (!savedTheme) {
          setTheme(e.matches ? "dark" : "light");
        }
      };

      // Listen for changes in OS theme preference
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return (
    <div
      className={`${
        isDark
          ? "bg-black text-white lg:bg-[url('/creation_of_adam.jpeg')]"
          : "bg-white text-black lg:bg-[url('/creation_of_adam_light.jpg')]"
      } min-h-screen w-screen flex items-center justify-center py-6 pb-24 lg:py-8 lg:pb-20 bg-fixed bg-cover bg-center overscroll-none`}
    >
      {/* Bento box grid */}
      <div
        // Line 815 - Update the className
        className={`relative grid grid-cols-2 lg:grid-cols-4 lg:row-span-4 w-full mx-1 gap-2 rounded-2xl p-1.5 ${gridThemeClass} max-w-6xl 2xl:max-w-7xl 2xl:gap-3 ${
          isDark ? "shadow-xl" : "shadow-sm"
        }`}
      >
        {/* Main terminal window */}
        <div
          className={` ${windowThemeClass} rounded-xl col-span-2 flex flex-col h-[300px] lg:h-[260px] min-h-0 overflow-hidden order-1 ${
            expandWindow ? "opacity-0" : ""
          } transition-opacity duration-500`}
          onClick={() => {
            setSelectedWindow("me");
            console.log(selectedWindow);
          }}
        >
          <p
            className={`rounded-t-xl text-sm text-center relative ${headerClass(
              selectedWindow === "me",
            )}`}
          >
            me - zsh
            <button className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2" />
            <button
              className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("")}
            />
            <button
              className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("me")}
            />
          </p>
          <div className="my-auto flex flex-1 min-h-0 overflow-hidden">
            <p
              className={`text-[5px] leading-[1] sm:text-[6px] md:text-[7px] font-mono whitespace-pre min-w-1/2 text-center ${
                isDark ? "text-blue-100" : "text-[#000000]"
              }`}
            >
              {selectedAscii}
            </p>
            <div className="mx-auto  min-w-1/2 mt-2">
              <p
                className={`${
                  isDark ? "text-[#60A5FA]" : "text-[#2563EB]"
                } text-sm lg:text-lg`}
              >
                {personalInfo.username}@{personalInfo.computerName}
              </p>
              <p className="text-[9px] lg:text-sm mb-2">{personalInfo.email}</p>
              <p className=" ml-4 text-xs lg:text-sm">{personalInfo.title}</p>
              <p className=" ml-4 text-xs lg:text-sm">
                {personalInfo.education}
              </p>
              {/* <p className=" ml-4 text-xs lg:text-sm">
                Expected Grad: {personalInfo.graduationYear}
              </p> */}
              <p className=" ml-4 text-xs lg:text-sm">
                {personalInfo.location}
              </p>
              <p className=" ml-4 text-xs lg:text-sm">
                {time.toLocaleTimeString()}
              </p>
              <p className={`ml-4 mt-2 text-xs hidden lg:block ${mutedTextClass}`}>
                <p className="inline-block text-lg"></p>
              </p>
              <button
                className={`ml-4 mt-2 mb-2 text-xs block text-left ${mutedTextClass} underline`}
                onClick={() => {
                  setExpandWindow("me");
                }}
              >
                about me!
              </button>
            </div>
          </div>
        </div>

        {/* Skills/Courses/Certs */}
        <div
          className={` ${windowThemeClass} ${
            isTimerOpen
              ? "col-span-2 lg:col-span-1"
              : "col-span-2 lg:col-span-1 lg:row-span-1"
          } rounded-xl flex flex-col h-[300px] lg:h-[260px] min-h-0 overflow-hidden order-2 ${
            expandWindow ? "opacity-0" : ""
          } transition-opacity duration-500`}
          onClick={() => {
            setSelectedWindow("skills");
            console.log(selectedWindow);
          }}
        >
          <p
            className={`rounded-t-xl text-sm text-center relative ${headerClass(
              selectedWindow === "skills",
            )}`}
          >
            toolbox — zsh
            <button className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2" />
            <button className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2" />
            <button
              className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("skills")}
            />
          </p>
          <div
            className={`px-4 pt-2 pb-2 text-xs font-mono flex gap-2 border-b ${
              isDark ? "border-gray-700" : "border-gray-300"
            }`}
          >
            {(["skills", "courses", "certs"] as ToolboxTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setToolboxTab(tab)}
                className={tabClass(toolboxTab === tab)}
              >
                [{tab}]
              </button>
            ))}
          </div>
          <div className="mt-3 mx-4 flex-1 min-h-0 overflow-y-auto font-mono text-xs lg:text-sm space-y-1 pr-1">
            {toolboxTab === "skills" &&
              skillsCoursesCerts.skills.map((section, index) => {
                const isSelected = hoveredToolboxIndex === index;
                return (
                  <div
                    key={section.group}
                    className={`rounded-md transition-all duration-150 cursor-default px-2 py-1 whitespace-normal break-words leading-relaxed ${
                      isSelected
                        ? isDark
                          ? "bg-gray-200 text-black"
                          : "bg-gray-800 text-white"
                        : isDark
                          ? "bg-transparent text-[#60A5FA]"
                          : "bg-transparent text-[#2563EB]"
                    }`}
                    onMouseEnter={() => setHoveredToolboxIndex(index)}
                    onMouseLeave={() => setHoveredToolboxIndex(null)}
                  >
                    {isSelected ? "▌ " : "  "}
                    <span className="font-bold">{section.group}:</span>{" "}
                    {section.items.join(", ")}
                  </div>
                );
              })}
            {toolboxTab === "courses" &&
              skillsCoursesCerts.courses.map((course, index) => {
                const isSelected = hoveredToolboxIndex === index;
                return (
                  <div
                    key={course}
                    className={`rounded-md transition-all duration-150 cursor-default px-2 py-1 whitespace-normal break-words leading-relaxed ${
                      isSelected
                        ? isDark
                          ? "bg-gray-200 text-black"
                          : "bg-gray-800 text-white"
                        : isDark
                          ? "bg-transparent text-[#60A5FA]"
                          : "bg-transparent text-[#2563EB]"
                    }`}
                    onMouseEnter={() => setHoveredToolboxIndex(index)}
                    onMouseLeave={() => setHoveredToolboxIndex(null)}
                  >
                    {isSelected ? "▌ " : "  "}
                    {course}
                  </div>
                );
              })}
            {toolboxTab === "certs" &&
              skillsCoursesCerts.certs.map((cert, index) => {
                const isSelected = hoveredToolboxIndex === index;
                return (
                  <div
                    key={cert.name}
                    className={`rounded-md transition-all duration-150 cursor-default px-2 py-1 whitespace-normal break-words leading-relaxed ${
                      isSelected
                        ? isDark
                          ? "bg-gray-200 text-black"
                          : "bg-gray-800 text-white"
                        : isDark
                          ? "bg-transparent text-[#60A5FA]"
                          : "bg-transparent text-[#2563EB]"
                    }`}
                    onMouseEnter={() => setHoveredToolboxIndex(index)}
                    onMouseLeave={() => setHoveredToolboxIndex(null)}
                  >
                    {isSelected ? "▌ " : "  "}
                    {cert.name} | {cert.issuer} | {cert.date}
                  </div>
                );
              })}
          </div>
        </div>

        {/* LeetCode */}
        {!isTimerOpen && (
          <div
            className={` ${windowThemeClass} col-span-2 lg:col-span-1 rounded-xl flex flex-col h-[300px] lg:h-[260px] min-h-0 overflow-hidden order-7 row-start-6 lg:row-start-2 ${
              expandWindow ? "opacity-0" : ""
            } transition-opacity duration-500`}
            onClick={() => {
              setSelectedWindow("leetcode");
              console.log(selectedWindow);
            }}
          >
            <p
              className={`rounded-t-xl text-sm text-center relative ${headerClass(
                selectedWindow === "leetcode",
              )}`}
            >
              leetcode - zsh
              <button className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2" />
              <button className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2" />
              <button
                className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setExpandWindow("leetcode")}
              />
            </p>
            <div className="w-full flex-1 min-h-0 overflow-hidden flex flex-col items-center justify-center my-2">
              {leetCode ? (
                <div className="flex items-center gap-4">
                  <a
                    href={personalInfo.socialLinks.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-16 h-16 rounded-xl p-1 flex items-center justify-center cursor-pointer ${
                      isDark ? "bg-gray-100" : "bg-gray-200"
                    }`}
                  >
                    <img
                      src="/leetcode_color.png"
                      alt="LeetCode Logo"
                      className={`w-16 h-16 rounded-xl p-1 object-contain ${
                        isDark ? "bg-gray-100" : "bg-gray-200"
                      }`}
                    />
                  </a>
                  <div className="flex-grow">
                    <p
                      className={`text-sm font-bold ${
                        isDark ? "text-white" : "text-gray-800"
                      }`}
                    >
                      total solved: {leetCode.totalSolved}
                    </p>
                    <div className="flex flex-col justify-between text-sm">
                      <p className="text-green-400">
                        easy: {leetCode.easySolved}
                      </p>
                      <p className="text-yellow-400">
                        medium: {leetCode.mediumSolved}
                      </p>
                      <p className="text-red-400">
                        hard: {leetCode.hardSolved}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p
                  className={`text-sm text-gray-200 mt-4 p-4 ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {leetCodeError || "fetching leetcode stats..."}
                </p>
              )}
              {leetCode && leetCode.submissionCalendar && (
                <LeetCodeCalendar
                  submissionCalendar={leetCode.submissionCalendar}
                  isDark={isDark}
                />
              )}
            </div>
          </div>
        )}

        {/* CLI LLM about me */}
        <div
          className={`${windowThemeClass} col-span-2 lg:col-span-1 lg:row-span-2 rounded-xl flex flex-col h-[420px] lg:h-[530px] min-h-0 overflow-hidden order-3 ${
            expandWindow ? "opacity-0" : ""
          } transition-opacity duration-500 flex flex-col min-h-0`}
          onClick={() => {
            setSelectedWindow("cli");
            focusInput();
          }}
        >
          <p
            className={`rounded-t-xl text-sm text-center relative top-0 ${headerClass(
              selectedWindow === "cli",
            )}`}
          >
            justin-code - zsh
            <button
              className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("")}
            />
            <button
              className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("")}
            />
            <button
              className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("cli")}
            />
          </p>
          <div
            className="font-mono text-sm flex-grow overflow-y-auto lg:h-0"
            onClick={focusInput}
          >
            {lastCommand && (
              <>
                <div className="flex items-center py-2 px-4">
                  <span className="text-[#60A5FA]">❯</span>
                  <p
                    className={`ml-2 ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {lastCommand}
                  </p>
                </div>
                {!response && (
                  <p
                    className={`${
                      isDark ? "text-gray-200" : "text-gray-800"
                    } whitespace-pre-wrap px-4`}
                  >
                    hmm
                    <AnimatedEllipsis />
                  </p>
                )}
                <p
                  className={`${
                    isDark ? "text-gray-200" : "text-gray-800"
                  } whitespace-pre-wrap px-4`}
                >
                  {renderTextWithLinks(response)}
                </p>
              </>
            )}
            <div className="flex items-center py-2 px-4">
              <span className="text-[#60A5FA]">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCommand(e);
                  }
                }}
                className={`bg-transparent border-none ${
                  isDark
                    ? "text-gray-200 placeholder:text-gray-400"
                    : "text-gray-800 placeholder:text-gray-400"
                } w-full focus:outline-none ml-2`}
                placeholder="ask me anything!"
              />
            </div>
          </div>
        </div>

        {/* Experience */}
        <div
          className={`${windowThemeClass} col-span-2 lg:col-span-1 rounded-xl flex flex-col h-[300px] lg:h-[260px] min-h-0 overflow-hidden order-4 row-start-2 ${
            expandWindow ? "opacity-0" : ""
          } transition-opacity duration-500`}
          onClick={() => {
            setSelectedWindow("experience");
            console.log(selectedWindow);
          }}
        >
          <p
            className={`rounded-t-xl text-sm text-center relative ${headerClass(
              selectedWindow === "experience",
            )}`}
          >
            experience — zsh
            <button className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2" />
            <button className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2" />
            <button
              className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("experience")}
            />
          </p>
          <div className="px-4 pt-2 text-xs font-mono flex flex-wrap items-center gap-1.5 pr-2">
            {(["all", "work", "research"] as ExperienceFilter[]).map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setExperienceFilter(filter);
                    setExperienceIndex(0);
                  }}
                  className={tabClass(experienceFilter === filter)}
                >
                  [{filter === "research" ? "research/clubs" : filter}]
                </button>
              ),
            )}
          </div>
          <div className="my-2 mx-4 flex-1 min-h-0 overflow-y-auto">
            {filteredExperiences.map((experience, index) => {
              const isHovered = hoveredExperienceIndex === index;
              const isSelected = isHovered;

              return (
                <div
                  key={index}
                  className={`rounded-md text-sm lg:text-base transition-all duration-150 cursor-pointer my-2 lg:my-1 px-2 py-1 ${
                    isSelected
                      ? isDark
                        ? "bg-gray-200 text-black"
                        : "bg-gray-800 text-white"
                      : isHovered
                        ? isDark
                          ? "bg-gray-800/55 text-blue-200"
                          : "bg-gray-200/65 text-[#2563EB]"
                        : isDark
                          ? "bg-transparent text-[#60A5FA]"
                          : "bg-transparent text-[#2563EB]"
                  }`}
                  onMouseEnter={() => setHoveredExperienceIndex(index)}
                  onMouseLeave={() => setHoveredExperienceIndex(null)}
                  onClick={() => {
                    setExpandWindow("experience");
                    setSelectExperience(experience.title);
                  }}
                >
                  {isSelected ? "▌ " : "  "}
                  {experience.title}
                </div>
              );
            })}
            {filteredExperiences.length === 0 && (
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                no experiences in this category
              </p>
            )}
          </div>
        </div>

        {/* Projects */}
        <div
          className={` ${windowThemeClass} col-span-2 lg:col-span-1 rounded-xl flex flex-col h-[300px] lg:h-[260px] min-h-0 overflow-hidden order-5 row-start-3 lg:row-start-2 ${
            expandWindow ? "opacity-0" : ""
          } transition-opacity duration-500`}
          onClick={() => {
            setSelectedWindow("projects");
            console.log(selectedWindow);
          }}
        >
          <p
            className={`rounded-t-xl text-sm text-center relative ${headerClass(
              selectedWindow === "projects",
            )}`}
          >
            projects — zsh
            <button className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2" />
            <button className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2" />
            <button
              className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("projects")}
            />
          </p>
          <div className="px-4 pt-2 text-xs font-mono flex gap-2">
            {(["all", "swe", "ml/data"] as ProjectFilter[]).map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setProjectFilter(filter);
                  setProjectIndex(0);
                }}
                className={tabClass(projectFilter === filter)}
              >
                [{filter}]
              </button>
            ))}
          </div>
          <div className="mt-2 mx-4 flex-1 min-h-0 overflow-y-auto">
            {filteredProjects.map((project, index) => {
              const isHovered = hoveredProjectIndex === index;
              const isSelected = isHovered;

              return (
                <div
                  key={index}
                  className={`rounded-md text-sm lg:text-base transition-all duration-150 cursor-pointer my-2 lg:my-1 px-2 py-1 ${
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
                  {project.title}
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

        {/* Expanded overlay when user clicks */}
        {expandWindow && (
          <div className="lg:absolute lg:inset-0 fixed inset-0 z-20 transition-opacity duration-300 lg:h-full h-screen max-h-screen overflow-y-auto flex items-center justify-center lg:items-stretch lg:justify-stretch">
            {expandWindow === "me" && (
              <div
                ref={meWindowRef}
                className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-hidden focus:outline-none relative pb-24 lg:pb-0 overscroll-none`}
                tabIndex={0}
              >
                <p
                  className={`rounded-t-xl text-sm text-center sticky top-0 left-0 right-0 ${headerClass(
                    true,
                  )}`}
                >
                  me - zsh
                  <button
                    className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setExpandWindow("me")}
                  />
                </p>
                <div className="flex flex-col gap-5 max-w-2xl mx-auto mt-4 mb-10 px-4">
                  <div className="flex mt-6 justify-between">
                    <p
                      className={`text-[5px] leading-[1] sm:text-[6px] md:text-[7px] ${
                        isDark ? "text-blue-100" : "text-black"
                      } font-mono whitespace-pre text-center`}
                    >
                      {selectedAscii}
                    </p>
                    <div className="mx-auto mt-2">
                      <p
                        className={`${
                          isDark ? "text-[#60A5FA]" : "text-[#2563EB]"
                        } text-sm lg:text-lg`}
                      >
                        {personalInfo.username}@{personalInfo.computerName}
                      </p>
                      <p className="text-[9px] lg:text-sm mb-2">
                        {personalInfo.email}
                      </p>
                      <p className=" ml-4 text-xs lg:text-sm">
                        {personalInfo.title}
                      </p>
                      <p className=" ml-4 text-xs lg:text-sm">
                        {personalInfo.education}
                      </p>
                      <p className=" ml-4 text-xs lg:text-sm">
                        Expected Grad: {personalInfo.graduationYear}
                      </p>
                      <p className=" ml-4 text-xs lg:text-sm">
                        {personalInfo.location}
                      </p>
                      <p className=" ml-4 text-xs lg:text-sm">
                        {time.toLocaleTimeString()}
                      </p>
                      <p className=" ml-4 mt-2 text-xs hidden lg:block text-gray-400">
                        <p className="inline-block text-lg">☆</p> try arrows
                        keys & enter!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-5 max-w-2xl mx-auto mt-4 mb-10 px-4 ">
                  {personalInfo.aboutMe.map((paragraph, index) => (
                    <p
                      key={index}
                      className={`text-gray-200 ${
                        isDark ? "text-gray-200" : "text-gray-800"
                      }`}
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                  <button
                    className="text-gray-400 text-left underline"
                    onClick={() => setExpandWindow("")}
                  >
                    back to main page ❮
                  </button>
                </div>
              </div>
            )}
            {expandWindow === "experience" && (
              <>
                {selectExperience !== "" ? (
                  <div
                    className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-y-auto pb-36 lg:pb-0 overscroll-none`}
                  >
                    <p
                      className={`rounded-t-xl text-sm text-center sticky top-0 ${headerClass(
                        selectedWindow === "experience",
                      )}`}
                    >
                      {selectExperience}
                      <button
                        className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setExpandWindow("")}
                      />
                      <button
                        className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2"
                        onClick={() => {
                          setExpandWindow("");
                          setSelectExperience("");
                        }}
                      />
                      <button className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2" />
                    </p>
                    <div className="m-4">
                      {(() => {
                        const selectedExperienceData = experiencesData.find(
                          (p) => p.title === selectExperience,
                        );
                        if (selectedExperienceData) {
                          return (
                            <div>
                              <img
                                src={selectedExperienceData.image}
                                alt={selectedExperienceData.title}
                                className="w-full h-48 object-cover rounded-lg mb-4 max-w-2xl mx-auto"
                              />
                              <p
                                className={`text-gray-300 mt-2 max-w-[70ch] mx-auto ${
                                  isDark ? "text-gray-200" : "text-gray-800"
                                }`}
                              >
                                {selectedExperienceData.date}
                              </p>
                              <p
                                className={`text-gray-400 mt-2 max-w-[70ch] mx-auto leading-relaxed ${
                                  isDark ? "text-gray-200" : "text-gray-800"
                                }`}
                              >
                                {selectedExperienceData.description}
                              </p>
                              <div className="mt-4 max-w-[70ch] mx-auto flex flex-col">
                                {selectedExperienceData.links.map(
                                  (link, index) => (
                                    <a
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      key={link.name}
                                      className={`inline-block  rounded transition-all duration-150 ${
                                        isDark
                                          ? "text-gray-200"
                                          : "text-gray-800"
                                      } ${
                                        index === selectedExperienceLinkIndex
                                          ? " font-bold"
                                          : ""
                                      }`}
                                    >
                                      {link.name}{" "}
                                      {index === selectedExperienceLinkIndex
                                        ? "❮ "
                                        : ""}
                                    </a>
                                  ),
                                )}
                                <button
                                  className={`mt-2 rounded self-start transition-all duration-150 ${
                                    selectedExperienceLinkIndex ===
                                    selectedExperienceData.links.length
                                      ? "font-bold"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    setSelectExperience("");
                                    setExpandWindow("");
                                  }}
                                >
                                  back to experiences{" "}
                                  {selectedExperienceLinkIndex ===
                                  selectedExperienceData.links.length
                                    ? "❮ "
                                    : ""}
                                </button>
                              </div>
                            </div>
                          );
                        }
                        return <p>Experience not found.</p>;
                      })()}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-y-auto overscroll-none`}
                  >
                    <p
                      className={`rounded-t-xl text-sm text-center relative ${headerClass(
                        selectedWindow === "experience",
                      )}`}
                    >
                      experience — zsh
                      <button
                        className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2"
                        onClick={() => setExpandWindow("")}
                      />
                      <button
                        className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2"
                        onClick={() => setExpandWindow("")}
                      />
                      <button className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2" />
                    </p>
                    <div className="px-4 pt-2 text-xs font-mono flex flex-wrap items-center gap-1.5 pr-2">
                      {(
                        ["all", "work", "research"] as ExperienceFilter[]
                      ).map((filter) => (
                          <button
                            key={filter}
                            onClick={() => {
                              setExperienceFilter(filter);
                              setExperienceIndex(0);
                            }}
                            className={tabClass(experienceFilter === filter)}
                          >
                            [{filter === "research" ? "research/clubs" : filter}]
                          </button>
                      ))}
                    </div>
                    <div className="mt-2 mx-4">
                      {filteredExperiences.map((experience, index) => {
                        const isHovered = hoveredExperienceIndex === index;
                        const isSelected = isHovered;

                        return (
                          <div
                            key={index}
                            className={`rounded-md transition-all duration-150 cursor-pointer px-2 py-1 ${
                              isSelected
                                ? isDark
                                  ? "bg-gray-200 text-black"
                                  : "bg-gray-800 text-white"
                                : isHovered
                                  ? isDark
                                    ? "bg-gray-800/55 text-blue-200"
                                    : "bg-gray-200/65 text-[#2563EB]"
                                  : isDark
                                    ? "bg-transparent text-[#60A5FA]"
                                    : "bg-transparent text-[#2563EB]"
                            }`}
                            onMouseEnter={() =>
                              setHoveredExperienceIndex(index)
                            }
                            onMouseLeave={() => setHoveredExperienceIndex(null)}
                            onClick={() =>
                              setSelectExperience(experience.title)
                            }
                          >
                            {isSelected ? "▌ " : "  "}
                            {experience.title}
                          </div>
                        );
                      })}
                      {filteredExperiences.length === 0 && (
                        <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                          no experiences in this category
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
            {expandWindow === "projects" && (
              <>
                {selectProject !== "" ? (
                  <div
                    className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-y-auto pb-36 lg:pb-0 overscroll-none`}
                  >
                    <p
                      className={`rounded-t-xl text-sm text-center sticky top-0 ${headerClass(
                        selectedWindow === "projects",
                      )}`}
                    >
                      {
                        projectsData.find((p) => p.title === selectProject)
                          ?.window
                      }
                      <button
                        className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2"
                        onClick={() => setExpandWindow("")}
                      />
                      <button
                        className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2"
                        onClick={() => {
                          setExpandWindow("");
                          setSelectProject("");
                        }}
                      />
                      <button
                        className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setExpandWindow("projects")}
                      />
                    </p>
                    <div className="m-4">
                      {(() => {
                        const selectedProjectData = projectsData.find(
                          (p) => p.title === selectProject,
                        );
                        if (selectedProjectData) {
                          return (
                            <div>
                              <img
                                src={selectedProjectData.image}
                                alt={selectedProjectData.title}
                                className="mx-auto h-48 object-contain rounded-lg mb-4"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = "/image.jpg";
                                }}
                              />
                              <p
                                className={`text-gray-300 mt-2 max-w-[70ch] mx-auto ${
                                  isDark ? "text-gray-200" : "text-gray-800"
                                }`}
                              >
                                {selectedProjectData.date}
                              </p>
                              <p
                                className={`text-gray-400 mt-2 max-w-[70ch] mx-auto leading-relaxed ${
                                  isDark ? "text-gray-200" : "text-gray-800"
                                }`}
                              >
                                {selectedProjectData.description}
                              </p>
                              <div className="mt-4 max-w-[70ch] mx-auto flex flex-col">
                                {selectedProjectData.links.map(
                                  (link, index) => (
                                    <a
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      key={link.name}
                                      className={`inline-block ${
                                        isDark
                                          ? "text-gray-200"
                                          : "text-gray-800"
                                      } rounded transition-all duration-150 ${
                                        index === selectedLinkIndex
                                          ? " font-bold"
                                          : ""
                                      }`}
                                    >
                                      {link.name}{" "}
                                      {index === selectedLinkIndex ? "❮ " : ""}
                                    </a>
                                  ),
                                )}
                                <button
                                  className={`mt-2 max-w-[70ch] self-start rounded transition-all duration-150 ${
                                    selectedLinkIndex ===
                                    selectedProjectData.links.length
                                      ? " font-bold"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    setSelectProject("");
                                    setExpandWindow("");
                                  }}
                                >
                                  back to projects{" "}
                                  {selectedLinkIndex ===
                                  selectedProjectData.links.length
                                    ? "❮ "
                                    : ""}
                                </button>
                              </div>
                            </div>
                          );
                        }
                        return <p>Project not found.</p>;
                      })()}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-y-auto`}
                  >
                    <p
                      className={`rounded-t-xl text-sm text-center relative ${headerClass(
                        selectedWindow === "projects",
                      )}`}
                    >
                      splitprojects — zsh
                      <button
                        className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2"
                        onClick={() => setExpandWindow("")}
                      />
                      <button
                        className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2"
                        onClick={() => setExpandWindow("")}
                      />
                      <button
                        className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setExpandWindow("projects")}
                      />
                    </p>
                    <div className="px-4 pt-2 text-xs font-mono flex gap-2">
                      {(["all", "swe", "ml/data"] as ProjectFilter[]).map(
                        (filter) => (
                          <button
                            key={filter}
                            onClick={() => {
                              setProjectFilter(filter);
                              setProjectIndex(0);
                            }}
                            className={tabClass(projectFilter === filter)}
                          >
                            [{filter}]
                          </button>
                        ),
                      )}
                    </div>
                    <div className="mt-2 mx-4">
                      {filteredProjects.map((project, index) => {
                        const isHovered = hoveredProjectIndex === index;
                        const isSelected = isHovered;

                        return (
                          <div
                            key={index}
                            className={`rounded-md transition-all duration-150 cursor-pointer px-2 py-1 ${
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
                            {project.title}
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
                )}
              </>
            )}
            {expandWindow === "skills" && (
              <div
                className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-y-auto overscroll-none`}
              >
                <p
                  className={`rounded-t-xl text-sm text-center sticky top-0 ${headerClass(
                    selectedWindow === "skills",
                  )}`}
                >
                  toolbox — zsh
                  <button
                    className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("skills")}
                  />
                </p>
                <div
                  className={`px-4 pt-2 pb-2 text-xs font-mono flex gap-2 border-b ${
                    isDark ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  {(["skills", "courses", "certs"] as ToolboxTab[]).map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setToolboxTab(tab)}
                        className={tabClass(toolboxTab === tab)}
                      >
                        [{tab}]
                      </button>
                    ),
                  )}
                </div>
                <div className="mt-3 mx-4 font-mono text-sm space-y-1 pb-6 pr-1">
                  {toolboxTab === "skills" &&
                    skillsCoursesCerts.skills.map((section, index) => {
                      const isSelected = hoveredToolboxIndex === index;
                      return (
                        <div
                        key={section.group}
                        className={`rounded-md transition-all duration-150 cursor-default px-2 py-1 whitespace-normal break-words leading-relaxed ${
                          isSelected
                            ? isDark
                              ? "bg-gray-200 text-black"
                              : "bg-gray-800 text-white"
                            : isDark
                              ? "bg-transparent text-[#60A5FA]"
                              : "bg-transparent text-[#2563EB]"
                        }`}
                        onMouseEnter={() => setHoveredToolboxIndex(index)}
                        onMouseLeave={() => setHoveredToolboxIndex(null)}
                      >
                        {isSelected ? "▌ " : "  "}
                        <span className="font-bold">{section.group}:</span>{" "}
                        {section.items.join(", ")}
                      </div>
                      );
                    })}
                  {toolboxTab === "courses" &&
                    skillsCoursesCerts.courses.map((course, index) => {
                      const isSelected = hoveredToolboxIndex === index;
                      return (
                        <div
                        key={course}
                        className={`rounded-md transition-all duration-150 cursor-default px-2 py-1 whitespace-normal break-words leading-relaxed ${
                          isSelected
                            ? isDark
                              ? "bg-gray-200 text-black"
                              : "bg-gray-800 text-white"
                            : isDark
                              ? "bg-transparent text-[#60A5FA]"
                              : "bg-transparent text-[#2563EB]"
                        }`}
                        onMouseEnter={() => setHoveredToolboxIndex(index)}
                        onMouseLeave={() => setHoveredToolboxIndex(null)}
                      >
                        {isSelected ? "▌ " : "  "}
                        {course}
                      </div>
                      );
                    })}
                  {toolboxTab === "certs" &&
                    skillsCoursesCerts.certs.map((cert, index) => {
                      const isSelected = hoveredToolboxIndex === index;
                      return (
                        <div
                        key={cert.name}
                        className={`rounded-md transition-all duration-150 cursor-default px-2 py-1 whitespace-normal break-words leading-relaxed ${
                          isSelected
                            ? isDark
                              ? "bg-gray-200 text-black"
                              : "bg-gray-800 text-white"
                            : isDark
                              ? "bg-transparent text-[#60A5FA]"
                              : "bg-transparent text-[#2563EB]"
                        }`}
                        onMouseEnter={() => setHoveredToolboxIndex(index)}
                        onMouseLeave={() => setHoveredToolboxIndex(null)}
                      >
                        {isSelected ? "▌ " : "  "}
                        {cert.name} | {cert.issuer} | {cert.date}
                      </div>
                      );
                    })}
                </div>
              </div>
            )}
            {expandWindow === "leetcode" && (
              <div
                className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-y-auto overscroll-none`}
              >
                <p
                  className={`${
                    isDark
                      ? "text-black bg-white"
                      : "text-gray-800 bg-[#99A1AF]"
                  } rounded-t-xl text-sm text-center sticky top-0 z-10`}
                >
                  leetcode - zsh
                  <button
                    className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("leetcode")}
                  />
                </p>
                <div className="w-full flex flex-col items-center justify-center mt-4">
                  {leetCode ? (
                    <div className="flex items-center gap-4">
                      <a
                        href={personalInfo.socialLinks.leetcode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-16 h-16 rounded-xl p-1 flex items-center justify-center cursor-pointer ${
                          isDark ? "bg-gray-100" : "bg-gray-200"
                        }`}
                      >
                        <img
                          src="/leetcode_color.png"
                          alt="LeetCode Logo"
                          className={`w-16 h-16 rounded-xl p-1 object-contain ${
                            isDark ? "bg-gray-100" : "bg-gray-200"
                          }`}
                        />
                      </a>

                      <div className="flex-grow">
                        <p
                          className={`text-sm font-bold ${
                            isDark ? "text-white" : "text-gray-800"
                          }`}
                        >
                          total solved: {leetCode.totalSolved}
                        </p>
                        <div className="flex flex-col  justify-between text-sm">
                          <p className="text-green-400">
                            easy: {leetCode.easySolved}
                          </p>
                          <p className="text-yellow-400">
                            medium: {leetCode.mediumSolved}
                          </p>
                          <p className="text-red-400">
                            hard: {leetCode.hardSolved}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p
                      className={`text-sm text-gray-200 mt-4 ${
                        isDark ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {leetCodeError || "fetching leetcode stats..."}
                    </p>
                  )}
                  {leetCode && leetCode.submissionCalendar && (
                    <div className="min-w-xs lg:min-w-md">
                      <LeetCodeCalendar
                        submissionCalendar={leetCode.submissionCalendar}
                        viewMode="month"
                        isDark={isDark}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            {expandWindow === "cli" && (
              <div
                className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl flex flex-col overflow-y-auto overscroll-none`}
              >
                <p
                  className={`rounded-t-xl text-sm text-center sticky top-0 ${headerClass(
                    selectedWindow === "cli",
                  )}`}
                >
                  daniel-code - zsh
                  <button
                    className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("cli")}
                  />
                </p>
                <div
                  className="mt-2 mx-4 font-mono text-sm flex-grow overflow-y-auto"
                  onClick={focusInput}
                >
                  {lastCommand && (
                    <>
                      <div className="flex items-center">
                        <span className="text-[#60A5FA]">❯</span>
                        <p
                          className={`ml-2 ${
                            isDark ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {lastCommand}
                        </p>
                      </div>
                      {!response && (
                        <p
                          className={`${
                            isDark ? "text-gray-200" : "text-gray-800"
                          } whitespace-pre-wrap`}
                        >
                          hmm
                          <AnimatedEllipsis />
                        </p>
                      )}
                      <p
                        className={`${
                          isDark ? "text-gray-200" : "text-gray-800"
                        } whitespace-pre-wrap`}
                      >
                        {renderTextWithLinks(response)}
                      </p>
                    </>
                  )}
                  <div className="flex items-center">
                    <span className="text-[#60A5FA]">❯</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleCommand(e);
                        }
                      }}
                      className={`bg-transparent border-none ${
                        isDark
                          ? "text-gray-200 placeholder:text-gray-400"
                          : "text-gray-800 placeholder:text-gray-400"
                      } w-full focus:outline-none ml-2`}
                      placeholder="ask me anything about myself!"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Resume overlay window */}
      {isResumeOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsResumeOpen(false);
            }
          }}
        >
          <div
            className={`w-full lg:w-1/2 h-[70vh] max-w-4xl max-h-[90vh] ${overlayThemeClass} rounded-xl flex flex-col shadow-sm`}
          >
            <div
              className={`rounded-t-xl text-sm text-center relative ${headerClass(
                true,
              )}`}
            >
              {personalInfo.resumeFileName}
              <button
                className="rounded-full p-[3px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-rose-500 transition-colors"
                onClick={() => setIsResumeOpen(false)}
              />
              <button
                className="rounded-full p-[3px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2"
                onClick={() => setIsResumeOpen(false)}
              />
              <button className="rounded-full p-[3px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2" />
            </div>
            <a
              href={`/${personalInfo.resumeFileName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 mx-4 mt-4 underline"
            >
              click to view in new tab
            </a>
            <div className="flex-1 p-4 overflow-hidden">
              <iframe
                src={`/${personalInfo.resumeFileName}#view=FitH&zoom=page-fit`}
                className="w-full h-full rounded-lg border border-gray-600"
                title={`${personalInfo.name} Resume`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Taskbar menu */}
      <Taskbar theme={theme} />
    </div>
  );
};

export default App;
