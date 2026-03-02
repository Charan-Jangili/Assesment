import { useRef, useEffect } from "react";
import gsap from "gsap";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 250, suffix: "%", label: "Growth" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 10, suffix: "M+", label: "Users" },
  { value: 5, suffix: "x", label: "Performance Boost" },
];

const Stats = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in cards
      gsap.from(".stat-card", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 1.4,
      });

      // Counter animation
      STATS.forEach((stat, i) => {
        const el = countersRef.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          delay: 1.6 + i * 0.12,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString();
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl w-full"
    >
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          className="stat-card flex flex-col items-center p-4 md:p-6 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm will-change-transform"
        >
          <span className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
            <span
              ref={(el) => {
                countersRef.current[i] = el;
              }}
            >
              0
            </span>
            {stat.suffix}
          </span>
          <span className="mt-2 text-xs md:text-sm tracking-wider uppercase text-white/40 font-body">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stats;
