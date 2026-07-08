import { Link } from "react-router-dom";
import Wordmark from "@/components/Wordmark";

const NotFound = () => (
  <div className="min-h-screen bg-background flex items-center justify-center px-6">
    <div className="corner-ticks border border-line p-10 md:p-14 max-w-md w-full text-center">
      <div className="text-lg mb-8 flex justify-center">
        <Wordmark />
      </div>
      <p className="font-mono-ui text-xs text-primary tracking-[0.2em] mb-3">ERR · 404</p>
      <h1 className="font-display text-2xl text-foreground mb-3">Route not found.</h1>
      <p className="text-dim text-sm leading-relaxed mb-8">
        The page you requested is not on the map.
      </p>
      <Link
        to="/"
        className="voice-label bg-primary text-primary-foreground h-11 px-6 inline-flex items-center justify-center hover:bg-amber-deep transition-colors"
      >
        Return to base
      </Link>
    </div>
  </div>
);

export default NotFound;
