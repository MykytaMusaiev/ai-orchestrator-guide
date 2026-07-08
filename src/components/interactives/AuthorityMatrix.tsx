 "use client";

import type { AuthorityMatrixCase } from "@/content/scenarios";
import { DecisionTool } from "./DecisionTool";

type AuthorityMatrixProps = {
  cases: readonly AuthorityMatrixCase[];
};

export function AuthorityMatrix({ cases }: AuthorityMatrixProps) {
  return (
    <DecisionTool
      title="Source-of-Truth Authority Matrix"
      intro="Choose the authority layer before choosing whether the agent can continue."
      scenarios={cases}
      extraMeta={(scenario) => {
        const item = scenario as AuthorityMatrixCase;

        return (
          <dl className="meta-grid">
            <div>
              <dt>Authority layer</dt>
              <dd>{item.authorityLayer}</dd>
            </div>
            <div>
              <dt>Source of truth</dt>
              <dd>{item.sourceOfTruth}</dd>
            </div>
          </dl>
        );
      }}
    />
  );
}
