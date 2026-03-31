import React from "react";
import { WindowHeader } from "./WindowHeader";

type ResumeWindowProps = {
  isDark: boolean;
  isOpen: boolean;
  overlayThemeClass: string;
  headerClass: (selected: boolean) => string;
  resumeFileName: string;
  personName: string;
  onClose: () => void;
};

export const ResumeWindow = ({
  isDark,
  isOpen,
  overlayThemeClass,
  headerClass,
  resumeFileName,
  personName,
  onClose,
}: ResumeWindowProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`w-full lg:w-1/2 h-[70vh] max-w-4xl max-h-[90vh] ${overlayThemeClass} rounded-xl flex flex-col shadow-sm`}
      >
        <WindowHeader
          title={resumeFileName}
          isDark={isDark}
          selected
          headerClass={headerClass}
          onClose={onClose}
          onMinimize={onClose}
        />
        <a
          href={`/${resumeFileName}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm mx-4 mt-4 underline ${isDark ? "text-gray-400" : "text-[#007AFF] hover:text-[#0066D6] apple-transition"}`}
        >
          click to view in new tab
        </a>
        <div className="flex-1 p-4 overflow-hidden">
          <iframe
            src={`/${resumeFileName}#view=FitH&zoom=page-fit`}
            className={`w-full h-full rounded-lg border ${isDark ? "border-gray-600" : "border-[#E5E5EA] rounded-xl"}`}
            title={`${personName} Resume`}
          />
        </div>
      </div>
    </div>
  );
};
