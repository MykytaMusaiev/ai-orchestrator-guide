import type { ReferenceId, ReferenceLifecycle } from "./schemas";

export const referenceLifecycle = {
  "anthropic-building-effective-agents": {
    url: "https://www.anthropic.com/engineering/building-effective-agents",
    status: "verified-primary",
    verifiedAt: "2026-07-11",
    volatility: "stable",
    vendorScope: "Anthropic agent-system architecture guidance",
  },
  "anthropic-agent-evals": {
    url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
    status: "verified-primary",
    verifiedAt: "2026-07-11",
    volatility: "stable",
    vendorScope: "Anthropic agent evaluation guidance",
  },
  "openai-practical-agents": {
    url: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/",
    status: "verified-primary",
    verifiedAt: "2026-07-11",
    volatility: "stable",
    vendorScope: "OpenAI agent design guidance",
  },
  "langgraph-workflows-agents": {
    url: "https://docs.langchain.com/oss/python/langgraph/workflows-agents",
    status: "verified-primary",
    verifiedAt: "2026-07-11",
    volatility: "vendor-specific",
    vendorScope: "LangGraph Python workflows and agents documentation",
  },
  "langchain-human-in-loop": {
    url: "https://docs.langchain.com/oss/javascript/langchain/human-in-the-loop",
    status: "verified-primary",
    verifiedAt: "2026-07-11",
    volatility: "vendor-specific",
    vendorScope: "LangChain JavaScript human-in-the-loop middleware",
  },
  "willison-agent-definition": {
    url: "https://simonwillison.net/2025/Sep/18/agents/",
    status: "verified-primary",
    verifiedAt: "2026-07-11",
    volatility: "heuristic",
    vendorScope: "Simon Willison's working definition of an LLM agent",
  },
  "karpathy-software-30": {
    url: "https://karpathy.ai/",
    status: "advanced-reading",
    verifiedAt: "2026-07-11",
    volatility: "heuristic",
    vendorScope: "Andrej Karpathy's Software 3.0 framing",
  },
  "addy-osmani-loop-engineering": {
    url: "https://addyosmani.com/blog/loop-engineering/",
    status: "advanced-reading",
    verifiedAt: "2026-07-11",
    volatility: "heuristic",
    vendorScope: "Addy Osmani's Loop Engineering essay",
  },
  "openai-codex-docs": {
    url: "https://learn.chatgpt.com/docs/agent-approvals-security",
    status: "verified-primary",
    verifiedAt: "2026-07-11",
    volatility: "vendor-specific",
    vendorScope: "OpenAI Codex sandbox and approval behavior",
  },
  "claude-code-docs": {
    url: "https://code.claude.com/docs/en/permissions",
    status: "verified-primary",
    verifiedAt: "2026-07-11",
    volatility: "vendor-specific",
    vendorScope: "Claude Code permission rules and modes",
  },
} satisfies Record<ReferenceId, ReferenceLifecycle>;
