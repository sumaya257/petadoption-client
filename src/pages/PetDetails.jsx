import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Modal from "react-modal";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const PetDetails = () => {
  const axiosPublic = useAxiosPublic()
  const { user, loading } = useContext(AuthContext)

  const pet = useLoaderData(); // Access pet details from loader
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    userName: user?.displayName || 'login to fill this',
    email: user?.email || 'login to fill this'
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
      userName: user?.name, // Replace with actual user data
      email: user?.email, // Replace with actual user email
      phone: formData.phone,
      address: formData.address,
      adoptedDate: new Date().toISOString(),
    };

    axiosPublic
      .post("/adopt-pet", adoptionData, {
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
          <h1 className="text-3xl font-bold text-gray-700 mb-2">{pet.name}</h1>
          <p className="text-gray-600 mb-2">Age: {pet.age}</p>
          <p className="text-gray-600 mb-2">Category: {pet.category}</p>
          <p className="text-gray-600 mb-2">Location: {pet.location}</p>
          <p className="text-gray-700 mb-4">{pet.shortDescription}</p>
          <div
            className="prose prose-sm mb-4 text-gray-600"
            dangerouslySetInnerHTML={{ __html: pet.longDescription }}
          >
          </div>
          {/* Adopt Button */}
          <button
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => {
              if (!user) {
                Swal.fire({
                  title: "Please Log In",
                  text: "You need to log in to adopt a pet.",
                  icon: "warning",
                  confirmButtonText: "ok",
                  confirmButtonColor: "#3085d6",
                });
              } else {
                setIsModalOpen(true); // Opens the modal if the user is logged in
              }
            }}
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
        className="bg-white dark:bg-black p-6 rounded shadow-md max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Adopt {pet.name}</h2>
        <form onSubmit={handleSubmit}>
          {/* User Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">User Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName} // Automatically filled
              className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed dark:bg-black"
              placeholder="User Name"
              disabled // Prevent editing
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email} // Automatically filled
              className="w-full px-4 py-2 border rounded dark:bg-black cursor-not-allowed"
              placeholder="Email"
              disabled // Prevent editing
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter your phone number dark:bg-black"
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
              className="w-full px-4 py-2 border rounded dark:bg-black"
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
