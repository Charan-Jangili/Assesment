import HeroSection from "@/components/hero/HeroSection";
import ScrollVisual from "@/components/hero/ScrollVisual";
import ScrollProgress from "@/components/hero/ScrollProgress";

const HeroShowcase = () => {
  return (
    <div className="relative bg-[#0a0a0f] text-white min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <HeroSection />
      <ScrollVisual />

      {/* End section */}
      <section className="relative flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 px-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-wide text-primary-foreground">
            Built for Performance
          </h2>
          <p className="text-white/40 text-sm md:text-base tracking-widest uppercase font-body">
            60fps · GPU-accelerated · Scroll-synced
          </p>
        </div>
      </section>
    </div>
  );
};

export default HeroShowcase;
