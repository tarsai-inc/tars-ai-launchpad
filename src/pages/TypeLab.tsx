import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/geist";
import Wordmark from "@/components/Wordmark";

/* Internal type-comparison page (not linked from the site).
   Renders the real section headlines in candidate display faces. */

const SAMPLES: { line1: string; line2: string }[] = [
  { line1: "Autonomy is solved on the road.", line2: "It stalls on the ground." },
  { line1: "One integrated layer:", line2: "software, playbooks, people." },
  { line1: "Every vehicle. Every bay. Every crew.", line2: "One command surface." },
];

const VARIANTS: { key: string; label: string; note: string; style: React.CSSProperties }[] = [
  {
    key: "A",
    label: "Archivo — before",
    note: "wdth 97 · tracking −0.03em (what felt cramped)",
    style: {
      fontFamily: '"Archivo Variable", sans-serif',
      fontVariationSettings: '"wdth" 97',
      letterSpacing: "-0.03em",
    },
  },
  {
    key: "B",
    label: "Archivo — tuned",
    note: "wdth 100 · tracking −0.015em (now applied to the site)",
    style: {
      fontFamily: '"Archivo Variable", sans-serif',
      fontVariationSettings: '"wdth" 100',
      letterSpacing: "-0.015em",
    },
  },
  {
    key: "C",
    label: "Space Grotesk",
    note: "geometric grotesque · more air, more character",
    style: {
      fontFamily: '"Space Grotesk Variable", sans-serif',
      fontWeight: 500,
      letterSpacing: "-0.01em",
    },
  },
  {
    key: "D",
    label: "Geist",
    note: "neutral engineering sans (Linear-adjacent)",
    style: {
      fontFamily: '"Geist Variable", sans-serif',
      fontWeight: 530,
      letterSpacing: "-0.015em",
    },
  },
];

const TypeLab = () => (
  <div className="min-h-screen bg-background py-16">
    <div className="container">
      <div className="flex items-center gap-4 mb-4">
        <Wordmark className="h-6" />
        <span className="voice-label text-faint">Type lab · internal · section-title candidates</span>
      </div>
      <p className="text-dim text-sm max-w-xl mb-14">
        The three real section headlines, set in each candidate. Same size and
        leading everywhere — only the face and spacing change.
      </p>

      {VARIANTS.map((v) => (
        <section key={v.key} className="mb-16 border-t border-line pt-6">
          <div className="flex items-baseline gap-4 mb-8">
          <span className="font-mono-ui text-xs text-primary">{v.key}</span>
            <h2 className="voice-label text-foreground">{v.label}</h2>
            <span className="font-mono-ui text-[0.65rem] text-faint">{v.note}</span>
          </div>
          <div className="grid lg:grid-cols-3 gap-10">
            {SAMPLES.map((s) => (
              <div key={s.line1}>
                <p className="text-[1.9rem] leading-[1.14] text-foreground" style={v.style}>
                  {s.line1}
                  <br />
                  <span className="text-dim">{s.line2}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <p className="font-mono-ui text-[0.65rem] text-faint">
        Pick a letter (or a combination, e.g. "C for titles, keep Archivo for the hero") and it ships site-wide.
      </p>
    </div>
  </div>
);

export default TypeLab;
