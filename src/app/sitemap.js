import { blogArticles } from "../data/blogArticles";
import { caseStudies } from "../data/caseStudies";

const siteUrl = "https://thethinkalternate.com";

const staticRoutes = [
  "",
  "/contact",
  "/services",
  "/services/ai-integrations",
  "/services/app-maintenance",
  "/services/devops-cloud-optimization",
  "/services/fractional-cto",
  "/services/gcc-setup",
  "/services/mobile-app-development",
  "/services/qa-automation",
  "/services/ui-ux-design",
  "/services/web-app-development",
  "/blogs",
  "/case-study",
  "/pricing",
  "/apptron",
  "/foundry",
  "/meet-the-althumans",
  "/copilot-assistant",
  "/cloud-cost-optimization",
  "/app-audit-engine",
  "/app-health-dashboard",
  "/ghost-bugs",
  "/mirsa",
  "/mirsa-pricing",
  "/performax-engine",
  "/root-cause-engine",
  "/sentiment-analyzer",
];

export default function sitemap() {
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
    })),
    ...blogArticles.map((article) => ({
      url: `${siteUrl}/blogs/${article.id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...caseStudies.map((caseStudy) => ({
      url: `${siteUrl}/case-study/${caseStudy.id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
