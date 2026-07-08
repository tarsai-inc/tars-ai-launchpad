import { Link } from "react-router-dom";
import Wordmark from "./Wordmark";

const Footer = () => {
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-line">
      <div className="container py-14">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div className="max-w-xs">
            <div className="mb-4">
              <Wordmark className="h-7" />
            </div>
            <p className="text-faint text-sm leading-relaxed">
              The operating layer for autonomous fleets — software, playbooks, and
              operators keeping AVs on the road in every city.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-16 gap-y-3">
            {[
              { label: "The Constraint", href: "#constraint" },
              { label: "The System", href: "#system" },
              { label: "Command", href: "#command" },
              { label: "Scale", href: "#scale" },
              { label: "Company", href: "#company" },
              { label: "Request a briefing", href: "#briefing" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="voice-label text-dim hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div>
            <div className="voice-label text-faint mb-3">Connect</div>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@tarsai.co" className="font-mono-ui text-xs text-dim hover:text-foreground transition-colors">
                  contact@tarsai.co
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/tarsai-co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-ui text-xs text-dim hover:text-foreground transition-colors"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-line flex flex-col sm:flex-row justify-between gap-3">
          <span className="font-mono-ui text-[0.65rem] text-faint">
            © 2026 TARS AI Inc. All rights reserved. ·{" "}
            <Link to="/privacy" className="hover:text-foreground transition-colors underline underline-offset-2">
              Privacy
            </Link>
          </span>
          <span className="font-mono-ui text-[0.65rem] text-faint">Autonomy runs on operations.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
