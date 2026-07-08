import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Honeypot check
    if (formData.get("website")) return;

    try {
      // TODO: Replace with your Formspree form ID from https://formspree.io
      const response = await fetch("https://formspree.io/f/mdalkvyl", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) setSubmitted(true);
    } catch (error) {
      console.error("Form error:", error);
    }
  };

  const inputClasses =
    "w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200";

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-radial-fade" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Scaling Past Manual Depot Operations?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">Talk to Us</h3>
            <a
              href="mailto:contact@tarsgroup.co"
              className="text-primary hover:underline text-sm mb-6 inline-block"
            >
              contact@tarsgroup.co
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed">
              TARS is in private beta with depot operators managing autonomous vehicle fleets.
            </p>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {submitted ? (
              <div className="text-center py-12 rounded-xl border border-primary/20 bg-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-foreground font-medium">Message sent.</p>
                <p className="text-muted-foreground text-sm mt-1">We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <div className="grid grid-cols-2 gap-4">
                  <input name="name" required placeholder="Name" className={inputClasses} maxLength={100} aria-label="Name" />
                  <input name="email" type="email" required placeholder="Email" className={inputClasses} maxLength={255} aria-label="Email" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input name="company" required placeholder="Company" className={inputClasses} maxLength={100} aria-label="Company" />
                  <select name="role" required className={inputClasses} aria-label="Role" defaultValue="">
                    <option value="" disabled>Role</option>
                    <option value="Depot Manager">Depot Manager</option>
                    <option value="Fleet Operations">Fleet Operations</option>
                    <option value="VP/C-Suite">VP/C-Suite</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Staffing Provider">Staffing Provider</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <textarea
                  name="message"
                  placeholder="Tell us about your depot operations..."
                  rows={3}
                  className={inputClasses + " resize-none"}
                  maxLength={1000}
                  aria-label="Message"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-lg hover:opacity-90 hover:scale-[1.02] transition-all glow-sm min-h-[44px]"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
