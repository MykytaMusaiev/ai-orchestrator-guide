import type { Metadata } from "next";
import "./globals.css";

const siteDescription =
  "A practice-oriented learning site for developer-orchestrators training AI workflow orchestration, source-of-truth decisions, quality gates, and agentic loop judgment.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-orchestrator-guide.vercel.app"),
  title: {
    default: "AI Orchestrator Guide",
    template: "%s | AI Orchestrator Guide",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Orchestrator Guide",
    description: siteDescription,
    url: "/",
    siteName: "AI Orchestrator Guide",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI Orchestrator Guide",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
