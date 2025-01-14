import React from "react";
import { motion } from "framer-motion";

const categories = [
    { name: "Cats", image: "https://i.ibb.co.com/XyCGVrN/pexels-pixabay-416160.jpg" },
    { name: "Dogs", image: "https://i.ibb.co.com/dD9GZDb/pexels-chevanon-1108099.jpg" },
    { name: "Rabbit", image: "https://i.ibb.co.com/0KQ0CBs/pexels-pixabay-247373.jpg" },
    { name: "Fish", image: "https://i.ibb.co.com/Ctdy3Cj/pexels-crisdip-35358-128756.jpg" },
];

const PetsCategory = () => {
    return (
        <div className="bg-green-50 rounded-2xl mt-16 py-6 px-4 container mx-auto">
            <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
                Explore Pet Categories
            </h2>
            <p className="text-xl mb-6">
                Discover a variety of pets waiting to be your new best friend. Click on a category to find your perfect companion!
            </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                    <motion.div
                        key={index}
                        className="relative p-4 bg-white rounded-lg shadow-lg flex items-center justify-around cursor-pointer hover:shadow-2xl transition-shadow"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        style={{
                            backgroundImage: `url(${category.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "200px",
                        }}
                    >
                        <h3 className="text-white text-lg font-bold bg-opacity-70 bg-green-500 p-2 rounded-r-lg">
                            {category.name}
                        </h3>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PetsCategory;
