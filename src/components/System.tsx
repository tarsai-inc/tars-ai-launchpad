import { m } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { rise, viewportOnce, EASE } from "@/lib/motion";

const LAYERS = [
  {
    id: "L3",
    name: "Orchestration software",
    body:
      "Every vehicle, bay, task, and technician on one command surface. Work is scheduled, routed, and verified by the system — not over the radio. Uptime, turnaround, and cost per mile become controlled variables, not outcomes you hope for.",
    points: ["Real-time fleet & bay state", "Skill-based task routing", "Verified readiness at dispatch"],
  },
  {
    id: "L2",
    name: "Codified playbooks",
    body:
      "Every procedure — charge, clean, inspect, stage, triage, dispatch — written as executable process, versioned like software, and enforced on the floor. What is proven in one depot ships to the next, unchanged.",
    points: ["SLA-backed procedures", "Exception & safety-hold protocols", "Continuously improved, centrally shipped"],
  },
  {
    id: "L1",
    name: "Day-one operators",
    body:
      "Trained crews arrive with the platform and run the depot at standard from the first shift — an operating capability that carries the playbook, the tooling, and the accountability for the numbers.",
    points: ["Certified on AV ground procedures", "Deployed with the software", "Accountable to fleet-level SLAs"],
  },
];

/** Isometric layer-stack schematic. */
const StackDiagram = () => (
  <svg
    viewBox="0 0 340 300"
    className="w-full max-w-[340px]"
    role="img"
    aria-label="Diagram of the TARS stack: operators, playbooks, and orchestration software layered together"
  >
    {[2, 1, 0].map((i) => {
      const y = 60 + i * 78;
      const active = i === 0;
      return (
        <m.g
          key={i}
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 * (2 - i) }}
        >
          <polygon
            points={`170,${y - 44} 316,${y} 170,${y + 44} 24,${y}`}
            fill={active ? "hsl(38 94% 54% / 0.08)" : "hsl(217 24% 8%)"}
            stroke={active ? "hsl(38 94% 54% / 0.8)" : "hsl(215 14% 24%)"}
            strokeWidth="1"
          />
          <text
            x="170"
            y={y + 4}
            textAnchor="middle"
            fill={active ? "hsl(38 94% 60%)" : "hsl(215 11% 58%)"}
            fontFamily="IBM Plex Mono, monospace"
            fontSize="10"
            letterSpacing="2"
          >
            {LAYERS[i].name.toUpperCase()}
          </text>
          <text
            x="12"
            y={y + 3}
            fill="hsl(216 10% 40%)"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="9"
          >
            {LAYERS[i].id}
          </text>
        </m.g>
      );
    })}
    {/* connective spine */}
    <m.line
      x1="170"
      y1="16"
      x2="170"
      y2="284"
      stroke="hsl(38 94% 54% / 0.35)"
      strokeWidth="1"
      strokeDasharray="3 5"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
    />
  </svg>
);

const System = () => (
  <section id="system" className="py-24 md:py-32 bg-ink-deep border-y border-line scroll-mt-16">
    <div className="container">
      <SectionHeader
        index="02"
        label="The System"
        title={
          <>
            One integrated layer:
            <br />
            <span className="text-dim">software, playbooks, people.</span>
          </>
        }
        lede="TARS is not a tool your team learns, and not a vendor you manage. It is the full operating capability for AV ground operations — installed as one system, accountable to fleet-level numbers."
      />

      <div className="grid lg:grid-cols-[340px_1fr] gap-14 lg:gap-20 items-start">
        <div className="hidden lg:flex justify-center sticky top-28">
          <StackDiagram />
        </div>

        <div>
          {LAYERS.map((l, i) => (
            <m.article
              key={l.id}
              variants={rise}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="border-b border-line py-10 first:pt-0 last:border-0 grid md:grid-cols-[72px_1fr] gap-4 md:gap-8"
            >
              <span className="font-mono-ui text-xs text-primary pt-1.5">{l.id} /</span>
              <div>
                <h3
                  className="font-display text-xl md:text-2xl text-foreground mb-4"
                  style={{ fontVariationSettings: '"wdth" 100, "wght" 580' }}
                >
                  {l.name}
                </h3>
                <p className="text-dim leading-relaxed mb-5 max-w-xl">{l.body}</p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {l.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 font-mono-ui text-[0.7rem] uppercase tracking-[0.12em] text-faint">
                      <span className="w-1 h-1 bg-primary" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default System;
