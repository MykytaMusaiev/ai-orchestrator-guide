import type {
  AgenticLoopCase,
  AuthorityMatrixCase,
  DecisionScenario,
  LocalLearningCase,
  PracticeScenario,
  SelfCheckCard,
  WorkflowClassifierCase,
} from "../schemas";

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
  {
    id: "independent-repo-inspection",
    title: "Independent repo inspection",
    situation:
      "A migration assessment needs separate inventories of API callers, UI consumers, and test coverage. The reads do not depend on one another.",
    patternId: "parallelization",
    choices: [
      {
        id: "orchestrator-worker",
        label: "Orchestrator-worker",
        feedback: "A coordinator may synthesize later, but the immediate task shape is independent read-only work.",
      },
      {
        id: "parallelization",
        label: "Parallelization",
        feedback: "Correct. Independent evidence gathering can run concurrently before synthesis.",
        correct: true,
      },
      {
        id: "evaluator-optimizer",
        label: "Evaluator-optimizer",
        feedback: "There is no candidate output to iteratively evaluate yet.",
      },
    ],
    correctMove:
      "Parallelize independent inventories, then reconcile their findings before planning edits.",
    consequence:
      "Evidence arrives faster without introducing write conflicts or hidden dependencies.",
    relatedGates: ["source-of-truth", "ownership"],
  },
  {
    id: "coordinated-module-migration",
    title: "Coordinated module migration",
    situation:
      "A shared API migration spans four owned modules. Each module can be inspected and adapted separately, but one plan must control contracts and integration.",
    patternId: "orchestrator-worker",
    choices: [
      {
        id: "parallelization",
        label: "Parallelization",
        feedback: "Parallel work alone does not provide contract ownership, synthesis, or integration control.",
      },
      {
        id: "orchestrator-worker",
        label: "Orchestrator-worker",
        feedback: "Correct. A coordinator can decompose by ownership and integrate worker evidence against one contract.",
        correct: true,
      },
      {
        id: "agent",
        label: "Agent",
        feedback: "Open-ended autonomy is unnecessary when decomposition and ownership boundaries are known.",
      },
    ],
    correctMove:
      "Use an orchestrator to define the contract, assign bounded module work, and validate the integrated result.",
    consequence:
      "Workers stay inside ownership boundaries while integration remains controlled.",
    relatedGates: ["ownership", "validation", "lifecycle-close"],
  },
  {
    id: "iterative-contract-review",
    title: "Iterative contract review",
    situation:
      "A generated API migration plan must satisfy an explicit compatibility rubric. Each revision can be checked against the same criteria.",
    patternId: "evaluator-optimizer",
    choices: [
      {
        id: "prompt-chaining",
        label: "Prompt chaining",
        feedback: "A fixed chain does not use the rubric to improve a weak candidate through feedback.",
      },
      {
        id: "evaluator-optimizer",
        label: "Evaluator-optimizer",
        feedback: "Correct. A stable evaluator can identify gaps and drive bounded revisions.",
        correct: true,
      },
      {
        id: "routing",
        label: "Routing",
        feedback: "The task is already classified; the missing behavior is iterative evaluation.",
      },
    ],
    correctMove:
      "Evaluate each candidate against the compatibility rubric and stop when the acceptance criteria are met or progress stalls.",
    consequence:
      "Revision is evidence-driven rather than an unbounded request to improve the answer.",
    relatedGates: ["validation", "lifecycle-close"],
  },
  {
    id: "open-ended-repo-investigation",
    title: "Open-ended repo investigation",
    situation:
      "A production-only failure has no known path. The actor must inspect logs and code, choose tools dynamically, form hypotheses, and stop for risky actions.",
    patternId: "agent",
    choices: [
      {
        id: "agent",
        label: "Agent",
        feedback: "Correct. The path is not predetermined and the next tool depends on evidence from the previous step.",
        correct: true,
      },
      {
        id: "prompt-chaining",
        label: "Prompt chaining",
        feedback: "A fixed sequence is brittle because the next diagnostic depends on unknown evidence.",
      },
      {
        id: "orchestrator-worker",
        label: "Orchestrator-worker",
        feedback: "Decomposition may become useful later, but there is not yet a stable task map for workers.",
      },
    ],
    correctMove:
      "Use a bounded agent loop with explicit tool permissions, evidence checks, and stop or escalation conditions.",
    consequence:
      "Dynamic investigation is allowed without granting unlimited action authority.",
    relatedGates: ["permission", "validation", "lifecycle-close"],
  },
] satisfies WorkflowClassifierCase[];

export const agenticLoopCases = [
  {
    id: "validation-loop",
    title: "Repeated failed validation",
    entryNodeId: "failed-validation",
    nodes: [
      {
        id: "failed-validation",
        title: "The loop has no new evidence",
        situation:
          "Three local patches changed nearby code, but the same validation command still fails.",
        evidence: [
          "The failure text is unchanged across three runs.",
          "The diff grew by 84 lines.",
          "No diagnostic has tested the assumption about which config owns the failure.",
        ],
        choices: [
          {
            id: "run-targeted-diagnostic",
            action: "continue",
            label: "Run one targeted diagnostic before any further edit",
            feedback: "This continuation is justified because it is designed to produce new evidence.",
            nextNodeId: "diagnostic-result",
          },
          {
            id: "repeat-local-patch",
            action: "continue",
            label: "Apply another local patch using the same assumption",
            feedback: "The loop cannot continue meaningfully without new evidence. Repeating the same plan is stopped.",
            outcome: "stopped",
          },
          {
            id: "zoom-out-now",
            action: "zoom-out",
            label: "Stop editing and reassess the ownership assumption",
            feedback: "The repeated signal is already sufficient to zoom out and inspect a higher layer.",
            outcome: "zoomed-out",
          },
        ],
      },
      {
        id: "diagnostic-result",
        title: "The diagnostic changes the task model",
        situation:
          "The targeted diagnostic traces the failing value to a generated config owned by a shared build script.",
        evidence: [
          "The edited local module does not produce the failing value.",
          "A shared build script regenerates the config on every validation run.",
          "Changing the shared script crosses the current task's ownership boundary.",
        ],
        choices: [
          {
            id: "fix-shared-with-authority",
            action: "continue",
            label: "Replan around the shared owner and continue only with authority",
            feedback: "The next action now follows new evidence and an explicit ownership check.",
            outcome: "complete",
          },
          {
            id: "ask-shared-owner",
            action: "ask-human",
            label: "Escalate the shared-boundary decision to its owner",
            feedback: "Escalation is appropriate when the evidence identifies a boundary outside current authority.",
            outcome: "escalated",
          },
          {
            id: "keep-local-plan",
            action: "continue",
            label: "Keep patching the local module despite the trace",
            feedback: "This ignores the new source-of-truth evidence, so the continuation is stopped.",
            outcome: "stopped",
          },
        ],
      },
    ],
  },
  {
    id: "ui-evidence-loop",
    title: "Build passes, UI evidence conflicts",
    entryNodeId: "agent-report",
    nodes: [
      {
        id: "agent-report",
        title: "Validation and reported behavior disagree",
        situation:
          "The build passes and the agent reports success, but a reviewer says the mobile action is cut off.",
        evidence: [
          "Lint and build are green.",
          "The agent provides no screenshot or viewport observation.",
          "The reviewer reports a visible mobile defect.",
        ],
        choices: [
          {
            id: "observe-mobile",
            action: "continue",
            label: "Inspect the affected mobile viewport before deciding",
            feedback: "The next step seeks independent evidence for the uncovered risk.",
            nextNodeId: "observed-mobile",
          },
          {
            id: "close-on-build",
            action: "stop",
            label: "Close the task because automated validation passed",
            feedback: "Stopping as complete is unsupported because the reported UI risk remains unobserved.",
            outcome: "stopped",
          },
          {
            id: "ask-acceptance",
            action: "ask-human",
            label: "Ask the reviewer which viewport and acceptance state they observed",
            feedback: "This is reasonable when the report lacks enough reproduction detail.",
            outcome: "escalated",
          },
        ],
      },
      {
        id: "observed-mobile",
        title: "Independent observation confirms the risk",
        situation:
          "A narrow viewport check shows the primary action label clipped by the fixed bottom navigation.",
        evidence: [
          "The defect reproduces at 360px width.",
          "The automated suite has no layout assertion for this state.",
          "The affected CSS is inside the current task scope.",
        ],
        choices: [
          {
            id: "targeted-ui-fix",
            action: "continue",
            label: "Apply a scoped fix, repeat UI QA, then close with evidence",
            feedback: "The continuation is bounded by observed evidence and a matching UI QA gate.",
            outcome: "complete",
          },
          {
            id: "add-unit-only",
            action: "continue",
            label: "Add a unit test and skip another viewport observation",
            feedback: "A unit test alone does not validate the visible behavior that failed.",
            outcome: "stopped",
          },
          {
            id: "zoom-layout-system",
            action: "zoom-out",
            label: "Zoom out if the fixed navigation exposes a shared layout flaw",
            feedback: "This is appropriate if the local defect reveals a broader shared-layout ownership problem.",
            outcome: "zoomed-out",
          },
        ],
      },
    ],
  },
] satisfies AgenticLoopCase[];

export const localLearningCases = [
  {
    id: "missed-ui-qa",
    title: "UI behavior missed after build passed",
    situation:
      "The agent fixed a visual component, ran build, and missed that the mobile layout is broken.",
    failureSignal: "Validation passed but visible behavior was wrong.",
    durableTargetId: "quality-gate",
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
    durableTargetId: "validation-check",
    durableTarget: "Validation check",
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
  {
    id: "repeated-boundary-violation",
    title: "Repeated critical-boundary violation",
    situation:
      "Different tasks repeatedly attempt to edit payment boundaries without first checking the repository's approval policy.",
    failureSignal: "A stable repository invariant is repeatedly missed before action.",
    durableTargetId: "rule",
    durableTarget: "Rule",
    choices: [
      {
        id: "rule",
        label: "Add a narrow rule requiring the existing approval gate",
        feedback: "Correct. A stable repository-wide invariant belongs in a scoped rule after approval.",
        correct: true,
      },
      {
        id: "test",
        label: "Add a unit test for agent approval behavior",
        feedback: "A code test cannot reliably enforce the workflow authority decision.",
      },
      {
        id: "prompt",
        label: "Mention the policy in the next task prompt",
        feedback: "That only repairs the current session and remains easy to omit later.",
      },
    ],
    correctMove:
      "Propose a narrow approved rule that routes critical-boundary edits through the permission gate.",
    consequence:
      "Future tasks encounter the invariant before attempting the risky action.",
    relatedGates: ["permission", "durable-correction"],
  },
  {
    id: "repeatable-release-procedure",
    title: "Repeatable release procedure",
    situation:
      "Agents repeatedly miss steps in a multi-command release verification procedure that is valid across several repositories.",
    failureSignal: "A reusable procedural capability is performed inconsistently.",
    durableTargetId: "skill",
    durableTarget: "Skill",
    choices: [
      {
        id: "docs",
        label: "Add another narrative release paragraph",
        feedback: "Docs may explain policy, but the failure is execution of a reusable procedure.",
      },
      {
        id: "skill",
        label: "Create an approved reusable release-verification skill",
        feedback: "Correct. A bounded procedural capability can package the repeatable steps.",
        correct: true,
      },
      {
        id: "rule",
        label: "Add a rule containing every command and branch",
        feedback: "A rule is a poor container for a substantial reusable procedure.",
      },
    ],
    correctMove:
      "Route the approved, reusable procedure to a skill while keeping project-specific policy in its authority layer.",
    consequence:
      "The procedure becomes repeatable without turning rules into a long runbook.",
    relatedGates: ["validation", "durable-correction"],
  },
  {
    id: "escaped-regression",
    title: "Escaped behavior regression",
    situation:
      "The same parsing edge case has broken twice, and its expected behavior is deterministic.",
    failureSignal: "A repeatable code behavior regresses without executable coverage.",
    durableTargetId: "test",
    durableTarget: "Test",
    choices: [
      {
        id: "test",
        label: "Add a focused regression test for the observed edge case",
        feedback: "Correct. The behavior is deterministic and mechanically verifiable.",
        correct: true,
      },
      {
        id: "rule",
        label: "Add a rule telling agents to be careful with parsing",
        feedback: "The instruction is less precise and less enforceable than an executable test.",
      },
      {
        id: "ui-gate",
        label: "Require manual UI QA for every parser change",
        feedback: "The failure is deterministic code behavior, not primarily visual acceptance.",
      },
    ],
    correctMove: "Capture the exact escaped behavior in a focused regression test.",
    consequence: "Future changes fail at the executable boundary that previously missed the defect.",
    relatedGates: ["validation", "durable-correction"],
  },
  {
    id: "stale-setup-guidance",
    title: "Stale setup guidance",
    situation:
      "Two contributors follow an obsolete setup command because the repository guide still names the old script.",
    failureSignal: "Durable project guidance conflicts with the current repository interface.",
    durableTargetId: "docs-update",
    durableTarget: "Docs update",
    choices: [
      {
        id: "validation",
        label: "Add a validation check that rewrites the command",
        feedback: "A check may detect failure, but the authoritative human-facing instruction remains stale.",
      },
      {
        id: "docs",
        label: "Update the canonical setup documentation after verifying the script",
        feedback: "Correct. The source of truth itself needs repair.",
        correct: true,
      },
      {
        id: "prompt",
        label: "Tell the current agent which command to use",
        feedback: "That repairs only the current run and leaves future readers exposed.",
      },
    ],
    correctMove: "Verify the current script, then update the canonical setup documentation.",
    consequence: "Future contributors receive current project truth at the point of use.",
    relatedGates: ["source-of-truth", "durable-correction"],
  },
  {
    id: "stuck-loop-repeat",
    title: "Repeated stuck-loop behavior",
    situation:
      "Across several tasks, the agent keeps patching after the same validation failure repeats without new evidence.",
    failureSignal: "Continuation persists after the evidence threshold for reassessment is reached.",
    durableTargetId: "stop-condition",
    durableTarget: "Stop condition",
    choices: [
      {
        id: "longer-prompt",
        label: "Ask for more persistence in the next prompt",
        feedback: "More persistence amplifies the failure mode instead of intercepting it.",
      },
      {
        id: "stop-condition",
        label: "Add an approved stop condition for repeated unchanged failure",
        feedback: "Correct. The workflow should intercept continuation when no new evidence appears.",
        correct: true,
      },
      {
        id: "docs",
        label: "Document every patch that was attempted",
        feedback: "A history may help diagnosis, but it does not stop the repeated behavior.",
      },
    ],
    correctMove:
      "Define a stop or zoom-out threshold based on repeated unchanged evidence, then approve it for the workflow.",
    consequence: "Future loops pause before diffs grow through symptom-fixing.",
    relatedGates: ["validation", "lifecycle-close", "durable-correction"],
  },
  {
    id: "one-off-typo",
    title: "One-off typo corrected",
    situation:
      "An agent mistypes a local variable once, the compiler catches it immediately, and the correction passes the existing checks.",
    failureSignal: "A single low-risk slip is already intercepted by an existing mechanism.",
    durableTargetId: "none",
    durableTarget: "No durable correction",
    choices: [
      {
        id: "rule",
        label: "Add a rule prohibiting variable-name typos",
        feedback: "That creates broad overhead for a failure already intercepted mechanically.",
      },
      {
        id: "none",
        label: "Keep the local fix and rely on the existing compiler check",
        feedback: "Correct. There is no demonstrated workflow gap to repair.",
        correct: true,
      },
      {
        id: "skill",
        label: "Create a naming skill for future tasks",
        feedback: "A new procedure is disproportionate to a one-off intercepted typo.",
      },
    ],
    correctMove: "Close with existing validation evidence; do not create a durable artifact.",
    consequence: "The workflow avoids accumulating rules and tools for isolated slips.",
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
    kind: "compact",
    title: "Feature-local helpers -> shared",
    situation:
      "A two-line helper is used by one feature. The agent proposes moving it into shared utilities because another feature might need it later.",
    evidence: [
      "Current search finds one caller inside the owning feature.",
      "Nearby shared utilities each have multiple cross-feature consumers.",
      "The diff is small, but shared placement changes long-term ownership.",
    ],
    choices: [
      {
        id: "move",
        label: "Move it now and keep the API narrow until a second caller appears",
        feedback: "A narrow API does not replace evidence that shared ownership is warranted.",
      },
      {
        id: "inspect",
        label: "Keep it local while checking usage and ownership conventions",
        feedback: "Correct. Shared code needs ownership evidence.",
        correct: true,
      },
      {
        id: "duplicate",
        label: "Copy it into shared but leave the local helper for compatibility",
        feedback: "Parallel copies create ownership and maintenance ambiguity without proving reuse.",
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
    kind: "full",
    title: "Docs vs Memory conflict",
    situation:
      "Memory and a repository guide describe workflow A. Recent code and executable checks behave like workflow B, and the guide has not been updated in months.",
    choices: [
      {
        id: "memory",
        label: "Follow the remembered workflow until a maintainer replaces it",
        feedback: "Memory is the least durable evidence and cannot resolve the conflict.",
      },
      {
        id: "docs",
        label: "Compare current code, checks, history, and documented intent",
        feedback: "Correct. The authority decision must account for stale documentation and current executable evidence.",
        correct: true,
      },
      {
        id: "ask-ai",
        label: "Ask another agent to choose which description looks more standard",
        feedback: "A second plausible continuation is not independent project evidence.",
      },
    ],
    correctMove:
      "Use code, checks, and change history to verify the intended migration, then align the stale guide with that repo evidence.",
    consequence:
      "The workflow distinguishes current behavior, intended policy, and stale guidance instead of declaring one source universally superior.",
    durableCorrectionCandidate:
      "Update the canonical docs after intent is verified, and preserve a check that exposes future drift if practical.",
    relatedGates: ["source-of-truth", "validation", "lifecycle-close", "durable-correction"],
    assessment: {
      evidence: [
        "The repository guide names workflow A and was last changed nine months ago.",
        "The current implementation and two executable checks enforce workflow B.",
        "Git history shows workflow B was introduced intentionally, but the change did not update the guide.",
        "Memory repeats workflow A and provides no source date.",
      ],
      dimensions: [
        {
          id: "authority-source",
          prompt: "Which authority and source-of-truth decision fits this conflict?",
          memoryCue: "Authority follows the question type; freshness must be established with repo evidence.",
          choiceOrder: ["docs-always-win", "triangulate-current-evidence", "ask-owner-first", "memory-until-approved"],
          choices: [
            {
              id: "triangulate-current-evidence",
              label: "Verify intent from current code, checks, and change history",
              verdict: "aligned",
              explanation: "This distinguishes current behavior from intended policy and tests the stale-doc hypothesis with repo facts.",
              changesWhen: "If a higher-authority owner confirms the old guide is still normative, implementation B becomes the defect instead.",
            },
            {
              id: "docs-always-win",
              label: "Follow the repository guide because it is the durable source",
              verdict: "misaligned",
              explanation: "Durability alone does not prove freshness; the observed conflict requires verification rather than a universal precedence rule.",
            },
            {
              id: "memory-until-approved",
              label: "Keep the remembered workflow until its context is replaced",
              verdict: "unsafe",
              explanation: "Memory has no demonstrated project authority and contradicts stronger current evidence.",
            },
            {
              id: "ask-owner-first",
              label: "Escalate to the owner before interpreting the repo evidence",
              verdict: "misaligned",
              explanation: "The supplied history already records an intentional migration, so escalating before using that evidence adds delay without resolving a remaining ambiguity.",
              changesWhen: "This becomes reasonable when history is incomplete, conflicting, or does not establish approved intent.",
            },
          ],
        },
        {
          id: "workflow-audit",
          prompt: "Which workflow level and audit depth should control the task?",
          memoryCue: "Resolve the authority conflict before choosing an edit sequence.",
          choiceOrder: ["prompt-chain-docs-fix", "evaluator-comparison", "route-conflict-deep-audit", "autonomous-agent-rewrite"],
          choices: [
            {
              id: "route-conflict-deep-audit",
              label: "Route the authority conflict and audit the relevant repo facts",
              verdict: "aligned",
              explanation: "The task is not a simple docs fix; resolving conflicting authority requires bounded evidence synthesis.",
            },
            {
              id: "prompt-chain-docs-fix",
              label: "Use a short prompt chain to rewrite the older guide from the current code",
              verdict: "misaligned",
              explanation: "A predetermined rewrite assumes the implementation is intended before the authority conflict is resolved.",
            },
            {
              id: "evaluator-comparison",
              label: "Use an evaluator to compare both descriptions against explicit repository acceptance criteria",
              verdict: "conditionally-valid",
              explanation: "An evaluator can support the audit if the acceptance criteria themselves come from an authoritative source.",
              changesWhen: "Without authoritative criteria, evaluation only formalizes the same unresolved assumption.",
            },
            {
              id: "autonomous-agent-rewrite",
              label: "Let an agent reconcile code and docs dynamically and report the final state afterward",
              verdict: "unsafe",
              explanation: "Dynamic exploration does not grant authority to silently choose policy or rewrite durable guidance.",
            },
          ],
        },
        {
          id: "next-action",
          prompt: "What should the orchestrator do next?",
          memoryCue: "Continue only after evidence resolves intent or identifies the human authority needed.",
          choiceOrder: ["continue-from-memory", "zoom-out-verify-intent", "ask-human-with-evidence", "stop-permanently"],
          choices: [
            {
              id: "zoom-out-verify-intent",
              label: "Verify the migration, then correct the stale layer",
              verdict: "aligned",
              explanation: "The next action resolves the authority conflict before implementation or docs are changed.",
            },
            {
              id: "continue-from-memory",
              label: "Continue with workflow A because both Memory and prose documentation agree",
              verdict: "unsafe",
              explanation: "Agreement between two stale derivatives does not outweigh current repo evidence.",
            },
            {
              id: "stop-permanently",
              label: "Stop the task permanently because conflicting sources make any change invalid",
              verdict: "misaligned",
              explanation: "The conflict requires investigation or escalation, not abandonment without an attempt to establish intent.",
            },
            {
              id: "ask-human-with-evidence",
              label: "Ask the responsible human with the conflict and repo evidence summarized",
              verdict: "misaligned",
              explanation: "The current history already establishes the approved migration, so the next action should align the stale guide rather than re-open a resolved intent decision.",
              changesWhen: "Escalation becomes appropriate when repo evidence remains ambiguous or identifies conflicting approvals.",
            },
          ],
        },
        {
          id: "durable-correction",
          prompt: "Which durable correction is justified after the conflict is resolved?",
          memoryCue: "Repair the stale durable layer without inventing a universal precedence rule.",
          choiceOrder: ["no-correction", "add-universal-rule", "update-canonical-docs", "validation-only"],
          choices: [
            {
              id: "update-canonical-docs",
              label: "Update the canonical guide and add a drift check if testable",
              verdict: "aligned",
              explanation: "The durable source that became stale should be repaired, with mechanical interception only where the relationship is testable.",
            },
            {
              id: "add-universal-rule",
              label: "Add a rule that current code always outranks repository documentation",
              verdict: "unsafe",
              explanation: "A universal precedence rule would encode the wrong lesson and could legitimize accidental implementation drift.",
            },
            {
              id: "no-correction",
              label: "Make no durable change after resolving this one conflict",
              verdict: "conditionally-valid",
              explanation: "This is defensible only if the guide is not canonical or was already superseded through an authoritative mechanism.",
              changesWhen: "If contributors still rely on this guide, leaving it stale preserves the failure path.",
            },
            {
              id: "validation-only",
              label: "Add only an executable check and leave the human-facing guide unchanged",
              verdict: "misaligned",
              explanation: "A check can protect behavior, but it does not repair a canonical instruction that people still use.",
            },
          ],
        },
      ],
      gatePrompt: "Which quality gates are warranted for this authority conflict?",
      gateOptions: [
        { gateId: "source-of-truth", classification: "required", explanation: "The central risk is choosing between conflicting authority claims." },
        { gateId: "validation", classification: "required", explanation: "Executable checks establish current behavior and verify any alignment change." },
        { gateId: "ownership", classification: "useful", explanation: "Ownership matters if different teams control the guide and implementation." },
        { gateId: "permission", classification: "insufficient", explanation: "Approval may be needed for a durable policy change, but permission alone cannot establish which source is true." },
        { gateId: "ui-qa", classification: "unnecessary", explanation: "No visible behavior risk is present in the supplied evidence." },
        { gateId: "lifecycle-close", classification: "required", explanation: "The task should not close while code and canonical guidance still disagree." },
        { gateId: "durable-correction", classification: "useful", explanation: "Use it to approve the correct durable target without inventing a broad precedence rule." },
      ],
      gateMemoryCue: "Choose gates for the observed risk; an approval gate alone cannot establish project truth.",
      rationalePrompt: "Why do your authority, workflow, gate, and next-action choices fit this evidence?",
      rationaleDescription: "Name the source conflict, the evidence that changes authority, and the condition for continuing or escalating.",
      rationaleMemoryCue: "A useful rationale links authority, evidence, gate, and next action in one short chain.",
      calibratedRationale:
        "Memory is not project truth, and the guide's age creates a freshness conflict rather than automatic authority. Compare code, executable checks, and change history to establish current behavior and intended migration. Continue only after that evidence resolves intent; otherwise ask the responsible owner. Repair the canonical stale layer after approval, and add a mechanical drift check only if the relationship is testable.",
      rationaleRubric: [
        "Names both the authority layer and the repo evidence used to test freshness.",
        "Explains why neither Memory nor stale prose wins automatically.",
        "Connects the next action to a source-of-truth or escalation gate.",
        "Routes the durable correction to the stale layer without creating a universal rule.",
      ],
      transferQuestion: "What missing or conflicting repo evidence would make escalation better than updating the guide?",
    },
  },
  {
    id: "validation-passes-ui-wrong",
    kind: "compact",
    title: "Validation passes but UI wrong",
    situation:
      "Lint and build pass and the agent reports completion, but an independent mobile review shows the primary action is cramped.",
    evidence: [
      "Automated checks cover syntax and build output, not the visible narrow-screen state.",
      "The reviewer reproduces the issue at 360px width.",
    ],
    choices: [
      {
        id: "close",
        label: "Close with the automated evidence and record the UI concern separately",
        feedback: "Deferring the observed acceptance failure would close without evidence for the main risk.",
      },
      {
        id: "uiqa",
        label: "Reopen the visible acceptance gate and validate the affected viewport",
        feedback: "Correct. Visible behavior needs its own gate.",
        correct: true,
      },
      {
        id: "test",
        label: "Add a component test for the action label before closing",
        feedback: "A component test may help later, but it does not replace observation of the failed layout state.",
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
    kind: "compact",
    title: "Symptom-fixing with growing diff",
    situation:
      "The agent has applied four plausible local fixes. The same failure remains, the diff grows, and no new diagnostic evidence has appeared.",
    evidence: [
      "The error signature is unchanged.",
      "Each patch assumes the same local ownership layer.",
      "No trace or source inspection has tested that assumption.",
    ],
    choices: [
      {
        id: "continue",
        label: "Allow one more bounded patch because each individual diff is small",
        feedback: "Small patches do not create new evidence; the repeated unchanged signal marks a stuck loop.",
      },
      {
        id: "zoomout",
        label: "Pause edits and zoom out to test the ownership assumption",
        feedback: "Correct. Reassess the plan and assumptions.",
        correct: true,
      },
      {
        id: "merge",
        label: "Preserve the partial diff, switch validation commands, and continue",
        feedback: "Changing the check without explaining the persistent failure can hide rather than resolve the risk.",
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
    kind: "compact",
    title: "Editing AGENTS.md / CLAUDE.md",
    situation:
      "After one mistake, the user asks the agent to edit AGENTS.md directly, but the repository rules require approval for durable workflow changes.",
    evidence: [
      "The user request authorizes investigation of the mistake.",
      "The repository instruction file is a durable authority layer.",
      "The current rule requires a proposed correction and human approval.",
    ],
    choices: [
      {
        id: "allow",
        label: "Apply the user-requested edit, then ask for review in the summary",
        feedback: "Later review does not satisfy the repository's pre-change authority requirement.",
      },
      {
        id: "proposal",
        label: "Draft the smallest correction and obtain approval before editing",
        feedback: "Correct. Durable layers require approval.",
        correct: true,
      },
      {
        id: "ban",
        label: "Decline all instruction-file changes because agents cannot modify authority",
        feedback: "The boundary is controlled approval, not a universal ban on valid durable corrections.",
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
    kind: "compact",
    title: "Longer prompt without durable correction",
    situation:
      "A repeated workflow miss is fixed in the current run by adding detailed prompt instructions, but no future interception layer changes.",
    evidence: [
      "The same class of miss has occurred in two separate tasks.",
      "The longer prompt is stored only in the current chat.",
      "No target has yet been selected or approved.",
    ],
    choices: [
      {
        id: "done",
        label: "Reuse the longer prompt template in similar sessions",
        feedback: "A reusable prompt may help, but it is not yet a controlled interception layer in this workflow.",
      },
      {
        id: "classify",
        label: "Classify recurrence and route only the justified durable correction",
        feedback: "Correct. Decide if future interception is warranted.",
        correct: true,
      },
      {
        id: "rule",
        label: "Add a concise rule because the miss happened more than once",
        feedback: "Recurrence justifies classification, not automatically the broadest durable target.",
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
    kind: "compact",
    title: "Adding dependency",
    situation:
      "The agent can implement a convenience helper faster with a new dependency, but package changes require approval and the repository has a small local alternative.",
    evidence: [
      "The package would add transitive maintenance and supply-chain surface.",
      "A local implementation is slightly longer but stays inside current dependencies.",
      "The agent has edit authority, not dependency-approval authority.",
    ],
    choices: [
      {
        id: "install",
        label: "Add the dependency in the implementation branch and request approval later",
        feedback: "Implementing first moves the permission gate after the risky change.",
      },
      {
        id: "gate",
        label: "Compare the local option, explain the tradeoff, and request approval",
        feedback: "Correct. Compare local alternatives and ask approval.",
        correct: true,
      },
      {
        id: "copy",
        label: "Vendor the needed helper code to avoid changing the package manifest",
        feedback: "Vendoring can create larger maintenance and licensing risk without resolving authority.",
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
    kind: "full",
    title: "Changing auth/API/payment boundary",
    situation:
      "A user asks for a small payment-callback change. The agent can implement it, but repository policy requires owner approval for boundary changes and separate authority for merge or deploy.",
    choices: [
      {
        id: "patch",
        label: "Prepare and merge the narrow patch because the user requested it",
        feedback: "Task intent does not automatically grant boundary, merge, or deploy authority.",
      },
      {
        id: "highrisk",
        label: "Gather evidence, route to the high-risk lane, and request approval",
        feedback: "Correct. Require authority, approval, and deep validation.",
        correct: true,
      },
      {
        id: "skip",
        label: "Implement locally and defer the permission decision until deployment",
        feedback: "Implementation itself can cross the protected boundary; delaying the gate does not remove the risk.",
      },
    ],
    correctMove:
      "Stop and route the task through source-of-truth, ownership, permission, and validation gates.",
    consequence:
      "The workflow protects critical product boundaries.",
    durableCorrectionCandidate:
      "Add or refine a high-risk lane only if the existing workflow failed to intercept this boundary change.",
    relatedGates: ["permission", "source-of-truth", "ownership", "validation", "lifecycle-close", "durable-correction"],
    assessment: {
      evidence: [
        "The user authorizes work on the task but does not mention merge or deploy authority.",
        "Repository instructions require payment-boundary owner approval before implementation changes.",
        "The failing test covers a happy-path callback but not replay, signature, or rollback behavior.",
        "The proposed diff is six lines and changes the callback acceptance condition.",
      ],
      dimensions: [
        {
          id: "authority-source",
          prompt: "Which authority and source-of-truth decision controls this boundary?",
          memoryCue: "Task intent, implementation truth, and merge or deploy authority are separate decisions.",
          choiceOrder: ["tests-define-authority", "owner-only-source", "separate-authorities", "user-authorizes-all"],
          choices: [
            {
              id: "separate-authorities",
              label: "Separate task intent, boundary approval, and behavioral evidence",
              verdict: "aligned",
              explanation: "The decision separates intent, implementation truth, and approval authority instead of collapsing them into one source.",
            },
            {
              id: "user-authorizes-all",
              label: "Treat the user request as authority to implement, merge, and deploy the narrow change",
              verdict: "unsafe",
              explanation: "A task request does not override explicit repository permission and release boundaries.",
            },
            {
              id: "tests-define-authority",
              label: "Treat the passing callback test as authority for both behavior and release approval",
              verdict: "unsafe",
              explanation: "Tests provide behavioral evidence, not ownership, merge, or deploy permission.",
            },
            {
              id: "owner-only-source",
              label: "Ask the boundary owner to specify every implementation detail before inspecting the repo",
              verdict: "misaligned",
              explanation: "Owner approval matters, but the orchestrator can gather non-destructive repo evidence first and present a concrete decision.",
            },
          ],
        },
        {
          id: "workflow-audit",
          prompt: "Which workflow level and audit depth fit a six-line payment change?",
          memoryCue: "Audit depth follows business and security risk, not diff size.",
          choiceOrder: ["small-diff-chain", "high-risk-routed-audit", "bounded-agent-investigation", "evaluator-only"],
          choices: [
            {
              id: "high-risk-routed-audit",
              label: "Use a high-risk lane with ownership and independent validation",
              verdict: "aligned",
              explanation: "Audit depth follows business and security blast radius, not diff size.",
            },
            {
              id: "small-diff-chain",
              label: "Use a short prompt chain because the code diff and affected function are both small",
              verdict: "unsafe",
              explanation: "A predetermined lightweight path omits the risk classification and permission boundary.",
            },
            {
              id: "evaluator-only",
              label: "Use evaluator-optimizer on the patch until the existing callback test passes",
              verdict: "misaligned",
              explanation: "Iterative evaluation against incomplete tests cannot establish missing authority or uncovered abuse cases.",
            },
            {
              id: "bounded-agent-investigation",
              label: "Allow bounded agent investigation, but stop before protected edits and route the decision to the owner",
              verdict: "conditionally-valid",
              explanation: "Dynamic read-only investigation can be useful if tool permissions and the edit boundary are explicit.",
              changesWhen: "If the repo path and required evidence are already known, a routed deterministic workflow is simpler.",
            },
          ],
        },
        {
          id: "next-action",
          prompt: "What is the next orchestrator action?",
          memoryCue: "Pause at the permission boundary and ask with a concrete evidence-backed plan.",
          choiceOrder: ["zoom-out-boundary", "continue-unmerged", "stop-all-work", "ask-human-with-plan"],
          choices: [
            {
              id: "ask-human-with-plan",
              label: "Pause with an evidence-backed plan and ask the authorized owner",
              verdict: "aligned",
              explanation: "The action preserves momentum while placing the protected decision at the correct authority layer.",
            },
            {
              id: "continue-unmerged",
              label: "Continue implementing locally as long as the agent promises not to merge or deploy",
              verdict: "unsafe",
              explanation: "The supplied policy requires approval before implementation, so even a reversible local edit crosses the explicit permission boundary.",
              changesWhen: "This becomes acceptable only when policy explicitly permits isolated local implementation before owner approval.",
            },
            {
              id: "stop-all-work",
              label: "Stop all investigation until the owner writes the exact patch",
              verdict: "misaligned",
              explanation: "Non-destructive evidence gathering can still produce a better approval request.",
            },
            {
              id: "zoom-out-boundary",
              label: "Zoom out to map callback ownership and failure modes before requesting a decision",
              verdict: "conditionally-valid",
              explanation: "This is reasonable if the current evidence does not yet identify the protected contract or appropriate owner.",
              changesWhen: "Once ownership and risks are known, continued zoom-out becomes delay rather than useful evidence gathering.",
            },
          ],
        },
        {
          id: "durable-correction",
          prompt: "What durable correction should follow this task?",
          memoryCue: "Create a durable correction only when evidence shows an interception gap.",
          choiceOrder: ["refine-high-risk-gate", "not-warranted-yet", "new-rule-always", "add-happy-path-test"],
          choices: [
            {
              id: "not-warranted-yet",
              label: "Add nothing unless the current gate failed to intercept the risk",
              verdict: "aligned",
              explanation: "A risky task alone does not prove a workflow gap; first check whether the existing policy intercepted it as designed.",
            },
            {
              id: "new-rule-always",
              label: "Add a new payment rule after every boundary task to maximize future caution",
              verdict: "unsafe",
              explanation: "Repeated overlapping rules create overhead and can obscure the actual authority policy.",
            },
            {
              id: "refine-high-risk-gate",
              label: "Refine the high-risk gate if its trigger failed to identify callback-condition changes",
              verdict: "conditionally-valid",
              explanation: "This is a good durable target when post-task evidence confirms an interception gap.",
              changesWhen: "No change is needed if the current gate already required the pause and approval observed here.",
            },
            {
              id: "add-happy-path-test",
              label: "Add another happy-path test as the only durable correction",
              verdict: "misaligned",
              explanation: "Another narrow test would not address permission, replay, signature, or rollback risks.",
            },
          ],
        },
      ],
      gatePrompt: "Which quality gates are warranted before this change can close?",
      gateOptions: [
        { gateId: "source-of-truth", classification: "required", explanation: "The payment contract and existing policy must be established before changing behavior." },
        { gateId: "ownership", classification: "required", explanation: "The protected boundary has an explicit owner and approval path." },
        { gateId: "permission", classification: "required", explanation: "Implementation, merge, and deploy authority must not be inferred from task intent." },
        { gateId: "validation", classification: "required", explanation: "Validation must cover relevant callback and failure-mode behavior, not only the existing happy path." },
        { gateId: "ui-qa", classification: "unnecessary", explanation: "No visible UI behavior is part of the supplied boundary change." },
        { gateId: "lifecycle-close", classification: "required", explanation: "Close requires approval evidence and risk-matched validation results." },
        { gateId: "durable-correction", classification: "useful", explanation: "Use it only after determining whether the existing workflow failed to intercept the risk." },
      ],
      gateMemoryCue: "A small diff can still require deep gates when the boundary has high blast radius.",
      rationalePrompt: "Why do your authority, audit, gate, and next-action choices fit this high-risk task?",
      rationaleDescription: "Separate implementation evidence from permission authority and explain why the small diff does or does not change audit depth.",
      rationaleMemoryCue: "State who has authority, what evidence is missing, and which gate controls the next action.",
      calibratedRationale:
        "The user request establishes task intent, while repository policy and the boundary owner control whether implementation may proceed; merge and deploy remain separate authorities. The six-line diff still changes a payment acceptance condition, so the task belongs in a high-risk lane with source, ownership, permission, validation, and lifecycle-close gates. Gather non-destructive evidence, then ask the authorized owner with a concrete plan. Add a durable correction only if the existing gate failed or proved unclear.",
      rationaleRubric: [
        "Separates task intent, implementation truth, and merge/deploy authority.",
        "Explains audit depth using business/security risk rather than diff size.",
        "Connects the next action to permission and validation evidence.",
        "Avoids creating a durable rule without evidence of a workflow gap.",
      ],
      transferQuestion: "In another repository, what explicit policy would make reversible local implementation acceptable before owner approval?",
    },
  },
] satisfies PracticeScenario[];
