import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const CreateDonationCampaign = () => {
  const [petImage, setPetImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate()
  const {user} = useContext(AuthContext)

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      maxDonation: '',
      lastDate: '',
      shortDesc: '',
      longDesc: '',
    },
    onSubmit: async (values) => {
      // Generate a unique ID based on timestamp and random number
      const campaignId = `campaign-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const campaignData = {
          petImage,
          name: values.name,
          maxDonation: values.maxDonation,
          lastDate: values.lastDate,
          shortDesc: values.shortDesc,
          longDesc: values.longDesc,
          createdAt: new Date().toISOString(),
          email:user.email,
          campaignId: campaignId,
          paused: false
        };
  
        try {
          const response = await axiosPrivate.post("/donations", campaignData);
          if (response.data.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Campaign Created!",
              text: "Your donation campaign has been created successfully.",
              confirmButtonText: "OK",
              timer: 3000, // Optional: Auto-close after 3 seconds
              timerProgressBar: true,
            });
            // console.log("Donation campaign added successfully:", response.data);
          } else {
            console.error("Error in response:", response.data.message || "Unknown error");
          }
        } catch (error) {
          console.error("Error adding donation campaign:", error);
        }
      },
    });
  

  // Handle image upload to Cloudinary
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'petAdoption'); //preset
      formData.append('cloud_name', 'dxk6blzfu'); //  actual cloud name
      setLoading(true);
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dxk6blzfu/image/upload',formData);
        // console.log(response.data)
        setPetImage(response.data.secure_url);
        setLoading(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-green-100 dark:text-black shadow-md rounded-lg">
      <Helmet><title>create-Donation</title></Helmet>
      <div className="w-full max-w-lg  p-6 rounded-lg shadow-lg dark:text-black">
        <h2 className="text-3xl font-bold text-center mb-6">Create Donation Campaign</h2>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Pet Picture Upload */}
          <div>
            <label className="block text-lg mb-2">Pet Picture:</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="block w-full border-2 p-2 rounded"
              required
            />
            {loading ? (
          <p className="text-blue-500">Uploading image...</p>
        ) : (
          petImage && <img src={petImage} alt="Uploaded Pet" className="w-32 h-32 object-cover mt-2" />
        )}

          </div>

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

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded mt-4"
          >
            {formik.isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationCampaign;
