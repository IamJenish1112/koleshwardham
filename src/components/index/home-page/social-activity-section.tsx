"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const SOCIAL_ACTIVITIES = [
  {
    title: "Nourish the Hungry",
    description:
      "Join us in providing meals and spreading hope every week. Together we can ensure no one in our community goes to bed hungry.",
    image: "/static-imges/3.jpg",
    link: "/social-activities/food-distribution",
    icon: "🍲",
  },
  {
    title: "Green Earth Initiative",
    description:
      "Planting trees for a sustainable and healthier tomorrow. Each tree planted is a step toward a greener, more vibrant future for generations to come.",
    image: "/static-imges/3.jpg",
    link: "/social-activities/tree-plantation",
    icon: "🌱",
  },
  {
    title: "Empower Through Education",
    description:
      "Providing free education to underprivileged children. Knowledge is a powerful tool that can break the cycle of poverty and create lasting change.",
    image: "/static-imges/3.jpg",
    link: "/social-activities/education-program",
    icon: "📚",
  },
  {
    title: "Health for All",
    description:
      "Bringing free medical camps to communities in need. Everyone deserves access to quality healthcare regardless of their economic situation.",
    image: "/static-imges/3.jpg",
    link: "/social-activities/medical-camps",
    icon: "🩺",
  },
];

export default function SocialActivity() {
  // Animation variants for staggered animations
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  // State for hover effects
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-100  text-white relative overflow-hidden">
      {/* Background decorative elements */}
      {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-orange-500 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-500 blur-3xl"></div>
      </div> */}

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Inspirational quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
          <p className="text-lg italic text-orange-500">
            "The best way to find yourself is to lose yourself in the service of
            others."
          </p>
        </motion.div>

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
              Be the Change: Join Our Mission
            </span>
          </h2>
          <p className="mt-4 text-lg text-zinc-900 max-w-2xl mx-auto">
            Together, we can make a lasting impact through kindness and action.
            Small steps today create a better tomorrow for everyone.
          </p>
        </motion.div>

        {/* Activity Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {SOCIAL_ACTIVITIES.map((activity, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Link href={activity.link} passHref>
                <div
                  className={`bg-white  p-5  backdrop-blur-md rounded-2xl shadow-xl overflow-hidden transition duration-500 
                    hover:scale-105 cursor-pointer hover:shadow-2xl border  flex flex-col h-full
                    ${
                      hoveredCard === index
                        ? "border-orange-500 shadow-orange-500/20"
                        : ""
                    }`}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40 z-10"></div>
                    {activity.image && (
                      <Image
                        src={activity.image || "/static-images/blank-image.jpg"}
                        alt={activity.title}
                        width={400}
                        height={250}
                        className="w-full rounded-md h-52 object-cover transition-transform duration-700 hover:scale-110"
                      />
                    )}
                    {/* <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-orange-500 rounded-full text-2xl z-20 shadow-lg">
                      {activity.icon}
                    </div> */}
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-2xl font-semibold text-orange-400 mb-2 h-14 flex items-center justify-center">
                      {activity.title}
                    </h3>
                    <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mb-4"></div>
                    <p className="text-zinc-900 line-clamp-2 flex-grow  overflow-hidden">
                      {activity.description}
                    </p>
                    <span className="mt-4 inline-block relative group">
                      <span className="relative z-10 text-orange-400 font-bold inline-flex items-center group-hover:text-orange-300 transition-colors">
                        Learn More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Stats */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { number: "10K+", label: "Meals Served" },
            { number: "5K+", label: "Trees Planted" },
            { number: "1.2K", label: "Children Educated" },
            { number: "8K+", label: "Medical Checkups" },
          ].map((stat, index) => (
            <div key={index} className="p-4 bg-white bg-opacity-5 rounded-lg">
              <h3 className="text-3xl font-bold text-orange-500">
                {stat.number}
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div> */}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12"
        >
          <Link
            href="/social-activities"
            className="relative inline-block group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg transition duration-300 text-lg font-semibold">
              Explore More Initiatives
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
