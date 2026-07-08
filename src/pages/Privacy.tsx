import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import noticeHtml from "@/content/privacy-notice.html?raw";

const Privacy = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Privacy Notice — TARS AI";
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container pt-28 pb-24 md:pt-32">
        <div className="mx-auto max-w-3xl">
          {/* section header, matching the home-page document style */}
          <div className="flex items-center gap-4 mb-12 border-b border-line pb-4">
            <span className="font-mono-ui text-xs text-primary">§</span>
            <span className="voice-wide text-[0.6875rem] text-foreground">Legal · Privacy Notice</span>
            <span className="flex-1" />
            <span className="hidden sm:block w-2 h-2 border border-line-strong" aria-hidden="true" />
          </div>
          <article
            className="privacy-content"
            dangerouslySetInnerHTML={{ __html: noticeHtml }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
