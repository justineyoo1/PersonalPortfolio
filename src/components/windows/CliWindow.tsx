import React from "react";
import AnimatedEllipsis from "../AnimatedEllipsis";
import { WindowHeader } from "./WindowHeader";

type BaseProps = {
  isDark: boolean;
  selectedWindow: string;
  windowThemeClass: string;
  headerClass: (selected: boolean) => string;
  setExpandWindow: (value: string) => void;
  command: string;
  setCommand: (value: string) => void;
  lastCommand: string;
  response: string;
  renderTextWithLinks: (text: string) => React.ReactNode;
  inputRef: React.RefObject<HTMLInputElement>;
  focusInput: () => void;
  handleCommand: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
};

export const CliCollapsed = ({
  isDark,
  selectedWindow,
  windowThemeClass,
  headerClass,
  setExpandWindow,
  command,
  setCommand,
  lastCommand,
  response,
  renderTextWithLinks,
  inputRef,
  focusInput,
  handleCommand,
  setSelectedWindow,
  isHidden,
}: BaseProps & { setSelectedWindow: (value: string) => void; isHidden: boolean }) => {
  return (
    <div
      className={`${windowThemeClass} col-span-2 lg:col-span-1 lg:row-span-2 rounded-xl flex flex-col h-[420px] lg:h-[588px] min-h-0 overflow-hidden order-3 ${
        isHidden ? "opacity-0" : ""
      } transition-opacity duration-500 flex flex-col min-h-0`}
      onClick={() => {
        setSelectedWindow("cli");
        focusInput();
      }}
    >
      <WindowHeader
        title="justin-code - zsh"
        selected={selectedWindow === "cli"}
        headerClass={headerClass}
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("cli")}
      />
      <div
        className="font-mono text-[13px] leading-[1.35] flex-grow overflow-y-auto lg:h-0"
        onClick={focusInput}
      >
        {lastCommand && (
          <>
            <div className="flex items-center py-2 px-4">
              <span className="text-[#60A5FA]">❯</span>
              <p className={`ml-2 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                {lastCommand}
              </p>
            </div>
            {!response && (
              <p
                className={`${
                  isDark ? "text-emerald-200/90" : "text-emerald-700"
                } whitespace-pre-wrap px-4`}
              >
                hmm
                <AnimatedEllipsis />
              </p>
            )}
            <p
              className={`${
                isDark ? "text-emerald-200" : "text-emerald-700"
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
            placeholder="ask anything."
          />
        </div>
      </div>
    </div>
  );
};

export const CliExpanded = ({
  isDark,
  selectedWindow,
  windowThemeClass,
  headerClass,
  setExpandWindow,
  command,
  setCommand,
  lastCommand,
  response,
  renderTextWithLinks,
  inputRef,
  focusInput,
  handleCommand,
}: BaseProps) => {
  return (
    <div
      className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl flex flex-col overflow-y-auto overscroll-none`}
    >
      <WindowHeader
        title="daniel-code - zsh"
        selected={selectedWindow === "cli"}
        headerClass={headerClass}
        sticky
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("cli")}
      />
      <div
        className="mt-2 mx-4 font-mono text-[13px] leading-[1.35] flex-grow overflow-y-auto"
        onClick={focusInput}
      >
        {lastCommand && (
          <>
            <div className="flex items-center">
              <span className="text-[#60A5FA]">❯</span>
              <p className={`ml-2 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                {lastCommand}
              </p>
            </div>
            {!response && (
              <p
                className={`${
                  isDark ? "text-emerald-200/90" : "text-emerald-700"
                } whitespace-pre-wrap`}
              >
                hmm
                <AnimatedEllipsis />
              </p>
            )}
            <p
              className={`${
                isDark ? "text-emerald-200" : "text-emerald-700"
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
            placeholder="ask anything. cool commands to start: help or story"
          />
        </div>
      </div>
    </div>
  );
};
