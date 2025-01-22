import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Modal from "react-modal";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const PetDetails = () => {
    const axiosPublic = useAxiosPublic()
  const {user,loading} = useContext(AuthContext)

  const pet = useLoaderData(); // Access pet details from loader
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const adoptionData = {
      petId: pet._id,
      petName: pet.name,
      petImage: pet.petImage,
      userName: user.name, // Replace with actual user data
      email: user.email, // Replace with actual user email
      phone: formData.phone,
      address: formData.address,
      adoptedDate: new Date().toISOString(),
    };

    axiosPublic
    .post("http://localhost:5000/adopt-pet", adoptionData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    
    .then(() => {
      // Use SweetAlert for success notification
      Swal.fire({
        icon: 'success',
        title: 'Adoption request submitted successfully!',
        showConfirmButton: false,
        timer: 1500 // The alert will close after 1.5 seconds
      });
      setIsModalOpen(false);
    })
    
};

  return (
    <div className="md:w-8/12 container  mx-auto p-4">
      <div className="bg-white p-6 rounded shadow-md lg:flex gap-10">
        {/* Pet Details */}
        <div className="flex-1">
        <img
          src={pet.petImage}
          alt={pet.name}
          className="w-full h-full object-cover rounded mb-4"
        />
        </div>
        <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
        <p className="text-gray-600 mb-2">Age: {pet.age}</p>
        <p className="text-gray-600 mb-2">Category: {pet.category}</p>
        <p className="text-gray-600 mb-2">Location: {pet.location}</p>
        <p className="text-gray-700 mb-4">{pet.shortDescription}</p>
        <div
          className="prose prose-sm mb-4"
          dangerouslySetInnerHTML={{ __html: pet.longDescription }}
        >
        </div>
        {/* Adopt Button */}
        <button
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setIsModalOpen(true)}
        >
          Adopt {pet.name}
        </button>
        </div>

        
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="bg-white p-6 rounded shadow-md max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Adopt {pet.name}</h2>
        <form onSubmit={handleSubmit}>
          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter your address"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PetDetails;
