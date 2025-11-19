import fs from "fs/promises";
import path from "path";

// Write projects config
export async function writeProjectsConfig(projects: any[]): Promise<void> {
  const filePath = path.join(process.cwd(), "config/projects.ts");
  const imports = `import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

`;

  function formatPagesInfo(pagesInfo: any[]): string {
    return pagesInfo
      .map(
        (page) => `      {
        title: ${JSON.stringify(page.title)},
        ${page.description ? `description: ${JSON.stringify(page.description)},` : ""}
        imgArr: ${JSON.stringify(page.imgArr)},
      }`
      )
      .join(",\n");
  }

  const projectsCode = projects
    .map((p) => {
      const startDate = p.startDate ? `new Date("${p.startDate}")` : "new Date()";
      const endDate = p.endDate ? `new Date("${p.endDate}")` : "new Date()";
      return `  {
    id: ${JSON.stringify(p.id)},
    companyName: ${JSON.stringify(p.companyName)},
    type: ${JSON.stringify(p.type)},
    category: ${JSON.stringify(p.category)},
    shortDescription: ${JSON.stringify(p.shortDescription)},
    ${p.websiteLink ? `websiteLink: ${JSON.stringify(p.websiteLink)},` : ""}
    ${p.githubLink ? `githubLink: ${JSON.stringify(p.githubLink)},` : ""}
    techStack: ${JSON.stringify(p.techStack)},
    startDate: ${startDate},
    endDate: ${endDate},
    companyLogoImg: ${JSON.stringify(p.companyLogoImg)},
    pagesInfoArr: [
${formatPagesInfo(p.pagesInfoArr)}
    ],
    descriptionDetails: {
      paragraphs: ${JSON.stringify(p.descriptionDetails.paragraphs)},
      bullets: ${JSON.stringify(p.descriptionDetails.bullets)},
    },
  }`;
    })
    .join(",\n");

  const content = `${imports}export const Projects: ProjectInterface[] = [
${projectsCode}
];

// Featured projects (exclude ThroneLang from home page as requested)
export const featuredProjects = Projects.filter(p => p.id !== "thronelang").slice(0, 3);
`;

  await fs.writeFile(filePath, content, "utf-8");
}

// Write experience config
export async function writeExperienceConfig(experiences: any[]): Promise<void> {
  const filePath = path.join(process.cwd(), "config/experience.ts");
  const imports = `import { ValidSkills } from "./constants";

export interface ExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | "Present";
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
  logo?: string;
  experienceLetterUrl?: string;
}

`;

  const experiencesCode = experiences
    .map((e) => {
      const startDate = e.startDate ? `new Date("${e.startDate}")` : "new Date()";
      const endDate = e.endDate === "Present" ? '"Present"' : e.endDate ? `new Date("${e.endDate}")` : "new Date()";
      return `  {
    id: ${JSON.stringify(e.id)},
    position: ${JSON.stringify(e.position)},
    company: ${JSON.stringify(e.company)},
    location: ${JSON.stringify(e.location)},
    startDate: ${startDate},
    endDate: ${endDate},
    description: ${JSON.stringify(e.description)},
    achievements: ${JSON.stringify(e.achievements)},
    skills: ${JSON.stringify(e.skills)},
    ${e.companyUrl ? `companyUrl: ${JSON.stringify(e.companyUrl)},` : ""}
    ${e.logo ? `logo: ${JSON.stringify(e.logo)},` : ""}
    ${e.experienceLetterUrl ? `experienceLetterUrl: ${JSON.stringify(e.experienceLetterUrl)},` : ""}
  }`;
    })
    .join(",\n");

  const content = `${imports}export const experiences: ExperienceInterface[] = [
${experiencesCode}
];
`;

  await fs.writeFile(filePath, content, "utf-8");
}

// Write skills config
export async function writeSkillsConfig(skills: any[]): Promise<void> {
  const filePath = path.join(process.cwd(), "config/skills.ts");
  const imports = `export type SkillCategory = "Core Stack" | "DevOps & Productivity Tools" | "Professional Skills";

export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  iconKey?: string;
  category?: SkillCategory;
}

`;

  const skillsCode = skills
    .map((s) => {
      return `  {
    name: ${JSON.stringify(s.name)},
    description: ${JSON.stringify(s.description)},
    rating: ${s.rating},
    ${s.iconKey ? `iconKey: ${JSON.stringify(s.iconKey)},` : ""}
    ${s.category ? `category: ${JSON.stringify(s.category)},` : ""}
  }`;
    })
    .join(",\n");

  const content = `${imports}export const skillsUnsorted: skillsInterface[] = [
${skillsCode}
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
`;

  await fs.writeFile(filePath, content, "utf-8");
}

// Write contributions config
export async function writeContributionsConfig(contributions: any[]): Promise<void> {
  const filePath = path.join(process.cwd(), "config/contributions.ts");
  const imports = `import { ValidSkills } from "./constants";

export interface contributionsInterface {
  repo: string;
  contibutionDescription: string;
  repoOwner: string;
  link: string;
  techStack?: ValidSkills[];
}

`;

  const contributionsCode = contributions
    .map((c) => {
      return `  {
    repo: ${JSON.stringify(c.repo)},
    contibutionDescription: ${JSON.stringify(c.contibutionDescription)},
    repoOwner: ${JSON.stringify(c.repoOwner)},
    link: ${JSON.stringify(c.link)},
    ${c.techStack && c.techStack.length > 0 ? `techStack: ${JSON.stringify(c.techStack)},` : ""}
  }`;
    })
    .join(",\n");

  const content = `${imports}export const contributionsUnsorted: contributionsInterface[] = [
${contributionsCode}
];

export const featuredContributions: contributionsInterface[] =
  contributionsUnsorted.slice(0, 3);
`;

  await fs.writeFile(filePath, content, "utf-8");
}

// Write site config
export async function writeSiteConfig(site: any): Promise<void> {
  const filePath = path.join(process.cwd(), "config/site.ts");
  const content = `export const siteConfig = ${JSON.stringify(site, null, 2)};
`;

  await fs.writeFile(filePath, content, "utf-8");
}

// Write social links config
export async function writeSocialConfig(socials: any[]): Promise<void> {
  const filePath = path.join(process.cwd(), "config/socials.ts");
  const imports = `import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

`;

  const socialsCode = socials
    .map((s) => {
      // Handle icon - if it's a string like "Icons.gitHub", use it directly, otherwise try to extract from object
      const iconValue = typeof s.icon === "string" ? s.icon : s.icon?.name || "Icons.gitHub";
      return `  {
    name: ${JSON.stringify(s.name)},
    username: ${JSON.stringify(s.username)},
    icon: ${iconValue},
    link: ${JSON.stringify(s.link)},
  }`;
    })
    .join(",\n");

  const content = `${imports}export const SocialLinks: SocialInterface[] = [
${socialsCode}
];
`;

  await fs.writeFile(filePath, content, "utf-8");
}

