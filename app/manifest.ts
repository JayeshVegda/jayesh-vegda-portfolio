import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jayesh Vegda Portfolio",
    short_name: "Jayesh's Portfolio",
    description:
      "Jayesh Vegda's modern developer portfolio - Full Stack Developer with expertise in React, Node.js, Python, and cloud platforms",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: [
      "portfolio",
      "development",
      "nextjs",
      "react",
      "developer",
      "web development",
      "full stack",
      "programming",
    ],
    lang: "en",
    dir: "ltr",
    scope: "/",
  };
}
