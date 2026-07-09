import type { Reference } from "@/content";

type SourceChipProps = {
  reference: Reference;
};

type SourceListProps = {
  references: readonly Reference[];
  label: string;
};

export function SourceChip({ reference }: SourceChipProps) {
  return (
    <a
      className="source-chip"
      href={reference.url}
      rel="noreferrer"
      target="_blank"
      title={reference.title}
    >
      {reference.label}
    </a>
  );
}

export function SourceList({ references, label }: SourceListProps) {
  return (
    <div className="source-list" aria-label={label}>
      {references.map((reference) => (
        <article className="source-list__item" key={reference.id}>
          <div>
            <SourceChip reference={reference} />
            <p>{reference.note}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
