import type { ChapterNavItem, Locale } from "@/content";

export function getLocaleRootHref(locale: Locale) {
  return `/${locale}`;
}

export function getChapterHref(
  chapter: Pick<ChapterNavItem, "slug">,
  locale: Locale,
) {
  return `/${locale}/chapters/${chapter.slug}`;
}

export function getPracticeHref(locale: Locale) {
  return `/${locale}/practice`;
}

export function getReferencesHref(locale: Locale) {
  return `/${locale}/references`;
}

export function switchLocaleInPathname(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length) {
    return getLocaleRootHref(nextLocale);
  }

  const [, ...rest] = segments;
  return `/${[nextLocale, ...rest].join("/")}`;
}
