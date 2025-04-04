"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "@/assets/images/logo.jpg";
import Link from "next/link";
import { FaHandHoldingHeart, FaPeopleCarry, FaPray } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { FaBookOpen, FaHandHoldingMedical } from "react-icons/fa6";

export default function WhoWeAre() {
  return (
    <section className="relative white py-20 lg:my-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-[80vw] mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <div className="relative">
            <img
              src={Logo.src}
              alt="Temple Image"
              className="rounded-xl shadow-2xl border h-[75%]  lg:w-[75%] object-contain"
            />
          </div>
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-4xl text-center font-bold text-orange-600 mb-6">
            Who We Are
          </h2>
          <p className="text-lg text-zinc-900 leading-relaxed">
            **Shree Koleshwar Dham** is a spiritual trust dedicated to
            **preserving ancient traditions, promoting peace, and serving
            humanity**. Our mission is to create a divine space for worship,
            knowledge, and **selfless service**.
          </p>
          <p className="text-lg text-xinc-900 mt-4">
            We conduct **spiritual events, religious discourses, and charitable
            programs** to uplift society. Your support helps us **feed the
            hungry, educate children, and maintain sacred traditions**.
          </p>

          {/* Impact Highlights */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white shadow-md rounded-lg border border-orange-300">
              <IoFastFood className="text-orange-500 text-4xl mx-auto mb-2" />
              <h4 className="text-lg font-semibold text-gray-800">
                Food Distribution
              </h4>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg border border-orange-300">
              <FaBookOpen className="text-orange-500 text-4xl mx-auto mb-2" />
              <h4 className="text-lg font-semibold text-gray-800">
                Education Support
              </h4>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg border border-orange-300">
              <FaHandHoldingMedical className="text-orange-500 text-4xl mx-auto mb-2" />
              <h4 className="text-lg font-semibold text-gray-800">
                Medical Aid
              </h4>
            </div>
          </div>

          {/* Transparency Note */}
          <p className="mt-5 text-sm text-center text-gray-600 italic">
            "Every donation is used with transparency for the betterment of
            society."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
