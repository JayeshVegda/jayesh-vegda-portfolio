"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Icons } from "@/components/common/icons";
import { MouseBlurEffect } from "@/components/common/mouse-blur-effect";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { Button } from "@/components/ui/button";
import { ExperienceInterface } from "@/config/experience";

// Helper function to extract year from date
const getYearFromDate = (date: Date): string => {
  return new Date(date).getFullYear().toString();
};

// Helper function to get duration text
const getDurationText = (
  startDate: Date,
  endDate: Date | "Present"
): string => {
  const startYear = getYearFromDate(startDate);
  const endYear =
    typeof endDate === "string" ? "Present" : getYearFromDate(endDate);
  return `${startYear} - ${endYear}`;
};

interface ExperienceCardProps {
  experience: ExperienceInterface;
  index?: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index = 0 }) => {
  const { cardRef, isHovering, gradientPosition, handleMouseEnter, handleMouseMove, handleMouseLeave } = useMouseTracking();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-xl glass-skill-black w-full">
        {/* Mouse-following blur effect */}
        <MouseBlurEffect isHovering={isHovering} gradientPosition={gradientPosition} />
        
        {/* Card content - professional modern layout */}
        <div className="relative z-10 p-4 md:p-6 w-full">
          <div className="flex items-start gap-3 md:gap-5">
            {/* Logo - bigger and more prominent */}
            {experience.logo && (
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl border-2 border-black/10 dark:border-white/10 overflow-hidden bg-white/80 dark:bg-black/30 flex-shrink-0 backdrop-blur-sm shadow-md p-2 md:p-3">
                <Image
                  src={experience.logo}
                  alt={experience.company}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            
            {/* Main content section */}
            <div className="flex-1 min-w-0 flex flex-col gap-3 md:gap-4">
              {/* Header section */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight">
                      {experience.position}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                      <span className="text-sm md:text-base font-semibold text-foreground/90">
                        {experience.company}
                      </span>
                      {experience.companyUrl && (
                        <a
                          href={experience.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Icons.externalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </a>
                      )}
                      <span className="text-xs md:text-sm text-muted-foreground hidden sm:inline">•</span>
                      <span className="text-xs md:text-sm text-muted-foreground">{experience.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                    <span className="inline-flex items-center px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-semibold border border-black/15 dark:border-white/10 bg-white/70 dark:bg-black/20 text-foreground/90 dark:text-foreground/80 shadow-sm">
                      {getDurationText(experience.startDate, experience.endDate)}
                    </span>
                    {experience.experienceLetterUrl && (
                      <a
                        href={experience.experienceLetterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-semibold border border-black/15 dark:border-white/10 bg-white/70 dark:bg-black/20 text-foreground/90 dark:text-foreground/80 shadow-sm hover:bg-white/80 dark:hover:bg-black/30 transition-colors"
                      >
                        <span className="hidden sm:inline">Experience Letter</span>
                        <span className="sm:hidden">Letter</span>
                        <Icons.externalLink className="ml-1 md:ml-1.5 h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl w-full sm:w-auto text-xs md:text-sm"
                    asChild
                  >
                    <Link href={`/experience/${experience.id}`}>
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">Details</span>
                      <Icons.chevronRight className="ml-1.5 md:ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Description section */}
              <div className="pt-1">
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-none">
                  {experience.description[0]}
                </p>
              </div>
              
              {/* Skills section - limit to 6 skills max */}
              <div className="flex flex-wrap gap-1.5 md:gap-2 pt-1">
                {experience.skills.slice(0, 6).map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 md:px-3 py-1 md:py-1.5 rounded-md text-xs font-medium border border-black/10 dark:border-white/5 bg-white/60 dark:bg-black/10 text-foreground/80 dark:text-muted-foreground shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
