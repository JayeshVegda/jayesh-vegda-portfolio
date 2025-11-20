import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import SkillsCard from "@/components/skills/skills-card";
import { pagesConfig } from "@/config/pages";
import { getSkills } from "@/lib/supabase/queries";
import type { skillsInterface } from "@/config/skills";

export const metadata: Metadata = {
  title: pagesConfig.skills.metadata.title,
  description: pagesConfig.skills.metadata.description,
};

export const dynamic = 'force-dynamic';

export default async function SkillsPage() {
  let skills: skillsInterface[] = [];
  let error: string | null = null;

  try {
    skills = await getSkills();
  } catch (e) {
    console.error('Error loading skills:', e);
    error = e instanceof Error ? e.message : 'Failed to load skills';
  }

  if (error) {
    return (
      <PageContainer
        title={pagesConfig.skills.title}
        description={pagesConfig.skills.description}
      >
        <div className="text-center py-12">
          <p className="text-destructive">Error loading skills: {error}</p>
          <p className="text-muted-foreground mt-2">Please try refreshing the page.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={pagesConfig.skills.title}
      description={pagesConfig.skills.description}
    >
      {skills.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No skills found.</p>
        </div>
      ) : (
        <SkillsCard skills={skills} />
      )}
    </PageContainer>
  );
}
