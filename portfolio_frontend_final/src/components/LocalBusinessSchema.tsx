import { Helmet } from 'react-helmet-async';

/**
 * Local Business Schema Component
 * Add this to your homepage or footer for enhanced local SEO
 */
export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://yogineerstech.in/#organization",
    "name": "Yogineers Technologies",
    "alternateName": "Yogineers Tech",
    "description": "Leading freelance web and mobile app development company in Mumbai, Thane, Maharashtra. Expert in AI solutions, custom software, React, Node.js, healthcare tech, and government platforms.",
    "url": "https://yogineerstech.in",
    "logo": "https://yogineerstech.in/logo2.png",
    "image": [
      "https://yogineerstech.in/logo2.png"
    ],
    "telephone": "+91-XXXXXXXXXX", // Update with your phone
    "email": "contact@yogineerstech.in", // Update with your email
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address", // Update
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400001", // Update
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.0760",
      "longitude": "72.8777"
    },
    "openingHoursSpecification": [
      {
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
      }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "INR, USD",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer, UPI",
    "areaServed": [
      {
        "@type": "City",
        "name": "Mumbai",
        "sameAs": "https://en.wikipedia.org/wiki/Mumbai"
      },
      {
        "@type": "City",
        "name": "Thane",
        "sameAs": "https://en.wikipedia.org/wiki/Thane"
      },
      {
        "@type": "City",
        "name": "Navi Mumbai"
      },
      {
        "@type": "State",
        "name": "Maharashtra",
        "sameAs": "https://en.wikipedia.org/wiki/Maharashtra"
      },
      {
        "@type": "Country",
        "name": "India",
        "sameAs": "https://en.wikipedia.org/wiki/India"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development",
            "description": "Custom web application development using React, Node.js, Next.js, and modern frameworks"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile App Development",
            "description": "Native and cross-platform mobile app development for iOS and Android"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Solutions",
            "description": "AI integration, machine learning, and intelligent automation solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Software Development",
            "description": "Bespoke software solutions tailored to your business needs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Healthcare Technology",
            "description": "HIPAA-compliant healthcare software and telemedicine platforms"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Government Platforms",
            "description": "Secure government platforms and online examination systems"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.linkedin.com/company/yogineers",
      "https://twitter.com/yogineerstech",
      "https://github.com/yogineers",
      "https://www.facebook.com/yogineerstech",
      "https://www.instagram.com/yogineerstech"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    },
    "founder": {
      "@type": "Person",
      "name": "Founder Name" // Update with actual founder name
    },
    "foundingDate": "2020", // Update with actual founding year
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "5-10"
    },
    "slogan": "Engineered To Elevate",
    "knowsAbout": [
      "Web Development",
      "Mobile App Development",
      "React",
      "Node.js",
      "Artificial Intelligence",
      "Machine Learning",
      "Healthcare Technology",
      "Government Platforms",
      "Cloud Computing",
      "Digital Transformation"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
