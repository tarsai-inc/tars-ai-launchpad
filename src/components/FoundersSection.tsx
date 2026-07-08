import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const founders = [
  {
    name: "Arun Arunagiri",
    title: "Co-Founder & CEO",
    background:
      "Former AV product lead. Built fleet deployment platforms and operational tooling for autonomous vehicle programs.",
  },
  {
    name: "Sheik Fazulul Haque",
    title: "Co-Founder & COO",
    background:
      "Former operations leader at a top EV manufacturer. Scaled service operations across 250+ locations nationwide.",
  },
];

const FoundersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            The Team
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Built by Operators Who Lived This Problem
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="rounded-xl border border-border bg-card p-8"
            >
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {founder.name}
              </h3>
              <p className="text-primary text-sm font-medium mb-4">
                {founder.title}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {founder.background}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-muted-foreground max-w-3xl mx-auto text-sm italic"
        >
          "We've seen autonomous fleets struggle to scale — not because of the technology, but because of the operations behind it."
        </motion.p>
      </div>
    </section>
  );
};

export default FoundersSection;
