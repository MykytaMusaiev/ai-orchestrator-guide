"use client";

import { useId, useState } from "react";
import type { LearningCheckpoint } from "@/content/sections";

type RevealBlockProps = {
  checkpoint: LearningCheckpoint;
};

export function RevealBlock({ checkpoint }: RevealBlockProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const revealId = useId();

  return (
    <section
      className="reveal-block"
      id={checkpoint.id}
      aria-labelledby={`${checkpoint.id}-title`}
    >
      <div className="reveal-block__prompt">
        <p className="eyebrow">Decision checkpoint</p>
        <h2 id={`${checkpoint.id}-title`}>Make the authority call</h2>
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
        {isRevealed ? "Hide expected move" : "Reveal expected move"}
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
            <strong>Durable habit:</strong> {checkpoint.durableHabit}
          </div>
          <div className="concept-row" aria-label="Related concepts">
            {checkpoint.relatedConcepts.map((concept) => (
              <span key={concept}>{concept}</span>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
