import { ValidSkills } from "./constants";

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

export const experiences: ExperienceInterface[] = [
  {
    id: "acciojob",
    position: "Full Stack Developer Trainee",
    company: "AccioJob",
    location: "Vadodara, Gujarat",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2025-03-01"),
    description: [
      "Intensive training in Data Structures, Algorithms, and Full-Stack Development with focus on scalable application architecture.",
      "Achieved top 10 ranking by solving 350+ coding problems on AccioJob's competitive programming platform.",
      "Engineered multiple full-stack projects using React, Node.js, and MongoDB following industry best practices.",
      "Collaborated in Agile team environments to deliver robust applications with 95% code coverage in testing.",
    ],
    achievements: [
      "Achieved top 10 ranking by solving 350+ coding problems on AccioJob's competitive programming platform, demonstrating advanced problem-solving skills.",
      "Engineered multiple full-stack projects using React, Node.js, and MongoDB following industry best practices and scalable architecture patterns.",
      "Collaborated in Agile team environments to deliver robust applications with 95% code coverage in testing, ensuring high-quality code delivery.",
      "Intensive training in Data Structures, Algorithms, and Full-Stack Development with focus on scalable application architecture.",
    ],
    skills: ["Problem Solving", "Java", "React", "Node.js", "MongoDB", "Git"],
    companyUrl: "https://acciojob.com",
    logo: "/acciojob.svg",
    experienceLetterUrl: "https://drive.google.com/file/d/1ruZhxRMZy85uEGWYHPgCX0feVzGwARZf/view?usp=sharing",
  },
];
