import React, { useState } from "react";
import { motion } from "framer-motion";

const images = [
  {
    id: 1,
    src: "https://i.ibb.co.com/k9KM2dy/pexels-ron-lach-9985932.jpg",
    title: "Change a Life",
    text: "Adopting a pet is a life-changing decision that not only transforms their life but also brings unconditional love to yours.",
  },
  {
    id: 2,
    src: "https://i.ibb.co.com/L8JM6Qp/pexels-mikhail-nilov-7474345.jpg",
    title: "Make a Difference",
    text: "Every adoption creates a positive impact on an animal’s life and gives them a second chance at happiness.",
  },
  {
    id: 3,
    src: "https://i.ibb.co.com/QDspKwC/pexels-elly-fairytale-5860048.jpg",
    title: "Bring Happiness Home",
    text: "Find joy and companionship with a furry friend who will love you unconditionally and fill your home with happiness.",
  },
];

const CallToAction = () => {
  const [expanded, setExpanded] = useState(null);  // Initially no card is expanded

  // Toggle expansion function
  const toggleExpansion = (id) => {
    setExpanded(expanded === id ? null : id); // Toggle the expanded state
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-green-500 text-black container mx-auto mt-16 py-10 px-4 rounded-2xl">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Find Your Forever Friend</h2>
        <p className="text-xl mb-6">
          Every pet deserves a chance to live a happy and healthy life. Adopt
          today, and be a hero in an animal's life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map(({ id, src, title, text }) => (
          <motion.div
            key={id}
            className="relative overflow-hidden rounded-2xl shadow-lg bg-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={src}
              alt={title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p>
                {expanded === id
                  ? text
                  : `${text.slice(0, 60)}...`} {/* Show the first 60 characters */}
                <span
                  onClick={() => toggleExpansion(id)}
                  className="text-green-600 font-semibold cursor-pointer ml-2"
                >
                  {expanded === id ? "See Less" : "See More"}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CallToAction;
