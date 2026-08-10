// components/Breadcrumbs.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={crumb.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />}
            {isLast ? (
              <span className="text-slate-700 font-medium" aria-current="page">
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-orange-600 transition-colors font-medium"
              >
                {crumb.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
