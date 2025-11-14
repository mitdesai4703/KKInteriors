
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  const user = await currentUser();

 
  const plainUser = user
    ? {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        imageUrl: user.imageUrl,
      }
    : null;

  return (
    <header className="w-full bg-white">
      <div className="h-3 bg-[#d18a42]" />

      <div className="flex items-center justify-between py-4 px-8">
        <Link href="/" className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Kashth Kala Logo"
            width={220}
            height={120}
            className="object-contain cursor-pointer hover:opacity-90 transition-opacity"
            priority
          />
        </Link>

       
        <HeaderClient user={plainUser} />
      </div>
    </header>
  );
};

export default Header;
