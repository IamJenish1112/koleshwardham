"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiArrowLeft,
  FiArrowRight,
  FiImage,
  FiCalendar,
  FiUsers,
  FiHeart,
} from "react-icons/fi";
import Breadcrumb from "@/components/common/bread-crumb";

// Dummy Data for Social Activities
const activitiesData = [
  {
    id: 1,
    title: "Community Food Drive",
    description:
      "Help collect and distribute food to underprivileged families in our community.",
    image: "",
    date: "2025-03-05",
    participants: 24,
    category: "charity",
  },
  {
    id: 2,
    title: "Elder Care Program",
    description:
      "Spend time with elderly residents at local care homes, offering companionship and assistance.",
    image: "",
    date: "2025-03-12",
    participants: 18,
    category: "eldercare",
  },
  {
    id: 3,
    title: "Temple Cleanup Initiative",
    description:
      "Join our monthly temple grounds cleanup and beautification project.",
    image: "",
    date: "2025-03-20",
    participants: 35,
    category: "environment",
  },
  {
    id: 4,
    title: "Youth Mentorship Program",
    description:
      "Volunteer to mentor underprivileged children through educational and spiritual guidance.",
    image: "",
    date: "2025-04-01",
    participants: 15,
    category: "education",
  },
  {
    id: 5,
    title: "Medical Camp for Villagers",
    description:
      "Free health checkups and medicines for villagers who lack access to healthcare facilities.",
    image: "",
    date: "2025-04-15",
    participants: 42,
    category: "healthcare",
  },
  {
    id: 6,
    title: "Tree Plantation Drive",
    description:
      "Plant trees around the temple and local community to promote environmental consciousness.",
    image: "",
    date: "2025-04-22",
    participants: 50,
    category: "environment",
  },
];

const breadcrumbData = [
  { label: "Home", href: "/" },
  { label: "Community", href: "/community" },
  { label: "Social Activities" }, // No href for current page
];

export default function SocialActivitiesPage() {
  const [activities, setActivities] = useState(activitiesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof activitiesData>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const activitiesPerPage = 6;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Handle Search and Filter Logic
  useEffect(() => {
    // Search filter
    let filteredActivities = activitiesData.filter(
      (activity) =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Date filter
    if (startDate && endDate) {
      filteredActivities = filteredActivities.filter((activity) => {
        return activity.date >= startDate && activity.date <= endDate;
      });
    } else if (startDate) {
      filteredActivities = filteredActivities.filter(
        (activity) => activity.date >= startDate
      );
    } else if (endDate) {
      filteredActivities = filteredActivities.filter(
        (activity) => activity.date <= endDate
      );
    }

    setActivities(filteredActivities);

    // Search dropdown results (limit to 5 items)
    if (searchTerm.length > 0) {
      setSearchResults(
        activitiesData
          .filter(
            (activity) =>
              activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              activity.category.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 5)
      );
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }

    setCurrentPage(1);
  }, [searchTerm, startDate, endDate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Pagination Logic
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = activities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );
  const totalPages = Math.ceil(activities.length / activitiesPerPage);

  return (
    <div className="container mx-auto px-6 py-10">
      <Breadcrumb items={breadcrumbData} />

      {/* Page Title with Animation & Left Align */}
      <div className="flex flex-col items-start mb-8 mt-5">
        <motion.h1
          className="text-4xl mt-3 font-bold text-purple-600 relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Social Activities
          <motion.div
            className="h-1 bg-gradient-to-r from-purple-500 to-indigo-400 mt-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.2, duration: 0.7 }}
          />
        </motion.h1>
        <p className="text-gray-600 mt-3 max-w-2xl">
          Join our temple community in various social service activities aimed
          at helping those in need and making a positive impact on society.
        </p>
      </div>

      {/* Search & Filter Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Bar with Dropdown */}
          <div className="relative" ref={searchRef}>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search activities or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-gray-300 rounded-full shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-16"
              />
              <button className="absolute right-0 h-full px-4 rounded-r-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white focus:outline-none hover:opacity-90 transition">
                <FiSearch className="text-lg" />
              </button>
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showDropdown && searchResults.length > 0 && (
                <motion.div
                  className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {searchResults.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-3 border-b border-gray-100 hover:bg-purple-50 cursor-pointer"
                      onClick={() => {
                        setSearchTerm(activity.title);
                        setShowDropdown(false);
                      }}
                    >
                      <p className="font-medium text-gray-800">
                        {activity.title}
                      </p>
                      <p className="text-xs text-purple-500">
                        {activity.category}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Date Picker - Start Date */}
          <div className="relative">
            <div className="flex items-center">
              <FiCalendar className="absolute left-3 text-gray-500" />
              <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-full shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Date Picker - End Date */}
          <div className="relative">
            <div className="flex items-center">
              <FiCalendar className="absolute left-3 text-gray-500" />
              <input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-full shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Loading Animation */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <motion.div
            className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentActivities.length > 0 ? (
            currentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300"
                whileHover={{
                  y: -8,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Activity Image with Hover Effect */}
                <div className="relative overflow-hidden h-48">
                  {activity.image ? (
                    <motion.img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                  ) : (
                    <motion.div
                      className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-100 to-indigo-100"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <FiHeart className="text-purple-300 text-5xl" />
                    </motion.div>
                  )}
                  <div className="absolute top-3 right-3 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                    {activity.date}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <FiUsers className="mr-1" />
                    {activity.participants} volunteers
                  </div>
                </div>

                {/* Activity Details */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                      {activity.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 truncate">
                    {activity.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2 h-10">
                    {activity.description}
                  </p>
                  <div className="flex justify-center mt-4">
                    <Link
                      href={`/social-activities/${activity.id}`}
                      className="px-6 py-2 text-center text-white font-medium rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transform hover:scale-105 transition duration-300 shadow-md hover:shadow-lg"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center py-16">
              <FiHeart className="text-5xl text-gray-300 mb-4" />
              <p className="text-xl font-medium text-gray-500">
                No activities found.
              </p>
              <p className="text-gray-400 mt-2">
                Try adjusting your search or date filters
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Premium Pagination Controls */}
      {totalPages > 1 && (
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="inline-flex items-center bg-white shadow-lg rounded-full px-2 py-1">
            <motion.button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 mx-1 rounded-full transition-all duration-300 ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-purple-500 hover:bg-purple-50"
              }`}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowLeft className="text-xl" />
            </motion.button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full mx-1 font-medium transition-all duration-300 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-purple-50"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {page}
              </motion.button>
            ))}

            <motion.button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`p-2 mx-1 rounded-full transition-all duration-300 ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-purple-500 hover:bg-purple-50"
              }`}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowRight className="text-xl" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
