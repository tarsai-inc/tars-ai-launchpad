import { m } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { rise, viewportOnce, EASE } from "@/lib/motion";

const CITIES = ["City 01", "City 02", "City 03", "City 04", "City 05"];

const Scale = () => (
  <section id="scale" className="py-24 md:py-32 bg-ink-deep border-y border-line scroll-mt-16">
    <div className="container">
      <SectionHeader
        index="04"
        label="Scale"
        title={
          <>
            Launch a city in weeks.
            <br />
            <span className="text-dim">Then do it again.</span>
          </>
        }
        lede="Ground operations are the long pole in every market entry. TARS collapses it: the playbook is already written, the software is already running, and the crew is already trained. Each city makes the next one faster."
      />

      {/* Timeline compression */}
      <div className="mb-20">
        <div className="space-y-8">
          <m.div variants={rise} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <div className="flex items-baseline justify-between mb-3">
              <span className="voice-label text-dim">Status quo — build ops from zero</span>
              <span className="font-mono-ui text-sm text-dim">18–24 months</span>
            </div>
            <div className="h-8 border border-line relative overflow-hidden">
              <m.div
                className="h-full bg-line/60"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={viewportOnce}
                transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
              />
              <div className="absolute inset-0 bg-blueprint-fine opacity-40" aria-hidden="true" />
            </div>
          </m.div>

          <m.div variants={rise} custom={1} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <div className="flex items-baseline justify-between mb-3">
              <span className="voice-label text-primary">With TARS — install the operating layer</span>
              <span className="font-mono-ui text-sm text-primary">30–60 days</span>
            </div>
            <div className="h-8 border border-primary/40 relative w-full">
              <m.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "8.5%" }}
                viewport={viewportOnce}
                transition={{ duration: 1.1, ease: EASE, delay: 0.55 }}
              />
              <span className="absolute left-[10.5%] top-1/2 -translate-y-1/2 font-mono-ui text-[0.65rem] text-faint hidden sm:block">
                ← the depot stops being the bottleneck
              </span>
            </div>
          </m.div>
        </div>
      </div>

      {/* Replication chain */}
      <m.div
        variants={rise}
        custom={2}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <div className="voice-label text-faint mb-6">One playbook, replicated — not reinvented</div>
        <div className="grid grid-cols-2 md:grid-cols-5 border-t border-l border-line">
          {CITIES.map((c, i) => (
            <m.div
              key={c}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.14 }}
              className={`relative border-b border-r border-line p-6 md:p-7 ${
                i === CITIES.length - 1 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono-ui text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={`w-1.5 h-1.5 ${i === 0 ? "bg-ok" : "bg-primary"} ${i === CITIES.length - 1 ? "animate-signal" : ""}`}
                  aria-hidden="true"
                />
              </div>
              <div className="font-display text-foreground mb-4" style={{ fontVariationSettings: '"wdth" 102, "wght" 560' }}>
                {c}
              </div>
              <ul className="space-y-1.5 font-mono-ui text-[0.625rem] uppercase tracking-[0.1em] text-faint">
                <li>Same system</li>
                <li>Same playbook</li>
                <li>Local crew, certified</li>
              </ul>
              {i < CITIES.length - 1 && (
                <span className="hidden md:block absolute top-1/2 -right-[5px] w-2 h-2 border-t border-r border-primary/60 rotate-45 z-10 bg-background" aria-hidden="true" />
              )}
            </m.div>
          ))}
        </div>
        <p className="mt-8 text-dim leading-relaxed max-w-2xl">
          Every depot TARS runs feeds the same telemetry, follows the same procedures, and reports
          the same metrics. Cross-city consistency isn't an aspiration — it's the architecture.
        </p>
      </m.div>
    </div>
  </section>
);

export default Scale;
