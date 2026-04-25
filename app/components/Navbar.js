 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteStore } from "../store/useSiteStore";
import { useHydration } from "../hooks/useHydration";
import { useAuthStore } from "../store/useAuthStore";
import AuthModal from "./AuthModal";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const logoText = useSiteStore((state) => state.logoText);
  const isHydrated = useHydration();

  const isActive = (href) => pathname === href;

  const { user, profile, loading, setAuthModalOpen, initializeAuth, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, [initializeAuth]);

  useEffect(() => {
    if (loading) return; 
    if (!user) {
      const timer = setTimeout(() => {
        setAuthModalOpen(true);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [loading, user, setAuthModalOpen]);

  return (
    <>
      <AuthModal />
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <nav className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto rounded-full border-2 border-zinc-900 shadow-[0_6px_0_0_rgba(255,217,61,1)] bg-white/90 backdrop-blur-md">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black text-yellow-500 tracking-tighter hover:scale-110 transition-transform duration-200 flex items-center gap-1"
        >
          <span
            className="material-symbols-outlined text-yellow-500"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            pets
          </span>
          {isHydrated ? logoText : "Dogle"}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-bold text-lg transition-all duration-200 hover:scale-105 ${
                isActive(link.href) && link.label === "Gallery"
                  ? "text-yellow-600 underline decoration-4 underline-offset-8"
                  : isActive(link.href)
                  ? "text-yellow-600 underline decoration-4 underline-offset-8"
                  : "text-zinc-700 hover:text-yellow-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="flex items-center justify-center bg-[#ffd93d] text-[#725e00] font-bold text-sm md:text-sm px-3 md:px-6 py-2 rounded-full border-2 border-zinc-900 shadow-[0_4px_0_0_rgba(27,28,28,1)] hover:scale-105 active:translate-y-1 active:shadow-none transition-all duration-150 whitespace-nowrap"
          >
            <span className="md:hidden material-symbols-outlined text-[20px] leading-none">calendar_month</span>
            <span className="hidden md:inline">Book Now</span>
          </Link>

          {!loading && user ? (
            <div className="flex items-center gap-2 bg-yellow-100 p-1 sm:pl-3 sm:pr-1 sm:py-1 rounded-full border-2 border-zinc-900 cursor-pointer group relative">
              <span className="font-bold text-xs sm:text-sm text-yellow-800 hidden sm:block whitespace-nowrap">
                {profile?.dogName || "Complete Profile!"}
              </span>
              <div className="w-8 h-8 rounded-full border border-zinc-900 overflow-hidden bg-white flex items-center justify-center shrink-0">
                 {profile?.photoURL ? (
                    <img src={profile.photoURL} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                    <span className="material-symbols-outlined text-zinc-700 text-sm">pets</span>
                 )}
              </div>
              
              {/* Profile Dropdown */}
              <div className="absolute top-full right-0 mt-4 bg-white border-2 border-zinc-900 rounded-2xl shadow-[0_8px_0_0_rgba(27,28,28,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col w-56 z-50 overflow-hidden">
                <div className="p-4 border-b-2 border-zinc-200 bg-gray-50 cursor-default">
                  <p className="font-black text-zinc-900 text-sm truncate">{profile?.name || "Good Human"}</p>
                  <p className="font-medium text-zinc-500 text-xs truncate mt-0.5">{user.email}</p>
                </div>
                <button 
                  onClick={logout}
                  className="flex items-center gap-3 w-full p-4 text-left font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">logout</span>
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center justify-center bg-white text-zinc-900 font-bold text-sm md:text-sm px-3 md:px-6 py-2 rounded-full border-2 border-zinc-900 hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              <span className="md:hidden material-symbols-outlined text-[20px] leading-none">person</span>
              <span className="hidden md:inline">Sign In</span>
            </button>
          )}

          {/* Hamburger Menu Toggle */}
          <button 
            className="lg:hidden w-10 h-10 shrink-0 rounded-full bg-white border-2 border-zinc-900 flex items-center justify-center hover:bg-gray-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-zinc-900">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white border-2 border-zinc-900 rounded-2xl p-4 shadow-[0_8px_0_0_rgba(27,28,28,1)] flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-bold text-lg text-center py-3 rounded-xl transition-colors ${
                isActive(link.href)
                  ? "bg-yellow-100 text-yellow-800"
                  : "text-zinc-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
    </>
  );
}
