"use client";

import Link from "next/link";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import type {
  CompactPracticeScenario,
  GateId,
  Locale,
  UiDictionary,
} from "@/content";
import { getChapterSectionHref } from "@/lib/i18n/routing";

type CompactPracticeAssessmentProps = {
  scenario: CompactPracticeScenario;
  gateTitles: Record<GateId, string>;
  locale: Locale;
  ui: UiDictionary["interactives"];
};

export function CompactPracticeAssessment({
  scenario,
  gateTitles,
  locale,
  ui,
}: CompactPracticeAssessmentProps) {
  const legendId = useId();
  const errorId = useId();
  const reviewRef = useRef<HTMLHeadingElement>(null);
  const [choiceId, setChoiceId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const selectedChoice = scenario.choices.find((choice) => choice.id === choiceId);

  useEffect(() => {
    if (submitted) {
      reviewRef.current?.focus();
    }
  }, [submitted]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!choiceId) {
      setError(ui.requiredChoice);
      return;
    }

    setError("");
    setSubmitted(true);
  }

  function reset() {
    setChoiceId("");
    setSubmitted(false);
    setError("");
  }

  return (
    <div className="interactive__panel">
      <div className="interactive__situation">
        <h3>{scenario.title}</h3>
        <p>{scenario.situation}</p>
        {scenario.evidence?.length ? (
          <div className="evidence-block">
            <h4>{ui.evidence}</h4>
            <ul>
              {scenario.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <fieldset aria-describedby={error ? errorId : undefined} className="assessment-fieldset">
            <legend id={legendId}>{ui.choiceInstruction}</legend>
            <div className="assessment-options">
              {scenario.choices.map((choice) => (
                <label className="assessment-option" key={choice.id}>
                  <input
                    checked={choiceId === choice.id}
                    name={`compact-${scenario.id}`}
                    onChange={() => {
                      setChoiceId(choice.id);
                      setError("");
                    }}
                    type="radio"
                    value={choice.id}
                  />
                  <span>{choice.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {error ? (
            <p aria-live="polite" className="assessment-error" id={errorId}>
              {error}
            </p>
          ) : null}
          <div className="assessment-actions">
            <button className="assessment-primary" type="submit">
              {ui.submitDecision}
            </button>
          </div>
        </form>
      ) : selectedChoice ? (
        <div className="assessment-review">
          <h3 ref={reviewRef} tabIndex={-1}>
            {ui.reviewTitle}
          </h3>
          <p>
            <strong>{ui.selectedAnswer}</strong> {selectedChoice.label}
          </p>
          <p className={selectedChoice.correct ? "feedback-correct" : "feedback-neutral"}>
            {selectedChoice.feedback}
          </p>
          <p>
            <strong>{ui.correctMove}</strong> {scenario.correctMove}
          </p>
          <p>
            <strong>{ui.consequence}</strong> {scenario.consequence}
          </p>
          <p>
            <strong>{ui.durableCorrectionCandidate}</strong>{" "}
            {scenario.durableCorrectionCandidate}
          </p>
          <div className="concept-row" aria-label={ui.relatedGates}>
            {scenario.relatedGates.map((gateId) => (
              <Link
                href={getChapterSectionHref("quality-gates", `gate-${gateId}`, locale)}
                key={gateId}
              >
                {gateTitles[gateId]}
              </Link>
            ))}
          </div>
          <div className="assessment-actions">
            <button className="assessment-secondary" onClick={reset} type="button">
              {ui.retry}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
