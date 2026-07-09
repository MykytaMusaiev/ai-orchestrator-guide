import type { UiDictionary } from "../schemas";

export const ui = {
  metadata: {
    defaultTitle: "AI Orchestrator Guide",
    titleTemplate: "%s | AI Orchestrator Guide",
    description:
      "A practice-oriented learning site for developer-orchestrators training AI workflow orchestration, source-of-truth decisions, quality gates, and agentic loop judgment.",
    siteName: "AI Orchestrator Guide",
  },
  layout: {
    brandTitle: "Orchestrator Learning",
    brandSubtitle: "Practice-oriented workflow judgment",
    chapterNavigation: "Chapter navigation",
    mobileQuickNavigation: "Mobile quick navigation",
    overview: "Overview",
    languageLabel: "Language",
    switchLanguage: "Switch language",
    closeChapterPicker: "Close chapter picker",
    closeChapters: "Close chapters",
  },
  navigation: {
    chapters: "Chapters",
    continue: "Continue",
    practice: "Practice",
    refs: "Refs",
    previous: "Previous",
    next: "Next",
    current: "Current",
    planned: "Planned",
    chapterMap: "Chapter map",
    practiceScenarios: "Practice scenarios",
  },
  home: {
    mobileContext: "Overview",
    eyebrow: "Practice-oriented learning product",
    title: "AI workflow orchestration for developer judgment",
    summary:
      "Learn to choose authority layers, workflow levels, audit depth, quality gates, and the next orchestrator action for AI coding tasks.",
    progressLabel: "Current chapter progress",
    chapterPath: (count) => `${count} chapter path`,
    startPrompt: "Start with the first available chapter",
    howToEyebrow: "How to use it",
    howToTitle: "Start focused, then expand",
    howToBody:
      "This overview keeps the learning path compact. Open a chapter route to read, make the checkpoint decision, and try the lightweight practice tool attached to that chapter.",
    startLearning: "Start learning",
    practice: "Practice",
    references: "References",
    mapEyebrow: "MVP path",
    mapTitle: "Chapter map",
    mapBody:
      "Each item opens a chapter route with learning content, a decision checkpoint, and practice focused on one orchestrator skill.",
  },
  chapter: {
    mobileContext: (order) => `Chapter ${order}`,
    progressLabel: "Current chapter progress",
    progressText: (order, total) => `Chapter ${order} / ${total}`,
    practiceTargetEyebrow: "Practice target",
    practiceTargetTitle: "What this chapter trains",
    patternSetEyebrow: "Pattern set",
    patternSetTitle: "Six workflow patterns",
    gateSetEyebrow: "Gate set",
    gateSetTitle: "Seven quality gates",
    useWhen: "Use when",
    avoidWhen: "Avoid when",
    risk: "Risk",
    example: "Example",
    watchOut: "Watch out",
    sourceNotesEyebrow: "Source notes",
    sourceNotesTitle: "Research anchors for this slice",
    sourceNotesBody:
      "These are lightweight anchors for later source-backed validation. They are attached to external factual claims, not product decisions.",
    adjacentLabel: "Adjacent chapters",
  },
  practice: {
    mobileContext: "Practice",
    eyebrow: "Practice scenarios",
    title: "Practice scenarios",
    summary:
      "Use the eight MVP scenarios to practice mixed orchestrator judgment across authority, workflow level, audit depth, gates, and durable correction.",
    progressLabel: "Route status",
    scenarioCount: "8 scenarios",
    capstone: "Cumulative capstone",
    howToEyebrow: "How to use it",
    howToTitle: "Choose before revealing feedback",
    howToBody:
      "Each scenario asks for a concrete orchestrator move. Pick the action, read the consequence, then compare against the durable correction candidate.",
  },
  references: {
    mobileContext: "References",
    eyebrow: "References / advanced reading",
    title: "References and advanced reading",
    summary:
      "Research anchors for later source-backed validation of external claims about agents, workflows, tools, HITL, evals, and permissions.",
    progressLabel: "Route status",
    backlog: "Research backlog",
    validateLater: "Validate current claims later",
    sourcePolicyEyebrow: "Source policy",
    sourcePolicyTitle: "Use sources for external claims",
    sourcePolicyBody:
      "Product decisions come from the calibration artifact. External factual claims need source-backed anchors, and concrete vendor behavior needs current official docs at the time of a research pass.",
    groups: [
      {
        category: "core",
        eyebrow: "Core references",
        title: "Workflow and agent concepts",
        description:
          "Use these anchors for later validation of workflow patterns, agent loops, HITL, and evals.",
      },
      {
        category: "vendor-docs",
        eyebrow: "Vendor docs",
        title: "Current product behavior",
        description:
          "Check current official docs before making concrete claims about sandboxing, approvals, permissions, or tool behavior.",
      },
      {
        category: "advanced",
        eyebrow: "Advanced reading",
        title: "Next-layer concepts",
        description:
          "Keep these as optional reading. They should not become the MVP blueprint.",
      },
    ],
  },
  learning: {
    decisionCheckpoint: "Decision checkpoint",
    checkpointTitle: "Make the authority call",
    hideExpectedMove: "Hide expected move",
    revealExpectedMove: "Reveal expected move",
    durableHabit: "Durable habit:",
    relatedConcepts: "Related concepts",
    sourceAnchors: "Source anchors",
    sourceListLabel: "Source anchors for this chapter",
  },
  interactives: {
    eyebrow: "Interactive",
    scenariosLabel: "scenarios",
    choiceInstruction: "Choose the orchestrator move for this scenario.",
    correctMove: "Correct move:",
    consequence: "Consequence:",
    relatedGates: "Related gates",
    chooseHint: "Choose a move to reveal feedback.",
    selfCheckTitle: "Self-check / reveal cards",
    selfCheckIntro:
      "Use these quick checks to distinguish plausible answers, evidence, and durable workflow improvement.",
    authorityMatrixTitle: "Source-of-Truth Authority Matrix",
    authorityMatrixIntro:
      "Choose the authority layer before choosing whether the agent can continue.",
    authorityLayer: "Authority layer",
    sourceOfTruth: "Source of truth",
    workflowClassifierTitle: "Workflow Classifier",
    workflowClassifierIntro:
      "Classify the workflow pattern and notice the orchestrator risk before work starts.",
    targetPattern: "Target pattern",
    risk: "Risk",
    agenticLoopTitle: "Agentic Loop Simulator",
    agenticLoopIntro:
      "Practice deciding whether the loop should continue, stop, zoom out, or ask for human input.",
    localLearningTitle: "Local Learning Loop Wizard",
    localLearningIntro:
      "Classify the failure signal and route the correction to the smallest durable layer that will intercept it later.",
    failureSignal: "Failure signal",
    durableTarget: "Durable target",
    permissionRiskTitle: "Permission / Risk Gate Stress-Test",
    permissionRiskIntro:
      "Pause, explain the risk, identify the gate, and decide whether to ask approval, validate, stop, or zoom out.",
    practiceScenariosTitle: "Practice Scenarios",
    practiceScenariosIntro:
      "Mixed scenarios combine ownership, source of truth, UI QA, zoom-out, durable correction, permission gates, and high-risk boundaries.",
    durableCorrectionCandidate: "Durable correction candidate",
  },
} satisfies UiDictionary;
