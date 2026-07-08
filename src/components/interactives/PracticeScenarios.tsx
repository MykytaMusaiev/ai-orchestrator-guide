 "use client";

import type { PracticeScenario } from "@/content/scenarios";
import { DecisionTool } from "./DecisionTool";

type PracticeScenariosProps = {
  scenarios: readonly PracticeScenario[];
};

export function PracticeScenarios({ scenarios }: PracticeScenariosProps) {
  return (
    <DecisionTool
      title="Practice Scenarios"
      intro="Mixed scenarios combine ownership, source of truth, UI QA, zoom-out, durable correction, permission gates, and high-risk boundaries."
      scenarios={scenarios}
      extraMeta={(scenario) => {
        const item = scenario as PracticeScenario;

        return (
          <dl className="meta-grid">
            <div>
              <dt>Durable correction candidate</dt>
              <dd>{item.durableCorrectionCandidate}</dd>
            </div>
          </dl>
        );
      }}
    />
  );
}
