import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { LearningCard } from "@/components/learning/LearningCard";
import { SourceList } from "@/components/learning/SourceChip";
import { getLocalizedContent, isLocale } from "@/content";
import { getChapterHref } from "@/lib/i18n/routing";

type ReferencesPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function ReferencesPage({ params }: ReferencesPageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const content = getLocalizedContent(localeParam);
  const { firstAvailableChapter, learningPath, references, ui } = content;

  return (
    <SiteShell
      bottomNavActive="refs"
      currentHref={getChapterHref(firstAvailableChapter, localeParam)}
      mobileContext={ui.references.mobileContext}
      chapters={learningPath}
      locale={localeParam}
      ui={ui}
    >
      <header className="hero">
        <p className="eyebrow">{ui.references.eyebrow}</p>
        <div className="hero__content">
          <div>
            <h1>{ui.references.title}</h1>
            <p>{ui.references.summary}</p>
          </div>
          <div className="progress-panel" aria-label={ui.references.progressLabel}>
            <strong>{ui.references.backlog}</strong>
            <span>{ui.references.validateLater}</span>
          </div>
        </div>
      </header>

      <LearningCard
        eyebrow={ui.references.sourcePolicyEyebrow}
        title={ui.references.sourcePolicyTitle}
      >
        <p>{ui.references.sourcePolicyBody}</p>
      </LearningCard>

      {ui.references.groups.map((group) => (
        <LearningCard
          eyebrow={group.eyebrow}
          key={group.category}
          title={group.title}
        >
          <p>{group.description}</p>
          <SourceList
            label={ui.learning.sourceListLabel}
            references={Object.values(references).filter(
              (reference) => reference.category === group.category,
            )}
          />
        </LearningCard>
      ))}
    </SiteShell>
  );
}

