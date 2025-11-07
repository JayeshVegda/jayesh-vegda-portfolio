"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/common/icons";
import { MouseBlurEffect } from "@/components/common/mouse-blur-effect";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export function SocialLinksCard() {
  const { cardRef, isHovering, gradientPosition, handleMouseEnter, handleMouseMove, handleMouseLeave } = useMouseTracking();

  const socialLinks = [
    {
      name: "LinkedIn",
      url: siteConfig.links.linkedin,
      icon: Icons.linkedin,
      description: "Professional network",
    },
    {
      name: "GitHub",
      url: siteConfig.links.github,
      icon: Icons.gitHub,
      description: "Code repositories",
    },
    {
      name: "LeetCode",
      url: siteConfig.links.twitter, // Using twitter for LeetCode as per siteConfig
      icon: Icons.zap,
      description: "Coding challenges",
    },
  ];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-3xl glass-skill-black p-4 md:p-5 w-full h-full">
        {/* Mouse-following blur effect */}
        <MouseBlurEffect isHovering={isHovering} gradientPosition={gradientPosition} />
        
        <div className="relative z-10 flex flex-col h-full justify-center">
          <h2 
            className="text-base font-bold text-foreground mb-3 text-center"
            style={{
              fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Connect With Me
          </h2>
          
          <div className="grid grid-cols-3 gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-3 rounded-xl glass-input",
                    "hover:bg-white/70 dark:hover:bg-black/40 transition-all",
                    "group/item"
                  )}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/60 dark:bg-black/30 border border-black/10 dark:border-white/10 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <Icon className="w-4 h-4 text-foreground" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-foreground text-xs">{social.name}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

