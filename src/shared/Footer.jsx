import React from "react";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa"; // Import icons

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-100 to-green-500 text-black py-6 mt-16">
      <div className="container mx-auto text-center">
        <div className="mb-6">
          <h3 className="text-4xl font-bold">Connect With Us</h3>
          <p className="text-xl mt-2">
            Follow us on social media for the latest updates and news.
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-6">
          {/* Facebook Button with Color */}
          <Button
            variant="ghost"
            className="text-blue-600 hover:bg-gray-200 rounded-full p-3"
            aria-label="Facebook"
          >
            <FaFacebook size={28} />
          </Button>

          {/* Twitter Button with Color */}
          <Button
            variant="ghost"
            className="text-blue-400 hover:bg-gray-200 rounded-full p-3"
            aria-label="Twitter"
          >
            <FaTwitter size={28} />
          </Button>

          {/* Instagram Button with Color */}
          <Button
            variant="ghost"
            className="text-pink-500 hover:bg-gray-200 rounded-full p-3"
            aria-label="Instagram"
          >
            <FaInstagram size={28} />
          </Button>

          {/* Phone Number Button with Color */}
          <Button
            variant="ghost"
            className="text-green-600 hover:bg-gray-200 rounded-full p-3"
            aria-label="Phone Number"
          >
            <FaPhoneAlt size={28} />
          </Button>

          {/* Gmail Button with Color */}
          <Button
            variant="ghost"
            className="text-red-500 hover:bg-gray-200 rounded-full p-3"
            aria-label="Gmail"
          >
            <FaEnvelope size={28} />
          </Button>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p>&copy; 2025 Your Website. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
