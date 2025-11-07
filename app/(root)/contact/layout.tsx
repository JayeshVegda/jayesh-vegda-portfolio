"use client";

import { useEffect } from "react";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Hide footer on contact page
    const footer = document.querySelector("footer") as HTMLElement | null;
    const main = document.querySelector("main.container") as HTMLElement | null;
    
    if (footer) {
      footer.style.display = "none";
    }
    if (main) {
      main.style.paddingTop = "0";
      main.style.paddingBottom = "0";
      main.style.minHeight = "calc(100vh - 100px)";
    }

    return () => {
      // Restore footer when leaving contact page
      if (footer) {
        footer.style.display = "";
      }
      if (main) {
        main.style.paddingTop = "";
        main.style.paddingBottom = "";
        main.style.minHeight = "";
      }
    };
  }, []);

  return <>{children}</>;
}

