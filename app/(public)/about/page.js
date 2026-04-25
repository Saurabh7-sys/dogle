"use client";

import Image from "next/image";
import FadeIn from "@/app/components/FadeIn";
import { useSiteStore } from "@/app/store/useSiteStore";
import { useHydration } from "@/app/hooks/useHydration";

function VibeCard({ icon, iconBg, iconColor, title, description }) {
  return (
    <div className="bg-white rounded-[2rem] p-8 border-2 border-[#1b1c1c] flex flex-col items-center text-center gap-4 hover:-translate-y-2 transition-transform duration-200 shadow-[0_6px_0_0_#1b1c1c]">
      <div
        className={`w-20 h-20 rounded-full ${iconBg} flex items-center justify-center border-2 border-[#1b1c1c]`}
      >
        <span
          className={`material-symbols-outlined text-5xl ${iconColor}`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>
      <h3 className="font-bold text-2xl text-[#1b1c1c]">{title}</h3>
      <p className="text-base leading-relaxed text-[#4d4633]">{description}</p>
    </div>
  );
}

// Removed metadata because this is now a client component

export default function AboutPage() {
  const store = useSiteStore();
  const isHydrated = useHydration();

  return (
    <main className="pt-32 pb-20 flex flex-col items-center px-8 gap-16 max-w-[1200px] mx-auto w-full">
      {/* ── Hero ── */}
      <FadeIn>
        <section className="w-full text-center flex flex-col items-center gap-6 mt-8">
        <h1 className="font-black text-5xl md:text-[48px] leading-tight text-[#1b1c1c]">
          {isHydrated ? store.aboutHeroTitle : "Meet The Pack Leaders"}
        </h1>
        <p className="text-lg leading-relaxed text-[#4d4633] max-w-2xl">
          {isHydrated ? store.aboutHeroSubtitle : "We're just a couple of humans..."}
        </p>
      </section>
      </FadeIn>

      {/* ── Founders Bento Grid ── */}
      <FadeIn delay={0.2}>
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
        {/* Founder 1 — Sarah */}
        <div className="md:col-span-7 bg-[#bee0ff] rounded-[2rem] p-8 border-2 border-[#1b1c1c] flex flex-col md:flex-row gap-8 items-center relative overflow-hidden shadow-[0_6px_0_0_#1b1c1c]">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-50 blur-xl" />
          <div className="w-48 h-48 flex-shrink-0 rounded-full border-4 border-[#1b1c1c] overflow-hidden shadow-[0_4px_0_0_#1b1c1c]">
            <Image
              src={isHydrated && store.aboutImage1 ? store.aboutImage1 : "https://lh3.googleusercontent.com/aida-public/AB6AXuCiYf-49EmJmtFcBJonfrBIC-uBqPx1VXfUY3w4Vw2TUw_4IF72DIrUJiDSY6qjZva36GIsxYTyS8GdwRTMZVqCQlIS3T6bMJdiWnmrRCeP61OUZw4RyrYBsmACFXqHE8WTeuN0YZ3KcUgtuemRr7kBSAbSJWmjCO9e2RB0EpQdcIUArALvPOM_reNQyk-rN_N6K5FsXomtUE9hO8OSOa8OGtL19z8Vsz1S1xK84kARUBhDzaT98u2e4KU67RhaquqlWjCOAjVYkA"}
              alt="Sarah hugging her golden doodle"
              width={192}
              height={192}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="font-bold text-3xl text-[#1b1c1c]">
                Sarah & Barnaby
              </h2>
              <span className="inline-block bg-[#ffd93d] text-[#725e00] font-bold text-sm px-3 py-1 rounded-full border border-[#1b1c1c] mt-2">
                Chief Belly Rubber
              </span>
            </div>
            <p className="text-base leading-relaxed text-[#4d4633]">
              Sarah used to work in finance until she realized spreadsheets
              don&apos;t wag their tails. Barnaby is a Golden Doodle who oversees
              quality control (treat tasting). Together, they ensure every dog
              gets a minimum of 400 pets per day.
            </p>
          </div>
        </div>

        {/* Founder 2 — Mike */}
        <div className="md:col-span-5 bg-[#ffdcc6] rounded-[2rem] p-8 border-2 border-[#1b1c1c] flex flex-col items-center text-center gap-6 shadow-[0_6px_0_0_#1b1c1c]">
          <div className="w-40 h-40 rounded-[2rem] border-4 border-[#1b1c1c] overflow-hidden shadow-[0_4px_0_0_#1b1c1c] transform -rotate-3 hover:rotate-0 transition-transform duration-200">
            <Image
              src={isHydrated && store.aboutImage2 ? store.aboutImage2 : "https://lh3.googleusercontent.com/aida-public/AB6AXuCHT_NyUcDbQdyUbdJJXCbAM4jMfzYE9DvKldhr5QNkfuzbeZ9rLbVCGS_wf5L6YPuxTXtW3_u6gy0Zn65iPmijcRopL84rT3QU6YroAYKF51XH4aG8wnFEcgb04eGPfCvXeL71ffVljdQO01DqF2NP_P6fhsp8-2-zPj3FZiOBmZAainQVTz4zTg_7ExdQIHaqNreXlawGAbMk51tP-EJsf8FjAbe-c_af8ibXUUTfetkztRZYMI8Rorh9dAeSw0V9-ZqUnIukqQ"}
              alt="Mike holding a terrier puppy"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold text-2xl text-[#1b1c1c]">Mike & Pip</h2>
            <span className="inline-block bg-[#705d00] text-white font-bold text-sm px-3 py-1 rounded-full mt-2">
              Director of Zoomies
            </span>
          </div>
          <p className="text-base leading-relaxed text-[#4d4633]">
            Mike brings the chaos, Pip brings the speed. If your dog comes home
            tired, thank Mike for the rigorous game of chase in the yard.
          </p>
        </div>
      </section>
      </FadeIn>

      {/* ── Our Vibe ── */}
      <FadeIn delay={0.4}>
        <section className="w-full flex flex-col items-center gap-8 mt-4 mb-12">
        <h2 className="font-bold text-4xl text-[#1b1c1c] text-center relative inline-block">
          Our Vibe
          <span className="absolute -bottom-2 left-0 right-0 h-3 bg-[#ffd93d] -z-10 rounded-full transform -skew-x-12" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <VibeCard
            icon="door_open"
            iconBg="bg-[#cbe6ff]"
            iconColor="text-[#004b71]"
            title="No Cages"
            description="We believe in wide open spaces and couches. Only happy boundaries here."
          />
          <VibeCard
            icon="cookie"
            iconBg="bg-[#ffe173]"
            iconColor="text-[#554500]"
            title="All Treats"
            description="Organic, squishy, crunchy. If it's tasty and safe, we're handing it out (with permission, of course)."
          />
          <VibeCard
            icon="bedtime"
            iconBg="bg-[#ffdcc6]"
            iconColor="text-[#713700]"
            title="Maximum Naps"
            description="Play hard, snooze harder. We provide top-tier orthopedic dog beds for optimal snoring."
          />
        </div>
      </section>
      </FadeIn>
    </main>
  );
}
