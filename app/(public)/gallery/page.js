"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FadeIn from "@/app/components/FadeIn";

// Colorful border and shadow palette matching the BM Pet care theme
const colorPalette = [
  { border: "border-[#ffd93d]", shadow: "shadow-[0_6px_0_0_#e6b800]" },
  { border: "border-[#fc8200]", shadow: "shadow-[0_6px_0_0_#cc6a00]" },
  { border: "border-[#ff6b6b]", shadow: "shadow-[0_6px_0_0_#cc4444]" },
  { border: "border-[#51cf66]", shadow: "shadow-[0_6px_0_0_#37a34d]" },
  { border: "border-[#339af0]", shadow: "shadow-[0_6px_0_0_#1a7fd4]" },
  { border: "border-[#cc5de8]", shadow: "shadow-[0_6px_0_0_#a33bc0]" },
  { border: "border-[#ff922b]", shadow: "shadow-[0_6px_0_0_#cc7422]" },
  { border: "border-[#20c997]", shadow: "shadow-[0_6px_0_0_#17a07a]" },
];

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const isLightboxOpen = selectedIndex !== null;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data.success) setImages(data.data);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft")
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : images.length - 1
        );
      if (e.key === "ArrowRight")
        setSelectedIndex((prev) =>
          prev < images.length - 1 ? prev + 1 : 0
        );
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isLightboxOpen, images.length]);

  return (
    <>
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

        {/* Loading State */}
        {loading ? (
          <div className="masonry-grid">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="masonry-item"
              >
                <div
                  className="rounded-[1rem] border-3 border-gray-200 overflow-hidden animate-pulse bg-gray-100"
                  style={{ height: `${200 + (i % 3) * 80}px` }}
                />
              </div>
            ))}
          </div>
        ) : images.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20">
              <span
                className="material-symbols-outlined text-7xl text-[#ffd93d] mb-4 block"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                photo_library
              </span>
              <p className="text-xl font-bold text-[#4d4633]">
                No photos yet! Check back soon for adorable dog pics. 🐾
              </p>
            </div>
          </FadeIn>
        ) : (
          /* Masonry Grid */
          <div className="masonry-grid">
            {images.map((img, i) => {
              const color = colorPalette[i % colorPalette.length];
              return (
                <FadeIn
                  key={img.id}
                  delay={0.08 * (i % 3)}
                  className="masonry-item relative group"
                >
                  <div
                    onClick={() => setSelectedIndex(i)}
                    className={`cursor-pointer rounded-[1rem] border-3 ${color.border} overflow-hidden ${color.shadow} transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg relative bg-white`}
                  >
                    <Image
                      src={img.src}
                      alt="Gallery photo"
                      width={600}
                      height={0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-auto block"
                    />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}
      </main>

      {/* Full-Screen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/95 backdrop-blur-md p-4 md:p-8"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-[#ffd93d] transition-colors z-50 p-2"
            aria-label="Close lightbox"
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev > 0 ? prev - 1 : images.length - 1
              );
            }}
            className="absolute left-2 md:left-8 text-white hover:text-[#ffd93d] transition-colors z-50 p-2 md:p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-full border-2 border-white/20 hover:border-white/50"
            aria-label="Previous image"
          >
            <span className="material-symbols-outlined text-3xl md:text-4xl">
              chevron_left
            </span>
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev < images.length - 1 ? prev + 1 : 0
              );
            }}
            className="absolute right-2 md:right-8 text-white hover:text-[#ffd93d] transition-colors z-50 p-2 md:p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-full border-2 border-white/20 hover:border-white/50"
            aria-label="Next image"
          >
            <span className="material-symbols-outlined text-3xl md:text-4xl">
              chevron_right
            </span>
          </button>

          {/* Image Container */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex].src}
              alt="Gallery photo full view"
              fill
              className="object-contain"
              sizes="100vw"
              quality={100}
              priority
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50">
            <span className="bg-zinc-800/80 text-white/80 px-4 py-2 rounded-full text-sm font-medium border border-white/10">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
