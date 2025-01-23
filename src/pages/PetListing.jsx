import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAddedPets from '../hooks/useAddedPets';
import { Helmet } from 'react-helmet';
import Skeleton from 'react-loading-skeleton';

const PetListingPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { pets, isLoading, isError, error, refetch } = useAddedPets({
    search,
    category,
    adopted: false, // Fetch only pets that are not adopted
  });

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handler for category selection change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  if (isLoading) {
          return (
            <div className="flex justify-center items-center h-screen">
              <Skeleton height={24} width={300} count={3} className="mb-4 rounded-md" />
            </div>
          );
        }
        
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Pet-Listing</title>
      </Helmet>
      <h1 className="text-3xl font-semibold mb-4">Available Pets for Adoption</h1>

      {/* Search and Category Filters */}
      <form
        onSubmit={(e) => e.preventDefault()} // Prevent form submission
        className="mb-6 flex gap-4 items-center"
      >
        {/* Search Input */}
        <div>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded w-80"
            placeholder="Search by name"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="px-4 py-2 border rounded dark:text-gray-600"
          >
            <option value="">Select Category</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="rabbit">Rabbit</option>
            <option value="fish">Fish</option>
          </select>
        </div>
      </form>

      {/* Pet Cards Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets && pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet._id} className="bg-white p-4 rounded shadow-md">
              <img
                src={pet.petImage || '/default-pet.jpg'}
                alt={pet.name}
                className="w-full object-cover mb-4 rounded"
              />
              <h2 className="text-xl dark:text-gray-700 font-semibold">{pet.name}</h2>
              <p className="text-gray-600">Age: {pet.age}</p>
              <p className="text-gray-600">Location: {pet.location}</p>
              <div className="mt-4">
                <Link
                  to={`/pet-listing/${pet._id}`} // Link to view details
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No pets found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default PetListingPage;
