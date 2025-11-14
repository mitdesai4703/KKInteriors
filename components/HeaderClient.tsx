"use client";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { ClerkLoaded, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export default function HeaderClient({ user }: { user: any }) {
  return (
    <nav className="relative flex items-center justify-between w-full md:justify-end text-sm uppercase mb-8 px-4 md:px-0">
      <div className="flex items-center md:hidden">
        <MobileMenu />
      </div>

      <div className="hidden md:flex space-x-10 text-[15px] tracking-wide">
        <Link
          href="/product"
          className="text-black hover:text-[#d18a42] transition-colors duration-300"
        >
          Products
        </Link>
        <Link
          href="/about"
          className="text-black hover:text-[#d18a42] transition-colors duration-300"
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className="text-black hover:text-[#d18a42] transition-colors duration-300"
        >
          Contact Us
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-black hover:text-[#d18a42] transition-colors duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
          />
        </svg>

        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>

          {!user && (
            <SignInButton mode="modal">
              <button className="text-black hover:text-[#d18a42] transition-colors duration-300 cursor-pointer text-sm uppercase">
                Login
              </button>
            </SignInButton>
          )}
        </ClerkLoaded>
      </div>

      <div className="absolute -bottom-6 left-0 right-0 border-t-2 border-[#d18a42]" />
    </nav>
  );
}
