// src/pages/Index.tsx
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { PageTransition } from "@/components/PageTransition";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import LLMShowcase from "@/components/LLMShowcase";
import { WavySection } from "@/components/WavySection"; // Import the new WavySection component
import AnimatedGridBackground from "@/components/AnimatedComponents/AnimatedGridBackground";
import { SparklesPreview } from "@/components/extraComponents/BrandSparkles";
import { HeroParallaxDemo } from "@/components/extraComponents/HeroParallaxDemo";
import FeaturesSectionDemo from "@/components/features-section-demo-3";
import { SEO } from "@/components/SEO";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { seoConfig } from "@/lib/seo-config";

const Index = () => {
  return (
    <PageTransition>
      <SEO {...seoConfig.home} />
      <LocalBusinessSchema />
      <SmoothScrollProvider>
        <div className="bg-white dark:bg-background">
          <Header />
          <main>
            <Hero />
            {/* HeroParallaxDemo temporarily disabled for performance */}
            {/* <HeroParallaxDemo/> */}
            <div className="relative">
              <AnimatedGridBackground />
              <About />
            </div>
            <div className="relative">
              <AnimatedGridBackground />
              <Services />
            </div>
            <FeaturesSectionDemo/>
            {/* <WavySection /> */}
            {/* <div className="relative">
              <AnimatedGridBackground />
              <LLMShowcase />
            </div> */}
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScrollProvider>
    </PageTransition>
  );
};

export default Index;
