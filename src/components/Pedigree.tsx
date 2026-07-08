import { m } from "framer-motion";
import { fade, viewportOnce } from "@/lib/motion";

const CREDS = [
  { org: "Cruise", note: "Origin launch" },
  { org: "Tesla", note: "Service operations" },
  { org: "Amazon Robotics", note: "Automated fulfillment" },
];

/** Founder-pedigree strip — operators, not logos. */
const Pedigree = () => (
  <section aria-label="Team background" className="border-b border-line">
    <m.div
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="container py-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12"
    >
      <p className="voice-label text-faint shrink-0">Built by operators from</p>
      <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
        {CREDS.map((c) => (
          <li key={c.org} className="flex items-baseline gap-3">
            <span
              className="font-display text-foreground/90 text-lg"
              style={{ fontVariationSettings: '"wdth" 104, "wght" 560' }}
            >
              {c.org}
            </span>
            <span className="font-mono-ui text-[0.625rem] uppercase tracking-[0.14em] text-faint hidden sm:inline">
              {c.note}
            </span>
          </li>
        ))}
      </ul>
    </m.div>
  </section>
);

export default Pedigree;
