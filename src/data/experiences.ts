import type { ExperienceItem } from "@/types";

export const experiencesData: ExperienceItem[] = [
  {
    title: "Software Engineer Intern @ Wells Fargo",
    compactTitle: "SWE Intern @ Wells Fargo",
    window: "Wells Fargo",
    category: "work",
    date: "May 2026 - Aug 2026",
    description:
      "Built an agentic LLM triage workflow with REST APIs to help analysts resolve high-priority breaks. Shipped a GUI for dataset upload, sampling, and prompt iteration, reducing tuning cycles from about an hour to under five minutes. Implemented A/B prompt evaluation with schema and quality checks, cutting manual review time by roughly 80-90%.",
    image: "/img/Logos/WellsFargo.svg",
    links: [{ name: "Wells Fargo", url: "https://www.wellsfargo.com/" }],
  },
  {
    title: "Data Science Intern @ Red Hat",
    compactTitle: "Data Sci Intern @ Red Hat",
    window: "Red Hat",
    category: "work",
    date: "May 2025 - Dec 2025",
    description:
      "Developed a Streamlit and FastAPI automation app that cut reporting work by 90% and automated $50M+ in allocations. Deployed a PDF data-extraction tool for complex finance documents, saving stakeholders 20+ hours per week. Migrated Redshift pipelines to Snowflake and built dbt models to modernize legacy ETL into SQL workflows.",
    image: "/img/Logos/RedHatLogo.jpg",
    links: [{ name: "Red Hat", url: "https://www.redhat.com/" }],
  },
  {
    title: "Undergraduate Research Assistant @ AIMING Lab",
    compactTitle: "Research Asst @ AIMING Lab",
    window: "AIMING Lab",
    category: "research",
    date: "Aug 2025 - Dec 2025",
    description:
      "Built PyTorch evaluation pipelines for cross-lingual NLU tasks, including calibration metrics and model cascade benchmarks. Implemented confidence-based routing to selectively use larger models, reducing inference cost while preserving accuracy.",
    image: "/img/Logos/UNCCSD.png",
    links: [{ name: "UNC Computer Science", url: "https://cs.unc.edu/" }],
  },
  {
    title: "Backend @ App Team Carolina",
    compactTitle: "Backend @ App Team Carolina",
    window: "App Team Carolina",
    category: "clubs",
    date: "Aug 2026 - Present",
    description:
      "Built backend services for Luminary, an app that helps users navigate UNC by reporting accessibility issues. Implemented REST APIs for report creation and feed retrieval with filtering, pagination, and indexing to keep performance stable at scale.",
    image: "/img/Logos/AppTeamCarolina.svg",
    links: [{ name: "App Team Carolina", url: "https://appteamcarolina.com/" }],
  },
  {
    title: "Backend @ UNC CS+Social Good",
    compactTitle: "Backend @ UNC CS+Social Good",
    window: "UNC CS + Social Good",
    category: "clubs",
    date: "Aug 2024 - May 2025",
    description:
      "Built backend features for a Tinder-style animal adoption app for a local sanctuary. Added data scraping, database ingestion, and paginated REST endpoints, reducing feed load time by about 30%.",
    image: "/img/Logos/CSSG.svg",
    links: [{ name: "UNC CS + Social Good", url: "https://cssgunc.org/" }],
  },
];
