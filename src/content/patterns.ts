import type { GateId } from "./gates";

export type WorkflowPatternId =
  | "prompt-chaining"
  | "routing"
  | "parallelization"
  | "orchestrator-worker"
  | "evaluator-optimizer"
  | "agent";

export type WorkflowPattern = {
  id: WorkflowPatternId;
  title: string;
  means: string;
  useWhen: string;
  avoidWhen: string;
  orchestratorRisk: string;
  requiredGate: GateId;
  codingExample: string;
};

export const workflowPatterns = [
  {
    id: "prompt-chaining",
    title: "Prompt chaining",
    means: "Break work into ordered steps where each output feeds the next step.",
    useWhen: "The task has a known sequence, such as inspect -> edit -> validate -> summarize.",
    avoidWhen: "The task needs open-ended tool exploration or parallel independent opinions.",
    orchestratorRisk: "Early wrong assumptions contaminate later steps.",
    requiredGate: "source-of-truth",
    codingExample: "Ask for a repo pattern summary, then request a small edit grounded in the inspected files.",
  },
  {
    id: "routing",
    title: "Routing",
    means: "Classify the task and send it to the right workflow lane.",
    useWhen: "Different task types need different authority layers, gates, or audit depth.",
    avoidWhen: "The task is already narrow and the route is obvious.",
    orchestratorRisk: "A low-risk lane may be chosen for a high-risk boundary change.",
    requiredGate: "permission",
    codingExample: "Route copy changes to light validation, but auth changes to high-risk review and approval.",
  },
  {
    id: "parallelization",
    title: "Parallelization",
    means: "Run independent checks or proposals side by side, then compare results.",
    useWhen: "Independent review paths can reduce blind spots.",
    avoidWhen: "The subtasks share mutable files or need one source of truth first.",
    orchestratorRisk: "Conflicting outputs can create merge confusion or false confidence.",
    requiredGate: "lifecycle-close",
    codingExample: "Have one pass inspect UI behavior and another inspect tests, then reconcile evidence.",
  },
  {
    id: "orchestrator-worker",
    title: "Orchestrator-worker",
    means: "A central orchestrator breaks work into bounded worker tasks and integrates outputs.",
    useWhen: "The work is larger but can be split into clear scopes.",
    avoidWhen: "The task is small enough that delegation adds overhead.",
    orchestratorRisk: "Workers may optimize locally while missing system-level constraints.",
    requiredGate: "ownership",
    codingExample: "Assign separate workers to docs, component edits, and validation, then review the combined diff.",
  },
  {
    id: "evaluator-optimizer",
    title: "Evaluator-optimizer",
    means: "Generate an output, evaluate it, improve it, then stop when the gate is satisfied.",
    useWhen: "Quality can be checked against a clear rubric or acceptance condition.",
    avoidWhen: "The evaluator has no reliable signal or keeps moving the goalposts.",
    orchestratorRisk: "The loop can keep polishing symptoms instead of fixing the real issue.",
    requiredGate: "validation",
    codingExample: "Iterate on a failing test until it passes, then stop and summarize evidence.",
  },
  {
    id: "agent",
    title: "Agent",
    means: "A tool-using loop observes, plans, acts, checks, and decides whether to continue.",
    useWhen: "The path is not fully known and bounded exploration is useful.",
    avoidWhen: "The action is risky, irreversible, or needs human approval first.",
    orchestratorRisk: "The loop may continue after weak evidence or repeated failure.",
    requiredGate: "permission",
    codingExample: "Let an agent inspect files and run checks, but stop it before dependency or auth-boundary changes.",
  },
] satisfies WorkflowPattern[];

export function getPattern(id: WorkflowPatternId) {
  return workflowPatterns.find((pattern) => pattern.id === id);
}

