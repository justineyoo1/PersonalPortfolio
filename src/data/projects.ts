import type { ProjectItem } from "@/types";

export const projectsData: ProjectItem[] = [
  {
    title: "Portfolio Pulse",
    compactTitle: "Portfolio Pulse",
    window: "PortfolioPulse",
    category: "swe",
    date: "2025",
    description:
      "Built an automated portfolio tracker with live prices, allocation analytics, and daily SMS summaries. Implemented Celery + Redis scheduling for ingestion and digest delivery with retries, backoff, and job tracking. Designed the Postgres schema for holdings, transactions, and time-series snapshots, then added caching and rate limiting to reduce API calls and improve p95 latency.",
    image: "/Projects/portfolio-pulse.png",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/justineyoo1/PersonalPortfolio",
      },
    ],
  },
  {
    title: "SyllabusSync",
    compactTitle: "SyllabusSync",
    window: "SyllabusSync",
    category: "swe",
    date: "2025",
    description:
      "Built a multi-course syllabus Q&A app that returns cited answers from uploaded PDFs by class. Implemented async ingestion pipelines (extract, chunk, embed) with Celery workers and job tracking. Added pgvector retrieval with metadata filters to improve relevance for policy, date, and grading questions, then containerized the stack with Docker and structured logging.",
    image: "/Projects/syllabus-sync.png",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/justineyoo1/SyllabiSync",
      },
    ],
  },
  {
    title: "Premier League Match Predictor",
    compactTitle: "PL Match Predictor",
    window: "PLPredictor",
    category: "ml/data",
    date: "2025",
    description:
      "Built a production-style ML workflow to predict Premier League match outcomes (home win, draw, away win). Structured the project into modular ingest, feature, model, and serving layers with FastAPI endpoints, configuration-driven training, and test coverage for repeatable experimentation.",
    image: "/Projects/pl-match-predictor.png",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/justineyoo1/Premier-League-Match-Predictor",
      },
    ],
  },
  {
    title: "ML Movie Recommender",
    compactTitle: "ML Movie Recommender",
    window: "MovieRecommender",
    category: "ml/data",
    date: "2025",
    description:
      "Created a hybrid movie recommendation app combining collaborative filtering, SVD matrix factorization, and content-based ranking. Built a Flask backend and web UI with TMDB integration for posters, summaries, and clickable details, then packaged it with a one-command local startup flow.",
    image: "/Projects/ml-movie-recommender.png",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/justineyoo1/ML-Movie-Reccomender",
      },
    ],
  },
  {
    title: "AI Chess Engine",
    compactTitle: "AI Chess Engine",
    window: "AIChess",
    category: "swe",
    date: "2025",
    description:
      "Developed a Python + Pygame chess game with a minimax + alpha-beta AI opponent. Implemented core chess mechanics (check/checkmate, stalemate, castling, promotion) and improved move quality using piece-square tables and transposition table caching.",
    image: "/Projects/ai-chess-engine.png",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/justineyoo1/ai_chess_engine",
      },
    ],
  },
];
