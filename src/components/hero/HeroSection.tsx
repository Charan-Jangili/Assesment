import { useRef, useEffect } from "react";
import gsap from "gsap";
import Stats from "./Stats";

const HEADLINE = "WELCOME  ITZFIZZ";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Letters stagger
      tl.from(lettersRef.current.filter(Boolean), {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.04,
        ease: "power4.out",
      });

      // Subtitle
      tl.from(
        subtitleRef.current,
        { y: 30, opacity: 0, duration: 0.8 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const letters = HEADLINE.split("");

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden"
    >
      {/* Headline */}
      <h1 className="flex flex-wrap justify-center gap-x-1 md:gap-x-3 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[0.25em] md:tracking-[0.35em] text-primary-foreground will-change-transform select-none hero-headline">
        {letters.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              lettersRef.current[i] = el;
            }}
            className={`inline-block ${char === " " ? "w-3 md:w-6" : ""}`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      <p
        ref={subtitleRef}
        className="mt-6 md:mt-10 text-base md:text-xl tracking-[0.15em] uppercase text-white/50 font-body"
      >
        Scroll-Driven · Cinematic · Premium
      </p>

      {/* Stats */}
      <Stats />

      {/* Scroll cue */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 text-white/30 scroll-cue">
        <span className="text-xs tracking-widest uppercase font-body">
          Scroll
        </span>
        <span className="block w-px h-10 bg-white/20 animate-pulse" />
      </div>
    </div>
  );
};

export default HeroSection;
