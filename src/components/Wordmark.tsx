import tarsLogo from "@/assets/tars-logo.png";

interface WordmarkProps {
  /** Tailwind height class controls the rendered size (width scales). */
  className?: string;
}

/** TARS brand logo. */
const Wordmark = ({ className = "h-8" }: WordmarkProps) => (
  <img src={tarsLogo} alt="TARS AI" className={`w-auto select-none ${className}`} />
);

export default Wordmark;
