import type { Reference, ReferenceId } from "../schemas";
import { referenceLifecycle } from "../reference-lifecycle";

export const references = {
  "anthropic-building-effective-agents": {
    id: "anthropic-building-effective-agents",
    label: "Anthropic - Building effective agents",
    title: "Building effective agents",
    ...referenceLifecycle["anthropic-building-effective-agents"],
    category: "core",
    scope:
      "Workflow versus agent framing, six common workflow patterns, and simple-first agent-system design.",
    note:
      "Primary conceptual source for the course vocabulary; it does not prescribe a framework runtime.",
  },
  "anthropic-agent-evals": {
    id: "anthropic-agent-evals",
    label: "Anthropic - Agent evals",
    title: "Demystifying evals for AI agents",
    ...referenceLifecycle["anthropic-agent-evals"],
    category: "core",
    scope:
      "Agent eval structure, outcome and transcript evidence, and matching graders to the evaluated behavior.",
    note:
      "Supports the lightweight course framing of evals as durable verification assets, not a requirement to build an eval platform.",
  },
  "openai-practical-agents": {
    id: "openai-practical-agents",
    label: "OpenAI - Practical guide to agents",
    title: "A practical guide to building agents",
    ...referenceLifecycle["openai-practical-agents"],
    category: "core",
    scope:
      "Agent components, orchestration, guardrails, exit conditions, and incremental complexity guidance.",
    note:
      "A practical architecture guide; product-specific API examples are not universal coding-agent behavior.",
  },
  "langgraph-workflows-agents": {
    id: "langgraph-workflows-agents",
    label: "LangGraph - Workflows and agents",
    title: "Workflows and agents",
    ...referenceLifecycle["langgraph-workflows-agents"],
    category: "core",
    scope:
      "Current LangGraph examples for workflow and agent patterns, including orchestrator-worker and evaluator-optimizer.",
    note:
      "Framework-backed reference only. The MVP uses the vocabulary and does not require LangGraph runtime code.",
  },
  "langchain-human-in-loop": {
    id: "langchain-human-in-loop",
    label: "LangChain - Human in the loop",
    title: "Human-in-the-loop",
    ...referenceLifecycle["langchain-human-in-loop"],
    category: "core",
    scope:
      "LangChain HITL interrupts and approve, edit, reject, or respond decisions for reviewed tool calls.",
    note:
      "Framework-specific terminology that illustrates human review; it is not a universal agent API.",
  },
  "willison-agent-definition": {
    id: "willison-agent-definition",
    label: "Simon Willison - Agent definition",
    title: "Agent definition notes",
    ...referenceLifecycle["willison-agent-definition"],
    category: "core",
    scope:
      "The opinionated definition of an LLM agent as a system that runs tools in a loop to achieve a goal.",
    note:
      "A compact heuristic definition used as learning vocabulary, not a formal standard.",
  },
  "karpathy-software-30": {
    id: "karpathy-software-30",
    label: "Karpathy - Software 3.0 notes",
    title: "Software 3.0 notes",
    ...referenceLifecycle["karpathy-software-30"],
    category: "advanced",
    scope:
      "Advanced, opinionated framing for natural-language-driven software and generation-verification workflows.",
    note:
      "Author homepage retained as optional advanced reading, not evidence for a concrete course claim.",
  },
  "addy-osmani-loop-engineering": {
    id: "addy-osmani-loop-engineering",
    label: "Addy Osmani - Loop Engineering",
    title: "Loop Engineering",
    ...referenceLifecycle["addy-osmani-loop-engineering"],
    category: "advanced",
    scope:
      "Opinionated next-layer framing for designing systems that repeatedly prompt, check, and coordinate coding agents.",
    note:
      "Advanced reading only. It must not become the MVP blueprint or imply cross-vendor feature parity.",
  },
  "openai-codex-docs": {
    id: "openai-codex-docs",
    label: "OpenAI Codex docs",
    title: "OpenAI Codex official docs",
    ...referenceLifecycle["openai-codex-docs"],
    category: "vendor-docs",
    scope:
      "Current Codex distinction between sandbox boundaries and approval policy across supported Codex surfaces.",
    note:
      "Codex-specific behavior verified for this source date; it must not be generalized to other coding agents.",
  },
  "claude-code-docs": {
    id: "claude-code-docs",
    label: "Claude Code docs",
    title: "Claude Code official docs",
    ...referenceLifecycle["claude-code-docs"],
    category: "vendor-docs",
    scope:
      "Current Claude Code permission rules, permission modes, and their relationship to sandboxing.",
    note:
      "Claude Code-specific behavior verified for this source date; it must not be generalized to other coding agents.",
  },
} satisfies Record<ReferenceId, Reference>;
