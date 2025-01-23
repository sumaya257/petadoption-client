import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';

const DonationCampaigns = () => {
  const [donations, setDonations] = useState([]);
  const axiosPublic = useAxiosPublic()
  // Fetch donations when the component mounts
  useEffect(() => {
    const fetchDonations = async () => {
        
      try {
        const response = await axiosPublic.get('/donations'); // this matches your backend endpoint
        const sortedDonations = response.data.sort((a, b) => new Date(b.
          createdAt
          ) - new Date(a.
            createdAt
            )); // Sort by date (descending)
        setDonations(sortedDonations);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Helmet><title>Donation-campaigns</title></Helmet>
      <h2 className="text-3xl font-bold text-center mb-6">Donation Campaigns</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={donation.petImage}
              alt={donation.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold dark:text-gray-700">{donation.name}</h3>
              <p className="text-gray-600">Max Donation: ${donation.maxDonation}</p>
              <p className="text-gray-600">Donated: ${donation.totalDonation || 0}</p>
              <p className="text-gray-600">Last Date: {donation.lastDate}</p>
              <div className="mt-4">
               <Link to={`/donation-details/${donation._id}`}> <button className="bg-green-500 text-white py-2 px-4 rounded">
                  View Details
                </button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationCampaigns;