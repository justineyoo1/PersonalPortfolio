import React from "react";
import { WindowHeader } from "./WindowHeader";
import MathBlob from "../MathBlob";

type PersonalInfo = {
  name: string;
  username: string;
  computerName: string;
  email: string;
  title: string;
  education: string;
  graduationYear: string;
  location: string;
  aboutMe: string[];
};

type BaseProps = {
  isDark: boolean;
  selectedWindow: string;
  windowThemeClass: string;
  headerClass: (selected: boolean) => string;
  selectedAscii: string;
  personalInfo: PersonalInfo;
  time: Date | null;
  setExpandWindow: (value: string) => void;
};

export const MeCollapsed = ({
  isDark,
  selectedWindow,
  windowThemeClass,
  headerClass,
  selectedAscii,
  personalInfo,
  time,
  setExpandWindow,
  setSelectedWindow,
  isHidden,
}: BaseProps & { setSelectedWindow: (value: string) => void; isHidden: boolean }) => {
  return (
    <div
      className={` ${windowThemeClass} rounded-xl col-span-2 flex flex-col h-[300px] lg:h-[320px] min-h-0 overflow-hidden order-1 ${
        isHidden ? "opacity-0" : ""
      } transition-opacity duration-500`}
      onClick={() => setSelectedWindow("me")}
    >
      <WindowHeader
        title={isDark ? "me - zsh" : "About"}
        isDark={isDark}
        selected={selectedWindow === "me"}
        headerClass={headerClass}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("me")}
      />
      <div className={`flex-1 min-h-0 overflow-hidden px-5 py-4 grid grid-cols-2 gap-5 ${isDark ? "font-mono" : "bg-gradient-to-br from-white/60 to-[#F0F4FF]/40"}`}>
        <div className="min-h-0 overflow-hidden flex items-center justify-center">
          {isDark ? (
            <p className="text-[5px] leading-[1] sm:text-[6px] md:text-[7px] font-mono whitespace-pre text-center text-blue-100">
              {selectedAscii}
            </p>
          ) : (
            <MathBlob />
          )}
        </div>
        <div className="min-h-0 overflow-hidden flex flex-col justify-center text-xs lg:text-sm">
          <p
            className={`${isDark ? "text-[#60A5FA]" : "text-[#007AFF]"} ${isDark ? "text-sm lg:text-base" : "text-base lg:text-lg"} leading-none mb-1 truncate uppercase tracking-wide font-bold`}
          >
            {personalInfo.name}
          </p>
          <p
            className={`${isDark ? "text-gray-200" : "text-[#86868B]"} text-xs leading-none mb-3 truncate`}
          >
            {personalInfo.email}
          </p>
          <div
            className={`${isDark ? "text-gray-200" : "text-gray-600"} space-y-1.5 text-xs lg:text-sm leading-snug`}
          >
            <p className={`truncate ${isDark ? "" : "text-[#1D1D1F] font-bold text-sm"}`}>Software Engineer • ML/AI</p>
            <p className={`truncate ${isDark ? "" : "text-[#515154]"}`}>CS + Stats @ UNC</p>
            <p className={`truncate ${isDark ? "" : "text-[#515154]"}`}>{personalInfo.location}</p>
            <p className={`truncate ${isDark ? "" : "text-[#86868B] text-[11px]"}`}>Time: {time?.toLocaleTimeString() ?? ""}</p>
          </div>
          <button
            className={`mt-3 w-fit rounded-md px-3 py-1 text-[11px] lg:text-xs text-left font-semibold transition-colors ${
              isDark
                ? "border border-gray-600 text-gray-300 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-100"
                : "bg-[#007AFF] text-white rounded-full hover:bg-[#0066D6] apple-transition px-5 py-1.5 text-[13px] font-bold shadow-[0_2px_8px_rgba(0,122,255,0.3)]"
            }`}
            onClick={() => setExpandWindow("me")}
          >
            {isDark ? "[about me]" : "About Me"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const MeExpanded = ({
  isDark,
  selectedWindow,
  windowThemeClass,
  headerClass,
  selectedAscii,
  personalInfo,
  time,
  setExpandWindow,
  meWindowRef,
}: BaseProps & { meWindowRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <div
      ref={meWindowRef}
      className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-hidden focus:outline-none relative flex flex-col`}
      tabIndex={0}
    >
      <WindowHeader
        title={isDark ? "me - zsh" : "About"}
        isDark={isDark}
        selected={selectedWindow === "me"}
        headerClass={headerClass}
        sticky
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("me")}
      />
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        <div className={`flex flex-col max-w-3xl mx-auto mt-4 mb-8 px-4 ${isDark ? "font-mono" : ""}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-start">
            {isDark ? (
              <p className="text-[5px] leading-[1] sm:text-[6px] md:text-[7px] text-blue-100 font-mono whitespace-pre text-center">
                {selectedAscii}
              </p>
            ) : (
              <div className="h-[200px] lg:h-[260px]">
                <MathBlob />
              </div>
            )}
            <div className="pt-1">
              <p
                className={`${isDark ? "text-[#60A5FA]" : "text-[#007AFF]"} text-sm lg:text-lg leading-none mb-1 uppercase tracking-wide font-bold`}
              >
                {personalInfo.name}
              </p>
              <p
                className={`${isDark ? "text-gray-200" : "text-[#86868B]"} text-xs lg:text-sm leading-none mb-3`}
              >
                {personalInfo.email}
              </p>
              <div
                className={`${isDark ? "text-gray-200" : "text-[#515154]"} text-xs lg:text-sm leading-snug space-y-1.5`}
              >
                <p>Software Engineer • ML/AI</p>
                <p>CS + Stats @ UNC</p>
                <p>{personalInfo.location}</p>
                <p>Time: {time?.toLocaleTimeString() ?? ""}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-w-3xl w-full mx-auto mt-2 mb-4 px-4">
          {personalInfo.aboutMe.map((paragraph, index) => (
            <p
              key={index}
              className={`text-sm leading-relaxed ${isDark ? "text-gray-200" : "text-[#515154]"}`}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      </div>
      <div
        className={`shrink-0 px-4 py-3 border-t ${
          isDark ? "border-gray-700 bg-gray-900/35" : "border-[#D5D5DC]/60 bg-[#EAEAF0]/70"
        }`}
      >
        <button
          className={`rounded px-2 py-1 text-sm transition-all duration-150 ${
            isDark
              ? "text-gray-400 hover:text-gray-200 hover:underline"
              : "text-[#86868B] hover:text-[#1D1D1F] hover:underline"
          }`}
          onClick={() => setExpandWindow("")}
        >
          back to main page {"<"}
        </button>
      </div>
    </div>
  );
};
