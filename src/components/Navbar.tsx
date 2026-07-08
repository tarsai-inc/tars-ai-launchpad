import { useState, useEffect } from "react";
import { m, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Wordmark from "./Wordmark";
import { EASE } from "@/lib/motion";

const LINKS = [
  { label: "The Constraint", href: "#constraint" },
  { label: "The System", href: "#system" },
  { label: "Command", href: "#command" },
  { label: "Scale", href: "#scale" },
  { label: "Company", href: "#company" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <m.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-background/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* scroll position indicator */}
      <m.div
        className="absolute bottom-0 left-0 h-px w-full bg-primary origin-left"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <nav className="container flex items-center justify-between h-16" aria-label="Main">
        <a href="#top" onClick={(e) => go(e, "#top")} aria-label="TARS — home">
          <Wordmark className="h-9" />
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="voice-label text-dim hover:text-foreground transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#briefing"
            onClick={(e) => go(e, "#briefing")}
            className="voice-label bg-primary text-primary-foreground px-5 h-10 inline-flex items-center hover:bg-amber-deep transition-colors duration-200"
          >
            Request a briefing
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden relative w-10 h-10 -mr-2 flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block w-5 h-px bg-foreground transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
          <span className={`block w-5 h-px bg-foreground transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="lg:hidden overflow-hidden border-b border-line bg-background/95 backdrop-blur-md"
          >
            <div className="container py-6 flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="flex items-baseline gap-3 py-3 border-b border-line/60 last:border-0"
                >
                  <span className="font-mono-ui text-[0.625rem] text-faint">0{i + 1}</span>
                  <span className="voice-label text-foreground">{l.label}</span>
                </a>
              ))}
              <a
                href="#briefing"
                onClick={(e) => go(e, "#briefing")}
                className="voice-label bg-primary text-primary-foreground h-12 mt-4 inline-flex items-center justify-center"
              >
                Request a briefing
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
};

export default Navbar;
