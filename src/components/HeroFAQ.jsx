/**
 * A concise, crawlable FAQ section for hero or above-the-fold content.
 * Use alongside FAQSchema with the same questions and answers.
 */

export default function HeroFAQ({
  title = "Frequently Asked Questions",
  intro,
  faqs = [],
  className = "",
}) {
  if (!faqs.length) return null;

  return (
    <section className={`py-12 md:py-16 ${className}`} aria-labelledby="hero-faq-heading">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 id="hero-faq-heading" className="text-3xl md:text-4xl font-extrabold text-white">
            {title}
          </h2>
          {intro && <p className="mt-3 text-white/90 leading-7">{intro}</p>}
        </div>

        <div className="space-y-3">
          {faqs.map(({ question, answer }, index) => (
            <details key={question || index} className="group rounded-2xl border border-gray-200 bg-white px-5 py-1 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-gray-900">
                <span className="hero-faq-question">{question}</span>
                <span aria-hidden="true" className="text-xl text-teal-600 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="hero-faq-answer pb-4 leading-7 text-gray-600">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
