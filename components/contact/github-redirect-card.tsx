"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { MouseBlurEffect } from "@/components/common/mouse-blur-effect";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { cn } from "@/lib/utils";

export default function GithubRedirectCard() {
  const { cardRef, isHovering, gradientPosition, handleMouseEnter, handleMouseMove, handleMouseLeave } = useMouseTracking();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-3xl glass-skill-black p-4 md:p-5 w-full h-full">
        {/* Mouse-following blur effect */}
        <MouseBlurEffect isHovering={isHovering} gradientPosition={gradientPosition} />
        
        <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
          <div className="w-10 h-10 rounded-full bg-white/60 dark:bg-black/30 border border-black/10 dark:border-white/10 backdrop-blur-sm flex items-center justify-center mb-3 shadow-sm mx-auto">
            <Icons.gitHub className="w-5 h-5 text-foreground" />
          </div>
          
          <h2 
            className="text-lg font-bold text-foreground mb-2"
            style={{
              fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Explore My Work
          </h2>
          <p 
            className="text-xs text-muted-foreground leading-relaxed mb-4"
            style={{
              fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
            }}
          >
            Check out my projects and contributions on GitHub.
          </p>
          
          <Button
            asChild
            className={cn(
              "glass-button rounded-xl h-9 px-5 w-full",
              "text-foreground font-semibold text-xs",
              "hover:scale-[1.02] transition-transform"
            )}
          >
            <Link href="https://github.com/jayeshvegda" target="_blank">
              View GitHub
              <Icons.externalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
