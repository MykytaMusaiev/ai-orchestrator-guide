export type ReferenceId =
  | "anthropic-building-effective-agents"
  | "anthropic-agent-evals"
  | "openai-practical-agents"
  | "langgraph-workflows-agents"
  | "langchain-human-in-loop"
  | "willison-agent-definition"
  | "karpathy-software-30"
  | "addy-osmani-loop-engineering"
  | "openai-codex-docs"
  | "claude-code-docs";

export type ReferenceStatus = "research-backlog-anchor" | "current-docs-needed";

export type ReferenceCategory = "core" | "vendor-docs" | "advanced";

export type Reference = {
  id: ReferenceId;
  label: string;
  title: string;
  url: string;
  category: ReferenceCategory;
  status: ReferenceStatus;
  note: string;
};

export const references = {
  "anthropic-building-effective-agents": {
    id: "anthropic-building-effective-agents",
    label: "Anthropic - Building effective agents",
    title: "Building effective agents",
    url: "https://www.anthropic.com/engineering/building-effective-agents",
    category: "core",
    status: "research-backlog-anchor",
    note:
      "Research anchor for workflow versus agent framing, common workflow patterns, and simple-first agent system design.",
  },
  "anthropic-agent-evals": {
    id: "anthropic-agent-evals",
    label: "Anthropic - Agent evals",
    title: "Demystifying evals for AI agents",
    url: "https://www.anthropic.com/engineering",
    category: "core",
    status: "research-backlog-anchor",
    note:
      "Research anchor for treating evals as verification assets. Validate exact claims during a source-backed pass.",
  },
  "openai-practical-agents": {
    id: "openai-practical-agents",
    label: "OpenAI - Practical guide to agents",
    title: "A practical guide to building agents",
    url: "https://platform.openai.com/docs",
    category: "core",
    status: "research-backlog-anchor",
    note:
      "Research anchor for practical agent design and tool-use workflow concepts. Validate against current official docs later.",
  },
  "langgraph-workflows-agents": {
    id: "langgraph-workflows-agents",
    label: "LangGraph - Workflows and agents",
    title: "Workflows and agents",
    url: "https://langchain-ai.github.io/langgraph/",
    category: "core",
    status: "research-backlog-anchor",
    note:
      "Framework-backed reference for workflows and agents. MVP uses the vocabulary only, not the runtime.",
  },
  "langchain-human-in-loop": {
    id: "langchain-human-in-loop",
    label: "LangChain - Human in the loop",
    title: "Human-in-the-loop",
    url: "https://docs.langchain.com/",
    category: "core",
    status: "research-backlog-anchor",
    note:
      "Research anchor for approve, edit, reject, or respond style human decisions in agent workflows.",
  },
  "willison-agent-definition": {
    id: "willison-agent-definition",
    label: "Simon Willison - Agent definition",
    title: "Agent definition notes",
    url: "https://simonwillison.net/",
    category: "core",
    status: "research-backlog-anchor",
    note:
      "Research anchor for compact agent definitions around tools in a loop. Validate exact wording later.",
  },
  "karpathy-software-30": {
    id: "karpathy-software-30",
    label: "Karpathy - Software 3.0 notes",
    title: "Software 3.0 notes",
    url: "https://karpathy.ai/",
    category: "advanced",
    status: "research-backlog-anchor",
    note:
      "Advanced anchor for generation-verification and practical LLM workflow framing.",
  },
  "addy-osmani-loop-engineering": {
    id: "addy-osmani-loop-engineering",
    label: "Addy Osmani - Loop Engineering",
    title: "Loop Engineering",
    url: "https://addyo.substack.com/",
    category: "advanced",
    status: "research-backlog-anchor",
    note:
      "Advanced reading only. Do not make this the MVP blueprint.",
  },
  "openai-codex-docs": {
    id: "openai-codex-docs",
    label: "OpenAI Codex docs",
    title: "OpenAI Codex official docs",
    url: "https://platform.openai.com/docs",
    category: "vendor-docs",
    status: "current-docs-needed",
    note:
      "Use only after checking current official docs for sandboxing, approvals, skills, and product behavior.",
  },
  "claude-code-docs": {
    id: "claude-code-docs",
    label: "Claude Code docs",
    title: "Claude Code official docs",
    url: "https://docs.anthropic.com/",
    category: "vendor-docs",
    status: "current-docs-needed",
    note:
      "Use only after checking current official docs for permissions, security, skills, hooks, and subagents.",
  },
} satisfies Record<ReferenceId, Reference>;
