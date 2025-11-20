-- Portfolio Database Schema for Supabase
-- This schema supports all portfolio data: projects, experience, skills, contributions, site config, socials, and stats

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('Personal', 'Professional')),
  company_name TEXT NOT NULL,
  category TEXT[] NOT NULL,
  short_description TEXT NOT NULL,
  website_link TEXT,
  github_link TEXT,
  tech_stack TEXT[] NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  company_logo_img TEXT,
  description_paragraphs TEXT[] NOT NULL DEFAULT '{}',
  description_bullets TEXT[] NOT NULL DEFAULT '{}',
  pages_info JSONB[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experience Table
CREATE TABLE IF NOT EXISTS experience (
  id TEXT PRIMARY KEY,
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_present BOOLEAN DEFAULT false,
  description TEXT[] NOT NULL DEFAULT '{}',
  achievements TEXT[] NOT NULL DEFAULT '{}',
  skills TEXT[] NOT NULL DEFAULT '{}',
  company_url TEXT,
  logo TEXT,
  experience_letter_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  icon_key TEXT,
  category TEXT CHECK (category IN ('Core Stack', 'DevOps & Productivity Tools', 'Professional Skills')),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contributions Table
CREATE TABLE IF NOT EXISTS contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  repo TEXT NOT NULL,
  contribution_description TEXT NOT NULL,
  repo_owner TEXT NOT NULL,
  link TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site Config Table (single row)
CREATE TABLE IF NOT EXISTS site_config (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL,
  author_name TEXT NOT NULL,
  username TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  twitter_link TEXT,
  github_link TEXT NOT NULL,
  linkedin_link TEXT,
  og_image TEXT,
  icon_ico TEXT,
  logo_icon TEXT,
  keywords TEXT[] DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS socials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  icon_key TEXT,
  link TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stats Table
CREATE TABLE IF NOT EXISTS stats (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL,
  icon TEXT,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  link TEXT NOT NULL,
  description TEXT,
  color TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT,
  icon TEXT,
  link TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(type);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_experience_display_order ON experience(display_order);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_display_order ON skills(display_order);
CREATE INDEX IF NOT EXISTS idx_contributions_featured ON contributions(is_featured);
CREATE INDEX IF NOT EXISTS idx_contributions_display_order ON contributions(display_order);
CREATE INDEX IF NOT EXISTS idx_socials_display_order ON socials(display_order);
CREATE INDEX IF NOT EXISTS idx_stats_display_order ON stats(display_order);
CREATE INDEX IF NOT EXISTS idx_achievements_display_order ON achievements(display_order);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contributions_updated_at BEFORE UPDATE ON contributions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_config_updated_at BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_socials_updated_at BEFORE UPDATE ON socials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON achievements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE socials ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Public read access (anonymous users can read)
CREATE POLICY "Public read access for projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read access for experience" ON experience
  FOR SELECT USING (true);

CREATE POLICY "Public read access for skills" ON skills
  FOR SELECT USING (true);

CREATE POLICY "Public read access for contributions" ON contributions
  FOR SELECT USING (true);

CREATE POLICY "Public read access for site_config" ON site_config
  FOR SELECT USING (true);

CREATE POLICY "Public read access for socials" ON socials
  FOR SELECT USING (true);

CREATE POLICY "Public read access for stats" ON stats
  FOR SELECT USING (true);

CREATE POLICY "Public read access for achievements" ON achievements
  FOR SELECT USING (true);

-- Admin write access (authenticated users with admin role)
-- Note: You'll need to set up authentication and add a user_roles table
-- For now, we'll allow authenticated users to write (you can restrict this further)
-- In production, you should use Supabase Auth and check for admin role

-- For development, you can temporarily disable RLS or create service role policies
-- For production, create proper admin policies based on your auth setup

