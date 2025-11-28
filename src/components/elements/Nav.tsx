"use client";

import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Nav = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkStyles = "text-gray-300 hover:text-white transition-colors duration-200";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-2xl shadow-black/40">
      <div className="container mx-auto px-6 flex justify-between items-center h-16">
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center shadow-lg border border-white/20">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="text-xl font-bold text-white">
            WeePull
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white focus:outline-none transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full backdrop-blur-xl bg-black/80 border-b border-white/10 shadow-xl z-40 md:hidden">
            <ul className="flex flex-col items-start space-y-1 px-6 py-4">
              {[
                { href: "/", label: "Dashboard" },
                { href: "/dataRequests", label: "Data Requests" },
                { href: "/about", label: "About" },
                { href: "/tips", label: "Tips" },
                { href: "/pricing", label: "Pricing" },
                { href: "/support", label: "Support" },
                { href: "/profile", label: "Profile" },
              ].map((item) => (
                <li key={item.href} className="w-full">
                  <Link 
                    href={item.href} 
                    className="block py-2 text-gray-300 hover:text-white hover:pl-2 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Center: Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <ul className="hidden md:flex space-x-6 items-center">
            <li>
              <Link href="/" className={navLinkStyles}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dataRequests" className={navLinkStyles}>
                Data Requests
              </Link>
            </li>
            <li className="group relative">
              <button className={`${navLinkStyles} focus:outline-none`}>
                Upload
              </button>
              {/* Submenu */}
              <ul className="absolute hidden group-hover:flex flex-col backdrop-blur-xl bg-black/80 border border-white/10 shadow-xl mt-4 py-2 w-36 rounded-xl overflow-hidden">
                {[
                  { href: "/upload/text", label: "Text" },
                  { href: "/upload/vision", label: "Vision" },
                  { href: "/upload/audio", label: "Audio" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link href="/about" className={navLinkStyles}>
                About
              </Link>
            </li>
            <li>
              <Link href="/tips" className={navLinkStyles}>
                Tips
              </Link>
            </li>
            <li>
              <Link href="/pricing" className={navLinkStyles}>
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/support" className={navLinkStyles}>
                Support
              </Link>
            </li>
            <li>
              <Link href="/profile" className={navLinkStyles}>
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side: Authentication */}
        <div className="flex items-center space-x-4">
          {!session ? (
            <Button 
              onClick={() => signIn()} 
              className="bg-cyan-600 hover:bg-cyan-500 text-white border border-white/10 shadow-lg transition-all duration-300"
            >
              Login
            </Button>
          ) : (
            <div className="relative group">
              <div className="w-10 h-10 bg-cyan-600 text-white flex items-center justify-center rounded-full cursor-pointer shadow-lg border border-white/20 transition-all duration-300">
                {session.user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute right-0 hidden group-hover:block backdrop-blur-xl bg-black/80 border border-white/10 shadow-xl rounded-xl mt-2 overflow-hidden min-w-[120px]">
                <button
                  onClick={() => signOut()}
                  className="block w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;