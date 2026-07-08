import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SolutionSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { label: "Charging", description: "Every charge cycle scheduled, tracked, and optimized for maximum fleet availability.", delay: 0 },
    { label: "Cleaning", description: "Skill-based task routing ensures every vehicle is cleaned to standard, every time.", delay: 0.5 },
    { label: "Movement & Staging", description: "Intelligent lane routing eliminates depot congestion and manual coordination.", delay: 1.0 },
    { label: "Inspection", description: "Every check logged and verified before a vehicle moves to the next stage.", delay: 1.5 },
    { label: "Triage & Service", description: "Exceptions, safety holds, and interventions handled automatically, nothing leaves unresolved.", delay: 2.0 },
    { label: "Dispatch", description: "System-verified readiness ensures every vehicle is cleared, logged, and on time.", delay: 2.5 },
  ];

  return (
    <section id="solution" className="py-24 md:py-32 relative bg-radial-fade" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            The Solution
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            AI-Powered Depot Operations, Built to Scale City by City
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            TARS powers autonomous vehicle depot operations, combining software intelligence and operational playbooks to cut turnaround time, maximize uptime, and compress new city launch time from 18 months to 30 to 60 days.
          </p>
        </motion.div>

        {/* Animated workflow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-6 gap-4 relative">
            <div className="absolute top-5 md:top-6 left-0 right-0 h-px bg-border" />
            <motion.div
              className="absolute top-5 md:top-6 left-0 h-px bg-primary"
              initial={{ width: "0%" }}
              animate={inView ? { width: "100%" } : {}}
              transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
            />
            {steps.map((step) => (
              <motion.div
                key={step.label}
                className="relative z-10 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + step.delay * 0.4 }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary bg-background flex items-center justify-center mb-3">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse_glow" />
                </div>
                <span className="text-xs md:text-sm text-foreground font-medium mb-1">
                  {step.label}
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground leading-relaxed text-center px-1">
                  {step.description}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-center text-muted-foreground text-sm mt-12"
        >
          Designed from the depot floor up. Proven in live AV operations.
        </motion.p>
      </div>
    </section>
  );
};

export default SolutionSection;
