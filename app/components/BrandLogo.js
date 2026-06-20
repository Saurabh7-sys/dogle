import Link from "next/link";
import { BRAND_NAME } from "@/lib/siteConfig";

const sizeMap = {
  sm: {
    badge: "w-9 h-9",
    paw: "text-xl",
    text: "text-base",
  },
  md: {
    badge: "w-10 h-10 sm:w-11 sm:h-11",
    paw: "text-xl sm:text-2xl",
    text: "text-base sm:text-xl",
  },
  lg: {
    badge: "w-12 h-12 sm:w-14 sm:h-14",
    paw: "text-2xl sm:text-3xl",
    text: "text-xl sm:text-2xl",
  },
};

const variantMap = {
  light: {
    badge: "bg-[#ffd93d] border-zinc-900 shadow-[0_3px_0_0_#1b1c1c] sm:shadow-[0_4px_0_0_#1b1c1c]",
    paw: "text-[#725e00]",
    bm: "text-[#725e00]",
    mid: "text-[#145c38]",
    care: "text-[#1f8a55]",
  },
  dark: {
    badge: "bg-white border-zinc-900 shadow-[0_3px_0_0_#145c38] sm:shadow-[0_4px_0_0_#145c38]",
    paw: "text-[#1f8a55]",
    bm: "text-[#ffe173]",
    mid: "text-white",
    care: "text-green-100",
  },
};

function BrandMark({ sizes, colors, showText = true, compact = false }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div
        className={`${sizes.badge} rounded-full border-2 flex items-center justify-center shrink-0 ${colors.badge}`}
      >
        <span
          className={`material-symbols-outlined ${sizes.paw} ${colors.paw} leading-none`}
          style={{ fontVariationSettings: "'FILL' 1" }}
          aria-hidden="true"
        >
          pets
        </span>
      </div>

      {showText && (
        <span
          className={`font-black ${sizes.text} tracking-tight leading-none whitespace-nowrap ${
            compact ? "hidden sm:inline" : "inline"
          }`}
        >
          <span className={colors.bm}>BM</span>
          <span className={colors.mid}> Pet </span>
          <span className={colors.care}>care</span>
        </span>
      )}
    </div>
  );
}

export default function BrandLogo({
  href,
  size = "md",
  variant = "light",
  className = "",
  name = BRAND_NAME,
  compact = false,
  showText = true,
}) {
  const sizes = sizeMap[size] || sizeMap.md;
  const colors = variantMap[variant] || variantMap.light;

  const mark = (
    <BrandMark
      sizes={sizes}
      colors={colors}
      showText={showText}
      compact={compact}
    />
  );

  const wrapperClass = `inline-flex min-w-0 max-w-full ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        aria-label={name}
        className={`${wrapperClass} hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200`}
      >
        {mark}
      </Link>
    );
  }

  return <div className={wrapperClass}>{mark}</div>;
}
