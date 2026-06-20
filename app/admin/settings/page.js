"use client";

import { useSiteStore } from "@/app/store/useSiteStore";
import { useHydration } from "@/app/hooks/useHydration";

export default function SettingsPage() {
  const store = useSiteStore();
  const isHydrated = useHydration();

  if (!isHydrated) return <div className="p-8 text-center text-[var(--admin-text-muted)]">Loading...</div>;

  const handleChange = (e) => {
    store.updateField(e.target.name, e.target.value);
  };

  return (
    <main className="w-[90%] max-w-none mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--admin-text-primary)]">Site Settings</h1>
        <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
          Manage your global website configuration.
        </p>
      </div>

      <div className="glass-panel sm:rounded-xl">
        <div className="px-4 py-6 sm:p-8">
          <h2 className="text-base font-semibold leading-7 text-[var(--admin-text-primary)]">Global Configuration</h2>
          <div className="mt-6 border-t border-[var(--admin-border)] pt-6">
            <div className="max-w-md">
              <label htmlFor="logoText" className="block text-sm font-medium leading-6 text-[var(--admin-text-primary)]">
                Logo Text
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="logoText"
                  id="logoText"
                  value={store.logoText}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-[var(--admin-text-primary)] shadow-sm ring-1 ring-inset ring-[var(--admin-border)] placeholder:text-[var(--admin-text-muted)] focus:ring-2 focus:ring-inset focus:ring-[var(--admin-accent)] sm:text-sm sm:leading-6 px-3"
                />
              </div>
              <p className="mt-2 text-sm text-[var(--admin-text-muted)]">The primary brand name displayed in the navigation bar.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
