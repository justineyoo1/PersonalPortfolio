export type AppStatus = "waitlist" | "available";

export type AppInfo = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string | null;
  status: AppStatus;
  appStoreUrl?: string;
  waitlistUrl?: string;
  accentColor: string;
  /** "light" = white bg in dark mode; "dark" = dark bg in both modes */
  iconBg?: "light" | "dark";
};

export const apps: AppInfo[] = [
  {
    slug: "brik",
    name: "Brik",
    tagline: "Alarm Clock to Wake Up",
    description:
      "Stop snoozing. Stack a brick for every alarm you beat — miss one and your wall crumbles.",
    features: [
      "Gamified wake-up streaks",
      "Progressive difficulty levels",
      "Sleep analytics dashboard",
    ],
    icon: "/img/apps/brik.png",
    status: "waitlist",
    waitlistUrl: "#",
    accentColor: "#F87171",
    iconBg: "dark",
  },
  {
    slug: "uninstall",
    name: "Uninstall",
    tagline: "Screentime Control",
    description:
      "Take back your time. Set app limits that actually stick with accountability-first design.",
    features: [
      "Smart app blocking schedules",
      "Focus sessions with friends",
      "Weekly screentime reports",
    ],
    icon: "/img/apps/uninstall.png",
    status: "waitlist",
    waitlistUrl: "#",
    accentColor: "#60A5FA",
    iconBg: "dark",
  },
  {
    slug: "shwup",
    name: "Shwup",
    tagline: "Workout Tracker & Gym Log",
    description:
      "Log workouts in seconds. Track PRs, visualize progress, and never forget a set again.",
    features: [
      "One-tap exercise logging",
      "Personal record tracking",
      "Progress charts & streaks",
    ],
    icon: "/img/Logos/shwup_app_logo.png",
    status: "waitlist",
    waitlistUrl: "#",
    accentColor: "#34D399",
    iconBg: "light",
  },
  {
    slug: "eunho",
    name: "Eunho",
    tagline: "Focus on One Habit Tracker",
    description:
      "One habit at a time. Master it before moving on — no overwhelm, just steady growth.",
    features: [
      "Single-habit focus system",
      "Milestone-based progression",
      "Minimalist daily check-ins",
    ],
    icon: "/img/apps/eunho.png",
    status: "waitlist",
    waitlistUrl: "#",
    accentColor: "#FBBF24",
    iconBg: "dark",
  },
];
