import { m } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { rise, viewportOnce } from "@/lib/motion";

const FOUNDERS = [
  {
    name: "Arunkumar Arunagiri",
    role: "Co-Founder · Co-CEO",
    bio: "AV product leader. Built fleet deployment platforms and the operational tooling behind autonomous vehicle programs, including the launch of the Cruise Origin.",
    tags: ["Cruise", "AV fleet deployment"],
  },
  {
    name: "Fazulul Haque Sheik",
    role: "Co-Founder · Co-CEO",
    bio: "Operations leader from Tesla service. Scaled service operations across 250+ locations nationwide — the discipline TARS installs on every depot floor.",
    tags: ["Tesla", "250+ service locations"],
  },
];

const Company = () => (
  <section id="company" className="py-24 md:py-32 scroll-mt-16">
    <div className="container">
      <SectionHeader
        index="05"
        label="Company"
        title={
          <>
            Founded by the people
            <br />
            <span className="text-dim">who ran these operations.</span>
          </>
        }
        lede="TARS was built by operators who launched autonomous vehicles, scaled national service networks, and shipped robotics at industrial scale. We didn't study this problem — we lived it."
      />

      <div className="grid md:grid-cols-2 border-t border-l border-line">
        {FOUNDERS.map((f, i) => (
          <m.article
            key={f.name}
            variants={rise}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="border-b border-r border-line p-8 md:p-10 hover:bg-ink-raised transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-9 h-9 border border-line-strong flex items-center justify-center font-mono-ui text-xs text-primary" aria-hidden="true">
                {f.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </span>
              <div>
                <h3 className="font-display text-lg text-foreground" style={{ fontVariationSettings: '"wdth" 100, "wght" 580' }}>
                  {f.name}
                </h3>
                <p className="voice-label text-faint mt-0.5">{f.role}</p>
              </div>
            </div>
            <p className="text-dim leading-relaxed mb-6">{f.bio}</p>
            <ul className="flex flex-wrap gap-2">
              {f.tags.map((t) => (
                <li key={t} className="font-mono-ui text-[0.625rem] uppercase tracking-[0.12em] text-dim border border-line px-2.5 py-1">
                  {t}
                </li>
              ))}
            </ul>
          </m.article>
        ))}
      </div>
    </div>
  </section>
);

export default Company;
