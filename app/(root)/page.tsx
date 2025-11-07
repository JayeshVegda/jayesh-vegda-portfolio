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
import { featuredContributions } from "@/config/contributions";
import { experiences } from "@/config/experience";
import { pagesConfig } from "@/config/pages";
import { featuredProjects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { coreSkills } from "@/config/skills";
import { codingStats, achievements } from "@/config/stats";
import StatsCard from "@/components/stats/stats-card";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/common/icons";

export const metadata: Metadata = {
  title: `${pagesConfig.home.metadata.title} | Full Stack Developer Portfolio`,
  description: `${pagesConfig.home.metadata.description} Full Stack Developer with expertise in React, Node.js, Python, and cloud platforms.`,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function IndexPage() {
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
        className="container py-16"
        id="skills"
      >
        <div className="glass-skill-black rounded-3xl px-6 py-10 md:px-10 md:py-12 space-y-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <AnimatedText
              as="h2"
              className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
            >
              {pagesConfig.skills.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.2}
              className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
            >
              {pagesConfig.skills.description}
            </AnimatedText>
          </div>
          <HomeSkillsCard skills={coreSkills.slice(0, 6)} />
          <AnimatedText delay={0.4} className="flex justify-center">
            <Link href="/skills">
              <Button variant={"outline"} className="rounded-xl">
                <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
              </Button>
            </Link>
          </AnimatedText>
        </div>
      </AnimatedSection>
      <AnimatedSection
        direction="right"
        className="container py-10 my-14"
        id="projects"
      >
        <div className="glass-skill-black rounded-3xl px-6 py-10 md:px-10 md:py-12 space-y-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <AnimatedText
              as="h2"
              className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
            >
              {pagesConfig.projects.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.2}
              className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
            >
              {pagesConfig.projects.description}
            </AnimatedText>
          </div>
          <div className="mx-auto grid justify-center gap-4 md:w-full lg:grid-cols-3">
            {featuredProjects.map((exp, index) => (
              <ProjectCard key={exp.id} project={exp} index={index} />
            ))}
          </div>
          <AnimatedText delay={0.4} className="flex justify-center">
            <Link href="/projects">
              <Button variant={"outline"} className="rounded-xl">
                <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
              </Button>
            </Link>
          </AnimatedText>
        </div>
      </AnimatedSection>
      <AnimatedSection
        direction="down"
        className="container py-10 my-14"
        id="contributions"
      >
        <div className="glass-skill-black rounded-3xl px-6 py-10 md:px-10 md:py-12 space-y-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <AnimatedText
              as="h2"
              className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
            >
              {pagesConfig.contributions.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.2}
              className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
            >
              {pagesConfig.contributions.description}
            </AnimatedText>
          </div>
          <div className="mx-auto justify-center gap-4 md:w-full lg:grid-cols-3">
            <ContributionCard contributions={featuredContributions} showTechStack={false} />
          </div>
          <AnimatedText delay={0.4} className="flex justify-center">
            <Link href="/contributions">
              <Button variant={"outline"} className="rounded-xl">
                <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
              </Button>
            </Link>
          </AnimatedText>
        </div>
      </AnimatedSection>
      <AnimatedSection
        direction="left"
        className="container py-10 my-14"
        id="experience"
      >
        <div className="glass-skill-black rounded-3xl px-6 py-10 md:px-10 md:py-12 space-y-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <AnimatedText
              as="h2"
              className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
            >
              {pagesConfig.experience.title}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.2}
              className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
            >
              {pagesConfig.experience.description}
            </AnimatedText>
          </div>
          <div className="mx-auto w-full space-y-4">
            {experiences.slice(0, 3).map((experience, index) => (
              <ExperienceCard key={experience.id} experience={experience} index={index} />
            ))}
          </div>
          <AnimatedText delay={0.4} className="flex justify-center">
            <Link href="/experience">
              <Button variant={"outline"} className="rounded-xl">
                <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
              </Button>
            </Link>
          </AnimatedText>
        </div>
      </AnimatedSection>
      <AnimatedSection
        direction="up"
        className="container py-10 my-14"
        id="stats"
      >
        <div className="glass-skill-black rounded-3xl px-6 py-10 md:px-10 md:py-12 space-y-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <AnimatedText
              as="h2"
              className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
            >
              Stats & Achievements
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.2}
              className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
            >
              My coding journey, contributions, and achievements across various platforms.
            </AnimatedText>
          </div>
          <StatsCard stats={codingStats} achievements={achievements} />
        </div>
      </AnimatedSection>
    </ClientPageWrapper>
  );
}
