type RelatedConceptTarget = {
  chapterSlug: string;
  fragment: string;
};

export const relatedConceptTargets: Readonly<Record<string, RelatedConceptTarget>> = {
  "authority layer": {
    chapterSlug: "authority-source-of-truth",
    fragment: "authority-layer",
  },
  "source of truth": {
    chapterSlug: "authority-source-of-truth",
    fragment: "authority-layer",
  },
  context: {
    chapterSlug: "context-engineering",
    fragment: "context-is-evidence",
  },
  "контекст": {
    chapterSlug: "context-engineering",
    fragment: "context-is-evidence",
  },
  workflow: {
    chapterSlug: "workflow-vs-agent",
    fragment: "workflow",
  },
  agent: {
    chapterSlug: "workflow-vs-agent",
    fragment: "agent",
  },
  "workflow level": {
    chapterSlug: "workflow-vs-agent",
    fragment: "workflow",
  },
  "prompt chaining": {
    chapterSlug: "core-workflow-patterns",
    fragment: "pattern-prompt-chaining",
  },
  "repo facts": {
    chapterSlug: "coding-agent-workflow",
    fragment: "repo-files-win",
  },
  "audit depth": {
    chapterSlug: "task-lanes-audit-depth",
    fragment: "lanes",
  },
  "agentic loop": {
    chapterSlug: "agentic-loop",
    fragment: "loop-shape",
  },
  "stop condition": {
    chapterSlug: "agentic-loop",
    fragment: "loop-shape",
  },
  "durable correction": {
    chapterSlug: "local-learning",
    fragment: "durable-model",
  },
  "session-local": {
    chapterSlug: "local-learning",
    fragment: "not-autonomous",
  },
  "durable workflow improvement": {
    chapterSlug: "local-learning",
    fragment: "not-autonomous",
  },
  "validation gate": {
    chapterSlug: "quality-gates",
    fragment: "gate-validation",
  },
  "source-of-truth gate": {
    chapterSlug: "quality-gates",
    fragment: "gate-source-of-truth",
  },
  "ownership gate": {
    chapterSlug: "quality-gates",
    fragment: "gate-ownership",
  },
  "permission gate": {
    chapterSlug: "quality-gates",
    fragment: "gate-permission",
  },
  "UI QA gate": {
    chapterSlug: "quality-gates",
    fragment: "gate-ui-qa",
  },
  "lifecycle-close gate": {
    chapterSlug: "quality-gates",
    fragment: "gate-lifecycle-close",
  },
  "zoom out": {
    chapterSlug: "zoom-out",
    fragment: "zoom-signals",
  },
  practice: {
    chapterSlug: "practice-scenarios",
    fragment: "capstone",
  },
  "operating checklist": {
    chapterSlug: "operating-checklist",
    fragment: "checklist",
  },
  "current docs": {
    chapterSlug: "references",
    fragment: "reference-role",
  },
  "source-backed claims": {
    chapterSlug: "references",
    fragment: "reference-role",
  },
  "твердження з джерелами": {
    chapterSlug: "references",
    fragment: "reference-role",
  },
};
