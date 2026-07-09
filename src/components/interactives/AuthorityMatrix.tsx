 "use client";

import type { AuthorityMatrixCase, DecisionScenario, GateId, UiDictionary } from "@/content";
import { DecisionTool } from "./DecisionTool";

type AuthorityMatrixProps = {
  cases: readonly AuthorityMatrixCase[];
  gateTitles: Record<GateId, string>;
  ui: UiDictionary["interactives"];
};

export function AuthorityMatrix({ cases, gateTitles, ui }: AuthorityMatrixProps) {
  return (
    <DecisionTool
      title={ui.authorityMatrixTitle}
      intro={ui.authorityMatrixIntro}
      scenarios={cases}
      gateTitles={gateTitles}
      ui={ui}
      extraMeta={(scenario: DecisionScenario) => {
        const item = scenario as AuthorityMatrixCase;

        return (
          <dl className="meta-grid">
            <div>
              <dt>{ui.authorityLayer}</dt>
              <dd>{item.authorityLayer}</dd>
            </div>
            <div>
              <dt>{ui.sourceOfTruth}</dt>
              <dd>{item.sourceOfTruth}</dd>
            </div>
          </dl>
        );
      }}
    />
  );
}
