import React from "react";
import { WindowHeader } from "./WindowHeader";
import { BackFooter } from "./BackFooter";
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
  resumeFileName: string;
  socialLinks: {
    github: string;
    linkedin: string;
    leetcode: string;
  };
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

/* ── Terminal building blocks (dark "me — zsh" session) ───────────────── */

const Prompt: React.FC<{ cmd?: React.ReactNode; cursor?: boolean }> = ({
  cmd,
  cursor,
}) => (
  <div className="flex items-center flex-wrap gap-x-2">
    <span className="whitespace-pre">
      <span className="text-[#3FB950] font-semibold">justin@unc</span>
      <span className="text-[#768390]"> </span>
      <span className="text-[#58A6FF]">~</span>
      <span className="text-[#768390]"> %</span>
    </span>
    {cmd != null && <span className="text-[#E6EDF3] font-semibold">{cmd}</span>}
    {cursor && <span className="term-cursor" aria-hidden />}
  </div>
);

const SpecRow: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex gap-3">
    <span className="text-[#58A6FF] font-semibold w-[72px] shrink-0">{label}</span>
    <span className="text-[#ADBAC7]">{children}</span>
  </div>
);

const Palette = () => (
  <div className="flex gap-1.5 pt-2.5" aria-hidden>
    {["#FF5F57", "#FEBC2E", "#3FB950", "#58A6FF", "#BC8CFF", "#39C5CF", "#F778BA", "#ADBAC7"].map(
      (c) => (
        <span key={c} className="h-2.5 w-5 rounded-[2px]" style={{ backgroundColor: c }} />
      ),
    )}
  </div>
);

const TerminalAbout: React.FC<{
  selectedAscii: string;
  personalInfo: PersonalInfo;
  time: Date | null;
}> = ({ selectedAscii, personalInfo, time }) => {
  const { socialLinks, resumeFileName } = personalInfo;
  const linkClass =
    "text-[#3FB950] hover:text-[#56D364] hover:underline underline-offset-2 transition-colors";
  return (
    <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 py-8 font-mono text-[13px] sm:text-sm space-y-7">
      {/* neofetch */}
      <section className="space-y-4">
        <Prompt cmd="neofetch" />
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-9 gap-y-5 sm:items-center pl-1">
          <pre className="ascii-glow text-[6px] leading-[1.05] sm:text-[7px] text-[#7FB2F0] whitespace-pre overflow-hidden">
            {selectedAscii}
          </pre>
          <div className="space-y-1.5">
            <div className="font-bold">
              <span className="text-[#58A6FF]">justin</span>
              <span className="text-[#768390]">@</span>
              <span className="text-[#58A6FF]">unc</span>
            </div>
            <div className="text-[#30363D] select-none">
              ───────────────────────
            </div>
            <SpecRow label="role">Software Engineer · ML/AI</SpecRow>
            <SpecRow label="school">CS + Stats @ UNC</SpecRow>
            <SpecRow label="location">Chapel Hill, NC</SpecRow>
            <SpecRow label="uptime">graduating Dec 2027</SpecRow>
            <SpecRow label="focus">backend · automation · data</SpecRow>
            <SpecRow label="email">
              <a href={`mailto:${personalInfo.email}`} className="hover:text-[#58A6FF] transition-colors">
                {personalInfo.email}
              </a>
            </SpecRow>
            <SpecRow label="time">{time?.toLocaleTimeString() ?? ""}</SpecRow>
            <Palette />
          </div>
        </div>
      </section>

      {/* cat about.md */}
      <section className="space-y-3">
        <Prompt cmd="cat about.md" />
        <div className="space-y-3 pl-1 max-w-2xl text-[#9DA7B3] leading-relaxed">
          {personalInfo.aboutMe.slice(0, 4).map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      </section>

      {/* ls ./links */}
      <section className="space-y-3">
        <Prompt cmd="ls ./links" />
        <div className="flex flex-wrap gap-x-7 gap-y-2 pl-1">
          <a className={linkClass} href={socialLinks.github} target="_blank" rel="noopener noreferrer">
            github*
          </a>
          <a className={linkClass} href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            linkedin*
          </a>
          <a className={linkClass} href={socialLinks.leetcode} target="_blank" rel="noopener noreferrer">
            leetcode*
          </a>
          <a
            className="text-[#58A6FF] hover:underline underline-offset-2 transition-colors"
            href={`/${resumeFileName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            resume.pdf
          </a>
        </div>
      </section>

      {/* live prompt */}
      <Prompt cursor />
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
      className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl overflow-hidden focus:outline-none relative flex flex-col ${
        isDark ? "terminal-crt" : ""
      }`}
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
        {isDark ? (
          <TerminalAbout
            selectedAscii={selectedAscii}
            personalInfo={personalInfo}
            time={time}
          />
        ) : (
          <>
            <div className="flex flex-col max-w-3xl mx-auto mt-4 mb-8 px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-start">
                <div className="h-[200px] lg:h-[260px]">
                  <MathBlob />
                </div>
                <div className="pt-1">
                  <p className="text-[#007AFF] text-sm lg:text-lg leading-none mb-1 uppercase tracking-wide font-bold">
                    {personalInfo.name}
                  </p>
                  <p className="text-[#86868B] text-xs lg:text-sm leading-none mb-3">
                    {personalInfo.email}
                  </p>
                  <div className="text-[#515154] text-xs lg:text-sm leading-snug space-y-1.5">
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
                  className="text-sm leading-relaxed text-[#515154]"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <BackFooter
        isDark={isDark}
        label="main page"
        onClick={() => setExpandWindow("")}
      />
    </div>
  );
};
