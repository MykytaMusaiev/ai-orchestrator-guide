export type Locale = "en" | "ua";

export type ChapterStatus = "available" | "planned";

export type InteractiveKey =
  | "self-check"
  | "authority-matrix"
  | "workflow-classifier"
  | "agentic-loop"
  | "local-learning"
  | "permission-risk"
  | "practice-scenarios";

export type ReferenceId =
  | "anthropic-building-effective-agents"
  | "anthropic-agent-evals"
  | "openai-practical-agents"
  | "langgraph-workflows-agents"
  | "langchain-human-in-loop"
  | "willison-agent-definition"
  | "karpathy-software-30"
  | "addy-osmani-loop-engineering"
  | "openai-codex-docs"
  | "claude-code-docs";

export type ReferenceStatus = "research-backlog-anchor" | "current-docs-needed";

export type ReferenceCategory = "core" | "vendor-docs" | "advanced";

export type GateId =
  | "validation"
  | "source-of-truth"
  | "ownership"
  | "permission"
  | "ui-qa"
  | "lifecycle-close"
  | "durable-correction";

export type WorkflowPatternId =
  | "prompt-chaining"
  | "routing"
  | "parallelization"
  | "orchestrator-worker"
  | "evaluator-optimizer"
  | "agent";

export type ChapterNavItem = {
  id: string;
  slug: string;
  title: string;
  label: string;
  status: ChapterStatus;
};

export type LearningCheckpoint = {
  id: string;
  prompt: string;
  instruction: string;
  revealTitle: string;
  reveal: string[];
  durableHabit: string;
  relatedConcepts: string[];
};

export type LearningSection = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  paragraphs: string[];
  sourceRefs?: ReferenceId[];
};

export type LearningChapter = {
  id: string;
  slug: string;
  order: number;
  totalChapters: number;
  label: string;
  status: ChapterStatus;
  title: string;
  eyebrow: string;
  summary: string;
  practices: string[];
  sections: LearningSection[];
  checkpoint: LearningCheckpoint;
  sourceRefs: ReferenceId[];
  interactive?: InteractiveKey;
};

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

export type Gate = {
  id: GateId;
  title: string;
  purpose: string;
  useWhen: string;
  watchOut: string;
};

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

export type Reference = {
  id: ReferenceId;
  label: string;
  title: string;
  url: string;
  category: ReferenceCategory;
  status: ReferenceStatus;
  note: string;
};

export type UiDictionary = {
  metadata: {
    defaultTitle: string;
    titleTemplate: string;
    description: string;
    siteName: string;
  };
  layout: {
    brandTitle: string;
    brandSubtitle: string;
    chapterNavigation: string;
    mobileQuickNavigation: string;
    overview: string;
    languageLabel: string;
    switchLanguage: string;
    closeChapterPicker: string;
    closeChapters: string;
  };
  navigation: {
    chapters: string;
    continue: string;
    practice: string;
    refs: string;
    previous: string;
    next: string;
    current: string;
    planned: string;
    chapterMap: string;
    practiceScenarios: string;
  };
  home: {
    mobileContext: string;
    eyebrow: string;
    title: string;
    summary: string;
    progressLabel: string;
    chapterPath: (count: number) => string;
    startPrompt: string;
    howToEyebrow: string;
    howToTitle: string;
    howToBody: string;
    startLearning: string;
    practice: string;
    references: string;
    mapEyebrow: string;
    mapTitle: string;
    mapBody: string;
  };
  chapter: {
    mobileContext: (order: number) => string;
    progressLabel: string;
    progressText: (order: number, total: number) => string;
    practiceTargetEyebrow: string;
    practiceTargetTitle: string;
    patternSetEyebrow: string;
    patternSetTitle: string;
    gateSetEyebrow: string;
    gateSetTitle: string;
    useWhen: string;
    avoidWhen: string;
    risk: string;
    example: string;
    watchOut: string;
    sourceNotesEyebrow: string;
    sourceNotesTitle: string;
    sourceNotesBody: string;
    adjacentLabel: string;
  };
  practice: {
    mobileContext: string;
    eyebrow: string;
    title: string;
    summary: string;
    progressLabel: string;
    scenarioCount: string;
    capstone: string;
    howToEyebrow: string;
    howToTitle: string;
    howToBody: string;
  };
  references: {
    mobileContext: string;
    eyebrow: string;
    title: string;
    summary: string;
    progressLabel: string;
    backlog: string;
    validateLater: string;
    sourcePolicyEyebrow: string;
    sourcePolicyTitle: string;
    sourcePolicyBody: string;
    groups: {
      category: ReferenceCategory;
      eyebrow: string;
      title: string;
      description: string;
    }[];
  };
  learning: {
    decisionCheckpoint: string;
    checkpointTitle: string;
    hideExpectedMove: string;
    revealExpectedMove: string;
    durableHabit: string;
    relatedConcepts: string;
    sourceAnchors: string;
    sourceListLabel: string;
  };
  interactives: {
    eyebrow: string;
    scenariosLabel: string;
    choiceInstruction: string;
    correctMove: string;
    consequence: string;
    relatedGates: string;
    chooseHint: string;
    selfCheckTitle: string;
    selfCheckIntro: string;
    authorityMatrixTitle: string;
    authorityMatrixIntro: string;
    authorityLayer: string;
    sourceOfTruth: string;
    workflowClassifierTitle: string;
    workflowClassifierIntro: string;
    targetPattern: string;
    risk: string;
    agenticLoopTitle: string;
    agenticLoopIntro: string;
    localLearningTitle: string;
    localLearningIntro: string;
    failureSignal: string;
    durableTarget: string;
    permissionRiskTitle: string;
    permissionRiskIntro: string;
    practiceScenariosTitle: string;
    practiceScenariosIntro: string;
    durableCorrectionCandidate: string;
  };
};

export type LocalizedContent = {
  locale: Locale;
  ui: UiDictionary;
  learningChapters: readonly LearningChapter[];
  learningPath: readonly ChapterNavItem[];
  availableChapters: readonly LearningChapter[];
  firstAvailableChapter: LearningChapter;
  selfCheckCards: readonly SelfCheckCard[];
  authorityMatrixCases: readonly AuthorityMatrixCase[];
  workflowClassifierCases: readonly WorkflowClassifierCase[];
  agenticLoopCases: readonly DecisionScenario[];
  localLearningCases: readonly LocalLearningCase[];
  permissionRiskCases: readonly DecisionScenario[];
  practiceScenarios: readonly PracticeScenario[];
  workflowPatterns: readonly WorkflowPattern[];
  gates: readonly Gate[];
  references: Record<ReferenceId, Reference>;
};
