import React, { useContext, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import Select from 'react-select';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit'; // No need to import individual extensions
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const AddPet = () => {
  const { user } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const [categories] = useState([
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'rabbit', label: 'Rabbit' },
    { value: 'fish', label: 'Fish' },
  ]);

  // State to store uploaded image URL
  const [imageUrl, setImageUrl] = useState('');

  // Tiptap editor setup
  const editor = useEditor({
    extensions: [StarterKit], // No need to add individual extensions
    content: '',
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'petAdoption'); //preset
    formData.append('cloud_name', 'dxk6blzfu'); //  actual cloud name

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dxk6blzfu/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.url); // Save the image URL to state
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-green-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-primary">Add Your Pet</h2>
      <Formik
        initialValues={{
          name: '',
          age: '',
          category: '',
          location: '',
          shortDescription: '',
          longDescription: '', // Will hold the content from Tiptap
          petImage: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) errors.name = 'Required';
          if (!values.age) errors.age = 'Required';
          if (!values.category) errors.category = 'Required';
          if (!values.location) errors.location = 'Required';
          if (!values.shortDescription) errors.shortDescription = 'Required';
          if (!values.longDescription) errors.longDescription = 'Required';
          return errors;
        }}
        onSubmit={async (values) => {
          const petData = {
            ...values,
            petImage: imageUrl,
            addedDate: new Date().toISOString(),
            adopted: false,
            email: user.email,
          };

          try {
            const response = await axiosPrivate.post('/pets', petData);

            // Check if the backend response has `success: true`
            if (response.data.insertedId) {
              console.log('Pet added successfully', response.data);
            } else {
              console.log('Error in response:', response.data.message || 'Unknown error');
            }
          } catch (error) {
            console.error('Error adding pet:', error);
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="form-control">
              <label className="label">Pet Image</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={handleImageUpload}
              />
              {imageUrl && <img src={imageUrl} alt="Pet" className="w-32 h-32 object-cover mt-2" />}
              <ErrorMessage name="petImage" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-control">
              <label className="label">Pet Name</label>
              <Field
                name="name"
                type="text"
                className="input input-bordered w-full"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-control">
              <label className="label">Pet Age</label>
              <Field
                name="age"
                type="number"
                className="input input-bordered w-full"
              />
              <ErrorMessage name="age" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-control">
              <label className="label">Pet Category</label>
              <Field
                name="category"
                component={Select}
                options={categories}
                className="select select-bordered w-full"
                onChange={(option) => setFieldValue('category', option.value)} // Handle React Select change
              />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-control">
              <label className="label">Pet Location</label>
              <Field
                name="location"
                type="text"
                className="input input-bordered w-full"
              />
              <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-control">
              <label className="label">Short Description</label>
              <Field
                name="shortDescription"
                type="text"
                className="input input-bordered w-full"
              />
              <ErrorMessage name="shortDescription" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Tiptap Editor for Long Description */}
            <div className="form-control">
              <label className="label">Long Description</label>
              <EditorContent
                editor={editor}
                className="border border-gray-300 p-4 rounded-lg min-h-[200px]"
                onBlur={() => {
                  setFieldValue('longDescription', editor.getHTML());
                }}
              />
              <ErrorMessage name="longDescription" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn bg-green-500 w-full">
                Add Pet
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPet;
