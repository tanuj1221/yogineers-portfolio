import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Header } from "@/components/Header";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { seoConfig } from "@/lib/seo-config";

const ServicesPage = () => {
  return (
    <SmoothScrollProvider>
      <SEO {...seoConfig.services} />
      <div className="bg-background">
        <Header />
        <main className="pt-20">
          <Services />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default ServicesPage;