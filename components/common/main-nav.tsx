"use client";

import { motion } from "framer-motion";
import { Norican } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Icons } from "@/components/common/icons";
import { MobileNav } from "@/components/common/mobile-nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface MainNavProps {
  items?: any[];
  children?: React.ReactNode;
}

const norican = Norican({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export function MainNav({ items, children }: MainNavProps) {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  return (
    <div className="flex flex-1 items-center gap-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center"
      >
        <Link
          href="/"
          className="hidden items-center space-x-2 rounded-xl px-4 py-2 text-foreground transition hover:opacity-80 md:flex"
        >
          <span className={cn(norican.className, "text-2xl leading-none")}> 
            {siteConfig.authorName}
          </span>
        </Link>
      </motion.div>

      {items?.length ? (
        <nav className="hidden flex-1 items-center justify-center gap-2 md:flex">
          {items.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <motion.div
                key={item.href ?? index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-xl bg-white/8 backdrop-blur-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Link
                  href={item.disabled ? "#" : item.href}
                  className={cn(
                    "relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      ) : null}

      <motion.button
        className="md:hidden inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-foreground transition hover:opacity-80"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.menu />}
        <span>Menu</span>
      </motion.button>

      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
