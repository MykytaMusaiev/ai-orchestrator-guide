import type { ReactNode } from "react";
import Link from "next/link";
import type { ChapterNavItem, LearningChapter, Locale, UiDictionary } from "@/content";
import { getChapterHref, getLocaleRootHref } from "@/lib/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNavigation } from "./MobileNavigation";

type SiteShellProps = {
  activeChapterId?: string;
  bottomNavActive?: "chapters" | "continue" | "practice" | "refs";
  mobileContext?: string;
  currentHref?: string;
  chapter?: LearningChapter;
  chapters: readonly ChapterNavItem[];
  children: ReactNode;
  locale: Locale;
  ui: Pick<UiDictionary, "layout" | "navigation">;
};

export function SiteShell({
  activeChapterId,
  bottomNavActive = "chapters",
  currentHref,
  mobileContext = "Learning path",
  chapter,
  chapters,
  children,
  locale,
  ui,
}: SiteShellProps) {
  const continueHref = chapter ? getChapterHref(chapter, locale) : currentHref ?? getLocaleRootHref(locale);

  return (
    <div className="site-shell">
      <aside className="sidebar" aria-label={ui.layout.chapterNavigation}>
        <Link className="brand" href={getLocaleRootHref(locale)}>
          <span className="brand__mark">AO</span>
          <span>
            <strong>{ui.layout.brandTitle}</strong>
            <small>{ui.layout.brandSubtitle}</small>
          </span>
        </Link>
        <LanguageSwitcher locale={locale} ui={ui.layout} />
        <nav className="chapter-nav">
          {chapters.map((navItem) => (
            <Link
              aria-current={navItem.id === activeChapterId ? "page" : undefined}
              className={`chapter-nav__item chapter-nav__item--${navItem.status}`}
              href={getChapterHref(navItem, locale)}
              key={navItem.id}
            >
              <span>{navItem.label}</span>
              <strong>{navItem.title}</strong>
              <small>{navItem.status}</small>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="main-column">
        <header className="mobile-topbar">
          <Link className="brand" href={getLocaleRootHref(locale)}>
            <span className="brand__mark">AO</span>
            <span>
              <strong>{ui.layout.brandTitle}</strong>
              <small>{mobileContext}</small>
            </span>
          </Link>
          <div className="mobile-topbar__actions">
            <LanguageSwitcher locale={locale} ui={ui.layout} />
            <Link className="mobile-map-link" href={getLocaleRootHref(locale)}>
              {ui.layout.overview}
            </Link>
          </div>
        </header>

        <main className="content" id="top">
          {children}
        </main>

        <MobileNavigation
          activeChapterId={activeChapterId}
          activeItem={bottomNavActive}
          chapters={chapters}
          continueHref={continueHref}
          locale={locale}
          ui={{ layout: ui.layout, navigation: ui.navigation }}
        />
      </div>
    </div>
  );
}
