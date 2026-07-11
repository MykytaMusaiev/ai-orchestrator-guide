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

export type ReferenceStatus = "verified-primary" | "advanced-reading";

export type ReferenceCategory = "core" | "vendor-docs" | "advanced";

export type ReferenceVolatility = "stable" | "vendor-specific" | "heuristic";

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

export type DurableTargetId =
  | "rule"
  | "skill"
  | "test"
  | "docs-update"
  | "validation-check"
  | "quality-gate"
  | "stop-condition";

export type AssessmentVerdict =
  | "aligned"
  | "conditionally-valid"
  | "misaligned"
  | "unsafe";

export type AssessmentReviewState =
  | "aligned"
  | "conditionally-reasonable"
  | "needs-review";

export type GateAssessmentClassification =
  | "required"
  | "useful"
  | "unnecessary"
  | "insufficient";

export type CapstoneDimensionId =
  | "authority-source"
  | "workflow-audit"
  | "next-action"
  | "durable-correction";

export type LoopAction = "continue" | "stop" | "zoom-out" | "ask-human";

export type LoopOutcome = "complete" | "stopped" | "zoomed-out" | "escalated";

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
  durableTargetId: DurableTargetId | "none";
  durableTarget: string;
};

export type AssessmentChoice = {
  id: string;
  label: string;
  verdict: AssessmentVerdict;
  explanation: string;
  changesWhen?: string;
};

export type CapstoneDimension = {
  id: CapstoneDimensionId;
  prompt: string;
  memoryCue: string;
  choiceOrder: string[];
  choices: AssessmentChoice[];
};

export type GateAssessmentOption = {
  gateId: GateId;
  classification: GateAssessmentClassification;
  explanation: string;
};

export type CapstoneAssessment = {
  evidence: string[];
  dimensions: CapstoneDimension[];
  gatePrompt: string;
  gateOptions: GateAssessmentOption[];
  gateMemoryCue: string;
  rationalePrompt: string;
  rationaleDescription: string;
  rationaleMemoryCue: string;
  calibratedRationale: string;
  rationaleRubric: string[];
  transferQuestion: string;
};

type PracticeScenarioBase = DecisionScenario & {
  durableCorrectionCandidate: string;
};

export type CompactPracticeScenario = PracticeScenarioBase & {
  kind: "compact";
  evidence?: string[];
};

export type FullPracticeScenario = PracticeScenarioBase & {
  kind: "full";
  assessment: CapstoneAssessment;
};

export type PracticeScenario = CompactPracticeScenario | FullPracticeScenario;

export type AgenticLoopTransition = {
  id: string;
  action: LoopAction;
  label: string;
  feedback: string;
  nextNodeId?: string;
  outcome?: LoopOutcome;
};

export type AgenticLoopNode = {
  id: string;
  title: string;
  situation: string;
  evidence: string[];
  choices: AgenticLoopTransition[];
};

export type AgenticLoopCase = {
  id: string;
  title: string;
  entryNodeId: string;
  nodes: AgenticLoopNode[];
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
  scope: string;
  verifiedAt: string;
  volatility: ReferenceVolatility;
  vendorScope?: string;
  note: string;
};

export type ReferenceLifecycle = Pick<
  Reference,
  "url" | "status" | "verifiedAt" | "volatility" | "vendorScope"
>;

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
    operationalEyebrow: string;
    operationalTitle: string;
    operationalBody: string;
    actionsTitle: string;
    actionsBody: string;
    loopDecisionsLink: string;
    zoomOutLink: string;
    gatesTitle: string;
    gatesBody: string;
    patternsTitle: string;
    patternsBody: string;
    checklistTitle: string;
    checklistBody: string;
    checklistLink: string;
    practiceTitle: string;
    practiceBody: string;
    guidedPracticeLink: string;
    directPracticeLink: string;
    sourceLifecycle: {
      scopeLabel: string;
      verifiedLabel: string;
      volatilityLabel: string;
      vendorScopeLabel: string;
      volatilityLabels: Record<ReferenceVolatility, string>;
    };
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
    guidedMode: string;
    guidedModeIntro: string;
    assessmentMode: string;
    assessmentModeIntro: string;
    evidence: string;
    beginAssessment: string;
    step: string;
    of: string;
    back: string;
    nextStep: string;
    submitDecision: string;
    submitAssessment: string;
    checkDecision: string;
    continueAfterReview: string;
    viewGuidedSummary: string;
    reset: string;
    retry: string;
    requiredChoice: string;
    requiredGates: string;
    requiredRationale: string;
    reviewTitle: string;
    reviewIntro: string;
    guidedReviewIntro: string;
    decisionTrace: string;
    traceLabels: Record<CapstoneDimensionId | "gates" | "rationale", string>;
    detailedReview: string;
    transferQuestion: string;
    memoryCue: string;
    evidenceWouldChange: string;
    selfReviewed: string;
    selectedAnswer: string;
    calibratedRationale: string;
    rationaleSelfReview: string;
    rationaleNotGraded: string;
    missingCriticalGates: string;
    gateSelected: string;
    gateNotSelected: string;
    reviewStates: Record<AssessmentReviewState, string>;
    gateClassifications: Record<GateAssessmentClassification, string>;
    loopStage: string;
    loopFeedback: string;
    loopContinue: string;
    loopOutcome: string;
    loopOutcomes: Record<LoopOutcome, string>;
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
  agenticLoopCases: readonly AgenticLoopCase[];
  localLearningCases: readonly LocalLearningCase[];
  permissionRiskCases: readonly DecisionScenario[];
  practiceScenarios: readonly PracticeScenario[];
  workflowPatterns: readonly WorkflowPattern[];
  gates: readonly Gate[];
  references: Record<ReferenceId, Reference>;
};
