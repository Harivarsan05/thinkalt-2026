const siteUrl = "https://thethinkalternate.com";

export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    "@id": `${siteUrl}/#website`,

    name: "ThinkAlternate",

    url: siteUrl,

    publisher: {
      "@id": `${siteUrl}/#organization`,
    },

    inLanguage: "en",
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