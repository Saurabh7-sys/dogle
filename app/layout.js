import "react-loading-skeleton/dist/skeleton.css";

export const metadata = {
  metadataBase: new URL("https://www.bmpetcare.in"),

  title: {
    default: "BM Pet Care | Dog Boarding, Home Boarding, Daycare & Grooming",
    template: "%s | BM Pet Care",
  },

  description:
    "Premium dog home boarding with family — your pet stays in a loving home, not a kennel. Overnight boarding, daycare, bathing, grooming & pick-drop services in Mumbai. Safe, family-like care day and night. Book now at BM Pet Care.",

  keywords: [
    "dog home boarding",
    "pet home boarding",
    "home boarding with family",
    "dog stays with family",
    "no kennel dog boarding",
    "family dog boarding",
    "dog boarding",
    "pet boarding",
    "dog daycare",
    "overnight dog boarding",
    "night pet care",
    "dog bathing",
    "pet grooming",
    "dog grooming",
    "pet care services",
    "dog boarding near me",
    "pet boarding Mumbai",
    "dog daycare Mumbai",
    "dog boarding Thane",
    "dog hotel",
    "pet hotel",
    "dog sitting",
    "pet sitting",
    "dog pick and drop",
    "pet pick drop service",
    "luxury dog boarding",
    "24 hour pet care",
    "weekend dog boarding",
    "home away from home pet care",
  ],

  openGraph: {
    title: "BM Pet Care | Home Boarding, Daycare & Grooming",
    description:
      "Your pet stays in a real home with a loving family — not a kennel. Overnight boarding, daycare, bathing, grooming & pick-drop. BM Pet Care, Mumbai.",
    url: "https://www.bmpetcare.in",
    siteName: "BM Pet Care",
    images: [
      {
        url: "/icon.png",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "BM Pet Care | Home Boarding, Daycare & Grooming",
    description:
      "Your pet stays in a real home with a loving family — not a kennel. Overnight boarding, daycare, bathing & grooming in Mumbai.",
    images: ["/icon.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;700;800;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body
        style={{ fontFamily: "'Lexend', sans-serif" }}
        className="min-h-full flex flex-col bg-[#fcf9f8]"
      >
        {children}
      </body>
    </html>
  );
}