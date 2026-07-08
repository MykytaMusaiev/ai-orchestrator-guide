 "use client";

import type { DecisionScenario } from "@/content/scenarios";
import { DecisionTool } from "./DecisionTool";

type PermissionRiskStressTestProps = {
  cases: readonly DecisionScenario[];
};

export function PermissionRiskStressTest({ cases }: PermissionRiskStressTestProps) {
  return (
    <DecisionTool
      title="Permission / Risk Gate Stress-Test"
      intro="Pause, explain the risk, identify the gate, and decide whether to ask approval, validate, stop, or zoom out."
      scenarios={cases}
    />
  );
}
