"use client";

import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Nav = () => {
  const { data: session } = useSession(); // Retrieve session details /////

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Left Side: Logo */}
        <Link href="/" className="text-xl font-bold text-black-600">
          WeePull
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md z-40 md:hidden">
            <ul className="flex flex-col items-start space-y-2 px-4 py-4">
              <li>
                <Link href="/" className="hover:text-blue-500">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dataRequests" className="hover:text-blue-500">
                  Data Requests
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-500">
                  About
                </Link>
              </li>
              <li>
                <Link href="/tips" className="hover:text-blue-500">
                  Tips
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-500">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-blue-500">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-blue-500">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Center: Navigation Links */}
        <div className="hidden md:flex space-x-8">
         <ul className="hidden md:flex space-x-6 items-center">
          <li>
          <Link href="/" className="hover:text-blue-500">
            Dashboard
          </Link>
          </li>
        <li>
          <Link href="/dataRequests" className="hover:text-blue-500">
            Data Requests
          </Link>
        </li>
        <li className="group relative">
          <button className="hover:text-blue-500 focus:outline-none">
            Upload
          </button>
          {/* Submenu */}
          <ul className="absolute hidden group-hover:flex flex-col bg-white shadow-lg mt-2 py-2 w-32">
            <li>
              <Link
                href="/upload/text"
                className="px-4 py-2 hover:bg-gray-100"
              >
                Text
              </Link>
            </li>
            <li>
              <Link
                href="/upload/vision"
                className="px-4 py-2 hover:bg-gray-100"
              >
                Vision
              </Link>
            </li>
            <li>
              <Link
                href="/upload/audio"
                className="px-4 py-2 hover:bg-gray-100"
              >
                Audio
              </Link>
            </li>
            </ul>
        </li>
        <li>
          <Link href="/about" className="hover:text-blue-500">
            About
          </Link>
        </li>
        <li>
          <Link href="/tips" className="hover:text-blue-500">
            Tips
          </Link>
        </li>
        <li>
          <Link href="/pricing" className="hover:text-blue-500">
            Pricing
          </Link>
        </li>
        <li>
          <Link href="/support" className="hover:text-blue-500">
            Support
          </Link>
        </li>
        <li>
          <Link href="/profile" className="hover:text-blue-500">
            Profile
          </Link>
        </li>
      </ul>
        </div>

        {/* Right Side: Authentication */}
        <div className="flex items-center space-x-4">
          {!session ? (
          // { !true ? (
            <Button onClick={() => signIn()} variant="outline">
            {/* <Button> */}
              Login
            </Button>
          ) : (
            <div className="relative group">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full cursor-pointer">
                {session.user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute right-0 hidden group-hover:block bg-white border shadow-md rounded-md mt-2">
                <button
                  onClick={() => signOut()}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
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