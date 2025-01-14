import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md mb-10 sticky inset-0 z-10">
      <div className="container mx-auto px-2  flex justify-between items-center">
        {/* Logo and Website Name */}
        <NavLink to='/' className="flex items-center border pr-3 rounded-lg border-green-500 my-1">
          <img
            src="https://i.ibb.co.com/CWr6zJ5/pet-logo-removebg-preview.png" // Replace with your logo path
            alt="Pet Adoption Logo"
            className="h-20 w-24  object-contain"
          />
          <span className="text-2xl font-bold text-green-600">
            AdoptNest
          </span>
        </NavLink>

        {/* Navigation Links (Hidden on md screens) */}
        <div className="hidden md:flex items-center gap-6 justify-center flex-grow">
          <a href="/" className="text-gray-800  hover:text-green-500 hover:btn">
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
