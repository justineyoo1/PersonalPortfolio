import { NextResponse } from "next/server";

export const runtime = "nodejs";

type CachedStats = {
  easySolved: number;
  hardSolved: number;
  mediumSolved: number;
  totalSolved: number;
  submissionCalendar: Record<string, number>;
};

let cachedStats: CachedStats | null = null;
let lastFetchTime = 0;

async function fetchFromTashif(username: string): Promise<CachedStats> {
  const response = await fetch(`https://leetcode-stats.tashif.codes/${username}`, {
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`tashif provider failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return {
    easySolved: Number(data.easySolved || 0),
    hardSolved: Number(data.hardSolved || 0),
    mediumSolved: Number(data.mediumSolved || 0),
    totalSolved: Number(data.totalSolved || 0),
    submissionCalendar:
      typeof data.submissionCalendar === "object" && data.submissionCalendar
        ? data.submissionCalendar
        : {},
  };
}

async function fetchFromLeetCodeGraphQL(username: string): Promise<CachedStats> {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        userCalendar {
          submissionCalendar
        }
      }
    }
  `;

  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { username } }),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`leetcode graphql failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const ac = data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];
  const calendarRaw = data?.data?.matchedUser?.userCalendar?.submissionCalendar;

  const getCount = (difficulty: string) =>
    Number(ac.find((x: any) => x?.difficulty === difficulty)?.count || 0);

  const submissionCalendar =
    typeof calendarRaw === "string" && calendarRaw.trim().length > 0
      ? JSON.parse(calendarRaw)
      : {};

  return {
    easySolved: getCount("Easy"),
    mediumSolved: getCount("Medium"),
    hardSolved: getCount("Hard"),
    totalSolved: getCount("All"),
    submissionCalendar:
      typeof submissionCalendar === "object" && submissionCalendar
        ? submissionCalendar
        : {},
  };
}

export async function GET() {
  const CACHE_TTL = 1000 * 60 * 60; // 1 hour
  const username = process.env.LEETCODE_USERNAME || "justineyoo";

  if (cachedStats && Date.now() - lastFetchTime < CACHE_TTL) {
    return NextResponse.json({ ...cachedStats, cached: true });
  }

  try {
    let stats: CachedStats;
    let source = "tashif";

    try {
      stats = await fetchFromTashif(username);
    } catch (firstError) {
      console.warn("Primary LeetCode provider failed, trying GraphQL fallback:", firstError);
      stats = await fetchFromLeetCodeGraphQL(username);
      source = "leetcode-graphql";
    }

    cachedStats = stats;
    lastFetchTime = Date.now();

    return NextResponse.json({ ...stats, cached: false, source });
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);

    if (cachedStats) {
      return NextResponse.json({
        ...cachedStats,
        cached: true,
        warning: "API error, showing cached data",
      });
    }

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: String(error),
      },
      { status: 500 },
    );
  }
}
