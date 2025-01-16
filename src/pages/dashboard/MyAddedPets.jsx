import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

// Fetch function using Axios for data
const fetchPets = async (page, pageSize) => {
  const response = await useAxiosPrivate().get(`/pets/my-pets?page=${page}&limit=${pageSize}`);
  return response.data.pets;
};

const MyAddedPets = () => {
  const [pageIndex, setPageIndex] = useState(0); // Current page index
  const [pageSize, setPageSize] = useState(10);  // Number of items per page
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state
  const [selectedPet, setSelectedPet] = useState(null);  // Pet selected for delete
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' }); // Sorting state
  const navigate = useNavigate();
  const queryClient = useQueryClient();  // To manage cache and refetch queries

  // Query to fetch pets data with updated object-based API
  const { data: pets, isLoading, refetch } = useQuery({
    queryKey: ['pets', pageIndex, pageSize],  // This is the query key
    queryFn: () => fetchPets(pageIndex, pageSize),  // This is the function to fetch data
    keepPreviousData: true,  // Keep the previous data while new data is loading
  });

  // Handle deleting pet
  const handleDeletePet = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const confirmDeletePet = async () => {
    if (selectedPet) {
      try {
        // Delete the pet directly using Axios
        await useAxiosPrivate().delete(`/pets/${selectedPet._id}`);

        // After successful deletion, refetch the pet data
        refetch();  // Refetch the data to reflect the deletion

        // Close the modal after deletion
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error deleting pet:', error);
      }
    }
  };

  // Handle pagination (next and previous)
  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);  // Update the page index
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));  // Update the page size
  };

  // Handle sorting columns
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort the pets array based on the sortConfig state
  const sortedPets = pets?.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">My Added Pets</h2>

      {/* Loading Indicator */}
      {isLoading && <div>Loading...</div>}

      {/* Table displaying pets */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="cursor-pointer p-2 border-b border-gray-300 text-left"
                onClick={() => handleSort('serial')}
              >
                # {/* Serial Number */}
              </th>
              <th
                className="cursor-pointer p-2 border-b border-gray-300 text-left"
                onClick={() => handleSort('name')}
              >
                Pet Name
              </th>
              <th
                className="cursor-pointer p-2 border-b border-gray-300 text-left"
                onClick={() => handleSort('category')}
              >
                Category
              </th>
              <th
                className="cursor-pointer p-2 border-b border-gray-300 text-left"
                onClick={() => handleSort('location')}
              >
                Location
              </th>
              <th className="p-2 border-b border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPets?.map((pet, index) => (
              <tr key={pet._id} className="hover:bg-gray-50">
                <td className="p-2 border-b border-gray-300">
                  <input
                    type="number"
                    value={index + 1 + pageIndex * pageSize} // Adjust serial number for pagination
                    className="w-12 border border-gray-300 text-center"
                    readOnly
                  />
                </td>
                <td className="p-2 border-b border-gray-300">{pet.name}</td>
                <td className="p-2 border-b border-gray-300">{pet.category}</td>
                <td className="p-2 border-b border-gray-300">{pet.location}</td>
                <td className="p-2 border-b border-gray-300">
                  <Link to={`/dashboard/update-pet/${pet._id}`}>
                  <button className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <FaEdit />
                  </button>
                  </Link>
                  <button
                    onClick={() => handleDeletePet(pet)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Page Size Selector */}
      <div className="mt-4 flex items-center">
        <label htmlFor="pageSize" className="mr-2">Items per page:</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
          className="p-2 border rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Conditionally Render Pagination */}
      {pets?.length > 10 && (
        <div className="mt-4">
          <button onClick={() => handlePageChange(pageIndex - 1)} disabled={pageIndex === 0} className="p-2 mr-2 bg-gray-200 hover:bg-gray-300">
            Prev
          </button>
          <button
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={pets?.length < pageSize}
            className="p-2 bg-gray-200 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal for Delete Confirmation */}
      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)} 
        className="w-96 p-6 bg-white rounded shadow-md mx-auto my-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this pet?</h3>
        <div className="flex justify-end space-x-2">
          <button onClick={confirmDeletePet} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800">
            Yes, Delete
          </button>
          <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyAddedPets;
