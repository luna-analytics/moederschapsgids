import Link from "next/link";
import { SiteNav, type NavItem } from "./SiteNav";

/**
 * Paginaframe: header met woordmerk en navigatie, main, footer. Structuurtaal —
 * een dunne haarlijn (border-zand) scheidt de header, geen slagschaduw, geen
 * schaduwkaart. De motor krijgt de merknaam en de nav-items van buitenaf.
 */
export function Shell({
  siteName,
  nav,
  children,
}: {
  siteName: string;
  nav: NavItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-zand">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="font-display text-2xl text-antraciet">
            {siteName}
          </Link>
          <SiteNav items={nav} />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
      <footer className="border-t border-zand">
        <div className="mx-auto max-w-6xl px-6 py-8 font-body text-sm text-antraciet/80">
          {siteName}
        </div>
      </footer>
    </div>
  );
}
