import type { ReactNode } from "react";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

// Ruhiger Zweitlink mit Pfeil, z. B. „Instagram ansehen →“.
// Die Farbe kommt aus der Fläche (--link-color), die Höhe von 44px macht ihn gut antippbar.
export function ArrowLink({ href, children, className = "" }: ArrowLinkProps) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2 font-semibold text-(--link-color) underline-offset-4 hover:underline ${className}`}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}
