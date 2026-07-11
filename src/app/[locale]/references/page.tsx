import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { LearningCard } from "@/components/learning/LearningCard";
import { SourceList } from "@/components/learning/SourceChip";
import { getLocalizedContent, isLocale } from "@/content";
import {
  getChapterHref,
  getChapterSectionHref,
  getPracticeHref,
} from "@/lib/i18n/routing";

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

      <LearningCard
        eyebrow={ui.references.operationalEyebrow}
        id="operational-index"
        title={ui.references.operationalTitle}
      >
        <p>{ui.references.operationalBody}</p>
        <div className="reference-index">
          <article className="reference-index__item">
            <h3>{ui.references.actionsTitle}</h3>
            <p>{ui.references.actionsBody}</p>
            <div className="concept-row">
              <Link
                href={getChapterSectionHref(
                  "agentic-loop",
                  "loop-shape",
                  localeParam,
                )}
              >
                {ui.references.loopDecisionsLink}
              </Link>
              <Link
                href={getChapterSectionHref(
                  "zoom-out",
                  "zoom-signals",
                  localeParam,
                )}
              >
                {ui.references.zoomOutLink}
              </Link>
            </div>
          </article>

          <article className="reference-index__item">
            <h3>{ui.references.gatesTitle}</h3>
            <p>{ui.references.gatesBody}</p>
            <div className="concept-row">
              {content.gates.map((gate) => (
                <Link
                  href={getChapterSectionHref(
                    "quality-gates",
                    `gate-${gate.id}`,
                    localeParam,
                  )}
                  key={gate.id}
                >
                  {gate.title}
                </Link>
              ))}
            </div>
          </article>

          <article className="reference-index__item">
            <h3>{ui.references.patternsTitle}</h3>
            <p>{ui.references.patternsBody}</p>
            <div className="concept-row">
              {content.workflowPatterns.map((pattern) => (
                <Link
                  href={getChapterSectionHref(
                    "core-workflow-patterns",
                    `pattern-${pattern.id}`,
                    localeParam,
                  )}
                  key={pattern.id}
                >
                  {pattern.title}
                </Link>
              ))}
            </div>
          </article>

          <article className="reference-index__item">
            <h3>{ui.references.checklistTitle}</h3>
            <p>{ui.references.checklistBody}</p>
            <div className="concept-row">
              <Link
                href={getChapterSectionHref(
                  "operating-checklist",
                  "checklist",
                  localeParam,
                )}
              >
                {ui.references.checklistLink}
              </Link>
            </div>
          </article>

          <article className="reference-index__item">
            <h3>{ui.references.practiceTitle}</h3>
            <p>{ui.references.practiceBody}</p>
            <div className="concept-row">
              <Link
                href={getChapterSectionHref(
                  "practice-scenarios",
                  "capstone",
                  localeParam,
                )}
              >
                {ui.references.guidedPracticeLink}
              </Link>
              <Link href={getPracticeHref(localeParam)}>
                {ui.references.directPracticeLink}
              </Link>
            </div>
          </article>
        </div>
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
            lifecycleUi={ui.references.sourceLifecycle}
            references={Object.values(references).filter(
              (reference) => reference.category === group.category,
            )}
          />
        </LearningCard>
      ))}
    </SiteShell>
  );
}
