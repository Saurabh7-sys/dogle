import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/app/components/FadeIn";

export const metadata = {
  title: "Dogle - Wall of Wag Gallery",
  description:
    "Warning: Extreme cuteness ahead. Browse our gallery of happy dogs at Dogle.",
};

const galleryItems = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBy-ekyEN9vcHRLg6rSJau-oRNEqGQpzoCVCGdluL7AkVpoa2cLRFhoaFmAaZGO9Ot74Fjt6jCGeVGLEdUxV3zFW-Tm8ZfAIQQtLyJ_YVSLjjrTjOybQH5YorcHjHf8akbb7_fuTg-oatrtK_pv8cViIFzhAymlivqCtIR7T_kriFU8rxYvDAXv-cuEC5pd3FF6ENxjZ-egRfWnIyCWnSL5ZTYDvT-ecAttzcO7Z7vtI9TLJUpA3lo3RMA951YFgacBc1Ovw8ZWPA",
    alt: "Two dogs running through a sunny field",
    caption: "Maximum Zoomies Engaged 🚀",
    captionBg: "bg-[#ffd93d]",
    captionColor: "text-[#725e00]",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrf3udyzo62nNv9EY-LzAJzpAAS49D0QPR5RMeCs4TnfUj-mhMszATcOkBl_onPsq-HSOCaR_DU7kk4Bgvs6VoAih5tmCUvfvGmNUeccU90NSyuaXDsGF54it---SlmDutf6MUPE9_KCzOc1upJJCLl_x9ikKEo9ekJ3E2-19n5VUe2amptFzRgv0QqeNij1UylYVTs2y7xsLNW3VI8SltLHZTXeMCmdlh6sbb8snq4isDulwWZ75t6UP9gUB8oAVDx2S4A7MGWg",
    alt: "Bulldog in colorful knitted sweater",
    caption: "Ready for the runway (or the treat jar).",
    captionBg: "bg-[#bee0ff]",
    captionColor: "text-[#006697]",
    aspect: "aspect-[3/4]",
    badge: "Fashion Icon",
    badgeBg: "bg-[#fc8200]",
    badgeColor: "text-white",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPqtYjUF_SGJ--XbyPtmQCb7FFa0ljXNO9N_MwWrzwuCRwY_DMra0_hxxeaEURh1ccRKJvGn0DHgrUCqG9GbWCyX_v7n6hDbXMN2awwoACIKWBfl7gL4kOWMrwG9E8ETw5cxhj2bZOzqLz5sFQ0QL_ztqIIYB68-O6FWCCgLVYQsO3RpX0lWMo85SIsm8VzoIppdPu3oB8fD62uCCkow3TNbEr1S2dUvwfTpmmLlCdAFfISH49nR2bjps9n_eSatiKG8LBLzEwiw",
    alt: "Muddy but happy dog",
    caption: "Mistakes were made. Fun was had. 🐾",
    captionBg: "bg-[#ffdcc6]",
    captionColor: "text-[#301400]",
    aspect: "aspect-square",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzrwKb9Yx68xXYyuF788PNMiV5pKQNoXiNrkKfB-0Y2sY3iKVzQh1UmYK-JNpXJ9RwQa8kjpBiNP_3i6kS-fEktUnSBxO8qJLZFV6XdVbU3ASN-nNBcSm0kxbLria9OfmEu4Jb0XsHfQ4GlraGBiAR1Wx-U-zMUcOEv00QWtUcdbQCB74Z2_-SszWd0rGD7K_RHTvFz1Ss8mh4w7JhBNz2exDwoZb5OLPVxhjdGiRuEvsWgWBLyzILU2VSA102ZC-vZdqydfRmhQ",
    alt: "Golden retriever sleeping upside down",
    caption: "System shutdown complete. Zzz...",
    captionBg: "bg-[#e4e2e1]",
    captionColor: "text-[#4d4633]",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdlmV88_E7-zC-1Ik-cBt4euDA9M7dXV48vkgR9eIllio0jXZc1UX5rZeWHtbtXpT_rjdCOebPUzgRxIYSu6-R6Y_LnSZCQYVSTV4zl0Zk9wSiTuihV4wLwqAj7m1_NniqG382jH1DT8zLxriZme1zsw673cPHjfWi0_6cqp7mmAe3mzmFids2sFJRNrCTCl6MzELm5rmb6C3AOn5AU7s0i5s5zJUuAMt8fmZbHr4mJGBR6A7qo557TvRoCSIYdcTzmew7VLTIzA",
    alt: "Dog leaping to catch a frisbee",
    caption: "Air Bud energy today! ⚾",
    captionBg: "bg-[#ffdad6]",
    captionColor: "text-[#93000a]",
    aspect: "aspect-square",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgOGMGCj5Mms_msVBYB0IUTY0nHt6QFilUqoZiV47JekKdeyJNNfQwqaiW1oiqm4aXO-gcYphMPUoGtpxBy3W23EoqudeTkWL7mSAKELwLVyQSfVHq1p9YENjA5VU1ZWU9eedmUPbQ2Tkdo6nBecxiBJNEzfTWijcb7x7LKBWR-deEQhjIB4dyWYaFTp7I1nemFSqLkDNN3zYxUii8h7gwJjblbcapXDqOPohl6wVpeaMKzCt3MhWgJ5uCuU-Prc8nwDtW0wH4tA",
    alt: "Group of diverse dogs waiting for treats",
    caption: "The 'Waiting for Treats' Committee.",
    captionBg: "bg-[#8fcdff]",
    captionColor: "text-[#001e30]",
    aspect: "aspect-[16/9]",
  },
];

export default function GalleryPage() {
  return (
    <main className="pt-32 pb-20 flex-grow max-w-[1200px] mx-auto px-6">
      {/* Header */}
      <FadeIn>
        <header className="text-center mb-16 relative">
          <h1 className="font-black text-5xl md:text-[48px] leading-tight text-[#1b1c1c] mb-4 relative inline-block">
            The Wall of Wag
            <span
              className="material-symbols-outlined absolute -top-6 -right-8 text-[#fc8200] text-[48px]"
              style={{
                fontVariationSettings: "'FILL' 1",
                transform: "rotate(15deg)",
              }}
            >
              pets
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-[#4d4633] max-w-2xl mx-auto">
            Warning: Extreme cuteness ahead. Proceed at your own risk of
            uncontrollable smiling and spontaneous &quot;aww&quot;s.
          </p>
        </header>
      </FadeIn>

      {/* Masonry Grid */}
      <div className="masonry-grid">
        {galleryItems.map((item, i) => (
          <FadeIn key={i} delay={0.1 * (i % 3)} className="masonry-item relative group">
            <div className="bg-[#fcf9f8] rounded-[1rem] border-3 border-[#1b1c1c] overflow-hidden shadow-[0_6px_0_0_#1b1c1c] transition-transform duration-300 group-hover:-translate-y-2 relative">
              {item.badge && (
                <div
                  className={`absolute top-4 -left-4 z-10 ${item.badgeBg} ${item.badgeColor} text-sm font-bold py-1 px-4 rounded-full border-2 border-[#1b1c1c]`}
                  style={{ transform: "rotate(-12deg)" }}
                >
                  {item.badge}
                </div>
              )}
              <Image
                src={item.src}
                alt={item.alt}
                width={600}
                height={400}
                className={`w-full h-auto object-cover ${item.aspect}`}
              />
              <div className={`p-4 ${item.captionBg} border-t-2 border-[#1b1c1c]`}>
                <p className={`font-bold text-sm ${item.captionColor}`}>
                  {item.caption}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Load More */}
      <FadeIn delay={0.2}>
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 bg-[#ffd93d] text-[#725e00] font-bold text-sm py-4 px-8 rounded-full border-3 border-[#1b1c1c] interactive-squish hover:shadow-[0_6px_0_0_#1b1c1c]">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              refresh
            </span>
            Fetch More Photos
          </button>
        </div>
      </FadeIn>


    </main>
  );
}
