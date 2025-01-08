"use client"

import { useState, Suspense, lazy } from "react";
import { WelcomeUser } from "@components/WelcomeUser";

// Cargar el Dropdown de manera diferida
const DropdownMenu = lazy(() => import("./DropdownUser"));

export default function HeaderInfoUser() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="w-full container bg-color-primary text-white py-2 sticky top-0 z-10 flex items-center justify-center px-8">
      <div className="px-4 flex gap-6 items-center">
        <p className="text-lg font-bold hidden sm:block ">
          New Features on GENOMAS
        </p>

        <button className="px-3 py-2 bg-color-secondary text-white text-base font-semibold rounded-md shadow-md hover:outline-dotted ">
          Learn More
        </button>
      </div>

      <div className="px-4 cursor-pointer ml-auto flex gap-6">
        <WelcomeUser />
        <div className="relative">
          <img
            src="/images/user.png"
            alt="User"
            className="h-8 w-8 rounded-full"
            onClick={toggleDropdown}
          />
          {dropdownVisible && (
            <Suspense fallback={<div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md text-black" />}>
              <DropdownMenu />
            </Suspense>
          )}
        </div>
      </div>
    </header>
  );
}
