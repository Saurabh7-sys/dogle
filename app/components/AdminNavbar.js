"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const adminLinks = [
  { label: "Dashboard", href: "/admin" },
  { label: "Users", href: "/admin/users" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Enquiries", href: "/admin/enquiries" },
  { label: "Pages", href: "/admin/pages" },
  { label: "Site Settings", href: "/admin/settings" },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return null;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center">
            <Link href="/admin" className="flex items-center gap-2 font-bold text-gray-900 text-xl tracking-tight">
              <span className="material-symbols-outlined text-indigo-600" style={{ fontVariationSettings: "'FILL' 1" }}>space_dashboard</span>
              Dogle CMS
            </Link>
            
            <nav className="hidden md:ml-10 md:flex md:space-x-8 h-16">
              {adminLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
            >
              View Live Site
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </Link>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
              <span className="material-symbols-outlined text-indigo-600 text-sm">person</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors ml-2"
              title="Logout"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
