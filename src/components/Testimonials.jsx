import React from "react";
import { FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jane Doe",
      message:
        "Adopting my dog from this platform was an amazing experience! I found the perfect companion, and the process was so easy. Thank you for all your help!",
      location: "New York",
      email: "jane.doe@example.com",
      facebook: "https://facebook.com/janedoe",
      twitter: "https://twitter.com/janedoe",
    },
    {
      name: "John Smith",
      message:
        "This website helped me adopt a cat that I am now in love with. The steps were clear, and I felt supported the whole way through.I appreciate your work.Good luck!",
      location: "California",
      email: "john.smith@example.com",
      facebook: "https://facebook.com/johnsmith",
      twitter: "https://twitter.com/johnsmith",
    },
    {
      name: "Sara Williams",
      message:
        "The process was so smooth and simple! I’m happy to say I’m now the proud owner of a wonderful pup. Highly recommend this platform!",
      location: "Texas",
      email: "sara.williams@example.com",
      facebook: "https://facebook.com/sarawilliams",
      twitter: "https://twitter.com/sarawilliams",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-green-100 to-green-500 text-black py-6 px-4 rounded-2xl mt-16 container mx-auto">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-xl mb-6">
          Our users are very satisfied with our project and inspire us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg italic mb-4">
                {testimonial.message.length > 150
                  ? `${testimonial.message.slice(0, 150)}...`
                  : testimonial.message}
              </p>
              <p className="font-semibold text-green-500">{testimonial.name}</p>
              <p className="text-gray-600">{testimonial.location}</p>
              <div className="flex space-x-4 mt-4 justify-center">
                <a
                  href={`mailto:${testimonial.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-700"
                >
                  <FaEnvelope size={20} />
                </a>
                <a
                  href={testimonial.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-700"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href={testimonial.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-700"
                >
                  <FaTwitter size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
