import type { LearningSection, ReferenceId, Reference } from "@/content";
import { SourceChip } from "./SourceChip";

type SectionBlockProps = {
  section: LearningSection;
  references: Record<ReferenceId, Reference>;
  sourceAnchorsLabel: string;
};

export function SectionBlock({
  section,
  references,
  sourceAnchorsLabel,
}: SectionBlockProps) {
  return (
    <section className="chapter-section" id={section.id}>
      <div className="chapter-section__header">
        <p className="eyebrow">{section.eyebrow}</p>
        <h2>{section.title}</h2>
        <p className="section-summary">{section.summary}</p>
        {section.sourceRefs ? (
          <div className="source-row" aria-label={sourceAnchorsLabel}>
            {section.sourceRefs.map((sourceId) => (
              <SourceChip key={sourceId} reference={references[sourceId]} />
            ))}
          </div>
        ) : null}
      </div>
      <div className="chapter-section__body">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
