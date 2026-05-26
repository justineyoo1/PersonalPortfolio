export type LinkItem = {
  name: string;
  url: string;
};

export type ExperienceCategory = "work" | "research" | "clubs";

export type ExperienceItem = {
  title: string;
  compactTitle?: string;
  window: string;
  category?: ExperienceCategory | string;
  date: string;
  description: string;
  image: string;
  links: LinkItem[];
};

export type ProjectCategory = "swe" | "ml/data";

export type ProjectItem = {
  title: string;
  compactTitle?: string;
  window: string;
  category?: ProjectCategory | string;
  date: string;
  description: string;
  image: string;
  links: LinkItem[];
};

export type ExperienceFilter = "all" | "work" | "research";
export type ExperienceViewMode = "list" | "timeline";
export type ProjectFilter = "all" | "swe" | "ml/data";
export type ToolboxTab = "skills" | "certs";

export type LeetCodeData = {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSolved: number;
  submissionCalendar: Record<string, number>;
};

export type PersonalInfo = {
  name: string;
  username: string;
  computerName: string;
  email: string;
  title: string;
  education: string;
  graduationYear: string;
  location: string;
  resumeFileName: string;
  socialLinks: {
    github: string;
    linkedin: string;
    spotify: string;
    leetcode: string;
  };
  leetcodeUsername: string;
  aboutMe: string[];
};
