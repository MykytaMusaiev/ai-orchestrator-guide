import Link from "next/link";
import { notFound } from "next/navigation";
import { AgenticLoopSimulator } from "@/components/interactives/AgenticLoopSimulator";
import { AuthorityMatrix } from "@/components/interactives/AuthorityMatrix";
import { LocalLearningWizard } from "@/components/interactives/LocalLearningWizard";
import { PermissionRiskStressTest } from "@/components/interactives/PermissionRiskStressTest";
import { PracticeScenarios } from "@/components/interactives/PracticeScenarios";
import { SelfCheckCards } from "@/components/interactives/SelfCheckCards";
import { WorkflowClassifier } from "@/components/interactives/WorkflowClassifier";
import { SiteShell } from "@/components/layout/SiteShell";
import { LearningCard } from "@/components/learning/LearningCard";
import { RevealBlock } from "@/components/learning/RevealBlock";
import { SectionBlock } from "@/components/learning/SectionBlock";
import { SourceList } from "@/components/learning/SourceChip";
import {
  getLocalizedContent,
  isLocale,
  supportedLocales,
  type GateId,
  type InteractiveKey,
} from "@/content";
import {
  getChapterHref,
  getLocaleRootHref,
  getPracticeHref,
} from "@/lib/i18n/routing";

type ChapterPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) => {
    const { learningPath } = getLocalizedContent(locale);

    return learningPath.map((chapter) => ({
      locale,
      slug: chapter.slug,
    }));
  });
}

function getAdjacentChapters(slug: string, learningPath: ReturnType<typeof getLocalizedContent>["learningPath"]) {
  const index = learningPath.findIndex((chapter) => chapter.slug === slug);

  return {
    previous: index > 0 ? learningPath[index - 1] : undefined,
    next: index >= 0 && index < learningPath.length - 1 ? learningPath[index + 1] : undefined,
  };
}

function renderInteractive(
  interactive: InteractiveKey | undefined,
  content: ReturnType<typeof getLocalizedContent>,
) {
  const gateTitles = Object.fromEntries(
    content.gates.map((gate) => [gate.id, gate.title]),
  ) as Record<GateId, string>;
  const interactiveUi = content.ui.interactives;

  switch (interactive) {
    case "authority-matrix":
      return (
        <AuthorityMatrix
          cases={content.authorityMatrixCases}
          gateTitles={gateTitles}
          locale={content.locale}
          ui={interactiveUi}
        />
      );
    case "workflow-classifier":
      return (
        <WorkflowClassifier
          cases={content.workflowClassifierCases}
          gateTitles={gateTitles}
          locale={content.locale}
          patterns={content.workflowPatterns}
          ui={interactiveUi}
        />
      );
    case "agentic-loop":
      return (
        <AgenticLoopSimulator
          cases={content.agenticLoopCases}
          gateTitles={gateTitles}
          locale={content.locale}
          ui={interactiveUi}
        />
      );
    case "local-learning":
      return (
        <LocalLearningWizard
          cases={content.localLearningCases}
          gateTitles={gateTitles}
          locale={content.locale}
          ui={interactiveUi}
        />
      );
    case "permission-risk":
      return (
        <PermissionRiskStressTest
          cases={content.permissionRiskCases}
          gateTitles={gateTitles}
          locale={content.locale}
          ui={interactiveUi}
        />
      );
    case "practice-scenarios":
      return (
        <PracticeScenarios
          scenarios={content.practiceScenarios}
          gateTitles={gateTitles}
          locale={content.locale}
          mode="guided"
          ui={interactiveUi}
        />
      );
    case "self-check":
      return (
        <SelfCheckCards
          cards={content.selfCheckCards}
          gateTitles={gateTitles}
          locale={content.locale}
          ui={interactiveUi}
        />
      );
    default:
      return null;
  }
}

function renderChapterDataBlocks(
  slug: string,
  content: ReturnType<typeof getLocalizedContent>,
) {
  const { ui } = content;

  if (slug === "core-workflow-patterns") {
    return (
      <LearningCard eyebrow={ui.chapter.patternSetEyebrow} title={ui.chapter.patternSetTitle}>
        <div className="data-list">
          {content.workflowPatterns.map((pattern) => (
            <article className="data-item" id={`pattern-${pattern.id}`} key={pattern.id}>
              <h3>{pattern.title}</h3>
              <p>{pattern.means}</p>
              <dl>
                <div>
                  <dt>{ui.chapter.useWhen}</dt>
                  <dd>{pattern.useWhen}</dd>
                </div>
                <div>
                  <dt>{ui.chapter.avoidWhen}</dt>
                  <dd>{pattern.avoidWhen}</dd>
                </div>
                <div>
                  <dt>{ui.chapter.risk}</dt>
                  <dd>{pattern.orchestratorRisk}</dd>
                </div>
                <div>
                  <dt>{ui.chapter.example}</dt>
                  <dd>{pattern.codingExample}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </LearningCard>
    );
  }

  if (slug === "quality-gates") {
    return (
      <LearningCard eyebrow={ui.chapter.gateSetEyebrow} title={ui.chapter.gateSetTitle}>
        <div className="data-list">
          {content.gates.map((gate) => (
            <article className="data-item" id={`gate-${gate.id}`} key={gate.id}>
              <h3>{gate.title}</h3>
              <p>{gate.purpose}</p>
              <dl>
                <div>
                  <dt>{ui.chapter.useWhen}</dt>
                  <dd>{gate.useWhen}</dd>
                </div>
                <div>
                  <dt>{ui.chapter.watchOut}</dt>
                  <dd>{gate.watchOut}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </LearningCard>
    );
  }

  return null;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const content = getLocalizedContent(localeParam);
  const { learningPath, ui } = content;
  const navChapter = learningPath.find((chapter) => chapter.slug === slug);

  if (!navChapter) {
    notFound();
  }

  const chapter = content.learningChapters.find((item) => item.slug === slug);

  if (!chapter) {
    notFound();
  }

  const adjacent = getAdjacentChapters(slug, learningPath);
  const previousHref = adjacent.previous
    ? getChapterHref(adjacent.previous, localeParam)
    : getLocaleRootHref(localeParam);
  const previousAction = adjacent.previous ? ui.navigation.previous : ui.layout.overview;
  const previousTitle = adjacent.previous?.title ?? ui.navigation.chapterMap;
  const nextHref = adjacent.next
    ? getChapterHref(adjacent.next, localeParam)
    : getPracticeHref(localeParam);
  const nextAction = ui.navigation.next;
  const nextTitle = adjacent.next?.title ?? ui.navigation.practiceScenarios;
  const chapterReferences = chapter.sourceRefs.map(
    (sourceId) => content.references[sourceId],
  );

  return (
    <SiteShell
      activeChapterId={chapter.id}
      bottomNavActive="continue"
      chapter={chapter}
      mobileContext={ui.chapter.mobileContext(chapter.order)}
      chapters={learningPath}
      locale={localeParam}
      ui={ui}
    >
      <header className="hero">
        <p className="eyebrow">{chapter.eyebrow}</p>
        <div className="hero__content">
          <div>
            <h1>{chapter.title}</h1>
            <p>{chapter.summary}</p>
          </div>
          <div className="progress-panel" aria-label={ui.chapter.progressLabel}>
            <strong>{ui.chapter.progressText(chapter.order, chapter.totalChapters)}</strong>
            <span>{chapter.status}</span>
          </div>
        </div>
      </header>

      <LearningCard
        eyebrow={ui.chapter.practiceTargetEyebrow}
        title={ui.chapter.practiceTargetTitle}
      >
        <ul className="practice-list">
          {chapter.practices.map((practice) => (
            <li key={practice}>{practice}</li>
          ))}
        </ul>
      </LearningCard>

      {chapter.sections.map((section) => (
        <SectionBlock
          key={section.id}
          references={content.references}
          section={section}
          sourceAnchorsLabel={ui.learning.sourceAnchors}
        />
      ))}

      <RevealBlock checkpoint={chapter.checkpoint} locale={localeParam} ui={ui.learning} />

      {renderChapterDataBlocks(chapter.slug, content)}

      {renderInteractive(chapter.interactive, content)}

      {chapterReferences.length ? (
        <LearningCard
          eyebrow={ui.chapter.sourceNotesEyebrow}
          id="references-summary"
          title={ui.chapter.sourceNotesTitle}
        >
          <p>{ui.chapter.sourceNotesBody}</p>
          <SourceList references={chapterReferences} label={ui.learning.sourceListLabel} />
        </LearningCard>
      ) : null}

      <nav className="route-nav" aria-label={ui.chapter.adjacentLabel}>
        <Link className="route-nav__previous" href={previousHref}>
          <span className="route-nav__action">{previousAction}</span>
          <span className="route-nav__title">{previousTitle}</span>
        </Link>
        <Link className="route-nav__next" href={nextHref}>
          <span className="route-nav__action">{nextAction}</span>
          <span className="route-nav__title">{nextTitle}</span>
        </Link>
      </nav>
    </SiteShell>
  );
}
