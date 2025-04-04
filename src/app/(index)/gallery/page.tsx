"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const events = [
  {
    title: "Charity Drive",
    images: [
      { id: 1, src: "/images/charity1.jpg", alt: "Charity Drive 1" },
      { id: 2, src: "/images/charity2.jpg", alt: "Charity Drive 2" },
    ],
  },
  {
    title: "Community Gathering",
    images: [
      { id: 3, src: "/images/gathering1.jpg", alt: "Community Gathering 1" },
      { id: 4, src: "/images/gathering2.jpg", alt: "Community Gathering 2" },
    ],
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string>("");

  return (
    <div className="min-h-screen text-orange-500 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-12">
        Our Media Gallery
      </h1>
      {events.map((event, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-orange-500 pl-4">
            {event.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {event.images.map((image) => (
              <motion.div
                key={image.id}
                className="cursor-pointer overflow-hidden rounded-xl drop-shadow-lg border hover:shadow-2xl transition duration-300"
                whileHover={{ scale: 1.05, rotate: 1 }}
                onClick={() => setSelectedImage(image.src)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  height={400}
                  width={400}
                  className="w-full h-35 lg:h-56 object-cover rounded-lg"
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Image
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-screen rounded-lg shadow-2xl border-4 border-yellow-500"
            />
            <button
              className="absolute top-6 right-6 text-white text-3xl font-bold bg-gray-800 rounded-full px-3 py-1 hover:bg-red-500 transition"
              onClick={() => setSelectedImage("")}
            >
              &times;
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
