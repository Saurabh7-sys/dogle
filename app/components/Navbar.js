"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import AuthModal from "./AuthModal";
import BrandLogo from "./BrandLogo";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  const { user, profile, loading, setAuthModalOpen, initializeAuth, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!loading && user && profile && !profile.dogName) {
      const now = Date.now();
      const lastShown = localStorage.getItem("last_profile_reminder_time");
      if (!lastShown || now - parseInt(lastShown, 10) > 24 * 60 * 60 * 1000) {
        setIsReminderModalOpen(true);
        localStorage.setItem("last_profile_reminder_time", now.toString());
      }
    }
  }, [loading, user, profile]);

  return (
    <>
      <AuthModal />
      
      {/* Profile Reminder Modal */}
      {isReminderModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative border-4 border-zinc-900 text-center">
            <button 
              onClick={() => setIsReminderModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 border-2 border-zinc-900 transition-colors"
            >
              <span className="material-symbols-outlined text-sm font-bold">close</span>
            </button>
            
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-zinc-900">
              <span className="material-symbols-outlined text-3xl text-yellow-600">pets</span>
            </div>
            
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight mb-2">
              Complete Profile! 🐾
            </h2>
            <p className="text-sm font-semibold text-zinc-600 mb-6 px-2 leading-relaxed">
              Tell us about your dog to start booking stays at BM Pet Care. It only takes a minute!
            </p>
            
            <Link 
              href="/onboarding" 
              onClick={() => setIsReminderModalOpen(false)}
              className="block w-full text-center bg-[#ffd93d] text-[#725e00] font-black text-lg py-3 rounded-xl border-2 border-zinc-900 shadow-[0_4px_0_0_rgba(27,28,28,1)] hover:translate-y-1 hover:shadow-none transition-all"
            >
              Let's Go!
            </Link>
            
            <button 
              onClick={() => setIsReminderModalOpen(false)}
              className="mt-4 text-xs font-bold text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 py-2 sm:py-3">
        <nav className="flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-5 lg:px-6 py-2 sm:py-3 max-w-7xl mx-auto rounded-full border-2 border-zinc-900 shadow-[0_4px_0_0_rgba(255,217,61,1)] sm:shadow-[0_6px_0_0_rgba(255,217,61,1)] bg-white/90 backdrop-blur-md">
          <BrandLogo href="/" size="md" variant="light" compact className="shrink-0" />

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-6 items-center flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-bold text-lg transition-all duration-200 hover:scale-105 ${
                  isActive(link.href)
                    ? "text-yellow-600 underline decoration-4 underline-offset-8"
                    : "text-zinc-700 hover:text-yellow-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/contact"
              className="flex items-center justify-center bg-[#ffd93d] text-[#725e00] font-bold text-sm w-9 h-9 sm:w-auto sm:h-auto sm:px-5 sm:py-2 rounded-full border-2 border-zinc-900 shadow-[0_3px_0_0_rgba(27,28,28,1)] sm:shadow-[0_4px_0_0_rgba(27,28,28,1)] hover:scale-105 active:translate-y-1 active:shadow-none transition-all duration-150"
              aria-label="Book now"
            >
              <span className="material-symbols-outlined text-[20px] leading-none sm:hidden">calendar_month</span>
              <span className="hidden sm:inline whitespace-nowrap">Book Now</span>
            </Link>

            {!loading && user ? (
              <div className="inline-flex items-center justify-center p-[3px] rounded-full border-2 border-zinc-900 cursor-pointer group relative bg-yellow-100 shrink-0">
                <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-zinc-900 overflow-hidden bg-white shrink-0">
                  {profile?.photoURL ? (
                    <img src={profile.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-zinc-700 text-sm">pets</span>
                  )}
                </div>

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
                className="flex items-center justify-center bg-white text-zinc-900 font-bold w-9 h-9 sm:w-auto sm:h-auto sm:px-5 sm:py-2 rounded-full border-2 border-zinc-900 hover:bg-gray-50 transition-colors"
                aria-label="Sign in"
              >
                <span className="material-symbols-outlined text-[20px] leading-none sm:hidden">person</span>
                <span className="hidden sm:inline whitespace-nowrap">Sign In</span>
              </button>
            )}

            <button
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white border-2 border-zinc-900 flex items-center justify-center hover:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="material-symbols-outlined text-zinc-900 text-[22px]">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-2 right-2 sm:left-4 sm:right-4 mt-2 bg-white border-2 border-zinc-900 rounded-2xl p-4 shadow-[0_8px_0_0_rgba(27,28,28,1)] flex flex-col gap-2">
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
