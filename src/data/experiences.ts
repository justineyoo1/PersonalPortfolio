import type { ExperienceItem } from "@/types";

export const experiencesData: ExperienceItem[] = [
  {
    title: "Software Engineer Intern @ Wells Fargo",
    compactTitle: "SWE Intern @ Wells Fargo",
    window: "Wells Fargo",
    category: "work",
    date: "May 2026 - Aug 2026",
    org: "Corporate & Commercial Investment Banking Technology · Charlotte, NC",
    description:
      "Built a validation engine for AutoSys workflows, classifying pass/fail from logs at 95% accuracy and saving about 8 hours per week. Cut first load from 150s to 5s across 150+ workflows by replacing serial API calls with a rate-limited fan-out. Added a TTL cache with single-flight coalescing that collapses duplicate in-flight lookups into one upstream call.",
    image: "/img/Logos/WellsFargo.svg",
    links: [{ name: "Wells Fargo", url: "https://www.wellsfargo.com/" }],
  },
  {
    title: "Data Science Intern @ Red Hat",
    compactTitle: "Data Sci Intern @ Red Hat",
    window: "Red Hat",
    category: "work",
    date: "May 2025 - Dec 2025",
    org: "Incentives, Performance & Analytics · Raleigh, NC",
    description:
      "Developed a Streamlit and FastAPI automation app that cut reporting time by 90% across $50M+ in incentive allocations. Deployed an internal PDF data-extraction tool for complex finance documents, saving stakeholders 20+ hours per month. Migrated Redshift pipelines to Snowflake and built dbt models, refactoring legacy Python ETL into SQL workflows.",
    image: "/img/Logos/RedHatLogo.jpg",
    links: [{ name: "Red Hat", url: "https://www.redhat.com/" }],
  },
  {
    title: "Undergraduate Research Assistant @ AIMING Lab",
    compactTitle: "Research Asst @ AIMING Lab",
    window: "AIMING Lab",
    category: "research",
    date: "May 2025 - Dec 2025",
    org: "UNC CS Department · Chapel Hill, NC",
    description:
      "Wired plug-in perception tools (OCR, ASR, object detection, captioning) into the ReAgent-V tool layer, published at NeurIPS 2025. Ran frame-selection ablations and batch evaluations logging per-dimension critic rewards across video-QA benchmarks. Implemented confidence-based cascade routing that cut inference cost roughly 2-4x while retaining about 95% accuracy.",
    image: "/img/Logos/UNCCSD.png",
    links: [{ name: "UNC Computer Science", url: "https://cs.unc.edu/" }],
  },
  {
    title: "Full Stack Developer @ App Team Carolina",
    compactTitle: "Full Stack @ App Team Carolina",
    window: "App Team Carolina",
    category: "clubs",
    date: "Jan 2026 - Present",
    org: "App Team Carolina · Chapel Hill, NC",
    description:
      "Built backend services for Luminary, an app for reporting and browsing campus accessibility issues at UNC. Developed REST APIs for creating and viewing reports, adding filtering, pagination, and indexing to keep the feed fast.",
    image: "/img/Logos/AppTeamCarolina.svg",
    links: [{ name: "App Team Carolina", url: "https://appteamcarolina.com/" }],
  },
  {
    title: "Full Stack Developer @ UNC CS + Social Good",
    compactTitle: "Full Stack @ UNC CS+Social Good",
    window: "UNC CS + Social Good",
    category: "clubs",
    date: "Aug 2024 - May 2025",
    org: "Project Team · Chapel Hill, NC",
    description:
      "Deployed a Tinder-style adoption app for an animal sanctuary where users swipe pets and submit interest forms. Built a scraping pipeline to populate the database and added pagination to REST endpoints, cutting load time by 30%.",
    image: "/img/Logos/CSSG.svg",
    links: [{ name: "UNC CS + Social Good", url: "https://cssgunc.org/" }],
  },
];
