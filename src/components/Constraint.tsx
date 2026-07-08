import { m } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { rise, viewportOnce } from "@/lib/motion";

const FACTS = [
  {
    stat: "18–24",
    unit: "months",
    title: "To stand up one city",
    body: "Every new market today means recruiting, training, tooling, and process design from zero. The depot — not the driving stack — sets the pace of expansion.",
  },
  {
    stat: "~75",
    unit: "vehicles",
    title: "Where manual ops break",
    body: "Whiteboards, radios, and spreadsheets hold at ten vehicles. They collapse at seventy-five. Adding headcount adds fragility, not capacity.",
  },
  {
    stat: "$10B+",
    unit: "invested",
    title: "In autonomy — not operations",
    body: "Billions have gone into the driving stack. The layer that charges, cleans, inspects, stages, and dispatches those vehicles still runs on tribal knowledge.",
  },
  {
    stat: "0",
    unit: "standard",
    title: "No operating system exists",
    body: "There is no common infrastructure for AV ground operations. Every operator reinvents it, city by city, shift by shift. That is the gap TARS closes.",
  },
];

const Constraint = () => (
  <section id="constraint" className="py-24 md:py-32 scroll-mt-16">
    <div className="container">
      <SectionHeader
        index="01"
        label="The Constraint"
        title={
          <>
            Autonomy is solved on the road.
            <br />
            <span className="text-dim">It stalls on the ground.</span>
          </>
        }
        lede="Between every ride is a chain of physical operations — charging, cleaning, inspection, staging, dispatch. Today that chain is manual, unmeasured, and unrepeatable. It is the binding constraint on every fleet's economics and every city launch."
      />

      <div className="grid sm:grid-cols-2 border-t border-l border-line">
        {FACTS.map((f, i) => (
          <m.div
            key={f.title}
            variants={rise}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="group relative border-b border-r border-line p-8 md:p-10 hover:bg-ink-raised transition-colors duration-300"
          >
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display text-4xl md:text-5xl text-foreground group-hover:text-primary transition-colors duration-300">
                {f.stat}
              </span>
              <span className="voice-label text-faint">{f.unit}</span>
            </div>
            <h3 className="font-display text-lg text-foreground mb-3" style={{ fontVariationSettings: '"wdth" 100, "wght" 560' }}>
              {f.title}
            </h3>
            <p className="text-dim text-[0.95rem] leading-relaxed">{f.body}</p>
            <span
              className="absolute top-4 right-4 font-mono-ui text-[0.625rem] text-faint/60"
              aria-hidden="true"
            >
              C-0{i + 1}
            </span>
          </m.div>
        ))}
      </div>
    </div>
  </section>
);

export default Constraint;
