import React from "react";
import { WindowHeader } from "./WindowHeader";

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
  time: Date;
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
        title="me - zsh"
        selected={selectedWindow === "me"}
        headerClass={headerClass}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("me")}
      />
      <div className="flex-1 min-h-0 overflow-hidden px-4 py-3 grid grid-cols-2 gap-4 font-mono">
        <div className="min-h-0 overflow-hidden flex items-center justify-center">
          <p
            className={`text-[5px] leading-[1] sm:text-[6px] md:text-[7px] whitespace-pre text-center ${
              isDark ? "text-blue-100" : "text-[#000000]"
            }`}
          >
            {selectedAscii}
          </p>
        </div>
        <div className="min-h-0 overflow-hidden flex flex-col justify-center text-xs lg:text-sm">
          <p
            className={`${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"} text-sm lg:text-base leading-none mb-1 truncate uppercase tracking-wide font-semibold`}
          >
            {personalInfo.name}
          </p>
          <p
            className={`${isDark ? "text-gray-200" : "text-gray-800"} text-[11px] lg:text-xs leading-none mb-3 truncate`}
          >
            {personalInfo.email}
          </p>
          <div
            className={`${isDark ? "text-gray-200" : "text-gray-800"} space-y-1 text-xs lg:text-sm leading-none`}
          >
            <p className="truncate">Software Engineer • ML/AI</p>
            <p className="truncate">CS + Stats @ UNC</p>
            <p className="truncate">{personalInfo.location}</p>
            <p className="truncate">Time: {time.toLocaleTimeString()}</p>
          </div>
          <button
            className={`mt-3 w-fit rounded-md px-3 py-1 text-[11px] lg:text-xs text-left font-semibold border transition-colors ${
              isDark
                ? "border-gray-600 text-gray-300 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-100"
                : "border-gray-400 text-gray-700 hover:bg-gray-900 hover:text-gray-100 hover:border-gray-900"
            }`}
            onClick={() => setExpandWindow("me")}
          >
            [about me]
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
        title="me - zsh"
        selected={selectedWindow === "me"}
        headerClass={headerClass}
        sticky
        onClose={() => setExpandWindow("")}
        onMinimize={() => setExpandWindow("")}
        onMaximize={() => setExpandWindow("me")}
      />
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        <div className="flex flex-col max-w-3xl mx-auto mt-4 mb-8 px-4 font-mono">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-start">
            <p
              className={`text-[5px] leading-[1] sm:text-[6px] md:text-[7px] ${
                isDark ? "text-blue-100" : "text-black"
              } font-mono whitespace-pre text-center`}
            >
              {selectedAscii}
            </p>
            <div className="pt-1">
              <p
                className={`${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"} text-sm lg:text-lg leading-none mb-1 uppercase tracking-wide font-semibold`}
              >
                {personalInfo.name}
              </p>
              <p
                className={`${isDark ? "text-gray-200" : "text-gray-800"} text-[11px] lg:text-sm leading-none mb-3`}
              >
                {personalInfo.email}
              </p>
              <div
                className={`${isDark ? "text-gray-200" : "text-gray-800"} text-xs lg:text-sm leading-none space-y-1`}
              >
                <p>Software Engineer • ML/AI</p>
                <p>CS + Stats @ UNC</p>
                <p>{personalInfo.location}</p>
                <p>Time: {time.toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-w-3xl w-full mx-auto mt-2 mb-4 px-4">
          {personalInfo.aboutMe.map((paragraph, index) => (
            <p
              key={index}
              className={`text-sm leading-relaxed ${isDark ? "text-gray-200" : "text-gray-800"}`}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      </div>
      <div
        className={`shrink-0 px-4 py-3 border-t ${
          isDark ? "border-gray-700 bg-gray-900/35" : "border-gray-300 bg-gray-100/55"
        }`}
      >
        <button
          className={`rounded px-2 py-1 text-sm transition-all duration-150 ${
            isDark
              ? "text-gray-400 hover:text-gray-200 hover:underline"
              : "text-gray-500 hover:text-gray-800 hover:underline"
          }`}
          onClick={() => setExpandWindow("")}
        >
          back to main page {"<"}
        </button>
      </div>
    </div>
  );
};
