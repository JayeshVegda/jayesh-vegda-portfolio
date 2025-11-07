"use client";

import Rating from "@/components/skills/rating";
import { motion } from "framer-motion";
import { Icons } from "@/components/common/icons";
import { MouseBlurEffect } from "@/components/common/mouse-blur-effect";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { useMemo } from "react";

interface SkillItem {
  name: string;
  description: string;
  rating: number;
  iconKey?: string;
}

interface SkillsCardProps {
  skills: SkillItem[];
}

export default function HomeSkillsCard({ skills }: SkillsCardProps) {
  return (
    <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {skills.map((skill, id) => (
        <SkillCardItem key={id} skill={skill} index={id} />
      ))}
    </div>
  );
}

function SkillCardItem({ skill, index }: { skill: SkillItem; index: number }) {
  const { cardRef, isHovering, gradientPosition, handleMouseEnter, handleMouseMove, handleMouseLeave } = useMouseTracking();

  const key = useMemo(() => {
    const iconKey = skill.iconKey || skill.name || "";
    return iconKey.toLowerCase().replace(/\s+|\.|\+/g, "");
  }, [skill.iconKey, skill.name]);
  
  const IconComp = useMemo(() => {
    // Try exact match first
    if ((Icons as any)[key]) return (Icons as any)[key];
    // Try common variations
    const variations: Record<string, string> = {
      "c++": "cpp",
      "cplusplus": "cpp",
      "htmlcss": "html5",
      "html/css": "html5",
      "expressjs": "express",
      "express.js": "express",
      "vscode": "vscode",
      "visualstudiocode": "vscode",
      "visualstudio": "visualstudio",
      "problemsolving": "zap",
      "teamwork": "user",
      "communication": "user",
      "timemanagement": "user",
      "adaptability": "user",
      "fastlearner": "zap",
    };
    const normalizedKey = variations[key] || key;
    return (Icons as any)[normalizedKey] || Icons.react;
  }, [key]);
  
  const brandColor = useMemo(() => getBrandColor(key), [key]);

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
      <div className="relative overflow-hidden rounded-xl glass-skill-black">
        {/* Mouse-following blur effect */}
        <MouseBlurEffect isHovering={isHovering} gradientPosition={gradientPosition} />
        
        {/* Card content */}
        <div className="relative z-10 p-5 h-full flex flex-col gap-4">
          {/* Header with icon and name */}
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 backdrop-blur-sm border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 shadow-sm"
            >
              <IconComp 
                size={24} 
                style={{ color: brandColor }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="text-lg font-semibold text-foreground truncate"
                style={{
                  fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                {skill.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-sm text-muted-foreground/90 leading-relaxed line-clamp-2 flex-1"
            style={{
              fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
            }}
          >
            {skill.description}
          </p>

          {/* Rating */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center gap-2">
              <Rating stars={skill.rating} />
              <span className="text-xs text-muted-foreground/70 font-medium">
                {skill.rating}/5
              </span>
            </div>
            <span className="text-xs text-muted-foreground/60 capitalize">
              {getProficiencyLevel(skill.rating)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function getProficiencyLevel(rating: number): string {
  if (rating >= 5) return "Expert";
  if (rating >= 4) return "Advanced";
  if (rating >= 3) return "Intermediate";
  return "Beginner";
}

function getBrandColor(key: string): string {
  switch (key) {
    case "react":
      return "#61DAFB";
    case "nodejs":
    case "nodedotjs":
      return "#83CD29";
    case "typescript":
      return "#3178C6";
    case "javascript":
      return "#F7DF1E";
    case "java":
      return "#ED8B00";
    case "python":
      return "#3776AB";
    case "cpp":
    case "cplusplus":
    case "c++":
      return "#00599C";
    case "django":
      return "#092E20";
    case "flask":
      return "#000000";
    case "laravel":
      return "#FF2D20";
    case "php":
      return "#777BB4";
    case "git":
    case "github":
      return "#F05033";
    case "mongodb":
      return "#47A248";
    case "express":
    case "expressjs":
      return "#000000";
    case "mysql":
      return "#4479A1";
    case "nextjs":
      return "#000000";
    case "redux":
      return "#764ABC";
    case "graphql":
      return "#E10098";
    case "angular":
      return "#DD0031";
    case "css3":
      return "#264DE4";
    case "html5":
      return "#E34F26";
    case "tailwindcss":
      return "#38BDF8";
    case "bootstrap":
      return "#7952B3";
    case "docker":
      return "#2496ED";
    case "azure":
      return "#0078D4";
    case "linux":
      return "#FCC624";
    case "vscode":
    case "visualstudiocode":
      return "#007ACC";
    case "visualstudio":
      return "#5C2D91";
    case "netlify":
    case "vercel":
      return "#000000";
    case "problemsolving":
    case "teamwork":
    case "communication":
    case "timemanagement":
    case "adaptability":
    case "fastlearner":
      return "#6C757D";
    default:
      return "#6C757D";
  }
}

