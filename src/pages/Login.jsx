import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginAnimation from "../assets/lottie/login.json";
import Lottie from "lottie-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Helmet } from "react-helmet";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, googleSignIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Predefined Credentials
  const userCredentials = { email: "sumona@gmail.com", password: "12345aA!" };
  const adminCredentials = { email: "adoptnest@gmail.com", password: "12345aA!" };

  // Form Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // Form Submit Handler
  const handleSubmit = (values, { resetForm }) => {
    const { email, password } = values;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back, ${user.displayName || "User"}!`,
          confirmButtonColor: "#4CAF50",
        });
        resetForm();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          Swal.fire({
            icon: "error",
            title: "Email Not Registered",
            text: "Your email is not registered. Please register first.",
            confirmButtonColor: "#FF5733",
          });
        } else if (error.code === "auth/wrong-password") {
          Swal.fire({
            icon: "error",
            title: "Invalid Password",
            text: "The password you entered is incorrect. Please try again.",
            confirmButtonColor: "#FF5733",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Something went wrong. Please try again.",
            confirmButtonColor: "#FF5733",
          });
        }
        console.error("Login Error:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-6 rounded-2xl flex items-center justify-center bg-gradient-to-r from-green-100 to-green-500">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <Helmet><title>Login</title></Helmet>
          <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
          <p className="text-center text-gray-600 mb-6">Welcome back! Please login to your account.</p>

          {/* Formik Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setValues }) => (
              <Form className="space-y-4">
                {/* Auto-Fill Buttons */}
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => setValues(userCredentials)}
                  >
                    Login as User
                  </Button>
                  <Button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => setValues(adminCredentials)}
                  >
                    Login as Admin
                  </Button>
                </div>

                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-2 w-full border-gray-300 rounded-lg p-2 bg-white"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="mt-2 w-full border-gray-300 rounded-lg p-2 pr-10 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </button>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Login Button */}
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Login
                </Button>
              </Form>
            )}
          </Formik>

          {/* Divider */}
          <div className="flex items-center justify-between mt-4">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          {/* Google Login */}
          <div className="mt-4">
            <Button
              onClick={() => googleSignIn().then(result => navigate(from, { replace: true }))}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-100"
            >
              <FaGoogle size={20} className="text-red-500" />
              <span>Login with Google</span>
            </Button>
          </div>

          {/* Register Link */}
          <p className="text-center mt-4 text-gray-600">
            Are you not registered?{" "}
            <Link to="/register" className="text-green-500 hover:underline">
              Register here
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
          <Lottie animationData={loginAnimation} />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
