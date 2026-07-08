import { m } from "framer-motion";
import { rise, fade, EASE } from "@/lib/motion";

const STATS = [
  { label: "City launch", value: "18 mo → 60 days", tone: "text-primary" },
  { label: "Operating model", value: "Day-one operators", tone: "text-foreground" },
  { label: "Coverage", value: "24 / 7 / 365", tone: "text-foreground" },
  { label: "Objective", value: "Lowest cost per mile", tone: "text-foreground" },
];

const Hero = () => {
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Blueprint backdrop */}
      <div className="absolute inset-0 bg-blueprint mask-fade-edges" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% -10%, hsl(var(--amber) / 0.07), transparent 60%)",
        }}
        aria-hidden="true"
      />
      {/* Slow scanline */}
      <div className="absolute inset-y-0 left-0 w-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="animate-scan absolute inset-y-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, hsl(var(--amber) / 0.35) 30%, hsl(var(--amber) / 0.35) 70%, transparent)",
          }}
        />
      </div>

      {/* registration marks */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none font-mono-ui text-faint/50 text-xs" aria-hidden="true">
        <span className="absolute top-[22%] right-[8%]">+</span>
        <span className="absolute top-[58%] right-[22%]">+</span>
        <span className="absolute top-[76%] left-[46%]">+</span>
        <span className="absolute bottom-[16%] right-[7%] voice-label text-[0.575rem] text-faint/70 tracking-[0.2em]">
          GRID REF · 30.2672 N / 97.7431 W
        </span>
      </div>

      <div className="container relative z-10 pt-36 pb-0 flex-1 flex flex-col justify-center">
        <m.p
          variants={fade}
          initial="hidden"
          animate="show"
          className="voice-label text-primary mb-7 flex items-start gap-3"
        >
          <span className="inline-block w-2 h-2 bg-primary animate-signal mt-[3px] shrink-0" aria-hidden="true" />
          Operational infrastructure for autonomous systems
        </m.p>

        <h1 className="font-display text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.25rem] text-foreground max-w-5xl">
          <m.span variants={rise} custom={1} initial="hidden" animate="show" className="block">
            The operating layer
          </m.span>
          <m.span variants={rise} custom={2} initial="hidden" animate="show" className="block text-dim">
            for autonomous fleets.
          </m.span>
        </h1>

        <m.p
          variants={rise}
          custom={4}
          initial="hidden"
          animate="show"
          className="mt-8 text-dim text-lg md:text-xl leading-relaxed max-w-2xl"
        >
          TARS runs the ground operations that keep autonomous vehicles in service:
          orchestration software, codified playbooks, and trained operators, in place
          from day one. Higher uptime. Faster turnaround. Lower cost per mile.
        </m.p>

        <m.div
          variants={rise}
          custom={6}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#briefing"
            onClick={(e) => go(e, "#briefing")}
            className="voice-label bg-primary text-primary-foreground h-12 px-8 inline-flex items-center justify-center hover:bg-amber-deep transition-colors duration-200"
          >
            Request a briefing
          </a>
          <a
            href="#system"
            onClick={(e) => go(e, "#system")}
            className="voice-label text-foreground border border-line-strong h-12 px-8 inline-flex items-center justify-center hover:border-primary/60 hover:text-primary transition-colors duration-200"
          >
            See the system
          </a>
        </m.div>
      </div>

      {/* Telemetry band */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
        className="relative z-10 border-t border-line mt-20 bg-background/60 backdrop-blur-sm"
      >
        <dl className="container grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`py-6 pr-6 ${i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""} ${
                i % 2 === 1 ? "border-l border-line pl-6 lg:pl-8" : ""
              } ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}
            >
              <dt className="voice-label text-faint mb-2">{s.label}</dt>
              <dd className={`font-mono-ui text-sm md:text-[0.95rem] ${s.tone}`}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </m.div>
    </section>
  );
};

export default Hero;
