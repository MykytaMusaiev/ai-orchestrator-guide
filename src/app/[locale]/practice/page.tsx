import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { PracticeScenarios } from "@/components/interactives/PracticeScenarios";
import { LearningCard } from "@/components/learning/LearningCard";
import { getLocalizedContent, isLocale, type GateId } from "@/content";
import { getChapterHref } from "@/lib/i18n/routing";

type PracticePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function PracticePage({ params }: PracticePageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const content = getLocalizedContent(localeParam);
  const { firstAvailableChapter, learningPath, ui } = content;
  const gateTitles = Object.fromEntries(
    content.gates.map((gate) => [gate.id, gate.title]),
  ) as Record<GateId, string>;

  return (
    <SiteShell
      bottomNavActive="practice"
      currentHref={getChapterHref(firstAvailableChapter, localeParam)}
      mobileContext={ui.practice.mobileContext}
      chapters={learningPath}
      locale={localeParam}
      ui={ui}
    >
      <header className="hero">
        <p className="eyebrow">{ui.practice.eyebrow}</p>
        <div className="hero__content">
          <div>
            <h1>{ui.practice.title}</h1>
            <p>{ui.practice.summary}</p>
          </div>
          <div className="progress-panel" aria-label={ui.practice.progressLabel}>
            <strong>{ui.practice.scenarioCount}</strong>
            <span>{ui.practice.capstone}</span>
          </div>
        </div>
      </header>

      <LearningCard eyebrow={ui.practice.howToEyebrow} title={ui.practice.howToTitle}>
        <p>{ui.practice.howToBody}</p>
      </LearningCard>

      <PracticeScenarios
        scenarios={content.practiceScenarios}
        gateTitles={gateTitles}
        ui={ui.interactives}
      />
    </SiteShell>
  );
}
