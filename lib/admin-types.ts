// Types for admin operations - matches config file interfaces
import { ValidSkills, ValidCategory, ValidExpType } from "@/config/constants";

export interface AdminProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: string; // ISO string for easier handling
  endDate: string;
  companyLogoImg: string;
  descriptionDetails: {
    paragraphs: string[];
    bullets: string[];
  };
  pagesInfoArr: {
    title: string;
    imgArr: string[];
    description?: string;
  }[];
}

export interface AdminExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
  logo?: string;
  experienceLetterUrl?: string;
}

export interface AdminSkillsInterface {
  name: string;
  description: string;
  rating: number;
  iconKey?: string;
  category?: "Core Stack" | "DevOps & Productivity Tools" | "Professional Skills";
}

export interface AdminContributionsInterface {
  repo: string;
  contibutionDescription: string;
  repoOwner: string;
  link: string;
  techStack?: ValidSkills[];
}

export interface AdminSiteConfig {
  name: string;
  authorName: string;
  username: string;
  description: string;
  url: string;
  links: {
    twitter: string;
    github: string;
    linkedin: string;
  };
  ogImage: string;
  iconIco: string;
  logoIcon: string;
  keywords: string[];
}

export interface AdminSocialInterface {
  name: string;
  username: string;
  icon: string;
  link: string;
}

