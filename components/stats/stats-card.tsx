"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icons } from "@/components/common/icons";
import { MouseBlurEffect } from "@/components/common/mouse-blur-effect";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { StatItem, AchievementItem } from "@/config/stats";

interface StatsCardProps {
  stats: StatItem[];
  achievements?: AchievementItem[];
}

export default function StatsCard({ stats, achievements = [] }: StatsCardProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatItemCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>
      
      {achievements.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatItemCard({ stat, index }: { stat: StatItem; index: number }) {
  const { cardRef, isHovering, gradientPosition, handleMouseEnter, handleMouseMove, handleMouseLeave } = useMouseTracking();

  const getIcon = () => {
    switch (stat.platform.toLowerCase()) {
      case "leetcode":
        return Icons.zap;
      case "github":
        return Icons.gitHub;
      case "aciojob":
        return Icons.zap;
      default:
        return Icons.zap;
    }
  };

  const Icon = getIcon();

  const isImageLink = stat.link.includes('storage.googleapis.com') || stat.link.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  
  const cardContent = (
    <div className="relative overflow-hidden rounded-xl glass-skill-black h-full">
      {/* Mouse-following blur effect */}
      <MouseBlurEffect isHovering={isHovering} gradientPosition={gradientPosition} />
      
      {/* Card content */}
      <div className="relative z-10 p-4 md:p-6 h-full flex flex-col gap-3 md:gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <div 
            className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl shrink-0 backdrop-blur-sm shadow-sm ${
              stat.platform.toLowerCase() === 'github' 
                ? 'bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10' 
                : stat.platform.toLowerCase() === 'aciojob'
                ? 'bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10'
                : 'bg-white/60 dark:bg-black/20 border border-black/10 dark:border-white/10'
            }`}
            style={stat.color && stat.platform.toLowerCase() !== 'github' && stat.platform.toLowerCase() !== 'aciojob' ? { 
              border: `1px solid ${stat.color}30`,
              backgroundColor: `${stat.color}20`
            } : {}}
          >
            {stat.platform.toLowerCase() === 'github' ? (
              <Icon className="h-5 w-5 md:h-6 md:w-6 text-foreground dark:text-white" />
            ) : stat.platform.toLowerCase() === 'aciojob' ? (
              <Image 
                src="/acciojob.svg" 
                alt="ACIOJOB" 
                width={24} 
                height={24} 
                className="h-5 w-5 md:h-6 md:w-6 object-contain"
              />
            ) : (
              <Icon className="h-5 w-5 md:h-6 md:w-6" style={stat.color ? { color: stat.color } : { color: 'inherit' }} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-foreground uppercase tracking-wide">
              {stat.platform}
            </h3>
          </div>
        </div>

        <div className="space-y-1 md:space-y-2">
          <p className="text-3xl md:text-4xl font-bold text-foreground">
            {stat.value}
          </p>
          <p className="text-sm md:text-base font-semibold text-foreground/90">
            {stat.label}
          </p>
          {stat.description && (
            <p className="text-xs md:text-sm text-muted-foreground/70 mt-1">
              {stat.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );

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
      {isImageLink ? (
        <a href={stat.link} target="_blank" rel="noopener noreferrer" className="block">
          {cardContent}
        </a>
      ) : (
        <Link href={stat.link} target="_blank" rel="noopener noreferrer">
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
}

function AchievementCard({ achievement, index }: { achievement: AchievementItem; index: number }) {
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
      {achievement.link ? (
        <Link href={achievement.link} target="_blank" rel="noopener noreferrer">
          <AchievementContent achievement={achievement} isHovering={isHovering} gradientPosition={gradientPosition} />
        </Link>
      ) : (
        <AchievementContent achievement={achievement} isHovering={isHovering} gradientPosition={gradientPosition} />
      )}
    </motion.div>
  );
}

function AchievementContent({ 
  achievement, 
  isHovering, 
  gradientPosition 
}: { 
  achievement: AchievementItem; 
  isHovering: boolean; 
  gradientPosition: { x: number; y: number };
}) {
  return (
    <div className="relative overflow-hidden rounded-xl glass-skill-black h-full">
      {/* Mouse-following blur effect */}
      <MouseBlurEffect isHovering={isHovering} gradientPosition={gradientPosition} />
      
      {/* Card content */}
      <div className="relative z-10 p-4 md:p-5 h-full flex flex-col gap-2 md:gap-3">
        <div className="flex items-start justify-between gap-2 md:gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
              {achievement.title}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground/90 leading-relaxed">
              {achievement.description}
            </p>
          </div>
          <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl shrink-0 backdrop-blur-sm bg-white/70 dark:bg-black/20 border border-black/10 dark:border-white/10 shadow-sm">
            <Icons.star className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 fill-yellow-500" />
          </div>
        </div>
        {achievement.date && (
          <p className="text-xs text-muted-foreground/60 mt-auto">
            {achievement.date}
          </p>
        )}
      </div>
    </div>
  );
}

