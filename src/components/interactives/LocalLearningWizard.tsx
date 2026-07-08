 "use client";

import type { LocalLearningCase } from "@/content/scenarios";
import { DecisionTool } from "./DecisionTool";

type LocalLearningWizardProps = {
  cases: readonly LocalLearningCase[];
};

export function LocalLearningWizard({ cases }: LocalLearningWizardProps) {
  return (
    <DecisionTool
      title="Local Learning Loop Wizard"
      intro="Classify the failure signal and route the correction to the smallest durable layer that will intercept it later."
      scenarios={cases}
      extraMeta={(scenario) => {
        const item = scenario as LocalLearningCase;

        return (
          <dl className="meta-grid">
            <div>
              <dt>Failure signal</dt>
              <dd>{item.failureSignal}</dd>
            </div>
            <div>
              <dt>Durable target</dt>
              <dd>{item.durableTarget}</dd>
            </div>
          </dl>
        );
      }}
    />
  );
}
