import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/app/components/FadeIn";

export const metadata = {
  title: "BM Pet care - How It Works (Dog POV)",
  description:
    "From Wag to Nap — see the full BM Pet care experience from your dog's perspective.",
};

const steps = [
  {
    side: "left",
    stepBg: "bg-[#ffd93d]",
    cardBg: "bg-[#fcf9f8]",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDieMDkoKJt0yf5qCMhTrm_JrL4fst6SZC1KED4NL63jjSUTy2bQYZ6STa273yzav3b_UpYdh8rPZu2AyBzqw38Am-LCYzDEsgH9oYXKN3hufCjYC9VJ5Ar99TVypQ_nRXyJctIz3vVbUd_xGNopL2_yCbpaxMWto605fZqLM6rNVkpK9j1DFg_AZpEjbwa1GAfCR1mVApRiKW-fmMjqYQxB8o7VX66bjuGHSloZzUalnCKLQbin6Qad5WKJoQBwqhQmlcwV2C3wg",
    imgAlt: "Dog wearing glasses looking at laptop",
    imgPos: "md:-top-10 md:-left-10",
    title: "The Human Clicks",
    titleColor: "text-[#1b1c1c]",
    bodyColor: "text-[#4d4633]",
    text: "I don't know what a 'website' is, but they stared at the glowing rectangle, clicked a big yellow thing, and then grabbed my leash. Usually, this means car ride! 🚗💨",
    stepLabel: "1",
  },
  {
    side: "right",
    stepBg: "bg-[#bee0ff]",
    cardBg: "bg-[#bee0ff]",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_du9DMEDIokzuGgSB92o4rQj3iSIepQfQ1WfWs2qvqG35nYb-Yybyfw35GBrR7mfRTZBk8JEoyAR1Odp_JlnSgZSFnj-s1j9M9i7RPorpSBDkFlGua4NozFqlWRnaDo9EnDl-amYH8sbU3RwZvCiJwna2Ot6ZqkLadW63nvRHrXV42aXtEoTBsfqY4G_8GXJRu_FVRDOsarLhj0DvD5GaAhI_GkTghrcfJcgJWUOt8ihnH9XSsVh6BQDjPdR35YNt6FW26nHpMA",
    imgAlt: "Golden retriever sniffing curiously",
    imgPos: "md:-top-10 md:-right-10",
    title: "The Grand Sniff-Off",
    titleColor: "text-[#006697]",
    bodyColor: "text-[#006697]",
    text: "We arrive! It smells like 100 new friends. I do the mandatory perimeter sniff check. The nice humans in yellow shirts know exactly where I like my ear scritches.",
    stepLabel: "2",
  },
  {
    side: "left",
    stepBg: "bg-[#fc8200]",
    cardBg: "bg-[#fcf9f8]",
    imgSrc: null,
    imgAlt: null,
    imgPos: null,
    decorativeIcons: ["sports_baseball", "sports_baseball", "sports_baseball"],
    title: "MAXIMUM ZOOMIES",
    titleColor: "text-[#1b1c1c]",
    bodyColor: "text-[#4d4633]",
    text: "I found a pal named Buster. We chased a tennis ball, then we chased each other, then we chased our own tails. The physics of this place are incredible.",
    stepLabel: "3",
  },
  {
    side: "right",
    stepBg: "bg-[#ffdad6]",
    cardBg: "bg-[#ffdad6]",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKs8T_ECgon-F0T0qeVNI5VXfKNuC3HbXERVeSmdymslq5x8W3IInRBQjJb3IRaoMX7OYpbUlSW7As5yZx1Irbel9c2Gqd61Ca3YMHL925zIlf5lqrkY__Wl_bCMtuCWu9WXgnGkhKJhewpemggMIfGZ2SU9QHIQPSpN_WobIctVBp9G1StTRQAJZ82--B4t1682BGndsJApryf5vcOvzHpXQYUMqvh6Uz37m7CGJRuvodRkPgVb7Tpt92NqCzMfNcB2utI3U3Tg",
    imgAlt: "Pug catching a treat mid-air",
    imgPos: "md:-bottom-8 md:-right-8",
    title: "The Magic Treat Drop",
    titleColor: "text-[#93000a]",
    bodyColor: "text-[#93000a]",
    text: "Just when I thought it couldn't get better, they brought out the peanut butter Kongs. I did a sit, a stay, AND a paw without even being asked. I am a genius.",
    stepLabel: "4",
  },
  {
    side: "left",
    stepBg: "bg-[#ffd93d]",
    cardBg: "bg-[#fcf9f8]",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjq_H5yS9JItBGuY4eSAPioctGTUOD13SNvcn9wq7nrkzqcuR5bAzv2Hxpg2n1yGFqf4tod99RPMHl0M2hwiYdlP_4JaU4n08KpXj3-VW_Mp8GmRZpOO6pcBwVSATiusBo3qjq27d_SCx0WytEI-5xSZkIko7ULDpgvoObWpb16y70q7KX1tRgdvPueg-nlhARUeIylFTXp8h4LYXv448uc4BWzT_Os_i0oD_DbpIp9mQxNu9LvinfFIuDYkTB7pAUusC48B6T6g",
    imgAlt: "French bulldog sleeping on a fluffy blanket",
    imgPos: "md:-bottom-10 md:-left-10 md:w-32 md:h-32",
    title: "The Big Snooze",
    titleColor: "text-[#1b1c1c]",
    bodyColor: "text-[#4d4633]",
    text: "Legs weak. Eyes heavy. Found the softest bed in the universe. Dreaming about that squirrel I almost caught. Ready to do it all again tomorrow. Zzz...",
    stepLabel: "5",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="pt-32 pb-32 max-w-[1200px] mx-auto px-4 sm:px-6">
      {/* Header */}
      <FadeIn>
        <header className="text-center mt-4 sm:mt-8 mb-16 sm:mb-24 relative px-4">
          <div className="hidden md:flex absolute -top-12 left-1/4 -rotate-12 w-20 h-20 bg-[#bee0ff] rounded-full border-4 border-[#1b1c1c] items-center justify-center shadow-[0_4px_0_0_#1b1c1c]">
            <span
              className="material-symbols-outlined text-5xl text-[#006697]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
          </div>
          <div className="hidden md:flex absolute top-8 right-1/4 rotate-6 w-16 h-16 bg-[#fc8200] rounded-full border-4 border-[#1b1c1c] items-center justify-center shadow-[0_4px_0_0_#1b1c1c]">
            <span
              className="material-symbols-outlined text-4xl text-white"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              skeleton
            </span>
          </div>
          <h1 className="font-black text-4xl sm:text-5xl md:text-[48px] leading-tight text-[#1b1c1c] mb-6 relative z-10">
            The Journey from{" "}
            <span className="text-[#705d00] bg-[#ffd93d] px-4 py-1 rounded-[1rem] border-4 border-[#1b1c1c] inline-block rotate-2">
              Wag
            </span>{" "}
            to{" "}
            <span className="text-[#006495] bg-[#bee0ff] px-4 py-1 rounded-[1rem] border-4 border-[#1b1c1c] inline-block -rotate-2">
              Nap
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-[#4d4633] max-w-2xl mx-auto">
            Listen close, fellow good boys and girls. This is exactly what happens
            when the Human finally gets the hint and clicks that shiny button. 10/10
            would bark again.
          </p>
        </header>
      </FadeIn>

      {/* Timeline */}
      <div className="relative w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-8">
        {/* Dashed center line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 transform -translate-x-1/2 dashed-path z-0" />

        <div className="relative z-10 flex flex-col gap-16 md:gap-24">
          {steps.map((step, i) => (
            <FadeIn
              key={i}
              className={`flex items-center w-full ${
                step.side === "right" ? "md:justify-end" : "md:justify-start"
              }`}
            >
              <div
                className={`w-full md:w-1/2 flex relative pl-16 pr-2 sm:pr-4 md:px-0 overflow-visible ${
                  step.side === "right"
                    ? "md:pl-12 justify-start"
                    : "md:pr-12 justify-start md:justify-end"
                }`}
              >
                {/* Step number bubble */}
                <div
                  className={`absolute ${
                    step.side === "right" ? "left-2 md:-left-6" : "left-2 md:left-auto md:-right-6"
                  } top-1/2 -translate-y-1/2 w-12 h-12 ${step.stepBg} rounded-full border-4 border-[#1b1c1c] flex items-center justify-center z-20 shadow-[0_4px_0_0_#1b1c1c] font-black text-lg text-[#1b1c1c]`}
                >
                  {step.stepLabel}
                </div>

                {/* Card */}
                <div
                  className={`${step.cardBg} w-full rounded-[2rem] border-[4px] border-[#1b1c1c] shadow-[0_8px_0_0_#1b1c1c] p-6 sm:p-8 max-w-md relative overflow-visible hover:-translate-y-2 hover:shadow-[0_12px_0_0_#1b1c1c] transition-all duration-300`}
                >
                  {step.imgSrc && (
                    <>
                      <div className="flex justify-center mb-4 md:hidden">
                        <div className="w-20 h-20 rounded-full border-4 border-[#1b1c1c] overflow-hidden bg-[#f0eded] shadow-[0_4px_0_0_#1b1c1c]">
                          <Image
                            src={step.imgSrc}
                            alt={step.imgAlt}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div
                        className={`hidden md:block absolute ${step.imgPos} ${
                          step.imgPos.includes("w-") ? "" : "w-24 h-24"
                        } rounded-full border-4 border-[#1b1c1c] overflow-hidden bg-[#f0eded] shadow-[0_4px_0_0_#1b1c1c] z-30`}
                      >
                        <Image
                          src={step.imgSrc}
                          alt={step.imgAlt}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </>
                  )}

                  {/* Decorative bouncing icons for step 3 */}
                  {step.decorativeIcons && (
                    <div className="absolute -top-8 sm:-top-12 left-1/2 -translate-x-1/2 flex gap-2">
                      {step.decorativeIcons.map((icon, j) => (
                        <span
                          key={j}
                          className="material-symbols-outlined text-3xl sm:text-4xl text-[#944a00] animate-bounce"
                          style={{
                            animationDelay: `${j * 0.2}s`,
                            fontVariationSettings: "'FILL' 1",
                          }}
                        >
                          {icon}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    className={
                      step.imgSrc
                        ? "md:pt-0 md:pl-12 md:pr-12"
                        : "mt-2 sm:mt-4"
                    }
                  >
                    <h3
                      className={`font-bold text-2xl sm:text-3xl ${step.titleColor} mb-2 sm:mb-4`}
                    >
                      {step.title}
                    </h3>
                    <p className={`text-lg leading-relaxed ${step.bodyColor}`}>
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* CTA */}
      <FadeIn>
        <div className="mt-20 sm:mt-32 text-center px-4">
          <div className="inline-block bg-[#ffd93d] w-full max-w-3xl rounded-[2rem] border-[4px] border-[#1b1c1c] p-8 sm:p-12 shadow-[0_8px_0_0_#1b1c1c]">
            <h2 className="font-bold text-2xl sm:text-3xl text-[#1b1c1c] mb-4 sm:mb-6">
              Ready for the best day ever?
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#4d4633] mb-6 sm:mb-8 max-w-lg mx-auto">
              Nudge your human, give them the puppy eyes, and point a paw at this
              big button.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 sm:gap-4 bg-[#705d00] text-white font-bold text-xl sm:text-2xl px-6 sm:px-10 py-4 sm:py-5 rounded-full border-[4px] border-[#1b1c1c] shadow-[0_6px_0_0_#1b1c1c] hover:translate-y-[3px] hover:shadow-[0_3px_0_0_#1b1c1c] active:translate-y-[6px] active:shadow-none transition-all duration-150"
            >
              <span
                className="material-symbols-outlined text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                front_hand
              </span>
              Bark to Book
            </Link>
          </div>
        </div>
      </FadeIn>
    </main>
  );
}
