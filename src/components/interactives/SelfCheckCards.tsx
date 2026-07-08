"use client";

import { useState } from "react";
import { getGateTitle } from "@/content/gates";
import type { SelfCheckCard } from "@/content/scenarios";

type SelfCheckCardsProps = {
  cards: readonly SelfCheckCard[];
};

export function SelfCheckCards({ cards }: SelfCheckCardsProps) {
  const [openId, setOpenId] = useState<string | null>(cards[0]?.id ?? null);

  return (
    <section className="interactive" aria-labelledby="self-check-title">
      <div className="interactive__header">
        <p className="eyebrow">Interactive</p>
        <h2 id="self-check-title">Self-check / reveal cards</h2>
        <p>
          Use these quick checks to distinguish plausible answers, evidence, and
          durable workflow improvement.
        </p>
      </div>
      <div className="reveal-card-list">
        {cards.map((card) => {
          const isOpen = card.id === openId;
          const answerId = `${card.id}-answer`;

          return (
            <article className="reveal-card" key={card.id}>
              <button
                aria-controls={answerId}
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : card.id)}
                type="button"
              >
                {card.prompt}
              </button>
              {isOpen ? (
                <div className="reveal-card__answer" id={answerId}>
                  <h3>{card.revealTitle}</h3>
                  <p>{card.reveal}</p>
                  {card.relatedGates?.length ? (
                    <div className="concept-row" aria-label="Related gates">
                      {card.relatedGates.map((gateId) => (
                        <span key={gateId}>{getGateTitle(gateId)}</span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
