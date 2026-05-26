import React from "react";
import { cn } from "@/lib/cn";

type FilterTabsProps<T extends string> = {
  filters: readonly T[];
  active: T;
  counts: Record<T, number>;
  onChange: (value: T) => void;
  isDark: boolean;
  tabClass: (active: boolean) => string;
  /** Map an internal filter key to a user-facing label (defaults to capitalize) */
  labelFor?: (filter: T) => string;
};

const defaultLabel = (filter: string) =>
  filter.charAt(0).toUpperCase() + filter.slice(1);

export function FilterTabs<T extends string>({
  filters,
  active,
  counts,
  onChange,
  isDark,
  tabClass,
  labelFor = defaultLabel,
}: FilterTabsProps<T>) {
  return (
    <div
      className={cn(
        "text-xs flex",
        isDark
          ? "px-4 pt-2 pb-2 font-mono border-b border-gray-700 gap-1.5"
          : "mx-4 mt-2 p-0.5 bg-[#DDDDE3] rounded-lg gap-0",
      )}
    >
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={cn(tabClass(active === filter), !isDark && "flex-1 text-center")}
        >
          {isDark
            ? `[${labelFor(filter)} (${counts[filter]})]`
            : labelFor(filter)}
        </button>
      ))}
    </div>
  );
}
