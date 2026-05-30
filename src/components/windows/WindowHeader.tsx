import React from "react";

type WindowHeaderProps = {
  title: string;
  selected: boolean;
  headerClass: (selected: boolean) => string;
  isDark: boolean;
  sticky?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
};

const noop = () => {};

type LightProps = {
  color: string;
  glyph: React.ReactNode;
  label: string;
  onClick?: () => void;
};

const TrafficLight = ({ color, glyph, label, onClick }: LightProps) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={(e) => {
      e.stopPropagation();
      (onClick ?? noop)();
    }}
    className="traffic-light h-3 w-3 rounded-full flex items-center justify-center"
    style={{ backgroundColor: color }}
  >
    <span
      aria-hidden
      className="text-[8px] leading-none font-extrabold"
      style={{ color: "rgba(0,0,0,0.55)" }}
    >
      {glyph}
    </span>
  </button>
);

export const WindowHeader = ({
  title,
  selected,
  headerClass,
  isDark,
  sticky = false,
  onClose,
  onMinimize,
  onMaximize,
}: WindowHeaderProps) => {
  return (
    <div
      className={`rounded-t-xl relative select-none grid grid-cols-[1fr_auto_1fr] items-center px-3 ${
        sticky ? "sticky top-0 z-10" : ""
      } ${headerClass(selected)}`}
    >
      <div className="group/lights flex items-center gap-[7px] justify-self-start">
        <TrafficLight
          color="#FF5F57"
          glyph="✕"
          label="Close"
          onClick={onClose}
        />
        <TrafficLight
          color="#FEBC2E"
          glyph="–"
          label="Minimize"
          onClick={onMinimize}
        />
        <TrafficLight
          color="#28C840"
          glyph={
            <span className="relative -top-[0.5px] text-[7px]">{"⤢"}</span>
          }
          label="Full screen"
          onClick={onMaximize}
        />
      </div>
      <span className="justify-self-center text-center truncate px-2">
        {title}
      </span>
      <span aria-hidden className="justify-self-end" />
    </div>
  );
};
