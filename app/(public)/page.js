"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteStore } from "@/app/store/useSiteStore";
import { useHydration } from "@/app/hooks/useHydration";
import FadeIn from "@/app/components/FadeIn";

/* ── Review Card ── */
function ReviewCard({ quote, name, breed, age, avatarSrc, avatarBg }) {
  return (
    <div className="bg-[#fcf9f8] rounded-[2rem] p-8 border-3 border-[#1b1c1c] max-w-md relative shadow-[0_6px_0_0_#1b1c1c]">
      <span
        className="material-symbols-outlined absolute -top-4 -left-4 text-4xl text-[#ffd93d] bg-[#fcf9f8] rounded-full border-2 border-[#1b1c1c] shadow-[0_2px_0_0_#1b1c1c] p-1"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        format_quote
      </span>
      <div className="flex text-[#705d00] mb-4">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
        ))}
      </div>
      <p className="text-lg leading-relaxed text-[#1b1c1c] mb-6">"{quote}"</p>
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full ${avatarBg} flex items-center justify-center border-2 border-[#1b1c1c] overflow-hidden`}
        >
          <Image src={avatarSrc} alt={name} width={48} height={48} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-[#1b1c1c]">{name}</h4>
          <p className="text-sm text-[#4d4633]">
            {breed}, Age {age}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Feature Card ── */
function FeatureCard({ icon, iconBg, iconColor, title, description }) {
  return (
    <div className="bg-[#f0eded] rounded-[2rem] p-8 border-3 border-[#1b1c1c] relative hover:-translate-y-2 transition-transform duration-200 shadow-[0_6px_0_0_#1b1c1c]">
      <div
        className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center border-2 border-[#1b1c1c] mb-6 shadow-[0_4px_0_0_#1b1c1c]`}
      >
        <span
          className={`material-symbols-outlined ${iconColor} text-3xl`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>
      <h3 className="font-bold text-2xl text-[#1b1c1c] mb-4">{title}</h3>
      <p className="text-base leading-relaxed text-[#4d4633]">{description}</p>
    </div>
  );
}

export default function HomePage() {
  const { heroTitle, heroSubtitle, heroImage } = useSiteStore();
  const isHydrated = useHydration();

  return (
    <main className="pt-32 pb-20">
      {/* ── Hero ── */}
      <FadeIn>
        <section className="max-w-[1200px] mx-auto px-6 mb-16">
        <div className="relative bg-[#bee0ff] rounded-[3rem] p-8 md:p-16 border-3 border-[#1b1c1c] overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-[0_8px_0_0_#1b1c1c]">
          {/* Text */}
          <div className="relative z-10 flex-1">
            <h1 className="font-black text-5xl md:text-[48px] leading-[1.1] tracking-tight text-[#006697] mb-4 whitespace-pre-line">
              {isHydrated ? heroTitle : "The Ultimate Dog Sleepover!"}
            </h1>
            <p className="text-lg leading-relaxed text-[#006697] mb-8 max-w-lg whitespace-pre-line">
              {isHydrated
                ? heroSubtitle
                : "Where every day is a tail-wagging adventure. Boarding, daycare, and playdates designed for your best friend's joy."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#ffd93d] text-[#725e00] font-bold text-lg px-8 py-4 rounded-full border-2 border-[#1b1c1c] bouncy-button border-b-[#725e00] shadow-[0_6px_0_0_#1b1c1c]"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                pets
              </span>
              Book a Stay
            </Link>
          </div>

          {/* Hero Image */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-[#ffe173] rounded-full blur-3xl opacity-50" />
            <Image
              src={
                isHydrated
                  ? heroImage
                  : "https://lh3.googleusercontent.com/aida-public/AB6AXuAzqeKeX0pUZJeRH-UQoHmLIY1B05fkmDh1PW941ElHkfda3PtDWcCMdj-c-FVB3Q6Qv31hGQOk7eztxwRFVHDRvTm4qprZdG1idK6D97ete9AVnU5vGscchWV7tBZHuEcDzz1-mymugKsGGtXtJQalDLAijYAe8Kp7nZEu-aGQzFG8G3ClKBbrVwmIqdiIqc-aX4Mvy1gJgAl2z7qPtHNmcH_0qdX-3-cymnCcFOI_WLSPcvzAaS_JEfqrfcDvHFMReqfeZZwl2w"
              }
              alt="Hero image"
              width={400}
              height={400}
              className="relative z-10 rounded-full border-4 border-[#1b1c1c] shadow-[0_8px_0_0_#1b1c1c] w-full max-w-[400px] object-cover aspect-square mx-auto hover:rotate-3 transition-transform duration-300"
            />
          </div>

          {/* Decorative */}
          <span
            className="material-symbols-outlined absolute top-10 right-10 text-6xl text-[#e8c426] rotate-12 opacity-50"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            skeleton
          </span>
          <span
            className="material-symbols-outlined absolute bottom-10 left-10 text-6xl text-[#e8c426] -rotate-12 opacity-50"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            pets
          </span>
        </div>
      </section>
      </FadeIn>

      {/* ── Why Dogs Love It Here ── */}
      <FadeIn>
        <section className="max-w-[1200px] mx-auto px-6 mb-16">
        <h2 className="font-bold text-4xl text-center text-[#1b1c1c] mb-12">
          Why dogs love it here
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon="park"
            iconBg="bg-[#fc8200]"
            iconColor="text-[#5d2c00]"
            title="Huge Play Yards"
            description="Acres of fenced-in, soft grass perfect for zoomies and sunbathing with new pals."
          />
          <FeatureCard
            icon="bed"
            iconBg="bg-[#bee0ff]"
            iconColor="text-[#006697]"
            title="Cozy Suites"
            description="Private, quiet suites with orthopedic beds and soothing music for perfect zzz's."
          />
          <FeatureCard
            icon="favorite"
            iconBg="bg-[#ffd93d]"
            iconColor="text-[#725e00]"
            title="Endless Belly Rubs"
            description="Our staff are certified dog-lovers dedicated to giving your pup all the attention."
          />
        </div>
      </section>
      </FadeIn>

      {/* ── Services Bento ── */}
      <FadeIn>
        <section className="max-w-[1200px] mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doggy Daycare */}
          <div className="bg-[#ffdcc6] rounded-[2rem] p-8 border-3 border-[#1b1c1c] flex flex-col justify-between group shadow-[0_6px_0_0_#1b1c1c]">
            <div>
              <h3 className="font-bold text-3xl text-[#301400] mb-4">
                Doggy Daycare
              </h3>
              <p className="text-lg leading-relaxed text-[#713700] mb-6">
                Drop them off for a day of structured play, socialization, and nap
                times. Pick up a tired, happy pup.
              </p>
            </div>
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDasUr4vJegXa5abXsEA8U-7qvNTRUaexSgru_hC52ZCdnNV0Gj9jRY-KNB4LgkWQBlWX-ZrWl0H_H2qpJPyGZ1eDpmYkw0b_lgRM9U2qj76JX00PjWL-BB1oARHOe9zAJDAeA7MlIPEOI73s8cdl2mPjmpHN9t7Y3qiPQ4m1BF11UH_1bUrmjsNPTXcYJDfwY1CrcRdA9uVhEwaePJuZRcFLWHTG6SUdaarYpDcIEO5Sp7P3ZI2HfNVBrddwxZWyqft86Drc7BNg"
              alt="Dogs playing in daycare"
              width={600}
              height={200}
              className="w-full h-[200px] object-cover rounded-xl border-2 border-[#1b1c1c] shadow-[0_4px_0_0_#1b1c1c] group-hover:scale-[1.02] transition-transform"
            />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Luxury Boarding */}
            <div className="bg-[#cbe6ff] rounded-[2rem] p-8 border-3 border-[#1b1c1c] flex items-center justify-between group shadow-[0_6px_0_0_#1b1c1c]">
              <div className="pr-4">
                <h3 className="font-bold text-2xl text-[#001e30] mb-2">
                  Luxury Boarding
                </h3>
                <p className="text-base text-[#004b71]">
                  Overnight stays with premium comfort.
                </p>
              </div>
              <span
                className="material-symbols-outlined text-5xl text-[#001e30] bg-[#006495] rounded-full p-2 border-2 border-[#1b1c1c] shadow-[0_4px_0_0_#1b1c1c] group-hover:rotate-12 transition-transform"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                nightlight
              </span>
            </div>

            {/* About Us */}
            <Link href="/about" className="bg-[#ffe173] rounded-[2rem] p-8 border-3 border-[#1b1c1c] flex items-center justify-between group shadow-[0_6px_0_0_#1b1c1c] hover:-translate-y-1 transition-transform">
              <div className="pr-4">
                <h3 className="font-bold text-2xl text-[#221b00] mb-2">
                  Meet the Team
                </h3>
                <p className="text-base text-[#554500]">
                  The humans behind the belly rubs.
                </p>
              </div>
              <span
                className="material-symbols-outlined text-5xl text-[#221b00] bg-[#705d00] rounded-full p-2 border-2 border-[#1b1c1c] shadow-[0_4px_0_0_#1b1c1c] group-hover:rotate-12 transition-transform"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                groups
              </span>
            </Link>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* ── Wall of Joy Gallery Preview ── */}
      <FadeIn>
        <section className="max-w-[1200px] mx-auto px-6 mb-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-bold text-4xl text-[#1b1c1c]">Wall of Joy</h2>
          <Link
            href="/gallery"
            className="font-bold text-sm text-[#006495] hover:underline inline-flex items-center gap-1"
          >
            See more
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVp2pk5uuYsM6al4XjJAmsZgYkdUnvlfvNycyg8tF2eJ_z5BhINbmMNwJ2pdhh5N5-p2YWAgEKtJSJ-MA3RFpftYNJ_mH7_s1d7SlR9yhJ0szW9UUCoOshfRC7MBAIgimiOeMgLcbMzeqwEcTsTNe_nuoKO73-Ih26DBLtEjzKTVuuX4FsCy6_azz4mMN-W5hwdF6oiQLuIQpXj5-p4DA2oAS6NLlMkHjuSYL1EijQ2GEUuVskExv7WSalNyrQjeCZuklZC4pi6g",
              alt: "French bulldog smiling",
            },
            {
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpX5ySGcb9tPTqPR3J-fp0SP1azDDrKDchu6lHSdOsehcn6QNeZy5x_PTkFocCLEMytI77fJu3Emvcm_T3yg2_JCEJbBp79R_vTgzGFE2QooudB8coFJJYxpOYIeCv8HnnguIfGTNbG8v3mxBunZAQgbQWdJhudrKqbKFqTS6Yg6QEt0Pyuf9uq6iKBVDL8gScmJOAdRhbFro6ifm_0BbUxqF3YnArHjlfBHyPK6XbtJXKMFnR-l4nnEAuSNUyQu3mEBa_DKi0TQ",
              alt: "Golden doodle playing frisbee",
            },
            {
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwKvkERlU4SoC3FwgzO7vL3G0Im-rrSteWTu9A8WoCQRzyus_6NsddBWxt3c5BIl6gx78u78J8nrjJ_4a4Pltz-nIPnAQGPOGdtc-YMPuCyUDlLRy2BoW_wYbnGSrZxJDTSuPwx9l10KLt0NkwY3G1Q0eB1li6Tqz_8p4vsJ4o7NREFuYtCZWuDpptLFbTjNVpSqEOeOcC6l44APqqcyz8ySXYey0tw2-TebkuMn7I2uYgsHWwOhQ4LrXtauUvt9QgBZbfZpJHKQ",
              alt: "Puppy sleeping in round bed",
              className: "hidden md:block",
            },
            {
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCwvW9hqPSh0VHOQrugyQf6e-v_WQWn8F9pbgDxEup0QMFiFk6Clm-JwYPLt51PfZKv6BTu052iKAMyJgM4qBBmj6JmCbEX2bkuyb-jyK85qillb86r6MsItU3ss2QfTF_WBaHjtmvpx6P86Rd3xQSxpR0GFWc65aFbEJPHYj988gHEEvNvb13NFOMbQW9vS3TmXtJoUjs0bqGm2yO5zNP_Y3Rt_Idtwc8ezDAasxqf579wbElEHPQnPswjoTJzN_B_yUJ-YL8Mw",
              alt: "Happy corgi on grass",
              className: "hidden md:block",
            },
          ].map(({ src, alt, className = "" }, i) => (
            <div
              key={i}
              className={`rounded-[1rem] border-3 border-[#1b1c1c] overflow-hidden hover:scale-105 transition-transform shadow-[0_4px_0_0_#1b1c1c] ${className}`}
            >
              <Image
                src={src}
                alt={alt}
                width={300}
                height={300}
                className="w-full aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* ── Pawsitive Reviews ── */}
      <FadeIn>
        <section className="bg-[#e4e2e1] py-16 rounded-[3rem] mx-6 mb-16 border-3 border-[#1b1c1c] relative overflow-hidden shadow-[0_6px_0_0_#1b1c1c]">
        <div
          className="absolute bottom-0 w-full h-8 bg-green-500/20"
          style={{
            clipPath:
              "polygon(0% 100%, 5% 50%, 10% 100%, 15% 50%, 20% 100%, 25% 50%, 30% 100%, 35% 50%, 40% 100%, 45% 50%, 50% 100%, 55% 50%, 60% 100%, 65% 50%, 70% 100%, 75% 50%, 80% 100%, 85% 50%, 90% 100%, 95% 50%, 100% 100%)",
          }}
        />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <h2 className="font-bold text-4xl text-center text-[#1b1c1c] mb-12">
            Pawsitive Reviews
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <ReviewCard
              quote="WOOF! The beds are so squishy and I chased a tennis ball for like, an hour. 10/10 would bark again."
              name="Buster"
              breed="Labrador"
              age={3}
              avatarSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCMzZ2CWhi81DqtgT27AS3BGDsi51a3IHBkWKR7dpQb73vrgk6qlF4qi7OB2X2QKpimJj1IA1JIs33S-Nj0rnQlzYN3Mdn_kNrAEJ_RsLaz_cLeXf-Y_JRToUIQNmQTcbDGh225EkIt3DJdiErckpacEgqYWfIy6Z1Am27XiK5NkUsYf_bJ3ubk6TA8r7gGHtLxN63SPTVlj7Qh5kQ9sRaqVFEvE3DfZ2x5HwtfGDvbj9vjkdVJoUtu-vVyDkcUSa2X0i5-mH-_4A"
              avatarBg="bg-[#ffdcc6]"
            />
            <ReviewCard
              quote="The grooming spa was exquisite. They got exactly the right spots behind my ears. Highly recommended."
              name="Princess"
              breed="Poodle"
              age={5}
              avatarSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCKFav_lCd1diQZgR7vI5CgHu99K_fPLKwRXOvsna2KtlaUYKX59xwJvTviuS9j056UvqXP8sJdQQqQVOBnZO4DXrpR1ASZ0c9YmkY5uGrLzt_RN1c8KNZtpkJ__3ZZby_4eUDVyoNNAJPPRGQqSy_H2igHBZ2c9a2ef4CMPlVqk8R4Yt-76wXi0sHr_dkfKb6CjOSFoiqI1H-lN3IV4xQNZeGFbkmu66cHr1JPPdI7LGoGl0qpzvg81dz6Ida_yhnNoI5K_EhImw"
              avatarBg="bg-[#cbe6ff]"
            />
          </div>
        </div>
      </section>
      </FadeIn>
    </main>
  );
}
