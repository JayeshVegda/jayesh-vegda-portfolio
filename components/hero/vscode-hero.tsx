"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

import { Icons } from "@/components/common/icons";
import { siteConfig } from "@/config/site";

export function VSCodeHero() {
  const GitHubIcon = Icons?.gitHub;
  const PageIcon = Icons?.page;
  const ContactIcon = Icons?.contact;
  const sectionRef = useRef<HTMLElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const isHovering = useRef(false);

  // Tilt motion values for 3D card effect
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness: 200, damping: 20, mass: 0.5 });
  const tiltYSpring = useSpring(tiltY, { stiffness: 200, damping: 20, mass: 0.5 });
  const scale = useSpring(1, { stiffness: 150, damping: 18, mass: 0.6 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const glassY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Transparent background - no colors, only glass */}
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0 -z-10"
      />

      {/* Main content container */}
      <motion.div
        style={{ y: glassY, opacity }}
        className="container relative z-10 px-3 md:px-4 py-12 md:py-16 lg:py-24 xl:py-28 -mt-[10%]"
      >
        <div className="mx-auto w-full max-w-5xl">
          {/* Central glass card */}
          <div
            ref={glassRef}
            className="relative"
            onMouseMove={(e) => {
              if (!glassRef.current) return;
              const rect = glassRef.current.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              setMousePosition({ x, y });
              // Map cursor position to tilt in degrees (-12deg to 12deg)
              const centerX = x - 50;
              const centerY = y - 50;
              const maxTilt = 12;
              tiltY.set((centerX / 50) * maxTilt); // rotateY by horizontal movement
              tiltX.set((-centerY / 50) * maxTilt); // rotateX by vertical movement
            }}
            onMouseEnter={() => {
              isHovering.current = true;
              scale.set(1.02);
            }}
            onMouseLeave={() => {
              setMousePosition({ x: 50, y: 50 });
              isHovering.current = false;
              tiltX.set(0);
              tiltY.set(0);
              scale.set(1);
            }}
          >
            {/* Perspective wrapper for 3D tilt */}
            <div className="[perspective:1200px]">
              {/* Glass card with backdrop blur and 3D tilt */}
              <motion.div
                style={{
                  rotateX: tiltXSpring,
                  rotateY: tiltYSpring,
                  scale,
                  transformStyle: "preserve-3d",
                }}
                className="relative rounded-2xl md:rounded-3xl border border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-[20px] shadow-2xl p-6 md:p-10 lg:p-16 xl:p-20 overflow-hidden will-change-transform"
              >
              {/* Mouse-following blur effect on background */}
              <div
                className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none transition-all duration-300 ease-out"
                style={{
                  background: `radial-gradient(circle 400px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
                  filter: "blur(60px)",
                  opacity: 0.6,
                }}
              />
              
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                {/* Specular glare that follows the mouse */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(200px 120px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.35), rgba(255,255,255,0.08) 40%, transparent 60%)`,
                    mixBlendMode: "screen",
                    opacity: 0.6,
                  }}
                />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-4 md:space-y-6">
                {/* Name with minimal effects */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-foreground tracking-tight"
                  style={{
                    fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
                    letterSpacing: "-0.02em",
                    lineHeight: "1.1",
                  }}
                >
                  {siteConfig.authorName}
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground/90 max-w-5xl leading-relaxed px-2"
                  style={{
                    fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Turning ideas into fast, reliable, and accessible{" "}
                  <span className="font-semibold text-foreground/95">
                    web applications
                  </span>
                  .
                </motion.p>

                {/* Tech stack badges with effects */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-2 md:mt-4 px-2"
                >
                  {["React", "Node.js", "MongoDB", "Express"].map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -5,
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium bg-white/10 dark:bg-white/5 border border-white/20 backdrop-blur-sm text-foreground/90 cursor-pointer transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                {/* CTA buttons with effects */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-4 md:mt-8 px-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link
                      href={siteConfig.links.github}
                      target="_blank"
                      aria-label="View GitHub profile"
                      className="group inline-flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-6 md:py-3 rounded-xl bg-white/10 dark:bg-white/5 border border-white/20 backdrop-blur-sm text-foreground hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 font-medium text-xs md:text-sm shadow-lg hover:shadow-xl relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                      {GitHubIcon && (
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <GitHubIcon className="h-4 w-4 md:h-5 md:w-5 relative z-10" />
                        </motion.div>
                      )}
                      <span className="relative z-10">GitHub</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <a
                      href="/Jayesh_Vegda_Final_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-6 md:py-3 rounded-xl bg-white/10 dark:bg-white/5 border border-white/20 backdrop-blur-sm text-foreground hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 font-medium text-xs md:text-sm shadow-lg hover:shadow-xl relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                      {PageIcon && <PageIcon className="h-3.5 w-3.5 md:h-4 md:w-4 relative z-10" />}
                      <span className="relative z-10">Resume</span>
                    </a>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <a
                      href="tel:+919510233829"
                      className="group inline-flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-6 md:py-3 rounded-xl bg-white/10 dark:bg-white/5 border border-white/20 backdrop-blur-sm text-foreground hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 font-medium text-xs md:text-sm shadow-lg hover:shadow-xl relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                      {ContactIcon && <ContactIcon className="h-3.5 w-3.5 md:h-4 md:w-4 relative z-10" />}
                      <span className="relative z-10">Contact</span>
                    </a>
                  </motion.div>
                </motion.div>
              </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 md:mt-12 flex justify-center"
          >
            <Link
              href="#skills"
              aria-label="Scroll to skills"
              className="inline-flex flex-col items-center gap-2 text-xs md:text-sm text-muted-foreground/70 hover:text-foreground/90 transition-colors"
            >
              <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {Icons?.chevronDown && <Icons.chevronDown className="h-4 w-4 md:h-5 md:w-5" />}
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
