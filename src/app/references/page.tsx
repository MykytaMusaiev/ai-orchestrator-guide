import { SiteShell } from "@/components/layout/SiteShell";
import { LearningCard } from "@/components/learning/LearningCard";
import { SourceList } from "@/components/learning/SourceChip";
import { references } from "@/content/references";
import {
  firstAvailableChapter,
  getChapterHref,
  learningPath,
} from "@/content/sections";

const referenceGroups = [
  {
    category: "core",
    eyebrow: "Core references",
    title: "Workflow and agent concepts",
    description:
      "Use these anchors for later validation of workflow patterns, agent loops, HITL, and evals.",
  },
  {
    category: "vendor-docs",
    eyebrow: "Vendor docs",
    title: "Current product behavior",
    description:
      "Check current official docs before making concrete claims about sandboxing, approvals, permissions, or tool behavior.",
  },
  {
    category: "advanced",
    eyebrow: "Advanced reading",
    title: "Next-layer concepts",
    description:
      "Keep these as optional reading. They should not become the MVP blueprint.",
  },
] as const;

export default function ReferencesPage() {
  return (
    <SiteShell
      bottomNavActive="refs"
      currentHref={getChapterHref(firstAvailableChapter)}
      mobileContext="References"
      chapters={learningPath}
    >
      <header className="hero">
        <p className="eyebrow">References / advanced reading</p>
        <div className="hero__content">
          <div>
            <h1>References and advanced reading</h1>
            <p>
              Research anchors for later source-backed validation of external
              claims about agents, workflows, tools, HITL, evals, and permissions.
            </p>
          </div>
          <div className="progress-panel" aria-label="Route status">
            <strong>Research backlog</strong>
            <span>Validate current claims later</span>
          </div>
        </div>
      </header>

      <LearningCard eyebrow="Source policy" title="Use sources for external claims">
        <p>
          Product decisions come from the calibration artifact. External factual
          claims need source-backed anchors, and concrete vendor behavior needs
          current official docs at the time of a research pass.
        </p>
      </LearningCard>

      {referenceGroups.map((group) => (
        <LearningCard
          eyebrow={group.eyebrow}
          key={group.category}
          title={group.title}
        >
          <p>{group.description}</p>
          <SourceList
            references={Object.values(references).filter(
              (reference) => reference.category === group.category,
            )}
          />
        </LearningCard>
      ))}
    </SiteShell>
  );
}
