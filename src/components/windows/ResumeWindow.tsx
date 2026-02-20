import React from "react";
import { WindowHeader } from "./WindowHeader";

type ResumeWindowProps = {
  isOpen: boolean;
  overlayThemeClass: string;
  headerClass: (selected: boolean) => string;
  resumeFileName: string;
  personName: string;
  onClose: () => void;
};

export const ResumeWindow = ({
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
          selected
          headerClass={headerClass}
          onClose={onClose}
          onMinimize={onClose}
        />
        <a
          href={`/${resumeFileName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 mx-4 mt-4 underline"
        >
          click to view in new tab
        </a>
        <div className="flex-1 p-4 overflow-hidden">
          <iframe
            src={`/${resumeFileName}#view=FitH&zoom=page-fit`}
            className="w-full h-full rounded-lg border border-gray-600"
            title={`${personName} Resume`}
          />
        </div>
      </div>
    </div>
  );
};
