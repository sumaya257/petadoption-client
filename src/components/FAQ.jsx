import React from "react";

const FAQ = () => {
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

  return (
    <section className="bg-gradient-to-r from-green-100 to-green-500 text-black py-16 px-8 rounded-2xl mt-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-lg">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
