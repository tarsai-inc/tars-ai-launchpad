import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TractionSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      title: "LOI Signed",
      body: "Partnered with a publicly listed staffing company currently operating Waymo depots. Pilot deployment targeted for April 2026.",
    },
    {
      title: "Operator DNA",
      body: "Founding team led fully driverless launches at Cruise and scaled high-throughput operations systems at Tesla and Amazon.",
    },
    {
      title: "Berkeley SkyDeck Batch 22",
      body: "Accepted into Berkeley SkyDeck, the top university-affiliated accelerator, with deployment and Series A readiness targeted by Demo Day September 2026.",
    },
  ];

  return (
    <section id="traction" className="py-20 md:py-28 border-y border-border" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Traction
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            First Depot Live. April 2026.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="flex flex-col rounded-xl border border-border bg-card/50 px-6 py-8"
            >
              <span className="text-sm text-foreground font-semibold mb-2">
                {card.title}
              </span>
              <span className="text-xs text-muted-foreground leading-relaxed">
                {card.body}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TractionSection;
