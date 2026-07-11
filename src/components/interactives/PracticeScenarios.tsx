 "use client";

import { useState } from "react";
import type { DecisionScenario, GateId, Locale, PracticeScenario, UiDictionary } from "@/content";
import { CapstoneAssessment } from "./CapstoneAssessment";
import { CompactPracticeAssessment } from "./CompactPracticeAssessment";
import { DecisionTool } from "./DecisionTool";

type PracticeScenariosProps = {
  scenarios: readonly PracticeScenario[];
  gateTitles: Record<GateId, string>;
  locale: Locale;
  mode: "guided" | "assessment";
  ui: UiDictionary["interactives"];
};

export function PracticeScenarios({
  scenarios,
  gateTitles,
  locale,
  mode,
  ui,
}: PracticeScenariosProps) {
  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id ?? "");
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];
  const fullScenarios = scenarios.filter((item) => item.kind === "full");
  const compactScenarios = scenarios.filter((item) => item.kind === "compact");
  const guidedScenario =
    fullScenarios.find((item) => item.id === scenarioId) ?? fullScenarios[0];

  if (!scenario) {
    return null;
  }

  if (mode === "assessment") {
    return (
      <section className="interactive" aria-labelledby="practice-assessment-title">
        <div className="interactive__header">
          <p className="eyebrow">{ui.assessmentMode}</p>
          <h2 id="practice-assessment-title">{ui.practiceScenariosTitle}</h2>
          <p>{ui.assessmentModeIntro}</p>
        </div>
        <div className="interactive__tabs" aria-label={ui.scenariosLabel}>
          {scenarios.map((item, index) => (
            <button
              aria-pressed={item.id === scenario.id}
              key={item.id}
              onClick={() => setScenarioId(item.id)}
              type="button"
            >
              {String(index + 1).padStart(2, "0")} · {item.title}
            </button>
          ))}
        </div>
        {scenario.kind === "full" ? (
          <CapstoneAssessment
            gateTitles={gateTitles}
            key={scenario.id}
            locale={locale}
            mode="assessment"
            scenario={scenario}
            ui={ui}
          />
        ) : (
          <CompactPracticeAssessment
            gateTitles={gateTitles}
            key={scenario.id}
            locale={locale}
            scenario={scenario}
            ui={ui}
          />
        )}
      </section>
    );
  }

  return (
    <>
      {guidedScenario?.kind === "full" ? (
        <section className="interactive" aria-labelledby="guided-capstone-title">
          <div className="interactive__header">
            <p className="eyebrow">{ui.guidedMode}</p>
            <h2 id="guided-capstone-title">{ui.practiceScenariosTitle}</h2>
            <p>{ui.guidedModeIntro}</p>
          </div>
          <div className="interactive__tabs" aria-label={ui.scenariosLabel}>
            {fullScenarios.map((item) => (
              <button
                aria-pressed={item.id === guidedScenario.id}
                key={item.id}
                onClick={() => setScenarioId(item.id)}
                type="button"
              >
                {item.title}
              </button>
            ))}
          </div>
          <CapstoneAssessment
            gateTitles={gateTitles}
            key={guidedScenario.id}
            locale={locale}
            mode="guided"
            scenario={guidedScenario}
            ui={ui}
          />
        </section>
      ) : null}

      <DecisionTool
        title={ui.practiceScenariosTitle}
        intro={ui.guidedModeIntro}
        scenarios={compactScenarios}
        gateTitles={gateTitles}
        locale={locale}
        ui={ui}
        answerMeta={(scenario: DecisionScenario) => {
          const item = scenario as PracticeScenario;

          return (
            <dl className="meta-grid">
              <div>
                <dt>{ui.durableCorrectionCandidate}</dt>
                <dd>{item.durableCorrectionCandidate}</dd>
              </div>
            </dl>
          );
        }}
      />
    </>
  );
}
