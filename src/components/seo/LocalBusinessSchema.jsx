const siteUrl = "https://thethinkalternate.com";

/**
 * ProfessionalService is a LocalBusiness subtype suited to technology
 * consulting and product-engineering companies.
 */
export default function LocalBusinessSchema({
  telephone,
  address,
  geo,
  openingHours,
  priceRange,
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#professional-service`,
    name: "ThinkAlternate",
    url: siteUrl,
    logo: `${siteUrl}/Think-Alternate-logo.svg`,
    image: `${siteUrl}/Think-Alternate-logo.svg`,
    description:
      "ThinkAlternate provides AI product engineering, cloud engineering, automation, and digital transformation services.",
    areaServed: "Worldwide",
    ...(telephone && { telephone }),
    ...(address && { address }),
    ...(geo && { geo }),
    ...(openingHours && { openingHours }),
    ...(priceRange && { priceRange }),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
