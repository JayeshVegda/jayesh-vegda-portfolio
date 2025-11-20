import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { AnimatedSection } from "@/components/common/animated-section";
import { AnimatedText } from "@/components/common/animated-text";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { VSCodeHero } from "@/components/hero/vscode-hero";
import ContributionCard from "@/components/contributions/contribution-card";
import ExperienceCard from "@/components/experience/experience-card";
import ProjectCard from "@/components/projects/project-card";
import HomeSkillsCard from "@/components/skills/home-skills-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";
import StatsCard from "@/components/stats/stats-card";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/common/icons";
import { 
  getFeaturedProjects, 
  getExperiences, 
  getCoreSkills, 
  getFeaturedContributions,
  getStats,
  getAchievements
} from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: `${pagesConfig.home.metadata.title} | Full Stack Developer Portfolio`,
  description: `${pagesConfig.home.metadata.description} Full Stack Developer with expertise in React, Node.js, Python, and cloud platforms.`,
  alternates: {
    canonical: siteConfig.url,
  },
};

// Force dynamic rendering to prevent build-time issues
export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  // Fetch all data from Supabase
  const [featuredProjects, experiences, coreSkills, featuredContributions, codingStats, achievements] = await Promise.all([
    getFeaturedProjects().catch(() => []),
    getExperiences().catch(() => []),
    getCoreSkills().catch(() => []),
    getFeaturedContributions().catch(() => []),
    getStats().catch(() => []),
    getAchievements().catch(() => []),
  ]);

  // Structured data for personal portfolio
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.authorName,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: "Full Stack Developer",
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  };

  // Structured data for website
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jayesh Vegda Portfolio",
    url: siteConfig.url,
    author: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: siteConfig.url,
    },
  };

  return (
    <ClientPageWrapper>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="schema-software"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <VSCodeHero />
      <AnimatedSection
        className="container py-8 md:py-16"
        id="skills"
      >
        <div className="glass-skill-black rounded-3xl px-4 py-6 md:px-6 md:py-10 lg:px-10 lg:py-12 space-y-6 md:space-y-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-3 md:space-y-4 text-center">
            <AnimatedText
              as="h2"
              className="font-heading text-2xl md:text-3xl lg:text-4xl xl:text-6xl leading-[1.1]"
            >
              {pagesConfig.skills.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.2}
              className="max-w-[95%] md:max-w-[85%] leading-normal text-sm md:text-base lg:text-lg text-muted-foreground md:leading-7 px-2"
            >
              {pagesConfig.skills.description}
            </AnimatedText>
          </div>
          {coreSkills.length > 0 && (
            <>
              <HomeSkillsCard skills={coreSkills.slice(0, 6)} />
              <AnimatedText delay={0.4} className="flex justify-center pt-2">
                <Link href="/skills">
                  <Button variant={"outline"} className="rounded-xl text-sm md:text-base">
                    <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
                  </Button>
                </Link>
              </AnimatedText>
            </>
          )}
        </div>
      </AnimatedSection>
      <AnimatedSection
        direction="right"
        className="container py-6 md:py-10 my-8 md:my-14"
        id="projects"
      >
        <div className="glass-skill-black rounded-3xl px-4 py-6 md:px-6 md:py-10 lg:px-10 lg:py-12 space-y-6 md:space-y-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-3 md:space-y-4 text-center">
            <AnimatedText
              as="h2"
              className="font-heading text-2xl md:text-3xl lg:text-4xl xl:text-6xl leading-[1.1]"
            >
              {pagesConfig.projects.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.2}
              className="max-w-[95%] md:max-w-[85%] leading-normal text-sm md:text-base lg:text-lg text-muted-foreground md:leading-7 px-2"
            >
              {pagesConfig.projects.description}
            </AnimatedText>
          </div>
          {featuredProjects.length > 0 ? (
            <>
              <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
                {featuredProjects.map((exp, index) => (
                  <ProjectCard key={exp.id} project={exp} index={index} />
                ))}
              </div>
              <AnimatedText delay={0.4} className="flex justify-center pt-2">
                <Link href="/projects">
                  <Button variant={"outline"} className="rounded-xl text-sm md:text-base">
                    <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
                  </Button>
                </Link>
              </AnimatedText>
            </>
          ) : null}
        </div>
      </AnimatedSection>
      <AnimatedSection
        direction="down"
        className="container py-6 md:py-10 my-8 md:my-14"
        id="contributions"
      >
        <div className="glass-skill-black rounded-3xl px-4 py-6 md:px-6 md:py-10 lg:px-10 lg:py-12 space-y-6 md:space-y-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-3 md:space-y-4 text-center">
            <AnimatedText
              as="h2"
              className="font-heading text-2xl md:text-3xl lg:text-4xl xl:text-6xl leading-[1.1]"
            >
              {pagesConfig.contributions.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.2}
              className="max-w-[95%] md:max-w-[85%] leading-normal text-sm md:text-base lg:text-lg text-muted-foreground md:leading-7 px-2"
            >
              {pagesConfig.contributions.description}
            </AnimatedText>
          </div>
          {featuredContributions.length > 0 && (
            <>
              <div className="mx-auto w-full">
                <ContributionCard contributions={featuredContributions} showTechStack={false} />
              </div>
              <AnimatedText delay={0.4} className="flex justify-center pt-2">
                <Link href="/contributions">
                  <Button variant={"outline"} className="rounded-xl text-sm md:text-base">
                    <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
                  </Button>
                </Link>
              </AnimatedText>
            </>
          )}
        </div>
      </AnimatedSection>
      <AnimatedSection
        direction="left"
        className="container py-6 md:py-10 my-8 md:my-14"
        id="experience"
      >
        <div className="glass-skill-black rounded-3xl px-4 py-6 md:px-6 md:py-10 lg:px-10 lg:py-12 space-y-6 md:space-y-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-3 md:space-y-4 text-center">
            <AnimatedText
              as="h2"
              className="font-heading text-2xl md:text-3xl lg:text-4xl xl:text-6xl leading-[1.1]"
            >
              {pagesConfig.experience.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.2}
              className="max-w-[95%] md:max-w-[85%] leading-normal text-sm md:text-base lg:text-lg text-muted-foreground md:leading-7 px-2"
            >
              {pagesConfig.experience.description}
            </AnimatedText>
          </div>
          {experiences.length > 0 && (
            <>
              <div className="mx-auto w-full space-y-4 md:space-y-6">
                {experiences.slice(0, 3).map((experience, index) => (
                  <ExperienceCard key={experience.id} experience={experience} index={index} />
                ))}
              </div>
              <AnimatedText delay={0.4} className="flex justify-center pt-2">
                <Link href="/experience">
                  <Button variant={"outline"} className="rounded-xl text-sm md:text-base">
                    <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
                  </Button>
                </Link>
              </AnimatedText>
            </>
          )}
        </div>
      </AnimatedSection>
      <AnimatedSection
        direction="up"
        className="container py-6 md:py-10 my-8 md:my-14"
        id="stats"
      >
        <div className="glass-skill-black rounded-3xl px-4 py-6 md:px-6 md:py-10 lg:px-10 lg:py-12 space-y-6 md:space-y-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-3 md:space-y-4 text-center">
            <AnimatedText
              as="h2"
              className="font-heading text-2xl md:text-3xl lg:text-4xl xl:text-6xl leading-[1.1]"
            >
              Stats & Achievements
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.2}
              className="max-w-[95%] md:max-w-[85%] leading-normal text-sm md:text-base lg:text-lg text-muted-foreground md:leading-7 px-2"
            >
              My coding journey, contributions, and achievements across various platforms.
            </AnimatedText>
          </div>
          {(codingStats.length > 0 || achievements.length > 0) && (
            <StatsCard stats={codingStats} achievements={achievements} />
          )}
        </div>
      </AnimatedSection>
    </ClientPageWrapper>
  );
}
