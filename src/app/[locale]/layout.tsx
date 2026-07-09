import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getLocalizedContent,
  htmlLangByLocale,
  isLocale,
  supportedLocales,
} from "@/content";
import "../globals.css";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const { ui } = getLocalizedContent(localeParam);

  return {
    metadataBase: new URL("https://ai-orchestrator-guide.vercel.app"),
    title: {
      default: ui.metadata.defaultTitle,
      template: ui.metadata.titleTemplate,
    },
    description: ui.metadata.description,
    alternates: {
      canonical: `/${localeParam}`,
    },
    openGraph: {
      title: ui.metadata.defaultTitle,
      description: ui.metadata.description,
      url: `/${localeParam}`,
      siteName: ui.metadata.siteName,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: ui.metadata.defaultTitle,
      description: ui.metadata.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  return (
    <html lang={htmlLangByLocale[localeParam]}>
      <body>{children}</body>
    </html>
  );
}

