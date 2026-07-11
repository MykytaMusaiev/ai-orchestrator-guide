"use client";

import { useEffect, useId, useRef, useState } from "react";
import type {
  AgenticLoopCase,
  GateId,
  Locale,
  UiDictionary,
} from "@/content";

type AgenticLoopSimulatorProps = {
  cases: readonly AgenticLoopCase[];
  gateTitles: Record<GateId, string>;
  locale: Locale;
  ui: UiDictionary["interactives"];
};

export function AgenticLoopSimulator({
  cases,
  ui,
}: AgenticLoopSimulatorProps) {
  const headingId = useId();
  const choiceGroupId = useId();
  const nodeHeadingRef = useRef<HTMLHeadingElement>(null);
  const feedbackHeadingRef = useRef<HTMLHeadingElement>(null);
  const pendingFocusRef = useRef<"node" | "feedback" | null>(null);
  const [caseId, setCaseId] = useState(cases[0]?.id ?? "");
  const activeCase = cases.find((item) => item.id === caseId) ?? cases[0];
  const [nodeId, setNodeId] = useState(activeCase?.entryNodeId ?? "");
  const [choiceId, setChoiceId] = useState<string | null>(null);
  const node = activeCase?.nodes.find((item) => item.id === nodeId);
  const selectedChoice = node?.choices.find((choice) => choice.id === choiceId);

  useEffect(() => {
    if (pendingFocusRef.current === "feedback") {
      feedbackHeadingRef.current?.focus();
    }

    if (pendingFocusRef.current === "node") {
      nodeHeadingRef.current?.focus();
    }

    pendingFocusRef.current = null;
  }, [caseId, choiceId, nodeId]);

  if (!activeCase || !node) {
    return null;
  }

  function selectCase(nextCase: AgenticLoopCase) {
    setCaseId(nextCase.id);
    setNodeId(nextCase.entryNodeId);
    setChoiceId(null);
    pendingFocusRef.current = "node";
  }

  function reset() {
    setNodeId(activeCase.entryNodeId);
    setChoiceId(null);
    pendingFocusRef.current = "node";
  }

  return (
    <section className="interactive" aria-labelledby={headingId}>
      <div className="interactive__header">
        <p className="eyebrow">{ui.eyebrow}</p>
        <h2 id={headingId}>{ui.agenticLoopTitle}</h2>
        <p>{ui.agenticLoopIntro}</p>
      </div>

      <div className="interactive__tabs" aria-label={ui.scenariosLabel}>
        {cases.map((item) => (
          <button
            aria-pressed={item.id === activeCase.id}
            key={item.id}
            onClick={() => selectCase(item)}
            type="button"
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="interactive__panel">
        <div className="assessment-progress">
          <span>
            {ui.loopStage} {activeCase.nodes.findIndex((item) => item.id === node.id) + 1}{" "}
            {ui.of} {activeCase.nodes.length}
          </span>
        </div>
        <div className="interactive__situation">
          <h3 ref={nodeHeadingRef} tabIndex={-1}>{node.title}</h3>
          <p>{node.situation}</p>
          <div className="evidence-block">
            <h4>{ui.evidence}</h4>
            <ul>
              {node.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {!selectedChoice ? (
          <div aria-labelledby={choiceGroupId} className="choice-grid" role="group">
            <p className="sr-only" id={choiceGroupId}>
              {ui.choiceInstruction}
            </p>
            {node.choices.map((choice) => (
              <button
                className="choice-button"
                key={choice.id}
                onClick={() => {
                  setChoiceId(choice.id);
                  pendingFocusRef.current = "feedback";
                }}
                type="button"
              >
                {choice.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="feedback-panel">
            <h4 ref={feedbackHeadingRef} tabIndex={-1}>{ui.loopFeedback}</h4>
            <p>{selectedChoice.feedback}</p>
            {selectedChoice.outcome ? (
              <p className="loop-outcome">
                <strong>{ui.loopOutcome}</strong>{" "}
                {ui.loopOutcomes[selectedChoice.outcome]}
              </p>
            ) : null}
            <div className="assessment-actions">
              {selectedChoice.nextNodeId ? (
                <button
                  className="assessment-primary"
                  onClick={() => {
                    setNodeId(selectedChoice.nextNodeId ?? activeCase.entryNodeId);
                    setChoiceId(null);
                    pendingFocusRef.current = "node";
                  }}
                  type="button"
                >
                  {ui.loopContinue}
                </button>
              ) : null}
              <button className="assessment-secondary" onClick={reset} type="button">
                {ui.reset}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
