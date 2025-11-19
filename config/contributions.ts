import { ValidSkills } from "./constants";

export interface contributionsInterface {
  repo: string;
  contibutionDescription: string;
  repoOwner: string;
  link: string;
  techStack?: ValidSkills[];
}

export const contributionsUnsorted: contributionsInterface[] = [
  {
    repo: "bypass-city-extension",
    contibutionDescription: "Privacy-first Chrome MV3 extension that auto-bypasses 45+ ad shorteners via the bypass.city API with optional context-menu controls and no tracking.",
    repoOwner: "jayeshvegda",
    link: "https://github.com/JayeshVegda/bypass-city-extension",
    techStack: ["Javascript","HTML 5","CSS 3"],
  },
  {
    repo: "Flow.Launcher.Plugin.LaunchNow",
    contibutionDescription: "Flow Launcher plugin that fires multi-site workflows from a single keyword, using JSON-configured engine groups and Flow Launcher SDK integration.",
    repoOwner: "jayeshvegda",
    link: "https://github.com/JayeshVegda/Flow.Launcher.Plugin.LaunchNow",
    techStack: ["Python"],
  },
  {
    repo: "Flow.Launcher.Plugin.WorldClock",
    contibutionDescription: "Python-based world clock for Flow Launcher covering 100+ cities with cached timezone lookups and parallel geolocation for instant results.",
    repoOwner: "jayeshvegda",
    link: "https://github.com/JayeshVegda/Flow.Launcher.Plugin.WorldClock",
    techStack: ["Python"],
  },
  {
    repo: "Flow.Launcher.Plugin.Choco",
    contibutionDescription: "Chocolatey package manager interface inside Flow Launcher featuring PowerShell automation, JSON caching, and real-time package status updates.",
    repoOwner: "jayeshvegda",
    link: "https://github.com/JayeshVegda/Flow.Launcher.Plugin.Choco",
    techStack: ["Python"],
  },
  {
    repo: "Flow.Launcher.Plugin.MovieSearch",
    contibutionDescription: "TMDB-powered movie search plugin delivering poster previews, ratings, and instant IMDb hand-offs directly in Flow Launcher.",
    repoOwner: "jayeshvegda",
    link: "https://github.com/JayeshVegda/Flow.Launcher.Plugin.MovieSearch",
    techStack: ["Python"],
  },
  {
    repo: "LeetMask",
    contibutionDescription: "Chrome extension that toggles LeetCode difficulty labels with a minimal popup UI and fully local MV3 scripting.",
    repoOwner: "jayeshvegda",
    link: "https://github.com/JayeshVegda/LeetMask",
    techStack: ["Javascript","HTML 5","CSS 3"],
  },
  {
    repo: "TGStickerDownloader",
    contibutionDescription: "Telethon automation script that multi-threads Telegram sticker pack downloads with configurable throttling and credential handling.",
    repoOwner: "jayeshvegda",
    link: "https://github.com/JayeshVegda/TGStickerDownloader",
    techStack: ["Python"],
  },
  {
    repo: "LeetSimplify",
    contibutionDescription: "Chrome extension that rewrites LeetCode problems into precise, beginner-friendly explanations while preserving every rule, constraint, and edge case.",
    repoOwner: "JayeshVegda",
    link: "https://github.com/JayeshVegda/LeetSimplify",
    techStack: ["DOM Injection","CSS","JSON Prompts","Local LLM Integration","JavaScript"],
  }
];

export const featuredContributions: contributionsInterface[] =
  contributionsUnsorted.slice(0, 3);
