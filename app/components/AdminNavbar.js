"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BrandLogo from "./BrandLogo";

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
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("admin-theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.getElementById("admin-root")?.classList.add("light-mode");
    } else {
      document.getElementById("admin-root")?.classList.remove("light-mode");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.getElementById("admin-root");
    if (theme === "dark") {
      root?.classList.add("light-mode");
      localStorage.setItem("admin-theme", "light");
      setTheme("light");
    } else {
      root?.classList.remove("light-mode");
      localStorage.setItem("admin-theme", "dark");
      setTheme("dark");
    }
  };

  if (pathname === "/admin/login") {
    return null;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (!mounted) return null;

  return (
    <header className="glass-panel border-b border-[var(--admin-border)] sticky top-0 z-50">
      <div className="w-[90%] max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center">
            <div className="flex items-center gap-2 mr-8">
              <BrandLogo href="/admin" size="sm" variant="light" />
              <span className="font-black text-[var(--admin-accent)] text-sm tracking-widest uppercase">
                CMS
              </span>
            </div>
            
            <nav className="hidden md:flex md:space-x-2 h-16 items-center">
              {adminLinks.map((link) => {
                const isActive = link.href === "/admin" 
                  ? pathname === "/admin" 
                  : (pathname === link.href || pathname.startsWith(link.href + "/"));
                
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-bold transition-colors rounded-lg ${
                      isActive
                        ? "text-[var(--admin-text-primary)]"
                        : "text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-panel-hover)]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-[var(--admin-panel-hover)] rounded-lg border border-[var(--admin-border)] shadow-sm -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-between w-14 h-7 bg-[var(--admin-panel-hover)] rounded-full p-1 border border-[var(--admin-border)] focus:outline-none"
            >
              <span className="material-symbols-outlined text-[14px] text-yellow-500 z-10 ml-0.5 pointer-events-none">light_mode</span>
              <span className="material-symbols-outlined text-[14px] text-indigo-400 z-10 mr-0.5 pointer-events-none">dark_mode</span>
              <motion.div
                className="absolute w-5 h-5 bg-[var(--admin-panel)] rounded-full shadow border border-[var(--admin-border)] z-0"
                animate={{
                  left: theme === "dark" ? "calc(100% - 24px)" : "4px"
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>

            <div className="h-6 w-px bg-[var(--admin-border)]" />

            <Link
              href="/"
              target="_blank"
              className="text-sm font-medium text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] flex items-center gap-1 transition-colors"
            >
              View Live Site
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </Link>
            
            <div className="h-8 w-8 rounded-full bg-[var(--admin-accent-light)] flex items-center justify-center border border-[var(--admin-accent-light)]">
              <span className="material-symbols-outlined text-[var(--admin-accent)] text-sm">person</span>
            </div>

            <button
              onClick={handleLogout}
              className="text-sm font-medium text-[var(--admin-action-danger)] hover:opacity-80 flex items-center gap-1 transition-colors ml-2"
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
