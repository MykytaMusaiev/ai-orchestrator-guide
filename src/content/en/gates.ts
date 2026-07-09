import type { Gate, GateId } from "../schemas";

export const gates = [
  {
    id: "validation",
    title: "Validation gate",
    purpose: "Proves the technical change works at the right level.",
    useWhen: "Builds, tests, type checks, static checks, or targeted commands can verify the task.",
    watchOut: "Passing validation is not the same as correct visible behavior or correct product direction.",
  },
  {
    id: "source-of-truth",
    title: "Source-of-truth gate",
    purpose: "Forces the orchestrator to choose the correct authority layer before continuing.",
    useWhen: "The agent makes a claim about repo behavior, tool behavior, product intent, or current docs.",
    watchOut: "Do not resolve conflicts by asking the model to guess which source is true.",
  },
  {
    id: "ownership",
    title: "Ownership gate",
    purpose: "Protects local/shared boundaries and project ownership conventions.",
    useWhen: "A change moves helpers, changes shared code, edits rules, or crosses module boundaries.",
    watchOut: "Common framework practice is not enough evidence for this repo.",
  },
  {
    id: "permission",
    title: "Permission gate",
    purpose: "Pauses risky, irreversible, security-sensitive, or scope-expanding actions.",
    useWhen: "The agent wants to delete, install, rewrite rules, run destructive commands, or alter critical boundaries.",
    watchOut: "Tool permissions are product mechanisms, not a substitute for orchestrator judgment.",
  },
  {
    id: "ui-qa",
    title: "UI QA gate",
    purpose: "Checks visible behavior that builds and tests may miss.",
    useWhen: "The task changes layout, interaction, copy density, visual hierarchy, or browser behavior.",
    watchOut: "A green build can still ship a broken or awkward UI.",
  },
  {
    id: "lifecycle-close",
    title: "Lifecycle-close gate",
    purpose: "Prevents closing a task without evidence and acceptance.",
    useWhen: "The agent says it is done, wants to archive artifacts, or skips final verification.",
    watchOut: "Do not confuse implementation completion with accepted task completion.",
  },
  {
    id: "durable-correction",
    title: "Durable correction gate",
    purpose: "Routes repeated failures to the right durable layer with orchestrator approval.",
    useWhen: "A mistake is likely to repeat across future runs.",
    watchOut: "Not every correction belongs in a rule, skill, test, docs update, or gate.",
  },
] satisfies Gate[];

export function getGateTitle(id: GateId) {
  return gates.find((gate) => gate.id === id)?.title ?? id;
}
