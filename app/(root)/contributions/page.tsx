import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import ContributionCard from "@/components/contributions/contribution-card";
import { pagesConfig } from "@/config/pages";
import { getContributions } from "@/lib/supabase/queries";
import type { contributionsInterface } from "@/config/contributions";

export const metadata: Metadata = {
  title: pagesConfig.contributions.metadata.title,
  description: pagesConfig.contributions.metadata.description,
};

export const dynamic = 'force-dynamic';

export default async function ContributonsPage() {
  let contributions: contributionsInterface[] = [];
  let error: string | null = null;

  try {
    contributions = await getContributions();
  } catch (e) {
    console.error('Error loading contributions:', e);
    error = e instanceof Error ? e.message : 'Failed to load contributions';
  }

  if (error) {
    return (
      <PageContainer
        title={pagesConfig.contributions.title}
        description={pagesConfig.contributions.description}
      >
        <div className="text-center py-12">
          <p className="text-destructive">Error loading contributions: {error}</p>
          <p className="text-muted-foreground mt-2">Please try refreshing the page.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={pagesConfig.contributions.title}
      description={pagesConfig.contributions.description}
    >
      {contributions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No contributions found.</p>
        </div>
      ) : (
        <ContributionCard contributions={contributions} />
      )}
    </PageContainer>
  );
}
