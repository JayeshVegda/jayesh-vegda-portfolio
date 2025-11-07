"use client";

import { useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

export function useMouseTracking() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Mouse tracking with smooth spring animation
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.6 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.6 });
  
  // State for gradient position
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

  // Update gradient position from smooth mouse values
  useMotionValueEvent(smoothMouseX, "change", (x) => {
    setGradientPosition(prev => ({ ...prev, x }));
  });
  
  useMotionValueEvent(smoothMouseY, "change", (y) => {
    setGradientPosition(prev => ({ ...prev, y }));
  });

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(50);
    mouseY.set(50);
  };

  return {
    cardRef,
    isHovering,
    gradientPosition,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  };
}

