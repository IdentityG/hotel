import type { Metadata } from "next";
import { Kaisei_Opti, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from '../components/common/Navbar';

const kaiseiOpti = Kaisei_Opti({
  variable: "--font-kaisei-opti",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rotal Luxury Hotel | Elegant Accommodations",
  description: "Experience luxury and comfort at Rotal Luxury Hotel. Book your stay today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kaiseiOpti.variable} ${plusJakartaSans.variable} antialiased bg-cream`}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}