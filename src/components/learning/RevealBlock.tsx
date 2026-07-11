"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { LearningCheckpoint, Locale, UiDictionary } from "@/content";
import { relatedConceptTargets } from "@/content/related-concepts";
import { getChapterSectionHref } from "@/lib/i18n/routing";

type RevealBlockProps = {
  checkpoint: LearningCheckpoint;
  locale: Locale;
  ui: UiDictionary["learning"];
};

export function RevealBlock({ checkpoint, locale, ui }: RevealBlockProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const revealId = useId();

  return (
    <section
      className="reveal-block"
      id={checkpoint.id}
      aria-labelledby={`${checkpoint.id}-title`}
    >
      <div className="reveal-block__prompt">
        <p className="eyebrow">{ui.decisionCheckpoint}</p>
        <h2 id={`${checkpoint.id}-title`}>{ui.checkpointTitle}</h2>
        <p>{checkpoint.prompt}</p>
        <p className="checkpoint-instruction">{checkpoint.instruction}</p>
      </div>

      <button
        aria-controls={revealId}
        aria-expanded={isRevealed}
        className="reveal-button"
        onClick={() => setIsRevealed((current) => !current)}
        type="button"
      >
        {isRevealed ? ui.hideExpectedMove : ui.revealExpectedMove}
      </button>

      {isRevealed ? (
        <div className="reveal-block__answer" id={revealId}>
          <h3>{checkpoint.revealTitle}</h3>
          <ul>
            {checkpoint.reveal.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="durable-habit">
            <strong>{ui.durableHabit}</strong> {checkpoint.durableHabit}
          </div>
          <div className="concept-row" aria-label={ui.relatedConcepts}>
            {checkpoint.relatedConcepts.map((concept) => (
              relatedConceptTargets[concept] ? (
                <Link
                  href={getChapterSectionHref(
                    relatedConceptTargets[concept].chapterSlug,
                    relatedConceptTargets[concept].fragment,
                    locale,
                  )}
                  key={concept}
                >
                  {concept}
                </Link>
              ) : (
                <span key={concept}>{concept}</span>
              )
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
