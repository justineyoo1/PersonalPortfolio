import React from "react";
import type { LinkItem } from "@/types";
import { cn } from "@/lib/cn";

type DetailCardProps = {
  isDark: boolean;
  image: string;
  windowTitle: string;
  subtitle?: string;
  /** Team and location, rendered under the subtitle as quiet metadata. */
  org?: string;
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
  org,
  date,
  category,
  bulletPoints,
  links,
  selectedLinkIndex,
  showHeroSubtitle = true,
}) => {
  // Projects pass the same string as both title and subtitle; don't echo it.
  const showSubtitle =
    showHeroSubtitle && Boolean(subtitle) && subtitle !== windowTitle;
  // Hide the image element entirely if it fails to load — better than a
  // broken-image icon, and lets the gradient/title still read cleanly.
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
  ) => {
    e.currentTarget.style.display = "none";
  };

  if (isDark) {
    return (
      <div className="px-6 lg:px-10 py-7 lg:py-9 max-w-[72ch] mx-auto">
        <div className="flex items-start gap-3.5">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center overflow-hidden">
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="w-8 h-8 object-contain"
              onError={handleImageError}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg lg:text-xl font-semibold tracking-[0.01em] text-blue-300 leading-tight">
              {windowTitle}
            </p>
            {org && <p className="text-[12px] text-gray-500 mt-1 leading-snug">{org}</p>}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5 text-[12px] text-gray-500">
              {date && <span>{date}</span>}
              {date && category && <span className="text-gray-700">·</span>}
              {category && <span className="text-emerald-400/80">{category}</span>}
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10 mt-5" />

        <ul className="mt-4 space-y-2.5">
          {bulletPoints.map((point) => (
            <li key={point} className="flex gap-2.5">
              <span aria-hidden="true" className="shrink-0 text-emerald-400/60 leading-relaxed">
                –
              </span>
              <p className="text-[13.5px] leading-[1.6] text-gray-300">{point}</p>
            </li>
          ))}
        </ul>

        {links.length > 0 && (
          <div className="mt-6 flex flex-col gap-1">
            {links.map((link, index) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-block text-[13px] rounded transition-all duration-150 text-gray-400 hover:text-emerald-300",
                  index === selectedLinkIndex && "font-bold text-emerald-300",
                )}
              >
                {link.name} {index === selectedLinkIndex ? "❮ " : ""}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Light mode: a compact editorial layout. The logo rides in a small tile
  // instead of a full-bleed cover crop — logos are wordmarks, and blowing one
  // up to 256px of `object-cover` read as a banner, not a detail view.
  return (
    <div className="px-6 lg:px-10 py-7 lg:py-9 max-w-[680px] mx-auto">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-14 h-14 rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="w-9 h-9 object-contain"
            onError={handleImageError}
          />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className="text-[21px] lg:text-[23px] font-semibold text-[#1D1D1F] tracking-[-0.01em] leading-tight">
            {windowTitle}
          </h2>
          {showSubtitle && (
            <p className="text-[13px] text-[#86868B] mt-1 leading-snug">{subtitle}</p>
          )}
          {org && <p className="text-[12.5px] text-[#A1A1A6] mt-1 leading-snug">{org}</p>}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-2 text-[12px] text-[#86868B]">
            {date && <span className="tabular-nums">{date}</span>}
            {date && category && <span className="text-[#D2D2D7]">·</span>}
            {category && <span className="text-[#007AFF] font-medium">{category}</span>}
          </div>
        </div>
      </div>

      <div className="h-px bg-black/[0.07] mt-6" />

      <ul className="mt-5 space-y-3">
        {bulletPoints.map((point) => (
          <li key={point} className="flex gap-3">
            <span
              aria-hidden="true"
              className="shrink-0 mt-[9px] w-1 h-1 rounded-full bg-[#C7C7CC]"
            />
            <p className="text-[14.5px] leading-[1.65] text-[#3A3A3C]">{point}</p>
          </li>
        ))}
      </ul>

      {links.length > 0 && (
        <div className="flex flex-wrap gap-2.5 mt-7">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#007AFF] bg-[#007AFF]/[0.07] rounded-full px-4 py-2 apple-transition hover:bg-[#007AFF]/[0.13]"
            >
              {link.name}
              <span className="text-[#007AFF]/60">↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
