"use client";

import Link from "next/link";
import { useSiteStore } from "../store/useSiteStore";
import { useHydration } from "../hooks/useHydration";
import BrandLogo from "./BrandLogo";
import { BRAND_NAME, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/lib/siteConfig";

const TEL_URL = `tel:+91${CONTACT_PHONE}`;

const footerLinks = [
  { label: "Safety Policy", href: "#" },
  { label: "Snack Menu", href: "#" },
  { label: "Doggy Rules", href: "#" },
  { label: "Careers (We pay in kibble)", href: "#" },
  { label: "Contact Humans", href: "/contact" },
  { label: "Admin Dashboard", href: "/admin" },
];

const socials = [
  { label: "Facebook", icon: "share" },
  { label: "Instagram", icon: "photo_camera" },
  { label: "TikTok", icon: "play_circle" },
  { label: "YouTube", icon: "smart_display" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const logoText = useSiteStore((state) => state.logoText);
  const isHydrated = useHydration();

  return (
    <footer className="w-full pt-24 pb-8 px-6 lg:px-16 flex flex-col items-center gap-12 bg-green-500 rounded-t-[3rem] border-t-8 border-green-600 mt-auto relative overflow-hidden">
      {/* Grass texture strip */}
      <div
        className="absolute bottom-0 w-full h-8 bg-green-400/30"
        style={{
          clipPath:
            "polygon(0% 100%, 5% 50%, 10% 100%, 15% 50%, 20% 100%, 25% 50%, 30% 100%, 35% 50%, 40% 100%, 45% 50%, 50% 100%, 55% 50%, 60% 100%, 65% 50%, 70% 100%, 75% 50%, 80% 100%, 85% 50%, 90% 100%, 95% 50%, 100% 100%)",
        }}
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 text-green-50">
        
        {/* Brand & Location */}
        <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
          <BrandLogo href="/" size="lg" variant="dark" />
          <p className="text-green-100/90 font-medium max-w-xs leading-relaxed">
            Premium pet care you can trust. Because your best friend deserves a vacation too.
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <h4 className="font-bold text-white text-lg">Find the Pack</h4>
            <div className="flex items-start gap-2 justify-center md:justify-start">
              <span className="material-symbols-outlined text-green-200 mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              <p className="text-green-100/90 text-left">
                123 Wagging Tail Blvd.<br />
                Barksville, CA 90210
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
              <span className="material-symbols-outlined text-green-200" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
              <a href={TEL_URL} className="text-green-100/90 hover:text-white transition-colors">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
          <h4 className="font-bold text-white text-xl mb-2">Important Sniffs</h4>
          <div className="flex flex-col gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium text-green-100/80 hover:text-white hover:translate-x-2 transition-transform duration-200 inline-flex items-center gap-2 justify-center md:justify-start"
              >
                <span className="material-symbols-outlined text-sm opacity-50">pets</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Socials & Newsletter */}
        <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
          <h4 className="font-bold text-white text-xl">Follow the Fun</h4>
          <p className="text-green-100/90 max-w-xs">
            Warning: Our feed may cause spontaneous smiling.
          </p>
          
          {/* Tennis-ball social icons */}
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            {socials.map(({ label, icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-12 h-12 rounded-full bg-[#dfff00] border-2 border-green-800 shadow-[0_4px_0_0_#166534] flex items-center justify-center hover:-translate-y-1 transition-transform relative overflow-hidden group"
              >
                {/* Tennis ball curved lines */}
                <div
                  className="absolute inset-0 rounded-full border-[3px] border-green-800/20"
                  style={{
                    borderRadius: "50%",
                    width: "150%",
                    height: "150%",
                    top: "-25%",
                    left: "-80%",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full border-[3px] border-green-800/20"
                  style={{
                    borderRadius: "50%",
                    width: "150%",
                    height: "150%",
                    top: "-25%",
                    right: "-80%",
                  }}
                />
                <span
                  className="material-symbols-outlined text-green-800 relative z-10 group-hover:scale-110 transition-transform"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {icon}
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="w-full max-w-7xl h-1 bg-green-400/30 rounded-full relative z-10 my-4" />

      {/* Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl relative z-10 gap-4 text-green-100/60 font-medium text-sm">
        <p>
          © {currentYear} {isHydrated ? logoText : BRAND_NAME} - Premium Pet Care
        </p>
        <p className="flex items-center gap-1">
          Made with <span className="material-symbols-outlined text-red-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span> and lots of treats.
        </p>
      </div>
    </footer>
  );
}
