import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Shikhbe Shobai | Empowering Bangladesh with World-Class Digital Skills & Sustainable Careers",
  description:
    "Join the most trusted physical & online learning ecosystem in Bangladesh. Master in-demand technologies under direct mentorship from Silicon Valley and Dhaka’s premier tech leaders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="bg-surface font-body-md text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
