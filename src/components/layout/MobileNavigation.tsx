"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import type { ChapterNavItem } from "@/content/sections";
import { getChapterHref } from "@/content/sections";

type MobileNavigationProps = {
  activeChapterId?: string;
  activeItem?: "chapters" | "continue" | "practice" | "refs";
  chapters: readonly ChapterNavItem[];
  continueHref: string;
};

export function MobileNavigation({
  activeChapterId,
  activeItem = "chapters",
  chapters,
  continueHref,
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
      <nav className="bottom-nav" aria-label="Mobile quick navigation">
        <button
          aria-current={activeItem === "chapters" ? "page" : undefined}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          Chapters
        </button>
        <Link
          aria-current={activeItem === "continue" ? "page" : undefined}
          href={continueHref}
        >
          Continue
        </Link>
        <Link
          aria-current={activeItem === "practice" ? "page" : undefined}
          href="/practice"
        >
          Practice
        </Link>
        <Link
          aria-current={activeItem === "refs" ? "page" : undefined}
          href="/references"
        >
          Refs
        </Link>
      </nav>

      {isOpen ? (
        <div className="chapter-sheet" role="presentation">
          <button
            aria-label="Close chapter picker"
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
              <h2 id={titleId}>Chapters</h2>
              <button
                aria-label="Close chapters"
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
                  ? "Current"
                  : chapter.status === "planned"
                    ? "Planned"
                    : null;

                return (
                  <Link
                    aria-current={isCurrent ? "page" : undefined}
                    className="chapter-sheet__item"
                    href={getChapterHref(chapter)}
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
