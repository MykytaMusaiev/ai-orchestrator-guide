"use client";

import { useId, useState } from "react";
import { getGateTitle } from "@/content/gates";
import type { DecisionScenario } from "@/content/scenarios";

type DecisionToolProps = {
  title: string;
  intro: string;
  scenarios: readonly DecisionScenario[];
  extraMeta?: (scenario: DecisionScenario) => React.ReactNode;
};

export function DecisionTool({
  title,
  intro,
  scenarios,
  extraMeta,
}: DecisionToolProps) {
  const headingId = useId();
  const choiceGroupId = useId();
  const feedbackId = useId();
  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id ?? "");
  const [choiceId, setChoiceId] = useState<string | null>(null);
  const scenario =
    scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];
  const selectedChoice = scenario?.choices.find((choice) => choice.id === choiceId);

  if (!scenario) {
    return null;
  }

  return (
    <section className="interactive" aria-labelledby={headingId}>
      <div className="interactive__header">
        <p className="eyebrow">Interactive</p>
        <h2 id={headingId}>{title}</h2>
        <p>{intro}</p>
      </div>

      {scenarios.length > 1 ? (
        <div className="interactive__tabs" aria-label={`${title} scenarios`}>
          {scenarios.map((item) => (
            <button
              aria-pressed={item.id === scenario.id}
              key={item.id}
              onClick={() => {
                setScenarioId(item.id);
                setChoiceId(null);
              }}
              type="button"
            >
              {item.title}
            </button>
          ))}
        </div>
      ) : null}

      <div className="interactive__panel">
        <div className="interactive__situation">
          <h3>{scenario.title}</h3>
          <p>{scenario.situation}</p>
          {extraMeta ? extraMeta(scenario) : null}
        </div>

        <div
          aria-describedby={selectedChoice ? feedbackId : undefined}
          aria-labelledby={choiceGroupId}
          className="choice-grid"
          role="group"
        >
          <p className="sr-only" id={choiceGroupId}>
            Choose the orchestrator move for this scenario.
          </p>
          {scenario.choices.map((choice) => (
            <button
              aria-pressed={choice.id === choiceId}
              className={choice.id === choiceId ? "choice-button is-selected" : "choice-button"}
              key={choice.id}
              onClick={() => setChoiceId(choice.id)}
              type="button"
            >
              {choice.label}
            </button>
          ))}
        </div>

        {selectedChoice ? (
          <div aria-live="polite" className="feedback-panel" id={feedbackId}>
            <p className={selectedChoice.correct ? "feedback-correct" : "feedback-neutral"}>
              {selectedChoice.feedback}
            </p>
            <p>
              <strong>Correct move:</strong> {scenario.correctMove}
            </p>
            <p>
              <strong>Consequence:</strong> {scenario.consequence}
            </p>
            {scenario.relatedGates.length ? (
              <div className="concept-row" aria-label="Related gates">
                {scenario.relatedGates.map((gateId) => (
                  <span key={gateId}>{getGateTitle(gateId)}</span>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="interactive__hint">Choose a move to reveal feedback.</p>
        )}
      </div>
    </section>
  );
}
