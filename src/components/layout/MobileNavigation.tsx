"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import type { ChapterNavItem, Locale, UiDictionary } from "@/content";
import { getChapterHref, getPracticeHref, getReferencesHref } from "@/lib/i18n/routing";

type MobileNavigationProps = {
  activeChapterId?: string;
  activeItem?: "chapters" | "continue" | "practice" | "refs";
  chapters: readonly ChapterNavItem[];
  continueHref: string;
  locale: Locale;
  ui: Pick<UiDictionary, "layout" | "navigation">;
};

export function MobileNavigation({
  activeChapterId,
  activeItem = "chapters",
  chapters,
  continueHref,
  locale,
  ui,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <nav className="bottom-nav" aria-label={ui.layout.mobileQuickNavigation}>
        <button
          aria-current={activeItem === "chapters" ? "page" : undefined}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          {ui.navigation.chapters}
        </button>
        <Link
          aria-current={activeItem === "continue" ? "page" : undefined}
          href={continueHref}
        >
          {ui.navigation.continue}
        </Link>
        <Link
          aria-current={activeItem === "practice" ? "page" : undefined}
          href={getPracticeHref(locale)}
        >
          {ui.navigation.practice}
        </Link>
        <Link
          aria-current={activeItem === "refs" ? "page" : undefined}
          href={getReferencesHref(locale)}
        >
          {ui.navigation.refs}
        </Link>
      </nav>

      {isOpen ? (
        <div className="chapter-sheet" role="presentation">
          <button
            aria-label={ui.layout.closeChapterPicker}
            className="chapter-sheet__backdrop"
            onClick={() => setIsOpen(false)}
            type="button"
          />
          <section
            aria-labelledby={titleId}
            aria-modal="true"
            className="chapter-sheet__panel"
            role="dialog"
          >
            <div className="chapter-sheet__header">
              <span aria-hidden="true" />
              <h2 id={titleId}>{ui.navigation.chapters}</h2>
              <button
                aria-label={ui.layout.closeChapters}
                className="chapter-sheet__close"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="chapter-sheet__list">
              {chapters.map((chapter) => {
                const isCurrent = chapter.id === activeChapterId;
                const statusLabel = isCurrent
                  ? ui.navigation.current
                  : chapter.status === "planned"
                    ? ui.navigation.planned
                    : null;

                return (
                  <Link
                    aria-current={isCurrent ? "page" : undefined}
                    className="chapter-sheet__item"
                    href={getChapterHref(chapter, locale)}
                    key={chapter.id}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{chapter.label}</span>
                    <strong>{chapter.title}</strong>
                    {statusLabel ? <small>{statusLabel}</small> : null}
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
