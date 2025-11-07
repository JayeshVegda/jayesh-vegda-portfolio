"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { MouseBlurEffect } from "@/components/common/mouse-blur-effect";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { Icons } from "@/components/common/icons";
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

interface TimelineProps {
  experiences: ExperienceInterface[];
}

const Timeline: React.FC<TimelineProps> = ({ experiences }) => {
  // Sort experiences by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = a.endDate === "Present" ? new Date() : a.endDate;
    const dateB = b.endDate === "Present" ? new Date() : b.endDate;
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="space-y-4">
      {sortedExperiences.map((experience, index) => (
        <TimelineItem key={experience.id} experience={experience} index={index} />
      ))}
    </div>
  );
};

function TimelineItem({ experience, index }: { experience: ExperienceInterface; index: number }) {
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
        <div className="relative z-10 p-6 w-full">
          <div className="flex items-start gap-5">
            {/* Logo - bigger and more prominent */}
            {experience.logo && (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-2 border-black/10 dark:border-white/10 overflow-hidden bg-white/80 dark:bg-black/30 flex-shrink-0 backdrop-blur-sm shadow-md p-3">
                <Image
                  src={experience.logo}
                  alt={experience.company}
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            
            {/* Main content section */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              {/* Header section */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                      {experience.position}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base sm:text-lg font-semibold text-foreground/90">
                        {experience.company}
                      </span>
                      {experience.companyUrl && (
                        <a
                          href={experience.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Icons.externalLink className="w-4 h-4" />
                        </a>
                      )}
                      <span className="text-sm text-muted-foreground hidden sm:inline">•</span>
                      <span className="text-sm text-muted-foreground">{experience.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border border-black/15 dark:border-white/10 bg-white/70 dark:bg-black/20 text-foreground/90 dark:text-foreground/80 shadow-sm">
                      {getDurationText(
                        experience.startDate,
                        experience.endDate
                      )}
                    </span>
                    {experience.experienceLetterUrl && (
                      <a
                        href={experience.experienceLetterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border border-black/15 dark:border-white/10 bg-white/70 dark:bg-black/20 text-foreground/90 dark:text-foreground/80 shadow-sm hover:bg-white/80 dark:hover:bg-black/30 transition-colors"
                      >
                        Experience Letter
                        <Icons.externalLink className="ml-1.5 h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl w-full sm:w-auto"
                    asChild
                  >
                    <Link href={`/experience/${experience.id}`}>
                      View Details
                      <Icons.chevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Description section */}
              <div className="pt-1">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {experience.description[0]}
                </p>
              </div>
              
              {/* Skills section - limit to 6 skills max */}
              <div className="flex flex-wrap gap-2 pt-1">
                {experience.skills.slice(0, 6).map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium border border-black/10 dark:border-white/5 bg-white/60 dark:bg-black/10 text-foreground/80 dark:text-muted-foreground shadow-sm"
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
}

export default Timeline;
