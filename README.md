# AI Orchestrator Guide

A practice-oriented learning site for developer-orchestrators working with AI coding agents.

The MVP teaches judgment for typical AI coding tasks: choosing the authority layer, source of truth, workflow level, audit depth, quality gates, and next orchestrator action.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4 via global CSS

## Local Commands

```bash
pnpm dev
pnpm lint
pnpm build
```

Open the local app at `http://localhost:3000` when the dev server is running.

## Current MVP Scope

- Route-based learning site:
  - `/` overview and chapter map
  - `/chapters/[slug]` chapter pages
  - `/practice` cumulative practice scenarios
  - `/references` research anchors and advanced reading
- Fourteen chapter path based on the calibration artifact.
- Seven lightweight, data-driven interactives:
  - Self-check / reveal cards
  - Source-of-Truth Authority Matrix
  - Workflow Classifier
  - Agentic Loop Simulator
  - Local Learning Loop Wizard
  - Permission / Risk Gate Stress-Test
  - Practice Scenarios
- Typed content files in `src/content/`.
- Dark blue/slate chapter-based UI with desktop sidebar and mobile bottom navigation.

## Validation

Run before handing off implementation changes:

```bash
git status --short --branch
pnpm lint
pnpm build
git diff --check -- src/app src/components src/content docs README.md
```

Browser and visual QA are manual for this MVP. No Playwright or CI harness is currently part of the project.

## Manual MVP QA Checklist

- Overview route:
  - Chapter map is readable.
  - Copy does not describe unavailable planned chapter states.
  - Start, Practice, and References links work.
- Chapter routes:
  - Each chapter opens.
  - Each chapter has readable explanation, practice target, checkpoint, and adjacent previous/next navigation.
  - Source chips appear only near key external factual claims.
- Interactives:
  - Self-check / reveal cards expand and collapse.
  - Source-of-Truth Authority Matrix gives feedback after a choice.
  - Workflow Classifier gives feedback after a choice.
  - Agentic Loop Simulator trains continue / stop / zoom out decisions.
  - Local Learning Loop Wizard distinguishes session-local correction from durable workflow improvement.
  - Permission / Risk Gate Stress-Test pauses risky actions before damage or scope creep.
  - Practice Scenarios show all 8 MVP scenarios.
- Practice route:
  - `/practice` shows the cumulative capstone scenario set.
  - Feedback, consequence, correct move, related gates, and durable correction candidates are understandable.
- References route:
  - Core references, vendor docs, and advanced reading are separated.
  - Vendor behavior is framed as current-docs-needed, not universal behavior.
  - Loop Engineering remains advanced reading, not the MVP blueprint.
- Mobile:
  - Global bottom nav remains visible and touch-friendly.
  - Bottom nav does not cover content.
  - Inline previous/next chapter row is readable and not cramped.
- Desktop:
  - Sidebar navigation remains sticky and usable.
  - Reading width is comfortable.
  - Interactive cards do not feel like dashboard/admin UI.
- Wording:
  - Local Learning means durable workflow improvement, not model training.
  - The site uses authority layer / source of truth / validation language instead of belief framing.
  - Permission/risk wording teaches pause, explain risk, gate, approval, validation, stop, or zoom out.
  - Evals stay lightweight as a quality-gate concept.

## Deferred Scope

Deferred work includes source-backed research pass, richer progress persistence, scoring, full eval harness, framework/runtime demos, LangGraph implementation, Framer Motion, agent teams, hooks, subagents, worktrees, scheduled loops, and a full Ukrainian translation pass.
