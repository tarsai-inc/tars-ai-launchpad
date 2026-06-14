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
      <main className="container mx-auto px-6 pt-28 pb-20 md:pt-32">
        <article
          className="privacy-content mx-auto max-w-3xl"
          dangerouslySetInnerHTML={{ __html: noticeHtml }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
