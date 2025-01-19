import React, { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './payment/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_payment);

const DonationDetails = () => {
  const axiosPublic = useAxiosPrivate();
  const donation = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [recommendedDonations, setRecommendedDonations] = useState([]);
  const [donationAmount, setDonationAmount] = useState(''); // NEW: Donation amount state

  // Fetch recommended donations
  useEffect(() => {
    const fetchRecommendedDonations = async () => {
      try {
        const response = await axiosPublic.get('/donations?paused=false');
        const filteredDonations = response.data.filter(
          (item) => item._id !== donation._id
        );
        setRecommendedDonations(filteredDonations);
      } catch (error) {
        console.error('Error fetching recommended donations:', error);
      }
    };
    fetchRecommendedDonations();
  }, [axiosPublic, donation._id]);

  return (
    <div className="md:w-8/12 container mx-auto p-4">
      {/* Donation Details Section */}
      <div className="bg-white p-6 rounded shadow-md lg:flex gap-10">
        <div className="flex-1">
          <img
            src={donation.petImage}
            alt={donation.name}
            className="w-full h-full object-cover rounded-lg mb-4"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold">{donation.name}</h2>
          <p className="text-lg text-gray-600 mb-4">{donation.shortDesc}</p>
          <p className="text-md text-gray-500 mb-4">{donation.longDesc}</p>
          <p className="text-lg font-semibold">
            Maximum Donation: ${donation.maxDonation}
          </p>
          <p className="text-lg font-semibold">
            Deadline: {new Date(donation.lastDate).toLocaleDateString()}
          </p>
          <button
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
            onClick={() => setShowModal(true)}
          >
            Donate Now
          </button>
        </div>
      </div>

      {/* Recommended Donations Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Recommended Donations</h3>
        <div className="grid grid-cols-3 gap-4">
          {recommendedDonations.map((recommendation) => (
            <div
              key={recommendation._id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <img
                src={recommendation.petImage}
                alt={recommendation.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-semibold">{recommendation.name}</h4>
              <p className="text-sm text-gray-600 mb-4">
                {recommendation.shortDesc}
              </p>
              <Link to={'/donation-campaigns'}>
                <button className="bg-green-500 text-white py-2 px-4 rounded">
                  View Campaign
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Donation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">
              Donate to {donation.name}
            </h2>
            {/* Input field for donation amount */}
            <div className="mb-4">
              <label htmlFor="donationAmount" className="block text-lg font-medium mb-2">
                Enter Donation Amount
              </label>
              <input
                type="number"
                id="donationAmount"
                name="donationAmount"
                placeholder="Enter amount (e.g., 50)"
                className="input input-bordered w-full"
                value={donationAmount} // Bind input value to state
                onChange={(e) => setDonationAmount(e.target.value)} // Update state
                required
              />
            </div> 

            <Elements stripe={stripePromise}>
              <CheckoutForm donationAmount={donationAmount} /> {/* Pass amount */}
            </Elements>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-sm btn-outline text-gray-500 underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;
