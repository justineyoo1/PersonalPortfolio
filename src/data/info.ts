// Personal Information - CUSTOMIZE THIS!
export const personalInfo = {
  // Basic Info
  name: "Justin Yoo",
  username: "justin", // Used in terminal display (username@computer)
  computerName: "MacbookPro", // Used in terminal display (username@computer)
  email: "jeyoo@unc.edu",
  title: "Software Engineer @ Wells Fargo",
  education: "CS + Stats @ UNC Chapel Hill",

  // Resume filename (must be in /public folder)
  resumeFileName: "Justin_Y_Resume.pdf",

  // Social Links
  socialLinks: {
    github: "https://github.com/justineyoo1",
    linkedin: "https://www.linkedin.com/in/justineyoo",
    spotify: "https://open.spotify.com/user/justinyoou",
    leetcode: "https://leetcode.com/u/justineyoo/",
  },

  // Usernames for API integrations
  leetcodeUsername: "justineyoo", // Used in /api/leetcode to fetch your stats

  // About Me - Each string is a paragraph
  aboutMe: [
    "Hey, I&apos;m Justin. I&apos;m studying Computer Science and Statistics at UNC Chapel Hill, graduating in December 2027.",
    "I like building backend-heavy products that are practical and measurable, especially automation workflows and data-driven systems.",
    "Most recently, I worked on LLM triage tooling and internal data platforms during internships at Wells Fargo and Red Hat.",
    "I also enjoy building full-stack side projects like Portfolio Pulse and SyllabusSync using FastAPI, Postgres, Redis, Celery, and Docker.",
    'You can find my work on <a href="https://github.com/justineyoo1" class="text-blue-300 underline" target="_blank" rel="noopener noreferrer">GitHub</a> and connect with me on <a href="https://www.linkedin.com/in/justineyoo" class="text-blue-300 underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>.',
  ],
};

export const experiencesData = [
  {
    title: "Software Engineer Intern @ Wells Fargo",
    window: "Wells Fargo",
    category: "work",
    date: "May 2026 - Aug 2026",
    description:
      "Built an agentic LLM triage workflow with REST APIs to help analysts resolve high-priority breaks. Shipped a GUI for dataset upload, sampling, and prompt iteration, reducing tuning cycles from about an hour to under five minutes. Implemented A/B prompt evaluation with schema and quality checks, cutting manual review time by roughly 80-90%.",
    image: "/image.jpg",
    links: [{ name: "Wells Fargo", url: "https://www.wellsfargo.com/" }],
  },
  {
    title: "Data Science Intern @ Red Hat",
    window: "Red Hat",
    category: "work",
    date: "May 2025 - Dec 2025",
    description:
      "Developed a Streamlit and FastAPI automation app that cut reporting work by 90% and automated $50M+ in allocations. Deployed a PDF data-extraction tool for complex finance documents, saving stakeholders 20+ hours per week. Migrated Redshift pipelines to Snowflake and built dbt models to modernize legacy ETL into SQL workflows.",
    image: "/image.jpg",
    links: [{ name: "Red Hat", url: "https://www.redhat.com/" }],
  },
  {
    title: "Undergraduate Research Assistant @ AIMING Lab",
    window: "AIMING Lab",
    category: "research",
    date: "Aug 2025 - Dec 2025",
    description:
      "Built PyTorch evaluation pipelines for cross-lingual NLU tasks, including calibration metrics and model cascade benchmarks. Implemented confidence-based routing to selectively use larger models, reducing inference cost while preserving accuracy.",
    image: "/image.jpg",
    links: [{ name: "UNC Computer Science", url: "https://cs.unc.edu/" }],
  },
  {
    title: "Backend @ App Team Carolina",
    window: "App Team Carolina",
    category: "clubs",
    date: "Aug 2026 - Present",
    description:
      "Built backend services for Luminary, an app that helps users navigate UNC by reporting accessibility issues. Implemented REST APIs for report creation and feed retrieval with filtering, pagination, and indexing to keep performance stable at scale.",
    image: "/image.jpg",
    links: [{ name: "App Team Carolina", url: "https://appteamcarolina.com/" }],
  },
  {
    title: "Backend @ UNC CS+Social Good",
    window: "UNC CS + Social Good",
    category: "clubs",
    date: "Aug 2024 - May 2025",
    description:
      "Built backend features for a Tinder-style animal adoption app for a local sanctuary. Added data scraping, database ingestion, and paginated REST endpoints, reducing feed load time by about 30%.",
    image: "/image.jpg",
    links: [{ name: "UNC CS + Social Good", url: "https://cssgunc.org/" }],
  },
];

export const projectsData = [
  {
    title: "Portfolio Pulse",
    window: "PortfolioPulse",
    category: "swe",
    date: "2025",
    description:
      "Built an automated portfolio tracker with live prices, allocation analytics, and daily SMS summaries. Implemented Celery + Redis scheduling for ingestion and digest delivery with retries, backoff, and job tracking. Designed the Postgres schema for holdings, transactions, and time-series snapshots, then added caching and rate limiting to reduce API calls and improve p95 latency.",
    image: "/project-portfolio-pulse.png",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/justineyoo1/PersonalPortfolio",
      },
    ],
  },
  {
    title: "SyllabusSync",
    window: "SyllabusSync",
    category: "swe",
    date: "2025",
    description:
      "Built a multi-course syllabus Q&A app that returns cited answers from uploaded PDFs by class. Implemented async ingestion pipelines (extract, chunk, embed) with Celery workers and job tracking. Added pgvector retrieval with metadata filters to improve relevance for policy, date, and grading questions, then containerized the stack with Docker and structured logging.",
    image: "/project-syllabus-sync.png",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/justineyoo1/SyllabiSync",
      },
    ],
  },
  {
    title: "Premier League Match Predictor",
    window: "PLPredictor",
    category: "ml/data",
    date: "2025",
    description:
      "Built a production-style ML workflow to predict Premier League match outcomes (home win, draw, away win). Structured the project into modular ingest, feature, model, and serving layers with FastAPI endpoints, configuration-driven training, and test coverage for repeatable experimentation.",
    image: "/project-pl-predictor.png",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/justineyoo1/Premier-League-Match-Predictor",
      },
    ],
  },
  {
    title: "ML Movie Recommender",
    window: "MovieRecommender",
    category: "ml/data",
    date: "2025",
    description:
      "Created a hybrid movie recommendation app combining collaborative filtering, SVD matrix factorization, and content-based ranking. Built a Flask backend and web UI with TMDB integration for posters, summaries, and clickable details, then packaged it with a one-command local startup flow.",
    image: "/project-ml-movie-recommender.png",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/justineyoo1/ML-Movie-Reccomender",
      },
    ],
  },
  {
    title: "AI Chess Engine",
    window: "AIChess",
    category: "swe",
    date: "2025",
    description:
      "Developed a Python + Pygame chess game with a minimax + alpha-beta AI opponent. Implemented core chess mechanics (check/checkmate, stalemate, castling, promotion) and improved move quality using piece-square tables and transposition table caching.",
    image: "/project-ai-chess-engine.png",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/justineyoo1/ai_chess_engine",
      },
    ],
  },
];

export const skillsCoursesCerts = {
  skills: [
    {
      group: "Languages",
      items: ["Python", "Java", "SQL", "JavaScript", "TypeScript"],
    },
    {
      group: "Data",
      items: ["PostgreSQL", "MySQL", "Jupyter", "Snowflake", "dbt"],
    },
    {
      group: "Frontend",
      items: ["HTML", "CSS", "Flask", "Tailwind CSS", "React.js"],
    },
    {
      group: "Testing & Devops",
      items: ["Docker", "Kubernetes", "Linux", "CI/CD"],
    },
    {
      group: "Backend & APIs",
      items: ["Spring Boot", "REST APIs", "Node.js"],
    },
    {
      group: "Libraries",
      items: ["Matplotlib", "Pandas", "Scikit-learn"],
    },
  ],
  courses: [
    "COMP 210 - Data Structures and Algorithms",
    "COMP 211 - Systems Fundamentals",
    "COMP 301 - Foundations of Programming",
    "COMP 311 - Computer Organization",
    "MATH 381 - Discrete Mathe",
    "COMP 455 - Models of Languages and Computation",
    "COMP 550 - Algorithms and Analysis",
    "COMP 560 - Artificial Intelligence",
    "MATH 231 - Calculus  I",
    "MATH 232 - Calculus II",
    "MATH 233 - Calculus III",
    "MATH 347 - Linear Algebra",
    "STOR 120 - Statistics and Data Science",
    "STOR 435 - Intro to Probability",
  ],
  certs: [
    {
      name: "PCEP: Certified Entry-Level Python Programmer",
      issuer: "Python Institute",
      date: "Feb 2023",
    },
    {
      name: "MTA: Introduction to Programming Using Python",
      issuer: "Microsoft",
      date: "Feb 2022",
    },
  ],
};

export const asciiList = [
  `
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠿⠋⠛⠻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠃⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡇⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠁⠀⠀⠀⠀⠀⠀⠀⣾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠔⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⡔⠉⠀⠀⠀⠀⣠⣴⣾⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⣄⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣤⣤⣤⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⠋⣠⣦⣟⣻⣦⣼⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢶⠒⠛⠉⠉⠀⠀⠀⠀⠀⣹⣿⣿⣿⣦⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⠀⡏⠿⣎⣿⠏⠹⠟⠿⠟⠁⠀⠀⠀⠀⠀⠀⠀⢀⣴⣶⣶⣤⠀⠈⠃⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣷⡀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⡆⠛⠷⠟⢻⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⣀⡠⠜⠛⠛⢯⣙⠿⣿⣷⣄⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠹⡄⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⡿⠃⠀⠀⡀⠀⣠⠴⠊⠁⠀⠀⠀⠀⠀⠈⠓⢽⣿⣿⣷
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⡀⠀⠘⢿⣿⣿⣿⣷⣆⠀⠀⠀⠀⠀⠀⠈⠻⢿⠿⠛⠡⣄⠀⢠⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⡀⠀⠀⠀⠀⠀⠸⣿⣤⣤⡀⠀⠀⠀⣤⣲⣖⠢⡀⠀⠀⠀⡜⠀⠀⠀⠀⠀⠀⠀⣀⣤⢄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣦⡀⠀⠀⠀⠀⠈⠉⠻⣿⣤⣤⣿⣶⠆⣩⠿⠅⠀⠀⡜⠁⠀⠀⠀⢀⡤⠖⠋⠀⣾⠈⣧⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⠀⠑⠦⢀⠀⠀⠀⠀⠙⠻⣋⣩⣭⣶⣞⠋⠀⢀⡞⠀⠀⠀⣠⠖⠉⠀⠀⠀⠀⢻⡀⢸⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⠀⠀⠀⠀⠀⠀⠀⠐⢲⡤⠀⠈⠉⠉⠁⣀⡠⠴⠋⠀⠀⡠⠎⠁⠀⢀⡠⠄⠀⠀⠸⡀⢸⠄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢙⡏⠉⠉⠉⠁⠀⠀⠀⣠⠞⠁⢀⣤⠞⣉⠄⠀⢀⡠⢔⡳⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⡎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⣄⠀⠀⠀⠀⠀⢰⠁⠀⠀⠛⠐⠋⣀⠤⣒⡭⠒⠋⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡼⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢦⠀⠀⠀⠀⠈⢦⡀⠀⢠⠴⠟⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢰⠁⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⣾⣇⠀⠀⠀⠀⠈⢷⠀⠀⢀⡴⠋⠀⠀⠈⢇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡏⠀⠀⠀⠀⠀⠀⢸⡗⠀⠀⠀⠸⣿⠀⠀⠀⠀⠀⠀⢧⠀⢏⠀⠈⢳⡶⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣸⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡄⠀⣳⠄⠀⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢧⡞⢁⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠻⣗⣒⠒⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠓⠤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣠⠤⠖⠛⣛⡻⢶⣄⠀⠀⠀⠀⣀⣀⡀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⢠⣤⣤⣄⣀⣀⣈⣱⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠉⠉⠉⠉⠉⠗⠚⠹⣤⡖⠊⠉⠻⠿⠋⠑⢦⣄⣴⠿⣽⣿⠒⠲⣤⣤⣀⣈⡷⠤⠤⠵⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,
];

export const videos = [
  // Add your own videos here
];

// Command Responses - Used in the terminal
export const commandResponses = {
  about:
    "hey, i'm justin yoo. i'm a computer science + statistics student at unc chapel hill (dec 2027).\n\ni like building backend-heavy products and automation systems that save real time for users. recently i worked on llm triage and internal data tooling at wells fargo and red hat.\n\ni care a lot about practical engineering: clear APIs, reliable pipelines, and measurable impact.",

  skills:
    "here are my core skills:\n\n• languages: python, java, sql, javascript, typescript\n• frontend: react, html, css, tailwind css, flask\n• backend: fastapi, spring boot, node.js, rest apis\n• data: postgresql, mysql, snowflake, dbt, jupyter\n• ml/data libs: pandas, matplotlib, scikit-learn\n• devops/tools: docker, kubernetes, linux, ci/cd",

  goals:
    "my goals are to keep growing as a backend/software engineer and ship systems that create measurable business impact.\n\ni'm especially focused on scalable services, data infrastructure, and reliable ai-assisted workflows.\n\ni also want to keep balancing product thinking with strong engineering fundamentals.",

  funfact:
    "fun fact: a lot of my favorite projects started from a workflow that annoyed me enough to automate it. i love finding high-friction tasks and turning them into clean tools that save hours each week.",

  contact:
    "you can reach me here:\n\n• email: jeyoo@unc.edu\n• linkedin: https://www.linkedin.com/in/justineyoo\n• github: https://github.com/justineyoo1",

  commands:
    "available commands:\n- about\n- experience\n- projects\n- skills\n- goals\n- funfact\n- contact",
};
