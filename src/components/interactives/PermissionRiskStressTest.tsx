 "use client";

import type { DecisionScenario, GateId, Locale, UiDictionary } from "@/content";
import { DecisionTool } from "./DecisionTool";

type PermissionRiskStressTestProps = {
  cases: readonly DecisionScenario[];
  gateTitles: Record<GateId, string>;
  locale: Locale;
  ui: UiDictionary["interactives"];
};

export function PermissionRiskStressTest({
  cases,
  gateTitles,
  locale,
  ui,
}: PermissionRiskStressTestProps) {
  return (
    <DecisionTool
      title={ui.permissionRiskTitle}
      intro={ui.permissionRiskIntro}
      scenarios={cases}
      gateTitles={gateTitles}
      locale={locale}
      ui={ui}
    />
  );
}
