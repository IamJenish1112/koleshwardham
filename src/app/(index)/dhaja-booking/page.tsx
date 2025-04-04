"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaRupeeSign,
  FaClipboardList,
  FaGavel,
  FaBook,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRoute,
  FaCommentDots,
  FaCheckCircle,
} from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  address: Yup.string().required("Address is required"),
  date: Yup.string().required("Date is required"),
  source: Yup.string().required("Source is required"),
  message: Yup.string(),
  agree: Yup.boolean().oneOf(
    [true],
    "You must agree to the rules and regulations"
  ),
});

interface FormValues {
  name: string;
  email: string;
  mobile: string;
  address: string;
  date: string;
  source: string;
  message: string;
  agree: boolean;
}

export default function DhajaBookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      date: "",
      source: "",
      message: "",
      agree: false,
    },
    validationSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log("Form Submitted", values);
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="text-orange-400 py-8 px-4 ">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Online Dhaja Booking
          </motion.h1>
          <motion.p
            className="text-center mt-4 max-w-2xl mx-auto text-orange-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Book your sacred Dhaja ceremony with our temple and be part of this
            divine tradition
          </motion.p>
        </div>
      </header>

      <div className="max-w-8xl mx-auto px-4 lg:px-20 py-12">
        {/* Main Content Container */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Side Information */}
          <div className="md:col-span-5 space-y-8">
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-orange-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-orange-800 mb-6 flex items-center">
                <span className="inline-block p-2 rounded-full bg-orange-100 mr-3">
                  <FaBook className="text-orange-600 text-xl" />
                </span>
                About Dhaja Ceremony
              </h2>
              <p className="text-gray-700 mb-4">
                The Dhaja ceremony is an ancient ritual representing the flag
                hoisting at the temple. It symbolizes devotion and is considered
                highly auspicious for families who participate.
              </p>
              <p className="text-gray-700">
                By booking a Dhaja ceremony, you are participating in a
                tradition that has been honored for generations, bringing
                blessings to your family and community.
              </p>
            </motion.div>

            {/* Information Cards */}
            <div className="space-y-4">
              {[
                {
                  title: "Amount to Pay",
                  icon: <FaRupeeSign />,
                  content:
                    "The booking amount is ₹500 which covers the basic pooja setup.",
                },
                {
                  title: "Required Items",
                  icon: <FaClipboardList />,
                  content:
                    "You need to bring flowers, coconut, incense sticks, and sweets for the pooja.",
                },
                {
                  title: "Process of Pooja",
                  icon: <FaGavel />,
                  content:
                    "The pooja will be conducted by our experienced priests following traditional rituals.",
                },
                {
                  title: "Rules & Policy",
                  icon: <FaBook />,
                  content:
                    "Respect religious customs, wear traditional attire, and follow temple guidelines.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-5 rounded-lg shadow-md flex items-start space-x-4 hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                >
                  <div className="bg-orange-100 p-3 rounded-full text-orange-600 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-700">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side Booking Form */}
          <div className="md:col-span-7">
            {isSubmitted ? (
              <motion.div
                className="bg-white rounded-xl shadow-xl p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-6xl text-green-500 flex justify-center mb-6">
                  <FaCheckCircle />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Booking Successful!
                </h2>
                <p className="text-gray-600 mb-6">
                  Thank you for booking your Dhaja ceremony. We have received
                  your request and will contact you shortly with confirmation
                  details.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 transition"
                >
                  Book Another
                </button>
              </motion.div>
            ) : (
              <motion.div
                className="bg-white rounded-xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="bg-orange-500 p-6 text-white">
                  <h2 className="text-2xl font-bold">
                    Book Your Dhaja Ceremony
                  </h2>
                  <p className="text-orange-100 text-sm mt-2">
                    Fill in the details below to make your booking
                  </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="p-6 space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-orange-500" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          className={`w-full pl-10 pr-3 py-2 border ${
                            formik.touched.name && formik.errors.name
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                        />
                      </div>
                      {formik.touched.name && formik.errors.name && (
                        <p className="mt-1 text-red-600 text-xs">
                          {formik.errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-orange-500" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="email@example.com"
                          className={`w-full pl-10 pr-3 py-2 border ${
                            formik.touched.email && formik.errors.email
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                        />
                      </div>
                      {formik.touched.email && formik.errors.email && (
                        <p className="mt-1 text-red-600 text-xs">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>

                    {/* Mobile Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="text-orange-500" />
                        </div>
                        <input
                          type="text"
                          name="mobile"
                          placeholder="10-digit mobile number"
                          className={`w-full pl-10 pr-3 py-2 border ${
                            formik.touched.mobile && formik.errors.mobile
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.mobile}
                        />
                      </div>
                      {formik.touched.mobile && formik.errors.mobile && (
                        <p className="mt-1 text-red-600 text-xs">
                          {formik.errors.mobile}
                        </p>
                      )}
                    </div>

                    {/* Date Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCalendarAlt className="text-orange-500" />
                        </div>
                        <input
                          type="date"
                          name="date"
                          className={`w-full pl-10 pr-3 py-2 border ${
                            formik.touched.date && formik.errors.date
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.date}
                        />
                      </div>
                      {formik.touched.date && formik.errors.date && (
                        <p className="mt-1 text-red-600 text-xs">
                          {formik.errors.date}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Source Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Source of Shobhayatra
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaRoute className="text-orange-500" />
                      </div>
                      <input
                        type="text"
                        name="source"
                        placeholder="Starting point of procession"
                        className={`w-full pl-10 pr-3 py-2 border ${
                          formik.touched.source && formik.errors.source
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.source}
                      />
                    </div>
                    {formik.touched.source && formik.errors.source && (
                      <p className="mt-1 text-red-600 text-xs">
                        {formik.errors.source}
                      </p>
                    )}
                  </div>

                  {/* Address Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
                        <FaMapMarkerAlt className="text-orange-500" />
                      </div>
                      <textarea
                        name="address"
                        placeholder="Your complete address"
                        rows={2}
                        className={`w-full pl-10 pr-3 py-2 border ${
                          formik.touched.address && formik.errors.address
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                      ></textarea>
                    </div>
                    {formik.touched.address && formik.errors.address && (
                      <p className="mt-1 text-red-600 text-xs">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Message (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
                        <FaCommentDots className="text-orange-500" />
                      </div>
                      <textarea
                        name="message"
                        placeholder="Any specific requests or questions"
                        rows={3}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                      ></textarea>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="agree"
                      name="agree"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.agree}
                    />
                    <label
                      htmlFor="agree"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      I agree to the temple's rules and regulations for Dhaja
                      ceremony
                    </label>
                  </div>
                  {formik.touched.agree && formik.errors.agree && (
                    <p className="text-red-600 text-xs">
                      {formik.errors.agree?.toString()}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-orange-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-orange-700 transition shadow-md ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Book Dhaja Ceremony"
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
