"use client";

import { useSiteStore } from "@/app/store/useSiteStore";
import { useHydration } from "@/app/hooks/useHydration";
import Link from "next/link";

export default function ServicesEditPage() {
  const store = useSiteStore();
  const isHydrated = useHydration();

  if (!isHydrated) return <div className="p-8 text-center text-[var(--admin-text-muted)]">Loading...</div>;

  const handleChange = (e) => {
    store.updateField(e.target.name, e.target.value);
  };

  return (
    <main className="w-[90%] max-w-none mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/pages" className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--admin-text-primary)]">Editing: Services Page</h1>
        </div>
      </div>

      <div className="glass-panel sm:rounded-xl">
        <div className="px-4 py-6 sm:p-8">
          <h2 className="text-base font-semibold leading-7 text-[var(--admin-text-primary)]">Page Header</h2>
          <div className="mt-6 border-t border-[var(--admin-border)] pt-6 space-y-6">
            
            <div className="max-w-2xl">
              <label htmlFor="servicesHeroTitle" className="block text-sm font-medium leading-6 text-[var(--admin-text-primary)]">
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="servicesHeroTitle"
                  id="servicesHeroTitle"
                  value={store.servicesHeroTitle}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-[var(--admin-text-primary)] shadow-sm ring-1 ring-inset ring-[var(--admin-border)] placeholder:text-[var(--admin-text-muted)] focus:ring-2 focus:ring-inset focus:ring-[var(--admin-accent)] sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="max-w-2xl">
              <label htmlFor="servicesHeroSubtitle" className="block text-sm font-medium leading-6 text-[var(--admin-text-primary)]">
                Subtitle / Description
              </label>
              <div className="mt-2">
                <textarea
                  id="servicesHeroSubtitle"
                  name="servicesHeroSubtitle"
                  rows={4}
                  value={store.servicesHeroSubtitle}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-[var(--admin-text-primary)] shadow-sm ring-1 ring-inset ring-[var(--admin-border)] placeholder:text-[var(--admin-text-muted)] focus:ring-2 focus:ring-inset focus:ring-[var(--admin-accent)] sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
