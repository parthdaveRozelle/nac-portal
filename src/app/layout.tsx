import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/providers";
import { IReactNode } from "@/interfaces";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NAC Portal",
  description: "NAC Portal",
};

export default function RootLayout({ children }: IReactNode) {
  return (
    <html lang="en">
      <body className={barlow.variable}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
