import { supabase } from './client';
import { supabaseServer, supabaseAdmin } from './server';
import type { ProjectInterface } from '@/config/projects';
import type { ExperienceInterface } from '@/config/experience';
import type { skillsInterface } from '@/config/skills';
import type { contributionsInterface } from '@/config/contributions';
import type { StatItem, AchievementItem } from '@/config/stats';

// Database types (matching our schema)
export interface ProjectRow {
  id: string;
  type: 'Personal' | 'Professional';
  company_name: string;
  category: string[];
  short_description: string;
  website_link?: string;
  github_link?: string;
  tech_stack: string[];
  start_date: string;
  end_date: string;
  company_logo_img?: string;
  description_paragraphs: string[];
  description_bullets: string[];
  pages_info: any[];
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ExperienceRow {
  id: string;
  position: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_present: boolean;
  description: string[];
  achievements: string[];
  skills: string[];
  company_url?: string;
  logo?: string;
  experience_letter_url?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface SkillRow {
  id: string;
  name: string;
  description: string;
  rating: number;
  icon_key?: string;
  category?: 'Core Stack' | 'DevOps & Productivity Tools' | 'Professional Skills';
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContributionRow {
  id: string;
  repo: string;
  contribution_description: string;
  repo_owner: string;
  link: string;
  tech_stack?: string[];
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteConfigRow {
  id: string;
  name: string;
  author_name: string;
  username: string;
  description: string;
  url: string;
  twitter_link?: string;
  github_link: string;
  linkedin_link?: string;
  og_image?: string;
  icon_ico?: string;
  logo_icon?: string;
  keywords: string[];
  updated_at: string;
}

export interface SocialRow {
  id: string;
  name: string;
  username: string;
  icon_key?: string;
  link: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface StatRow {
  id: string;
  platform: string;
  icon?: string;
  label: string;
  value: string;
  link: string;
  description?: string;
  color?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface AchievementRow {
  id: string;
  title: string;
  description: string;
  date?: string;
  icon?: string;
  link?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Helper function to transform ProjectRow to ProjectInterface
function transformProject(row: ProjectRow): ProjectInterface {
  return {
    id: row.id,
    type: row.type,
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

// Helper function to transform ExperienceRow to ExperienceInterface
function transformExperience(row: ExperienceRow): ExperienceInterface {
  return {
    id: row.id,
    position: row.position,
    company: row.company,
    location: row.location,
    startDate: new Date(row.start_date),
    endDate: row.is_present ? 'Present' : (row.end_date ? new Date(row.end_date) : new Date()),
    description: row.description,
    achievements: row.achievements,
    skills: row.skills as any[],
    companyUrl: row.company_url,
    logo: row.logo,
    experienceLetterUrl: row.experience_letter_url,
  };
}

// Helper function to transform SkillRow to skillsInterface
function transformSkill(row: SkillRow): skillsInterface {
  return {
    name: row.name,
    description: row.description,
    rating: row.rating,
    iconKey: row.icon_key,
    category: row.category,
  };
}

// Helper function to transform ContributionRow to contributionsInterface
function transformContribution(row: ContributionRow): contributionsInterface {
  return {
    repo: row.repo,
    contibutionDescription: row.contribution_description,
    repoOwner: row.repo_owner,
    link: row.link,
    techStack: row.tech_stack as any[],
  };
}

// Projects Queries
export async function getProjects(): Promise<ProjectInterface[]> {
  const { data, error } = await supabaseServer
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }

  return (data || []).map(transformProject);
}

export async function getFeaturedProjects(): Promise<ProjectInterface[]> {
  const { data, error } = await supabaseServer
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    .order('display_order', { ascending: true })
    .limit(3);

  if (error) {
    console.error('Error fetching featured projects:', error);
    throw error;
  }

  return (data || []).map(transformProject);
}

export async function getProjectById(id: string): Promise<ProjectInterface | null> {
  const { data, error } = await supabaseServer
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('Error fetching project:', error);
    throw error;
  }

  return data ? transformProject(data) : null;
}

// Experience Queries
export async function getExperiences(): Promise<ExperienceInterface[]> {
  const { data, error } = await supabaseServer
    .from('experience')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }

  return (data || []).map(transformExperience);
}

export async function getExperienceById(id: string): Promise<ExperienceInterface | null> {
  const { data, error } = await supabaseServer
    .from('experience')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('Error fetching experience:', error);
    throw error;
  }

  return data ? transformExperience(data) : null;
}

// Skills Queries
export async function getSkills(): Promise<skillsInterface[]> {
  const { data, error } = await supabaseServer
    .from('skills')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }

  return (data || []).map(transformSkill);
}

export async function getCoreSkills(): Promise<skillsInterface[]> {
  const { data, error } = await supabaseServer
    .from('skills')
    .select('*')
    .eq('category', 'Core Stack')
    .order('rating', { ascending: false })
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching core skills:', error);
    throw error;
  }

  return (data || []).map(transformSkill);
}

// Contributions Queries
export async function getContributions(): Promise<contributionsInterface[]> {
  const { data, error } = await supabaseServer
    .from('contributions')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching contributions:', error);
    throw error;
  }

  return (data || []).map(transformContribution);
}

export async function getFeaturedContributions(): Promise<contributionsInterface[]> {
  const { data, error } = await supabaseServer
    .from('contributions')
    .select('*')
    .eq('is_featured', true)
    .order('display_order', { ascending: true })
    .limit(3);

  if (error) {
    console.error('Error fetching featured contributions:', error);
    throw error;
  }

  return (data || []).map(transformContribution);
}

// Site Config Queries
export async function getSiteConfig(): Promise<SiteConfigRow | null> {
  const { data, error } = await supabaseServer
    .from('site_config')
    .select('*')
    .eq('id', 'main')
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('Error fetching site config:', error);
    throw error;
  }

  return data;
}

// Socials Queries
export async function getSocials(): Promise<SocialRow[]> {
  const { data, error } = await supabaseServer
    .from('socials')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching socials:', error);
    throw error;
  }

  return data || [];
}

// Stats Queries
export async function getStats(): Promise<StatItem[]> {
  const { data, error } = await supabaseServer
    .from('stats')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }

  return (data || []).map((row: StatRow) => ({
    id: row.id,
    platform: row.platform,
    icon: row.icon,
    label: row.label,
    value: row.value,
    link: row.link,
    description: row.description,
    color: row.color,
  }));
}

// Achievements Queries
export async function getAchievements(): Promise<AchievementItem[]> {
  const { data, error } = await supabaseServer
    .from('achievements')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching achievements:', error);
    throw error;
  }

  return (data || []).map((row: AchievementRow) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    date: row.date,
    icon: row.icon,
    link: row.link,
  }));
}

