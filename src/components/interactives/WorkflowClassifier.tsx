 "use client";

import { getPattern } from "@/content/patterns";
import type { WorkflowClassifierCase } from "@/content/scenarios";
import { DecisionTool } from "./DecisionTool";

type WorkflowClassifierProps = {
  cases: readonly WorkflowClassifierCase[];
};

export function WorkflowClassifier({ cases }: WorkflowClassifierProps) {
  return (
    <DecisionTool
      title="Workflow Classifier"
      intro="Classify the workflow pattern and notice the orchestrator risk before work starts."
      scenarios={cases}
      extraMeta={(scenario) => {
        const item = scenario as WorkflowClassifierCase;
        const pattern = getPattern(item.patternId);

        return pattern ? (
          <dl className="meta-grid">
            <div>
              <dt>Target pattern</dt>
              <dd>{pattern.title}</dd>
            </div>
            <div>
              <dt>Risk</dt>
              <dd>{pattern.orchestratorRisk}</dd>
            </div>
          </dl>
        ) : null;
      }}
    />
  );
}
