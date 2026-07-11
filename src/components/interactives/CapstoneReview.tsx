import Link from "next/link";
import type {
  AssessmentReviewState,
  CapstoneDimension,
  CapstoneDimensionId,
  FullPracticeScenario,
  GateId,
  Locale,
  UiDictionary,
} from "@/content";
import { evaluateGateSelection, getReviewState } from "@/lib/assessment";
import { getChapterSectionHref } from "@/lib/i18n/routing";

export type CapstoneSelections = Partial<Record<CapstoneDimensionId, string>>;

type CapstoneReviewProps = {
  dimensions: Record<CapstoneDimensionId, CapstoneDimension>;
  gateTitles: Record<GateId, string>;
  locale: Locale;
  mode: "guided" | "assessment";
  rationale: string;
  scenario: FullPracticeScenario;
  selectedGates: readonly GateId[];
  selections: CapstoneSelections;
  ui: UiDictionary["interactives"];
};

const dimensionOrder: CapstoneDimensionId[] = [
  "authority-source",
  "workflow-audit",
  "next-action",
  "durable-correction",
];

function getStateClass(state: AssessmentReviewState) {
  return `review-state review-state--${state}`;
}

export function CapstoneReview({
  dimensions,
  gateTitles,
  locale,
  mode,
  rationale,
  scenario,
  selectedGates,
  selections,
  ui,
}: CapstoneReviewProps) {
  const gateReview = evaluateGateSelection(
    scenario.assessment.gateOptions,
    selectedGates,
  );
  const selectedDimensions = dimensionOrder.map((dimensionId) => {
    const dimension = dimensions[dimensionId];
    const choice = dimension.choices.find(
      (item) => item.id === selections[dimensionId],
    );

    return { choice, dimension, dimensionId };
  });
  const gateSelection = selectedGates.map((gateId) => gateTitles[gateId]).join(", ");

  return (
    <>
      <p>{mode === "guided" ? ui.guidedReviewIntro : ui.reviewIntro}</p>

      <section className="decision-trace" aria-labelledby="decision-trace-title">
        <h4 id="decision-trace-title">{ui.decisionTrace}</h4>
        <ol>
          {selectedDimensions.slice(0, 2).map(({ choice, dimensionId }) => {
            if (!choice) return null;
            const state = getReviewState(choice.verdict);
            return (
              <li key={dimensionId}>
                <div>
                  <strong>{ui.traceLabels[dimensionId]}</strong>
                  <span>{choice.label}</span>
                </div>
                <span className={getStateClass(state)}>{ui.reviewStates[state]}</span>
              </li>
            );
          })}
          <li>
            <div>
              <strong>{ui.traceLabels.gates}</strong>
              <span>{gateSelection}</span>
            </div>
            <span className={getStateClass(gateReview.state)}>
              {ui.reviewStates[gateReview.state]}
            </span>
          </li>
          {selectedDimensions.slice(2).map(({ choice, dimensionId }) => {
            if (!choice) return null;
            const state = getReviewState(choice.verdict);
            return (
              <li key={dimensionId}>
                <div>
                  <strong>{ui.traceLabels[dimensionId]}</strong>
                  <span>{choice.label}</span>
                </div>
                <span className={getStateClass(state)}>{ui.reviewStates[state]}</span>
              </li>
            );
          })}
          <li>
            <div>
              <strong>{ui.traceLabels.rationale}</strong>
              <span>{rationale}</span>
            </div>
            <span className="review-state">{ui.selfReviewed}</span>
          </li>
        </ol>
      </section>

      <section className="detailed-review" aria-labelledby="detailed-review-title">
        <h4 id="detailed-review-title">{ui.detailedReview}</h4>
        {selectedDimensions.map(({ choice, dimension, dimensionId }) => {
          if (!choice) return null;
          const state = getReviewState(choice.verdict);
          return (
            <details className="dimension-review" key={dimensionId}>
              <summary>
                <span>{ui.traceLabels[dimensionId]}</span>
                <span className={getStateClass(state)}>{ui.reviewStates[state]}</span>
              </summary>
              <p>
                <strong>{ui.selectedAnswer}</strong> {choice.label}
              </p>
              <p>{choice.explanation}</p>
              {choice.changesWhen ? (
                <p>
                  <strong>{ui.evidenceWouldChange}</strong> {choice.changesWhen}
                </p>
              ) : null}
              <p className="memory-cue">
                <strong>{ui.memoryCue}</strong> {dimension.memoryCue}
              </p>
            </details>
          );
        })}

        <details className="dimension-review">
          <summary>
            <span>{ui.traceLabels.gates}</span>
            <span className={getStateClass(gateReview.state)}>
              {ui.reviewStates[gateReview.state]}
            </span>
          </summary>
          {gateReview.selected.map((gate) => (
            <p key={gate.gateId}>
              <strong>
                {gateTitles[gate.gateId]} - {ui.gateClassifications[gate.classification]}
              </strong>{" "}
              {gate.explanation}
            </p>
          ))}
          {gateReview.missingRequired.length ? (
            <div className="assessment-warning">
              <strong>{ui.missingCriticalGates}</strong>
              <ul>
                {gateReview.missingRequired.map((gateId) => (
                  <li key={gateId}>{gateTitles[gateId]}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className="memory-cue">
            <strong>{ui.memoryCue}</strong> {scenario.assessment.gateMemoryCue}
          </p>
        </details>

        <details className="dimension-review">
          <summary>
            <span>{ui.traceLabels.rationale}</span>
            <span className="review-state">{ui.selfReviewed}</span>
          </summary>
          <p>{rationale}</p>
          <p className="assessment-note">{ui.rationaleNotGraded}</p>
          <h5>{ui.calibratedRationale}</h5>
          <p>{scenario.assessment.calibratedRationale}</p>
          <ul>
            {scenario.assessment.rationaleRubric.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="memory-cue">
            <strong>{ui.memoryCue}</strong> {scenario.assessment.rationaleMemoryCue}
          </p>
        </details>
      </section>

      <aside className="transfer-question">
        <h4>{ui.transferQuestion}</h4>
        <p>{scenario.assessment.transferQuestion}</p>
      </aside>

      <div className="concept-row" aria-label={ui.relatedGates}>
        {scenario.relatedGates.map((gateId) => (
          <Link
            href={getChapterSectionHref("quality-gates", `gate-${gateId}`, locale)}
            key={gateId}
          >
            {gateTitles[gateId]}
          </Link>
        ))}
      </div>
    </>
  );
}
