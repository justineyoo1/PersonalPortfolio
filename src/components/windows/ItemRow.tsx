import React from "react";
import { cn } from "@/lib/cn";

type Variant = "collapsed" | "expanded";

type ItemRowProps = {
  index: number;
  label: string;
  isDark: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  variant?: Variant;
};

const lightSelectedClasses = "bg-[#007AFF]/12 text-[#007AFF] font-bold";
const lightExpandedSelected = "bg-[#007AFF]/10 text-[#007AFF] font-semibold";
const lightHoveredCollapsed = "bg-[#E8E8ED] text-[#1D1D1F] font-semibold";
const lightHoveredExpanded = "bg-[#F2F2F7] text-[#1D1D1F]";
const lightDefault = "bg-transparent text-[#1D1D1F] font-medium";
const darkSelected = "bg-gray-200 text-black";
const darkHovered = "bg-gray-800/55 text-blue-200";
const darkDefault = "bg-transparent text-[#60A5FA]";

const getStateClasses = (
  isDark: boolean,
  isSelected: boolean,
  isHovered: boolean,
  variant: Variant,
) => {
  if (isDark) {
    if (isSelected) return darkSelected;
    if (isHovered) return darkHovered;
    return darkDefault;
  }
  if (isSelected) {
    return variant === "expanded" ? lightExpandedSelected : lightSelectedClasses;
  }
  if (isHovered) {
    return variant === "expanded" ? lightHoveredExpanded : lightHoveredCollapsed;
  }
  return lightDefault;
};

const collapsedShellClasses = (isDark: boolean) =>
  cn(
    isDark ? "text-[13px] lg:text-sm" : "text-[14px]",
    "leading-normal transition-all duration-200 cursor-pointer my-1.5 lg:my-1",
    isDark ? "h-7" : "h-9",
    "flex items-center px-3 whitespace-nowrap overflow-hidden text-ellipsis",
    isDark ? "rounded-md" : "rounded-xl",
  );

const expandedShellClasses = cn(
  "rounded-md transition-all duration-150 cursor-pointer px-2 py-1",
);

export const ItemRow: React.FC<ItemRowProps> = ({
  index,
  label,
  isDark,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  variant = "collapsed",
}) => {
  // hover doubles as selected state in current design
  const isSelected = isHovered;
  const stateClasses = getStateClasses(isDark, isSelected, isHovered, variant);
  const shellClasses =
    variant === "expanded" ? expandedShellClasses : collapsedShellClasses(isDark);

  return (
    <div
      className={cn(shellClasses, stateClasses)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {isDark ? (
        isSelected ? "▌ " : "  "
      ) : (
        <span
          className={cn(
            isSelected ? "text-[#007AFF]" : "text-[#B0B0B5]",
            variant === "expanded"
              ? "text-[12px] w-5 shrink-0 font-medium mr-1"
              : "text-[11px] shrink-0 font-mono mr-2.5 tracking-tight",
          )}
        >
          {variant === "expanded"
            ? index + 1
            : `/${String(index + 1).padStart(2, "0")}`}
        </span>
      )}
      {/* Needs its own block box: as a bare flex child the text clips hard
          instead of showing an ellipsis. */}
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </div>
  );
};
