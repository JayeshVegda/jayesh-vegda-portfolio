export type SkillCategory = "Core Stack" | "DevOps & Productivity Tools" | "Professional Skills";

export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  iconKey?: string;
  category?: SkillCategory;
}

export const skillsUnsorted: skillsInterface[] = [
  // Core Stack - Languages
  {
    name: "Java",
    description: "Object-oriented programming language for building robust, scalable applications.",
    rating: 5,
    iconKey: "java",
    category: "Core Stack",
  },
  {
    name: "Python",
    description: "Versatile programming language for web development, data analysis, and automation.",
    rating: 5,
    iconKey: "python",
    category: "Core Stack",
  },
  {
    name: "C++",
    description: "High-performance programming language for system-level and application development.",
    rating: 4,
    iconKey: "cpp",
    category: "Core Stack",
  },
  {
    name: "JavaScript",
    description: "Dynamic scripting language for creating interactive and responsive web experiences.",
    rating: 5,
    iconKey: "javascript",
    category: "Core Stack",
  },
  {
    name: "TypeScript",
    description: "Enhanced JavaScript with static types, making code more understandable and reliable.",
    rating: 4,
    iconKey: "typescript",
    category: "Core Stack",
  },
  {
    name: "HTML/CSS",
    description: "Markup and styling languages for creating structured and visually appealing web pages.",
    rating: 5,
    iconKey: "html5",
    category: "Core Stack",
  },
  {
    name: "SQL",
    description: "Structured query language for managing and manipulating relational databases.",
    rating: 4,
    iconKey: "mysql",
    category: "Core Stack",
  },
  {
    name: "Node.js",
    description: "JavaScript runtime for building scalable server-side applications and APIs.",
    rating: 5,
    iconKey: "nodejs",
    category: "Core Stack",
  },
  // Core Stack - Frameworks
  {
    name: "React",
    description: "Popular JavaScript library for building interactive user interfaces with components.",
    rating: 5,
    iconKey: "react",
    category: "Core Stack",
  },
  {
    name: "Django",
    description: "High-level Python web framework for rapid development and clean design patterns.",
    rating: 4,
    iconKey: "django",
    category: "Core Stack",
  },
  {
    name: "Flask",
    description: "Lightweight Python web framework for building scalable and flexible applications.",
    rating: 4,
    iconKey: "flask",
    category: "Core Stack",
  },
  {
    name: "Laravel",
    description: "Elegant PHP framework with expressive syntax for modern web development.",
    rating: 3,
    iconKey: "laravel",
    category: "Core Stack",
  },
  {
    name: "Express.js",
    description: "Fast, unopinionated Node.js framework for building web applications and APIs.",
    rating: 5,
    iconKey: "express",
    category: "Core Stack",
  },
  {
    name: "Bootstrap",
    description: "Popular CSS framework for quickly creating responsive and appealing web designs.",
    rating: 4,
    iconKey: "bootstrap",
    category: "Core Stack",
  },
  {
    name: "PHP",
    description: "Server-side scripting language for web development and dynamic content creation.",
    rating: 4,
    iconKey: "php",
    category: "Core Stack",
  },
  // Core Stack - Databases
  {
    name: "MongoDB",
    description: "NoSQL database for storing and retrieving data with flexible schema design.",
    rating: 5,
    iconKey: "mongodb",
    category: "Core Stack",
  },
  {
    name: "MySQL",
    description: "Relational database management system for efficient data organization and queries.",
    rating: 4,
    iconKey: "mysql",
    category: "Core Stack",
  },
  // DevOps & Productivity Tools
  {
    name: "Git",
    description: "Distributed version control system for tracking changes and collaborative development.",
    rating: 5,
    iconKey: "gitHub",
    category: "DevOps & Productivity Tools",
  },
  {
    name: "Linux",
    description: "Open-source operating system for development, server management, and system administration.",
    rating: 4,
    iconKey: "linux",
    category: "DevOps & Productivity Tools",
  },
  {
    name: "Docker",
    description: "Containerization platform for building, shipping, and running applications efficiently.",
    rating: 4,
    iconKey: "docker",
    category: "DevOps & Productivity Tools",
  },
  {
    name: "Azure",
    description: "Cloud computing platform for building, deploying, and managing applications at scale.",
    rating: 3,
    iconKey: "azure",
    category: "DevOps & Productivity Tools",
  },
  {
    name: "Vercel",
    description: "Platform for deploying and hosting modern web applications with ease.",
    rating: 4,
    iconKey: "vercel",
    category: "DevOps & Productivity Tools",
  },
  {
    name: "VS Code",
    description: "Lightweight code editor with powerful extensions for efficient development workflows.",
    rating: 5,
    iconKey: "vscode",
    category: "DevOps & Productivity Tools",
  },
  {
    name: "Visual Studio",
    description: "Integrated development environment for building applications across multiple platforms.",
    rating: 4,
    iconKey: "visualstudio",
    category: "DevOps & Productivity Tools",
  },
  // Professional Skills
  {
    name: "Problem Solving",
    description: "Analytical thinking and systematic approach to tackling complex challenges.",
    rating: 5,
    iconKey: "javascript",
    category: "Professional Skills",
  },
  {
    name: "Teamwork",
    description: "Collaborative approach to working effectively within diverse team environments.",
    rating: 5,
    iconKey: "javascript",
    category: "Professional Skills",
  },
  {
    name: "Communication",
    description: "Clear and effective exchange of ideas with technical and non-technical stakeholders.",
    rating: 5,
    iconKey: "javascript",
    category: "Professional Skills",
  },
  {
    name: "Time Management",
    description: "Efficient organization and prioritization of tasks to meet deadlines consistently.",
    rating: 5,
    iconKey: "javascript",
    category: "Professional Skills",
  },
  {
    name: "Adaptability",
    description: "Quick learning and flexibility to adapt to new technologies and changing requirements.",
    rating: 5,
    iconKey: "javascript",
    category: "Professional Skills",
  },
  {
    name: "Fast Learner",
    description: "Ability to quickly grasp new concepts, technologies, and development patterns.",
    rating: 5,
    iconKey: "javascript",
    category: "Professional Skills",
  },
];

export const skills = skillsUnsorted
  .slice()
  .sort((a, b) => {
    // Sort by category first, then by rating
    const categoryOrder: Record<SkillCategory, number> = {
      "Core Stack": 0,
      "DevOps & Productivity Tools": 1,
      "Professional Skills": 2,
    };
    const categoryDiff = (categoryOrder[a.category || "Core Stack"] || 99) - (categoryOrder[b.category || "Core Stack"] || 99);
    if (categoryDiff !== 0) return categoryDiff;
    return b.rating - a.rating;
  });

export const coreSkills = skills.filter((skill) => skill.category === "Core Stack");

export const featuredSkills = skills.slice(0, 6);
