import { supabaseAdmin } from './server';
import type { 
  ProjectRow, 
  ExperienceRow, 
  SkillRow, 
  ContributionRow, 
  SiteConfigRow,
  SocialRow,
  StatRow,
  AchievementRow
} from './queries';

// Admin CRUD Operations

// Projects Admin
export async function createProject(data: Partial<ProjectRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('projects')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateProject(id: string, data: Partial<ProjectRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('projects')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteProject(id: string) {
  const { error } = await supabaseAdmin
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
}

// Experience Admin
export async function createExperience(data: Partial<ExperienceRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('experience')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateExperience(id: string, data: Partial<ExperienceRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('experience')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteExperience(id: string) {
  const { error } = await supabaseAdmin
    .from('experience')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
}

// Skills Admin
export async function createSkill(data: Partial<SkillRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('skills')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateSkill(id: string, data: Partial<SkillRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('skills')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteSkill(id: string) {
  const { error } = await supabaseAdmin
    .from('skills')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
}

// Contributions Admin
export async function createContribution(data: Partial<ContributionRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('contributions')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateContribution(id: string, data: Partial<ContributionRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('contributions')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteContribution(id: string) {
  const { error } = await supabaseAdmin
    .from('contributions')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
}

// Site Config Admin
export async function updateSiteConfig(data: Partial<SiteConfigRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('site_config')
    .upsert({ id: 'main', ...data })
    .select()
    .single();

  if (error) throw error;
  return result;
}

// Socials Admin
export async function createSocial(data: Partial<SocialRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('socials')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateSocial(id: string, data: Partial<SocialRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('socials')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteSocial(id: string) {
  const { error } = await supabaseAdmin
    .from('socials')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
}

// Stats Admin
export async function createStat(data: Partial<StatRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('stats')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateStat(id: string, data: Partial<StatRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('stats')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteStat(id: string) {
  const { error } = await supabaseAdmin
    .from('stats')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
}

// Achievements Admin
export async function createAchievement(data: Partial<AchievementRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('achievements')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateAchievement(id: string, data: Partial<AchievementRow>) {
  const { data: result, error } = await supabaseAdmin
    .from('achievements')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteAchievement(id: string) {
  const { error } = await supabaseAdmin
    .from('achievements')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
}

