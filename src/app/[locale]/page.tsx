import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { LearningCard } from "@/components/learning/LearningCard";
import { getLocalizedContent, isLocale } from "@/content";
import { getChapterHref, getPracticeHref, getReferencesHref } from "@/lib/i18n/routing";

type HomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const content = getLocalizedContent(localeParam);
  const { firstAvailableChapter, learningPath, ui } = content;

  return (
    <SiteShell
      bottomNavActive="chapters"
      currentHref={getChapterHref(firstAvailableChapter, localeParam)}
      mobileContext={ui.home.mobileContext}
      chapters={learningPath}
      locale={localeParam}
      ui={ui}
    >
      <header className="hero">
        <p className="eyebrow">{ui.home.eyebrow}</p>
        <div className="hero__content">
          <div>
            <h1>{ui.home.title}</h1>
            <p>{ui.home.summary}</p>
          </div>
          <div className="progress-panel" aria-label={ui.home.progressLabel}>
            <strong>{ui.home.chapterPath(learningPath.length)}</strong>
            <span>{ui.home.startPrompt}</span>
          </div>
        </div>
      </header>

      <LearningCard eyebrow={ui.home.howToEyebrow} title={ui.home.howToTitle}>
        <p>{ui.home.howToBody}</p>
        <div className="action-row">
          <Link
            className="primary-action"
            href={getChapterHref(firstAvailableChapter, localeParam)}
          >
            {ui.home.startLearning}
          </Link>
          <Link className="secondary-action" href={getPracticeHref(localeParam)}>
            {ui.home.practice}
          </Link>
          <Link className="secondary-action" href={getReferencesHref(localeParam)}>
            {ui.home.references}
          </Link>
        </div>
      </LearningCard>

      <section className="chapter-map" id="chapter-map" aria-labelledby="chapter-map-title">
        <div>
          <p className="eyebrow">{ui.home.mapEyebrow}</p>
          <h2 id="chapter-map-title">{ui.home.mapTitle}</h2>
          <p>{ui.home.mapBody}</p>
        </div>
        <div className="chapter-map__grid">
          {learningPath.map((navItem) => (
            <Link
              className={`chapter-map__item chapter-map__item--${navItem.status}`}
              href={getChapterHref(navItem, localeParam)}
              key={navItem.id}
            >
              <span>{navItem.label}</span>
              <strong>{navItem.title}</strong>
              <small>{navItem.status}</small>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
