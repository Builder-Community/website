import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  // Klassen für die innere Ebene, z. B. ein Grid oder Abstände
  className?: string;
};

// Seitenränder und maximale Inhaltsbreite für alle Sektionen.
// Außen: Seitenränder (page-gutter). Innen: höchstens 1120px breit, zentriert.
// Zwei Ebenen, damit es in jedem Layout gleich funktioniert, auch in Flexbox.
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className="page-gutter">
      <div className={`mx-auto w-full max-w-page ${className}`}>{children}</div>
    </div>
  );
}
