import type { Reference, UiDictionary } from "@/content";

type SourceChipProps = {
  reference: Reference;
};

type SourceListProps = {
  references: readonly Reference[];
  label: string;
  lifecycleUi?: UiDictionary["references"]["sourceLifecycle"];
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

export function SourceList({ references, label, lifecycleUi }: SourceListProps) {
  return (
    <div className="source-list" aria-label={label}>
      {references.map((reference) => (
        <article className="source-list__item" key={reference.id}>
          <div>
            <SourceChip reference={reference} />
            <p>{reference.note}</p>
            {lifecycleUi ? (
              <dl className="source-lifecycle">
                <div>
                  <dt>{lifecycleUi.scopeLabel}</dt>
                  <dd>{reference.scope}</dd>
                </div>
                <div>
                  <dt>{lifecycleUi.verifiedLabel}</dt>
                  <dd>{reference.verifiedAt}</dd>
                </div>
                <div>
                  <dt>{lifecycleUi.volatilityLabel}</dt>
                  <dd>{lifecycleUi.volatilityLabels[reference.volatility]}</dd>
                </div>
                {reference.vendorScope ? (
                  <div>
                    <dt>{lifecycleUi.vendorScopeLabel}</dt>
                    <dd>{reference.vendorScope}</dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
