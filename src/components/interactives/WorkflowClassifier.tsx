 "use client";

import type {
  DecisionScenario,
  GateId,
  Locale,
  UiDictionary,
  WorkflowClassifierCase,
  WorkflowPatternId,
  WorkflowPattern,
} from "@/content";
import { DecisionTool } from "./DecisionTool";

type WorkflowClassifierProps = {
  cases: readonly WorkflowClassifierCase[];
  gateTitles: Record<GateId, string>;
  locale: Locale;
  patterns: readonly WorkflowPattern[];
  ui: UiDictionary["interactives"];
};

export function WorkflowClassifier({
  cases,
  gateTitles,
  locale,
  patterns,
  ui,
}: WorkflowClassifierProps) {
  const getPattern = (id: WorkflowPatternId) =>
    patterns.find((pattern) => pattern.id === id);

  return (
    <DecisionTool
      title={ui.workflowClassifierTitle}
      intro={ui.workflowClassifierIntro}
      scenarios={cases}
      gateTitles={gateTitles}
      locale={locale}
      ui={ui}
      answerMeta={(scenario: DecisionScenario) => {
        const item = scenario as WorkflowClassifierCase;
        const pattern = getPattern(item.patternId);

        return pattern ? (
          <dl className="meta-grid">
            <div>
              <dt>{ui.targetPattern}</dt>
              <dd>{pattern.title}</dd>
            </div>
            <div>
              <dt>{ui.risk}</dt>
              <dd>{pattern.orchestratorRisk}</dd>
            </div>
          </dl>
        ) : null;
      }}
    />
  );
}
