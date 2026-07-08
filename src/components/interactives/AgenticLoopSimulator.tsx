 "use client";

import type { DecisionScenario } from "@/content/scenarios";
import { DecisionTool } from "./DecisionTool";

type AgenticLoopSimulatorProps = {
  cases: readonly DecisionScenario[];
};

export function AgenticLoopSimulator({ cases }: AgenticLoopSimulatorProps) {
  return (
    <DecisionTool
      title="Agentic Loop Simulator"
      intro="Practice deciding whether the loop should continue, stop, zoom out, or ask for human input."
      scenarios={cases}
    />
  );
}
