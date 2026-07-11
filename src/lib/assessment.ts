import type {
  AssessmentReviewState,
  AssessmentVerdict,
  GateAssessmentOption,
  GateId,
} from "@/content";

export function getReviewState(
  verdict: AssessmentVerdict,
): AssessmentReviewState {
  if (verdict === "aligned") {
    return "aligned";
  }

  if (verdict === "conditionally-valid") {
    return "conditionally-reasonable";
  }

  return "needs-review";
}

export type GateReview = {
  state: AssessmentReviewState;
  missingRequired: GateId[];
  selected: Array<GateAssessmentOption & { state: AssessmentReviewState }>;
};

export function evaluateGateSelection(
  options: readonly GateAssessmentOption[],
  selectedGateIds: readonly GateId[],
): GateReview {
  const selectedIds = new Set(selectedGateIds);
  const missingRequired = options
    .filter(
      (option) =>
        option.classification === "required" && !selectedIds.has(option.gateId),
    )
    .map((option) => option.gateId);
  const selected = options
    .filter((option) => selectedIds.has(option.gateId))
    .map((option) => ({
      ...option,
      state:
        option.classification === "required"
          ? ("aligned" as const)
          : option.classification === "useful"
            ? ("conditionally-reasonable" as const)
            : option.classification === "insufficient" && missingRequired.length === 0
              ? ("conditionally-reasonable" as const)
              : ("needs-review" as const),
    }));
  const hasProblematicSelection = selected.some(
    (option) => option.state === "needs-review",
  );
  const hasConditionalSelection = selected.some(
    (option) => option.state === "conditionally-reasonable",
  );

  return {
    missingRequired,
    selected,
    state:
      missingRequired.length > 0 || hasProblematicSelection
        ? "needs-review"
        : hasConditionalSelection
          ? "conditionally-reasonable"
          : "aligned",
  };
}
