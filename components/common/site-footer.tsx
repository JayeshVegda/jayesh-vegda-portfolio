import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { SocialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex items-center justify-center gap-4 md:gap-8 mt-6 md:mt-10 py-6 md:py-10 md:h-24 flex-wrap">
        {SocialLinks.map((item, ind) => (
          <CustomTooltip icon={item.icon} text={item.username} key={ind}>
            <Link
              href={item.link}
              target="_blank"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "h-9 w-9 md:h-10 md:w-10 p-2"
              )}
            >
              <item.icon className="h-4 w-4 md:h-5 md:w-5" />
            </Link>
          </CustomTooltip>
        ))}
      </div>
    </footer>
  );
}
