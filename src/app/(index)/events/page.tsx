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
} from "react-icons/fi";
import Breadcrumb from "@/components/common/bread-crumb";
import { getEvents, Event } from "@/lib/services/events";

// Define our component's Event interface with proper types
interface FormattedEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  fullDescription: string;
}

// Breadcrumb item interface
interface BreadcrumbItem {
  label: string;
  href?: string;
}

const breadcrumbData: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Events" },
];

export default function EventsPage() {
  const [events, setEvents] = useState<FormattedEvent[]>([]);
  const [allEvents, setAllEvents] = useState<FormattedEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<FormattedEvent[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const searchRef = useRef<HTMLDivElement>(null);
  const eventsPerPage: number = 3;

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await getEvents();
        if (response.status === 1) {
          // Format the API data to match our component structure
          const formattedEvents: FormattedEvent[] = response.items.map(
            (event) => ({
              id: event._id,
              title: event.title,
              description: event.shortDescription,
              image:
                event.images && event.images.length > 0 ? event.images[0] : "",
              date: new Date(event.date).toISOString().split("T")[0],
              location: event.location,
              fullDescription: event.description,
            })
          );
          setEvents(formattedEvents);
          setAllEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle Search and Filter Logic
  useEffect(() => {
    // Search filter
    let filteredEvents: FormattedEvent[] = allEvents.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Date filter
    if (startDate && endDate) {
      filteredEvents = filteredEvents.filter(
        (event) => event.date >= startDate && event.date <= endDate
      );
    } else if (startDate) {
      filteredEvents = filteredEvents.filter(
        (event) => event.date >= startDate
      );
    } else if (endDate) {
      filteredEvents = filteredEvents.filter((event) => event.date <= endDate);
    }

    setEvents(filteredEvents);

    // Search dropdown results (limit to 5 items)
    if (searchTerm.length > 0) {
      setSearchResults(
        allEvents
          .filter((event) =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 5)
      );
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }

    setCurrentPage(1);
  }, [searchTerm, startDate, endDate, allEvents]);

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
  const indexOfLastEvent: number = currentPage * eventsPerPage;
  const indexOfFirstEvent: number = indexOfLastEvent - eventsPerPage;
  const currentEvents: FormattedEvent[] = events.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages: number = Math.ceil(events.length / eventsPerPage);

  // Format date for display
  const formatDateForDisplay = (dateString: string | number | Date): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <Breadcrumb items={breadcrumbData} />

      {/* Page Title with Animation & Left Align */}
      <div className="flex flex-col items-start mb-8 mt-5">
        <motion.h1
          className="text-4xl mt-3 font-bold text-orange-600 relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Temple Events
          <motion.div
            className="h-1 bg-gradient-to-r from-orange-500 to-yellow-400 mt-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.2, duration: 0.7 }}
          />
        </motion.h1>
        <p className="text-gray-600 mt-3 max-w-2xl">
          Explore our temple's upcoming and past events filled with devotion,
          culture, and celebrations.
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
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full px-5 py-3 bg-white border border-gray-300 rounded-full shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 pr-16"
              />
              <button className="absolute right-0 h-full px-4 rounded-r-full bg-gradient-to-r from-orange-500 to-orange-600 text-white focus:outline-none hover:opacity-90 transition">
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
                  {searchResults.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border-b border-gray-100 hover:bg-orange-50 cursor-pointer"
                      onClick={() => {
                        setSearchTerm(event.title);
                        setShowDropdown(false);
                      }}
                    >
                      <p className="font-medium text-gray-800">{event.title}</p>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStartDate(e.target.value)
                }
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-full shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEndDate(e.target.value)
                }
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-full shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Loading Animation */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <motion.div
            className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentEvents.length > 0 ? (
            currentEvents.map((event) => (
              <motion.div
                key={event.id}
                className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden transition-all duration-300"
                whileHover={{
                  y: -8,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Event Image with Hover Effect */}
                <div className="relative overflow-hidden h-48">
                  {event.image ? (
                    <motion.img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                  ) : (
                    <motion.div
                      className="w-full h-full flex items-center justify-center bg-gradient-to-r from-orange-100 to-yellow-100"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <FiImage className="text-orange-300 text-5xl" />
                    </motion.div>
                  )}
                  <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    {formatDateForDisplay(event.date)}
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 truncate">
                    {event.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2 h-10">
                    {event.description}
                  </p>
                  {event.location && (
                    <p className="text-xs text-gray-500 mt-2 italic">
                      {event.location}
                    </p>
                  )}
                  <div className="flex justify-center mt-4">
                    <Link
                      href={`/events/${event.id}`}
                      className="px-6 py-2 text-center text-white font-medium rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition duration-300 shadow-md hover:shadow-lg"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center py-16">
              <FiCalendar className="text-5xl text-gray-300 mb-4" />
              <p className="text-xl font-medium text-gray-500">
                No events found.
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
                  : "text-orange-500 hover:bg-orange-50"
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
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-orange-50"
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
                  : "text-orange-500 hover:bg-orange-50"
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
