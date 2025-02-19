import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Blog = () => {
  const posts = [
    { 
      id: 1, 
      title: "🌱 How to Adopt a Pet", 
      content: "Adopting a pet is a beautiful journey! Learn how to choose the right pet, prepare your home, and provide lifelong care. Shelters to pet stores, find out the best options.",
      link: "https://www.wikihow.pet/Adopt-a-Pet-from-a-Shelter"
    },
    { 
      id: 2, 
      title: "🐾 Best Pet Care Tips", 
      content: "Your furry friend deserves the best! Explore essential tips on diet, exercise, grooming, and veterinary care to keep your pet happy and healthy. Take proper care.",
      link: "https://www.wikihow.com/Take-Care-of-Your-Pet"
    },
    { 
      id: 3, 
      title: "🐕 Training Your Puppy", 
      content: "Training is key to a well-behaved dog! Learn step-by-step methods for house training, obedience, and socialization to build a strong bond with your pup.",
      link: "https://www.thepuppyacademy.com/blog/2020/8/24/complete-puppy-training-schedule-by-age"
    },
  ];

  const titles = [
    "🐾 Adopt & Love Blog 🐾",
    "🌱 How to Adopt a Pet",
    "🐾 Best Pet Care Tips",
    "🐕 Training Your Puppy"
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 4000); // Change title every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="min-h-screen bg-green-100 text-green-900 p-12">
      {/* Dynamic Sliding Title */}
      <div className="h-20 relative flex justify-center items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.h2
            key={titles[currentTitleIndex]} // Key ensures re-render
            className="absolute text-4xl  font-bold text-green-500 drop-shadow-lg"
            initial={{ x: "100%", opacity: 0 }} // Start at right, hidden
            animate={{ x: "0%", opacity: 1 }} // Slide in to center
            exit={{ x: "-100%", opacity: 0 }} // Slide out to left
            transition={{ duration: 1, ease: "easeInOut" }} // Smooth transition
          >
            {titles[currentTitleIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Blog Cards */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
        {posts.map((post, index) => (
          <motion.div 
            key={post.id} 
            className="bg-white shadow-2xl rounded-3xl p-8 border-4 border-green-500 hover:scale-105 transition-transform duration-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.4 }} // Sequential appearance
          >
            <motion.h3 
              className="text-2xl font-bold text-green-600"
              animate={{ x: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              {post.title}
            </motion.h3>
            <p className="text-xl text-green-700 mt-4">{post.content}</p>
            <a 
             target="_blank" 
              rel="noopener noreferrer"
              href={post.link} 
              className="text-lg text-green-500 font-bold mt-4 inline-block hover:text-green-700 transition-colors"
            >
              Read More →
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
