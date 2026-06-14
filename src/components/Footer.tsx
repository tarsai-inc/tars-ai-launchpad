import { Link } from "react-router-dom";
import tarsLogo from "@/assets/tars-logo.png";

const Footer = () => {
  const quickLinks = [
    { label: "Problem", href: "#problem" },
    { label: "Solution", href: "#solution" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Left - Brand */}
          <div>
            <img src={tarsLogo} alt="TARS AI" className="h-7 mb-4" />
            <p className="text-muted-foreground text-xs leading-relaxed mb-4 max-w-[240px]">
              AI-powered depot operations for autonomous fleets, maximizing uptime and minimizing cost per mile with every depot we run.
            </p>
            <span className="text-muted-foreground text-xs">© 2026 TARS AI Inc.</span>
          </div>

          {/* Center - Quick Links */}
          <div>
            <h4 className="text-foreground text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-muted-foreground text-xs hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground text-xs hover:text-foreground transition-colors"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Right - Connect */}
          <div>
            <h4 className="text-foreground text-sm font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@tarsgroup.co" className="text-muted-foreground text-xs hover:text-foreground transition-colors">
                  contact@tarsai.co
                </a>
              </li>
              <li>
                <a
                  // TODO: Confirm exact LinkedIn company URL
                  href="https://linkedin.com/company/tarsgroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground text-xs hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                  aria-label="LinkedIn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
