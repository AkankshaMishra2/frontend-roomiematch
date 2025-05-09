import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMonoFont = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${robotoMonoFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}