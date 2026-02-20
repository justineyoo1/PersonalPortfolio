import { useEffect, useState } from "react";
import type { LeetCodeData } from "../types/indexs";

export const useLeetCode = (leetcodeUsername?: string) => {
  const [leetCode, setLeetCode] = useState<LeetCodeData | null>(null);
  const [leetCodeError, setLeetCodeError] = useState("");

  useEffect(() => {
    const fetchLeetCode = async () => {
      setLeetCodeError("");

      try {
        const res = await fetch("/api/leetcode");
        if (res.ok) {
          setLeetCode(await res.json());
          return;
        }
        console.error(await res.text());
      } catch (error) {
        console.error("LeetCode API route failed:", error);
      }

      try {
        const username = leetcodeUsername || "justineyoo";
        const res = await fetch(`https://leetcode-stats.tashif.codes/${username}`);
        if (!res.ok) {
          throw new Error(`Fallback failed: ${res.status}`);
        }

        const data = await res.json();
        setLeetCode({
          easySolved: data.easySolved ?? 0,
          hardSolved: data.hardSolved ?? 0,
          mediumSolved: data.mediumSolved ?? 0,
          totalSolved: data.totalSolved ?? 0,
          submissionCalendar: data.submissionCalendar ?? {},
        });
      } catch (error) {
        console.error("LeetCode fallback failed:", error);
        setLeetCodeError("unable to load leetcode stats");
      }
    };

    fetchLeetCode();
  }, [leetcodeUsername]);

  return { leetCode, leetCodeError };
};
