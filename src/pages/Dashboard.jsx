import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaPaw, FaListAlt, FaHeart, FaBullhorn, FaDonate,FaTrophy,FaHandsHelping } from 'react-icons/fa';
import Navbar from '../shared/Navbar';
import useAdmin from '../hooks/useAdmin';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  // Define a common link class
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'bg-gray-700 p-2 rounded flex items-center'
      : 'p-2 rounded flex items-center hover:bg-gray-700';

  return (
    <div>   
      <div className="flex">
        {/* Sidebar */}
        <div className="lg:w-64 md:w-36 min-h-screen bg-green-600 text-white flex flex-col">
        <Helmet><title>Dashboard</title></Helmet>
          <div className="p-4 text-lg font-bold">Dashboard</div>
          <nav className="flex flex-col space-y-2 p-4 flex-1">
            {isAdmin ? (
              <>
                <NavLink to="add-pet" className={navLinkClass}>
                  <FaPaw className="mr-2" />
                  Add a Pet
                </NavLink>
                <NavLink to="my-added-pets" className={navLinkClass}>
                  <FaListAlt className="mr-2" />
                  My Added Pets
                </NavLink>
                <NavLink to="adoption-request" className={navLinkClass}>
                  <FaHeart className="mr-2" />
                  Adoption Request
                </NavLink>
                <NavLink to="create-donation-campaign" className={navLinkClass}>
                  <FaBullhorn className="mr-2" />
                  Create Donation Campaign
                </NavLink>
                <NavLink to="my-donation-campaigns" className={navLinkClass}>
                  <FaBullhorn className="mr-2" />
                  My Donation Campaigns
                </NavLink>
                <NavLink to="my-donations" className={navLinkClass}>
                  <FaDonate className="mr-2" />
                  My Donations
                </NavLink>
                <div className="divider"></div>
                <NavLink to="all-users" className={navLinkClass}>
                  <FaTrophy className="mr-2" />
                  Users
                </NavLink>
                <NavLink to="all-pets" className={navLinkClass}>
                  <FaPaw className="mr-2" />
                   All Pets
                </NavLink>
                <NavLink to="all-donations" className={navLinkClass}>
                  <FaHandsHelping className="mr-2" />
                  All Donations
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="add-pet" className={navLinkClass}>
                  <FaPaw className="mr-2" />
                  Add a Pet
                </NavLink>
                <NavLink to="my-added-pets" className={navLinkClass}>
                  <FaListAlt className="mr-2" />
                  My Added Pets
                </NavLink>
                <NavLink to="adoption-request" className={navLinkClass}>
                  <FaHeart className="mr-2" />
                  Adoption Request
                </NavLink>
                <NavLink to="create-donation-campaign" className={navLinkClass}>
                  <FaBullhorn className="mr-2" />
                  Create Donation Campaign
                </NavLink>
                <NavLink to="my-donation-campaigns" className={navLinkClass}>
                  <FaBullhorn className="mr-2" />
                  My Donation Campaigns
                </NavLink>
                <NavLink to="my-donations" className={navLinkClass}>
                  <FaDonate className="mr-2" />
                  My Donations
                </NavLink>
              </>
            )}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <div className="">
            <Navbar></Navbar>
          </div>
          {/* Dynamic Content */}
          <div className="p-4 flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
