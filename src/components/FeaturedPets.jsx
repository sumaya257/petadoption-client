import React from 'react';
import useAddedPets from '../hooks/useAddedPets';  // Import the hook

const FeaturedPets = () => {
  // Fetch added pets using the useAddedPets hook (no filters)
  const { pets, isLoading, isError, error } = useAddedPets({
    // You can add filters here if needed in the future
  });

  // Handle loading state
  if (isLoading) {
    return <div className="text-center">Loading pets...</div>;
  }

  // Handle error state
  if (isError) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  // Handle empty pets list
  if (pets?.length === 0) {
    return <div className="text-center">No featured pets found.</div>;
  }

  // Get the first 3 pets
  const featuredPets = pets.slice(0, 3);

  return (
    <div className="bg-gradient-to-r from-green-100 to-green-500 text-black container mx-auto mt-16 py-6 px-4 rounded-2xl">
        <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">Featured Pets</h2>
      <p className='text-xl mb-6'>Meet our carefully selected, highly adoptable pets looking for their forever homes!</p>
      </div>

      {/* Display the first 3 pets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {featuredPets.map((pet) => (
          <div key={pet.id} className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden group transition-transform duration-300 hover:scale-105">
            {/* Discount or Quality Badge */}
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-bl-lg">
              {pet.discount ? 'Special Offer' : 'Top Quality'}
            </div>

            {/* Pet Image */}
            <img
              src={pet.petImage || 'default-pet-image.jpg'} // Default image if no pet image
              alt={pet.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            
            {/* Pet Details */}
            <h3 className="text-xl font-semibold text-green-600">{pet.name}</h3>

            {/* Category and Location */}
            <p className="text-sm text-gray-600">{pet.category} - {pet.location}</p>

            {/* Description - Limited to 31 characters */}
            <p className="text-gray-700 mt-4">{pet.shortDescription.slice(0, 29)}{pet.shortDescription.length > 29 ? '...' : ''}</p>

            {/* View Details Link */}
            <a
              href={`/pet-listing/${pet._id}`}
              className="text-green-500 mt-4 inline-block hover:text-green-700"
            >
              View Details →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPets;
