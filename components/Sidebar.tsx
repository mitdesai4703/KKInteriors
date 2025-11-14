"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const ref = useOutsideClick<HTMLDivElement>(() => {
    if (isOpen) onClose();
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <div
        ref={ref}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-[#d18a42] text-xl cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-start mt-16 px-6 space-y-6 text-sm font-medium">
          <a href="/" className="text-black hover:text-[#d18a42]">
            Home
          </a>
          <a href="/product" className="text-black hover:text-[#d18a42]">
            Products
          </a>
          <a href="/about" className="text-black hover:text-[#d18a42]">
            About Us
          </a>
          <a href="/contact" className="text-black hover:text-[#d18a42]">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
