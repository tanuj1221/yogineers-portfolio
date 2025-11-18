import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

export const SEO = ({
  title = 'Hire Expert Web Developer Mumbai | 5+ Years Experience | Website Development Company',
  description = 'Expert web developer & website development company in Mumbai, Thane with 5+ years experience. Hire experienced developers for web development, app development, React, Node.js, AI solutions. Professional website development for startups & businesses in Maharashtra, India.',
  keywords = 'freelance web developer, freelancer, website development company, hire freelance developer, freelance website developer, web development company Mumbai, freelance app developer, freelance software developer, freelance programmer, independent web developer, contract developer, freelance React developer, freelance Node.js developer, freelance full stack developer, website developer for hire, freelance web designer, freelance mobile app developer, freelance AI developer, freelance developer Mumbai, freelance developer Thane, freelance developer Maharashtra, freelance developer India, hire freelancer Mumbai, website development services, web development agency, custom website development, ecommerce website developer, startup website developer, business website developer, affordable web developer, professional freelance developer, experienced freelance developer, top freelance developer India, best website development company Mumbai, web development company Thane, software development company Maharashtra, freelance tech consultant, remote freelance developer, on-demand developer, project-based developer, freelance backend developer, freelance frontend developer, freelance UI UX developer, freelance database developer, freelance API developer, freelance cloud developer, freelance DevOps engineer, freelance software engineer, freelance web application developer, freelance mobile application developer, freelance ecommerce developer, freelance WordPress developer, freelance Shopify developer, freelance MERN stack developer, freelance MEAN stack developer, freelance Python developer, freelance JavaScript developer, freelance TypeScript developer',
  ogImage = '/logo2.png',
  ogType = 'website',
  canonicalUrl,
  noindex = false,
}: SEOProps) => {
  const siteUrl = 'https://yogineerstech.in'; // Update with your actual domain
  const fullTitle = title.includes('Yogineers') ? title : `${title} | Yogineers Technologies`;
  const canonical = canonicalUrl || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Yogineers Technologies" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      <meta name="twitter:site" content="@yogineerstech" />
      <meta name="twitter:creator" content="@yogineerstech" />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="Yogineers Technologies" />
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Mumbai, Thane, Maharashtra" />
      <meta name="geo.position" content="19.0760;72.8777" />
      <meta name="ICBM" content="19.0760, 72.8777" />
      
      {/* Language and Content */}
      <meta httpEquiv="content-language" content="en-IN" />
      <meta name="language" content="English" />
      
      {/* Mobile Optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["ProfessionalService", "LocalBusiness", "Organization"],
          "name": "Yogineers Technologies",
          "alternateName": ["Yogineers", "Yogineers Tech"],
          "image": `${siteUrl}${ogImage}`,
          "description": "Expert web developer and website development company with 5+ years experience specializing in custom web applications, mobile apps, AI solutions, and digital transformation services for businesses in Mumbai, Thane, and across India.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Mumbai, Thane",
            "addressRegion": "Maharashtra",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "19.0760",
            "longitude": "72.8777"
          },
          "url": siteUrl,
          "telephone": "+91-XXXXXXXXXX",
          "priceRange": "$$",
          "slogan": "Your Trusted Expert Web Developer with 5+ Years Experience",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "09:00",
            "closes": "18:00"
          },
          "sameAs": [
            "https://www.linkedin.com/company/yogineers",
            "https://twitter.com/yogineerstech",
            "https://github.com/yogineers"
          ],
          "areaServed": [
            {
              "@type": "City",
              "name": "Mumbai"
            },
            {
              "@type": "City",
              "name": "Thane"
            },
            {
              "@type": "City",
              "name": "Navi Mumbai"
            },
            {
              "@type": "State",
              "name": "Maharashtra"
            },
            {
              "@type": "Country",
              "name": "India"
            }
          ],
          "serviceType": [
            "Freelance Web Development",
            "Website Development",
            "Mobile App Development",
            "Freelance Software Development",
            "Custom Web Application Development",
            "E-commerce Website Development",
            "React Development",
            "Node.js Development",
            "Full Stack Development",
            "Frontend Development",
            "Backend Development",
            "AI Solutions",
            "Machine Learning Integration",
            "Custom Software Development",
            "API Development",
            "Database Development",
            "Cloud Solutions",
            "DevOps Services",
            "UI/UX Design",
            "Web Design",
            "Responsive Web Design",
            "Progressive Web Apps",
            "Healthcare Technology",
            "Government Platforms",
            "EdTech Solutions",
            "Startup Development",
            "Enterprise Software",
            "Digital Transformation",
            "WordPress Development",
            "Shopify Development",
            "MERN Stack Development",
            "MEAN Stack Development"
          ],
          "knowsAbout": [
            "Web Development",
            "Mobile App Development",
            "React",
            "Node.js",
            "JavaScript",
            "TypeScript",
            "Python",
            "AI",
            "Machine Learning",
            "Cloud Computing",
            "DevOps",
            "UI/UX Design"
          ]
        })}
      </script>
    </Helmet>
  );
};
