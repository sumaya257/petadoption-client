import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Link, Navigate, useNavigate } from "react-router-dom";
import registerAnimation from "../assets/lottie/register.json";
import Lottie from "lottie-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { AuthContext } from "../providers/AuthProvider";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser,updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate()

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
    image: Yup.string().required("Image URL is required"),
  });

  // Submit Handler with SweetAlert2
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    createUser(values.email, values.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(values.name, values.image)
        // Success Alert
        .then(()=>{
          Swal.fire({
            title: "Success!",
            text: `Welcome, ${values.name}! Your account has been registered.`,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#4CAF50",
          });
  
          // Reset Form
          resetForm();
          navigate('/')
        })
        })
      .catch((error) => {
        // Handle duplicate email error or other auth errors
        if (error.code === "auth/email-already-in-use") {
          Swal.fire({
            title: "Error!",
            text: "This email is already registered. Please use a different email.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#F44336",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "An error occurred. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#F44336",
          });
        }
      });
  };

  return (
    <div className="container mx-auto px-4 py-6 rounded-2xl flex items-center justify-center bg-gradient-to-r from-green-100 to-green-500">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Register</h2>
          <p className="text-center text-gray-600 mb-6">
            Create your account to get started!
          </p>

          {/* Formik Form */}
          <Formik
            initialValues={{ name: "", email: "", password: "", image: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                {/* Name Field */}
                <div>
                  <Label htmlFor="name" className="text-gray-700">
                    Name
                  </Label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="mt-2 w-full border-gray-300 rounded-lg p-2"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-2 w-full border-gray-300 rounded-lg p-2"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="mt-2 w-full border-gray-300 rounded-lg p-2 pr-10"
                  />
                  {/* Toggle Password Visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? "👁️" : "🙈"}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <Label htmlFor="image" className="text-gray-700">
                    Image URL
                  </Label>
                  <Field
                    name="image"
                    type="text"
                    placeholder="Enter image URL"
                    className="mt-2 w-full border-gray-300 rounded-lg p-2"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>

          {/* Link to Login */}
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>

        {/* Animated Image Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block w-96"
        >
          <Lottie animationData={registerAnimation}></Lottie>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
