import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import Timeline from "@/components/experience/timeline";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { getExperiences } from "@/lib/supabase/queries";
import type { ExperienceInterface } from "@/config/experience";

export const metadata: Metadata = {
  title: `${pagesConfig.experience.metadata.title} | Professional Experience Timeline`,
  description: `${pagesConfig.experience.metadata.description} Explore my professional journey and career milestones in software development.`,
  keywords: [
    "experience timeline",
    "professional experience",
    "software developer experience",
    "developer portfolio",
    "work experience",
  ],
  alternates: {
    canonical: `${siteConfig.url}/experience`,
  },
};

export const dynamic = 'force-dynamic';

export default async function ExperiencePage() {
  let experiences: ExperienceInterface[] = [];
  let error: string | null = null;

  try {
    experiences = await getExperiences();
  } catch (e) {
    console.error('Error loading experiences:', e);
    error = e instanceof Error ? e.message : 'Failed to load experiences';
  }

  if (error) {
    return (
      <PageContainer
        title={pagesConfig.experience.title}
        description={pagesConfig.experience.description}
      >
        <div className="text-center py-12">
          <p className="text-destructive">Error loading experiences: {error}</p>
          <p className="text-muted-foreground mt-2">Please try refreshing the page.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={pagesConfig.experience.title}
      description={pagesConfig.experience.description}
    >
      {experiences.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No experience entries found.</p>
        </div>
      ) : (
        <Timeline experiences={experiences} />
      )}
    </PageContainer>
  );
}
