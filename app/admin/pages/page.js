import Link from "next/link";

export default function PagesIndex() {
  const pages = [
    { name: "Home Page", href: "/admin/pages/home", description: "Edit the main hero section and landing page content." },
    { name: "About Page", href: "/admin/pages/about", description: "Edit the founders bios and mission statement." },
    { name: "Services Page", href: "/admin/pages/services", description: "Edit the overnight boarding and daycare descriptions." },
  ];

  return (
    <main className="w-[90%] max-w-none mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--admin-text-primary)]">Manage Pages</h1>
        <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
          Select a page below to edit its content.
        </p>
      </div>

      <div className="glass-panel sm:rounded-xl overflow-hidden">
        <ul role="list" className="divide-y divide-gray-100">
          {pages.map((page) => (
            <li key={page.name} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-[var(--admin-panel-hover)] sm:px-6 transition-colors">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-[var(--admin-text-primary)]">
                    <Link href={page.href}>
                      <span className="absolute inset-0" />
                      {page.name}
                    </Link>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-[var(--admin-text-muted)]">
                    {page.description}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <span className="material-symbols-outlined text-[var(--admin-text-muted)]">chevron_right</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
