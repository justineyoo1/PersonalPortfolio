import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";

interface ProjectCardProps {
  id?: string;
  title: string;
  date?: string;
  description?: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  customIcon?: string;
  hideIcon?: boolean;
  cardColor?: string; // new prop
  dark?: boolean; // dark variant for slate cards
  fixed?: boolean; // enforce consistent size
}

const ProjectCard = ({
  id = "project-1",
  title = "Project Title",
  date = "",
  description = "Description of the project",
  imageUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  technologies = [],
  githubUrl = "https://github.com",
  customIcon,
  hideIcon = false,
  cardColor = "#fff",
  dark = false,
  fixed = false,
}: ProjectCardProps) => {
  // Determine text color for contrast
  const textColor = cardColor === '#FFFACD' || cardColor === '#FFDAC1' || cardColor === '#E2F0CB' || cardColor === '#B5EAD7' ? 'text-gray-800' : 'text-gray-900';
  const darkTitle = dark ? 'text-white' : textColor;
  const darkBody = dark ? 'text-gray-300' : textColor;
  const cardBaseStyles = dark
    ? 'border border-white/10 bg-[#0f172a]'
    : 'border border-border';

  const fixedStyles = fixed
    ? { width: 360 as number | undefined }
    : {};
  const mediaFixedStyles = fixed
    ? { height: 200 as number | undefined }
    : {};
  const contentFixedStyles = fixed
    ? { minHeight: 180 as number | undefined }
    : {};
  const footerFixedStyles = fixed
    ? { minHeight: 48 as number | undefined }
    : {};

  // Tag color palette (generic scheme): pick color by hashing tag → palette index
  const pastelPalette = [
    { bg: '#FDF2F8', border: '#FBCFE8', text: '#831843' }, // pink
    { bg: '#EFF6FF', border: '#DBEAFE', text: '#1E3A8A' }, // blue
    { bg: '#ECFEFF', border: '#BAE6FD', text: '#075985' }, // sky
    { bg: '#F0FDF4', border: '#BBF7D0', text: '#065F46' }, // green
    { bg: '#FEF3C7', border: '#FDE68A', text: '#92400E' }, // amber
    { bg: '#EDE9FE', border: '#DDD6FE', text: '#5B21B6' }, // indigo
    { bg: '#FFF1F2', border: '#FCA5A5', text: '#9F1239' }, // rose
    { bg: '#F3F4F6', border: '#E5E7EB', text: '#111827' }, // neutral
  ] as const;

  const hashString = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
    return Math.abs(h);
  };

  const getTagStyle = (tag: string) => {
    if (dark) {
      return {
        backgroundColor: 'rgba(255,255,255,0.08)',
        color: '#FFFFFF',
        border: '1px solid rgba(255,255,255,0.12)'
      } as React.CSSProperties;
    }
    const idx = hashString(tag) % pastelPalette.length;
    const c = pastelPalette[idx];
    return {
      backgroundColor: c.bg,
      color: c.text,
      border: `1px solid ${c.border}`,
    } as React.CSSProperties;
  };
  // Duo-tone subtle glow background
  const gradientBg = `linear-gradient(180deg, ${cardColor} 0%, #FFFFFF 100%)`;
  return (
    <a href={githubUrl && !customIcon && !hideIcon ? githubUrl : undefined} target={githubUrl && !customIcon && !hideIcon ? "_blank" : undefined} rel={githubUrl && !customIcon && !hideIcon ? "noopener noreferrer" : undefined} className="block h-full">
      <Card className={`overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${cardBaseStyles}`} style={{ background: gradientBg, ...fixedStyles }}>
        <div className="relative h-48 w-full overflow-hidden" style={mediaFixedStyles}>
          <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
        </div>
        <CardContent className="p-4" style={contentFixedStyles}>
          <div className="flex justify-between items-start mb-2">
            <h3 className={`text-lg font-semibold ${darkTitle}`}>{title}</h3>
            {!hideIcon && (
              customIcon ? (
                <img src={customIcon} alt="Custom Icon" className="h-8 w-8 object-contain" />
              ) : githubUrl ? (
                <Github className={`h-5 w-5 ${dark ? 'text-gray-300' : 'text-muted-foreground'}`} />
              ) : null
            )}
          </div>
          {date && (
            <p className={`italic text-sm mb-1 ${darkBody}`}>{date}</p>
          )}
          {description && (
            <p className={`text-sm mb-3 ${darkBody}`}>{description}</p>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-wrap gap-2" style={footerFixedStyles}>
          {technologies.map((tech, index) => (
            <Badge
              key={`${id}-tech-${index}`}
              variant="secondary"
              className={`text-xs`}
              style={getTagStyle(String(tech))}
            >
              {tech}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </a>
  );
};

export default ProjectCard;
