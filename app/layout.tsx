import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zentry Remake | Joseph",
  description:
    "A high-performance gaming landing page remake inspired by Zentry.",
  keywords: [
    "Next.js",
    "GSAP",
    "Tailwind CSS",
    "Zentry",
    "Gaming",
    "Web Design",
  ],
  authors: [{ name: "Joseph" }],
  openGraph: {
    title: "Zentry Remake",
    description: "Explore the Metagame Layer.",
    images: ["/img/logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentry Remake",
    description: "A high-performance gaming landing page.",
    images: ["/img/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-general">{children}</body>
    </html>
  );
}
