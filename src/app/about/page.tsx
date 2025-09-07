"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";

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

export default function AboutPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const timeline = [
    {
      year: "2014",
      title: "Built My First PC",
      body:
        "Put together my first custom computer in 7th grade, which sparked a curiosity for how technology works under the hood.",
      side: "left",
      logo: undefined as string | undefined,
    },
    {
      year: "2019",
      title: "Python & Self-Learning",
      body:
        "Took “Introduction to Python Programming” in my junior year of high school, then accelerated with YouTube tutorials and small projects like tic-tac-toe and a full-stack URL shortener.",
      side: "right",
      logo: `${basePath}/tech-stack-imgs/python.png`,
    },
    {
      year: "2023",
      title: "Starting UNC (CS + Stats)",
      body:
        "Began at UNC Chapel Hill, dove into coursework and joined UNC CS + Social Good to build projects with impact.",
      side: "left",
      logo: `${basePath}/img/unc.png`,
    },
    {
      year: "2024",
      title: "Admitted to the CS Program",
      body:
        "Went deeper into full-stack and ML work, including a RAG assistant and an ML recommender system.",
      side: "right",
      logo: undefined as string | undefined,
    },
    {
      year: "2025",
      title: "Research & Red Hat Internship",
      body:
        "Began ML research on interpretability and started as a Data Science Intern at Red Hat, building data automation and scalable systems.",
      side: "left",
      logo: `${basePath}/img/RedHatLogo.jpg`,
    },
  ] as const;

  const photos = [
    { src: `${basePath}/personal-pictures/personalportfolio1.jpg`, caption: "Baby Me" },
    { src: `${basePath}/personal-pictures/personalportfolio4.jpg`, caption: "Beach" },
    { src: `${basePath}/personal-pictures/personalportfolio3.jpg`, caption: "I like Food" },
  ];

  return (
    <>
      <Navbar />
      <section className="relative py-16 px-4 md:px-8 bg-white/60 dark:bg-black/30 backdrop-blur-[1px] min-h-[80vh]">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold text-[#13294B] text-center">About Me</h1>
            <div className="flex justify-center items-center w-3/4 max-w-[120px] mx-auto mt-2">
              <div className="h-0.5 bg-gray-300 flex-grow"></div>
              <div className="h-1 bg-[#98d6ff] w-1/3"></div>
              <div className="h-0.5 bg-gray-300 flex-grow"></div>
            </div>
          </div>

          {/* Synopsis */}
          <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <p className="text-lg md:text-xl text-gray-800">
                I’m a Computer Science + Statistics student at UNC Chapel Hill who loves turning ideas into useful tools. I started in high school building small web apps, and now I’m focused on AI/ML, data systems, and backend engineering that make a real-world impact.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src={`${basePath}/img/Away%20From%20Keyboard/personalportfolio.jpeg.jpg`}
                alt="Portrait"
                className="h-44 w-44 md:h-56 md:w-56 rounded-full object-cover shadow-lg border-4 border-white"
              />
            </div>
          </div>

          {/* My Story Timeline */}
          <div>
            <h2 className="text-2xl font-semibold text-[#13294B] mb-4">My Story</h2>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300"></div>
              <ul className="space-y-6">
                {timeline.map((item, idx) => (
                  <li key={item.year} className="relative">
                    <span className="absolute left-1/2 -ml-2 top-3 h-4 w-4 rounded-full bg-gray-400 border-2 border-white z-10"></span>
                    <div className={`w-full flex ${item.side === 'left' ? 'justify-start' : 'justify-end'}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20, x: item.side === 'left' ? -20 : 20 }}
                        whileInView={{ opacity: 1, y: 0, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="w-full md:w-1/2 px-4"
                      >
                        <div className="relative rounded-xl border border-gray-200 bg-white/70 dark:bg-black/40 backdrop-blur-sm shadow-sm p-4">
                          {item.logo && (
                            <img src={item.logo} alt="logo" className="absolute -top-3 -right-3 h-6 w-6 rounded-md bg-white p-0.5 shadow" />
                          )}
                          <div className="flex items-baseline gap-3">
                            <span className="text-sm font-semibold text-gray-500">{item.year}</span>
                            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                          </div>
                          <p className="mt-2 text-gray-700">{item.body}</p>
                        </div>
                      </motion.div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Snapshots Grid */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-[#13294B] mb-4">Away from the Keyboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((p, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl border border-gray-200 bg-white/70 dark:bg-black/40 shadow-sm flex items-center justify-center"
                  style={{ height: '18rem' }}
                >
                  <img src={p.src} alt={p.caption || `photo-${i+1}`} className="max-h-full max-w-full object-contain" />
                  {p.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-sm px-3 py-2">
                      {p.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-[#13294B] mb-4">Hobbies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  name: 'Weightlifting',
                  icon: `${basePath}/img/Hobbies/dumbbell-solid-full.svg`,
                  details: [
                    "I've been training consistently for the last 3 years",
                    'Favorite muscle group to hit is chest',
                  ],
                },
                {
                  name: 'Chess',
                  icon: `${basePath}/img/Hobbies/chess-solid-full.svg`,
                  details: [
                    'Began playing when I was younger with my dad; I just play for fun and sometimes at the UNC Chess Club',
                    'I peaked 1100 ELO in classical (so not that good)',
                  ],
                },
                {
                  name: 'Soccer',
                  icon: `${basePath}/img/Hobbies/futbol-solid-full.svg`,
                  details: [
                    'I began playing when I was 6 and immediately fell in love; played on the high school team and now I just play for an intramural team at UNC',
                  ],
                },
                {
                  name: 'Pickleball',
                  icon: `${basePath}/img/Hobbies/table-tennis-paddle-ball-solid-full.svg`,
                  details: [
                    'Played tennis in high school, but the first time I played pickleball I immediately enjoyed it more lol',
                  ],
                },
              ].map((h) => (
                <div key={h.name} className="flex flex-col items-center justify-start rounded-xl border border-gray-200 bg-white/70 dark:bg-black/40 shadow-sm p-6">
                  <div className="mb-3" aria-hidden>
                    {'icon' in h ? <img src={(h as any).icon} alt="" className="h-10 w-10" /> : null}
                  </div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">{h.name}</div>
                  <details className="mt-3 w-full text-left">
                    <summary className="cursor-pointer text-sm font-medium text-gray-700">Details</summary>
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                      {h.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Carousel({ photos }: { photos: { src: string; caption?: string }[] }) {
  const [index, setIndex] = React.useState(0);
  const touchStart = React.useRef<number | null>(null);

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (dx > 40) prev();
    if (dx < -40) next();
    touchStart.current = null;
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white/70 dark:bg-black/40">
      <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <img src={photos[index].src} alt={photos[index].caption || 'photo'} className="w-full h-80 md:h-96 object-cover" />
        {photos[index].caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-sm px-3 py-2">
            {photos[index].caption}
          </div>
        )}
      </div>
      {/* Controls */}
      <button aria-label="Previous" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full px-2 py-1 shadow">
        ‹
      </button>
      <button aria-label="Next" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full px-2 py-1 shadow">
        ›
      </button>
      {/* Dots */}
      <div className="flex justify-center gap-2 py-3">
        {photos.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full ${i === index ? 'bg-gray-700' : 'bg-gray-300'} transition-colors`}
          />
        ))}
      </div>
    </div>
  );
}


