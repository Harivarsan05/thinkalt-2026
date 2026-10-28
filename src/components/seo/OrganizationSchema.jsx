const siteUrl = "https://thethinkalternate.com";

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": `${siteUrl}/#organization`,

    name: "ThinkAlternate",

    url: siteUrl,

    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/that-a-mark.svg`,
    },

    description:
      "ThinkAlternate is an AI Product Engineering company helping startups and enterprises build AI-powered products, cloud-native platforms, automation solutions, and digital transformation initiatives.",

    sameAs: [
      "https://www.linkedin.com/company/thinkalternate"
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