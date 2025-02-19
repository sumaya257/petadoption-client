import React from 'react';
import emailjs from '@emailjs/browser';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaLinkedin, FaFacebook,  FaArrowCircleRight } from 'react-icons/fa'; // Add FaArrowDown for the arrow
import Swal from 'sweetalert2';

const Contact = () => {

  const form = React.useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_8j3y8av', 'template_wov0z5a', form.current, {
        publicKey: '-yuwBcOwYQ8c7snqC',
      })
      .then(
        () => {
          Swal.fire({
            title: 'Message Sent!',
            text: 'Thank you for reaching out. I will get back to you shortly.',
            icon: 'success',
            confirmButtonColor: '#6B5B95',
          });
          e.target.reset();
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again later.',
            icon: 'error',
            confirmButtonColor: '#FF6F61',
          });
        }
      );
  };

  return (
    <div id='contact' className="py-10 mt-16 contact-container flex flex-col md:flex-row px-10 space-y-10 md:space-y-0 shadow-[#F7CAC9] shadow-lg relative">
      {/* Left Side (Email Form) */}
      <div className="w-full md:w-1/2 bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-4xl font-bold text-[#6B5B95] mb-8 text-center">Contact Me</h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-[#2E4053] mb-2">Name</label>
            <input type="text" id="name" name="user_name" placeholder="Enter your name" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6B5B95] focus:outline-none" required />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-[#2E4053] mb-2">Email</label>
            <input type="email" id="email" name="user_email" placeholder="Enter your email" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6B5B95] focus:outline-none" required />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-[#2E4053] mb-2">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Write your message" className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6B5B95] focus:outline-none" required></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-3 bg-[#6B5B95] text-white font-semibold text-lg rounded-lg hover:bg-[#FF6F61] transition-all">Send Message</button>
        </form>
      </div>

      {/* Right Side (Contact Information) */}
      <div className="w-full md:w-1/2 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-4xl font-bold text-[#6B5B95] mb-6">Contact Information</h2>
        <div className="space-y-6">
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-[#6B5B95] mr-4" />
            <span className="text-lg">Dhaka, Bangladesh</span>
          </div>
          <div className="flex items-center">
            <FaPhoneAlt className="text-[#6B5B95] mr-4" />
            <span className="text-lg">+8801717521838</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-[#6B5B95] mr-4" />
            <a href="mailto:sumayaece19@gmail.com" target="_blank">
            <span className="text-lg underline decoration-[#6B5B95]">Email/sumaya</span>
            </a>
          </div>
          <div className="flex items-center">
            <FaWhatsapp className="text-[#6B5B95] mr-4" />
            <a href="https://wa.me/+8801717521838" target="_blank">
            <span className="text-lg underline decoration-[#6B5B95]">WhatsApp/sumaya</span>
            </a>
          </div>
          <div className="flex items-center">
            <FaLinkedin className="text-[#6B5B95] mr-4" />
            <a href="https://www.linkedin.com/in/sumaya-tabassum-tanna/" target="_blank" rel="noopener noreferrer">
              <span className="text-lg underline decoration-[#6B5B95]">LinkedIn/sumaya</span>
            </a>
          </div>
          <div className="flex items-center">
            <FaFacebook className="text-[#6B5B95] mr-4" />
            <a href="https://www.facebook.com/sumaya.tabassum.952448" target="_blank" rel="noopener noreferrer">
              <span className="text-lg underline decoration-[#6B5B95]">FaceBook/sumaya</span>
            </a>
          </div>
        </div>
      </div>

      {/* Arrow Animation */}
      <div className="absolute left-[-1/2] bottom-20 transform -translate-x-1/2 animate-ping">
        <FaArrowCircleRight className="text-[#FF6F61] text-xl animate-ping-slow" />
      </div>
    </div>
  );
};

export default Contact;
