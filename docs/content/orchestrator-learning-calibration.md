# Orchestrator Learning Calibration

This document captures the confirmed shared understanding for the future AI workflow orchestration learning site. It is not a raw chat log. It is the local calibration artifact for future content, UX, and implementation work.

## Product Positioning

The site is a `practice-oriented learning product` for a developer-orchestrator.

It is not just an article and not just a reference guide. Explanations should immediately lead into training `orchestrator judgment`: source-of-truth decisions, audit depth, agentic loop stop/continue decisions, durable corrections, quality gates, and zoom-out thinking.

Reference behavior may exist, but it is secondary for the MVP.

## Learner Profile

The learner is not an absolute beginner.

The target learner is a developer who already works with:

- repo-based development;
- Git;
- validation;
- AI coding agents;
- task workflow.

The learner wants to systematically improve `orchestrator judgment`.

The MVP should include a short practical introduction to AI/LLM basics, but only at the level needed to explain why `context`, `source of truth`, plausible pattern completion, `validation`, and `quality gates` matter. The course should not teach Git, React, Next.js, or repo basics from scratch.

## Done-Learning Criteria

After completing the MVP, the learner should be able to take a typical AI coding task and independently, with a short explanation, choose:

- the correct `authority layer`;
- the appropriate `workflow level`;
- the needed `audit depth`;
- the necessary `quality gates`;
- the next orchestrator action: `continue`, `stop`, `zoom out`, `ask human`, or `propose durable correction`.

The learner should also be able to explain why that workflow level, those gates, and that next action fit the situation.

## Legacy Guide Role

The legacy file at `legacy/ai_under_the_hood_for_orchestrators_interactive.html` is `source material + prior exploration`.

It is not a blueprint for the final site.

Use it for:

- strong concepts;
- practice scenario seeds;
- interactive ideas;
- reference anchors;
- prior wording that can be improved.

Do not copy its information architecture, wording, visual structure, or layout as mandatory. Future work may reorder material, rewrite unclear language, split complex sections into smaller learning steps, and convert legacy blocks into practice scenarios or reusable interactives.

## Required Wording Fixes

Replace the frame "orchestrator should believe or not believe AI" with a procedural model:

`orchestrator determines the right authority layer for this type of question, then validates against the relevant source of truth`.

Ukrainian meaning: the orchestrator does not "believe" or "not believe" AI. The orchestrator determines the type of question, selects the correct authority level, checks the relevant source of truth, and chooses the needed `validation` or `quality gate`.

Replace vague language like "LLM can beautifully complete a pattern" with:

`LLM can complete a plausible pattern that looks logical, but may not be true for this repo unless grounded in repo facts`.

Ukrainian meaning: an LLM can produce logically similar code, architecture explanation, or workflow recommendation based on a familiar pattern. But for a concrete repo, that is not `project truth` until it is grounded in `repo facts`.

The `Local Learning Agent Blueprint` should be rewritten as a practical mental model for the orchestrator:

`failure signal -> classify mistake -> propose durable correction -> orchestrator approval -> update durable layer -> future interception`.

This block should not sound like an abstract architecture for an autonomous self-improving agent.

Self-checks should train the difference between:

- `session-local correction`: the agent corrected itself within the current prompt/chat/run, but a future agent can repeat the same mistake;
- `durable workflow improvement`: the correction is saved in a rule, skill, test, docs update, validation check, quality gate, or stop condition, so it can intercept a similar future mistake.

## Information Architecture

The MVP learning path is:

1. AI under the hood
2. Context engineering
3. Authority / source of truth
4. Workflow vs agent
5. Core workflow patterns
6. Coding agent workflow
7. Task lanes / audit depth
8. Agentic loop
9. Local learning
10. Quality gates
11. Zoom-out
12. Practice scenarios
13. Operating checklist
14. References / advanced reading

The progression should build from mental model to decision model to workflow model, then to mixed practice.

Each core chapter should include a decision checkpoint or micro-practice immediately after the explanation. The final `Practice Scenarios` section should act as a cumulative capstone.

## Workflow Patterns

The MVP includes these six workflow patterns as `decision vocabulary`:

- `prompt chaining`;
- `routing`;
- `parallelization`;
- `orchestrator-worker`;
- `evaluator-optimizer`;
- `agent`.

For each pattern, provide:

- what it means;
- when to use it;
- when not to use it;
- the orchestrator risk;
- the required `quality gate` or `validation`;
- one small coding-agent example.

These patterns are common agentic workflow vocabulary from Anthropic / LangGraph materials, but LangGraph is not the conceptual owner of the learning path. The MVP should not install LangGraph and should not implement a LangGraph runtime.

The MVP teaches pattern recognition and orchestrator control, not framework implementation.

Research-backed calibration note: use these patterns as orchestrator decision vocabulary, not as framework requirements. Anthropic is a strong source anchor for the six-pattern set and the simple-first principle; LangGraph is useful as a framework-backed reference for workflows and agents.

## Interactives MVP Scope

The MVP must include these lightweight, data-driven interactives:

1. `Self-check / reveal cards`
2. `Source-of-Truth Authority Matrix`
3. `Workflow Classifier`
4. `Agentic Loop Simulator`
5. `Local Learning Loop Wizard`
6. `Permission / Risk Gate Stress-Test`
7. `Practice Scenarios`

All seven are in scope, but they should be compact decision tools, not complex simulations or separate large subsystems.

Each interactive should train one clear decision skill:

- authority layer;
- workflow level / audit depth;
- quality gate selection;
- continue / stop / zoom out;
- session-local vs durable correction;
- permission approval;
- orchestrator judgment in mixed scenarios.

MVP quality means clear choice, feedback, consequence, and short explanation. It does not mean maximum simulation depth.

React should be used for meaningful interactivity: scenario selection, reveal/feedback, decision paths, stateful classifiers, loop simulators, local learning wizard, and progress/review mode.

Framer Motion is optional. If used later, it should support understanding through useful transitions and feedback states. It should not be decorative, and reduced motion/accessibility must be respected.

## Practice Scenarios

The MVP starts with these 8 practice scenarios:

1. feature-local helpers are proposed to move into shared;
2. repo docs and Memory conflict;
3. validation passes, but UI behavior is wrong;
4. agent keeps fixing symptoms while the diff grows;
5. agent wants to edit `AGENTS.md` / `CLAUDE.md`;
6. prompt became longer after a mistake, but no durable correction was created;
7. agent wants to add a dependency;
8. agent wants to change auth/API/payment boundaries.

Each scenario should use this structure:

`situation -> choices -> consequence -> correct orchestrator move -> durable correction candidate`.

These scenarios cover ownership, source of truth, UI QA, zoom-out, workflow authority, durable correction, permission gate, and high-risk boundary judgment.

## Local Learning / Durable Correction Model

Local learning means controlled workflow improvement.

It does not mean:

- model-weight training;
- silent autonomous self-modification;
- an agent rewriting project rules without approval.

Core model:

`failure signal -> classify mistake -> propose durable correction -> orchestrator approval -> update durable layer -> future interception`.

The agent may notice a failure signal, classify the mistake, and propose a durable correction. The orchestrator decides whether the correction is needed, where it belongs, and whether it creates too much workflow overhead, scope creep, or excessive constraint.

Preserve this wording in future site copy: the agent may propose a durable correction, but the orchestrator approves whether it belongs in a `rule`, `skill`, `test`, `docs update`, `validation check`, `quality gate`, or `stop condition`.

Avoid wording that implies model training, autonomous self-improvement, or silent agent modification of durable workflow layers.

The `Local Learning Loop Wizard` should train the learner to choose the right durable target:

- `rule`;
- `skill`;
- `test`;
- `docs update`;
- `validation check`;
- `quality gate`;
- `stop condition`.

The key skill is `routing correction to the right layer`.

## Gates And Permission / Risk Stress-Test

The MVP gate set is:

- `validation gate` - technical correctness;
- `source-of-truth gate` - correct authority layer;
- `ownership gate` - local/shared/code ownership boundaries;
- `permission gate` - risky or irreversible actions;
- `UI QA gate` - visible behavior not always caught by build/tests;
- `lifecycle-close gate` - task does not close without evidence/acceptance;
- `durable correction gate` - one-off mistakes do not become rule/skill/test/docs without correct target and approval.

Gates should be taught as decision tools, not bureaucracy. Their purpose is to catch risk earlier and reduce repeated mistakes without unnecessary workflow overhead.

### Evals As Quality-Gate Concept

Evals are durable verification assets. In coding-agent workflows, they can turn repeated failures into measurable checks that protect future tasks.

For MVP, teach evals as a quality-gate concept with 1-2 simple examples:

- a regression test or static check created from a repeated coding-agent mistake;
- an outcome check, transcript review, or UI behavior check when normal validation passes but the result is still wrong.

Do not design a full eval harness, eval platform, or scoring system in the MVP. Those belong in deferred / advanced scope.

The `Permission / Risk Gate Stress-Test` should include:

- `delete file`;
- `add dependency`;
- `edit AGENTS.md / CLAUDE.md`;
- `change auth/API/payment boundary`;
- `run destructive command`;
- `continue after repeated failed validation`;
- `archive task artifact before lifecycle-close`.

Expected learner behavior:

`pause -> explain risk -> identify required gate -> ask approval if needed -> validate / stop / zoom out depending on the case`.

This block tests whether the workflow stops risky actions before they cause damage or scope creep.

Permission gate wording should be softened: a permission gate is the expected orchestrator behavior for risky actions. Some products provide sandbox, approval, or permission mechanisms, but the site should not imply that tools automatically catch every risk correctly. The orchestrator still reviews scope, blast radius, evidence, and approval requirements.

Codex and Claude Code may be used as concrete examples because they match the workflow context, but product-specific behavior must be labeled as an example, not a universal rule. Avoid claims about Cursor, Windsurf, or other coding-agent permission behavior unless current official docs have been checked.

## UX And Visual Model

The MVP is a `chapter-based learning site`, not a landing page or slide deck.

Core UX:

- readable long-form chapters;
- sticky sidebar navigation on desktop;
- compact top / section navigation on mobile;
- progressive default / expanded content;
- visible progress or current chapter state;
- dark calm UI;
- short functional hero;
- emphasis on chapter map, checkpoints, interactives, and practice flow.

The dark UI must be readable, contrast-safe, and calm. Avoid decorative cards, excessive glow, and animations that do not help learning.

The hero should briefly explain what the learner will learn to do, how to use the site, and where to start. It should not be a marketing-style hero.

Diagrams should be lightweight React/CSS/SVG components tied to mental models and stateful interactives. They should not be static decorative illustrations.

Useful diagrams include:

- `authority layer -> source of truth -> validation / quality gate`;
- `observe -> plan -> act -> check -> exit / continue / zoom out`;
- `failure signal -> classify -> durable correction -> approval -> future interception`;
- `workflow pattern -> orchestrator risk -> required gate`.

Diagrams should show decision flow, selected path, consequence, authority/validation/gate relationships, and where the learner is in the workflow.

Source-backed claims should have lightweight `source chips` or compact source notes near key claims, not only a references list at the end. Use them sparingly and only near key external factual claims.

Do not place source chips near product decisions, learner preferences, MVP scope decisions, or repo facts. Keep references / advanced reading as a final section.

Separate:

- product decisions - confirmed decisions for this site;
- repo facts - facts confirmed by project files;
- external factual claims - claims about agents, workflows, tools, HITL, permission gates, and similar topics that need source-backed validation.

## Content Model And Schema Principles

Use typed content files:

- `src/content/sections.ts`;
- `src/content/patterns.ts`;
- `src/content/scenarios.ts`;
- `src/content/references.ts`;
- `src/content/gates.ts`.

Do not adopt full FSD architecture for the MVP. Use FSD-inspired local ownership:

- `src/app/` - Next App Router entry;
- `src/content/` - typed learning content;
- `src/components/layout/` - shell, navigation, section layout;
- `src/components/learning/` - reusable learning UI, such as cards, diagrams, reveal blocks, source chips;
- `src/components/interactives/` - stateful decision tools, such as classifier, simulator, wizard, stress-test;
- `src/lib/` or `src/shared/` - only if real reusable logic appears.

The goal is to separate learning content from UI components so content can be revised, expanded, and checked without rewriting large React components.

Reusable interactives should work from typed content data instead of hardcoded text inside components.

Schema principle for scenario-like interactives:

- `prompt` or `situation`;
- `choices`;
- `feedback`;
- `correctMove`;
- `consequence`;
- `relatedGates`;
- `sourceRefs`.

Not every interactive must include every field. Simple self-check cards can use a simpler schema, while practice scenarios can use a fuller one.

Components should own:

- rendering;
- local UI state;
- selected choice / reveal state;
- visual feedback;
- accessibility behavior.

Reusable decision logic or scoring should move to `src/lib/` only after real repeated use appears. Do not create shared abstractions prematurely.

## References / Research Backlog

During calibration, collect source anchors and claims to validate later. Do not treat the legacy file or product decisions as proof for external factual claims.

Starter research backlog:

- Anthropic - `Building effective agents`;
- Anthropic - `Demystifying evals for AI agents`;
- OpenAI - `Practical guide to building agents`;
- LangGraph - `Workflows and agents`;
- LangChain - `Human-in-the-loop`;
- Simon Willison - agent definition;
- Karpathy / Software 3.0 notes;
- Addy Osmani - `Loop Engineering`;
- OpenAI Codex official docs for sandboxing, approvals, skills, and subagents;
- Claude Code official docs for settings, permissions/security, skills, subagents, hooks, and worktrees;
- current official docs for permission/tool behavior in concrete coding-agent products.

Use this backlog later to validate claims about:

- workflow patterns;
- agent loops;
- HITL / approval;
- tool use;
- generation-verification;
- evals and verification assets;
- loop engineering;
- permission boundaries.

Vendor/product behavior changes quickly. Claims about Claude Code, Codex, Cursor, Windsurf, or other coding-agent tools must be checked against current official docs during a separate source-backed research pass.

Source-chip candidates for future site copy:

- `Anthropic: workflow vs agent` for predefined workflows vs dynamic agents;
- `Anthropic: common workflow patterns` for the six MVP workflow patterns;
- `LangGraph: workflows and agents` as a framework-backed reference, not an MVP runtime requirement;
- `Willison: tools in a loop` for the compact agent definition;
- `Anthropic: agent evals` for evals as verification assets;
- `LangChain: HITL decisions` for approve/edit/reject/respond-style human decisions;
- `OpenAI Codex: sandbox + approvals` for Codex-specific examples;
- `Claude Code: permissions` for Claude-specific examples;
- `Addy Osmani: Loop Engineering` for advanced reading only.

Loop Engineering should remain advanced / next layer. It can be introduced after the learner understands source of truth, gates, evals, and lifecycle control. It should not become the core MVP blueprint.

## Deferred Scope

Deferred / advanced scope:

- full LangGraph implementation tutorial or framework/runtime demonstration;
- full eval harness, eval platform, or scoring system;
- Claude/Codex subagents;
- worktrees;
- scheduled loops;
- hooks;
- agent teams;
- Loop Engineering as a second-layer concept;
- deeper source-backed research pass;
- richer progress persistence or scoring if needed;
- more practice scenarios beyond the MVP 8;
- heavier motion/animation work;
- advanced reading modules;
- full framework-specific implementation tutorials.

## Remaining Open Questions

No blocking open questions remain for the calibration artifact.

Future implementation planning still needs separate decisions about exact component APIs, visual polish details, acceptance criteria, and source-backed research timing.
