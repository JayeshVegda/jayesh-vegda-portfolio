// Helper functions to transform between frontend format and database format

import type { ProjectInterface } from '@/config/projects';
import type { ExperienceInterface } from '@/config/experience';
import type { skillsInterface } from '@/config/skills';
import type { contributionsInterface } from '@/config/contributions';
import type { ProjectRow, ExperienceRow, SkillRow, ContributionRow } from './queries';

// Project Transformers
export function projectToRow(project: Partial<ProjectInterface>): Partial<ProjectRow> {
  return {
    id: project.id,
    type: project.type,
    company_name: project.companyName,
    category: project.category,
    short_description: project.shortDescription,
    website_link: project.websiteLink,
    github_link: project.githubLink,
    tech_stack: project.techStack,
    start_date: project.startDate instanceof Date ? project.startDate.toISOString().split('T')[0] : project.startDate,
    end_date: project.endDate instanceof Date ? project.endDate.toISOString().split('T')[0] : project.endDate,
    company_logo_img: project.companyLogoImg,
    description_paragraphs: project.descriptionDetails?.paragraphs || [],
    description_bullets: project.descriptionDetails?.bullets || [],
    pages_info: project.pagesInfoArr?.map(page => ({
      title: page.title,
      imgArr: page.imgArr,
      description: page.description,
    })) || [],
    is_featured: (project as any).is_featured || false,
    display_order: (project as any).display_order || 0,
  };
}

export function rowToProject(row: ProjectRow): ProjectInterface {
  return {
    id: row.id,
    type: row.type as 'Personal' | 'Professional',
    companyName: row.company_name,
    category: row.category as any[],
    shortDescription: row.short_description,
    websiteLink: row.website_link,
    githubLink: row.github_link,
    techStack: row.tech_stack as any[],
    startDate: new Date(row.start_date),
    endDate: new Date(row.end_date),
    companyLogoImg: row.company_logo_img || '',
    descriptionDetails: {
      paragraphs: row.description_paragraphs,
      bullets: row.description_bullets,
    },
    pagesInfoArr: row.pages_info.map((page: any) => ({
      title: page.title || '',
      imgArr: page.imgArr || [],
      description: page.description,
    })),
  };
}

// Experience Transformers
export function experienceToRow(experience: Partial<ExperienceInterface>): Partial<ExperienceRow> {
  const isPresent = experience.endDate === 'Present';
  const endDate = isPresent ? null : (experience.endDate instanceof Date ? experience.endDate.toISOString().split('T')[0] : experience.endDate);

  return {
    id: experience.id,
    position: experience.position,
    company: experience.company,
    location: experience.location,
    start_date: experience.startDate instanceof Date ? experience.startDate.toISOString().split('T')[0] : experience.startDate,
    end_date: endDate,
    is_present: isPresent,
    description: experience.description || [],
    achievements: experience.achievements || [],
    skills: experience.skills || [],
    company_url: experience.companyUrl,
    logo: experience.logo,
    experience_letter_url: experience.experienceLetterUrl,
    display_order: (experience as any).display_order || 0,
  };
}

// Skill Transformers
export function skillToRow(skill: Partial<skillsInterface> & { id?: string }): Partial<SkillRow> {
  return {
    id: (skill as any).id,
    name: skill.name,
    description: skill.description,
    rating: skill.rating,
    icon_key: skill.iconKey,
    category: skill.category,
    display_order: (skill as any).display_order || 0,
  };
}

// Contribution Transformers
export function contributionToRow(contribution: Partial<contributionsInterface> & { id?: string }): Partial<ContributionRow> {
  return {
    id: (contribution as any).id,
    repo: contribution.repo,
    contribution_description: contribution.contibutionDescription,
    repo_owner: contribution.repoOwner,
    link: contribution.link,
    tech_stack: contribution.techStack || [],
    is_featured: (contribution as any).is_featured || false,
    display_order: (contribution as any).display_order || 0,
  };
}

