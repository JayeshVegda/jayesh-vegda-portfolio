"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { MouseBlurEffect } from "@/components/common/mouse-blur-effect";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export function LetsConnectCard() {
  const { cardRef, isHovering, gradientPosition, handleMouseEnter, handleMouseMove, handleMouseLeave } = useMouseTracking();

  const socialLinks = [
    {
      name: "LinkedIn",
      url: siteConfig.links.linkedin,
      icon: Icons.linkedin,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/jayu.vegda",
      icon: Icons.instagram,
    },
    {
      name: "Telegram",
      url: "https://t.me/iamokwiththis",
      icon: Icons.telegram,
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/919510233829",
      icon: Icons.whatsapp,
    },
  ];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="relative group w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-3xl contact-unified-card p-6 md:p-8 w-full h-full">
        {/* Mouse-following blur effect */}
        <MouseBlurEffect isHovering={isHovering} gradientPosition={gradientPosition} />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Top: GitHub Block */}
          <div className="flex-1 flex flex-col items-center text-center justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-white/60 dark:bg-black/30 border border-black/10 dark:border-white/10 backdrop-blur-sm flex items-center justify-center mb-4 shadow-sm mx-auto">
              <Icons.gitHub className="w-6 h-6 text-foreground" />
            </div>
            
            <h2 
              className="text-lg font-semibold text-foreground mb-2"
              style={{
                fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Explore My Work
            </h2>
            <p 
              className="text-sm text-muted-foreground/80 leading-relaxed mb-4 max-w-xs"
              style={{
                fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
              }}
            >
              Check out my projects and contributions on GitHub.
            </p>
            
            <Button
              asChild
              className={cn(
                "contact-floating-button rounded-xl h-10 px-6 w-full max-w-xs",
                "text-foreground font-semibold text-sm",
                "hover:translate-y-[-2px] transition-all"
              )}
            >
              <Link href="https://github.com/jayeshvegda" target="_blank">
                View GitHub
                <Icons.externalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-4" />

          {/* Bottom: Social Links */}
          <div className="flex-1 flex flex-col justify-center">
            <h3 
              className="text-base font-semibold text-foreground mb-4 text-center"
              style={{
                fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              Connect With Me
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "contact-social-link flex flex-col items-center gap-2 p-4 rounded-xl contact-input",
                      "group/item"
                    )}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/60 dark:bg-black/30 border border-black/10 dark:border-white/10 backdrop-blur-sm flex items-center justify-center shadow-sm contact-social-icon">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground text-xs">{social.name}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

