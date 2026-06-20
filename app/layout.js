import "react-loading-skeleton/dist/skeleton.css";

export const metadata = {
  title: "BM Pet care - Premium Pet Care Services",
  description:
    "Luxury dog boarding, daycare, grooming and pick & drop services. Where every day is a tail-wagging adventure for your best friend.",
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

