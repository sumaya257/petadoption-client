import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Select from 'react-select';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useLoaderData } from 'react-router';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

// UpdatePet component
const UpdatePet = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate()
  const loaderData = useLoaderData(); // Data from loader
  const [imageUrl, setImageUrl] = useState(loaderData?.petImage || ''); // Image URL state

  // Mutation to update pet data
  const updatePetMutation = useMutation({
    mutationFn: async (updatedPetData) => {
        return await axiosPrivate.put(`/pets/${loaderData?._id}`, updatedPetData);
      },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pet', loaderData?._id] });
      // SweetAlert after successful update
            Swal.fire({
              icon: 'success',
              title: 'Pet Form Updated!',
              text: 'The Pet Form has been successfully updated.',
              confirmButtonText: 'OK',
            });
    },
  });

  // Tiptap editor setup
  const editor = useEditor({
    extensions: [StarterKit],
    content: loaderData?.longDescription || '',
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'petAdoption');
    formData.append('cloud_name', 'dxk6blzfu');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dxk6blzfu/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-blue-100 dark:text-black shadow-md rounded-lg">
      <Helmet><title>Update-pet</title></Helmet>
      <h2 className="text-2xl font-semibold text-center text-primary dark:text-black">Update Pet</h2>
      <Formik
        enableReinitialize
        initialValues={{
          name: loaderData?.name || '',
          age: loaderData?.age || '',
          category: loaderData?.category || '',
          location:loaderData?.location || '',
          shortDescription: loaderData?.shortDescription || '',
          longDescription: loaderData?.longDescription || '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) errors.name = 'Required';
          if (!values.age) errors.age = 'Required';
          if (!values.category) errors.category = 'Required';
          if (!values.location) errors.location = 'Required';
          if (!values.shortDescription) errors.shortDescription = 'Required';
          return errors;
        }}
        onSubmit={(values) => {
          const updatedPetData = {
            ...values,
            petImage: imageUrl,
            longDescription: editor.getHTML(),
          };

          updatePetMutation.mutate(updatedPetData);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="form-control">
              <label className="label">Pet Image</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full bg-white"
                onChange={handleImageUpload}
              />
              {imageUrl && <img src={imageUrl} alt="Pet" className="w-32 h-32 object-cover mt-2" />}
            </div>

            <div className="form-control">
              <label className="label">Pet Name</label>
              <Field name="name" type="text" className="input input-bordered w-full bg-white" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-control">
              <label className="label">Pet Age</label>
              <Field name="age" type="number" className="input input-bordered w-full bg-white" />
              <ErrorMessage name="age" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-control">
              <label className="label">Pet Category</label>
              <Field
                name="category"
                component={Select}
                options={[
                  { value: 'dog', label: 'Dog' },
                  { value: 'cat', label: 'Cat' },
                  { value: 'rabbit', label: 'Rabbit' },
                  { value: 'fish', label: 'Fish' },
                ]}
                className="select select-bordered w-full bg-white"
                onChange={(option) => setFieldValue('category', option.value)}
                value={{ value: loaderData?.category, label: loaderData?.category }}
              />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-control">
              <label className="label">Pet Location</label>
              <Field name="location" type="text" className="input input-bordered w-full bg-white" />
              <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-control">
              <label className="label">Short Description</label>
              <Field name="shortDescription" type="text" className="input input-bordered w-full bg-white" />
              <ErrorMessage name="shortDescription" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-control">
              <label className="label">Long Description</label>
              <EditorContent
                editor={editor}
                className="border border-gray-300 p-4 rounded-lg min-h-[200px]"
                onBlur={() => {
                  setFieldValue('longDescription', editor.getHTML());
                }}
              />
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn ${updatePetMutation.isLoading ? 'btn-disabled' : 'bg-green-500'} w-full`}
              >
                {updatePetMutation.isLoading ? 'Updating...' : 'Update Pet'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePet;
