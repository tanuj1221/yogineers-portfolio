import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { seoConfig } from "@/lib/seo-config";

const AboutPage = () => {
  return (
    <SmoothScrollProvider>
      <SEO {...seoConfig.about} />
      <div className="bg-background">
        <Header />
        <main className="pt-20">
          <About />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default AboutPage;