import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";
import { activeStays, stayPath, roomPath, localizedPath } from "@/lib/stays";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...activeStays
      .filter((stay) => !stay.draft)
      .flatMap((stay) => [
        stayPath(stay),
        ...stay.rooms
          .filter((room) => !room.draft)
          .map((room) => roomPath(stay, room)),
      ]),
  ];
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        `${SITE_URL}${localizedPath(path, locale)}`,
      ]),
    );
    return routing.locales.map((locale) => ({
      url: `${SITE_URL}${localizedPath(path, locale)}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: { ...languages, "x-default": `${SITE_URL}${path}` },
      },
    }));
  });
}
