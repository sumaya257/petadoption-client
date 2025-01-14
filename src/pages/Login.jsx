import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import loginAnimation from "../assets/lottie/login.json";
import Lottie from "lottie-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container mx-auto px-4 py-6 rounded-2xl flex items-center justify-center bg-gradient-to-r from-green-100 to-green-500">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
          <p className="text-center text-gray-600 mb-6">
            Welcome back! Please login to your account.
          </p>

          <form className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-2"
              />
            </div>
            <div className="relative">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="mt-2 pr-10"
              />
              {/* Toggle Password Visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
              Login
            </Button>
          </form>

          <div className="flex items-center justify-between mt-4">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          {/* Social Login */}
          <div className="lg:flex lg:space-x-4 lg:space-y-0 space-y-4 mt-4">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-100"
            >
              <FaGoogle size={20} className="text-red-500" />
              <span>Login with Google</span>
            </Button>
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-100"
            >
              <FaFacebook size={20} className="text-blue-500" />
              <span>Login with Facebook</span>
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
          <Lottie animationData={loginAnimation}></Lottie>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
