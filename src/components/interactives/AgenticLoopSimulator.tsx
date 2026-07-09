 "use client";

import type { DecisionScenario, GateId, UiDictionary } from "@/content";
import { DecisionTool } from "./DecisionTool";

type AgenticLoopSimulatorProps = {
  cases: readonly DecisionScenario[];
  gateTitles: Record<GateId, string>;
  ui: UiDictionary["interactives"];
};

export function AgenticLoopSimulator({
  cases,
  gateTitles,
  ui,
}: AgenticLoopSimulatorProps) {
  return (
    <DecisionTool
      title={ui.agenticLoopTitle}
      intro={ui.agenticLoopIntro}
      scenarios={cases}
      gateTitles={gateTitles}
      ui={ui}
    />
  );
}
