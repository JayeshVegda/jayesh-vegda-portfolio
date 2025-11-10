"use client";

import { Norican } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { siteConfig } from "@/config/site";
import { useLockBody } from "@/hooks/use-lock-body";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/common/icons";

interface MobileNavProps {
  items: any[];
  children?: React.ReactNode;
  onClose: () => void;
}

const norican = Norican({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export function MobileNav({ items, children, onClose }: MobileNavProps) {
  const pathname = usePathname();
  useLockBody();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
        zIndex: 99999,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        overflow: "hidden",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          padding: "1.5rem",
          paddingTop: "4rem",
          paddingBottom: "2rem",
          boxSizing: "border-box",
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            padding: "0.75rem",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            minWidth: "44px",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
          aria-label="Close menu"
        >
          <Icons.close className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link
          href="/"
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "2rem",
            paddingRight: "3rem",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <span className={cn(norican.className, "text-2xl font-normal")}>
            {siteConfig.authorName}
          </span>
        </Link>

        {/* Navigation items */}
        <nav style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "0.75rem", 
          width: "100%",
          flex: 1,
        }}>
          {items.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: "1.25rem 1.5rem",
                  borderRadius: "0.75rem",
                  backgroundColor: isActive ? "rgba(0, 0, 0, 0.1)" : "transparent",
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  fontWeight: isActive ? 600 : 500,
                  minHeight: "52px",
                  transition: "background-color 0.2s",
                }}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Children (like theme toggle) */}
        {children && (
          <div
            style={{
              marginTop: "auto",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              paddingBottom: "1rem",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
