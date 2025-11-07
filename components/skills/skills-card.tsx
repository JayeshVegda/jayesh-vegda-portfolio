"use client";

import { motion } from "framer-motion";
import { Icons } from "@/components/common/icons";
import { MouseBlurEffect } from "@/components/common/mouse-blur-effect";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { useMemo } from "react";
import { SkillCategory } from "@/config/skills";

interface SkillItem {
  name: string;
  description: string;
  rating: number;
  iconKey?: string;
  category?: SkillCategory;
}

interface SkillsCardProps {
  skills: SkillItem[];
}

// Proficiency chip component with colors
function ProficiencyChip({ rating }: { rating: number }) {
  const getProficiencyLevel = (rating: number): { label: string; color: string; bgColor: string } => {
    if (rating >= 5) return { label: "Expert", color: "text-green-600 dark:text-green-400", bgColor: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800" };
    if (rating >= 4) return { label: "Advanced", color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800" };
    if (rating >= 3) return { label: "Intermediate", color: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800" };
    return { label: "Familiar", color: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800" };
  };

  const proficiency = getProficiencyLevel(rating);

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${proficiency.bgColor} ${proficiency.color}`}>
      {proficiency.label}
    </span>
  );
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  // Group skills by category
  const groupedSkills = useMemo(() => {
    const groups: Record<SkillCategory, SkillItem[]> = {
      "Core Stack": [],
      "DevOps & Productivity Tools": [],
      "Professional Skills": [],
    };

    skills.forEach((skill) => {
      const category = skill.category || "Core Stack";
      if (groups[category]) {
        groups[category].push(skill);
      }
    });

    return groups;
  }, [skills]);

  const categoryOrder: SkillCategory[] = ["Core Stack", "DevOps & Productivity Tools", "Professional Skills"];

  // Category descriptions
  const categoryDescriptions: Record<SkillCategory, string> = {
    "Core Stack": "Languages + Frameworks + Databases",
    "DevOps & Productivity Tools": "Tools for versioning, deployment, and environment",
    "Professional Skills": "Human attributes and adaptability",
  };

  return (
    <div className="space-y-8">
      {/* Skills grouped by category */}
      {categoryOrder.map((category, categoryIndex) => {
        const categorySkills = groupedSkills[category];
        if (categorySkills.length === 0) return null;

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: categoryIndex * 0.08 }}
            className="space-y-4"
          >
            {/* Category header with description */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-foreground">
                  {category}
                </h3>
                <div className="flex-1 h-px bg-border" />
              </div>
              <p className="text-xs text-muted-foreground/70 italic">
                {categoryDescriptions[category]}
              </p>
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categorySkills.map((skill, index) => (
                <SkillCardItem 
                  key={`${category}-${index}`} 
                  skill={skill} 
                  index={categoryIndex * 100 + index} 
                />
              ))}
            </div>
          </motion.div>
        );
      })}
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

  // Rating dots visualization
  const renderRatingDots = () => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i < skill.rating
                ? "bg-blue-500 dark:bg-blue-400"
                : "bg-black/10 dark:bg-white/10"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.02, ease: "easeOut" }}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      style={{ transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
    >
      <div className="relative overflow-hidden rounded-xl glass-skill-black">
        {/* Mouse-following blur effect */}
        <MouseBlurEffect isHovering={isHovering} gradientPosition={gradientPosition} />
        
        {/* Inner glow on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          }}
        />
        
        {/* Card content - redesigned without progress bar */}
        <div className="relative z-10 p-4 h-full flex flex-col gap-3">
          {/* Header with icon and name */}
          <div className="flex items-start gap-3">
            <div 
              className="flex items-center justify-center w-11 h-11 rounded-lg shrink-0 backdrop-blur-sm border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 shadow-sm mt-0.5"
            >
              <IconComp 
                size={22} 
                style={{ color: brandColor }}
              />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <h3
                className="text-base font-bold text-foreground leading-tight"
                style={{
                  fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                {skill.name}
              </h3>
              <p
                className="text-xs text-muted-foreground/85 leading-relaxed line-clamp-2"
                style={{
                  fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
                }}
              >
                {skill.description}
              </p>
            </div>
          </div>

          {/* Footer with rating dots and proficiency chip */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            {renderRatingDots()}
            <ProficiencyChip rating={skill.rating} />
          </div>
        </div>
      </div>
    </motion.div>
  );
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
