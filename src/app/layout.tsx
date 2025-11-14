"use client";

// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Nav from "@/components/elements/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  const shouldHideNav = ["/auth/login", "/auth/signup"].includes(pathname);
  
  return (
    <html lang="en"
      style={{ ['--nav-height' as string]: '4rem' }}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`} >
        <SessionProvider>
          {!shouldHideNav && <Nav />}
          <main className="flex-1 relative z-10">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
