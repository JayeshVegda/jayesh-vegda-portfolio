"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo } from "react";

import { Icons } from "@/components/common/icons";
import { MouseBlurEffect } from "@/components/common/mouse-blur-effect";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { Button } from "@/components/ui/button";
import { ProjectInterface } from "@/config/projects";

interface ProjectCardProps {
  project: ProjectInterface;
  index?: number;
}

// Function to get tech stack labels - shows key technologies
function getTechStackLabel(techStack: string[]): string[] {
  const stack = techStack.map(t => t.toLowerCase().replace(/\s+/g, ''));
  const labels: string[] = [];
  
  // Key technologies to show (priority order)
  const keyTechs: { [key: string]: string } = {
    'react': 'React',
    'node': 'Node',
    'express': 'Express',
    'mongodb': 'MongoDB',
    'mongo': 'MongoDB',
    'python': 'Python',
    'flask': 'Flask',
    'beautifulsoup': 'BeautifulSoup',
    'beautifulsoup4': 'BeautifulSoup',
    'php': 'PHP',
    'bootstrap': 'Bootstrap',
    'css': 'CSS',
    'css3': 'CSS',
    'html': 'HTML',
    'html5': 'HTML',
    'javascript': 'JavaScript',
    'mysql': 'MySQL',
    'django': 'Django',
    'next': 'Next.js',
    'next.js': 'Next.js',
    'nextjs': 'Next.js',
  };

  // Priority order for technologies (most important first, shorter names preferred for one line)
  const priorityOrder = ['react', 'node', 'express', 'mongodb', 'python', 'flask', 'php', 'bootstrap', 'css', 'beautifulsoup', 'html', 'javascript', 'mysql', 'django'];
  
  // Filter and map to show only key technologies in priority order
  priorityOrder.forEach(priorityKey => {
    if (labels.length >= 3) return; // Limit to 3 items to ensure one line
    
    for (const tech of stack) {
      if (tech.includes(priorityKey)) {
        const label = keyTechs[priorityKey];
        if (label && !labels.includes(label)) {
          labels.push(label);
          break;
        }
      }
    }
  });

  // Return key technologies (max 3 to ensure fits on one line)
  return labels.slice(0, 3);
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const { cardRef, isHovering, gradientPosition, handleMouseEnter, handleMouseMove, handleMouseLeave } = useMouseTracking();
  
  const techStackLabels = useMemo(() => getTechStackLabel(project.techStack), [project.techStack]);

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
      <motion.div 
        className="relative overflow-hidden rounded-2xl border-[0.5px] border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-xl shadow-sm"
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        style={{
          boxShadow: isHovering ? "0 0 40px rgba(255,255,255,0.05)" : undefined,
        }}
      >
        {/* Mouse-following blur effect */}
        <MouseBlurEffect isHovering={isHovering} gradientPosition={gradientPosition} />
        
        {/* Card content - asymmetric padding (top-heavy) */}
        <div className="relative z-10 pt-6 pb-4 px-4 md:pt-8 md:pb-6 md:px-6 h-full flex flex-col gap-3 md:gap-5">
          {/* Image with 16:9 ratio and gradient overlay */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden -mx-1 md:-mx-2 mt-1 md:mt-2">
            <Image
              className="object-cover w-full h-full"
              src={project.companyLogoImg}
              alt={project.companyName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient fade overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
          
          {/* Content area */}
          <div className="flex-1 space-y-2 md:space-y-3">
            {/* Title */}
            <h5 
              className="text-lg md:text-xl font-semibold tracking-tight text-foreground/90 dark:text-white/90"
              style={{
                fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              {project.companyName}
            </h5>
            
            {/* Description - two lines max */}
            <p 
              className="line-clamp-2 font-normal text-foreground/70 dark:text-white/70 leading-relaxed text-xs md:text-sm"
              style={{
                fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
              }}
            >
              {project.shortDescription}
            </p>
            
            {/* Tech stack tags - smaller, pill-shaped */}
            <div className="flex gap-1.5 flex-wrap">
              {techStackLabels.map((label, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center whitespace-nowrap rounded-full px-2 md:px-2.5 py-0.5 md:py-1 text-xs font-light border-[0.5px] border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/10 text-foreground/60 dark:text-white/60 backdrop-blur-sm"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          
          {/* Actions - hover-only icons and explore link */}
          <div className="flex items-center justify-between pt-1 md:pt-2 gap-2">
            {/* Hover-only GitHub and Live icons */}
            <div className="flex items-center gap-2 md:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.githubLink ? (
                <Link 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-1 md:p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <Icons.gitHub className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/60 dark:text-white/60 hover:text-foreground/90 dark:hover:text-white/90 transition-colors" />
                </Link>
              ) : (
                <div className="p-1 md:p-1.5 rounded-lg opacity-40 cursor-not-allowed">
                  <Icons.gitHub className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/30 dark:text-white/30" />
                </div>
              )}
              
              {project.websiteLink ? (
                <Link 
                  href={project.websiteLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-1 md:p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <Icons.externalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/60 dark:text-white/60 hover:text-foreground/90 dark:hover:text-white/90 transition-colors" />
                </Link>
              ) : (
                <div className="p-1 md:p-1.5 rounded-lg opacity-40 cursor-not-allowed">
                  <Icons.externalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/30 dark:text-white/30" />
                </div>
              )}
            </div>
            
            {/* Explore Project link - right-aligned */}
            <Link 
              href={`/projects/${project.id}`} 
              className="inline-flex items-center gap-1 md:gap-1.5 text-xs font-medium text-foreground/70 dark:text-white/70 hover:text-foreground/90 dark:hover:text-white/90 transition-colors group/explore"
            >
              <span className="hidden sm:inline">Explore Project</span>
              <span className="sm:hidden">Explore</span>
              <Icons.chevronRight className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover/explore:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
