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
    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            <div className="flex flex-row justify-between items-start mb-4">
              <h3 className="font-bold flex space-x-2 items-center text-foreground">
                <Icons.gitRepoIcon size={20} />
                <span className="truncate">{contribution.repo}</span>
              </h3>
              <Icons.gitBranch size={20} className="text-muted-foreground flex-shrink-0" />
            </div>
            
            <div className="space-y-4 flex-1">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {contribution.contibutionDescription}
              </p>
              <p className="text-sm text-muted-foreground flex space-x-2 items-center">
                <Icons.gitOrgBuilding size={15} />
                <span>{contribution.repoOwner}</span>
              </p>
              {showTechStack && contribution.techStack && contribution.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
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
              size={35}
              className="absolute bottom-4 right-4 border border-white/10 bg-black/20 backdrop-blur-sm rounded-full p-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
