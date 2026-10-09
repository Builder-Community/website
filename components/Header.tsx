import type { Locale } from "@/lib/format";
import { BMark } from "./BMark";
import { Container } from "./Container";

type HeaderProps = {
  locale: Locale;
  languageNav: string;
  // Stempel-Effekt fürs B beim Laden. Laut Brief nur im Teaser und im Hero,
  // also nur auf der Startseite einschalten.
  stamp?: boolean;
};

const languages = [
  { locale: "de", href: "/", label: "DE", name: "Deutsch" },
  { locale: "en", href: "/en", label: "EN", name: "English" },
] as const;

export function Header({ locale, languageNav, stamp = false }: HeaderProps) {
  return (
    <header className="surface-navy pt-[env(safe-area-inset-top)]">
      <Container className="flex h-16 items-center justify-between">
        <a
          href={locale === "de" ? "/" : "/en"}
          className="-ml-1 flex min-h-11 items-center gap-2.5 rounded-brand pr-2 pl-1"
        >
          <BMark
            className={`h-8 w-auto text-orange ${stamp ? "animate-stamp" : ""}`}
          />
          <span className="font-display text-[1.0625rem] font-bold tracking-[-0.01em]">
            builder.community
          </span>
        </a>

        <nav aria-label={languageNav}>
          <ul className="flex items-center text-sm font-semibold tracking-wide">
            {languages.map((language, index) => {
              const isCurrent = language.locale === locale;
              return (
                <li key={language.locale} className="flex items-center">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-cream/30">
                      /
                    </span>
                  )}
                  <a
                    href={language.href}
                    hrefLang={language.locale}
                    lang={language.locale}
                    aria-label={language.name}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-brand ${
                      isCurrent ? "text-cream" : "text-cream/55 hover:text-sky"
                    }`}
                  >
                    {language.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
