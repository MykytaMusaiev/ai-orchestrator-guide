import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Orchestrator Learning",
  description:
    "A practice-oriented learning site for developer-orchestrators working with AI coding agents.",
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
