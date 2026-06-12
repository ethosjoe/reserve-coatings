import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";

const staticRoutes = [
  "",
  "/quote",
  "/garages",
  "/basements",
  "/outdoor",
  "/commercial",
  "/colors",
  "/gallery",
  "/process",
  "/blog",
  "/contact",
  "/promotions",
  "/financing",
  "/reviews",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.siteUrl;
  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...projects.map((p) => ({
      url: `${base}/gallery/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...blogPosts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
