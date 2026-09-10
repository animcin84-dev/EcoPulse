import Link from 'next/link';

type BreadcrumbItem = { label: string; href?: string };

export function ContextBreadcrumbs({ items, ariaLabel = 'Breadcrumb' }: { items: readonly BreadcrumbItem[]; ariaLabel?: string }) {
  return (
    <nav className="context-breadcrumbs" aria-label={ariaLabel}>
      <div className="section-shell context-breadcrumbs__inner">
        <ol>
          {items.map((item, index) => {
            const current = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className={current ? 'context-breadcrumbs__current' : undefined}>
                {item.href && !current ? <Link href={item.href}>{item.label}</Link> : <span aria-current={current ? 'page' : undefined}>{item.label}</span>}
                {!current ? <i aria-hidden="true">/</i> : null}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
