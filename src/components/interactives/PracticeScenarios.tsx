 "use client";

import type { DecisionScenario, GateId, PracticeScenario, UiDictionary } from "@/content";
import { DecisionTool } from "./DecisionTool";

type PracticeScenariosProps = {
  scenarios: readonly PracticeScenario[];
  gateTitles: Record<GateId, string>;
  ui: UiDictionary["interactives"];
};

export function PracticeScenarios({
  scenarios,
  gateTitles,
  ui,
}: PracticeScenariosProps) {
  return (
    <DecisionTool
      title={ui.practiceScenariosTitle}
      intro={ui.practiceScenariosIntro}
      scenarios={scenarios}
      gateTitles={gateTitles}
      ui={ui}
      extraMeta={(scenario: DecisionScenario) => {
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
  );
}
