import { motion } from "framer-motion";


const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-primary text-sm font-medium tracking-[0.25em] uppercase mb-6">
            AI-Powered Depot Operations
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-6 max-w-4xl mx-auto"
        >
          The Bottleneck Isn't Autonomy.{" "}
          <span className="text-gradient">It's the Depot.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          TARS AI is an AI-powered depot operations platform, purpose-built to maximize uptime
          and minimize cost per mile for every autonomous fleet we serve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="bg-primary text-primary-foreground font-medium px-8 py-3.5 rounded-lg hover:opacity-90 transition-all glow-sm text-sm"
          >
            Request Early Access
          </a>
          <a
            href="#solution"
            className="border border-border text-foreground font-medium px-8 py-3.5 rounded-lg hover:bg-secondary transition-all text-sm"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
