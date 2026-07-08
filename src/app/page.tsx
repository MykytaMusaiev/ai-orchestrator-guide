import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { LearningCard } from "@/components/learning/LearningCard";
import {
  firstAvailableChapter,
  getChapterHref,
  learningPath,
} from "@/content/sections";

export default function Home() {
  return (
    <SiteShell
      bottomNavActive="chapters"
      currentHref={getChapterHref(firstAvailableChapter)}
      mobileContext="Overview"
      chapters={learningPath}
    >
      <header className="hero">
        <p className="eyebrow">Practice-oriented learning product</p>
        <div className="hero__content">
          <div>
            <h1>AI workflow orchestration for developer judgment</h1>
            <p>
              Learn to choose authority layers, workflow levels, audit depth,
              quality gates, and the next orchestrator action for AI coding tasks.
            </p>
          </div>
          <div className="progress-panel" aria-label="Current chapter progress">
            <strong>
              {learningPath.length} chapter path
            </strong>
            <span>Start with the first available chapter</span>
          </div>
        </div>
      </header>

      <LearningCard eyebrow="How to use it" title="Start focused, then expand">
        <p>
          This overview keeps the learning path compact. Open a chapter route to
          read, make the checkpoint decision, and try the lightweight practice
          tool attached to that chapter.
        </p>
        <div className="action-row">
          <Link className="primary-action" href={getChapterHref(firstAvailableChapter)}>
            Start learning
          </Link>
          <Link className="secondary-action" href="/practice">
            Practice
          </Link>
          <Link className="secondary-action" href="/references">
            References
          </Link>
        </div>
      </LearningCard>

      <section className="chapter-map" id="chapter-map" aria-labelledby="chapter-map-title">
        <div>
          <p className="eyebrow">MVP path</p>
          <h2 id="chapter-map-title">Chapter map</h2>
          <p>
            Each item opens a chapter route with learning content, a decision
            checkpoint, and practice focused on one orchestrator skill.
          </p>
        </div>
        <div className="chapter-map__grid">
          {learningPath.map((navItem) => (
            <Link
              className={`chapter-map__item chapter-map__item--${navItem.status}`}
              href={getChapterHref(navItem)}
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
