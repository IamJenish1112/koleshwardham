"use client";

import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegBuilding,
  FaPhone,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import { IoMdEye } from "react-icons/io";
import { RiRocketLine } from "react-icons/ri";
import Logo from "@/assets/images/logo.jpg";
import Breadcrumb from "@/components/common/bread-crumb";
import Link from "next/link";

export default function AboutTrust() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-orange-500/20 to-blue-500/20 -z-10" />

      <section className="container mx-auto px-6 pb-16 pt-3 relative">
        {/* Breadcrumbs */}
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "About Trust" }]}
        />

        {/* Title with decorative elements */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 -z-10 flex justify-center items-center"
          >
            <div className="text-8xl font-extrabold text-orange-500/10">
              TRUST
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-center mt-8 text-gray-800 relative z-10"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
              About Trust
            </span>
          </motion.h1>

          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-3 rounded-full"
          />
        </div>

        {/* Trust Info Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center mt-12 bg-white shadow-xl rounded-xl p-8 overflow-hidden relative"
        >
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-100 rounded-full opacity-30" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-30" />

          <div className="relative z-10">
            <motion.div
              className="w-48 h-48 relative mx-auto md:mx-0"
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-red-500 animate-pulse opacity-50 scale-110" />
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative w-full h-full"
              >
                <img
                  src={Logo.src}
                  alt="Trust Logo"
                  className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
                />
              </motion.div>
              <div
                className="absolute -inset-2 rounded-full border-2 border-dashed border-orange-300 animate-spin-slow"
                style={{ animationDuration: "15s" }}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 md:mt-0 md:ml-12 text-center md:text-left relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Koleshwar Dham Trust
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 md:mx-0 mx-auto mt-3 mb-4" />
            <p className="mt-1 font-bold">Reg No: 4654564565616</p>
            <p className="text-gray-600 text-lg mt-2 leading-relaxed">
              A foundation dedicated to community service, spiritual growth, and
              social welfare. We aim to uplift communities through sustainable
              development and holistic approaches to societal challenges.
            </p>
          </motion.div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.4 }}
          className="my-16 text-center px-4 md:px-16"
        >
          <FaQuoteLeft className="text-4xl text-orange-300 inline-block mb-4" />
          <p className="text-xl md:text-2xl font-serif text-gray-700 italic">
            "Our purpose is to serve humanity with compassion and to create a
            world where every individual can thrive with dignity."
          </p>
          <FaQuoteRight className="text-4xl text-orange-300 inline-block mt-4" />
          <p className="text-gray-600 mt-2">- Founder, koleshwar Dham Trust</p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white p-8 rounded-xl shadow-xl mt-10 border-l-4 border-orange-500 hover:transform hover:scale-[1.01] transition-transform duration-300"
        >
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <div className="bg-orange-100 p-2 rounded-full mr-3">
              <FaRegBuilding className="text-orange-500 text-xl" />
            </div>
            Contact Information
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-start p-4 bg-orange-50 rounded-lg"
            >
              <div className="bg-orange-100 p-3 rounded-full mr-3">
                <FaMapMarkerAlt className="text-orange-500" />
              </div>
              <div>
                <h4 className="font-semibold">Address</h4>
                <p className="text-gray-600">Near River, koleshwar, India</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-start p-4 bg-orange-50 rounded-lg"
            >
              <div className="bg-orange-100 p-3 rounded-full mr-3">
                <FaEnvelope className="text-orange-500" />
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <a
                  href="mailto:info@koleshwardham.com"
                  className="text-orange-600 hover:underline"
                >
                  info@koleshwardham.com
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-start p-4 bg-orange-50 rounded-lg"
            >
              <div className="bg-orange-100 p-3 rounded-full mr-3">
                <FaPhone className="text-orange-500" />
              </div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <div className="mt-16">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-gray-800 text-center mb-10"
          >
            Our Vision & Mission
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-3" />
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, rotateY: 30 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-orange-500 relative overflow-hidden group"
            >
              <div className="absolute right-0 top-0 w-32 h-32 bg-red-100 rounded-bl-full -z-10 transition-all duration-300 group-hover:bg-red-200" />

              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-full">
                  <IoMdEye className="text-orange-500 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold ml-4 text-gray-800">
                  Our Vision
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                To create a world filled with{" "}
                <strong>compassion, faith, and social service</strong> where
                everyone can live with peace and prosperity. We envision
                communities where spiritual values guide sustainable development
                and collective wellbeing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotateY: -30 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-orange-500 relative overflow-hidden group"
            >
              <div className="absolute right-0 top-0 w-32 h-32 bg-blue-100 rounded-bl-full -z-10 transition-all duration-300 group-hover:bg-blue-200" />

              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-full">
                  <RiRocketLine className="text-orange-500 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold ml-4 text-gray-800">
                  Our Mission
                </h3>
              </div>

              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-orange-500 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    To <strong>support underprivileged communities</strong> with
                    education & healthcare initiatives that create lasting
                    impact.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-orange-500 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    To <strong>promote spiritual growth</strong> and traditional
                    values that enrich lives and strengthen communities.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-orange-500 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    To <strong>organize charity events</strong> and social
                    activities for the welfare of society's most vulnerable
                    members.
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "10+", label: "Years of Service" },
            { number: "50+", label: "Charitable Events" },
            { number: "1000+", label: "Families Supported" },
            { number: "20+", label: "Ongoing Projects" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100"
            >
              <motion.h3
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-3xl md:text-4xl font-bold text-orange-600"
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bank Details */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white p-8 rounded-xl shadow-xl mt-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white" />

          <h3 className="text-2xl font-bold text-gray-800 flex items-center relative z-10">
            <div className="bg-orange-100 p-2 rounded-full mr-3">
              <CiBank className="text-orange-500 text-xl" />
            </div>
            Bank Account Details
          </h3>

          <div className="mt-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="text-sm text-gray-500 uppercase">
                  Account Holder
                </h4>
                <p className="text-gray-800 font-medium text-lg">
                  koleshwar Dham Trust
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="text-sm text-gray-500 uppercase">Bank Name</h4>
                <p className="text-gray-800 font-medium text-lg">
                  State Bank of India
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="text-sm text-gray-500 uppercase">Account No</h4>
                <p className="text-gray-800 font-medium text-lg">9876543210</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="text-sm text-gray-500 uppercase">IFSC Code</h4>
                <p className="text-gray-800 font-medium text-lg">SBIN0001234</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href={"/donate"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all"
                >
                  Make a Donation
                </motion.button>
              </Link>
              <p className="text-gray-500 mt-3 text-sm">
                Your contribution helps us continue our mission of service
              </p>
            </div>
          </div>

          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-100 rounded-full opacity-50" />
        </motion.div>
      </section>
    </div>
  );
}
