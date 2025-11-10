"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
        <Icons.sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  // Determine which icon to show based on current theme
  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return <Icons.moon className="h-4 w-4 transition-all" />;
      case "retro":
        return <Icons.retro className="h-4 w-4 transition-all" />;
      case "cyberpunk":
        return <Icons.cyberpunk className="h-4 w-4 transition-all" />;
      case "paper":
        return <Icons.paper className="h-4 w-4 transition-all" />;
      case "aurora":
        return <Icons.aurora className="h-4 w-4 transition-all" />;
      case "synthwave":
        return <Icons.synthwave className="h-4 w-4 transition-all" />;
      case "system":
        return <Icons.laptop className="h-4 w-4 transition-all" />;
      case "light":
      default:
        return <Icons.sun className="h-4 w-4 transition-all" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0 relative">
          {getThemeIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Icons.sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Icons.moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("retro")}>
          <Icons.retro className="mr-2 h-4 w-4" />
          <span>Retro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("cyberpunk")}>
          <Icons.cyberpunk className="mr-2 h-4 w-4" />
          <span>Cyberpunk</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("paper")}>
          <Icons.paper className="mr-2 h-4 w-4" />
          <span>Paper</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("aurora")}>
          <Icons.aurora className="mr-2 h-4 w-4" />
          <span>Aurora</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("synthwave")}>
          <Icons.synthwave className="mr-2 h-4 w-4" />
          <span>Synthwave</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Icons.laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
