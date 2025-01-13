import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Website Name */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Pet Adoption Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-2xl font-bold text-green-600">
            AdoptNest
          </span>
        </div>

        {/* Navigation Links (Hidden on md screens) */}
        <div className="hidden md:flex items-center gap-6 justify-center flex-grow">
          <a href="/" className="text-gray-800 hover:text-green-500">
            Home
          </a>
          <a href="/pet-listing" className="text-gray-800 hover:text-green-500">
            Pet Listing
          </a>
          <a
            href="/donation-campaigns"
            className="text-gray-800 hover:text-green-500"
          >
            Donation Campaigns
          </a>
        </div>

        {/* Login/Register Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="default" className="bg-green-500 text-white">
            <a href="/login">Login</a>
          </Button>
          <Button variant="outline" className="text-green-500 border-green-500">
            <a href="/register">Register</a>
          </Button>
        </div>

        {/* Hamburger Menu for Mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="md:hidden text-gray-800 focus:outline-none"
              aria-label="Toggle Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white shadow-lg">
            <DropdownMenuItem>
              <a href="/" className="w-full text-left text-gray-800 hover:bg-green-100">
                Home
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="/pet-listing" className="w-full text-left text-gray-800 hover:bg-green-100">
                Pet Listing
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="/donation-campaigns" className="w-full text-left text-gray-800 hover:bg-green-100">
                Donation Campaigns
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="/login" className="w-full text-left text-gray-800 hover:bg-green-100">
                Login
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="/register" className="w-full text-left text-gray-800 hover:bg-green-100">
                Register
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
