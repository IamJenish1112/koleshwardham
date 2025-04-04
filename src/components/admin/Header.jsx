import React from "react";
import {
  Menu,
  Search,
  Moon,
  Bell,
  ChevronDown,
  LogOut,
  Sun,
} from "lucide-react";
import Image from "next/image";
function Header({
  toggleSidebar,
  toggleDarkMode,
  darkMode,
  toggleProfileDropdown,
  profileDropdownOpen,
}) {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700 transition-colors duration-300 sticky top-0 z-10">
      <div className="flex justify-between items-center px-4 sm:px-6 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Dashboard
          </h2>
        </div>

        <div className="flex items-center">
          {/* Search - Hidden on small screens */}
          <div className="relative hidden md:block mr-2">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800 dark:text-white w-40 lg:w-60 transition-all duration-300"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notification */}
            <button
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors duration-300 relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-pulse">
                3
              </span>
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 focus:outline-none p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100">
                  <Image
                    src="/api/placeholder/32/32"
                    alt="User profile"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <ChevronDown
                  size={16}
                  className="text-gray-500 dark:text-gray-400 hidden sm:block"
                />
              </button>

              {/* Dropdown menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-1 z-10 border dark:border-gray-700">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <LogOut size={16} className="mr-2" />
                      <span>Sign out</span>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
