import Link from "next/link";
import { SiteNav, type NavItem } from "./SiteNav";

/**
 * Paginaframe: header met merk (woordmerk of logo) en navigatie, main, footer.
 * Structuurtaal — een dunne haarlijn (border-zand) scheidt de header, geen
 * slagschaduw, geen schaduwkaart. De motor krijgt merk, nav en footer van buiten.
 */
export function Shell({
  siteName,
  nav,
  brand,
  footer,
  children,
}: {
  siteName: string;
  nav: NavItem[];
  brand?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-zand">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/" aria-label={siteName} className="inline-flex items-center">
            {brand ?? <span className="font-display text-2xl text-antraciet">{siteName}</span>}
          </Link>
          <SiteNav items={nav} />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">{children}</main>
      <footer className="border-t border-zand">
        <div className="mx-auto max-w-6xl px-6 py-10 font-body text-sm text-antraciet/80">
          {footer ?? siteName}
        </div>
      </footer>
    </div>
  );
}
