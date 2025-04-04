"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const EVENTS = [
  {
    title: "Maha Shivratri Celebration",
    image: "/static-imges/2.jpg",
    description:
      "Immerse yourself in divine chants and soulful bhajans. Let the night be filled with devotion and blessings!",
    link: "/events/shivratri",
  },
  {
    title: "Diwali Mahotsav",
    image: "/events/diwali.jpg",
    description:
      "Step into a world of lights, happiness, and prosperity. Celebrate the festival of lights with grandeur!",
    link: "/events/diwali",
  },
  {
    title: "Guru Purnima",
    image: "/events/guru-purnima.jpg",
    description:
      "A heartfelt tribute to our spiritual guides. Seek wisdom, enlightenment, and divine blessings!",
    link: "/events/guru-purnima",
  },
];

export default function EventSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % EVENTS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? EVENTS.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-[90vw] w-full">
        <div className="container mx-auto lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Side - Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text mb-4">
              Events
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Celebrate special moments with us! From cultural festivals to
              spiritual gatherings, every event is an experience of joy, faith,
              and togetherness. Join us in making unforgettable memories!
            </p>
            <Link
              href="/events"
              className="inline-block bg-orange-600 text-white text-lg px-6 py-3 rounded-full hover:bg-orange-700 hover:scale-105 transition duration-300 shadow-lg"
            >
              View All Events
            </Link>
          </motion.div>

          {/* Right Side - Slider */}
          <div className="relative w-full h-[380px] md:h-[500px] overflow-hidden rounded-lg shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative w-full h-full rounded-lg overflow-hidden"
              >
                <img
                  src={EVENTS[currentIndex].image}
                  alt={EVENTS[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                {/* Dark Overlay with Glassmorphism */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-6 backdrop-blur-md rounded-lg">
                  <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
                    {EVENTS[currentIndex].title}
                  </h3>
                  <p className="text-white text-lg max-w-lg drop-shadow-md">
                    {EVENTS[currentIndex].description}
                  </p>
                  <Link
                    href={EVENTS[currentIndex].link}
                    className="mt-5 bg-orange-600 text-white text-lg px-6 py-3 rounded-full hover:bg-orange-700 hover:scale-105 transition duration-300 shadow-md"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-40 backdrop-blur-lg p-3 rounded-full shadow-lg hover:bg-opacity-80 transition"
            >
              <FiChevronLeft size={28} className="text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-40 backdrop-blur-lg p-3 rounded-full shadow-lg hover:bg-opacity-80 transition"
            >
              <FiChevronRight size={28} className="text-white" />
            </button>

            {/* Dots for navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {EVENTS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === index
                      ? "bg-orange-500 w-5"
                      : "bg-white opacity-60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
