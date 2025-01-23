import  {React, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { FaEdit, FaTrashAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Added icons
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Helmet } from 'react-helmet';



const MyAddedPets = () => {
    const {user} = useContext(AuthContext)
    const axiosPrivate = useAxiosPrivate()
    // console.log(user.email)
    const fetchPets = async (page, pageSize) => {
    const response = await axiosPrivate.get(`/pets/my-pets?email=${user.email}&page=${page}&limit=${pageSize}`
)
  return response.data.pets;
};
  const [pageIndex, setPageIndex] = useState(0); // Current page index
  const [pageSize, setPageSize] = useState(10);  // Number of items per page
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state
  const [selectedPet, setSelectedPet] = useState(null);  // Pet selected for delete
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' }); // Sorting state
 console.log(pageIndex,pageSize)

  // Query to fetch pets data
  const { data: pets, isLoading, refetch } = useQuery({
    queryKey: ['pets',user?.email, pageIndex, pageSize],
    queryFn: () => fetchPets(pageIndex, pageSize),
    keepPreviousData: true, // Keep the previous data while new data is loading
  });

  // Handle deleting pet
  const handleDeletePet = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const confirmDeletePet = async () => {
    if (selectedPet) {
      try {
        await axiosPrivate.delete(`/pets/${selectedPet._id}`);
        refetch();  // Refetch the data to reflect the deletion
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error deleting pet:', error);
      }
    }
  };

  // Handle adoption toggle
  const handleAdoptToggle = async (pet) => {
    try {
      const updatedPet = { ...pet, adopted: !pet.adopted }; // Toggle adoption status
      await axiosPrivate.patch(`/pets/${pet._id}`, updatedPet); // Update the pet in the database
      refetch();  // Refetch to get the latest pet data
    } catch (error) {
      console.error('Error toggling adoption:', error);
    }
  };

  // Handle pagination (next and previous)
  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
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
      <Helmet><title>MyAdded-Pet</title></Helmet>
      <h2 className="text-2xl font-bold mb-4">My Added Pets</h2>

      {/* Loading Indicator */}
      {isLoading && <div>Loading...</div>}

      {/* Table displaying pets */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100 dark:text-black">
            <tr>
              <th className="cursor-pointer p-2 border-b border-gray-300  text-left" onClick={() => handleSort('serial')}>#</th>
              <th className="cursor-pointer p-2 border-b border-gray-300 text-left" onClick={() => handleSort('name')}>Pet Name</th>
              <th className="cursor-pointer p-2 border-b border-gray-300 text-left" onClick={() => handleSort('category')}>Category</th>
              <th className="cursor-pointer p-2 border-b border-gray-300 text-left" onClick={() => handleSort('location')}>Location</th>
              <th className="cursor-pointer p-2 border-b border-gray-300 text-left" onClick={() => handleSort('adopted')}>Status</th>
              <th className="p-2 border-b border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPets?.map((pet, index) => (
              <tr key={pet._id} className="hover:bg-gray-50  dark:hover:bg-black">
                <td className="p-2 border-b border-gray-300">
                  <input
                    type="number"
                    value={index + 1 + pageIndex * pageSize} // Adjust serial number for pagination
                    className="w-12 border border-gray-300 dark:bg-black text-center"
                    readOnly
                  />
                </td>
                <td className="p-2 border-b border-gray-300">{pet.name}</td>
                <td className="p-2 border-b border-gray-300">{pet.category}</td>
                <td className="p-2 border-b border-gray-300">{pet.location}</td>
                <td className="p-2 border-b border-gray-300">
                  {pet.adopted ? (
                    <span className="text-green-500">Adopted</span>
                  ) : (
                    <span className="text-red-500">Not Adopted</span>
                  )}
                </td>
                <td className="p-2 border-b border-gray-300">
                  <Link to={`/dashboard/update-pet/${pet._id}`}>
                    <button className="text-blue-600 hover:text-blue-800 mr-2">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeletePet(pet)}
                    className="text-red-600 hover:text-red-800 mr-2"
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    onClick={() => handleAdoptToggle(pet)}
                    className={`text-xl ${pet.adopted ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {pet.adopted ? <FaCheckCircle /> : <FaTimesCircle />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Page Size Selector */}
      <div className="mt-4 flex items-center dark:text-black">
        <label htmlFor="pageSize" className="mr-2 dark:text-white">Items per page:</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
          className="p-2 border rounded"
        > <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Conditionally Render Pagination */}
      {pets?.length >pageSize && (
        <div className="mt-4">
          <button onClick={() => handlePageChange(pageIndex - 1)} disabled={pageIndex === 0} className="p-2 mr-2 bg-gray-200 hover:bg-gray-300 dark:text-white">
            Prev
          </button>
          <button
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={pets?.length < pageSize}
            className="p-2 bg-gray-200 hover:bg-gray-300 dark:text-white"
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
        <h3 className="text-lg font-semibold mb-4 dark:text-black">Are you sure you want to delete this pet?</h3>
        <div className="flex justify-between">
          <button
            onClick={confirmDeletePet}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyAddedPets;