import type { MetadataRoute } from "next";
import { services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { path: "", priority: 1 },
    { path: "/sluzby", priority: 0.9 },
    { path: "/cennik", priority: 0.9 },
    { path: "/o-nas", priority: 0.7 },
    { path: "/referencie", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    { path: "/kontakt", priority: 0.8 },
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${site.url}${page.path}`,
      lastModified: now,
      priority: page.priority,
    })),
    ...services.map((service) => ({
      url: `${site.url}/sluzby/${service.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
