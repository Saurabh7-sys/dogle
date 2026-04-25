"use client";

import { useSiteStore } from "@/app/store/useSiteStore";
import { useHydration } from "@/app/hooks/useHydration";
import Link from "next/link";

export default function AboutEditPage() {
  const store = useSiteStore();
  const isHydrated = useHydration();

  if (!isHydrated) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  const handleChange = (e) => {
    store.updateField(e.target.name, e.target.value);
  };

  return (
    <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/pages" className="text-gray-400 hover:text-gray-900">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editing: About Page</h1>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <div className="px-4 py-6 sm:p-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Page Header</h2>
          <div className="mt-6 border-t border-gray-100 pt-6 space-y-6">
            
            <div className="max-w-2xl">
              <label htmlFor="aboutHeroTitle" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="aboutHeroTitle"
                  id="aboutHeroTitle"
                  value={store.aboutHeroTitle}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="max-w-2xl">
              <label htmlFor="aboutHeroSubtitle" className="block text-sm font-medium leading-6 text-gray-900">
                Subtitle / Description
              </label>
              <div className="mt-2">
                <textarea
                  id="aboutHeroSubtitle"
                  name="aboutHeroSubtitle"
                  rows={4}
                  value={store.aboutHeroSubtitle}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-8">
        <div className="px-4 py-6 sm:p-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Founders Images</h2>
          <div className="mt-6 border-t border-gray-100 pt-6 space-y-6">
            
            <div className="max-w-2xl">
              <label htmlFor="aboutImage1" className="block text-sm font-medium leading-6 text-gray-900">
                Founder 1 (Sarah) Image URL
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="aboutImage1"
                  id="aboutImage1"
                  value={store.aboutImage1}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="max-w-2xl">
              <label htmlFor="aboutImage2" className="block text-sm font-medium leading-6 text-gray-900">
                Founder 2 (Mike) Image URL
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="aboutImage2"
                  id="aboutImage2"
                  value={store.aboutImage2}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
