interface WordmarkProps {
  className?: string;
}

/** TARS wordmark — set in Archivo, amber index dot echoes the brand mark. */
const Wordmark = ({ className = "" }: WordmarkProps) => (
  <span className={`inline-flex items-baseline select-none ${className}`}>
    <span
      className="font-display text-foreground leading-none"
      style={{ fontVariationSettings: '"wdth" 108, "wght" 640', letterSpacing: "0.06em" }}
    >
      TARS
    </span>
    <span className="ml-[0.18em] inline-block w-[0.32em] h-[0.32em] bg-primary translate-y-[-0.06em]" aria-hidden="true" />
  </span>
);

export default Wordmark;
