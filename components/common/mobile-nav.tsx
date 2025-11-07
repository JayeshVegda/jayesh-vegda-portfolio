import { Norican } from "next/font/google";
import Link from "next/link";
import * as React from "react";

import { MouseBlurEffect } from "@/components/common/mouse-blur-effect";
import { useMouseTracking } from "@/hooks/use-mouse-tracking";
import { siteConfig } from "@/config/site";
import { useLockBody } from "@/hooks/use-lock-body";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: any[];
  children?: React.ReactNode;
}

const norican = Norican({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody();

  const {
    cardRef,
    isHovering,
    gradientPosition,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  } = useMouseTracking();

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto bg-black/50 px-6 pb-32 pt-6 backdrop-blur-xl animate-in slide-in-from-top-10 md:hidden"
      )}
    >
      <div
        ref={cardRef}
        className="relative z-20 grid gap-6 rounded-2xl glass-skill-black p-6 text-foreground shadow-[0_25px_60px_rgba(15,23,42,0.35)]"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <MouseBlurEffect isHovering={isHovering} gradientPosition={gradientPosition} />

        <Link href="/" className="flex items-center space-x-2">
          <span className={cn(norican.className, "text-2xl")}>
            {siteConfig.authorName}
          </span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm gap-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "relative flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 transition hover:bg-white/5",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
