import { useState, FormEvent } from "react";
import { m } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { rise, viewportOnce } from "@/lib/motion";

const inputClasses =
  "w-full bg-background border border-line px-4 h-12 font-mono-ui text-sm text-foreground placeholder:text-faint focus:outline-none focus:border-primary/70 transition-colors duration-200";

const Briefing = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    const formData = new FormData(e.currentTarget);
    if (formData.get("website")) return; // honeypot

    try {
      const response = await fetch("https://formspree.io/f/mdalkvyl", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) setSubmitted(true);
      else setError(true);
    } catch {
      setError(true);
    }
  };

  return (
    <section id="briefing" className="py-24 md:py-32 bg-ink-deep border-t border-line scroll-mt-16">
      <div className="container">
        <SectionHeader
          index="06"
          label="Briefing"
          title={
            <>
              Operating an autonomous fleet —
              <br />
              <span className="text-dim">or preparing to?</span>
            </>
          }
          lede="TARS is engaging its first wave of fleet operators now. Request a briefing and we'll walk your team through the operating model, the economics, and what day one looks like."
        />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-20">
          {/* Contact rail */}
          <m.div variants={rise} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <dl className="space-y-8">
              <div>
                <dt className="voice-label text-faint mb-2">Direct</dt>
                <dd>
                  <a href="mailto:contact@tarsai.co" className="font-mono-ui text-sm text-foreground hover:text-primary transition-colors">
                    contact@tarsai.co
                  </a>
                </dd>
              </div>
              <div>
                <dt className="voice-label text-faint mb-2">Response</dt>
                <dd className="font-mono-ui text-sm text-dim">Within one business day</dd>
              </div>
              <div>
                <dt className="voice-label text-faint mb-2">For</dt>
                <dd className="font-mono-ui text-sm text-dim leading-relaxed">
                  AV fleet operators · OEMs
                  <br />
                  Fleet infrastructure partners
                </dd>
              </div>
            </dl>
          </m.div>

          {/* Form */}
          <m.div variants={rise} custom={1} initial="hidden" whileInView="show" viewport={viewportOnce}>
            {submitted ? (
              <div className="corner-ticks border border-line p-12 text-center" role="status">
                <span className="inline-block w-2 h-2 bg-ok mb-6" aria-hidden="true" />
                <p className="font-display text-xl text-foreground mb-2">Briefing requested.</p>
                <p className="text-dim text-sm">We'll be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Request a briefing">
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bf-name" className="voice-label text-faint block mb-2">Name</label>
                    <input id="bf-name" name="name" required maxLength={100} autoComplete="name" className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="bf-email" className="voice-label text-faint block mb-2">Work email</label>
                    <input id="bf-email" name="email" type="email" required maxLength={255} autoComplete="email" className={inputClasses} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bf-company" className="voice-label text-faint block mb-2">Company</label>
                    <input id="bf-company" name="company" required maxLength={100} autoComplete="organization" className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="bf-role" className="voice-label text-faint block mb-2">Role</label>
                    <input id="bf-role" name="role" required maxLength={100} autoComplete="organization-title" className={inputClasses} />
                  </div>
                </div>
                <div>
                  <label htmlFor="bf-message" className="voice-label text-faint block mb-2">
                    Context <span className="normal-case tracking-normal">(optional)</span>
                  </label>
                  <textarea
                    id="bf-message"
                    name="message"
                    rows={4}
                    maxLength={1000}
                    placeholder="Fleet size, markets, timeline…"
                    className={`${inputClasses} h-auto py-3 resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  className="voice-label w-full bg-primary text-primary-foreground py-4 hover:bg-amber-deep transition-colors duration-200"
                >
                  Request a briefing
                </button>
                {error && (
                  <p className="font-mono-ui text-xs text-destructive" role="alert">
                    Something went wrong. Email us directly at contact@tarsai.co.
                  </p>
                )}
              </form>
            )}
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default Briefing;
