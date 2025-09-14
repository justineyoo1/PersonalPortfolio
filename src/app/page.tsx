"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  User,
  DivideSquare,
  Braces,
} from "lucide-react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFilePdf, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
// Framer Motion for animations below
import { hover, motion, useInView, AnimatePresence } from 'framer-motion';
import { faBasketball, faCamera, faGuitar, faLeaf, faCode, faTableTennisPaddleBall, faMountainSun } from '@fortawesome/free-solid-svg-icons';
import { FaPython, FaJsSquare, FaJava, FaReact, FaNodeJs, FaGitAlt, FaDocker, FaAws, FaFigma, FaSwift, FaHtml5, FaCss3, FaAngular } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiDjango, SiCplusplus, SiR, SiC, SiXcode, SiKubernetes, SiVim, SiPostgresql, SiMysql, SiPandas, SiNumpy, SiScikitlearn, SiPytorch, SiSpringboot, SiJunit5 } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import workTimelineStyles from './WorkTimeline.module.css';

// BASE PATH to run application on production
// const basePath = "/personal-website2026";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Home Screen animated icons ===================

function getRandomPositionAndColor(safeZone: { top: number; left: number; bottom: number; right: number }, iconSize = 48) {
  const colors = [
    '#b1dd53', // green
    '#7ec4cf', // blue
    '#f59e42', // orange
    '#a259ff', // purple
    '#34d399', // teal
    '#f43f5e', // red
    '#593bc6', // indigo
    '#FFD700', // yellow
  ];
  let top, left, attempts = 0;
  do {
    top = Math.random() * 80 + 5; // 5% to 85%
    left = Math.random() * 80 + 5; // 5% to 85%
    attempts++;
  } while (
    top > safeZone.top && top < safeZone.bottom &&
    left > safeZone.left && left < safeZone.right &&
    attempts < 20
  );
  const color = colors[Math.floor(Math.random() * colors.length)];
  return { top: `${top}%`, left: `${left}%`, color };
}

// function RotatingWords({ words, color = 'white' }: { words: string[]; color?: string }) {
//   const [index, setIndex] = useState(0);
//   const [prevIndex, setPrevIndex] = useState(0);
//   const [animating, setAnimating] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setAnimating(true);
//       setTimeout(() => {
//         setPrevIndex(index);
//         setIndex((prev) => (prev + 1) % words.length);
//         setAnimating(false);
//       }, 150); // animation duration
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [index, words.length]);

//   return (
//     // <span className="relative inline-block w-[7.5ch] h-[1.2em] align-middle">
//     <span className="relative inline-block w-[7.5ch] h-[1.2em] align-middle overflow-visible" style={{ lineHeight: '1.2em' }}>
//       <span
//         className={`absolute left-0 top-0 w-full transition-all duration-400 ease-in-out ${animating ? '-translate-y-5 opacity-0' : 'translate-y-0 opacity-100'} font-bold`}
//         key={prevIndex}
//         style={{ willChange: 'transform, opacity', color }}
//       >
//         {words[prevIndex]}
//       </span>
//       <span
//         className={`absolute left-0 top-0 w-full transition-all duration-25 ease-in-out ${animating ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'} font-bold`}
//         key={index}
//         style={{ willChange: 'transform, opacity', color }}
//       >
//         {words[index]}
//       </span>
//     </span>
//   );
// }

function TypewriterWords({ words, color = "#98d6ff", typingSpeed = 100, pause = 1200 }: { words: string[]; color?: string; typingSpeed?: number; pause?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentWord = words[wordIndex];

    if (!isDeleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, typingSpeed / 2);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, typingSpeed, pause]);

  return (
    <span style={{ color, fontWeight: "bold" }}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}


// ----FLOATING OBJECTS CODE PART----
// =================================================

function FloatingIcons() {
  // FontAwesome icons (fixed positions/colors)
  const floatingObjects = [
    { icon: faBasketball, color: '#F59E42', style: { top: '27%', left: '27%' } },
    { icon: faCamera, color: '#4B9CD3', style: { top: '30%', left: '70%' } },
    { icon: faGuitar, color: '#A259FF', style: { top: '56%', left: '28%' } },
    { icon: faLeaf, color: '#34D399', style: { top: '50%', left: '75%' } },
    { icon: faCode, color: '#F43F5E', style: { top: '75%', left: '40%' } },
    { icon: faTableTennisPaddleBall, color: '#FFD700', style: { top: '20%', left: '60%' } },
    { icon: faMountainSun, color: '#c8c8c8', style: { top: '22%', left: '40%' } },
  ];
  // Google font icons (fixed, strategic positions)
  const googleFloatingIcons = [
    { icon: 'sports_tennis', color: '#b1dd53', style: { bottom: '15%', left: '25%', transform: 'translateX(-50%)' } }, // above name
    { icon: 'golf_course', color: '#7ec4cf', style: { bottom: '20%', right: '28%' } }, // bottom right
    { icon: 'headphones', color: '#f9bbfd', style: { top: '12%', left: '50%' } }, // bottom left 
    { icon: 'music_note', color: '#a259ff', style: { bottom: '10%', left: '50%', transform: 'translateX(-50%)' } }, // bottom center
  ];

  // Floating hero photos (move slowly left to right, loop, underneath icons)
  const floatingPhotos = [
    // { src: "/hero-imgs/backgroundmountain.jpeg", size: 80, top: "26%", startX: '20vw', endX: '-10vw', duration: 40, delay: 0 },
    { src: `${basePath}/hero-imgs/ericgrad.JPG`, size: 60, top: "15%", startX: '55vw', endX: '-10vw', duration: 40, delay: 0 },
    { src: `${basePath}/hero-imgs/koi.JPG`, size: 60, top: "50%", startX: '70vw', endX: '100vw', duration: 40, delay: 0 },
    { src: `${basePath}/hero-imgs/ricowater.JPEG`, size: 70, top: "65%", startX: '30vw', endX: '-10vw', duration: 50, delay: 0 },
    { src: `${basePath}/hero-imgs/southerns.JPEG`, size: 65, top: "80%", startX: '40vw', endX: '100vw', duration: 40, delay: 0 },

    // Add more images as needed, but keep to 5-7 for performance
  ];

  return (
    <>
      {/* Floating hero photos (underneath all icons/objects) */}
      {/* <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {floatingPhotos.map((photo, i) => {
          

          const isLTR = parseFloat(photo.endX) > parseFloat(photo.startX);
          
          const offset = isLTR ? '-100vw' : '+100vw';
          const offsetX = (x: string) => `calc(${x} ${isLTR ? '-' : '+'} 100vw)`;
          return (
            <React.Fragment key={photo.src}> */}
              {/* Main image */}
              {/* <motion.img
                src={photo.src}
                alt="Floating Hero"
                style={{
                  position: 'absolute',
                  top: photo.top,
                  left: 0,
                  width: photo.size,
                  height: photo.size,
                  borderRadius: 8,
                  objectFit: 'cover',
                  pointerEvents: 'none',
                }}
                initial={{ x: photo.startX }}
                animate={{ x: photo.endX }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: photo.duration,
                    ease: 'linear',
                    delay: photo.delay || 0,
                  },
                }} */}
              {/* /> */}
              {/* Offset image for seamless wrap */}
              {/* <motion.img
                src={photo.src}
                alt="Floating Hero"
                style={{
                  position: 'absolute',
                  top: photo.top,
                  left: 0,
                  width: photo.size,
                  height: photo.size,
                  borderRadius: 8,
                  objectFit: 'cover',
                  pointerEvents: 'none',
                }}
                initial={{ x: offsetX(photo.startX) }}
                animate={{ x: offsetX(photo.endX) }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: photo.duration,
                    ease: 'linear',
                    delay: photo.delay || 0,
                  },
                }} */}
              {/* />
            </React.Fragment>
          );
        })}
      </div> */}
      {/* Icons and other floating objects above photos */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {/* FontAwesome icons in fixed positions */}
        {floatingObjects.map((obj, i) => (
          <motion.div
            key={i}
            style={{ ...obj.style, position: 'absolute' }}
            animate={{
              y: [0, -8, 0, 8, 0],
              x: [0, 4, 0, -4, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 4,
              repeat: Infinity,
              repeatType: 'loop',
              delay: Math.random() * 2,
            }}
          >
            <FontAwesomeIcon icon={obj.icon} size="2x" color={obj.color} style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }} />
          </motion.div>
        ))}
        
        {/* Google font icons in fixed, strategic positions */}
        {googleFloatingIcons.map((obj, i) => (
          <motion.div
            key={obj.icon}
            style={{ position: 'absolute', ...obj.style }}
            animate={{
              y: [0, -8, 0, 8, 0],
              x: [0, 4, 0, -4, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 4,
              repeat: Infinity,
              repeatType: 'loop',
              delay: Math.random() * 2,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 40, color: obj.color, display: 'inline-block', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.10))' }}>
              {obj.icon}
            </span>
          </motion.div>
        ))}
      </div>
    </>
  );
}

// =================================================
// ----TECH STACK LANGUAGES PART----

export default function Home() {
  const ref1 = useRef(null);
  const inView1 = useInView(ref1, { once: false, amount: 0.9 });
  const ref2 = useRef(null);
  const inView2 = useInView(ref2, { once: false, amount: 0.9 });
  const ref3 = useRef(null);
  const inView3 = useInView(ref3, { once: false, amount: 0.95 });
  const ref4 = useRef(null);
  const inView4 = useInView(ref4, { once: false, amount: 0.9 });
  const nameRef = useRef(null);
  const nameInView = useInView(nameRef, { once: false, amount: 0.5 });
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { amount: 0, once: false });

  // Variants for text animation (sliding in from left, standard out)
  const textVariants = {
    hidden: { x: -100, opacity: 0, transition: { duration: 0.5 } },
    visible: { x: 0, opacity: 1, transition: { duration: 1.5 } },
  };

  // Variants for the 3rd paragraph (faster hidden transition)
  const textVariantsP3 = {
    hidden: { x: -100, opacity: 0, transition: { duration: 0.4 } },
    visible: { x: 0, opacity: 1, transition: { duration: 1.5 } },
  };

  // Variants for image animation (sliding in from right, faster out)
  const imageVariants = {
    hidden: { x: 100, opacity: 0, transition: { duration: 0.6 } },
    visible: { x: 0, opacity: 1, transition: { duration: 1.2 } },
  };

  // Technical skills grouped per resume
  const techSkills = {
    languages: [
      { name: "Python", icon: <img src={`${basePath}/tech-stack-imgs/python.png`} alt="Python" style={{ width: '2rem', height: '2rem' }} /> },
      { name: "SQL", icon: <img src={`${basePath}/tech-stack-imgs/sql.png`} alt="SQL" style={{ width: '2rem', height: '2rem' }} /> },
      { name: "JavaScript", icon: <FaJsSquare color='#F7DF1E' /> },
      { name: "Java", icon: <img src={`${basePath}/tech-stack-imgs/java.png`} alt="Java" style={{ width: '2rem', height: '2rem' }} /> },
    ],
    dataTools: [
      { name: "Jupyter", icon: <img src={`${basePath}/tech-stack-imgs/jupyter.png`} alt="Jupyter" style={{ width: '2rem', height: '2rem' }} /> },
      { name: "Snowflake", icon: <img src={`${basePath}/tech-stack-imgs/snowflake.png`} alt="Snowflake" style={{ width: '2rem', height: '2rem' }} /> },
      { name: "dbt", icon: <img src={`${basePath}/tech-stack-imgs/dbt.png`} alt="dbt" style={{ width: '2rem', height: '2rem' }} /> },
    ],
    webDev: [
      { name: "HTML", icon: <FaHtml5 color='#E34F26' /> },
      { name: "CSS", icon: <FaCss3 color='#1572B6' /> },
      { name: "Flask", icon: <img src={`${basePath}/tech-stack-imgs/flask.png`} alt="Flask" style={{ width: '2rem', height: '2rem' }} /> },
      { name: "Streamlit", icon: <img src={`${basePath}/tech-stack-imgs/streamlit.png`} alt="Streamlit" style={{ width: '2rem', height: '2rem' }} /> },
    ],
    libraries: [
      { name: "Matplotlib", icon: <img src={`${basePath}/tech-stack-imgs/Matplotlib.png`} alt="Matplotlib" style={{ width: '2rem', height: '2rem' }} /> },
      { name: "Pandas", icon: <SiPandas color='#130654' /> },
    ],
    aiMl: [
      { name: "PyTorch", icon: <SiPytorch color='#EE4C2C' /> },
      { name: "TensorFlow", icon: <img src={`${basePath}/tech-stack-imgs/tensorflow.png`} alt="TensorFlow" style={{ width: '2rem', height: '2rem' }} /> },
      { name: "Scikit-learn", icon: <SiScikitlearn color='#F7931E' /> },
    ],
    systems: [
      { name: "Git", icon: <FaGitAlt color='#F05032' /> },
      { name: "Docker", icon: <FaDocker color='#2496ED' /> },
      { name: "Kubernetes", icon: <SiKubernetes color="#3970e4"/> },
      { name: "Linux", icon: <img src={`${basePath}/tech-stack-imgs/linux.png`} alt="Linux" style={{ width: '2rem', height: '2rem' }} /> },
    ],
  };

  // =================================================
  // ==================INTERESTS==================


  const interests = [
    { name: "Photography", icon: `${basePath}/hobbies/cam-logo2.png`, link: "https://www.instagram.com/danielwangphotography/", type: "image", size: "w-12 h-12" },
    { name: "Guitar", icon: `${basePath}/hobbies/guitar.png`, type: "image", size: "w-10 h-10" },
    { name: "Tennis", icon: `${basePath}/hobbies/utrlogo.png`, link: "https://app.utrsports.net/profiles/838346", type: "image", size: "w-10 h-10" },
    { name: "Running", icon: `${basePath}/hobbies/strava.png`, link: "https://www.strava.com/activities/14222755631/overview", type: "image", size: "w-8 h-8" },
    { name: "Travel Vlogging", icon: `${basePath}/hobbies/yt-logo.webp`, link: "https://www.youtube.com/", type: "image", size: "w-8 h-8" },
  ];

  // =========EXPERIENCES=======================================

  const experiences = [
    {
      type: "work",
      institution: "Red Hat",
      role: "Data Science Intern (Part-time)",
      period: "Aug 2025 – Present",
      description: "Extended part time through the fall.",
      details: [
        "Migrated Redshift data pipelines to Snowflake and implemented scalable dbt models, refactoring legacy Python ETL into maintainable SQL workflows.",
      ],
      logo: `${basePath}/img/RedHatLogo.jpg`,
    },
    {
      type: "work",
      institution: "UNC Department of Computer Science",
      role: "Machine Learning Research Assistant",
      period: "May 2025 – Present",
      description: "AIMING Lab | Dr. Huaxiu Yao.",
      details: [
        "Foundation models (LLMs, VLMs) & Generative AI applications.",
      ],
      logo: `${basePath}/img/UNCCSD.png`,
    },
    {
      type: "work",
      institution: "Red Hat",
      role: "Data Science Intern",
      period: "May 2025 – Aug 2025",
      description: "Summer 2025 | IPA Data Science and AI Team.",
      details: [
        "Developed a full-stack financial automation web app with Python, Streamlit, and Google Drive APIs, reducing reporting time by 90% and automating $50M+ in engineering expense allocations across 8+ product lines.",
        "Built and deployed internal PDF processing tool to automate structured data extraction from complex PDFs for the Hybrid Commitment Spend team, saving stakeholders 20+ hours weekly.",
      ],
      logo: `${basePath}/img/RedHatLogo.jpg`,
    },
    {
      type: "work",
      institution: "UNC CS + Social Good",
      role: "Full Stack Developer",
      period: "Aug 2024 – Present",
      description: "Developing backend systems and APIs to support social impact projects.",
      details: [
        "Collaborated with a team of 6 developers to design and build a full-stack web application serving 30+ users.",
        "Developed backend scraping pipelines and RESTful APIs, automating data updates and reducing load time by 30%.",
      ],
      logo: `${basePath}/img/Clubs/unccssg.png`,
    },
    {
      type: "work",
      institution: "University of North Carolina at Chapel Hill",
      role: "B.S. Computer Science | B.S. Statistics",
      period: "Aug 2023 – Present",
      description: "",
      logo: `${basePath}/img/unc.png`,
    },
  ];
  
  // Split experiences
  const educationExperiences = [] as typeof experiences;
  const workExperiences = experiences.filter(exp => exp.type === "work");
  // Order: show UNC education entry last in the timeline
  const workExperiencesOrdered = [
    ...workExperiences.filter(
      (exp) => exp.institution !== "University of North Carolina at Chapel Hill"
    ),
    ...workExperiences.filter(
      (exp) => exp.institution === "University of North Carolina at Chapel Hill"
    ),
  ];

  // Brand colors for timeline (dot + border gradient)
  function getExperienceBrandColors(institution: string) {
    const name = institution.toLowerCase();
    // Red Hat
    if (name.includes('red hat')) {
      return {
        dot: '#f87171', // red-400 (softer)
        ring: '#ef4444', // red-500
        halo: 'rgba(239,68,68,0.20)',
        borderFrom: '#fee2e2', // red-100
        borderTo: '#fca5a5', // red-300
      } as const;
    }
    // UNC CS + Social Good → teal
    if (name.includes('social good')) {
      return {
        dot: '#5eead4', // teal-300
        ring: '#14b8a6', // teal-500
        halo: 'rgba(20,184,166,0.20)',
        borderFrom: '#ccfbf1', // teal-100
        borderTo: '#5eead4', // teal-300
      } as const;
    }
    // UNC (university departments) → light blue
    if (name.includes('unc') || name.includes('carolina') || name.includes('university of north carolina')) {
      return {
        dot: '#93c5fd', // blue-300
        ring: '#60a5fa', // blue-400
        halo: 'rgba(96,165,250,0.20)',
        borderFrom: '#dbeafe', // blue-100
        borderTo: '#93c5fd', // blue-300
      } as const;
    }
    // Default neutral blue-gray
    return {
      dot: '#cbd5e1', // slate-300
      ring: '#94a3b8', // slate-400
      halo: 'rgba(148,163,184,0.20)',
      borderFrom: '#f1f5f9', // slate-100
      borderTo: '#cbd5e1', // slate-300
    } as const;
  }

  // =========================================
  // ==================CLUBS==================

  const clubs = [
    {
      name: "UNC CS + Social Good",
      role: "Full Stack Developer",
      description: "Applying and learning advanced skills for Development and Production",
      image: `${basePath}/img/Clubs/unccssg.png`,
      link: "https://cssgunc.org/",
    },
    {
      name: "AI@UNC",
      role: "Member",
      description: "Gaining hands-on practice working with AI libraries and frameworks & understanding the of uses of AI",
      image: `${basePath}/img/Clubs/AIUNC.png`,
      link: "https://heellife.unc.edu/organization/aiunc",
    },
    {
      name: "Korean American Students Association",
      role: "Member",
      description: "Engaging with fellow students to help promote Korean culture and traditions",
      image: `${basePath}/img/Clubs/UNCKASA.png`,
      link: "https://heellife.unc.edu/organization/unckasa",
    },
    {
      name: "Chess at Carolina",
      role: "Member",
      description: "Casual and competitive chess community at UNC",
      image: `${basePath}/img/Clubs/Chesslogo.jpeg`,
      link: "https://heellife.unc.edu/organization/carolinacompetitivechess", 
    },
    {
      name: "Carolina AR/VR",
      role: "Member",
      description: "Exploring augmented and virtual reality design and development",
      image: `${basePath}/img/Clubs/CarolinaARVR.jpeg`,
      link: "http://uncarvr.org/",
    },
  ];

  const projects = [
    // Row 1: Syllabus Sync, ML Movie, PL Match Predictor
    {
      id: "syllabussync",
      title: "SyllabusSync",
      description:
        "Full-stack RAG system for syllabus upload and Q&A with parsing, embedding, retrieval; versioning/diversification/scoped prompting improved precision and reduced hallucinations.",
      githubUrl: "https://github.com/justineyoo1/SyllabiSync",
      imageUrl: `${basePath}/img/Projects/SyllabusSyncChat.png`,
      technologies: ["FastAPI", "Docker", "Celery", "Python", "Postgres (pgvector)", "OpenAI"],
    },
    {
      id: "movies",
      title: "ML Movie Recommender System",
      description:
        "SVD + user/item CF with Optuna HPO; Flask API + TMDB integration serving real-time recommendations and confidence scores.",
      githubUrl: "https://github.com/justineyoo1/ML-Movie-Reccomender",
      imageUrl: `${basePath}/img/Projects/reccomendation.png`,
      technologies: ["Scikit-learn", "Flask", "Python", "Optuna"],
    },
    {
      id: "epl",
      title: "Premier League Match Predictor",
      description:
        "End‑to‑end system with RandomForest and leakage‑safe rolling stats + Elo; FastAPI + Streamlit app, achieved 0.428 log‑loss on 3 seasons.",
      githubUrl: "https://github.com/justineyoo1/Premier-League-Match-Predictor",
      imageUrl: `${basePath}/img/Projects/PLMatchPredictorDash.png`,
      technologies: ["RandomForest", "FastAPI", "Streamlit", "Python", "Pandas"],
    },
    // Row 2: Personal Portfolio, AI Chess, Akari
    {
      id: "pp",
      title: "Personal Portfolio",
      description: "This portfolio site showcasing projects, experience, and design system.",
      githubUrl: "https://github.com/justineyoo1/PersonalPortfolio",
      imageUrl: `${basePath}/img/Projects/Personalportfolio.png`,
      technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    },
    {
      id: "ai-chess",
      title: "AI Chess",
      description:
        "Python chess with GUI and AI opponent via minimax + alpha-beta pruning (est. 500–600 ELO). Implements rules incl. auto-queen promo and castling.",
      githubUrl: "https://github.com/justineyoo1/ai_chess_engine",
      imageUrl: `${basePath}/img/Projects/AIChess.png`,
      technologies: ["Python", "Pygame", "Minimax", "Alpha-Beta"],
    },
    {
      id: "akari",
      title: "Akari",
      description: "GUI implementation of the Akari logic puzzle with full rules and clean UI.",
      githubUrl: "https://github.com/justineyoo1/Akari",
      imageUrl: `${basePath}/img/Projects/Akari.png`,
      technologies: ["Java", "HTML", "CSS"],
    },
  ];
  // ------------------------------------------------------------------------------

  const isMobile = useIsMobile();

  const fadeInVariants = {
    hidden: { opacity: 0, transition: { duration: 0.3 } },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="hero"
        className="relative flex items-center justify-center min-h-[100vh] w-full overflow-hidden"
      >
        {/* Particles are global via layout; floating icons removed */}

        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full">
          <motion.h1
            ref={nameRef}
            initial={{ opacity: 0, y: -20 }}
            animate={nameInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="ripple-text text-5xl md:text-7xl font-extrabold mb-5 leading-snug pb-2 text-center uppercase bg-clip-text text-transparent"
            style={{
              backgroundImage: `url(${basePath}/img/Gif/gradient2.gif)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
            }}

            // {Old color and animation Styles for my name Daniel Wang}
            // className="text-5xl md:text-7xl font-extrabold mb-5 leading-snug pb-2 text-center bg-gradient-to-r from-[#7dd3fc] via-blue to-[#fdba74] bg-clip-text text-transparent"
            // className="gif-text text-5xl md:text-7xl font-extrabold mb-5 leading-snug pb-2 text-center"
          >
            JUSTIN YOO
          </motion.h1>

        
          <div className="flex items-center justify-center text-2xl md:text-3xl font-light mb-6">
            <span className="font-mono">
              <TypewriterWords words={["print(\"Hello World!\")"]} color="#22c55e" />
            </span>
          </div>
          
          <div className="flex gap-6 justify-center mt-4">
            <a href="https://github.com/justineyoo1" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} className="h-7 w-7 text-black hover:text-gray-700 transition-colors duration-450" />
            </a>
            <a href="https://www.linkedin.com/in/justineyoo/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} className="h-7 w-7 text-black hover:text-gray-700 transition-colors duration-450" />
            </a>
            <a href="mailto:justineyoo2005@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} className="h-7 w-7 text-black hover:text-gray-700 transition-colors duration-450" />
            </a>
          </div>
          {/* Single About Me CTA under secondary buttons */}
          <div className="mt-4 flex justify-center">
            <motion.a
              href={`${basePath}/about`}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-black transition-colors shadow-sm border border-black/10"
              aria-label="About Me"
            >
              <User className="h-5 w-5" />
              <span className="text-base md:text-lg font-medium">About Me</span>
            </motion.a>
          </div>
          <div className="mt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`${basePath}/Justin_Y_Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800 text-white hover:bg-black transition-colors"
            >
              View Resume
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/justineyoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#13294B] border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Connect on LinkedIn
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
        {/* Overlay for darkening background for readability */}
        {/* <div className="absolute inset-0 bg-sky-100 bg-opacity-50 -z-10" /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/0 dark:from-black/30 dark:to-transparent -z-10" />
        {/* Scroll hint */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <img
            src={`${basePath}/img/Gif/Scroll%20down.gif`}
            alt="Scroll down"
            className="h-14 w-auto cursor-pointer select-none"
            onClick={() => {
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </section>

      {/* ABOUT PREVIEW SECTION (Home) ========================================= */}
      <section id="about" className="py-16 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-4">
            <div className="flex flex-col items-center mt-1">
              <h3 className="text-3xl font-bold text-[#13294B] text-center">About Me</h3>
              <div className="flex justify-center items-center w-3/4 max-w-[120px] mx-auto mt-2">
                <div className="h-0.5 bg-gray-300 flex-grow"></div>
                <div className="h-1 bg-[#98d6ff] w-1/3"></div>
                <div className="h-0.5 bg-gray-300 flex-grow"></div>
              </div>
            </div>
            <p className="text-sm tracking-widest text-gray-500 uppercase mt-2">Introduction</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2">About Me<span className="inline-block">.</span></h2>
          </div>
          <div className="mt-1 grid grid-cols-1 md:grid-cols-7 gap-8 items-start">
            <div className="text-gray-700 text-base md:text-lg leading-relaxed md:col-span-3">
              <p>
                I’m a Computer Science and Statistics student at the University of North Carolina at Chapel Hill who loves turning ideas into useful tools.
                My expertise ranges from software development to data science with proficiency in machine learning.
              </p>
              <div className="mt-6">
                <a
                  href={`${basePath}/about`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-black transition-colors shadow-sm border border-black/10"
                  aria-label="My Story."
                >
                  My Story &gt;&gt;
                </a>
              </div>
            </div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8 }}
              className="w-full md:col-span-4"
            >
              <div className="rounded-xl shadow-lg border border-gray-200 overflow-hidden bg-[#0f172a] text-white">
                {/* Window header */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#0b1220] border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" aria-hidden></span>
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" aria-hidden></span>
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" aria-hidden></span>
                  </div>
                  <div className="text-xs text-gray-400">about.md</div>
                </div>
                <div className="flex">
                  {/* Sidebar */}
                  <div className="w-56 bg-[#0b1220] border-r border-white/5 py-3">
                    <div className="px-3 text-gray-400 uppercase text-[0.65rem] tracking-widest mb-2">EXPLORER</div>
                    <div className="px-3 text-[0.7rem] text-gray-500 mb-2">PORTFOLIO</div>
                    <div className="px-3 flex items-center gap-1 text-sm text-gray-200 mb-1 select-none">
                      <span className="text-gray-400">▾</span>
                      <span>portfolio</span>
                    </div>
                    <ul className="mt-1 text-xs">
                      <li className="flex items-center gap-2 px-3 py-1 bg-white/5 text-blue-300">
                        <span className="inline-block w-1.5 h-1.5 rounded-[2px] bg-blue-400" aria-hidden></span>
                        about.md
                      </li>
                      <li className="flex items-center gap-2 px-3 py-1 text-gray-300 hover:bg-white/5">
                        <span className="inline-block w-1.5 h-1.5 rounded-[2px] bg-emerald-400" aria-hidden></span>
                        experience.js
                      </li>
                      <li className="flex items-center gap-2 px-3 py-1 text-gray-300 hover:bg-white/5">
                        <span className="inline-block w-1.5 h-1.5 rounded-[2px] bg-pink-400" aria-hidden></span>
                        projects.js
                      </li>
                    </ul>
                  </div>
                  {/* Editor */}
                  <div className="flex-1 p-4">
                    <div className="text-xs text-gray-400 mb-2">about.md</div>
                    <div className="flex items-start gap-4">
                      <div className="select-none text-[0.7rem] text-gray-500 leading-7 pr-2 text-right">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div>
                        <div>7</div>
                        <div>8</div>
                        <div>9</div>
                        <div>10</div>
                        <div>11</div>
                        <div>12</div>
                        <div>13</div>
                        <div>14</div>
                        <div>15</div>
                        <div>16</div>
                        <div>17</div>
                        <div>18</div>
                        <div>19</div>
                        <div>20</div>
                        <div>21</div>
                        <div>22</div>
                      </div>
                      <pre className="m-0 p-0 font-mono text-sm leading-7 whitespace-pre overflow-x-auto">
<code>
<span className="text-sky-400">class</span> <span className="text-emerald-300">AboutMe</span>:
{"\n"}    <span className="text-sky-400">def</span> <span className="text-amber-300">__init__</span>(self):
{"\n"}        self.name = <span className="text-rose-300">"Justin Yoo"</span>
{"\n"}        self.education = <span className="text-rose-300">"CS and Stats @ UNC"</span>
{"\n"}        self.skills = [
{"\n"}            <span className="text-rose-300">"Python"</span>, <span className="text-rose-300">"SQL"</span>, <span className="text-rose-300">"pandas"</span> <span className="text-rose-300">"Git"</span>
{"\n"}        ]
{"\n"}        self.projects = [
{"\n"}            <span className="text-rose-300">"Syllabus Sync"</span>,
{"\n"}            <span className="text-rose-300">"Premier League Match Predictor"</span>,
{"\n"}            <span className="text-rose-300">"Movie Recommender System"</span>
{"\n"}        ]
{"\n"}
{"\n"}    <span className="text-sky-400">def</span> <span className="text-amber-300">current_focus</span>(self):
{"\n"}        <span className="text-sky-400">return</span> <span className="text-rose-300">"Software Engineering | Data Science"</span>
{"\n"}
{"\n"}    <span className="text-sky-400">def</span> <span className="text-amber-300">goal</span>(self):
{"\n"}        <span className="text-sky-400">return</span> <span className="text-rose-300">"Contribute to impactful projects"</span>
</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


{/* EXPERIENCE SECTION (moved up) ================================== */}
      {/* ================================================================== */}

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 md:px-8 bg-white/60 dark:bg-black/30 backdrop-blur-[1px]">
         <div className="container mx-auto max-w-6xl">
           <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-[#13294B] text-center">Experience</h2>
             <div className="flex justify-center items-center w-3/4 max-w-[120px] mx-auto mt-2">
               <div className="h-0.5 bg-gray-300 flex-grow"></div>
               <div className="h-1 bg-[#98d6ff] w-1/3"></div>
               <div className="h-0.5 bg-gray-300 flex-grow"></div>
             </div>
           </div>
          {/* Education Timeline - removed, consolidated into main timeline */}
          {/* Work Timeline */}
          <div>
            <div className={workTimelineStyles['vertical-timeline']}>
              {workExperiencesOrdered.slice().reverse().map((exp, idx) => {
                const brand = getExperienceBrandColors(exp.institution);
                return (
                <motion.div
                  key={idx}
                  className={workTimelineStyles['timeline-item']}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <div className={workTimelineStyles['timeline-dot']} style={{
                      background: brand.dot,
                      borderColor: brand.ring,
                      boxShadow: `0 0 0 2px ${brand.halo}`,
                    }}></div>
                    <div className={workTimelineStyles['timeline-date']} style={{ marginLeft: 48 }}>
                      {exp.period}
                    </div>
                  </div>
                  <div className={workTimelineStyles['timeline-content']} style={{
                    borderImage: `linear-gradient(90deg, ${brand.borderFrom}, ${brand.borderTo}) 1`,
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}>
                    <div className={workTimelineStyles['timeline-institution-row']}>
                      {idx % 2 === 0 && exp.logo && (
                        <img src={exp.logo} alt={exp.institution + ' logo'} className={workTimelineStyles['timeline-logo']} />
                      )}
                      <h4 className={
                        workTimelineStyles['timeline-institution'] +
                        ' font-bold text-lg mb-1' +
                        (idx % 2 === 0 ? ' ' + workTimelineStyles['timeline-institution-odd'] : '')
                      } style={idx % 2 === 0 ? { flex: 1 } : {}}>{exp.institution}</h4>
                      {idx % 2 === 1 && exp.logo && (
                        <img src={exp.logo} alt={exp.institution + ' logo'} className={workTimelineStyles['timeline-logo']} />
                      )}
                         </div>
                    <div className={workTimelineStyles['timeline-role'] + " text-sm mb-1"}>{exp.role}</div>
                    <div className={workTimelineStyles['timeline-description'] + " text-sm"}>{exp.description}</div>
                    {Array.isArray((exp as any).details) && (exp as any).details.length > 0 && (
                      <details className={workTimelineStyles['timeline-details']}>
                        <summary>More details</summary>
                        <ul>
                          {(exp as any).details.map((d: string, i: number) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
               </motion.div>
              );})}
             </div>
           </div>
         </div>
       </section>

{/* ABOUT MOVED TO /about ========================================= */}

      {/* INTERESTS & CLUBS SECTION================================================ */}
      {/* ============================================================================= */}

      {/* Interests & Clubs Section */}
      <section id="interests" className="py-8 px-4 md:px-8 bg-gray-50">
        <div className="w-full max-w-screen-xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-[#13294B] text-center">Clubs</h2>
            <div className="flex justify-center items-center w-3/4 max-w-[80px] mx-auto mt-2">
              <div className="h-0.5 bg-gray-300 flex-grow"></div>
              <div className="h-1 bg-[#98d6ff] w-1/3"></div>
              <div className="h-0.5 bg-gray-300 flex-grow"></div>
            </div>
          </div>
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4">
              {clubs.map((club, idx) => {
                const roleColor = "text-[#a855f7]";
                const pastelColors = [
                  '#92A8D1', // pastel blue
                  '#B5A8D1', // muted purple
                  '#B5EAD7', // pastel green
                  '#FFDAC1', // pastel peach
                  '#E2F0CB', // pastel light green
                  '#F7CAC9', // pastel pink
                  '#FFB7B2', // soft coral
                  '#C7CEEA', // lavender
                  '#FFFACD', // lemon chiffon
                ];
                const accent = pastelColors[idx % pastelColors.length];
                const cardContent = (
                  <Card
                    key={club.name}
                    className="relative w-full h-64 overflow-hidden hover:shadow-lg transition-shadow flex flex-col items-center justify-start px-6 py-4 rounded-1xl group bg-white"
                    style={{
                      borderWidth: 3,
                      borderStyle: 'solid',
                      borderImage: `linear-gradient(90deg, ${accent}, rgba(0,0,0,0)) 1`,
                    }}
                  >
                    {/* Hover overlay */}
                    {club.link && (
                      <div className="absolute inset-0 bg-blue-100 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 backdrop-blur-sm">
                        <span className="text-blue-400 font-bold text-lg">Learn more!</span>
                      </div>
                    )}
                    {/* Top half: club image */}
                    <div className="w-full h-20 flex items-center justify-center mb-0 z-0">
                      <img
                        src={club.image}
                        alt={club.name}
                        className={
                          club.name === "UNC Club Tennis"
                            ? "w-16 h-16 object-cover rounded-full"
                            : "w-16 h-16 object-contain rounded-full"
                        }
                        style={{ maxWidth: '80%' }}
                      />
                    </div>
                    {/* Bottom half: text content */}
                    <div className="flex flex-col items-center justify-center flex-1 w-full text-center z-0">
                      <h4 className="text-base font-bold mb-1">{club.name}</h4>
                      {club.role && (
                        <div className={`text-xs italic mb-1 ${roleColor}`}>
                          {club.role}
                        </div>
                      )}
                      <p className="text-xs text-gray-700">{club.description}</p>
                    </div>
                  </Card>
                );
                if (club.link) {
                  return (
                    <a
                      key={club.name}
                      href={club.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {cardContent}
                    </a>
                  );
                } else {
                  return cardContent;
                }
              })}
            </div>
          </div>
        </div>
      </section>

      
      

      {/* EXPERIENCE SECTION================================================ */}
      {/* ================================================================== */}

      {/* Experience Section */}

    
    {/* ============================================PROJECTS============================================ */}
      {/* ================================================================================================ */}

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 md:px-8 bg-white/60 dark:bg-black/30 backdrop-blur-[1px]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-[#13294B] text-center">Projects</h2>
            <div className="flex justify-center items-center w-3/4 max-w-[100px] mx-auto mt-2">
              <div className="h-0.5 bg-gray-300 flex-grow"></div>
              <div className="h-1 bg-[#98d6ff] w-1/3"></div>
              <div className="h-0.5 bg-gray-300 flex-grow"></div>
            </div>
          </div>
          {/* Horizontal Timeline of Projects (Most recent → Older) */}
          <div className="mb-4 flex items-center text-sm">
            <span className="font-semibold text-blue-600">← Most Recent</span>
            <div className="relative flex-1 mx-3 h-px bg-gray-300 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-blue-300 to-transparent"
                initial={{ x: '-33%' }}
                animate={{ x: '133%' }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <span className="text-gray-400">Older →</span>
          </div>
          <div className="relative overflow-x-auto pb-10">
            <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200" />
            <ul className="relative flex gap-8 min-w-max px-1">
            {(() => {
              const cardColors = [
                '#92A8D1', // pastel blue
                '#B5A8D1', // muted purple
                '#B5EAD7', // pastel green
                '#FFDAC1', // pastel peach
                '#E2F0CB', // pastel light green
                '#F7CAC9', // pastel pink
                '#FFB7B2', // soft coral
                '#B5EAD7', // mint
                '#C7CEEA', // lavender
                '#FFFACD', // lemon chiffon
              ];
              return projects.map((project, idx) => (
                  <li key={project.id} className="relative pt-6">
                    <div
                      className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-white shadow"
                      style={{ backgroundColor: cardColors[idx % cardColors.length] }}
                      aria-hidden
                    />
                    <div className="w-[360px] max-w-[90vw]">
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  githubUrl={project.githubUrl}
                  imageUrl={project.imageUrl}
                  technologies={project.technologies}
                  cardColor={cardColors[idx % cardColors.length]}
                        fixed
                />
                    </div>
                  </li>
              ));
            })()}
            </ul>
          </div>
        </div>
      </section>

      {/* TECH STACK SECTION================================================ */}

      {/* Technical Skills Section */}
      <section id="tech-stack" className="py-16 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-[#13294B] text-center">Technical Skills</h2>
            <div className="flex justify-center items-center w-3/4 max-w-[200px] mx-auto mt-2">
              <div className="h-0.5 bg-gray-300 flex-grow"></div>
              <div className="h-1 bg-[#98d6ff] w-1/3"></div>
              <div className="h-0.5 bg-gray-300 flex-grow"></div>
            </div>
          </div>
          {(() => {
            const skillCategories = [
              { title: 'Languages', icon: <Braces className="h-5 w-5 text-[#4B9CD3]" />, items: techSkills.languages },
              { title: 'Data Tools', icon: <DivideSquare className="h-5 w-5 text-[#4B9CD3]" />, items: techSkills.dataTools },
              { title: 'Web Dev', icon: <FaHtml5 size={20} color="#E34F26" />, items: techSkills.webDev },
              { title: 'AI/ML', icon: <SiPytorch size={20} color="#EE4C2C" />, items: techSkills.aiMl },
              { title: 'Libraries', icon: <SiPandas size={20} color="#130654" />, items: techSkills.libraries },
              { title: 'Systems', icon: <FaDocker size={20} color="#2496ED" />, items: techSkills.systems },
            ];
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories.map((cat, i) => {
                  const accents = ['#92A8D1','#B5A8D1','#B5EAD7','#FFDAC1','#E2F0CB','#F7CAC9'];
                  const accent = accents[i % accents.length];
                  return (
                  <Card key={cat.title} className="transition-transform hover:-translate-y-1 hover:shadow-lg bg-white backdrop-blur-sm"
                    style={{ borderWidth: 3, borderStyle: 'solid', borderImage: `linear-gradient(90deg, ${accent}, rgba(0,0,0,0)) 1` }}>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span>{cat.icon}</span>
                        <h3 className="text-lg font-semibold">{cat.title}</h3>
          </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((tech: any) => (
                          <div key={tech.name} className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 bg-white/70 dark:bg-black/40">
                            <span className="flex items-center justify-center" style={{ width: '1.5rem', height: '1.5rem' }}>
                              {"icon" in tech && React.isValidElement(tech.icon)
                                ? React.cloneElement(tech.icon as any, { style: { width: '1.5rem', height: '1.5rem' } })
                                : null}
                            </span>
                            <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
              );})}
            </div>
            );
          })()}
        </div>
      </section>

      {/* CTA to About/My Story page under Technical Skills */}
      <div className="py-10 flex justify-center bg-transparent">
        <a
          href={`${basePath}/about`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-black transition-colors shadow-sm border border-black/10"
          aria-label="Go to My Story"
        >
          My Story &gt;&gt;
        </a>
            </div>


      {/* Contact section removed */}


      {/* Footer */}
      <footer className="bg-blue-300 text-white py-14 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 items-start">
            <div className="col-span-1">
              <div className="mb-6">
                <p className="uppercase tracking-widest text-white/80 text-sm">Get in touch</p>
                <h2 className="text-5xl md:text-6xl font-extrabold mt-2">Contact<span className="inline-block">.</span></h2>
            </div>
              <ul className="space-y-4 text-lg md:text-xl">
                <li>
                  <a href="mailto:justineyoo2005@gmail.com" className="inline-flex items-center gap-3 hover:underline" aria-label="Email">
                    <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6" />
                    <span>Mail</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/justineyoo/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:underline" aria-label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/justineyoo1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:underline" aria-label="GitHub">
                    <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
                    <span>GitHub</span>
                  </a>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </footer>
    </div>
  );
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}
