import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";  // Import FontAwesome icons
import { Link } from "react-router";
import { Helmet } from "react-helmet";

const AllPets = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate()

  // Fetch pets data
  const { data: pets = [], isLoading, isError } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/pets", {});
      return res.data;
    },
  });

  // Delete pet mutation
  const deletePetMutation = useMutation({
    mutationFn: async (id) => {
      await axiosPrivate.delete(`/pets/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: 'Successfully deleted',
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["pets"]); // Refresh the pets data
    },
    onError: () => {
      alert("Failed to delete pet.");
    },
  });

  // Toggle adoption status mutation
  const toggleAdoptionMutation = useMutation({
    mutationFn: async ({ id, adopted }) => {
      await axiosPrivate.patch(`/pets/${id}`, { adopted });
    },
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: 'Status updated',
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["pets"]); // Refresh the pets data
    },
    onError: () => {
      alert("Failed to update adoption status.");
    },
  });

  // Loading and error handling
  if (isLoading) return <p>Loading pets...</p>;
  if (isError) return <p>Error loading pets. Please try again later.</p>;

  // Handlers
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deletePetMutation.mutate(id); // Proceed with the deletion
      }
    });
  };

  const toggleAdoptionStatus = (id, currentStatus) => {
    toggleAdoptionMutation.mutate({ id, adopted: !currentStatus });
  };

  return (
    <div className="p-5">
      <Helmet><title>Add-Pets</title></Helmet>
      <h2 className="text-2xl font-bold mb-4">All Pets</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200 dark:text-black">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Age</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Adopted</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{pet.name}</td>
                <td className="border border-gray-300 px-4 py-2">{pet.age}</td>
                <td className="border border-gray-300 px-4 py-2">{pet.category}</td>
                <td className="border border-gray-300 px-4 py-2">{pet.location}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {pet.adopted ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {/* Edit button */}
                  <Link to={`/dashboard/update-pet/${pet._id}`}>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    <FaEdit />
                  </button>
                  </Link>
                  {/* Delete button */}
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleDelete(pet._id)}
                  >
                    <FaTrash />
                  </button>
                  {/* Adopt/Not Adopt button */}
                  <button
                    className={`px-2 py-1 rounded ${
                      pet.adopted ? "bg-green-500 text-white" : "bg-yellow-500"
                    }`}
                    onClick={() => toggleAdoptionStatus(pet._id, pet.adopted)}
                  >
                    {pet.adopted ? <FaTimes /> : <FaCheck />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPets;
