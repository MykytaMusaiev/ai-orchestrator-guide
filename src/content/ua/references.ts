import type { Reference, ReferenceId } from "../schemas";

export const references = {
  "anthropic-building-effective-agents": {
    id: "anthropic-building-effective-agents",
    label: "Anthropic - Building effective agents",
    title: "Building effective agents",
    url: "https://www.anthropic.com/engineering/building-effective-agents",
    category: "core",
    status: "research-backlog-anchor",
    note:
      "Опорне дослідницьке джерело для пояснення workflow versus agent, поширених workflow patterns і simple-first design для agent systems.",
  },
  "anthropic-agent-evals": {
    id: "anthropic-agent-evals",
    label: "Anthropic - Agent evals",
    title: "Demystifying evals for AI agents",
    url: "https://www.anthropic.com/engineering",
    category: "core",
    status: "research-backlog-anchor",
    note:
      "Опорне дослідницьке джерело для evals як перевірних артефактів. Точні твердження треба перевіряти під час проходу, підкріпленого джерелами.",
  },
  "openai-practical-agents": {
    id: "openai-practical-agents",
    label: "OpenAI - Practical guide to agents",
    title: "A practical guide to building agents",
    url: "https://platform.openai.com/docs",
    category: "core",
    status: "research-backlog-anchor",
    note:
      "Опорне дослідницьке джерело для практичного agent design і workflow concepts із використанням інструментів. Пізніше перевірити за актуальними official docs.",
  },
  "langgraph-workflows-agents": {
    id: "langgraph-workflows-agents",
    label: "LangGraph - Workflows and agents",
    title: "Workflows and agents",
    url: "https://langchain-ai.github.io/langgraph/",
    category: "core",
    status: "research-backlog-anchor",
    note:
      "Framework-backed джерело для workflows and agents. MVP використовує словник, не runtime.",
  },
  "langchain-human-in-loop": {
    id: "langchain-human-in-loop",
    label: "LangChain - Human in the loop",
    title: "Human-in-the-loop",
    url: "https://docs.langchain.com/",
    category: "core",
    status: "research-backlog-anchor",
    note:
      "Опорне дослідницьке джерело для людських рішень approve, edit, reject або respond-style в agent workflows.",
  },
  "willison-agent-definition": {
    id: "willison-agent-definition",
    label: "Simon Willison - Agent definition",
    title: "Agent definition notes",
    url: "https://simonwillison.net/",
    category: "core",
    status: "research-backlog-anchor",
    note:
      "Опорне дослідницьке джерело для компактних визначень agent навколо інструментів у loop. Точне формулювання треба перевірити пізніше.",
  },
  "karpathy-software-30": {
    id: "karpathy-software-30",
    label: "Karpathy - Software 3.0 notes",
    title: "Software 3.0 notes",
    url: "https://karpathy.ai/",
    category: "advanced",
    status: "research-backlog-anchor",
    note:
      "Advanced anchor для generation-verification і практичного пояснення LLM workflow.",
  },
  "addy-osmani-loop-engineering": {
    id: "addy-osmani-loop-engineering",
    label: "Addy Osmani - Loop Engineering",
    title: "Loop Engineering",
    url: "https://addyo.substack.com/",
    category: "advanced",
    status: "research-backlog-anchor",
    note:
      "Лише advanced reading. Не робіть це MVP blueprint.",
  },
  "openai-codex-docs": {
    id: "openai-codex-docs",
    label: "OpenAI Codex docs",
    title: "OpenAI Codex official docs",
    url: "https://platform.openai.com/docs",
    category: "vendor-docs",
    status: "current-docs-needed",
    note:
      "Використовуйте тільки після перевірки актуальних official docs для sandboxing, approvals, skills і поведінки продукту.",
  },
  "claude-code-docs": {
    id: "claude-code-docs",
    label: "Claude Code docs",
    title: "Claude Code official docs",
    url: "https://docs.anthropic.com/",
    category: "vendor-docs",
    status: "current-docs-needed",
    note:
      "Використовуйте тільки після перевірки current official docs для permissions, security, skills, hooks і subagents.",
  },
} satisfies Record<ReferenceId, Reference>;
