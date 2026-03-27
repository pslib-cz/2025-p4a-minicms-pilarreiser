import type { MetadataRoute } from "next";

import { getRecentWeedLogs } from "@/lib/weed-logs";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const weedLogs = await getRecentWeedLogs();

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
    ...weedLogs.map((weedLog) => ({
      url: `${siteConfig.url}/logs/${weedLog.slug}`,
      lastModified: weedLog.updatedAt,
    })),
  ];
}
