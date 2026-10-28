const siteUrl = "https://thethinkalternate.com";

export default function ServiceSchema({
  name,
  description,
  path,
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name,
    description,

    url: `${siteUrl}${path}`,

    serviceType: name,

    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },

    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    
    brand: {
      "@type": "Brand",
      name: "ThinkAlternate",
    },

    availableLanguage: [
      "English"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}