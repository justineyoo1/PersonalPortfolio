import React, { useEffect, useRef } from "react";
import AnimatedEllipsis from "../AnimatedEllipsis";
import { WindowHeader } from "./WindowHeader";
import { DisplayItem } from "@/hooks/useCli";

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
  isResponding: boolean;
  displayHistory: DisplayItem[];
  renderTextWithLinks: (text: string) => React.ReactNode;
  inputRef: React.RefObject<HTMLInputElement>;
  focusInput: () => void;
  handleCommand: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
};

function CliContent({
  isDark,
  lastCommand,
  response,
  isResponding,
  displayHistory,
  renderTextWithLinks,
  inputRef,
  focusInput,
  command,
  setCommand,
  handleCommand,
  padded,
}: {
  isDark: boolean;
  lastCommand: string;
  response: string;
  isResponding: boolean;
  displayHistory: DisplayItem[];
  renderTextWithLinks: (text: string) => React.ReactNode;
  inputRef: React.RefObject<HTMLInputElement>;
  focusInput: () => void;
  command: string;
  setCommand: (v: string) => void;
  handleCommand: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
  padded: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [response, displayHistory.length]);

  const px = padded ? "px-4" : "";

  if (!isDark) {
    // Light mode: chat bubbles
    return (
      <div
        ref={scrollContainerRef}
        className="text-sm leading-relaxed flex-grow overflow-y-auto lg:h-0 flex flex-col"
        onClick={focusInput}
      >
        <div className={`flex-grow ${px} py-3 space-y-3`}>
          {/* Empty state */}
          {displayHistory.length === 0 && !lastCommand && (
            <div className="flex-grow flex flex-col items-center justify-center text-center py-8 text-[#86868B]">
              <p className="text-base font-bold text-[#1D1D1F]">Ask me anything about Justin</p>
              <p className="text-sm mt-2 text-[#86868B]">try &quot;about&quot;, &quot;experience&quot;, or &quot;projects&quot;</p>
            </div>
          )}
          {/* History */}
          {displayHistory.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-end">
                <div className="bg-[#007AFF] text-white rounded-2xl rounded-br-sm px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] max-w-[85%] text-sm">
                  {item.command}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-[#E9E9EB] text-[#1D1D1F] rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap">
                  {renderTextWithLinks(item.response)}
                </div>
              </div>
            </div>
          ))}

          {/* Current exchange */}
          {lastCommand && (
            <div className="space-y-2">
              <div className="flex justify-end">
                <div className="bg-[#007AFF] text-white rounded-2xl rounded-br-sm px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] max-w-[85%] text-sm">
                  {lastCommand}
                </div>
              </div>
              {!response && isResponding && (
                <div className="flex justify-start">
                  <div className="bg-[#E9E9EB] text-[#86868B] rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm">
                    <AnimatedEllipsis />
                  </div>
                </div>
              )}
              {response && (
                <div className="flex justify-start">
                  <div className="bg-[#E9E9EB] text-[#1D1D1F] rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap">
                    {renderTextWithLinks(response)}
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className={`${px} pb-3 pt-2`}>
          <div className="flex items-center border-none rounded-full px-5 py-3 bg-[#E2E2E8]">
            <input
              ref={inputRef}
              type="text"
              value={command}
              disabled={isResponding}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCommand(e);
              }}
              className="bg-transparent border-none text-[#1D1D1F] placeholder:text-[#86868B] w-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              placeholder={isResponding ? "..." : "Type a message..."}
            />
          </div>
        </div>
      </div>
    );
  }

  // Dark mode: terminal
  return (
    <div
      ref={scrollContainerRef}
      className="font-mono text-[13px] leading-[1.35] flex-grow overflow-y-auto lg:h-0"
      onClick={focusInput}
    >
      {/* Completed exchanges */}
      {displayHistory.map((item, i) => (
        <div key={i}>
          <div className={`flex items-center py-2 ${px}`}>
            <span className="text-[#60A5FA]">❯</span>
            <p className="ml-2 text-gray-200">{item.command}</p>
          </div>
          <p className={`text-emerald-200 whitespace-pre-wrap ${px} pb-2`}>
            {renderTextWithLinks(item.response)}
          </p>
        </div>
      ))}

      {/* Current / in-progress exchange */}
      {lastCommand && (
        <>
          <div className={`flex items-center py-2 ${px}`}>
            <span className="text-[#60A5FA]">❯</span>
            <p className="ml-2 text-gray-200">{lastCommand}</p>
          </div>
          {!response && isResponding && (
            <p className={`text-emerald-200/90 whitespace-pre-wrap ${px}`}>
              hmm
              <AnimatedEllipsis />
            </p>
          )}
          {response && (
            <p className={`text-emerald-200 whitespace-pre-wrap ${px} pb-2`}>
              {renderTextWithLinks(response)}
            </p>
          )}
        </>
      )}

      {/* Input row */}
      <div className={`flex items-center py-2 ${px}`}>
        <span className="text-[#60A5FA]">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          disabled={isResponding}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCommand(e);
          }}
          className="bg-transparent border-none text-gray-200 placeholder:text-gray-400 w-full focus:outline-none ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={isResponding ? "..." : "ask anything."}
        />
      </div>

      <div ref={bottomRef} />
    </div>
  );
}

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
  isResponding,
  displayHistory,
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
        title={isDark ? "justin-code - zsh" : "Chat"}
        isDark={isDark}
        selected={selectedWindow === "cli"}
        headerClass={headerClass}
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("cli")}
      />
      <CliContent
        isDark={isDark}
        lastCommand={lastCommand}
        response={response}
        isResponding={isResponding}
        displayHistory={displayHistory}
        renderTextWithLinks={renderTextWithLinks}
        inputRef={inputRef}
        focusInput={focusInput}
        command={command}
        setCommand={setCommand}
        handleCommand={handleCommand}
        padded
      />
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
  isResponding,
  displayHistory,
  renderTextWithLinks,
  inputRef,
  focusInput,
  handleCommand,
}: BaseProps) => {
  return (
    <div
      className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl flex flex-col overflow-hidden`}
    >
      <WindowHeader
        title={isDark ? "justin-code - zsh" : "Chat"}
        isDark={isDark}
        selected={selectedWindow === "cli"}
        headerClass={headerClass}
        sticky
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("cli")}
      />
      <div className="mt-2 mx-4 flex flex-col flex-grow min-h-0">
        <CliContent
          isDark={isDark}
          lastCommand={lastCommand}
          response={response}
          isResponding={isResponding}
          displayHistory={displayHistory}
          renderTextWithLinks={renderTextWithLinks}
          inputRef={inputRef}
          focusInput={focusInput}
          command={command}
          setCommand={setCommand}
          handleCommand={handleCommand}
          padded={false}
        />
      </div>
    </div>
  );
};
