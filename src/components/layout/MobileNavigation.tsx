"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const shouldRestoreFocusRef = useRef(false);

  const closeDialog = useCallback(() => {
    shouldRestoreFocusRef.current = true;
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (!shouldRestoreFocusRef.current) {
        return;
      }

      shouldRestoreFocusRef.current = false;
      const frame = window.requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });

      return () => window.cancelAnimationFrame(frame);
    }

    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const getFocusableElements = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("hidden"));

    const initialFocus =
      dialog.querySelector<HTMLElement>('[aria-current="page"]') ??
      dialog.querySelector<HTMLElement>("[data-chapter-link]") ??
      getFocusableElements()[0] ??
      dialog;

    initialFocus.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements();

      if (!focusableElements.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (!dialog.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeDialog, isOpen]);

  return (
    <>
      <nav className="bottom-nav" aria-label={ui.layout.mobileQuickNavigation}>
        <button
          aria-current={activeItem === "chapters" ? "page" : undefined}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          onClick={() => setIsOpen(true)}
          ref={triggerRef}
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
            onClick={closeDialog}
            tabIndex={-1}
            type="button"
          />
          <section
            aria-labelledby={titleId}
            aria-modal="true"
            className="chapter-sheet__panel"
            ref={dialogRef}
            role="dialog"
            tabIndex={-1}
          >
            <div className="chapter-sheet__header">
              <span aria-hidden="true" />
              <h2 id={titleId}>{ui.navigation.chapters}</h2>
              <button
                aria-label={ui.layout.closeChapters}
                className="chapter-sheet__close"
                onClick={closeDialog}
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
                    data-chapter-link
                    href={getChapterHref(chapter, locale)}
                    key={chapter.id}
                    onClick={closeDialog}
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
