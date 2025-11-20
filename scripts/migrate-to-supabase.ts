/**
 * Migration Script: Static Config → Supabase
 * 
 * This script migrates all data from static config files to Supabase.
 * Run this once after setting up your Supabase database.
 * 
 * Usage:
 *   npx tsx scripts/migrate-to-supabase.ts
 * 
 * Make sure to set your environment variables first:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY (for admin operations)
 */

// Load environment variables from .env file FIRST
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env') });

import { createClient } from '@supabase/supabase-js';
import { Projects } from '../config/projects';
import { experiences } from '../config/experience';
import { skillsUnsorted } from '../config/skills';
import { contributionsUnsorted } from '../config/contributions';
import { siteConfig } from '../config/site';
import { SocialLinks } from '../config/socials';
import { codingStats, achievements } from '../config/stats';
import { Icons } from '../components/common/icons';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL');
  console.error('   SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateProjects() {
  console.log('📁 Migrating projects...');
  
  for (const project of Projects) {
    const projectData = {
      id: project.id,
      type: project.type,
      company_name: project.companyName,
      category: project.category,
      short_description: project.shortDescription,
      website_link: project.websiteLink,
      github_link: project.githubLink,
      tech_stack: project.techStack,
      start_date: project.startDate.toISOString().split('T')[0],
      end_date: project.endDate.toISOString().split('T')[0],
      company_logo_img: project.companyLogoImg || '',
      description_paragraphs: project.descriptionDetails.paragraphs,
      description_bullets: project.descriptionDetails.bullets,
      pages_info: project.pagesInfoArr.map(page => ({
        title: page.title,
        imgArr: page.imgArr,
        description: page.description,
      })),
      is_featured: project.id !== 'thronelang', // Exclude ThroneLang from featured
      display_order: 0,
    };

    const { error } = await supabase
      .from('projects')
      .upsert(projectData, { onConflict: 'id' });

    if (error) {
      console.error(`   ❌ Error migrating project ${project.id}:`, error.message);
    } else {
      console.log(`   ✅ Migrated project: ${project.companyName}`);
    }
  }
}

async function migrateExperiences() {
  console.log('💼 Migrating experiences...');
  
  for (const exp of experiences) {
    const isPresent = exp.endDate === 'Present';
    const experienceData = {
      id: exp.id,
      position: exp.position,
      company: exp.company,
      location: exp.location,
      start_date: exp.startDate.toISOString().split('T')[0],
      end_date: isPresent ? null : (exp.endDate instanceof Date ? exp.endDate.toISOString().split('T')[0] : null),
      is_present: isPresent,
      description: exp.description,
      achievements: exp.achievements,
      skills: exp.skills,
      company_url: exp.companyUrl,
      logo: exp.logo,
      experience_letter_url: exp.experienceLetterUrl,
      display_order: 0,
    };

    const { error } = await supabase
      .from('experience')
      .upsert(experienceData, { onConflict: 'id' });

    if (error) {
      console.error(`   ❌ Error migrating experience ${exp.id}:`, error.message);
    } else {
      console.log(`   ✅ Migrated experience: ${exp.position} at ${exp.company}`);
    }
  }
}

async function migrateSkills() {
  console.log('⚡ Migrating skills...');
  
  for (let i = 0; i < skillsUnsorted.length; i++) {
    const skill = skillsUnsorted[i];
    const skillData = {
      name: skill.name,
      description: skill.description,
      rating: skill.rating,
      icon_key: skill.iconKey,
      category: skill.category,
      display_order: i,
    };

    const { error } = await supabase
      .from('skills')
      .upsert(skillData, { onConflict: 'name' });

    if (error) {
      console.error(`   ❌ Error migrating skill ${skill.name}:`, error.message);
    } else {
      console.log(`   ✅ Migrated skill: ${skill.name}`);
    }
  }
}

async function migrateContributions() {
  console.log('🌟 Migrating contributions...');
  
  for (let i = 0; i < contributionsUnsorted.length; i++) {
    const contrib = contributionsUnsorted[i];
    const contributionData = {
      repo: contrib.repo,
      contribution_description: contrib.contibutionDescription,
      repo_owner: contrib.repoOwner,
      link: contrib.link,
      tech_stack: contrib.techStack || [],
      is_featured: i < 3, // First 3 are featured
      display_order: i,
    };

    // Check if contribution already exists
    const { data: existing } = await supabase
      .from('contributions')
      .select('id')
      .eq('repo', contrib.repo)
      .single();

    let error;
    if (existing) {
      // Update existing
      const { error: updateError } = await supabase
        .from('contributions')
        .update(contributionData)
        .eq('id', existing.id);
      error = updateError;
    } else {
      // Insert new
      const { error: insertError } = await supabase
        .from('contributions')
        .insert(contributionData);
      error = insertError;
    }

    if (error) {
      console.error(`   ❌ Error migrating contribution ${contrib.repo}:`, error.message);
    } else {
      console.log(`   ✅ Migrated contribution: ${contrib.repo}`);
    }
  }
}

async function migrateSiteConfig() {
  console.log('⚙️ Migrating site config...');
  
  const siteData = {
    id: 'main',
    name: siteConfig.name,
    author_name: siteConfig.authorName,
    username: siteConfig.username,
    description: siteConfig.description,
    url: siteConfig.url,
    twitter_link: siteConfig.links.twitter,
    github_link: siteConfig.links.github,
    linkedin_link: siteConfig.links.linkedin,
    og_image: siteConfig.ogImage,
    icon_ico: siteConfig.iconIco,
    logo_icon: siteConfig.logoIcon,
    keywords: siteConfig.keywords,
  };

  const { error } = await supabase
    .from('site_config')
    .upsert(siteData, { onConflict: 'id' });

  if (error) {
    console.error('   ❌ Error migrating site config:', error.message);
  } else {
    console.log('   ✅ Migrated site config');
  }
}

async function migrateSocials() {
  console.log('🔗 Migrating social links...');
  
  // Map icon components to icon keys
  const iconMap: Record<string, string> = {
    [Icons.gitHub.toString()]: 'gitHub',
    [Icons.linkedin.toString()]: 'linkedin',
    [Icons.zap.toString()]: 'zap',
    [Icons.gmail.toString()]: 'gmail',
  };

  for (let i = 0; i < SocialLinks.length; i++) {
    const social = SocialLinks[i];
    const iconKey = iconMap[social.icon.toString()] || 'gitHub';
    
    const socialData = {
      name: social.name,
      username: social.username,
      icon_key: iconKey,
      link: social.link,
      display_order: i,
    };

    // Check if social already exists
    const { data: existing } = await supabase
      .from('socials')
      .select('id')
      .eq('name', social.name)
      .single();

    let error;
    if (existing) {
      // Update existing
      const { error: updateError } = await supabase
        .from('socials')
        .update(socialData)
        .eq('id', existing.id);
      error = updateError;
    } else {
      // Insert new
      const { error: insertError } = await supabase
        .from('socials')
        .insert(socialData);
      error = insertError;
    }

    if (error) {
      console.error(`   ❌ Error migrating social ${social.name}:`, error.message);
    } else {
      console.log(`   ✅ Migrated social: ${social.name}`);
    }
  }
}

async function migrateStats() {
  console.log('📊 Migrating stats...');
  
  for (let i = 0; i < codingStats.length; i++) {
    const stat = codingStats[i];
    const statData = {
      id: stat.id,
      platform: stat.platform,
      icon: stat.icon,
      label: stat.label,
      value: stat.value.toString(),
      link: stat.link,
      description: stat.description,
      color: stat.color,
      display_order: i,
    };

    const { error } = await supabase
      .from('stats')
      .upsert(statData, { onConflict: 'id' });

    if (error) {
      console.error(`   ❌ Error migrating stat ${stat.id}:`, error.message);
    } else {
      console.log(`   ✅ Migrated stat: ${stat.platform}`);
    }
  }
}

async function migrateAchievements() {
  console.log('🏆 Migrating achievements...');
  
  for (let i = 0; i < achievements.length; i++) {
    const achievement = achievements[i];
    const achievementData = {
      id: achievement.id,
      title: achievement.title,
      description: achievement.description,
      date: achievement.date,
      icon: achievement.icon,
      link: achievement.link,
      display_order: i,
    };

    const { error } = await supabase
      .from('achievements')
      .upsert(achievementData, { onConflict: 'id' });

    if (error) {
      console.error(`   ❌ Error migrating achievement ${achievement.id}:`, error.message);
    } else {
      console.log(`   ✅ Migrated achievement: ${achievement.title}`);
    }
  }
}

async function main() {
  console.log('🚀 Starting migration to Supabase...\n');

  try {
    await migrateProjects();
    await migrateExperiences();
    await migrateSkills();
    await migrateContributions();
    await migrateSiteConfig();
    await migrateSocials();
    await migrateStats();
    await migrateAchievements();

    console.log('\n✅ Migration completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Verify data in Supabase dashboard');
    console.log('   2. Test the website to ensure data loads correctly');
    console.log('   3. Update admin panel if needed');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

main();

