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
import { gates } from "@/content/gates";
import { workflowPatterns } from "@/content/patterns";
import { references } from "@/content/references";
import {
  agenticLoopCases,
  authorityMatrixCases,
  localLearningCases,
  permissionRiskCases,
  practiceScenarios,
  selfCheckCards,
  workflowClassifierCases,
} from "@/content/scenarios";
import {
  getAdjacentChapters,
  getChapterHref,
  getChapterNavBySlug,
  getLearningChapterBySlug,
  learningPath,
  type InteractiveKey,
} from "@/content/sections";

type ChapterPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return learningPath.map((chapter) => ({
    slug: chapter.slug,
  }));
}

function renderInteractive(interactive: InteractiveKey | undefined) {
  switch (interactive) {
    case "authority-matrix":
      return <AuthorityMatrix cases={authorityMatrixCases} />;
    case "workflow-classifier":
      return <WorkflowClassifier cases={workflowClassifierCases} />;
    case "agentic-loop":
      return <AgenticLoopSimulator cases={agenticLoopCases} />;
    case "local-learning":
      return <LocalLearningWizard cases={localLearningCases} />;
    case "permission-risk":
      return <PermissionRiskStressTest cases={permissionRiskCases} />;
    case "practice-scenarios":
      return <PracticeScenarios scenarios={practiceScenarios} />;
    case "self-check":
      return <SelfCheckCards cards={selfCheckCards} />;
    default:
      return null;
  }
}

function renderChapterDataBlocks(slug: string) {
  if (slug === "core-workflow-patterns") {
    return (
      <LearningCard eyebrow="Pattern set" title="Six workflow patterns">
        <div className="data-list">
          {workflowPatterns.map((pattern) => (
            <article className="data-item" key={pattern.id}>
              <h3>{pattern.title}</h3>
              <p>{pattern.means}</p>
              <dl>
                <div>
                  <dt>Use when</dt>
                  <dd>{pattern.useWhen}</dd>
                </div>
                <div>
                  <dt>Avoid when</dt>
                  <dd>{pattern.avoidWhen}</dd>
                </div>
                <div>
                  <dt>Risk</dt>
                  <dd>{pattern.orchestratorRisk}</dd>
                </div>
                <div>
                  <dt>Example</dt>
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
      <LearningCard eyebrow="Gate set" title="Seven quality gates">
        <div className="data-list">
          {gates.map((gate) => (
            <article className="data-item" key={gate.id}>
              <h3>{gate.title}</h3>
              <p>{gate.purpose}</p>
              <dl>
                <div>
                  <dt>Use when</dt>
                  <dd>{gate.useWhen}</dd>
                </div>
                <div>
                  <dt>Watch out</dt>
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
  const { slug } = await params;
  const navChapter = getChapterNavBySlug(slug);

  if (!navChapter) {
    notFound();
  }

  const chapter = getLearningChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  const adjacent = getAdjacentChapters(slug);
  const previousHref = adjacent.previous ? getChapterHref(adjacent.previous) : "/";
  const previousAction = adjacent.previous ? "Previous" : "Overview";
  const previousTitle = adjacent.previous?.title ?? "Chapter map";
  const nextHref = adjacent.next ? getChapterHref(adjacent.next) : "/practice";
  const nextAction = adjacent.next ? "Next" : "Next";
  const nextTitle = adjacent.next?.title ?? "Practice scenarios";
  const chapterReferences = chapter.sourceRefs.map(
    (sourceId) => references[sourceId],
  );

  return (
    <SiteShell
      activeChapterId={chapter.id}
      bottomNavActive="continue"
      chapter={chapter}
      mobileContext={`Chapter ${chapter.order}`}
      chapters={learningPath}
    >
      <header className="hero">
        <p className="eyebrow">{chapter.eyebrow}</p>
        <div className="hero__content">
          <div>
            <h1>{chapter.title}</h1>
            <p>{chapter.summary}</p>
          </div>
          <div className="progress-panel" aria-label="Current chapter progress">
            <strong>
              Chapter {chapter.order} / {chapter.totalChapters}
            </strong>
            <span>{chapter.status}</span>
          </div>
        </div>
      </header>

      <LearningCard eyebrow="Practice target" title="What this chapter trains">
        <ul className="practice-list">
          {chapter.practices.map((practice) => (
            <li key={practice}>{practice}</li>
          ))}
        </ul>
      </LearningCard>

      {chapter.sections.map((section) => (
        <SectionBlock key={section.id} section={section} />
      ))}

      <RevealBlock checkpoint={chapter.checkpoint} />

      {renderChapterDataBlocks(chapter.slug)}

      {renderInteractive(chapter.interactive)}

      {chapterReferences.length ? (
        <LearningCard
          eyebrow="Source notes"
          id="references-summary"
          title="Research anchors for this slice"
        >
          <p>
            These are lightweight anchors for later source-backed validation.
            They are attached to external factual claims, not product decisions.
          </p>
          <SourceList references={chapterReferences} />
        </LearningCard>
      ) : null}

      <nav className="route-nav" aria-label="Adjacent chapters">
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
