import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollVisual = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const fgLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ---- Hero fade-out + blur on scroll ---- */
      gsap.to(".hero-headline", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
        opacity: 0,
        filter: "blur(12px)",
        y: -60,
        ease: "none",
      });

      gsap.to(".scroll-cue", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: true,
        },
        opacity: 0,
      });

      /* ---- Main visual (car-like element) ---- */
      gsap.fromTo(
        visualRef.current,
        { x: "-60vw", scale: 0.7, rotation: -6, opacity: 0 },
        {
          x: "0vw",
          scale: 1,
          rotation: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1.5,
          },
        }
      );

      /* ---- Parallax layers ---- */
      // Background — slowest
      gsap.to(bgLayerRef.current, {
        y: "-15%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Midground
      gsap.to(midLayerRef.current, {
        y: "-30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Foreground — fastest
      gsap.to(fgLayerRef.current, {
        y: "-50%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] overflow-hidden"
    >
      {/* Parallax Background Layer */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute top-[50%] right-[15%] w-96 h-96 rounded-full bg-accent/8 blur-[120px]" />
      </div>

      {/* Parallax Midground Layer */}
      <div
        ref={midLayerRef}
        className="absolute inset-0 will-change-transform"
      >
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.04]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-white"
              style={{ left: `${(i + 1) * (100 / 13)}%` }}
            />
          ))}
        </div>
        {/* Floating shapes */}
        <div className="absolute top-[30%] left-[25%] w-4 h-4 rotate-45 border border-white/10" />
        <div className="absolute top-[55%] right-[30%] w-6 h-6 rounded-full border border-white/8" />
        <div className="absolute top-[70%] left-[60%] w-3 h-3 bg-primary/20 rotate-12" />
      </div>

      {/* Main visual element */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div
          ref={visualRef}
          className="relative will-change-transform"
        >
          {/* Abstract car / speed shape */}
          <div className="relative w-[70vw] max-w-2xl aspect-[16/7]">
            {/* Body */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 backdrop-blur-sm shadow-[0_0_80px_-20px_hsl(152,55%,42%,0.3)]" />

            {/* Windshield */}
            <div className="absolute top-[15%] left-[35%] w-[30%] h-[45%] rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-white/10 skew-x-[-8deg]" />

            {/* Wheels */}
            <div className="absolute -bottom-4 left-[15%] w-14 h-14 md:w-20 md:h-20 rounded-full border-4 border-white/20 bg-white/5 shadow-[0_0_30px_hsl(152,55%,42%,0.2)]">
              <div className="absolute inset-2 rounded-full border border-white/10" />
            </div>
            <div className="absolute -bottom-4 right-[15%] w-14 h-14 md:w-20 md:h-20 rounded-full border-4 border-white/20 bg-white/5 shadow-[0_0_30px_hsl(152,55%,42%,0.2)]">
              <div className="absolute inset-2 rounded-full border border-white/10" />
            </div>

            {/* Headlights */}
            <div className="absolute top-[30%] right-0 translate-x-2 w-8 h-3 rounded-full bg-primary/60 blur-sm" />
            <div className="absolute top-[45%] right-0 translate-x-1 w-6 h-2 rounded-full bg-accent/40 blur-sm" />

            {/* Speed lines */}
            <div className="absolute top-[25%] -left-20 w-16 h-px bg-gradient-to-r from-transparent to-white/20" />
            <div className="absolute top-[50%] -left-28 w-24 h-px bg-gradient-to-r from-transparent to-white/15" />
            <div className="absolute top-[70%] -left-16 w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
          </div>

          {/* Label */}
          <p className="mt-8 text-center text-sm tracking-[0.3em] uppercase text-white/30 font-body">
            Scroll-driven motion
          </p>
        </div>
      </div>

      {/* Foreground Layer */}
      <div
        ref={fgLayerRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div className="absolute top-[40%] left-[5%] w-2 h-2 bg-white/10 rounded-full" />
        <div className="absolute top-[60%] right-[8%] w-3 h-3 bg-primary/15 rounded-full" />
        <div className="absolute top-[80%] left-[45%] w-1.5 h-1.5 bg-accent/20 rounded-full" />
      </div>
    </section>
  );
};

export default ScrollVisual;
