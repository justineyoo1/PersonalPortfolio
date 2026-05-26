import React from "react";
import { cn } from "@/lib/cn";

type BackFooterProps = {
  isDark: boolean;
  label: string;
  isFocused?: boolean;
  onClick: () => void;
};

export const BackFooter: React.FC<BackFooterProps> = ({
  isDark,
  label,
  isFocused = false,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "shrink-0 px-5 py-3",
        isDark && "border-t border-gray-700 bg-gray-900/35",
      )}
    >
      <button
        className={cn(
          "rounded px-2 py-1 text-sm transition-all duration-150",
          isDark
            ? isFocused
              ? "text-gray-200 underline decoration-gray-500 underline-offset-2"
              : "text-gray-400 hover:text-gray-200 hover:underline"
            : "text-[#007AFF] font-medium hover:text-[#0066D6] apple-transition",
        )}
        onClick={onClick}
      >
        {isDark ? (
          <>
            back to {label}
            {isFocused ? " <" : ""}
          </>
        ) : (
          "← Back"
        )}
      </button>
    </div>
  );
};
