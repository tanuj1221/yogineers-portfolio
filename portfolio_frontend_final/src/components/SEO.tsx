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
  title = 'Yogineers Technologies - Web & App Development | Freelancer in Mumbai, Thane, Maharashtra',
  description = 'Leading freelance web & app development company in Mumbai, Thane, Maharashtra. Expert in AI solutions, mobile app development, custom software, healthcare tech, and government platforms. Hire top freelance developers.',
  keywords = 'freelance web developer Mumbai, app development Thane, software developer Maharashtra, AI development India, freelance developer Mumbai, web development Thane, mobile app developer Maharashtra, custom software development, healthcare technology, government exam platforms, EdTech solutions, freelance programmer India, React developer Mumbai, Node.js developer Thane, full stack developer Maharashtra, AI integration services, machine learning solutions, cloud solutions India, startup development Mumbai, enterprise software Thane, digital transformation Maharashtra',
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
          "@type": "ProfessionalService",
          "name": "Yogineers Technologies",
          "image": `${siteUrl}${ogImage}`,
          "description": description,
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
              "@type": "State",
              "name": "Maharashtra"
            },
            {
              "@type": "Country",
              "name": "India"
            }
          ],
          "serviceType": [
            "Web Development",
            "Mobile App Development",
            "AI Solutions",
            "Custom Software Development",
            "Healthcare Technology",
            "Government Platforms",
            "EdTech Solutions",
            "Cloud Solutions",
            "Digital Transformation"
          ]
        })}
      </script>
    </Helmet>
  );
};
