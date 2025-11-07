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
      <header className="sticky top-6 z-50 px-4">
        <div className="container">
          <div className="glass-nav-bar flex items-center justify-between rounded-2xl px-5 py-4">
            <MainNav items={routesConfig.mainNav} />
            <nav className="relative z-10 flex items-center gap-3">
              <ModeToggle />
            </nav>
          </div>
        </div>
      </header>
      <main className="container flex-1 pt-10 pb-16">{children}</main>
      <SiteFooter />
    </div>
  );
}
