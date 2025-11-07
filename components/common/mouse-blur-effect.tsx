"use client";

interface MouseBlurEffectProps {
  isHovering: boolean;
  gradientPosition: { x: number; y: number };
}

export function MouseBlurEffect({ isHovering, gradientPosition }: MouseBlurEffectProps) {
  if (!isHovering) return null;

  return (
    <>
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-0 transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(180px 180px at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04) 50%, transparent 75%)`,
          filter: "blur(12px)",
          opacity: 0.6,
        }}
      />
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-0 transition-all duration-400 ease-out"
        style={{
          background: `radial-gradient(140px 140px at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02) 60%, transparent 70%)`,
          filter: "blur(18px)",
          opacity: 0.5,
        }}
      />
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-0 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(120px 120px at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(255, 255, 255, 0.06), transparent 65%)`,
          filter: "blur(8px)",
          opacity: 0.4,
        }}
      />
    </>
  );
}

