interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <>
      <div className="flex flex-col mt-4 md:mt-5 items-start gap-3 md:gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-3 md:space-y-4">
          <h1 
            className="inline-block text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight capitalize font-semibold"
            style={{
              fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
          <p 
            className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed"
            style={{
              fontFamily: "var(--font-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
            }}
          >
            {description}
          </p>
        </div>
      </div>
      <hr className="my-4 md:my-6 border-white/10" />
    </>
  );
}
