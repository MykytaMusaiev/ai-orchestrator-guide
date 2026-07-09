 "use client";

import type { DecisionScenario, GateId, UiDictionary } from "@/content";
import { DecisionTool } from "./DecisionTool";

type PermissionRiskStressTestProps = {
  cases: readonly DecisionScenario[];
  gateTitles: Record<GateId, string>;
  ui: UiDictionary["interactives"];
};

export function PermissionRiskStressTest({
  cases,
  gateTitles,
  ui,
}: PermissionRiskStressTestProps) {
  return (
    <DecisionTool
      title={ui.permissionRiskTitle}
      intro={ui.permissionRiskIntro}
      scenarios={cases}
      gateTitles={gateTitles}
      ui={ui}
    />
  );
}
