const siteUrl = "https://thethinkalternate.com";

export default function WebPageSchema({
  name,
  description,
  path = "/",
  type = "WebPage",
}) {
  const schema = {
    "@context": "https://schema.org",

    "@type": type,

    name,

    description,

    url: `${siteUrl}${path}`,

    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "ThinkAlternate",
      url: siteUrl,
    },

    about: {
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