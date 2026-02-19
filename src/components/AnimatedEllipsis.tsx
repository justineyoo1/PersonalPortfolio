import { useEffect, useState } from "react";

const AnimatedEllipsis = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const id = window.setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : `${prev}.`));
    }, 350);

    return () => window.clearInterval(id);
  }, []);

  return <span>{dots}</span>;
};

export default AnimatedEllipsis;
