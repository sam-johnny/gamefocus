import type { MetadataRoute } from "next";
import { articles, SITE } from "@/lib/articles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const articleEntries = articles.map((a) => ({
    url: `${SITE.url}/articles/${a.slug}/`,
    lastModified: a.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [
    {
      url: SITE.url,
      lastModified: "2026-08-13",
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE.url}/a-propos/`,
      lastModified: "2026-08-13",
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...articleEntries,
  ];
}
