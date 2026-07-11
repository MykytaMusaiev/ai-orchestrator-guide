"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type {
  CapstoneDimension,
  CapstoneDimensionId,
  FullPracticeScenario,
  GateId,
  Locale,
  UiDictionary,
} from "@/content";
import { evaluateGateSelection, getReviewState } from "@/lib/assessment";
import {
  CapstoneReview,
  type CapstoneSelections,
} from "./CapstoneReview";

type CapstoneAssessmentProps = {
  scenario: FullPracticeScenario;
  gateTitles: Record<GateId, string>;
  locale: Locale;
  mode: "guided" | "assessment";
  ui: UiDictionary["interactives"];
};

export function CapstoneAssessment({
  scenario,
  gateTitles,
  locale,
  mode,
  ui,
}: CapstoneAssessmentProps) {
  const errorId = useId();
  const reviewRef = useRef<HTMLHeadingElement>(null);
  const stageFeedbackRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<CapstoneSelections>({});
  const [selectedGates, setSelectedGates] = useState<GateId[]>([]);
  const [rationale, setRationale] = useState("");
  const [error, setError] = useState("");
  const [stageReviewed, setStageReviewed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dimensions = useMemo(
    () =>
      Object.fromEntries(
        scenario.assessment.dimensions.map((dimension) => [dimension.id, dimension]),
      ) as Record<CapstoneDimensionId, CapstoneDimension>,
    [scenario.assessment.dimensions],
  );
  const gateReview = evaluateGateSelection(
    scenario.assessment.gateOptions,
    selectedGates,
  );
  const totalSteps = 7;

  useEffect(() => {
    if (submitted) {
      reviewRef.current?.focus();
    }
  }, [submitted]);

  useEffect(() => {
    if (mode === "guided" && stageReviewed) {
      stageFeedbackRef.current?.focus();
    }
  }, [mode, stageReviewed]);

  function getDimensionForStep(currentStep: number) {
    if (currentStep === 1) return dimensions["authority-source"];
    if (currentStep === 2) return dimensions["workflow-audit"];
    if (currentStep === 4) return dimensions["next-action"];
    if (currentStep === 5) return dimensions["durable-correction"];
    return undefined;
  }

  function validateCurrentStep() {
    const dimension = getDimensionForStep(step);

    if (dimension && !selections[dimension.id]) {
      return ui.requiredChoice;
    }

    if (step === 3 && selectedGates.length === 0) {
      return ui.requiredGates;
    }

    if (step === 6 && !rationale.trim()) {
      return ui.requiredRationale;
    }

    return "";
  }

  function moveToNextStep() {
    setError("");
    setStageReviewed(false);
    setStep((current) => Math.min(current + 1, totalSteps - 1));
  }

  function advanceAssessment() {
    const validationError = validateCurrentStep();

    if (validationError) {
      setError(validationError);
      return;
    }

    moveToNextStep();
  }

  function checkGuidedDecision() {
    const validationError = validateCurrentStep();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setStageReviewed(true);
  }

  function submitAssessment() {
    const validationError = validateCurrentStep();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSubmitted(true);
  }

  function reset() {
    setStep(0);
    setSelections({});
    setSelectedGates([]);
    setRationale("");
    setError("");
    setStageReviewed(false);
    setSubmitted(false);
  }

  function toggleGate(gateId: GateId) {
    setSelectedGates((current) =>
      current.includes(gateId)
        ? current.filter((item) => item !== gateId)
        : [...current, gateId],
    );
    setError("");
    setStageReviewed(false);
  }

  if (submitted) {
    return (
      <div className="interactive__panel assessment-review">
        <h3 ref={reviewRef} tabIndex={-1}>
          {ui.reviewTitle}
        </h3>
        <CapstoneReview
          dimensions={dimensions}
          gateTitles={gateTitles}
          locale={locale}
          mode={mode}
          rationale={rationale}
          scenario={scenario}
          selectedGates={selectedGates}
          selections={selections}
          ui={ui}
        />
        <div className="assessment-actions">
          <button className="assessment-secondary" onClick={reset} type="button">
            {ui.retry}
          </button>
        </div>
      </div>
    );
  }

  const currentDimension = getDimensionForStep(step);
  const selectedChoice = currentDimension?.choices.find(
    (choice) => choice.id === selections[currentDimension.id],
  );
  const selectedState = selectedChoice
    ? getReviewState(selectedChoice.verdict)
    : undefined;
  const inputsDisabled = mode === "guided" && stageReviewed;

  return (
    <div className="interactive__panel capstone-assessment">
      <div
        className="assessment-progress"
        aria-label={`${ui.step} ${step + 1} ${ui.of} ${totalSteps}`}
      >
        <span>{ui.step} {step + 1} {ui.of} {totalSteps}</span>
        <progress max={totalSteps} value={step + 1} />
      </div>

      {step === 0 ? (
        <div className="interactive__situation">
          <h3>{scenario.title}</h3>
          <p>{scenario.situation}</p>
          <div className="evidence-block">
            <h4>{ui.evidence}</h4>
            <ul>
              {scenario.assessment.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {currentDimension ? (
        <fieldset className="assessment-fieldset" disabled={inputsDisabled}>
          <legend>{currentDimension.prompt}</legend>
          <div className="assessment-options">
            {currentDimension.choiceOrder.map((choiceId) => {
              const choice = currentDimension.choices.find(
                (item) => item.id === choiceId,
              );

              if (!choice) return null;

              return (
              <label className="assessment-option" key={choice.id}>
                <input
                  checked={selections[currentDimension.id] === choice.id}
                  name={`${scenario.id}-${currentDimension.id}`}
                  onChange={() => {
                    setSelections((current) => ({
                      ...current,
                      [currentDimension.id]: choice.id,
                    }));
                    setError("");
                    setStageReviewed(false);
                  }}
                  type="radio"
                  value={choice.id}
                />
                <span>{choice.label}</span>
              </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {step === 3 ? (
        <fieldset className="assessment-fieldset" disabled={inputsDisabled}>
          <legend>{scenario.assessment.gatePrompt}</legend>
          <div className="assessment-options assessment-options--gates">
            {scenario.assessment.gateOptions.map((option) => (
              <label className="assessment-option" key={option.gateId}>
                <input
                  checked={selectedGates.includes(option.gateId)}
                  onChange={() => toggleGate(option.gateId)}
                  type="checkbox"
                />
                <span>{gateTitles[option.gateId]}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 6 ? (
        <div className="assessment-rationale">
          <label htmlFor={`${scenario.id}-rationale`}>
            {scenario.assessment.rationalePrompt}
          </label>
          <p id={`${scenario.id}-rationale-description`}>
            {scenario.assessment.rationaleDescription}
          </p>
          <textarea
            aria-describedby={`${scenario.id}-rationale-description`}
            disabled={inputsDisabled}
            id={`${scenario.id}-rationale`}
            onChange={(event) => {
              setRationale(event.target.value);
              setError("");
              setStageReviewed(false);
            }}
            required
            rows={5}
            value={rationale}
          />
        </div>
      ) : null}

      {mode === "guided" && stageReviewed ? (
        <section className="guided-stage-feedback">
          <h4 ref={stageFeedbackRef} tabIndex={-1}>
            {step === 6
              ? ui.selfReviewed
              : ui.reviewStates[selectedState ?? gateReview.state]}
          </h4>
          {selectedChoice && selectedState ? (
            <>
              <p>{selectedChoice.explanation}</p>
              {selectedChoice.changesWhen ? (
                <p>
                  <strong>{ui.evidenceWouldChange}</strong>{" "}
                  {selectedChoice.changesWhen}
                </p>
              ) : null}
              <p className="memory-cue">
                <strong>{ui.memoryCue}</strong> {currentDimension?.memoryCue}
              </p>
            </>
          ) : null}
          {step === 3 ? (
            <>
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
            </>
          ) : null}
          {step === 6 ? (
            <>
              <p className="assessment-note">{ui.rationaleNotGraded}</p>
              <h5>{ui.calibratedRationale}</h5>
              <p>{scenario.assessment.calibratedRationale}</p>
              <ul>
                {scenario.assessment.rationaleRubric.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="memory-cue">
                <strong>{ui.memoryCue}</strong>{" "}
                {scenario.assessment.rationaleMemoryCue}
              </p>
            </>
          ) : null}
        </section>
      ) : null}

      {error ? (
        <p aria-live="polite" className="assessment-error" id={errorId}>
          {error}
        </p>
      ) : null}

      <div className="assessment-actions">
        {step > 0 ? (
          <button
            className="assessment-secondary"
            onClick={() => {
              setError("");
              setStageReviewed(false);
              setStep((current) => current - 1);
            }}
            type="button"
          >
            {ui.back}
          </button>
        ) : null}

        {step === 0 ? (
          <button className="assessment-primary" onClick={moveToNextStep} type="button">
            {ui.beginAssessment}
          </button>
        ) : mode === "assessment" ? (
          step < totalSteps - 1 ? (
            <button className="assessment-primary" onClick={advanceAssessment} type="button">
              {ui.nextStep}
            </button>
          ) : (
            <button className="assessment-primary" onClick={submitAssessment} type="button">
              {ui.submitAssessment}
            </button>
          )
        ) : !stageReviewed ? (
          <button className="assessment-primary" onClick={checkGuidedDecision} type="button">
            {ui.checkDecision}
          </button>
        ) : step < totalSteps - 1 ? (
          <button className="assessment-primary" onClick={moveToNextStep} type="button">
            {ui.continueAfterReview}
          </button>
        ) : (
          <button className="assessment-primary" onClick={() => setSubmitted(true)} type="button">
            {ui.viewGuidedSummary}
          </button>
        )}
      </div>
    </div>
  );
}
