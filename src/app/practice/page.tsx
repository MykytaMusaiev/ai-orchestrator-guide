import { SiteShell } from "@/components/layout/SiteShell";
import { PracticeScenarios } from "@/components/interactives/PracticeScenarios";
import { LearningCard } from "@/components/learning/LearningCard";
import { practiceScenarios } from "@/content/scenarios";
import {
  firstAvailableChapter,
  getChapterHref,
  learningPath,
} from "@/content/sections";

export default function PracticePage() {
  return (
    <SiteShell
      bottomNavActive="practice"
      currentHref={getChapterHref(firstAvailableChapter)}
      mobileContext="Practice"
      chapters={learningPath}
    >
      <header className="hero">
        <p className="eyebrow">Practice scenarios</p>
        <div className="hero__content">
          <div>
            <h1>Practice scenarios</h1>
            <p>
              Use the eight MVP scenarios to practice mixed orchestrator
              judgment across authority, workflow level, audit depth, gates,
              and durable correction.
            </p>
          </div>
          <div className="progress-panel" aria-label="Route status">
            <strong>8 scenarios</strong>
            <span>Cumulative capstone</span>
          </div>
        </div>
      </header>

      <LearningCard eyebrow="How to use it" title="Choose before revealing feedback">
        <p>
          Each scenario asks for a concrete orchestrator move. Pick the action,
          read the consequence, then compare against the durable correction
          candidate.
        </p>
      </LearningCard>

      <PracticeScenarios scenarios={practiceScenarios} />
    </SiteShell>
  );
}
