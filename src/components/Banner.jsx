import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const Banner = () => {
  return (
    <div className="bg-gray-100  container mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        className="rounded-lg shadow-lg"
      >
        {/* Slide 1 */}
        <div className="relative">
          <img
            src="https://i.ibb.co.com/Cvn1NQg/pexels-impact-dog-crates-1789722873-28860755.jpg"
            alt="Adopt a Pet"
            className="h-96 w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold">
              Adopt Your Best Friend
            </h1>
          </div>
        </div>
        {/* Slide 2 */}
        <div className="relative">
          <img
            src="https://i.ibb.co.com/k9KM2dy/pexels-ron-lach-9985932.jpg"
            alt="Find Your Furry Companion"
            className="h-96 w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold">
              Find Your Furry Companion
            </h1>
          </div>
        </div>
        {/* Slide 3 */}
        <div className="relative">
          <img
            src="https://i.ibb.co.com/3CDgJ4K/pexels-impact-dog-crates-1789722873-28860738.jpg"
            alt="Give Them a Loving Home"
            className="h-96 w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold">
              Give Them a Loving Home
            </h1>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
