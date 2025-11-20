import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import ProjectCard from "@/components/projects/project-card";
import { pagesConfig } from "@/config/pages";
import { getProjects } from "@/lib/supabase/queries";
import type { ProjectInterface } from "@/config/projects";

export const metadata: Metadata = {
  title: pagesConfig.projects.metadata.title,
  description: pagesConfig.projects.metadata.description,
};

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  let projects: ProjectInterface[] = [];
  let error: string | null = null;

  try {
    projects = await getProjects();
  } catch (e) {
    console.error('Error loading projects:', e);
    error = e instanceof Error ? e.message : 'Failed to load projects';
  }

  if (error) {
    return (
      <PageContainer
        title={pagesConfig.projects.title}
        description={pagesConfig.projects.description}
      >
        <div className="text-center py-12">
          <p className="text-destructive">Error loading projects: {error}</p>
          <p className="text-muted-foreground mt-2">Please try refreshing the page.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={pagesConfig.projects.title}
      description={pagesConfig.projects.description}
    >
      <div className="mx-auto my-4 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 static">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        ) : (
          projects.map((project, index) => (
            <ProjectCard project={project} key={project.id} index={index} />
          ))
        )}
      </div>
    </PageContainer>
  );
}
