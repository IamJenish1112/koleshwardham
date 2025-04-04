"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import "react-calendar/dist/Calendar.css";
import { FaStar, FaBell } from "react-icons/fa";
import { PiFlagBannerFoldFill } from "react-icons/pi";

// Dynamically import Calendar to disable SSR (Fixes hydration issue)
const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

// Define event type
type EventType = {
  icon: any;
  name: string;
};

// Define events with proper TypeScript typing
const events: Record<string, EventType> = {
  "2025-03-05": {
    icon: <FaStar className="text-yellow-500 text-xl" />,
    name: "Festival",
  },
  "2025-03-10": {
    icon: <FaBell className="text-red-500 text-xl" />,
    name: "Special Pooja",
  },
  "2025-03-20": {
    icon: <PiFlagBannerFoldFill className="text-orange-500 text-xl" />,
    name: "Dhaja",
  },
};

// Helper function to ensure consistent date format (YYYY-MM-DD)
const formatDate = (date: Date): string => date.toISOString().split("T")[0];

export default function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true); // Ensures the component only renders on the client
  }, []);

  if (!isMounted) return null; // Prevents hydration mismatch

  return (
    <div className="bg-white text-orange-600 p-8 flex flex-col items-center">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-8 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Event Calendar
      </motion.h1>

      <motion.div
        className="bg-orange-100 p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Calendar
          onClickDay={(date: Date) => setSelectedDate(formatDate(date))}
          tileContent={({ date }: { date: Date }) => {
            const dateString = formatDate(date);
            return events[dateString] ? (
              <div className="flex justify-center">
                {events[dateString].icon}
              </div>
            ) : null;
          }}
          className="border-none text-orange-700 "
        />
      </motion.div>

      {selectedDate && events[selectedDate] && (
        <motion.div
          className="mt-6 p-4 bg-white shadow-lg rounded-lg flex items-center space-x-4 border-l-4 border-orange-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {events[selectedDate].icon}
          <span className="text-lg font-semibold">
            {events[selectedDate].name}
          </span>
        </motion.div>
      )}
    </div>
  );
}
