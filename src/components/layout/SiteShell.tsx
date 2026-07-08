import type { ReactNode } from "react";
import Link from "next/link";
import type { ChapterNavItem, LearningChapter } from "@/content/sections";
import { firstAvailableChapter, getChapterHref } from "@/content/sections";
import { MobileNavigation } from "./MobileNavigation";

type SiteShellProps = {
  activeChapterId?: string;
  bottomNavActive?: "chapters" | "continue" | "practice" | "refs";
  mobileContext?: string;
  currentHref?: string;
  chapter?: LearningChapter;
  chapters: readonly ChapterNavItem[];
  children: ReactNode;
};

export function SiteShell({
  activeChapterId,
  bottomNavActive = "chapters",
  currentHref = getChapterHref(firstAvailableChapter),
  mobileContext = "Learning path",
  chapter,
  chapters,
  children,
}: SiteShellProps) {
  return (
    <div className="site-shell">
      <aside className="sidebar" aria-label="Chapter navigation">
        <Link className="brand" href="/">
          <span className="brand__mark">AO</span>
          <span>
            <strong>Orchestrator Learning</strong>
            <small>Practice-oriented workflow judgment</small>
          </span>
        </Link>
        <nav className="chapter-nav">
          {chapters.map((navItem) => (
            <Link
              aria-current={navItem.id === activeChapterId ? "page" : undefined}
              className={`chapter-nav__item chapter-nav__item--${navItem.status}`}
              href={getChapterHref(navItem)}
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
          <Link className="brand" href="/">
            <span className="brand__mark">AO</span>
            <span>
              <strong>Orchestrator Learning</strong>
              <small>{mobileContext}</small>
            </span>
          </Link>
          <Link className="mobile-map-link" href="/">
            Overview
          </Link>
        </header>

        <main className="content" id="top">
          {children}
        </main>

        <MobileNavigation
          activeChapterId={activeChapterId}
          activeItem={bottomNavActive}
          chapters={chapters}
          continueHref={chapter ? getChapterHref(chapter) : currentHref}
        />
      </div>
    </div>
  );
}
