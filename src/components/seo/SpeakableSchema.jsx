const siteUrl = "https://thethinkalternate.com";

/**
 * Marks concise, answer-focused page content for voice and AI assistants.
 * Pass stable CSS selectors, such as [".page-title", ".answer-summary"].
 */
export default function SpeakableSchema({ path = "/", cssSelectors = [] }) {
  if (!cssSelectors.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${siteUrl}${path}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
