import Link from "next/link";

/**
 * Kleine, herbruikbare UI-primitieven in huisstijl. Knoppen zijn de enige plek met
 * hoekradius (max 6px, rounded-control). Primair gebruikt terracotta-donker voor
 * AA-contrast met linnen tekst.
 */

type KnopVariant = "primair" | "secundair";

const knopBasis =
  "inline-flex items-center justify-center rounded-control px-5 py-3 font-body font-medium transition-opacity";

const knopVariant: Record<KnopVariant, string> = {
  primair: "bg-terracotta-donker text-linnen hover:opacity-90",
  secundair: "border border-antraciet/30 text-antraciet hover:border-terracotta-donker",
};

export function KnopLink({
  href,
  variant = "primair",
  children,
}: {
  href: string;
  variant?: KnopVariant;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${knopBasis} ${knopVariant[variant]}`}>
      {children}
    </Link>
  );
}

export function knopClasses(variant: KnopVariant = "primair") {
  return `${knopBasis} ${knopVariant[variant]}`;
}

export interface Kruimel {
  label: string;
  href?: string;
}

/** Breadcrumbs; het laatste item is de huidige pagina (geen link). */
export function Breadcrumbs({ items }: { items: Kruimel[] }) {
  return (
    <nav aria-label="Kruimelpad" className="mb-6 font-body text-sm text-antraciet/70">
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-x-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-terracotta-donker">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-antraciet">
                {item.label}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
