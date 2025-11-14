"use client";
import { AlignLeft } from "lucide-react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      
      <button
        onClick={() => setOpen(true)}
        className="md:hidden text-black hover:text-[#d18a42] transition-colors"
      >
        <AlignLeft className="w-6 h-6" />
      </button>

   
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default MobileMenu;
