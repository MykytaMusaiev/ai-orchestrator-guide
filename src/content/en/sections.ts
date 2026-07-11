import type { ChapterNavItem, LearningChapter } from "../schemas";

const totalChapters = 14;

export const learningChapters = [
  {
    id: "ai-under-the-hood",
    slug: "ai-under-the-hood",
    order: 1,
    totalChapters,
    label: "01",
    status: "available",
    title: "AI under the hood",
    eyebrow: "Foundation",
    summary:
      "A practical mental model for why context, repo facts, source of truth, validation, and gates matter in AI coding work.",
    practices: [
      "Identify when an answer is only a plausible continuation.",
      "Name the authority layer needed for a repo-specific claim.",
      "Choose the first validation move before letting the agent continue.",
    ],
    sections: [
      {
        id: "plausible-continuation",
        eyebrow: "Core model",
        title: "Plausible does not mean project-true",
        summary:
          "LLM output can look logical while still being untrue for this repository.",
        paragraphs: [
          "An LLM can complete a plausible pattern that looks logical, but may not be true for this repo unless grounded in repo facts.",
          "The orchestrator determines the question type, chooses the right authority layer, checks the relevant source of truth, and picks the needed validation or quality gate.",
        ],
      },
      {
        id: "context-grounding",
        eyebrow: "Context",
        title: "Context is useful only when it grounds the task",
        summary:
          "More prompt text is not automatically better context.",
        paragraphs: [
          "Useful context includes file paths, current patterns, project docs, tests, constraints, and acceptance criteria.",
          "When the claim affects a concrete repo task, the next move is to inspect the repo fact or run the validation that can prove it.",
        ],
      },
    ],
    checkpoint: {
      id: "repo-pattern-check",
      prompt:
        "An agent says a helper should move to src/lib because that is common in Next.js apps. It has not searched this repo.",
      instruction:
        "Decide the authority layer, source of truth, and whether the agent should continue.",
      revealTitle: "Expected orchestrator move",
      reveal: [
        "Authority layer: repo facts and ownership boundaries, not generic convention.",
        "Source of truth: current file structure, nearby feature patterns, existing shared utilities, and project docs.",
        "Next action: stop the move, inspect the repo, then continue only if evidence supports shared ownership.",
      ],
      durableHabit:
        "When a recommendation relies on common practice but changes ownership, require repo evidence first.",
      relatedConcepts: ["authority layer", "source of truth", "ownership gate"],
    },
    sourceRefs: [],
    interactive: "self-check",
  },
  {
    id: "context-engineering",
    slug: "context-engineering",
    order: 2,
    totalChapters,
    label: "02",
    status: "available",
    title: "Context engineering",
    eyebrow: "Grounding",
    summary:
      "Context engineering means selecting the evidence that lets the agent answer the current task, not stuffing the prompt.",
    practices: [
      "Separate useful evidence from extra prompt length.",
      "Name missing context before asking the agent to act.",
      "Choose what must be inspected rather than guessed.",
    ],
    sections: [
      {
        id: "context-is-evidence",
        eyebrow: "Evidence",
        title: "Good context narrows uncertainty",
        summary:
          "Context should reduce the gap between a generic pattern and this repo's actual state.",
        paragraphs: [
          "Useful context answers: what files matter, what behavior is expected, what constraints apply, and what counts as done.",
          "Bad context is long but ungrounded: broad instructions, repeated warnings, or model-facing reminders that do not point to authority.",
        ],
      },
      {
        id: "context-before-action",
        eyebrow: "Workflow habit",
        title: "Ask what must be known before the edit",
        summary:
          "The orchestrator should identify missing facts before letting the loop spend edits.",
        paragraphs: [
          "If an agent cannot name the relevant files, tests, docs, or acceptance criteria, it is not ready to change code.",
          "The practical move is small: inspect the missing source, then continue with a narrower task.",
        ],
      },
    ],
    checkpoint: {
      id: "context-check",
      prompt:
        "A prompt got longer after a bug, but the agent still has not inspected the failing file or test.",
      instruction:
        "Decide whether this is better context or just more words.",
      revealTitle: "Expected orchestrator move",
      reveal: [
        "This is not enough grounding.",
        "Ask for the relevant file, failure output, and acceptance criteria before another edit.",
        "If the mistake is recurring, consider a durable correction instead of a longer prompt.",
      ],
      durableHabit:
        "Prefer source-backed context over repeated instruction text.",
      relatedConcepts: ["context", "source of truth", "durable correction"],
    },
    sourceRefs: [],
    interactive: "self-check",
  },
  {
    id: "authority-source-of-truth",
    slug: "authority-source-of-truth",
    order: 3,
    totalChapters,
    label: "03",
    status: "available",
    title: "Authority / source of truth",
    eyebrow: "Authority",
    summary:
      "Authority decisions turn vague trust questions into concrete validation steps.",
    practices: [
      "Classify the type of question.",
      "Choose the authority layer.",
      "Validate against the relevant source of truth.",
    ],
    sections: [
      {
        id: "authority-layer",
        eyebrow: "Decision model",
        title: "Choose the authority layer first",
        summary:
          "The right source depends on the question type.",
        paragraphs: [
          "Repo behavior should be grounded in code, tests, running behavior, and project docs.",
          "Tool or framework behavior should be grounded in current official docs. Product direction should be grounded in approved decisions or human approval.",
        ],
      },
      {
        id: "conflict-resolution",
        eyebrow: "Conflict",
        title: "Resolve conflicts procedurally",
        summary:
          "Do not ask the model to arbitrate between conflicting sources.",
        paragraphs: [
          "If Memory, docs, code, and model output conflict, choose the layer with the right authority for this question.",
          "The result is a validation move: inspect the source, run the check, ask approval, or stop.",
        ],
      },
    ],
    checkpoint: {
      id: "authority-checkpoint",
      prompt:
        "Memory says one package is standard. Current imports show another package.",
      instruction:
        "Pick the authority layer and next action.",
      revealTitle: "Expected orchestrator move",
      reveal: [
        "Authority layer: current repo facts and durable project docs.",
        "Next action: inspect imports and docs, then ground the decision there.",
        "Do not ask the model to guess which memory is newer.",
      ],
      durableHabit:
        "When sources conflict, classify authority instead of debating trust.",
      relatedConcepts: ["authority layer", "source-of-truth gate"],
    },
    sourceRefs: [],
    interactive: "authority-matrix",
  },
  {
    id: "workflow-vs-agent",
    slug: "workflow-vs-agent",
    order: 4,
    totalChapters,
    label: "04",
    status: "available",
    title: "Workflow vs agent",
    eyebrow: "Control model",
    summary:
      "A workflow is a predetermined path. An agent is a dynamic tool-using loop within bounds.",
    practices: [
      "Decide when a fixed path is enough.",
      "Decide when bounded exploration is useful.",
      "Set loop limits before agentic work starts.",
    ],
    sections: [
      {
        id: "workflow",
        eyebrow: "Workflow",
        title: "Use workflows when the path is known",
        summary:
          "A known sequence should not become a free-running agent loop.",
        paragraphs: [
          "For inspect -> edit -> validate -> summarize tasks, a workflow gives predictability and low overhead.",
          "The orchestrator still sets gates, but the path does not need dynamic exploration.",
        ],
        sourceRefs: ["anthropic-building-effective-agents"],
      },
      {
        id: "agent",
        eyebrow: "Agent",
        title: "Use agents when the path must be discovered",
        summary:
          "Agentic loops are useful when the next step depends on tool results.",
        paragraphs: [
          "An agent observes, plans, acts, checks, and decides whether to continue inside boundaries.",
          "The orchestrator must define stop conditions, risky actions, and validation gates before autonomy grows.",
        ],
        sourceRefs: ["willison-agent-definition"],
      },
    ],
    checkpoint: {
      id: "workflow-agent-check",
      prompt:
        "A typo fix has a known file and a known validation command. The agent proposes a broad repo exploration loop.",
      instruction:
        "Choose workflow or agent.",
      revealTitle: "Expected orchestrator move",
      reveal: [
        "Use a simple workflow, not a broad agent loop.",
        "The path is known and low risk.",
        "Gate it with targeted validation and lifecycle-close evidence.",
      ],
      durableHabit:
        "Do not add agentic autonomy when a small workflow is enough.",
      relatedConcepts: ["workflow", "agent", "validation gate"],
    },
    sourceRefs: ["anthropic-building-effective-agents", "willison-agent-definition"],
    interactive: "self-check",
  },
  {
    id: "core-workflow-patterns",
    slug: "core-workflow-patterns",
    order: 5,
    totalChapters,
    label: "05",
    status: "available",
    title: "Core workflow patterns",
    eyebrow: "Decision vocabulary",
    summary:
      "Six workflow patterns give the orchestrator vocabulary for choosing the right control level.",
    practices: [
      "Recognize the six workflow patterns.",
      "Choose a pattern based on task shape.",
      "Attach the right risk and gate to each pattern.",
    ],
    sections: [
      {
        id: "patterns-as-vocabulary",
        eyebrow: "Vocabulary",
        title: "Patterns are not framework requirements",
        summary:
          "Use patterns to reason about control, not to force a runtime.",
        paragraphs: [
          "Prompt chaining, routing, parallelization, orchestrator-worker, evaluator-optimizer, and agent are decision vocabulary.",
          "The MVP does not install LangGraph or implement a workflow runtime. It teaches when a pattern fits a coding-agent task.",
        ],
        sourceRefs: ["anthropic-building-effective-agents", "langgraph-workflows-agents"],
      },
    ],
    checkpoint: {
      id: "pattern-checkpoint",
      prompt:
        "A small known sequence is being treated like a broad autonomous task.",
      instruction:
        "Classify the better pattern and the risk.",
      revealTitle: "Expected orchestrator move",
      reveal: [
        "Use prompt chaining for a known sequence.",
        "Avoid unnecessary agentic scope.",
        "Attach a validation gate and lifecycle-close evidence.",
      ],
      durableHabit:
        "Pick the smallest workflow pattern that gives enough control.",
      relatedConcepts: ["prompt chaining", "workflow level", "validation gate"],
    },
    sourceRefs: ["anthropic-building-effective-agents", "langgraph-workflows-agents"],
    interactive: "workflow-classifier",
  },
  {
    id: "coding-agent-workflow",
    slug: "coding-agent-workflow",
    order: 6,
    totalChapters,
    label: "06",
    status: "available",
    title: "Coding agent workflow",
    eyebrow: "Repo lifecycle",
    summary:
      "Coding-agent orchestration maps workflow patterns onto repo-task lifecycle decisions.",
    practices: [
      "Ground claims in repo files and project docs.",
      "Keep vendor behavior examples local and current-docs-backed.",
      "Close tasks with evidence, not confidence.",
    ],
    sections: [
      {
        id: "repo-files-win",
        eyebrow: "Repo truth",
        title: "Repo files win for repo behavior",
        summary:
          "The current repository is the authority for how this repository works.",
        paragraphs: [
          "Project docs, task notes, AGENTS.md, CLAUDE.md, tests, and current code can all be authority layers depending on the question.",
          "Vendor examples can illustrate a workflow, but they are not universal rules for every coding-agent product.",
        ],
      },
      {
        id: "evidence-close",
        eyebrow: "Lifecycle",
        title: "Close with evidence",
        summary:
          "The end of a coding-agent task is an evidence checkpoint.",
        paragraphs: [
          "A useful close-out names the files changed, the validation run, the residual risks, and any human approval that was required.",
          "If evidence is missing, the next orchestrator action is continue, stop, zoom out, or ask human, not close.",
        ],
      },
    ],
    checkpoint: {
      id: "coding-workflow-check",
      prompt:
        "The agent claims a project convention but points only to a vendor example.",
      instruction:
        "Choose the source of truth and next action.",
      revealTitle: "Expected orchestrator move",
      reveal: [
        "Use vendor examples only as examples.",
        "For repo behavior, inspect repo files and docs.",
        "Continue only after the convention is grounded in this project.",
      ],
      durableHabit:
        "Keep product examples separate from repo facts.",
      relatedConcepts: ["repo facts", "source-of-truth gate"],
    },
    sourceRefs: ["openai-codex-docs", "claude-code-docs"],
    interactive: "self-check",
  },
  {
    id: "task-lanes-audit-depth",
    slug: "task-lanes-audit-depth",
    order: 7,
    totalChapters,
    label: "07",
    status: "available",
    title: "Task lanes / audit depth",
    eyebrow: "Risk lanes",
    summary:
      "Audit depth should match the blast radius of the task.",
    practices: [
      "Classify tasks as low, medium, or high risk.",
      "Choose audit depth before the agent edits.",
      "Escalate to approval when risk crosses boundaries.",
    ],
    sections: [
      {
        id: "lanes",
        eyebrow: "Lanes",
        title: "Low, medium, high",
        summary:
          "Risk lanes keep small tasks light and risky tasks controlled.",
        paragraphs: [
          "Low-risk tasks can use lightweight inspect/edit/validate flow. Medium-risk tasks need ownership checks and more review. High-risk tasks need approval, source-of-truth gates, and deeper validation.",
          "Risk comes from blast radius, irreversibility, security, shared ownership, dependency changes, and unclear acceptance.",
        ],
      },
    ],
    checkpoint: {
      id: "audit-depth-check",
      prompt:
        "The agent wants to change shared auth code to fix one failing test.",
      instruction:
        "Choose the lane and gates.",
      revealTitle: "Expected orchestrator move",
      reveal: [
        "This is high risk.",
        "Use source-of-truth, ownership, permission, validation, and lifecycle-close gates.",
        "Ask human approval before changing the boundary.",
      ],
      durableHabit:
        "Do not let a local symptom hide a high-risk boundary.",
      relatedConcepts: ["audit depth", "permission gate", "ownership gate"],
    },
    sourceRefs: [],
    interactive: "permission-risk",
  },
  {
    id: "agentic-loop",
    slug: "agentic-loop",
    order: 8,
    totalChapters,
    label: "08",
    status: "available",
    title: "Agentic loop",
    eyebrow: "Loop control",
    summary:
      "The orchestrator controls when an agent loop continues, stops, or zooms out.",
    practices: [
      "Name observe / plan / act / check steps.",
      "Define stop conditions before the loop expands.",
      "Recognize repeated failure signals.",
    ],
    sections: [
      {
        id: "loop-shape",
        eyebrow: "Loop",
        title: "Observe -> plan -> act -> check",
        summary:
          "An agentic loop needs exit criteria, not just motion.",
        paragraphs: [
          "The loop observes evidence, plans a bounded next action, acts, checks the result, then exits, continues, asks human, or zooms out.",
          "Repeated failed validation, growing diffs, unclear authority, or risky actions are stop signals.",
        ],
        sourceRefs: ["anthropic-building-effective-agents"],
      },
    ],
    checkpoint: {
      id: "loop-checkpoint",
      prompt:
        "The agent has tried three patches and the same error remains.",
      instruction:
        "Choose continue, stop, zoom out, or ask human.",
      revealTitle: "Expected orchestrator move",
      reveal: [
        "Stop continuing the same loop.",
        "Zoom out and inspect the failure source or assumption.",
        "Ask human if the source of truth or product intent is unclear.",
      ],
      durableHabit:
        "Repeated failed validation is a stop signal, not an invitation to keep patching.",
      relatedConcepts: ["agentic loop", "stop condition", "zoom out"],
    },
    sourceRefs: ["anthropic-building-effective-agents"],
    interactive: "agentic-loop",
  },
  {
    id: "local-learning",
    slug: "local-learning",
    order: 9,
    totalChapters,
    label: "09",
    status: "available",
    title: "Local learning",
    eyebrow: "Durable correction",
    summary:
      "Local learning means controlled workflow improvement, not model training or silent self-modification.",
    practices: [
      "Separate session-local correction from durable improvement.",
      "Classify the failure signal.",
      "Route durable correction to the right target.",
    ],
    sections: [
      {
        id: "durable-model",
        eyebrow: "Model",
        title: "Failure signal -> durable interception",
        summary:
          "A useful correction catches similar future errors earlier.",
        paragraphs: [
          "The model is: failure signal -> classify mistake -> propose durable correction -> orchestrator approval -> update durable layer -> future interception.",
          "The agent may propose a correction. The orchestrator approves whether it belongs in a rule, skill, test, docs update, validation check, quality gate, or stop condition.",
        ],
      },
      {
        id: "not-autonomous",
        eyebrow: "Boundary",
        title: "Not autonomous self-improvement",
        summary:
          "Local learning does not change model weights or silently rewrite rules.",
        paragraphs: [
          "A session-local fix helps only the current run. A durable workflow improvement is stored where a future run can hit it.",
          "The durable target should intercept the failure without creating unnecessary overhead or scope creep.",
        ],
      },
    ],
    checkpoint: {
      id: "local-learning-check",
      prompt:
        "The agent says it will remember a missed UI check, but no rule, test, docs, gate, or validation check changes.",
      instruction:
        "Classify the correction.",
      revealTitle: "Expected orchestrator move",
      reveal: [
        "This is session-local correction.",
        "If the miss is likely to repeat, propose a durable target.",
        "For missed visible behavior, a UI QA gate may fit better than a rule.",
      ],
      durableHabit:
        "Route correction to the smallest durable layer that catches the future failure.",
      relatedConcepts: ["session-local", "durable workflow improvement"],
    },
    sourceRefs: [],
    interactive: "local-learning",
  },
  {
    id: "quality-gates",
    slug: "quality-gates",
    order: 10,
    totalChapters,
    label: "10",
    status: "available",
    title: "Quality gates",
    eyebrow: "Control surface",
    summary:
      "Gates are decision tools that catch risk early without turning workflow into bureaucracy.",
    practices: [
      "Choose the right gate for the risk.",
      "Use evals as lightweight durable verification assets.",
      "Pause risky actions before they create damage.",
    ],
    sections: [
      {
        id: "gate-set",
        eyebrow: "Gate set",
        title: "Seven MVP gates",
        summary:
          "Validation, source-of-truth, ownership, permission, UI QA, lifecycle-close, and durable correction gates cover the practical control surface.",
        paragraphs: [
          "Gates are not paperwork. They are small decision points that catch incorrect authority, risky actions, missed visible behavior, and premature close.",
          "Evals can be taught lightly as durable verification assets: a regression test from a repeated coding mistake, or an outcome/UI behavior check when normal validation passes but the result is wrong.",
        ],
        sourceRefs: ["anthropic-agent-evals"],
      },
    ],
    checkpoint: {
      id: "gate-check",
      prompt:
        "Build passes, but the changed UI has not been reviewed and the agent wants to close.",
      instruction:
        "Choose the missing gates.",
      revealTitle: "Expected orchestrator move",
      reveal: [
        "Validation gate passed.",
        "UI QA gate is still missing.",
        "Lifecycle-close gate cannot pass without evidence of visible behavior.",
      ],
      durableHabit:
        "Use the gate that matches the risk; do not treat build success as universal acceptance.",
      relatedConcepts: ["validation gate", "UI QA gate", "lifecycle-close gate"],
    },
    sourceRefs: ["anthropic-agent-evals"],
    interactive: "permission-risk",
  },
  {
    id: "zoom-out",
    slug: "zoom-out",
    order: 11,
    totalChapters,
    label: "11",
    status: "available",
    title: "Zoom-out",
    eyebrow: "Reassessment",
    summary:
      "Zoom-out thinking interrupts repeated local fixes when the real problem is the plan, assumption, or authority layer.",
    practices: [
      "Recognize symptom-fixing.",
      "Stop growing diffs without evidence.",
      "Reassess authority, plan, and scope.",
    ],
    sections: [
      {
        id: "zoom-signals",
        eyebrow: "Signals",
        title: "When to zoom out",
        summary:
          "Repeated local fixes can hide a wrong model of the task.",
        paragraphs: [
          "Zoom out when validation keeps failing, diffs keep growing, the agent changes strategy without evidence, or the source of truth remains unclear.",
          "The next action may be stop, inspect a higher authority layer, ask human, or propose a durable stop condition.",
        ],
      },
    ],
    checkpoint: {
      id: "zoom-check",
      prompt:
        "The diff has doubled while the original failure remains unchanged.",
      instruction:
        "Choose the next orchestrator action.",
      revealTitle: "Expected orchestrator move",
      reveal: [
        "Stop the local patch loop.",
        "Zoom out to the failure model and authority layer.",
        "Do not close or continue without new evidence.",
      ],
      durableHabit:
        "Growing diff plus unchanged failure is a zoom-out signal.",
      relatedConcepts: ["zoom out", "stop condition", "validation gate"],
    },
    sourceRefs: [],
    interactive: "agentic-loop",
  },
  {
    id: "practice-scenarios",
    slug: "practice-scenarios",
    order: 12,
    totalChapters,
    label: "12",
    status: "available",
    title: "Practice scenarios",
    eyebrow: "Capstone",
    summary:
      "Guided mixed scenarios show how authority, workflow, audit depth, gates, and durable correction combine before direct assessment.",
    practices: [
      "Decompose a mixed situation before choosing the orchestrator move.",
      "Use immediate feedback to connect choice and consequence.",
      "Prepare to make the same decisions without scaffolding in direct practice.",
    ],
    sections: [
      {
        id: "capstone",
        eyebrow: "Practice",
        title: "Cumulative practice",
        summary:
          "This chapter is the guided bridge into assessment mode.",
        paragraphs: [
          "Each scenario follows: situation -> choices -> consequence -> correct orchestrator move -> durable correction candidate.",
          "Use immediate feedback here to practice ownership, source of truth, UI QA, zoom-out, workflow authority, durable correction, permission gates, and high-risk boundaries. The direct practice route withholds feedback until submit.",
        ],
      },
    ],
    checkpoint: {
      id: "practice-check",
      prompt:
        "A mixed scenario includes a risky action, unclear source of truth, and repeated failure.",
      instruction:
        "Name the first move.",
      revealTitle: "Expected orchestrator move",
      reveal: [
        "Pause and classify risk before action.",
        "Choose authority and gates.",
        "Continue only after the next step has evidence.",
      ],
      durableHabit:
        "Mixed scenarios should be decomposed into authority, workflow, gate, and action decisions.",
      relatedConcepts: ["practice", "orchestrator judgment"],
    },
    sourceRefs: [],
    interactive: "practice-scenarios",
  },
  {
    id: "operating-checklist",
    slug: "operating-checklist",
    order: 13,
    totalChapters,
    label: "13",
    status: "available",
    title: "Operating checklist",
    eyebrow: "Checklist",
    summary:
      "A concise checklist turns the learning path into an operating habit for AI coding tasks.",
    practices: [
      "Run the checklist before and after agent work.",
      "Use it to explain your orchestrator decisions.",
      "Close only with evidence.",
    ],
    sections: [
      {
        id: "checklist",
        eyebrow: "Operating loop",
        title: "Before, during, after",
        summary:
          "A small checklist is enough if it drives the right decisions.",
        paragraphs: [
          "Before: classify task risk, choose authority layer, choose workflow level, define gates and stop conditions.",
          "During: inspect evidence, keep scope tight, interrupt stuck loops, ask approval for risky actions.",
          "After: run validation, check visible behavior if relevant, summarize evidence, and decide whether a durable correction is needed.",
        ],
      },
    ],
    checkpoint: {
      id: "checklist-check",
      prompt:
        "The agent is ready to close after edits, but no acceptance evidence is listed.",
      instruction:
        "Choose the checklist failure.",
      revealTitle: "Expected orchestrator move",
      reveal: [
        "Lifecycle-close evidence is missing.",
        "Ask for validation output and acceptance evidence.",
        "Consider UI QA or durable correction if the task involved those risks.",
      ],
      durableHabit:
        "No close without evidence.",
      relatedConcepts: ["operating checklist", "lifecycle-close gate"],
    },
    sourceRefs: [],
    interactive: "self-check",
  },
  {
    id: "references",
    slug: "references",
    order: 14,
    totalChapters,
    label: "14",
    status: "available",
    title: "References / advanced reading",
    eyebrow: "Grounding",
    summary:
      "References are research anchors for later source-backed validation, not proof for product decisions.",
    practices: [
      "Separate product decisions from external factual claims.",
      "Use current official docs for product behavior.",
      "Keep advanced reading out of the MVP core path.",
    ],
    sections: [
      {
        id: "reference-role",
        eyebrow: "Reference role",
        title: "Use sources for external claims",
        summary:
          "Source chips should support key external factual claims without overwhelming the learner.",
        paragraphs: [
          "The calibration artifact defines product decisions for this site. External claims about agents, workflow patterns, HITL, evals, tools, and permissions need a source-backed research pass.",
          "Vendor/product behavior changes quickly, so claims about concrete coding-agent tools must be checked against current official docs.",
        ],
      },
    ],
    checkpoint: {
      id: "reference-check",
      prompt:
        "A draft says all coding agents request approval before editing rules.",
      instruction:
        "Decide whether this can be stated as-is.",
      revealTitle: "Expected orchestrator move",
      reveal: [
        "No. It is a product-specific external claim.",
        "Either soften it or validate against current official docs for each tool.",
        "Do not turn one vendor behavior into a universal rule.",
      ],
      durableHabit:
        "Current official docs are the authority for current product behavior.",
      relatedConcepts: ["source-backed claims", "current docs"],
    },
    sourceRefs: [
      "anthropic-building-effective-agents",
      "openai-practical-agents",
      "langgraph-workflows-agents",
      "langchain-human-in-loop",
      "openai-codex-docs",
      "claude-code-docs",
    ],
    interactive: "self-check",
  },
] satisfies LearningChapter[];

export const learningPath = learningChapters.map(
  ({ id, slug, title, label, status }) => ({ id, slug, title, label, status }),
) satisfies ChapterNavItem[];

export const availableChapters = learningChapters;

export const firstAvailableChapter = learningChapters[0];

export function getChapterHref(chapter: Pick<ChapterNavItem, "slug">) {
  return `/chapters/${chapter.slug}`;
}

export function getChapterNavBySlug(slug: string) {
  return learningPath.find((chapter) => chapter.slug === slug);
}

export function getLearningChapterBySlug(slug: string) {
  return learningChapters.find((chapter) => chapter.slug === slug);
}

export function getAdjacentChapters(slug: string) {
  const index = learningPath.findIndex((chapter) => chapter.slug === slug);

  return {
    previous: index > 0 ? learningPath[index - 1] : undefined,
    next: index >= 0 && index < learningPath.length - 1 ? learningPath[index + 1] : undefined,
  };
}
