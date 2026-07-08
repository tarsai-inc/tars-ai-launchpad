import { m } from "framer-motion";
import { rise, viewportOnce } from "@/lib/motion";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
}

/** Numbered technical-document section header. */
const SectionHeader = ({ index, label, title, lede }: SectionHeaderProps) => (
  <div className="mb-14 md:mb-20">
    <m.div
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="flex items-center gap-4 mb-8 border-b border-line pb-4"
    >
      <span className="font-mono-ui text-xs text-primary">{index}</span>
      <span className="voice-wide text-[0.625rem] text-dim">{label}</span>
      <span className="flex-1" />
      <span className="hidden sm:block w-2 h-2 border border-line-strong" aria-hidden="true" />
    </m.div>
    <m.h2
      variants={rise}
      custom={1}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.08] text-foreground max-w-3xl"
    >
      {title}
    </m.h2>
    {lede && (
      <m.p
        variants={rise}
        custom={2}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-6 text-dim text-lg leading-relaxed max-w-2xl"
      >
        {lede}
      </m.p>
    )}
  </div>
);

export default SectionHeader;
