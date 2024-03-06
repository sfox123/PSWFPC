import React, { useEffect, useRef } from "react";
import astro from "../assets/astro.jpg";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
const NotFound = () => {
  const numStars = 100; // Change this value to change the number of stars
  const starsRef = useRef([]);

  useEffect(() => {
    starsRef.current.forEach((star, i) => {
      gsap.to(star, {
        x: `${Math.random() * 1000 - 500}px`,
        y: `${Math.random() * 1000 - 500}px`,
        duration: 2,
        repeat: -1,
        yoyo: true,
      });
    });
  }, []);
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-800 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3 p-4 mb-4">
            {/* Astronaut */}
            <img
              src={astro} // Replace with your image
              alt="Lost astronaut"
              className="rounded-full shadow-lg transform rotate-45 mx-auto"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-2/3 p-4">
            <h1 className="text-6xl font-bold text-white mb-4">
              Houston, we have a problem!
            </h1>
            <p className="text-lg text-white pb-4">
              Looks like you've gotten lost in the vast expanse of our website.
              Fear not, brave explorer! You can use the navigation links below
              to find your way back.
            </p>
            <nav className="flex justify-center z-10">
              <a href="/" className="p-2 bg-primary mr-4">
                Take me home!
              </a>
            </nav>
          </div>
        </div>
        {/* Stars and other space elements (optional) */}
        <div className="fixed top-0 left-0 w-full h-full">
          <svg
            className="absolute"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            {Array.from({ length: numStars }).map((_, i) => (
              <circle
                key={i}
                className="animate-twinkle"
                cx={`${Math.random() * 100}%`}
                cy={`${Math.random() * 100}%`}
                r={`${Math.random() * 2}`}
                fill="white"
                opacity={`${Math.random() * 0.2}`}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
