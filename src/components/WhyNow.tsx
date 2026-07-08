import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const CountUp = ({ target, suffix = "", inView }: { target: number; suffix?: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [inView, target]);

  return <>{count.toLocaleString()}{suffix}</>;
};

const WhyNow = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: 20, suffix: "+", label: "cities with active autonomous vehicle operations in the US — and expanding fast", accent: false, useCountUp: true },
    { value: 75, suffix: "–150", label: "vehicles — the point where manual depot coordination starts breaking down in new markets", accent: true, useCountUp: true },
    { value: null, suffix: "", label: "staffing ratios common in early AV city launches — scaling with people, not systems", accent: false, useCountUp: false, staticText: "2x" },
  ];

  return (
    <section id="why-now" className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Market Context
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The AV Industry is Scaling—Operations Must Too
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className={`text-center rounded-xl border p-8 ${
                stat.accent
                  ? "border-warning/30 bg-warning/5"
                  : "border-border bg-card"
              }`}
            >
              <div className={`text-3xl md:text-4xl font-bold mb-3 ${
                stat.accent ? "text-warning" : "text-gradient"
              }`}>
                {stat.useCountUp ? (
                  <CountUp target={stat.value!} suffix={stat.suffix} inView={inView} />
                ) : (
                  stat.staticText
                )}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-muted-foreground max-w-2xl mx-auto text-base"
        >
          Every fleet hitting multi-city expansion faces the same wall: operations scale by adding people, not systems. The constraint on autonomous scale isn't the vehicle — it's the depot.
        </motion.p>
      </div>
    </section>
  );
};

export default WhyNow;
