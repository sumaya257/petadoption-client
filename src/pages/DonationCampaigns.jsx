import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DonationCampaigns = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // Fetch donations when the component mounts
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axiosPublic.get('/donations'); // Fetch data from API
        const sortedDonations = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date
        setDonations(sortedDonations);
        setFilteredDonations(sortedDonations);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false); // Stop loading after data fetch
      }
    };

    fetchDonations();
  }, []);

  // Handle search input change
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = donations.filter((donation) =>
      donation.name.toLowerCase().includes(query)
    );
    setFilteredDonations(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Donation Campaigns</title>
      </Helmet>

      <h2 className="text-4xl font-semibold text-center mb-6">Donation Campaigns</h2>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search donations by name"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full sm:w-1/2 font-bold bg-white text-green-600 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Skeleton height={24} width={300} count={3} className="mb-4 rounded-md" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <div key={donation._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={donation.petImage} alt={donation.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold dark:text-gray-700">{donation.name}</h3>
                <p className="text-gray-600">Max Donation: ${donation.maxDonation}</p>
                <p className="text-gray-600">Donated: ${donation.totalDonation || 0}</p>
                <p className="text-gray-600">Last Date: {donation.lastDate}</p>
                <div className="mt-4">
                  <Link to={`/donation-details/${donation._id}`}>
                    <button className="bg-green-500 text-white py-2 px-4 rounded">View Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationCampaigns;
