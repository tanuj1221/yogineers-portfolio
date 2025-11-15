// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ProfessionalTransition } from "@/components/ProfessionalTransition";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import Index from "./pages/Index";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { CompanyBlogs } from "./pages/CompanyBlogs";
import { BlogDetail } from "./pages/BlogDetail";
import { ProjectDetail } from "./pages/ProjectDetail";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { BlogForm } from "./pages/BlogForm";
import DrawUnderlineButton from "./components/AnimatedComponents/DrawUnderlineButton";
import FeaturesSectionDemo from "./components/features-section-demo-3";
import { AppleCardsCarouselDemo } from "./components/extraComponents/AppleCardsCarouselDemo";
import { AnimatedTestimonialsDemo } from "./components/extraComponents/AnimatedTestimonialsDemo";
import { LinkPreviewDemoSecond } from "./components/extraComponents/LinkPreviewDemoSecond";
import { HeroParallaxDemo } from "./components/extraComponents/HeroParallaxDemo";
import { ContainerTextFlipDemo } from "./components/extraComponents/ContainerTextFlipDemo";
import { MultiStepLoaderDemo } from "./components/extraComponents/MultiStepLoaderDemo";
import { FloatingDockDemo } from "./components/extraComponents/FloatingDockDemo";
import { SparklesPreview } from "./components/extraComponents/BrandSparkles";
import { useEffect } from "react";
import { initGA, logPageView } from "./lib/analytics";

// Initialize React Query Client
const queryClient = new QueryClient();

// Google Analytics Tracker Component
const GATracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on mount (only once)
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (GA_MEASUREMENT_ID) {
      initGA(GA_MEASUREMENT_ID);
    }
  }, []);

  useEffect(() => {
    // Track page views on route change
    logPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="yogineers-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <GATracker />
          <ProfessionalTransition>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />



              {/* Demo Routes for various components - can be removed in production */}
              <Route path="/feature-section" element={<FeaturesSectionDemo />} />
              <Route path="/apple-cards-carousel" element={<AppleCardsCarouselDemo />} />
              <Route path="/animated-testimonials" element={<AnimatedTestimonialsDemo />} />
              <Route path="/link-preview" element={<LinkPreviewDemoSecond />} />
              <Route path="/hero-parallax" element={<HeroParallaxDemo />} />
              <Route path="/container-text-flip" element={<ContainerTextFlipDemo />} />
              <Route path="/multi-step-loader" element={<MultiStepLoaderDemo />} />
              <Route path="/floating-dock" element={<FloatingDockDemo />} />
              <Route path="/brand-sparkles" element={<SparklesPreview />} />




              <Route path="/contact" element={<ContactPage />} />
              <Route path="/projects/:serviceId" element={<ProjectsShowcase />} />
              <Route path="/projects/:serviceId/:projectId" element={<ProjectDetail />} />
              <Route path="/companyblogs" element={<CompanyBlogs />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/create" element={<BlogForm />} />
              <Route path="/admin/edit/:id" element={<BlogForm />} />
             
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProfessionalTransition>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
