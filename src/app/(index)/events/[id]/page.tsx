"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/common/bread-crumb";
import axios from "axios";
import { FiCalendar, FiMapPin, FiLoader } from "react-icons/fi";
import { getEventById } from "@/lib/services/events";

// Define the Event interface
interface Event {
  title: string;
  date: string;
  location?: string;
  shortDescription?: string;
  description: string;
  images?: string[];
}

// Define the API response interface
interface ApiResponse {
  status_code: number;
  item: Event;
}

export default function EventDetails() {
  const router = useRouter();
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch event data from API
  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!params?.id) return;

      setLoading(true);
      try {
        const response = (await getEventById({
          id: params.id as string,
        })) as ApiResponse;
        if (response.item && response.status_code === 1) {
          setEvent(response.item);
        } else {
          setError("Event not found");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("Failed to fetch event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [params?.id]);

  // Format date for display
  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <motion.div
            className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-2xl font-bold text-gray-600">
            Loading Event Details...
          </span>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-6 py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Events", href: "/events" },
            { label: "Error" },
          ]}
        />
        <div className="flex flex-col items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-red-500 mb-4">{error}</h2>
            <p className="text-gray-600 mb-8">
              We couldn't find the event you're looking for.
            </p>
            <button
              onClick={() => router.push("/events")}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition duration-300"
            >
              Return to Events
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // If event is null but not loading or error
  if (!event) {
    return null;
  }

  return (
    <section className="container mx-auto px-6 py-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: event.title },
        ]}
      />

      {/* Event Header Section with Gradient Background */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-10 p-8 rounded-2xl overflow-hidden bg-gradient-to-r from-orange-50 to-yellow-50 shadow-lg mt-4"
      >
        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23e66a1c" fill-opacity="0.3"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
          }}
        />

        <div className="relative z-10">
          {/* Title with Fancy Underline */}
          <div className="mb-4">
            <motion.h1
              className="text-4xl font-bold text-orange-600 inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              {event.title}
              <motion.div
                className="h-1 bg-gradient-to-r from-orange-500 to-yellow-400 mt-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.7 }}
              />
            </motion.h1>
          </div>

          {/* Date & Location with Icons */}
          <div className="flex flex-col md:flex-row md:space-x-6 text-lg text-gray-700 mb-4">
            <div className="flex items-center mb-2 md:mb-0">
              <FiCalendar className="mr-2 text-orange-500" />
              <span>
                <strong>{formatDate(event.date)}</strong>
              </span>
            </div>
            {event.location && (
              <div className="flex items-center">
                <FiMapPin className="mr-2 text-orange-500" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          {/* Short Description if available */}
          {event.shortDescription && (
            <p className="text-lg italic font-bold text-gray-600 mb-2">
              {event.shortDescription}
            </p>
          )}
        </div>
      </motion.div>

      {/* Event Description */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          About This Event
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md prose max-w-none"
          dangerouslySetInnerHTML={{ __html: event.description }}
        />
      </div>

      {/* Event Photos Grid */}
      {event.images && event.images.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-orange-500 mb-6">
            Event Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {event.images.map((image: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-lg shadow-lg group"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={image}
                    alt={`${event.title} - Photo ${index + 1}`}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Return to Events Button */}
      <div className="flex justify-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/events")}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition duration-300"
        >
          Back to All Events
        </motion.button>
      </div>
    </section>
  );
}
