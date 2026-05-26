import { useEffect, useState } from "react";

export const useResumeOverlay = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const open = () => setIsResumeOpen(true);
    window.addEventListener("openResume", open);
    return () => window.removeEventListener("openResume", open);
  }, []);

  useEffect(() => {
    if (!isResumeOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsResumeOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isResumeOpen]);

  return { isResumeOpen, setIsResumeOpen };
};
