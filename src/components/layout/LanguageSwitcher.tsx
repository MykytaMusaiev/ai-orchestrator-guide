"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale, UiDictionary } from "@/content";
import { localeLabels, supportedLocales } from "@/content";
import { switchLocaleInPathname } from "@/lib/i18n/routing";

type LanguageSwitcherProps = {
  locale: Locale;
  ui: Pick<UiDictionary["layout"], "languageLabel" | "switchLanguage">;
};

export function LanguageSwitcher({ locale, ui }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="language-switcher" aria-label={ui.languageLabel}>
      {supportedLocales.map((targetLocale) => (
        <Link
          aria-current={targetLocale === locale ? "page" : undefined}
          className={targetLocale === locale ? "is-active" : undefined}
          href={switchLocaleInPathname(pathname, targetLocale)}
          key={targetLocale}
          title={ui.switchLanguage}
        >
          {localeLabels[targetLocale]}
        </Link>
      ))}
    </div>
  );
}

