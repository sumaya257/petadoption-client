import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLoaderData } from 'react-router';
import { useMutation } from '@tanstack/react-query';

const UpdateDonation = () => {
  const loader = useLoaderData();
  const axiosPrivate = useAxiosPrivate();

  // State for handling the pet image
  const [petImage, setPetImage] = useState(loader?.petImage || '');
  const [loading, setLoading] = useState(false);

  // useMutation for updating the donation campaign
  const updateDonationMutation = useMutation({
    mutationFn: async (campaignData) => {
      return await axiosPrivate.put(`/dashboard/update-donation/${loader?._id}`, campaignData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donation', loader?._id] });
    },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: loader.name || '',
      maxDonation: loader.maxDonation || '',
      lastDate: loader.lastDate || '',
      shortDesc: loader.shortDesc || '',
      longDesc: loader.longDesc || '',
    },
    onSubmit: async (values) => {
      const campaignData = {
        id: loader._id,
        petImage,
        name: values.name,
        maxDonation: values.maxDonation,
        lastDate: values.lastDate,
        shortDesc: values.shortDesc,
        longDesc: values.longDesc,
      };

      updateDonationMutation.mutate(campaignData); // Trigger the mutation
    },
  });

  // Handle image upload to Cloudinary
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'petAdoption'); // preset
      formData.append('cloud_name', 'dxk6blzfu'); // cloud name
      setLoading(true);
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dxk6blzfu/image/upload', formData);
        setPetImage(response.data.secure_url);
        setLoading(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-green-100 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Update Donation Campaign</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Pet Picture Upload */}
        <div>
          <label className="block text-lg mb-2">Pet Picture:</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="block w-full border-2 p-2 rounded"
          />
          {loading ? (
            <p className="text-blue-500">Uploading image...</p>
          ) : (
            petImage && <img src={petImage} alt="Uploaded Pet" className="w-32 h-32 object-cover mt-2" />
          )}
        </div>

        {/* Donation Name */}
        <div>
          <label className="block text-lg mb-2">Name:</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="block w-full border-2 p-2 rounded"
            required
          />
        </div>

        {/* Maximum Donation Amount */}
        <div>
          <label className="block text-lg mb-2">Maximum Donation Amount:</label>
          <input
            type="number"
            name="maxDonation"
            onChange={formik.handleChange}
            value={formik.values.maxDonation}
            className="block w-full border-2 p-2 rounded"
            required
          />
        </div>

        {/* Last Date of Donation */}
        <div>
          <label className="block text-lg mb-2">Last Date of Donation:</label>
          <input
            type="date"
            name="lastDate"
            onChange={formik.handleChange}
            value={formik.values.lastDate}
            className="block w-full border-2 p-2 rounded"
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-lg mb-2">Short Description:</label>
          <input
            type="text"
            name="shortDesc"
            onChange={formik.handleChange}
            value={formik.values.shortDesc}
            className="block w-full border-2 p-2 rounded"
            required
          />
        </div>

        {/* Long Description */}
        <div>
          <label className="block text-lg mb-2">Long Description:</label>
          <textarea
            name="longDesc"
            onChange={formik.handleChange}
            value={formik.values.longDesc}
            className="block w-full border-2 p-2 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded mt-4"
          disabled={updateDonationMutation.isLoading}
        >
          {updateDonationMutation.isLoading ? 'Updating Campaign...' : 'Update Campaign'}
        </button>
      </form>
    </div>
  );
};

export default UpdateDonation;
