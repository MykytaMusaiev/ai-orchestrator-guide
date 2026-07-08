import type { ReactNode } from "react";

type LearningCardProps = {
  eyebrow?: string;
  id?: string;
  title: string;
  children: ReactNode;
  tone?: "default" | "checkpoint";
};

export function LearningCard({
  eyebrow,
  id,
  title,
  children,
  tone = "default",
}: LearningCardProps) {
  return (
    <section className={`learning-card learning-card--${tone}`} id={id}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      <div className="learning-card__body">{children}</div>
    </section>
  );
}
