"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import { head } from "framer-motion/client";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  {
    label: "About US",
    dropdown: [
      { href: "/about-trust", label: "About Trust" },
      { href: "/social-activities", label: "Social Acitvity" },
      {
        label: "History",
        href: "/history",
        // dropdown: [
        //   {
        //     href: "/brief-history-of-kolava-bhagat",
        //     label: "કોલવા ભગત નો ટુંક મા ઇતિહાસ",
        //   },
        //   {
        //     href: "/kolava-bhagat-life-story",
        //     label: "કોલવા ભગત નુ જીવન ચરિત્ર",
        //   },
        //   {
        //     href: "/published-hemadry",
        //     label: "કોલવા ભગતે પ્રગટ કરેલ ગંગા જમના",
        //   },
        //   {
        //     href: "/parcho",
        //     label: "ઇશ્વરિયા નિ ધારે રાજગોર બ્રામ્હણ ને પરચો દિધો",
        //   },
        // ],
      },
    ],
  },
  {
    label: "Online Services",
    dropdown: [
      {
        label: "Donation",
        href: "/donate",
      },
      {
        label: "Dhaja Booking",
        href: "/dhaja-booking",
      },
    ],
  },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Media" },
  { href: "/contact-us", label: "Contact US" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolling
          ? "bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg py-2"
          : "bg-gradient-to-r from-orange-500 to-orange-400 py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-white flex items-center"
        >
          {/* Optional: Add a small logo/icon here */}
          <span className="bg-white text-orange-500 rounded-full h-10 w-10 flex items-center justify-center mr-2">
            KD
          </span>
          <span className="hidden sm:inline">Koleshwar Dham</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center">
          {NAV_ITEMS.map((item, index) => (
            <NavItem
              key={index}
              item={item}
              isMobile={false}
              isLast={index === NAV_ITEMS.length - 1}
            />
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-white  hover:bg-white hover:text-orange-600 rounded-md transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white overflow-hidden shadow-xl z-50"
          >
            <div className="flex flex-col divide-y divide-orange-100">
              {NAV_ITEMS.map((item, index) => (
                <NavItem
                  key={index}
                  item={item}
                  isMobile={true}
                  closeMenu={() => setIsOpen(false)}
                  isLast={index === NAV_ITEMS.length - 1}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

const NavItem = ({
  item,
  isMobile,
  closeMenu,
  isLast = false,
}: {
  item: any;
  isMobile: boolean;
  closeMenu?: () => void;
  isLast?: boolean;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [shouldRenderLeft, setShouldRenderLeft] = useState(false);

  // Check if dropdown would go off-screen
  useEffect(() => {
    if (!isMobile && dropdownRef.current && item.dropdown) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      if (rect.right + 200 > windowWidth) {
        setShouldRenderLeft(true);
      } else {
        setShouldRenderLeft(false);
      }
    }
  }, [isMobile, item.dropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative ${isMobile ? "w-full py-1" : ""}`}
      onMouseEnter={!isMobile ? () => setDropdownOpen(true) : undefined}
      onMouseLeave={!isMobile ? () => setDropdownOpen(false) : undefined}
    >
      {item.href ? (
        <Link
          href={item.href}
          className={`
            text-lg font-medium flex items-center gap-1 transition duration-300
            ${
              isMobile
                ? "text-orange-500 hover:text-orange-700 px-6 py-3 w-full"
                : `text-white hover:text-yellow-100 px-4 py-2 relative ${
                    isLast ? "mr-0" : "mr-1"
                  }`
            }
          `}
          onClick={closeMenu}
        >
          {item.label}
          {!isMobile && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-yellow-200 w-full"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </Link>
      ) : (
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`
            text-lg font-medium flex items-center justify-between gap-1 transition duration-300
            ${
              isMobile
                ? "text-orange-500 hover:text-orange-700 px-6 py-3 w-full"
                : `text-white hover:text-yellow-100 px-4 py-2 relative ${
                    isLast ? "mr-0" : "mr-1"
                  }`
            }
          `}
        >
          <span>{item.label}</span>
          {item.dropdown &&
            (isMobile ? (
              <FiChevronDown
                className={`transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            ) : (
              <FiChevronDown size={14} className="ml-1" />
            ))}
          {!isMobile && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-yellow-200 w-full"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
      )}

      {/* Dropdown Menu */}
      <AnimatePresence>
        {dropdownOpen && item.dropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`
              ${
                isMobile
                  ? "relative w-full bg-orange-50 border-l-4 border-orange-400 my-1 py-2 px-2"
                  : `absolute z-50 min-w-max bg-white rounded-md shadow-lg border-t-2 border-orange-400 ${
                      shouldRenderLeft ? "right-0" : "left-0"
                    }`
              }
            `}
          >
            {item.dropdown.map((subItem: any, index: number) => (
              <div key={index} className={isMobile ? "pl-4" : ""}>
                {subItem.dropdown ? (
                  <SubNavItem
                    item={subItem}
                    isMobile={isMobile}
                    closeMenu={closeMenu}
                    renderLeft={shouldRenderLeft && !isMobile}
                  />
                ) : (
                  <Link
                    href={subItem.href || "#"}
                    className={`
                      block whitespace-nowrap transition-colors duration-200
                      ${
                        isMobile
                          ? "px-4 py-2 text-orange-600 hover:text-orange-800"
                          : "px-4 py-3 text-orange-600 hover:bg-orange-50 hover:text-orange-700 rounded-md m-1"
                      }
                    `}
                    onClick={closeMenu}
                  >
                    {subItem.label}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SubNavItem = ({
  item,
  isMobile,
  closeMenu,
  renderLeft = false,
}: {
  item: any;
  isMobile: boolean;
  closeMenu?: () => void;
  renderLeft?: boolean;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`
          flex items-center justify-between whitespace-nowrap w-full transition-colors duration-200
          ${
            isMobile
              ? "px-4 py-2 text-orange-600 hover:text-orange-800"
              : "px-4 py-3 text-orange-600 hover:bg-orange-50 hover:text-orange-700 rounded-md m-1"
          }
        `}
        onMouseEnter={!isMobile ? () => setDropdownOpen(true) : undefined}
        onMouseLeave={!isMobile ? () => setDropdownOpen(false) : undefined}
      >
        <span>{item.label}</span>
        {isMobile ? (
          <FiChevronDown
            className={`transition-transform duration-300 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        ) : (
          <FiChevronRight size={14} className="ml-2" />
        )}
      </button>

      <AnimatePresence>
        {dropdownOpen && item.dropdown && (
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : renderLeft ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isMobile ? 0 : renderLeft ? 10 : -10 }}
            transition={{ duration: 0.2 }}
            className={`
              ${
                isMobile
                  ? "relative w-full bg-orange-100/50 rounded-md my-1 py-1 pl-3"
                  : `absolute top-0 z-50 min-w-max bg-white rounded-md shadow-lg border-l-2 border-orange-400 ${
                      renderLeft ? "right-full -mr-1" : "left-full -ml-1"
                    }`
              }
            `}
            onMouseEnter={!isMobile ? () => setDropdownOpen(true) : undefined}
            onMouseLeave={!isMobile ? () => setDropdownOpen(false) : undefined}
          >
            {item.dropdown.map((subItem: any, index: number) => (
              <Link
                key={index}
                href={subItem.href || "#"}
                className={`
                  block whitespace-nowrap transition-colors duration-200
                  ${
                    isMobile
                      ? "px-4 py-2 text-orange-700 hover:text-orange-900"
                      : "px-4 py-3 text-orange-600 hover:bg-orange-50 hover:text-orange-700 rounded-md m-1"
                  }
                `}
                onClick={closeMenu}
              >
                {subItem.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
