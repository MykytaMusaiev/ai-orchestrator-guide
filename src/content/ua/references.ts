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
      "Межа workflow versus agent, шість поширених workflow patterns і simple-first design для agent systems.",
    note:
      "Основне conceptual source для словника курсу; воно не вимагає конкретного framework runtime.",
  },
  "anthropic-agent-evals": {
    id: "anthropic-agent-evals",
    label: "Anthropic - Agent evals",
    title: "Demystifying evals for AI agents",
    ...referenceLifecycle["anthropic-agent-evals"],
    category: "core",
    scope:
      "Структура agent evals, outcome і transcript evidence та вибір grader відповідно до поведінки.",
    note:
      "Підтримує lightweight framing evals як durable verification assets, а не вимогу будувати eval platform.",
  },
  "openai-practical-agents": {
    id: "openai-practical-agents",
    label: "OpenAI - Practical guide to agents",
    title: "A practical guide to building agents",
    ...referenceLifecycle["openai-practical-agents"],
    category: "core",
    scope:
      "Компоненти agent, orchestration, guardrails, exit conditions і поступове нарощування складності.",
    note:
      "Практичний architecture guide; product-specific API examples не є універсальною поведінкою coding agents.",
  },
  "langgraph-workflows-agents": {
    id: "langgraph-workflows-agents",
    label: "LangGraph - Workflows and agents",
    title: "Workflows and agents",
    ...referenceLifecycle["langgraph-workflows-agents"],
    category: "core",
    scope:
      "Актуальні LangGraph examples для workflow та agent patterns, включно з orchestrator-worker і evaluator-optimizer.",
    note:
      "Лише framework-backed reference. MVP використовує словник і не потребує LangGraph runtime code.",
  },
  "langchain-human-in-loop": {
    id: "langchain-human-in-loop",
    label: "LangChain - Human in the loop",
    title: "Human-in-the-loop",
    ...referenceLifecycle["langchain-human-in-loop"],
    category: "core",
    scope:
      "LangChain HITL interrupts і рішення approve, edit, reject або respond для tool calls, що проходять review.",
    note:
      "Framework-specific terminology для human review, а не універсальний agent API.",
  },
  "willison-agent-definition": {
    id: "willison-agent-definition",
    label: "Simon Willison - Agent definition",
    title: "Agent definition notes",
    ...referenceLifecycle["willison-agent-definition"],
    category: "core",
    scope:
      "Opinionated визначення LLM agent як системи, що запускає tools у loop для досягнення goal.",
    note:
      "Компактне heuristic definition для навчального словника, не формальний стандарт.",
  },
  "karpathy-software-30": {
    id: "karpathy-software-30",
    label: "Karpathy - Software 3.0 notes",
    title: "Software 3.0 notes",
    ...referenceLifecycle["karpathy-software-30"],
    category: "advanced",
    scope:
      "Advanced opinionated framing для natural-language-driven software і generation-verification workflows.",
    note:
      "Author homepage залишається optional advanced reading, а не доказом конкретного course claim.",
  },
  "addy-osmani-loop-engineering": {
    id: "addy-osmani-loop-engineering",
    label: "Addy Osmani - Loop Engineering",
    title: "Loop Engineering",
    ...referenceLifecycle["addy-osmani-loop-engineering"],
    category: "advanced",
    scope:
      "Opinionated next-layer framing для систем, що повторно prompt, check і coordinate coding agents.",
    note:
      "Лише advanced reading. Воно не має ставати MVP blueprint або припускати cross-vendor feature parity.",
  },
  "openai-codex-docs": {
    id: "openai-codex-docs",
    label: "OpenAI Codex docs",
    title: "OpenAI Codex official docs",
    ...referenceLifecycle["openai-codex-docs"],
    category: "vendor-docs",
    scope:
      "Поточна Codex-межа між sandbox boundaries і approval policy у підтримуваних Codex surfaces.",
    note:
      "Codex-specific behavior перевірено на цю дату; його не можна узагальнювати на інші coding agents.",
  },
  "claude-code-docs": {
    id: "claude-code-docs",
    label: "Claude Code docs",
    title: "Claude Code official docs",
    ...referenceLifecycle["claude-code-docs"],
    category: "vendor-docs",
    scope:
      "Поточні Claude Code permission rules, permission modes і їхній зв'язок із sandboxing.",
    note:
      "Claude Code-specific behavior перевірено на цю дату; його не можна узагальнювати на інші coding agents.",
  },
} satisfies Record<ReferenceId, Reference>;
