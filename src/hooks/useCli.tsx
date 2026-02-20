import React, { useEffect, useRef, useState } from "react";

type ChatItem = { role: "user" | "assistant"; content: string };

type ProjectOrExperience = {
  title: string;
  date: string;
  description: string;
};

type UseCliArgs = {
  selectedWindow: string;
  accentTextClass: string;
  commandResponses: Record<string, string>;
  experiencesData: ProjectOrExperience[];
  projectsData: ProjectOrExperience[];
  setExpandWindow: (value: string) => void;
  setSelectedWindow: (value: string) => void;
  setSelectProject: (value: string) => void;
  setSelectExperience: (value: string) => void;
};

export const useCli = ({
  selectedWindow,
  accentTextClass,
  commandResponses,
  experiencesData,
  projectsData,
  setExpandWindow,
  setSelectedWindow,
  setSelectProject,
  setSelectExperience,
}: UseCliArgs) => {
  const [command, setCommand] = useState("");
  const [lastCommand, setLastCommand] = useState("");
  const [response, setResponse] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (selectedWindow === "cli") {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [selectedWindow]);

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const windowRegex = /\[window:(experience|projects):([^\]]+)\]/g;

    const parts: Array<{
      type: "text" | "link" | "email" | "window";
      content: string;
      window?: string;
    }> = [];
    let lastIndex = 0;

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
        content: m[2],
        window: m[1],
        type: "window" as const,
      })),
    ].sort((a, b) => a.index - b.index);

    matches.forEach((match) => {
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: text.slice(lastIndex, match.index),
        });
      }

      parts.push({
        type: match.type,
        content: match.content,
        window: match.window,
      });

      lastIndex = match.index + match.length;
    });

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
                className="text-emerald-400 underline-offset-2 transition-colors hover:text-emerald-300 hover:underline focus:outline-none focus-visible:underline"
              >
                {part.content}
              </a>
            );
          }

          if (part.type === "email") {
            return (
              <a
                key={index}
                href={`mailto:${part.content}`}
                className="text-emerald-400 underline-offset-2 transition-colors hover:text-emerald-300 hover:underline focus:outline-none focus-visible:underline"
              >
                {part.content}
              </a>
            );
          }

          if (part.type === "window") {
            return (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandWindow(part.window!);
                  setSelectedWindow(part.window!);
                  if (part.window === "projects") {
                    setSelectProject(part.content);
                  } else if (part.window === "experience") {
                    setSelectExperience(part.content);
                  }
                }}
                className="inline p-0 m-0 align-baseline text-left text-emerald-400 underline-offset-2 transition-colors hover:text-emerald-300 hover:underline cursor-pointer bg-transparent border-none font-mono whitespace-normal break-words"
              >
                {part.content}
              </button>
            );
          }

          return <span key={index}>{part.content}</span>;
        })}
      </>
    );
  };

  async function streamStaticResponse(
    text: string,
    onChunk: (chunk: string) => void,
  ) {
    const words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const chunk = (i === 0 ? "" : " ") + word;
      onChunk(chunk);

      let delay = 25 + Math.random() * 25;
      if (word.includes(".") || word.includes("!") || word.includes("?")) {
        delay += 200 + Math.random() * 100;
      } else if (word.includes(",") || word.includes(";")) {
        delay += 100 + Math.random() * 50;
      }
      if (word.length <= 2) {
        delay *= 0.7;
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  async function askQuestion(q: string, onChunk: (chunk: string) => void) {
    const messages = [...chatHistory, { role: "user" as const, content: q }];

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    const data = await res.json();
    const fullResponse = data.answer;
    const words = fullResponse.split(" ");

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const chunk = (i === 0 ? "" : " ") + word;
      onChunk(chunk);

      let delay = 25 + Math.random() * 25;
      if (word.includes(".") || word.includes("!") || word.includes("?")) {
        delay += 200 + Math.random() * 100;
      } else if (word.includes(",") || word.includes(";")) {
        delay += 100 + Math.random() * 50;
      }
      if (word.length <= 2) {
        delay *= 0.7;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: q },
      { role: "assistant", content: fullResponse },
    ]);
  }

  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !command) return;

    const rawCommand = command;
    const trimmedCommand = rawCommand.trim().toLowerCase();
    setLastCommand(rawCommand);
    setResponse("");
    setCommand("");

    const emitStatic = async (text: string) => {
      await streamStaticResponse(text, (chunk: string) => {
        setResponse((prev) => prev + chunk);
      });
      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: rawCommand },
        { role: "assistant", content: text },
      ]);
    };

    if (trimmedCommand === "about") return emitStatic(commandResponses.about);

    if (
      trimmedCommand === "story" ||
      trimmedCommand === "timeline" ||
      trimmedCommand === "journey" ||
      trimmedCommand === "mystory"
    ) {
      return emitStatic(commandResponses.story);
    }

    if (
      trimmedCommand === "experience" ||
      trimmedCommand === "exp" ||
      trimmedCommand === "experiences"
    ) {
      const experienceList = experiencesData
        .map(
          (exp) =>
            `• [window:experience:${exp.title}] (${exp.date})${exp.description ? "\n  " + exp.description.split("\n")[0].substring(0, 100) + "..." : ""}`,
        )
        .join("\n\n");
      return emitStatic(
        `here's my experience so far:\n\n${experienceList}\n\nclick any title to see more details!`,
      );
    }

    if (trimmedCommand === "projects" || trimmedCommand === "project") {
      const projectsList = projectsData
        .map(
          (proj) =>
            `• [window:projects:${proj.title}] (${proj.date})${proj.description ? "\n  " + proj.description.split("\n")[0].substring(0, 100) + "..." : ""}`,
        )
        .join("\n\n");
      return emitStatic(
        `here are my projects:\n\n${projectsList}\n\nclick any title to see more details!`,
      );
    }

    if (trimmedCommand === "skills" || trimmedCommand === "skill") {
      return emitStatic(commandResponses.skills);
    }

    if (trimmedCommand === "goals" || trimmedCommand === "goal") {
      return emitStatic(commandResponses.goals);
    }

    if (trimmedCommand === "funfact") {
      return emitStatic(commandResponses.funfact);
    }

    if (trimmedCommand === "contact") {
      return emitStatic(commandResponses.contact);
    }

    if (
      trimmedCommand === "commands" ||
      trimmedCommand === "command" ||
      trimmedCommand === "help" ||
      trimmedCommand === "cmd"
    ) {
      return emitStatic(commandResponses.commands);
    }

    try {
      await askQuestion(rawCommand, (chunk: string) => {
        setResponse((prev) => prev + chunk);
      });
    } catch (error) {
      console.error("Error streaming response:", error);
      setResponse("sorry, something went wrong. try again?");
    }
  };

  return {
    command,
    setCommand,
    lastCommand,
    response,
    inputRef,
    focusInput,
    handleCommand,
    renderTextWithLinks,
  };
};
