import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-green-100 container mx-auto text-black  py-6 px-4 rounded-2xl mt-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-xl mb-6">
          Welcome to <strong>Our Pet Adoption Platform</strong> – your one-stop destination to find your forever friend!
        </p>

        {/* How It Works Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-semibold mb-4">How It Works</h3>
          <p className="text-lg mb-6">
            We make pet adoption simple! Here's a quick look at the steps involved in finding your new furry friend:
          </p>
          <div className="md:flex justify-center gap-12">
            {/* Workflow Steps */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white text-green-600 flex items-center justify-center rounded-full shadow-lg">
                <p className="font-semibold">Step 1</p>
              </div>
              <p className="text-lg mt-2">Browse Available Pets</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white text-green-600 flex items-center justify-center rounded-full shadow-lg">
                <p className="font-semibold">Step 2</p>
              </div>
              <p className="text-lg mt-2">Learn About Each Pet</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white text-green-600 flex items-center justify-center rounded-full shadow-lg">
                <p className="font-semibold">Step 3</p>
              </div>
              <p className="text-lg mt-2">Contact Shelters & Adoption Centers</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white text-green-600 flex items-center justify-center rounded-full shadow-lg">
                <p className="font-semibold">Step 4</p>
              </div>
              <p className="text-lg mt-2">Adopt Your New Friend!</p>
            </div>
          </div>
        </div>

        {/* Why We Created This Section */}
        <div className="md:flex gap-3">
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Why We Created This</h3>
          <p className="text-lg">
            We created this platform to make pet adoption accessible and easy for everyone. Every pet deserves a loving home, and we believe that technology can help bridge the gap between these wonderful animals and families who are ready to offer them one.
          </p>
        </div>

        {/* Join Us Section */}
        <div>
          <h4 className="text-2xl font-semibold mb-4">Join Us in Making a Difference</h4>
          <p className="text-lg">
            Every adoption story is special, and we are thrilled to be part of yours. Whether you’re here to adopt or just learn more about the process, we are here to support you every step of the way. Thank you for choosing us to help you find your new best friend!
          </p>
        </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
