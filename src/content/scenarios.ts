import type { GateId } from "./gates";
import type { WorkflowPatternId } from "./patterns";

export type Choice = {
  id: string;
  label: string;
  feedback: string;
  correct?: boolean;
};

export type DecisionScenario = {
  id: string;
  title: string;
  situation: string;
  choices: Choice[];
  correctMove: string;
  consequence: string;
  relatedGates: GateId[];
};

export type SelfCheckCard = {
  id: string;
  prompt: string;
  revealTitle: string;
  reveal: string;
  relatedGates?: GateId[];
};

export type AuthorityMatrixCase = DecisionScenario & {
  authorityLayer: string;
  sourceOfTruth: string;
};

export type WorkflowClassifierCase = DecisionScenario & {
  patternId: WorkflowPatternId;
};

export type LocalLearningCase = DecisionScenario & {
  failureSignal: string;
  durableTarget: string;
};

export type PracticeScenario = DecisionScenario & {
  durableCorrectionCandidate: string;
};

export const selfCheckCards = [
  {
    id: "plausible-vs-repo-truth",
    prompt:
      "The agent explains an architecture using a familiar framework convention, but has not inspected this repo.",
    revealTitle: "What should the orchestrator remember?",
    reveal:
      "This is a plausible continuation, not project truth. First choose the authority layer, then inspect repo facts or docs before letting the agent act.",
    relatedGates: ["source-of-truth", "ownership"],
  },
  {
    id: "session-vs-durable",
    prompt:
      "After a mistake, the agent says it will remember to check UI behavior next time, but no rule, test, doc, or gate changes.",
    revealTitle: "Is this durable?",
    reveal:
      "No. That is session-local correction. Durable improvement requires a saved rule, skill, test, docs update, validation check, quality gate, or stop condition.",
    relatedGates: ["durable-correction"],
  },
  {
    id: "validation-vs-acceptance",
    prompt:
      "The build passes after a UI change, but nobody checked the actual screen.",
    revealTitle: "Can the task close?",
    reveal:
      "Not yet. Passing validation is useful evidence, but visible behavior needs a UI QA gate before lifecycle close.",
    relatedGates: ["validation", "ui-qa", "lifecycle-close"],
  },
] satisfies SelfCheckCard[];

export const authorityMatrixCases = [
  {
    id: "memory-vs-docs",
    title: "Docs conflict with Memory",
    situation:
      "Memory says the project uses one API client, but the repo docs and imports show another.",
    authorityLayer: "Repo facts and project docs",
    sourceOfTruth: "Current docs, imports, and call sites in the repository",
    choices: [
      {
        id: "ask-model",
        label: "Ask the model which source is probably newer",
        feedback: "That adds another guess. The orchestrator needs source-of-truth evidence.",
      },
      {
        id: "inspect-repo",
        label: "Inspect docs and imports, then ground the answer there",
        feedback: "Correct. Resolve the conflict by checking the durable repo layer.",
        correct: true,
      },
      {
        id: "trust-memory",
        label: "Trust Memory because it was saved earlier",
        feedback: "Memory can be useful context, but current repo facts win when they conflict.",
      },
    ],
    correctMove:
      "Use repo docs and current imports as the authority layer, then continue only after the conflict is resolved.",
    consequence:
      "The agent avoids building against stale or invented project conventions.",
    relatedGates: ["source-of-truth", "validation"],
  },
  {
    id: "tool-docs",
    title: "Tool behavior claim",
    situation:
      "The agent claims a coding-agent product always asks before editing project instruction files.",
    authorityLayer: "Current official product docs",
    sourceOfTruth: "Current official docs for the specific tool and version",
    choices: [
      {
        id: "generalize",
        label: "Treat it as a universal coding-agent rule",
        feedback: "Product behavior changes and differs by tool. Do not generalize.",
      },
      {
        id: "current-docs",
        label: "Check current official docs before making the claim",
        feedback: "Correct. Tool-specific behavior needs current official documentation.",
        correct: true,
      },
      {
        id: "skip",
        label: "Skip the claim and rely only on local preference",
        feedback: "You can avoid the product claim, but if you make it, it needs current docs.",
      },
    ],
    correctMove:
      "Either avoid the product-specific claim or validate it against current official docs.",
    consequence:
      "The site avoids misleading learners about vendor behavior.",
    relatedGates: ["source-of-truth", "permission"],
  },
] satisfies AuthorityMatrixCase[];

export const workflowClassifierCases = [
  {
    id: "known-sequence",
    title: "Known repo edit sequence",
    situation:
      "A small copy fix needs inspect, edit, lint, and summarize. The path is known.",
    patternId: "prompt-chaining",
    choices: [
      {
        id: "agent",
        label: "Agent",
        feedback: "A full agent loop is more autonomy than this task needs.",
      },
      {
        id: "prompt-chaining",
        label: "Prompt chaining",
        feedback: "Correct. A short predetermined sequence is enough.",
        correct: true,
      },
      {
        id: "parallelization",
        label: "Parallelization",
        feedback: "Parallel workers would add overhead for a tiny known path.",
      },
    ],
    correctMove: "Use prompt chaining with a lightweight validation gate.",
    consequence: "The task stays small and avoids unnecessary agentic overhead.",
    relatedGates: ["validation"],
  },
  {
    id: "high-risk-route",
    title: "Auth boundary change",
    situation:
      "The agent wants to modify an auth/API boundary while still uncertain about current ownership.",
    patternId: "routing",
    choices: [
      {
        id: "routing",
        label: "Routing",
        feedback: "Correct. Route this to a high-risk lane before any edit.",
        correct: true,
      },
      {
        id: "evaluator",
        label: "Evaluator-optimizer",
        feedback: "Evaluation matters later, but first classify the risk lane.",
      },
      {
        id: "prompt-chain",
        label: "Prompt chaining",
        feedback: "A simple chain can hide the risk classification step.",
      },
    ],
    correctMove:
      "Route to a high-risk workflow with source-of-truth, ownership, permission, and validation gates.",
    consequence:
      "The workflow stops risky boundary changes before they become accidental scope creep.",
    relatedGates: ["permission", "ownership", "source-of-truth", "validation"],
  },
] satisfies WorkflowClassifierCase[];

export const agenticLoopCases = [
  {
    id: "validation-loop",
    title: "Repeated failed validation",
    situation:
      "The agent has tried three small fixes. The same validation command still fails.",
    choices: [
      {
        id: "continue",
        label: "Continue one more patch",
        feedback: "More of the same is a stuck loop signal.",
      },
      {
        id: "zoom-out",
        label: "Stop and zoom out",
        feedback: "Correct. Reassess assumptions and inspect the failure source.",
        correct: true,
      },
      {
        id: "close",
        label: "Close because progress was made",
        feedback: "The lifecycle-close gate needs evidence, not effort.",
      },
    ],
    correctMove:
      "Stop the loop, inspect the repeated failure, and decide whether the plan or authority layer is wrong.",
    consequence:
      "The orchestrator prevents symptom-fixing and growing diffs.",
    relatedGates: ["validation", "lifecycle-close"],
  },
] satisfies DecisionScenario[];

export const localLearningCases = [
  {
    id: "missed-ui-qa",
    title: "UI behavior missed after build passed",
    situation:
      "The agent fixed a visual component, ran build, and missed that the mobile layout is broken.",
    failureSignal: "Validation passed but visible behavior was wrong.",
    durableTarget: "UI QA gate",
    choices: [
      {
        id: "longer-prompt",
        label: "Make the next prompt longer",
        feedback: "That may help this session, but it does not intercept future misses.",
      },
      {
        id: "ui-gate",
        label: "Add a UI QA gate for layout-affecting tasks",
        feedback: "Correct. The durable target matches the failure mode.",
        correct: true,
      },
      {
        id: "docs",
        label: "Update docs for component usage",
        feedback: "Docs may help if usage was unclear, but the missed behavior needs a QA gate.",
      },
    ],
    correctMove:
      "Propose a UI QA gate that triggers when a task changes visible layout or interaction.",
    consequence:
      "Future similar tasks are more likely to inspect the screen before close.",
    relatedGates: ["ui-qa", "durable-correction"],
  },
  {
    id: "repeated-import-error",
    title: "Repeated import mistake",
    situation:
      "The same wrong import path has caused two failed builds in similar tasks.",
    failureSignal: "Repeated technical mistake caught by build.",
    durableTarget: "Validation check or test",
    choices: [
      {
        id: "rule",
        label: "Add a broad rule banning new imports",
        feedback: "Too broad. It creates overhead and blocks legitimate work.",
      },
      {
        id: "validation",
        label: "Add or document a targeted validation check",
        feedback: "Correct. The failure is measurable and should be intercepted mechanically.",
        correct: true,
      },
      {
        id: "memory",
        label: "Tell the agent to remember it",
        feedback: "That is session-local unless stored in a durable layer.",
      },
    ],
    correctMove:
      "Route the correction to a targeted check or test rather than a broad rule.",
    consequence:
      "The workflow catches repeatable mistakes without unnecessary constraints.",
    relatedGates: ["validation", "durable-correction"],
  },
] satisfies LocalLearningCase[];

export const permissionRiskCases = [
  {
    id: "delete-file",
    title: "Delete file",
    situation: "The agent wants to delete a file it claims is unused.",
    choices: [
      {
        id: "delete",
        label: "Approve immediately",
        feedback: "Deletion can be irreversible or break hidden references.",
      },
      {
        id: "pause",
        label: "Pause, explain risk, inspect references, ask approval",
        feedback: "Correct. This is a permission and ownership gate.",
        correct: true,
      },
      {
        id: "rename",
        label: "Rename it instead without approval",
        feedback: "Renaming still changes behavior and needs evidence.",
      },
    ],
    correctMove:
      "Pause, inspect references, explain blast radius, and ask approval before deletion.",
    consequence:
      "The workflow prevents accidental data or behavior loss.",
    relatedGates: ["permission", "ownership", "validation"],
  },
  {
    id: "add-dependency",
    title: "Add dependency",
    situation: "The agent wants to install a dependency to solve a small UI issue.",
    choices: [
      {
        id: "install",
        label: "Install because it is convenient",
        feedback: "Dependencies add maintenance, security, and bundle cost.",
      },
      {
        id: "approval",
        label: "Ask approval and compare local alternatives",
        feedback: "Correct. Dependency changes need permission and scope review.",
        correct: true,
      },
      {
        id: "copy",
        label: "Copy code from the package manually",
        feedback: "That can create licensing and maintenance problems.",
      },
    ],
    correctMove:
      "Treat dependency additions as permission-gated and justify why local code is insufficient.",
    consequence:
      "The project avoids casual scope and supply-chain growth.",
    relatedGates: ["permission", "validation"],
  },
  {
    id: "edit-agents",
    title: "Edit AGENTS.md / CLAUDE.md",
    situation: "The agent wants to rewrite project instruction files after one mistake.",
    choices: [
      {
        id: "rewrite",
        label: "Let the agent rewrite the file",
        feedback: "Instruction layers are durable authority and need human approval.",
      },
      {
        id: "propose",
        label: "Ask for a small proposed correction and approve manually",
        feedback: "Correct. Durable instruction changes need approval.",
        correct: true,
      },
      {
        id: "ignore",
        label: "Ignore because it was only one failure",
        feedback: "Maybe, but the right move is to classify whether durable correction is needed.",
      },
    ],
    correctMove:
      "Require a proposed durable correction and human approval before editing instruction files.",
    consequence:
      "The workflow avoids accidental overconstraint and silent rule changes.",
    relatedGates: ["permission", "durable-correction"],
  },
  {
    id: "auth-boundary",
    title: "Change auth/API/payment boundary",
    situation: "The agent wants to change auth middleware to unblock a test.",
    choices: [
      {
        id: "quickfix",
        label: "Patch the boundary quickly",
        feedback: "Critical boundaries need source, ownership, permission, and validation gates.",
      },
      {
        id: "escalate",
        label: "Stop, inspect authority, ask approval, validate deeply",
        feedback: "Correct. This is high-risk workflow territory.",
        correct: true,
      },
      {
        id: "skip-tests",
        label: "Skip tests and rely on review",
        feedback: "Review helps, but validation is mandatory for boundary changes.",
      },
    ],
    correctMove:
      "Escalate to high-risk lane and require approval before modifying the boundary.",
    consequence:
      "The workflow reduces the chance of security or payment regressions.",
    relatedGates: ["permission", "source-of-truth", "validation", "ownership"],
  },
  {
    id: "destructive-command",
    title: "Run destructive command",
    situation: "The agent proposes a command that removes generated artifacts recursively.",
    choices: [
      {
        id: "run",
        label: "Run it because artifacts are disposable",
        feedback: "Recursive destructive commands need path verification and approval.",
      },
      {
        id: "verify",
        label: "Verify exact paths and ask approval",
        feedback: "Correct. The permission gate stops accidental destructive scope.",
        correct: true,
      },
      {
        id: "manual",
        label: "Ask the agent to manually delete similar files",
        feedback: "Manual deletion can still be destructive without explicit scope.",
      },
    ],
    correctMove:
      "Verify resolved paths, explain risk, and ask approval before any destructive action.",
    consequence:
      "The workflow avoids accidental deletion outside the intended workspace.",
    relatedGates: ["permission", "validation"],
  },
  {
    id: "continue-failed-validation",
    title: "Continue after repeated failed validation",
    situation: "The same validation has failed repeatedly and the diff keeps growing.",
    choices: [
      {
        id: "continue",
        label: "Continue patching symptoms",
        feedback: "This is a stuck-loop signal.",
      },
      {
        id: "stop",
        label: "Stop and zoom out",
        feedback: "Correct. The workflow should interrupt repeated failure.",
        correct: true,
      },
      {
        id: "close",
        label: "Close with a warning",
        feedback: "Lifecycle close requires evidence, not a warning.",
      },
    ],
    correctMove:
      "Stop the loop, inspect assumptions, and choose a new plan or ask for human input.",
    consequence:
      "The workflow prevents growing diffs without evidence.",
    relatedGates: ["validation", "lifecycle-close"],
  },
  {
    id: "archive-before-close",
    title: "Archive artifact before lifecycle close",
    situation: "The agent wants to archive task artifacts before acceptance is clear.",
    choices: [
      {
        id: "archive",
        label: "Archive immediately",
        feedback: "Artifacts may still be needed for review and evidence.",
      },
      {
        id: "close-gate",
        label: "Run lifecycle-close gate first",
        feedback: "Correct. Close only after evidence and acceptance.",
        correct: true,
      },
      {
        id: "delete",
        label: "Delete artifacts to clean up",
        feedback: "That is riskier than archiving and still needs permission.",
      },
    ],
    correctMove:
      "Keep artifacts until lifecycle-close evidence is complete.",
    consequence:
      "The review trail remains available until the task is accepted.",
    relatedGates: ["lifecycle-close", "permission"],
  },
] satisfies DecisionScenario[];

export const practiceScenarios = [
  {
    id: "feature-local-to-shared",
    title: "Feature-local helpers -> shared",
    situation:
      "The agent wants to move a helper from one feature folder into shared utilities because it might be reusable.",
    choices: [
      {
        id: "move",
        label: "Move it to shared now",
        feedback: "That crosses ownership before repo evidence supports it.",
      },
      {
        id: "inspect",
        label: "Inspect usage patterns and ownership first",
        feedback: "Correct. Shared code needs ownership evidence.",
        correct: true,
      },
      {
        id: "duplicate",
        label: "Duplicate it into shared and local",
        feedback: "Duplication without ownership clarity creates maintenance risk.",
      },
    ],
    correctMove:
      "Stop the move until current repo usage and ownership conventions justify shared placement.",
    consequence:
      "The helper stays local unless shared ownership is proven.",
    durableCorrectionCandidate:
      "Add an ownership gate note for local-to-shared movement.",
    relatedGates: ["ownership", "source-of-truth"],
  },
  {
    id: "docs-memory-conflict",
    title: "Docs vs Memory conflict",
    situation:
      "Memory says one workflow is standard, but current docs say another.",
    choices: [
      {
        id: "memory",
        label: "Follow Memory",
        feedback: "Memory can be stale.",
      },
      {
        id: "docs",
        label: "Ground in current docs and repo facts",
        feedback: "Correct. Current durable project sources win.",
        correct: true,
      },
      {
        id: "ask-ai",
        label: "Ask the AI which is newer",
        feedback: "That is another ungrounded claim.",
      },
    ],
    correctMove:
      "Choose the current project docs and repo evidence as the authority layer.",
    consequence:
      "The workflow avoids stale context.",
    durableCorrectionCandidate:
      "Document how to resolve Memory versus docs conflicts.",
    relatedGates: ["source-of-truth"],
  },
  {
    id: "validation-passes-ui-wrong",
    title: "Validation passes but UI wrong",
    situation:
      "Lint and build pass, but manual review shows the mobile layout is cramped.",
    choices: [
      {
        id: "close",
        label: "Close because validation passed",
        feedback: "Build success is not UI acceptance.",
      },
      {
        id: "uiqa",
        label: "Run UI QA and fix visible behavior",
        feedback: "Correct. Visible behavior needs its own gate.",
        correct: true,
      },
      {
        id: "test",
        label: "Add only a unit test",
        feedback: "A unit test may not catch layout quality.",
      },
    ],
    correctMove:
      "Use a UI QA gate before lifecycle close.",
    consequence:
      "The learner separates technical validation from visible quality.",
    durableCorrectionCandidate:
      "Add UI QA to tasks that change layout or interaction.",
    relatedGates: ["ui-qa", "lifecycle-close"],
  },
  {
    id: "symptom-fixing-growing-diff",
    title: "Symptom-fixing with growing diff",
    situation:
      "The agent keeps applying small fixes. The diff grows and the original failure remains.",
    choices: [
      {
        id: "continue",
        label: "Let it continue",
        feedback: "This is a stuck loop.",
      },
      {
        id: "zoomout",
        label: "Stop and zoom out",
        feedback: "Correct. Reassess the plan and assumptions.",
        correct: true,
      },
      {
        id: "merge",
        label: "Keep the partial diff and move on",
        feedback: "That creates unverified complexity.",
      },
    ],
    correctMove:
      "Stop the loop, inspect the failure source, and choose a new plan.",
    consequence:
      "The diff stops growing without evidence.",
    durableCorrectionCandidate:
      "Add a stop condition after repeated failed validation.",
    relatedGates: ["validation", "lifecycle-close"],
  },
  {
    id: "edit-agents-file",
    title: "Editing AGENTS.md / CLAUDE.md",
    situation:
      "The agent proposes editing project instruction files after one mistake.",
    choices: [
      {
        id: "allow",
        label: "Allow direct edit",
        feedback: "Instruction files are durable workflow authority.",
      },
      {
        id: "proposal",
        label: "Require a proposed correction and approval",
        feedback: "Correct. Durable layers require approval.",
        correct: true,
      },
      {
        id: "ban",
        label: "Never allow changes",
        feedback: "Some durable corrections are valid, but need approval.",
      },
    ],
    correctMove:
      "Ask for a minimal proposed durable correction and approve manually if justified.",
    consequence:
      "The workflow improves without silent self-modification.",
    durableCorrectionCandidate:
      "Add a durable correction gate for instruction-file edits.",
    relatedGates: ["permission", "durable-correction"],
  },
  {
    id: "longer-prompt-no-durable",
    title: "Longer prompt without durable correction",
    situation:
      "A failure is fixed by writing a longer prompt, but no durable layer changes.",
    choices: [
      {
        id: "done",
        label: "Treat the longer prompt as enough",
        feedback: "That only helps the current session.",
      },
      {
        id: "classify",
        label: "Classify whether a durable target is needed",
        feedback: "Correct. Decide if future interception is warranted.",
        correct: true,
      },
      {
        id: "rule",
        label: "Always create a rule",
        feedback: "Not every repeated failure belongs in a rule.",
      },
    ],
    correctMove:
      "Decide whether this should become a rule, skill, test, docs update, validation check, gate, or stop condition.",
    consequence:
      "The learner separates session-local correction from durable improvement.",
    durableCorrectionCandidate:
      "Route repeated misses to the smallest durable layer that intercepts them.",
    relatedGates: ["durable-correction"],
  },
  {
    id: "adding-dependency",
    title: "Adding dependency",
    situation:
      "The agent wants to add a dependency for a convenience helper.",
    choices: [
      {
        id: "install",
        label: "Install it",
        feedback: "Dependency changes require approval and scope review.",
      },
      {
        id: "gate",
        label: "Use a permission gate",
        feedback: "Correct. Compare local alternatives and ask approval.",
        correct: true,
      },
      {
        id: "copy",
        label: "Copy code from the package",
        feedback: "That may create worse maintenance and licensing issues.",
      },
    ],
    correctMove:
      "Ask approval and justify why a dependency is needed.",
    consequence:
      "The workflow controls maintenance and supply-chain risk.",
    durableCorrectionCandidate:
      "Add a dependency-change permission gate.",
    relatedGates: ["permission", "validation"],
  },
  {
    id: "auth-api-payment",
    title: "Changing auth/API/payment boundary",
    situation:
      "The agent wants to alter a payment callback path to make a failing task pass.",
    choices: [
      {
        id: "patch",
        label: "Patch quickly",
        feedback: "Critical boundaries are high-risk.",
      },
      {
        id: "highrisk",
        label: "Escalate to high-risk lane",
        feedback: "Correct. Require authority, approval, and deep validation.",
        correct: true,
      },
      {
        id: "skip",
        label: "Skip validation because it is small",
        feedback: "Small boundary changes can still have high blast radius.",
      },
    ],
    correctMove:
      "Stop and route the task through source-of-truth, ownership, permission, and validation gates.",
    consequence:
      "The workflow protects critical product boundaries.",
    durableCorrectionCandidate:
      "Add high-risk lane rules for auth/API/payment changes.",
    relatedGates: ["permission", "source-of-truth", "ownership", "validation"],
  },
] satisfies PracticeScenario[];
