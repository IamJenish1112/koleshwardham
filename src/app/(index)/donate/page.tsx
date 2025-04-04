"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaHandHoldingUsd,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaComment,
} from "react-icons/fa";
import Breadcrumb from "@/components/common/bread-crumb";
import { FaBookOpen, FaBowlFood, FaHandHoldingMedical } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { AiOutlineBook } from "react-icons/ai";

export default function DonationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Donation Data: ", formData);
    alert("Thank you for your generous donation! ❤️");
  };

  return (
    <section className="container mx-auto px-6 pb-12 pt-3">
      <Breadcrumb
        items={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Donate",
          },
        ]}
      />
      {/* Hero Section */}
      {/* <div
        className="relative mt-3 w-full h-[400px] bg-cover bg-center flex items-center justify-center text-white text-center"
        style={{ backgroundImage: "url('/images/donation-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-2xl"
        >
          <h1 className="text-4xl font-extrabold tracking-wide">
            🙏 Give the Gift of Hope & Kindness
          </h1>
          <p className="mt-3 text-lg">
            "Your small act of generosity can bring a big change in someone's
            life. Together, let's make a difference!"
          </p>
          <motion.a
            href="#donate"
            className="mt-6 inline-block bg-orange-500 text-white py-3 px-6 rounded-full font-semibold text-lg hover:bg-orange-600 transition duration-300 shadow-md"
            whileHover={{ scale: 1.1 }}
          >
            Donate Now ❤️
          </motion.a>
        </motion.div>
      </div> */}

      {/* Donation Form */}
      <div id="donate" className="mt-12 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🎗️ Make a Difference Today!
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Every donation helps us continue our mission of serving the
          underprivileged. Your generosity makes an impact!
        </p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-4 text-gray-500" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-4 text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Phone Number Field */}
          <div className="relative">
            <FaPhone className="absolute left-3 top-4 text-gray-500" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone Number"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Donation Amount Field */}
          <div className="relative">
            <FaHandHoldingUsd className="absolute left-3 top-4 text-gray-500" />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              placeholder="Donation Amount (₹)"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Note Field */}
          <div className="relative md:col-span-2">
            <FaComment className="absolute left-3 top-4 text-gray-500" />
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Leave a note (Optional)"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center">
            <motion.button
              type="submit"
              className="bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-orange-600 transition duration-300 shadow-md flex items-center justify-center w-full md:w-auto mx-auto"
              whileHover={{ scale: 1.05 }}
            >
              <FaHeart className="mr-2" /> Donate Now
            </motion.button>
          </div>
        </form>
      </div>

      {/* Impact Section */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          💖 See the Impact of Your Donation
        </h2>
        <p className="text-gray-600 mt-3">
          Your generosity is helping us provide **food, education, and medical
          aid** to those in need.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <motion.div
            className="bg-white text-orange-400  hover:scale p-6 rounded-lg drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-5">
              <div className="flex justify-center items-center rounded-full p-3 w-max bg-orange-100 text-orange-500">
                <IoFastFood size={30} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-0">500+ Meals Provided</h3>
                <p className="mt-2">Your support feeds hungry families.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="bg-white text-orange-400 p-6 rounded-lg drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-5">
              <div className="flex justify-center items-center rounded-full p-3 w-max bg-orange-100 text-orange-500">
                <FaBookOpen size={30} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-0">
                  300+ Children Educated
                </h3>
                <p className="mt-2">Education Changes lives for good</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="bg-white text-orange-400 p-6 rounded-lg drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-5">
              <div className="flex justify-center items-center rounded-full p-3 w-max bg-orange-100 text-orange-500">
                <FaHandHoldingMedical size={30} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-0">200+ Medical Camps</h3>
                <p className="mt-2">Providing healthcare to the needy.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
