import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Define slide types for better TypeScript support
type SlideType = "image" | "video" | "cta" | "testimonial" | "news";

interface SlideContent {
  type: SlideType;
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  video?: string; // URL for video slides
  ctaText?: string;
  ctaLink?: string;
  author?: string; // For testimonials
  position?: string; // For testimonials
  date?: string; // For news
}

const HomeCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sample slide content data
  const slides: SlideContent[] = [
    {
      type: "image",
      title: "Discover Amazing Places",
      subtitle: "Start your journey today",
      content: "Experience breathtaking views and unforgettable adventures.",
      image: "/static-imges/1.jpg",
    },
    {
      type: "video",
      title: "See Our Impact",
      subtitle: "Making a difference together",
      video: "https://example.com/video.mp4", // Replace with actual video URL
      image: "/static-imges/2.jpg", // Fallback image
    },
    {
      type: "cta",
      title: "Support Our Cause",
      subtitle: "Every donation makes a difference",
      content:
        "Your contribution helps us continue our mission to build a better future.",
      image: "/static-imges/3.jpg",
      ctaText: "Donate Now",
      ctaLink: "/donate",
    },
    {
      type: "testimonial",
      title: "What Our Community Says",
      content:
        '"This organization changed my life. The support and resources they provided made all the difference in helping me overcome challenges."',
      author: "Sarah Johnson",
      position: "Community Member",
      image: "/static-imges/4.jpg",
    },
    {
      type: "news",
      title: "Latest Updates",
      subtitle: "Exciting news from our team",
      content:
        "We're thrilled to announce the launch of our new initiative that will expand our reach to 10 more communities.",
      date: "March 25, 2025",
      image: "/static-imges/5.jpg",
      ctaText: "Read More",
      ctaLink: "/news",
    },
  ];

  // Animation variants for different slide elements
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.4, ease: "easeOut" },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const imageVariants = {
    initial: { scale: 1.1 },
    animate: { scale: 1, transition: { duration: 7, ease: "easeOut" } },
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Render different slide layouts based on slide type
  const renderSlideContent = (slide: SlideContent, index: number) => {
    const isActive = activeIndex === index;

    return (
      <div className="relative w-full h-full">
        {/* Background image or video */}
        {slide.type === "video" ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={slide.image}
            >
              <source src={slide.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <motion.img
              src={slide.image}
              alt={slide.title || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
              variants={imageVariants}
              initial="initial"
              animate={isActive ? "animate" : "initial"}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Content overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="max-w-xl mx-auto md:mx-0 md:ml-16 text-center md:text-left text-white">
              <AnimatePresence>
                {isActive && (
                  <>
                    {slide.title && (
                      <motion.h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                        variants={titleVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        {slide.title}
                      </motion.h2>
                    )}

                    {slide.subtitle && (
                      <motion.h3
                        className="text-xl md:text-2xl mb-4 text-gray-200"
                        variants={subtitleVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        {slide.subtitle}
                      </motion.h3>
                    )}

                    {/* Special handling for testimonials */}
                    {slide.type === "testimonial" ? (
                      <>
                        <motion.div
                          className="mb-6 text-lg md:text-xl italic"
                          variants={contentVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          {slide.content}
                        </motion.div>
                        <motion.div
                          className="flex flex-col md:flex-row items-center justify-center md:justify-start"
                          variants={contentVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          {slide.author && (
                            <p className="font-semibold text-lg">
                              {slide.author}
                            </p>
                          )}
                          {slide.position && (
                            <p className="md:ml-2 text-gray-300">
                              {slide.position}
                            </p>
                          )}
                        </motion.div>
                      </>
                    ) : (
                      <>
                        {/* Regular content for other slide types */}
                        {slide.content && (
                          <motion.p
                            className="mb-6 text-lg"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            {slide.content}
                          </motion.p>
                        )}
                      </>
                    )}

                    {/* News date display */}
                    {slide.type === "news" && slide.date && (
                      <motion.p
                        className="text-sm text-gray-300 mb-4"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        Published: {slide.date}
                      </motion.p>
                    )}

                    {/* CTA button */}
                    {slide.ctaText && slide.ctaLink && (
                      <motion.a
                        href={slide.ctaLink}
                        className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transform transition duration-300"
                        variants={ctaVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        whileHover="hover"
                        aria-label={slide.ctaText}
                      >
                        {slide.ctaText}
                      </motion.a>
                    )}
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="h-full"
        a11y={{
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}",
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="h-full">
            {renderSlideContent(slide, index)}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation arrows for better styling */}
      <div className="absolute bottom-8 right-8 z-30 flex space-x-4">
        <motion.button
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
          onClick={() => swiperRef.current?.slidePrev()}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>
        <motion.button
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
          onClick={() => swiperRef.current?.slideNext()}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HomeCarousel;
