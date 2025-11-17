// src/pages/Contact.tsx
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Header } from "@/components/Header";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { seoConfig } from "@/lib/seo-config";

const ContactPage = () => {
  return (
    <SmoothScrollProvider>
      <SEO {...seoConfig.contact} />
      <div className="bg-background">
        <Header />
        <main className="pt-20">
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default ContactPage;