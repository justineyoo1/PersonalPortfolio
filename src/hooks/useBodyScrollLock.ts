import { useEffect } from "react";

export const useBodyScrollLock = (locked: boolean) => {
  useEffect(() => {
    const body = document.body;

    if (locked) {
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.width = "100%";
    } else {
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
    }

    return () => {
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
    };
  }, [locked]);
};
