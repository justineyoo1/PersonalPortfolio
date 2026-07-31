import { NextResponse } from "next/server";
import { NEETCODE_150_SLUGS } from "@/data/neetcode150";

export const runtime = "nodejs";

type NeetCodeProgress = {
  solved: number;
  easy: number;
  medium: number;
  hard: number;
  live: boolean;
};

type CachedStats = {
  easySolved: number;
  hardSolved: number;
  mediumSolved: number;
  totalSolved: number;
  submissionCalendar: Record<string, number>;
  neetcode?: NeetCodeProgress | null;
};

/**
 * Compute live NeetCode 150 progress by intersecting the account's accepted
 * LeetCode problems with the NeetCode 150 slug set. Requires a
 * LEETCODE_SESSION cookie (solved-status filters are only visible when
 * authenticated); returns null when it's absent or expired.
 */
async function fetchNeetCodeProgress(): Promise<NeetCodeProgress | null> {
  const session = process.env.LEETCODE_SESSION;
  if (!session) return null;

  const csrf = process.env.LEETCODE_CSRF || "";
  const cookie = `LEETCODE_SESSION=${session}${csrf ? `; csrftoken=${csrf}` : ""}`;

  const query = `
    query solved($skip: Int!, $limit: Int!) {
      problemsetQuestionList: questionList(
        categorySlug: ""
        skip: $skip
        limit: $limit
        filters: { status: AC }
      ) {
        total: totalNum
        questions: data {
          titleSlug
          difficulty
        }
      }
    }
  `;

  const counts = { solved: 0, easy: 0, medium: 0, hard: 0 };
  const limit = 100;
  let skip = 0;
  let total = Infinity;

  while (skip < total && skip < 5000) {
    const resp = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com/problemset/",
        Cookie: cookie,
        ...(csrf ? { "x-csrftoken": csrf } : {}),
      },
      body: JSON.stringify({ query, variables: { skip, limit } }),
      signal: AbortSignal.timeout(8000),
    });

    if (!resp.ok) return null;
    const data = await resp.json();
    const list = data?.data?.problemsetQuestionList;
    if (!list) return null;

    total = Number(list.total ?? 0);
    const questions: { titleSlug?: string; difficulty?: string }[] =
      list.questions ?? [];
    if (questions.length === 0) break;

    for (const q of questions) {
      if (!q?.titleSlug || !NEETCODE_150_SLUGS.has(q.titleSlug)) continue;
      counts.solved++;
      if (q.difficulty === "Easy") counts.easy++;
      else if (q.difficulty === "Medium") counts.medium++;
      else if (q.difficulty === "Hard") counts.hard++;
    }
    skip += limit;
  }

  return { ...counts, live: true };
}

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

  type AcSubmissionEntry = { difficulty?: string; count?: number };
  const data = await response.json();
  const ac: AcSubmissionEntry[] =
    data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];
  const calendarRaw = data?.data?.matchedUser?.userCalendar?.submissionCalendar;

  const getCount = (difficulty: string) =>
    Number(ac.find((x) => x?.difficulty === difficulty)?.count || 0);

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

    try {
      stats.neetcode = await fetchNeetCodeProgress();
    } catch (neetErr) {
      console.warn("NeetCode progress sync failed:", neetErr);
      stats.neetcode = null;
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
