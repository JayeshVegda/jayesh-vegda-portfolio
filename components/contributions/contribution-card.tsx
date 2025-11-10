"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Icons } from "@/components/common/icons";
import { MouseBlurEffect } from "@/components/common/mouse-blur-effect";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { contributionsInterface } from "@/config/contributions";

interface ContributionCardProps {
  contributions: contributionsInterface[];
  showTechStack?: boolean;
}

export default function ContributionCard({
  contributions,
  showTechStack = true,
}: ContributionCardProps) {
  return (
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {contributions.map((contribution, id) => (
        <ContributionCardItem key={id} contribution={contribution} index={id} showTechStack={showTechStack} />
      ))}
    </div>
  );
}

function ContributionCardItem({ 
  contribution, 
  index,
  showTechStack = true,
}: { 
  contribution: contributionsInterface; 
  index: number;
  showTechStack?: boolean;
}) {
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
      <Link href={contribution.link} target="_blank">
        <div className="relative overflow-hidden rounded-xl glass-skill-black h-full">
          {/* Mouse-following blur effect */}
          <MouseBlurEffect isHovering={isHovering} gradientPosition={gradientPosition} />
          
          {/* Card content */}
          <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between gap-3 md:gap-4">
            <div className="flex flex-row justify-between items-start gap-2 mb-2 md:mb-4">
              <h3 className="font-bold flex space-x-1.5 md:space-x-2 items-center text-foreground min-w-0 flex-1">
                <Icons.gitRepoIcon size={18} className="md:w-5 md:h-5 flex-shrink-0" />
                <span className="truncate text-sm md:text-base">{contribution.repo}</span>
              </h3>
              <Icons.gitBranch size={18} className="md:w-5 md:h-5 text-muted-foreground flex-shrink-0" />
            </div>
            
            <div className="space-y-3 md:space-y-4 flex-1">
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {contribution.contibutionDescription}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground flex space-x-1.5 md:space-x-2 items-center">
                <Icons.gitOrgBuilding size={14} className="md:w-[15px] md:h-[15px] flex-shrink-0" />
                <span className="truncate">{contribution.repoOwner}</span>
              </p>
              {showTechStack && contribution.techStack && contribution.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1 md:pt-2">
                  {contribution.techStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border border-black/10 dark:border-white/5 bg-white/60 dark:bg-black/10 text-foreground/80 dark:text-muted-foreground shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {contribution.techStack.length > 4 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border border-black/10 dark:border-white/5 bg-white/60 dark:bg-black/10 text-foreground/80 dark:text-muted-foreground shadow-sm">
                      +{contribution.techStack.length - 4}
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <Icons.externalLink
              size={30}
              className="absolute bottom-3 right-3 md:bottom-4 md:right-4 md:w-[35px] md:h-[35px] border border-white/10 bg-black/20 backdrop-blur-sm rounded-full p-1.5 md:p-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
