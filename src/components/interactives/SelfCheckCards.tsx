"use client";

import { useState } from "react";
import Link from "next/link";
import type { GateId, Locale, SelfCheckCard, UiDictionary } from "@/content";
import { getChapterSectionHref } from "@/lib/i18n/routing";

type SelfCheckCardsProps = {
  cards: readonly SelfCheckCard[];
  gateTitles: Record<GateId, string>;
  locale: Locale;
  ui: UiDictionary["interactives"];
};

export function SelfCheckCards({ cards, gateTitles, locale, ui }: SelfCheckCardsProps) {
  const [openId, setOpenId] = useState<string | null>(cards[0]?.id ?? null);

  return (
    <section className="interactive" aria-labelledby="self-check-title">
      <div className="interactive__header">
        <p className="eyebrow">{ui.eyebrow}</p>
        <h2 id="self-check-title">{ui.selfCheckTitle}</h2>
        <p>{ui.selfCheckIntro}</p>
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
                    <div className="concept-row" aria-label={ui.relatedGates}>
                      {card.relatedGates.map((gateId) => (
                        <Link
                          href={getChapterSectionHref(
                            "quality-gates",
                            `gate-${gateId}`,
                            locale,
                          )}
                          key={gateId}
                        >
                          {gateTitles[gateId]}
                        </Link>
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
