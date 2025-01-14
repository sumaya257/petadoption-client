import React, { useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion for animation
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Arrow icons

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "How do I adopt a pet?",
      answer:
        "Simply browse our available pets, read their details, and get in touch with the shelter for the adoption process.",
    },
    {
      question: "What is the adoption process?",
      answer:
        "The adoption process involves selecting a pet, contacting the shelter, completing the necessary paperwork, and bringing your new companion home!",
    },
    {
      question: "Are there any adoption fees?",
      answer:
        "Adoption fees vary depending on the pet and shelter, but we work to ensure that the process is affordable and fair.",
    },
  ];

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="bg-green-100 text-black py-6 px-4 rounded-2xl mt-16 container mx-auto">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
            >
              <div
                onClick={() => toggleAnswer(index)}
                className="flex justify-between items-center"
              >
                <h3 className="text-xl text-green-500 font-bold">{faq.question}</h3>
                <motion.div
                  animate={{
                    rotate: expandedIndex === index ? 180 : 0,
                    transition: { duration: 0.3 },
                  }}
                >
                  {expandedIndex === index ? (
                    <FaChevronUp size={20} />
                  ) : (
                    <FaChevronDown size={20} />
                  )}
                </motion.div>
              </div>

              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-lg"
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
