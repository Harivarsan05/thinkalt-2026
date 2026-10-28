const siteUrl = "https://thethinkalternate.com";

export default function ArticleSchema({ article }) {
  if (!article) return null;

  const publishedDate = new Date(article.date).toISOString();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    "@id": `${siteUrl}/blogs/${article.id}#article`,

    headline: article.title,
    description: article.excerpt,

    image: {
      "@type": "ImageObject",
      url: article.image,
    },

    url: `${siteUrl}/blogs/${article.id}`,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blogs/${article.id}`,
    },

    inLanguage: "en",

    datePublished: publishedDate,
    dateModified: publishedDate,

    author: {
      "@type": "Person",
      name: article.author || "ThinkAlternate",
    },
    
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
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