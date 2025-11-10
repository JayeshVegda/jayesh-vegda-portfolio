import { MainNav } from "@/components/common/main-nav";
import { ModeToggle } from "@/components/common/mode-toggle";
import { SiteFooter } from "@/components/common/site-footer";
import { routesConfig } from "@/config/routes";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-3 md:top-6 z-50 px-3 md:px-4" style={{ position: "sticky" }}>
        <div className="container">
          <div className="glass-nav-bar flex items-center justify-between rounded-2xl px-3 py-3 md:px-5 md:py-4">
            <MainNav items={routesConfig.mainNav} />
            {/* ModeToggle for desktop - shown only on md and up */}
            <nav className="hidden md:flex relative z-10 items-center gap-2 md:gap-3 flex-shrink-0">
              <ModeToggle />
            </nav>
          </div>
        </div>
      </header>
      <main className="container flex-1 pt-6 md:pt-10 pb-12 md:pb-16">{children}</main>
      <SiteFooter />
    </div>
  );
}
