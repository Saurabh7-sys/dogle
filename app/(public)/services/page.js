"use client";

import Link from "next/link";
import FadeIn from "@/app/components/FadeIn";
import Image from "next/image";
import { useSiteStore } from "@/app/store/useSiteStore";
import { useHydration } from "@/app/hooks/useHydration";

// Removed metadata because this is now a client component

function ServiceBadge({ icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[#fcf9f8] text-[#1b1c1c] font-bold text-sm px-4 py-2 rounded-full border-2 border-[#1b1c1c] w-fit mb-4">
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
      {label}
    </div>
  );
}

function BouncyBtn({ children, className = "" }) {
  return (
    <Link
      href="/contact"
      className={`inline-flex items-center justify-center gap-2 font-bold text-sm py-4 px-8 rounded-full border-2 border-[#1b1c1c] border-b-[6px] active:translate-y-[4px] active:border-b-[2px] transition-all duration-150 ${className}`}
    >
      {children}
    </Link>
  );
}

export default function ServicesPage() {
  const store = useSiteStore();
  const isHydrated = useHydration();

  return (
    <main className="pt-36 pb-24 px-6 max-w-[1200px] mx-auto">
      {/* Hero */}
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="font-black text-5xl md:text-[48px] leading-tight text-[#1b1c1c] mb-4">
            {isHydrated ? store.servicesHeroTitle : "Choose Your Next Big Adventure!"}
          </h1>
          <p className="text-lg leading-relaxed text-[#4d4633] max-w-2xl mx-auto">
            {isHydrated ? store.servicesHeroSubtitle : "From sleepy cuddles to sudsy bubbles..."}
          </p>
        </div>
      </FadeIn>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* ── Overnight Boarding (8 cols) ── */}
        <FadeIn delay={0.1} className="md:col-span-8 flex flex-col h-full">
          <div className="bg-[#fcf9f8] rounded-[2rem] border-[3px] border-[#1b1c1c] p-8 flex flex-col md:flex-row gap-8 shadow-[0_8px_0_0_#1b1c1c] hover:-translate-y-1 transition-transform duration-300 h-full">
            <div className="flex-1 rounded-[1rem] border-2 border-[#d0c6ad] overflow-hidden h-64 md:h-auto relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHcYjf9gGkaFN3RXCI_TgLJKw1ehRm4Gy8ubCUEnJxroMX2jzTKdZC7G-92_rZ5LsY-mMmtFXefLnb7P1gvWUucWGiTTBLNHCXCpZAeYcpxLi7voPQ1KZ_L_sS7jpKNOLyrBsfx2gT9aghjXdHd0WRC7JX-Y3zKQycNfb0ZmJ971rvNpksx53C988J9q4R2V1XhR4pG-yITc_tqIoza-GvIEPuz62dFfDlbFyExX5FXVxCq0MdsDid5S2unbKmka_GZVqPU8vZPA"
              alt="Dog sleeping comfortably in cozy blankets"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <ServiceBadge icon="bed" label="Overnight Boarding" />
            <h2 className="font-bold text-3xl text-[#1b1c1c] mb-4">
              &apos;The Ultimate Cuddle Fest&apos;
            </h2>
            <p className="text-base leading-relaxed text-[#4d4633] mb-8 italic">
              &quot;So many beds to choose from, and the humans never stop scratching my
              belly. It&apos;s basically a sleepover party but better.&quot;
            </p>
            <BouncyBtn className="bg-[#ffd93d] text-[#725e00] w-fit">
              Reserve a Bed{" "}
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </BouncyBtn>
          </div>
        </div>
        </FadeIn>

        {/* ── Day Care (4 cols) ── */}
        <FadeIn delay={0.2} className="md:col-span-4 flex flex-col h-full">
          <div className="bg-[#bee0ff] rounded-[2rem] border-[3px] border-[#1b1c1c] p-8 flex flex-col justify-between shadow-[0_8px_0_0_#1b1c1c] hover:-translate-y-1 transition-transform duration-300 h-full">
            <div>
            <ServiceBadge icon="sports_baseball" label="Day Care" />
            <h2 className="font-bold text-2xl text-[#1b1c1c] mb-4">
              &apos;Friendship & Friskiness&apos;
            </h2>
            <p className="text-base leading-relaxed text-[#4d4633] mb-8 italic">
              &quot;I sniffed 42 butts today and chased a ball until I forgot what a
              ball was. 10/10 would bork again.&quot;
            </p>
          </div>
          <div className="h-48 rounded-[1rem] border-2 border-[#1b1c1c] overflow-hidden relative mb-6">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAonNDWV0iKYK355_CUsoJT36ojspZLB4vK5H2clWb_z-euQhOTLqd-2VhvOevG_KdwO8J9W4uoZFgeZMeL7I9IT37PtX6gpfnaxd4Xvs4b48kM3MBh775oDsDN3_T46GT2abebaw3u6jwDQjYM-D7yUbeE5MmrmaF3QPTuuqyl7ag_XmxLh2-I_m9-gRjOnilotGUX6LpK9CdytIDKOG1RvUAb1pGkns1y52TdVCbK0N5g6FJGHvHEl8EnzMVQI5KjzHzEAztKGQ"
              alt="Two dogs playing in the park"
              fill
              className="object-cover"
            />
          </div>
          <BouncyBtn className="bg-[#fcf9f8] text-[#1b1c1c] w-full">
            Join the Pack
          </BouncyBtn>
        </div>
        </FadeIn>

        {/* ── About Us (5 cols) ── */}
        <FadeIn delay={0.3} className="md:col-span-5 flex flex-col h-full">
          <div className="bg-[#ffdcc6] rounded-[2rem] border-[3px] border-[#1b1c1c] p-8 flex flex-col shadow-[0_8px_0_0_#1b1c1c] hover:-translate-y-1 transition-transform duration-300 h-full">
            <ServiceBadge icon="groups" label="About Us" />
          <h2 className="font-bold text-2xl text-[#1b1c1c] mb-4">
            &apos;The Pack Leaders&apos;
          </h2>
          <p className="text-base leading-relaxed text-[#4d4633] mb-6 italic">
            &quot;These humans are okay. They give the best ear scratches, throw the ball exactly 400 times, and never run out of treats.&quot;
          </p>
          <div className="h-40 rounded-[1rem] border-2 border-[#1b1c1c] overflow-hidden relative mb-6">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiYf-49EmJmtFcBJonfrBIC-uBqPx1VXfUY3w4Vw2TUw_4IF72DIrUJiDSY6qjZva36GIsxYTyS8GdwRTMZVqCQlIS3T6bMJdiWnmrRCeP61OUZw4RyrYBsmACFXqHE8WTeuN0YZ3KcUgtuemRr7kBSAbSJWmjCO9e2RB0EpQdcIUArALvPOM_reNQyk-rN_N6K5FsXomtUE9hO8OSOa8OGtL19z8Vsz1S1xK84kARUBhDzaT98u2e4KU67RhaquqlWjCOAjVYkA"
              alt="Sarah hugging her golden doodle"
              fill
              className="object-cover"
            />
          </div>
          <Link
            href="/about"
            className="mt-auto inline-flex items-center justify-center gap-2 font-bold text-sm py-4 px-8 rounded-full border-2 border-[#1b1c1c] border-b-[6px] active:translate-y-[4px] active:border-b-[2px] transition-all duration-150 bg-[#fcf9f8] text-[#1b1c1c] w-full"
          >
            Meet the Humans
          </Link>
        </div>
        </FadeIn>

        {/* ── Pick & Drop (7 cols) ── */}
        <FadeIn delay={0.4} className="md:col-span-7 flex flex-col h-full">
          <div className="bg-[#e8c426] rounded-[2rem] border-[3px] border-[#1b1c1c] p-8 flex flex-col md:flex-row gap-8 shadow-[0_8px_0_0_#1b1c1c] hover:-translate-y-1 transition-transform duration-300 h-full">
            <div className="flex-1 flex flex-col justify-center">
            <ServiceBadge icon="directions_car" label="Pick & Drop" />
            <h2 className="font-bold text-2xl text-[#1b1c1c] mb-4">
              &apos;The Doggy Limo&apos;
            </h2>
            <p className="text-base leading-relaxed text-[#554500] mb-8 italic">
              &quot;I get to stick my head out the window AND they drive me right to the
              fun place? Best. Ride. Ever.&quot;
            </p>
            <BouncyBtn className="bg-[#fcf9f8] text-[#1b1c1c] w-fit">
              Request a Ride
            </BouncyBtn>
          </div>
          <div className="flex-1 rounded-[1rem] border-2 border-[#1b1c1c] overflow-hidden h-48 md:h-auto relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU0phqXj9v_Pnvs7HbzXP5AqO7OfI9NTFO__599I3Y2h0YcbKyTVzMMY_GjD0wuPcZ3oWSPRdcRurK0n4Wr13mrFEHVhTbnTxoDKN_BcTE8JHLtBHPIuiQQuUlH5Vj95cDJtm-1HSSAvKntMv_dmiFar81hVGu8oGIh_9HA7eGbySJ6H4vw8Nd8lnkj-Eo8kVdV7MCjq6u5wwOpQTDBeqUg2EgAxxt0TF1Nj3XBk1mf7pAdQ88G6Tz3nzFTO9iKXFSuD13_ruPPw"
              alt="Happy golden retriever with head out car window"
              fill
              className="object-cover"
            />
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
