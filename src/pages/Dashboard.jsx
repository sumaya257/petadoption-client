import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaPaw, FaListAlt, FaHeart, FaBullhorn, FaDonate } from 'react-icons/fa';
import Navbar from '../shared/Navbar';

const Dashboard = () => {
  return (
    <div>   
    <div className="flex">
      {/* Sidebar */}
      <div className="lg:w-64 md:w-36  min-h-screen bg-green-600 text-white flex flex-col">
        <div className="p-4 text-lg font-bold">Dashboard</div>
        <nav className="flex flex-col space-y-2 p-4 flex-1">
          <NavLink
            to="add-pet"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 p-2 rounded flex items-center'
                : 'p-2 rounded flex items-center hover:bg-gray-700'
            }
          >
            <FaPaw className="mr-2" />
            Add a Pet
          </NavLink>
          <NavLink
            to="my-added-pets"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 p-2 rounded flex items-center'
                : 'p-2 rounded flex items-center hover:bg-gray-700'
            }
          >
            <FaListAlt className="mr-2" />
            My Added Pets
          </NavLink>
          <NavLink
            to="adoption-request"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 p-2 rounded flex items-center'
                : 'p-2 rounded flex items-center hover:bg-gray-700'
            }
          >
            <FaHeart className="mr-2" />
            Adoption Request
          </NavLink>
          <NavLink
            to="create-donation-campaign"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 p-2 rounded flex items-center'
                : 'p-2 rounded flex items-center hover:bg-gray-700'
            }
          >
            <FaBullhorn className="mr-2" />
            Create Donation Campaign
          </NavLink>
          <NavLink
            to="my-donation-campaigns"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 p-2 rounded flex items-center'
                : 'p-2 rounded flex items-center hover:bg-gray-700'
            }
          >
            <FaBullhorn className="mr-2" />
            My Donation Campaigns
          </NavLink>
          <NavLink
            to="my-donations"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-700 p-2 rounded flex items-center'
                : 'p-2 rounded flex items-center hover:bg-gray-700'
            }
          >
            <FaDonate className="mr-2" />
            My Donations
          </NavLink>
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
