export type AppStatus = "waitlist" | "available" | "building";

export type AppInfo = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string | null;
  status: AppStatus;
  appStoreUrl?: string;
  appStoreId?: string;
  waitlistUrl?: string;
  /** Short status note shown on cards when status === "building". Use for
      stage / availability framing (e.g. "Closed beta · By invitation"). */
  buildingNote?: string;
  accentColor: string;
  iconBg?: "light" | "dark";
};

export const apps: AppInfo[] = [
  {
    slug: "eunho",
    name: "Eunho",
    tagline: "One habit. Held daily.",
    description:
      "A streak tracker for one habit. Hold the ring for 2.5 seconds. That is the check-in.",
    features: [
      "Hold the ring for 2.5 seconds",
      "100 days, visible on one screen",
      "Lock Screen, Home Screen, StandBy widgets",
    ],
    icon: "/img/apps/eunho/icon-1024-dark.png",
    status: "available",
    appStoreUrl: "https://apps.apple.com/app/id6761335497",
    appStoreId: "6761335497",
    accentColor: "#FF3B5C",
    iconBg: "dark",
  },
  {
    slug: "uninstall",
    name: "Uninstall",
    tagline: "App blocker. No takebacks.",
    description:
      "A focus app that doesn't ask nicely. Set a block, lose the off switch. Friction beats willpower.",
    features: [
      "Apps, categories, websites",
      "10-second hold plus 5-minute lockout",
      "Routines run themselves",
    ],
    icon: "/img/apps/uninstall/icon-1024.png",
    status: "available",
    appStoreUrl: "https://apps.apple.com/app/id6761068093",
    appStoreId: "6761068093",
    accentColor: "#D63B2E",
    iconBg: "light",
  },
  {
    slug: "brik",
    name: "Brik",
    tagline: "Mornings you don't snooze.",
    description:
      "A hard alarm that only silences when you finish a verified mission. Pushups, math, sky, or a made bed.",
    features: [
      "Pushups verified by Vision pose detection",
      "Photo missions verified on-device",
      "16 watchdog alarms. No notification escape.",
    ],
    icon: "/img/apps/brik/icon-1024.png",
    status: "available",
    appStoreUrl: "https://apps.apple.com/app/id6761065846",
    appStoreId: "6761065846",
    accentColor: "#FF7A1A",
    iconBg: "light",
  },
  {
    slug: "shwup",
    name: "Shwup",
    tagline: "Workout Tracker & Gym Log",
    description:
      "Log workouts in seconds. Track PRs, visualize progress, never forget a set.",
    features: [
      "One-tap exercise logging",
      "Personal record tracking",
      "Progress charts and streaks",
    ],
    icon: "/img/Logos/shwup_app_logo.png",
    status: "waitlist",
    waitlistUrl: "#",
    accentColor: "#34D399",
    iconBg: "light",
  },
  {
    slug: "bord",
    name: "Bord",
    tagline: "Finance takes. Every side. You call it.",
    description:
      "A board of AI specialist voices — CFO, Strategist, Risk, Markets — debating your real money in a Threads-style feed. Plaid-linked. Multi-voice. Never auto-trades.",
    features: [
      "A board of specialist voices, each with their own argument",
      "Plaid-linked spending, portfolio, and goals trigger the feed",
      "Type a money question, watch the debate stream",
    ],
    icon: null,
    status: "building",
    buildingNote: "Closed beta · By invitation",
    accentColor: "#5DE5B5",
    iconBg: "dark",
  },
  {
    slug: "whistle",
    name: "Whistle",
    tagline: "Run your leagues by talking to an agent.",
    description:
      "AI-native referee assigning and payments. The agent drafts the weekend; the assignor commits; officials get paid the next day via Stripe.",
    features: [
      "Natural-language assigning with conflict + fairness reasoning",
      "Stripe Connect rails — payouts next day, no subscription",
      "Officials iOS app: schedule, availability, earnings, auto-1099",
    ],
    icon: null,
    status: "building",
    buildingNote: "Pre-launch · Building toward launch",
    accentColor: "#5A8C6D",
    iconBg: "light",
  },
];
