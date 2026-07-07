import Link from "next/link";

export interface NavItem {
  label: string;
  href: string;
}

/**
 * Navigatie uit losse items. De motor weet niet WELKE items; die komen uit de
 * configuratie en (voor categorieën) uit de registry.
 */
export function SiteNav({ items }: { items: NavItem[] }) {
  return (
    <nav aria-label="Hoofdmenu">
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="font-body text-antraciet hover:text-terracotta-donker"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
