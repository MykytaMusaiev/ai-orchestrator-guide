 "use client";

import type { DecisionScenario, GateId, LocalLearningCase, Locale, UiDictionary } from "@/content";
import { DecisionTool } from "./DecisionTool";

type LocalLearningWizardProps = {
  cases: readonly LocalLearningCase[];
  gateTitles: Record<GateId, string>;
  locale: Locale;
  ui: UiDictionary["interactives"];
};

export function LocalLearningWizard({
  cases,
  gateTitles,
  locale,
  ui,
}: LocalLearningWizardProps) {
  return (
    <DecisionTool
      title={ui.localLearningTitle}
      intro={ui.localLearningIntro}
      scenarios={cases}
      gateTitles={gateTitles}
      locale={locale}
      ui={ui}
      contextMeta={(scenario: DecisionScenario) => {
        const item = scenario as LocalLearningCase;

        return (
          <dl className="meta-grid">
            <div>
              <dt>{ui.failureSignal}</dt>
              <dd>{item.failureSignal}</dd>
            </div>
          </dl>
        );
      }}
      answerMeta={(scenario: DecisionScenario) => {
        const item = scenario as LocalLearningCase;

        return (
          <dl className="meta-grid">
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
