"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaHandshake,
  FaDonate,
} from "react-icons/fa";
import { MdVolunteerActivism } from "react-icons/md";
import Breadcrumb from "@/components/common/bread-crumb";
import Image from "next/image";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Valid 10-digit mobile number is required";
    if (!formData.subject.trim()) newErrors.subject = "Please select a subject";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="container mx-auto px-6 pb-16 pt-3">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      {/* Hero Section with Enhanced Background Image */}
      <div
        className="relative w-full h-[400px] mt-3 bg-contain bg-no-repeat bg-orange-400 bg-center flex items-center justify-center text-white overflow-hidden rounded-xl"
        // style={{ backgroundImage: "url('/static-imges/1.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-transparent bg-opacity-70"></div>
        <div className="relative z-10 text-center max-w-2xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-4"
          >
            Connect With Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-white"
          >
            Koleshwar Dham Trust is dedicated to spiritual guidance and
            community service. Reach out to us for donations, volunteer
            opportunities, or spiritual guidance.
          </motion.p>
        </div>
      </div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center my-12 max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg">
          At Koleshwar Dham Trust, we are committed to uplifting the community
          through spiritual guidance, charitable initiatives, and social work.
          We believe in serving humanity with compassion, integrity, and
          devotion.
        </p>
      </motion.div>

      {/* Ways to Connect Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3  gap-6 my-12"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-xl transition-all"
        >
          <div className="bg-orange-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FaHandshake className="text-3xl text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-center mb-2">Visit Us</h3>
          <p className="text-gray-600 text-center">
            Come experience the spiritual atmosphere and participate in our
            daily rituals and community events.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-xl transition-all"
        >
          <div className="bg-orange-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FaDonate className="text-3xl text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-center mb-2">Donate</h3>
          <p className="text-gray-600 text-center">
            Support our charitable initiatives through donations that help us
            serve the community better.
          </p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-xl transition-all"
        >
          <div className="bg-orange-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FaEnvelope className="text-3xl text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-center mb-2">Reach Out</h3>
          <p className="text-gray-600 text-center">
            Have questions? Fill out our contact form or contact us directly
            through phone or email.
          </p>
        </motion.div>
      </motion.div>

      {/* Contact Information and Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {/* Trust Information Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-orange-500"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            About Our Trust
          </h2>
          <p className="text-gray-600 mb-6">
            Koleshwar Dham Trust is a spiritual sanctuary nestled in the serene
            environment near the river. We welcome devotees and visitors seeking
            peace, spiritual guidance, and an opportunity to contribute to
            meaningful social causes.
          </p>
          <div className="space-y-6">
            <div className="flex items-start">
              <FaMapMarkerAlt className="text-orange-500 mr-3 text-xl mt-1" />
              <div>
                <h4 className="font-bold text-gray-700">Address</h4>
                <p className="text-gray-600">
                  Near River, Koleshwar, Maharashtra, India - 416508
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaEnvelope className="text-orange-500 mr-3 text-xl mt-1" />
              <div>
                <h4 className="font-bold text-gray-700">Email</h4>
                <a
                  href="mailto:info@koleshwardham.com"
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                >
                  info@koleshwardham.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <FaPhoneAlt className="text-orange-500 mr-3 text-xl mt-1" />
              <div>
                <h4 className="font-bold text-gray-700">Phone</h4>
                <a
                  href="tel:+919876543210"
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <FaClock className="text-orange-500 mr-3 text-xl mt-1" />
              <div>
                <h4 className="font-bold text-gray-700">Visiting Hours</h4>
                <p className="text-gray-600">Daily: 6:00 AM - 9:00 PM</p>
                <p className="text-gray-600">
                  Special Rituals: 7:00 AM & 7:00 PM
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form with Enhanced UI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 rounded-lg shadow-lg col-span-1 lg:col-span-2"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-6">
                We'd love to hear from you. Please fill out the form below and
                we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Your Mobile Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                  )}
                </div>

                <div>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="">Select Inquiry Type</option>
                    <option value="general">General Inquiry</option>
                    <option value="donation">Donations</option>
                    <option value="volunteer">Volunteer Opportunities</option>
                    <option value="events">Events & Programs</option>
                    <option value="spiritual">Spiritual Guidance</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Message sent successfully! We'll get back to you soon.
                    </span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
            {/* 
            <div className="w-full md:w-1/2 relative bg-orange-500 rounded-lg overflow-hidden hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-orange-400 opacity-90"></div>
              <div className="relative p-8 h-full flex flex-col justify-between text-white">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Why Connect With Us?
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 mr-2 text-yellow-300 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                      </svg>
                      <p>
                        Learn about our community initiatives and upcoming
                        events
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 mr-2 text-yellow-300 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                      </svg>
                      <p>
                        Contribute to our charitable causes through donations
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 mr-2 text-yellow-300 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                      </svg>
                      <p>
                        Volunteer your time and skills for community service
                      </p>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 mr-2 text-yellow-300 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                      </svg>
                      <p>Seek spiritual guidance and participate in rituals</p>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <p className="italic text-gray-100">
                    "The path of service to humanity is the path to divine
                    bliss."
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-12 bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Find Us
        </h2>
        <div className="relative w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
          {/* Replace with your actual map implementation */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">
              Map placeholder - Replace with your actual Google Maps embed
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
