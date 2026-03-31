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
    <p
      className={`rounded-t-xl text-center relative select-none ${sticky ? "sticky top-0 z-10" : ""} ${headerClass(
        selected,
      )}`}
    >
      {title}
      {isDark && (
        <>
          <button
            className="rounded-full p-[3.5px] bg-rose-400/80 absolute right-10 top-1/2 -translate-y-1/2"
            onClick={onClose ?? noop}
          />
          <button
            className="rounded-full p-[3.5px] bg-amber-300/80 absolute right-6 top-1/2 -translate-y-1/2"
            onClick={onMinimize ?? noop}
          />
          <button
            className="rounded-full p-[3.5px] bg-emerald-400/80 absolute right-2 top-1/2 -translate-y-1/2"
            onClick={onMaximize ?? noop}
          />
        </>
      )}
    </p>
  );
};
