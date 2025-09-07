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
}: ProjectCardProps) => {
  // Determine text color for contrast
  const textColor = cardColor === '#FFFACD' || cardColor === '#FFDAC1' || cardColor === '#E2F0CB' || cardColor === '#B5EAD7' ? 'text-gray-800' : 'text-gray-900';
  return (
    <a href={githubUrl && !customIcon && !hideIcon ? githubUrl : undefined} target={githubUrl && !customIcon && !hideIcon ? "_blank" : undefined} rel={githubUrl && !customIcon && !hideIcon ? "noopener noreferrer" : undefined} className="block h-full">
      <Card className={`overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-border`} style={{ background: cardColor }}>
        <div className="relative h-48 w-full overflow-hidden">
          <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
            {!hideIcon && (
              customIcon ? (
                <img src={customIcon} alt="Custom Icon" className="h-8 w-8 object-contain" />
              ) : githubUrl ? (
                <Github className="h-5 w-5 text-muted-foreground" />
              ) : null
            )}
          </div>
          {date && (
            <p className={`italic text-sm mb-1 ${textColor}`}>{date}</p>
          )}
          {description && (
            <p className={`text-sm mb-3 ${textColor}`}>{description}</p>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge
              key={`${id}-tech-${index}`}
              variant="secondary"
              className="text-xs"
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
