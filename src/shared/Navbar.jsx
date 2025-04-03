// src/components/Navbar.js
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "../providers/ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();  // Access theme context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Logged Out!", "You have been successfully logged out.", "success");
      })
      .catch((error) => console.log(error));
  };

  // Centralized Auth Buttons
  const AuthButtons = () => {
    if (loading) {
      return <Skeleton circle={true} height={40} width={40} />; // Small circular image skeleton
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative group">
              <button className="flex items-center space-x-2">
                {/* Profile Picture */}
                <img
                  src={user.photoURL || "https://i.ibb.co/VWz30mJ/R.png"} // Default image if no user image exists
                  alt="Profile"
                  className="w-16 h-16 bg-green-100 rounded-full"
                />
              </button>
              {/* Email Display */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-800 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {user.email || "No Email"}
              </div>
            </div>

          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 bg-white shadow-lg">
            <DropdownMenuItem>
              <NavLink
                to="/dashboard"
                className="w-full text-left text-gray-800 hover:bg-green-100"
              >
                Dashboard
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogOut} className="text-red-500">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <>
        <Button variant="default" className="bg-green-500 text-white">
          <NavLink to="/login">Login</NavLink>
        </Button>
        <Button variant="outline" className="text-green-500 border-green-500">
          <NavLink to="/register">Register</NavLink>
        </Button>
      </>
    );
  };

  return (
    <nav className="bg-white shadow-md mb-10 sticky inset-0 z-10 dark:bg-green-100">
      <div className="container mx-auto px-2 flex justify-between items-center">
        {/* Logo and Website Name */}
        <NavLink
          to="/"
          className="flex items-center border pr-3 rounded-lg border-green-500 my-1"
        >
          <img
            src="https://i.ibb.co.com/CWr6zJ5/pet-logo-removebg-preview.png" // your logo path
            alt="Pet Adoption Logo"
            className="h-20 w-24 object-contain"
          />
          <span className="text-2xl font-bold text-green-600">AdoptNest</span>
        </NavLink>

        {/* Navigation Links (Hidden on sm screens) */}
        <div className="hidden md:flex items-center gap-6 justify-center flex-grow">
          <NavLink to="/" className="text-gray-800 hover:text-green-500 hover:btn">
            Home
          </NavLink>
          <NavLink to="/pet-listing" className="text-gray-800 hover:text-green-500 hover:btn">
            Pet Listing
          </NavLink>
          <NavLink to="/donation-campaigns" className="text-gray-800 hover:text-green-500 hover:btn">
            Donation Campaigns
          </NavLink>
          <NavLink to="/blogs" className="text-gray-800 hover:text-green-500 hover:btn">
            Blogs
          </NavLink>
          {/* Add Dashboard Link for Logged In Users */}
           {/* Main Dashboard Link */}
       {/* Main Dashboard Link with Arrow */}
       {user && (
        <div className="relative">
          <NavLink
            to="/dashboard"
            className="text-gray-800 hover:text-green-500 flex items-center"
            onClick={toggleDropdown} // Toggle dropdown when clicked
          >
            Dashboard
            <svg
              className={`ml-2 h-5 w-5 transform transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </NavLink>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {/* Routes for managing pets */}
                <NavLink to='profile' className="block text-gray-700 hover:bg-gray-100 px-4 py-2 text-sm">
                              
                              My Profile
                              </NavLink>
                <NavLink
                  to="/dashboard/add-pet"
                  className="block text-gray-700 hover:bg-gray-100 px-4 py-2 text-sm"
                >
                  Add Pet
                </NavLink>
                <NavLink
                  to="/dashboard/my-added-pets"
                  className="block text-gray-700 hover:bg-gray-100 px-4 py-2 text-sm"
                >
                  My Added Pets
                </NavLink>
                <NavLink
                  to="/dashboard/adoption-request"
                  className="block text-gray-700 hover:bg-gray-100 px-4 py-2 text-sm"
                >
                  Adoption Request
                </NavLink>
                <NavLink
                  to="/dashboard/create-donation-campaign"
                  className="block text-gray-700 hover:bg-gray-100 px-4 py-2 text-sm"
                >
                  Create Donation Campaign
                </NavLink>
                <NavLink
                  to="/dashboard/my-donation-campaigns"
                  className="block text-gray-700 hover:bg-gray-100 px-4 py-2 text-sm"
                >
                  My Donation Campaigns
                </NavLink>
                <NavLink
                  to="/dashboard/my-donations"
                  className="block text-gray-700 hover:bg-gray-100 px-4 py-2 text-sm"
                >
                  My Donations
                </NavLink>

                {/* Admin Routes */}
                <NavLink
                  to="/dashboard/all-users"
                  className="block text-gray-700 hover:bg-gray-100 px-4 py-2 text-sm"
                >
                  All Users
                </NavLink>
                <NavLink
                  to="/dashboard/all-pets"
                  className="block text-gray-700 hover:bg-gray-100 px-4 py-2 text-sm"
                >
                  All Pets
                </NavLink>
                <NavLink
                  to="/dashboard/all-donations"
                  className="block text-gray-700 hover:bg-gray-100 px-4 py-2 text-sm"
                >
                  All Donations
                </NavLink>
              </div>
            </div>
          )}
        </div>
      )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full mr-2 ${isDark ? "bg-black text-white" : "bg-white text-black"
            }`}
        >
          <MdOutlineDarkMode size={24} />
        </button>

        {/* Login/Register or Logout Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <AuthButtons />
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
          <DropdownMenuContent className="w-56 md:hidden bg-white shadow-lg">
            <DropdownMenuItem>
              <NavLink to="/" className="w-full text-left text-gray-800 hover:bg-green-100">
                Home
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NavLink to="/pet-listing" className="w-full text-left text-gray-800 hover:bg-green-100">
                Pet Listing
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NavLink to="/donation-campaigns" className="w-full text-left text-gray-800 hover:bg-green-100">
                Donation Campaigns
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col gap-2">
              {/* Reuse Auth Buttons */}
              <AuthButtons />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
