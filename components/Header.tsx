import type { Locale } from "@/lib/format";
import { BMark } from "./BMark";
import { Container } from "./Container";

type HeaderProps = {
  locale: Locale;
  languageNav: string;
  // Farbe des kleinen B. Standard ist Orange; neben einem großen B im Hero Creme,
  // damit pro Bildschirm höchstens zwei orange Momente bleiben.
  markClassName?: string;
  // Stempel-Effekt beim Laden. Nur auf der Startseite, wenn kein großes B da ist.
  stamp?: boolean;
};

const languages = [
  { locale: "de", href: "/", label: "DE", name: "Deutsch" },
  { locale: "en", href: "/en", label: "EN", name: "English" },
] as const;

export function Header({
  locale,
  languageNav,
  markClassName = "text-orange",
  stamp = false,
}: HeaderProps) {
  return (
    // Liegt über dem Hero (absolute), damit der Hero selbst die volle Bildschirmhöhe hat.
    <header className="absolute inset-x-0 top-0 z-10 pt-[env(safe-area-inset-top)] text-cream [--focus-color:var(--color-sky)]">
      <Container className="flex h-16 items-center justify-between">
        <a
          href={locale === "de" ? "/" : "/en"}
          className="-ml-1 flex min-h-11 items-center gap-2.5 rounded-brand pr-2 pl-1"
        >
          <BMark
            className={`h-8 w-auto ${markClassName} ${stamp ? "animate-stamp" : ""}`}
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
