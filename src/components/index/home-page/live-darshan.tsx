"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function LiveDarshan() {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [viewerCount, setViewerCount] = useState<number>(128);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const [selectedQuality, setSelectedQuality] = useState<string>("720p");
  const videoRef = useRef<HTMLDivElement>(null);

  // Update date and time
  useEffect(() => {
    // Set initial values immediately
    updateDateTime();

    // Update time every second
    const timeInterval = setInterval(updateDateTime, 1000);

    // Simulate changing viewer count
    const viewerInterval = setInterval(() => {
      setViewerCount((prev) => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(100, prev + change);
      });
    }, 5000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(viewerInterval);
    };
  }, []);

  // Function to update date and time
  const updateDateTime = () => {
    const today = new Date();
    try {
      const formattedDate = today.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      setCurrentDate(formattedDate);

      const formattedTime = today.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(formattedTime);
    } catch (error) {
      // Fallback formatting if locale methods fail
      setCurrentDate(today.toDateString());
      setCurrentTime(today.toTimeString().substring(0, 8));
    }
  };

  // Toggle fullscreen (simplified)
  const toggleFullscreen = () => {
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => console.error(err));
      } else if (videoRef.current) {
        videoRef.current.requestFullscreen().catch((err) => console.error(err));
      }
    } catch (error) {
      console.error("Fullscreen API error:", error);
    }
  };

  // Prayer times schedule
  const prayerSchedule = [
    { time: "05:00 AM", ritual: "Mangala Aarti" },
    { time: "07:30 AM", ritual: "Shringar Aarti" },
    { time: "11:30 AM", ritual: "Rajbhog Aarti" },
    { time: "06:30 PM", ritual: "Sandhya Aarti" },
    { time: "08:30 PM", ritual: "Shayan Aarti" },
  ];

  // Define the return type for getCurrentRitual
  interface RitualInfo {
    current: boolean;
    name: string;
    time: string;
    countdown: string;
  }

  // Find current or next ritual (simplified)
  const getCurrentRitual = (): RitualInfo => {
    try {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      // Default to the first ritual of the day
      let nextRitual: RitualInfo = {
        current: false,
        name: prayerSchedule[0].ritual,
        time: prayerSchedule[0].time,
        countdown: "Tomorrow",
      };

      // Find the next ritual
      for (const ritual of prayerSchedule) {
        const [hourStr, minuteStr] = ritual.time.split(":");
        const hour = parseInt(hourStr);
        const minute = parseInt(minuteStr.replace(/\D/g, "")); // Remove non-digit characters
        const isPM = ritual.time.includes("PM");

        let ritualHour = hour;
        if (isPM && hour !== 12) ritualHour += 12;
        if (!isPM && hour === 12) ritualHour = 0;

        // If ritual is happening now
        if (
          currentHour === ritualHour &&
          Math.abs(currentMinute - minute) < 15
        ) {
          return {
            current: true,
            name: ritual.ritual,
            time: ritual.time,
            countdown: "Happening now",
          };
        }

        // If ritual is in the future
        if (
          currentHour < ritualHour ||
          (currentHour === ritualHour && currentMinute < minute)
        ) {
          const minutesLeft =
            (ritualHour - currentHour) * 60 + (minute - currentMinute);
          let countdown = "";

          if (minutesLeft < 60) {
            countdown = `In ${minutesLeft} min`;
          } else {
            const hours = Math.floor(minutesLeft / 60);
            const mins = minutesLeft % 60;
            countdown = `In ${hours}h ${mins}m`;
          }

          return {
            current: false,
            name: ritual.ritual,
            time: ritual.time,
            countdown: countdown,
          };
        }
      }

      return nextRitual;
    } catch (error) {
      // Fallback if anything fails
      return {
        current: false,
        name: "Next Aarti",
        time: "Soon",
        countdown: "Check schedule",
      };
    }
  };

  const currentRitual = getCurrentRitual();

  return (
    <section className="relative w-full py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500">
            Live Temple Darshan
          </h2>
          <p className="text-gray-700 mt-2">
            Experience the divine presence from anywhere in the world
          </p>
        </motion.div>

        {/* Live Stream Container */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl  border-orange-500/30 bg-black/80">
          {/* Main Content Flex Container */}
          <div className="flex flex-col lg:flex-row">
            {/* Video Container */}
            <div className="lg:w-3/4 relative" ref={videoRef}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                {/* Video */}
                <iframe
                  width="100%"
                  height="550"
                  src="https://www.youtube.com/embed/M1tVujhqHu8"
                  title="Live Darshan"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="z-10"
                ></iframe>
              </motion.div>
            </div>

            {/* Side Panel */}
            <div className="lg:w-1/3 bg-white border-l border-orange-500/20">
              {/* Current Ritual */}
              <div className="p-4 border-b border-orange-500/20">
                <h3 className="text-orange-500  font-medium text-lg mb-2">
                  {currentRitual.current ? "Current Ritual" : "Next Ritual"}
                </h3>
                <div className="bg-white border drop-shadow-xl rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-orange-500 font-bold">
                      {currentRitual.name}
                    </span>
                    <span className="text-orange-500 text-sm">
                      {currentRitual.time}
                    </span>
                  </div>
                  <div className="mt-1 text-xs bg-orange-500 rounded px-2 py-1 inline-block text-white">
                    {currentRitual.countdown}
                  </div>
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="p-4">
                <h3 className="text-orange-500 font-medium text-lg mb-2">
                  Today's Schedule
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {prayerSchedule.map((ritual, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-2 rounded-lg ${
                        currentRitual.name === ritual.ritual
                          ? "bg-white drop-shadow-xl border-l-4 border border-l-orange-500"
                          : "hover:bg-orange-500/10"
                      }`}
                    >
                      <span className="text-orange-500">{ritual.ritual}</span>
                      <span className="text-gray-700 text-sm">
                        {ritual.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blessings Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-700 italic">
            "May the divine blessings reach you through this virtual darshan. Om
            Shanti."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
