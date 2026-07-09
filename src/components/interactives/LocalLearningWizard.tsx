 "use client";

import type { DecisionScenario, GateId, LocalLearningCase, UiDictionary } from "@/content";
import { DecisionTool } from "./DecisionTool";

type LocalLearningWizardProps = {
  cases: readonly LocalLearningCase[];
  gateTitles: Record<GateId, string>;
  ui: UiDictionary["interactives"];
};

export function LocalLearningWizard({
  cases,
  gateTitles,
  ui,
}: LocalLearningWizardProps) {
  return (
    <DecisionTool
      title={ui.localLearningTitle}
      intro={ui.localLearningIntro}
      scenarios={cases}
      gateTitles={gateTitles}
      ui={ui}
      extraMeta={(scenario: DecisionScenario) => {
        const item = scenario as LocalLearningCase;

        return (
          <dl className="meta-grid">
            <div>
              <dt>{ui.failureSignal}</dt>
              <dd>{item.failureSignal}</dd>
            </div>
            <div>
              <dt>{ui.durableTarget}</dt>
              <dd>{item.durableTarget}</dd>
            </div>
          </dl>
        );
      }}
    />
  );
}
