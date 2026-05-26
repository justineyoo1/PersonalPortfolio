import React from "react";
import type { LinkItem } from "@/types";
import { cn } from "@/lib/cn";

type DetailCardProps = {
  isDark: boolean;
  image: string;
  windowTitle: string;
  subtitle?: string;
  date?: string;
  category?: string;
  bulletPoints: string[];
  links: LinkItem[];
  selectedLinkIndex: number;
  showHeroSubtitle?: boolean;
};

const splitToBullets = (description: string): string[] =>
  description
    .split(". ")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.endsWith(".") ? s : `${s}.`));

export const buildBullets = splitToBullets;

export const DetailCard: React.FC<DetailCardProps> = ({
  isDark,
  image,
  windowTitle,
  subtitle,
  date,
  category,
  bulletPoints,
  links,
  selectedLinkIndex,
  showHeroSubtitle = true,
}) => {
  // Hide the image element entirely if it fails to load — better than a
  // broken-image icon, and lets the gradient/title still read cleanly.
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
  ) => {
    e.currentTarget.style.display = "none";
  };

  if (isDark) {
    return (
      <div className="m-4 pb-4">
        <img
          src={image}
          alt={windowTitle}
          className="w-full h-48 object-contain rounded-lg mb-4 max-w-2xl mx-auto"
          onError={handleImageError}
        />
        <div className="max-w-[70ch] mx-auto mt-1">
          <p className="text-xl lg:text-2xl font-semibold tracking-[0.02em] text-blue-300">
            {windowTitle}
          </p>
          {date && (
            <p className="text-sm font-semibold mt-1 text-gray-200">{date}</p>
          )}
        </div>
        <ul className="mt-2 max-w-[70ch] mx-auto list-disc pl-5 space-y-1 leading-relaxed text-gray-200">
          {bulletPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="mt-4 max-w-[70ch] mx-auto flex flex-col">
          {links.map((link, index) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-block rounded transition-all duration-150 text-gray-200",
                index === selectedLinkIndex && "font-bold",
              )}
            >
              {link.name} {index === selectedLinkIndex ? "❮ " : ""}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4">
      <div className="relative w-full h-56 lg:h-64 overflow-hidden">
        <img
          src={image}
          alt={windowTitle}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            {windowTitle}
          </h2>
          {showHeroSubtitle && subtitle && (
            <p className="text-sm text-white/80 font-medium mt-1">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-5 lg:px-6 mt-4">
        {date && (
          <span className="bg-[#E8E8ED] text-[#515154] text-xs font-semibold px-3 py-1.5 rounded-lg">
            {date}
          </span>
        )}
        {category && (
          <span className="bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold px-3 py-1.5 rounded-lg">
            {category}
          </span>
        )}
      </div>

      <div className="mx-5 lg:mx-6 mt-4 bg-[#F0F0F5] rounded-2xl p-5">
        <div className="space-y-3">
          {bulletPoints.map((point) => (
            <p key={point} className="text-[15px] leading-relaxed text-[#1D1D1F]">
              {point}
            </p>
          ))}
        </div>
      </div>

      {links.length > 0 && (
        <div className="flex flex-wrap gap-3 px-5 lg:px-6 mt-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#007AFF] text-white text-sm font-semibold rounded-full px-5 py-2.5 apple-transition hover:bg-[#0066D6]"
            >
              {link.name}
              <span className="text-white/70">↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
