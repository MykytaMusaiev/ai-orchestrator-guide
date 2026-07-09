"use client";

import { useId, useState } from "react";
import type { DecisionScenario, GateId, UiDictionary } from "@/content";

type DecisionToolProps = {
  title: string;
  intro: string;
  scenarios: readonly DecisionScenario[];
  gateTitles: Record<GateId, string>;
  ui: UiDictionary["interactives"];
  extraMeta?: (scenario: DecisionScenario) => React.ReactNode;
};

export function DecisionTool({
  title,
  intro,
  scenarios,
  gateTitles,
  ui,
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
        <p className="eyebrow">{ui.eyebrow}</p>
        <h2 id={headingId}>{title}</h2>
        <p>{intro}</p>
      </div>

      {scenarios.length > 1 ? (
        <div className="interactive__tabs" aria-label={`${title} ${ui.scenariosLabel}`}>
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
            {ui.choiceInstruction}
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
              <strong>{ui.correctMove}</strong> {scenario.correctMove}
            </p>
            <p>
              <strong>{ui.consequence}</strong> {scenario.consequence}
            </p>
            {scenario.relatedGates.length ? (
              <div className="concept-row" aria-label={ui.relatedGates}>
                {scenario.relatedGates.map((gateId) => (
                  <span key={gateId}>{gateTitles[gateId]}</span>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="interactive__hint">{ui.chooseHint}</p>
        )}
      </div>
    </section>
  );
}
