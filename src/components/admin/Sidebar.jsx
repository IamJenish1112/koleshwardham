import React from "react";
import { X, Home, Users, BarChart2, Settings, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

function Sidebar({
  toggleMobileMenu = () => {},
  mobileMenuOpen,
  sidebarOpen,
  toggleSidebar,
}) {
  const currentPath = usePathname();
  const navigationItems = [
    {
      icon: <Home size={20} />,
      name: "Dashboard",
      path: "/admin",
    },
    {
      icon: <Users size={20} />,
      name: "Users",
      path: "/users",
    },
    {
      icon: <BarChart2 size={20} />,
      name: "Analytics",
      path: "/admin/users",
    },
    {
      icon: <Settings size={20} />,
      name: "Settings",
      path: "/settings",
    },
    {
      name: "Events",
      icon: <Menu size={20} />,
      path: "/admin/events",
    },
  ];

  // Animation classes for desktop sidebar
  const sidebarClasses = `hidden lg:block fixed h-full bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out shadow-lg z-20 ${
    sidebarOpen ? "lg:w-64" : "lg:w-20"
  }`;

  // Mobile menu classes
  const mobileMenuClasses = `lg:hidden fixed inset-0 z-30 transform ${
    mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 ease-in-out`;

  // Function to determine if a navigation item is active with safe checks
  const isActive = (path) => {
    // Safety check - if path or currentPath is undefined, return false
    if (!path || !currentPath) return false;

    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath === path;
  };

  return (
    <>
      {/* Mobile Menu Sidebar */}
      <aside className={mobileMenuClasses}>
        <div className="h-full w-64 bg-white dark:bg-gray-900 shadow-lg overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <h1 className="font-bold text-gray-800 dark:text-white text-lg">
                AdminPanel
              </h1>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.path}
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="ml-3 font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile User profile */}
          <div className="absolute bottom-0 w-full p-4 border-t dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-indigo-100">
                <Image
                  src="/api/placeholder/40/40"
                  alt="User profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  Sarah Johnson
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Admin
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className={sidebarClasses}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 bg-indigo-600 rounded-md flex items-center justify-center cursor-pointer"
              onClick={toggleSidebar}
            >
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h1
              className={`font-bold text-gray-800 dark:text-white text-lg transition-opacity duration-300 ${
                sidebarOpen ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              AdminPanel
            </h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            {sidebarOpen && <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                    isActive(item.path)
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span
                    className={`ml-3 font-medium transition-opacity duration-300 ${
                      sidebarOpen ? "opacity-100" : "opacity-0 hidden"
                    }`}
                  >
                    {item.name}
                  </span>
                  {!sidebarOpen && (
                    <div className="absolute left-20 rounded-md px-2 py-1 ml-6 bg-gray-900 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {item.name}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User profile - bottom of sidebar */}
        <div
          className={`absolute bottom-0 w-full p-4 border-t dark:border-gray-700 ${
            sidebarOpen ? "" : "items-center justify-center"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-indigo-100">
              <Image
                src="/api/placeholder/40/40"
                alt="User profile"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div
              className={`transition-opacity duration-300 ${
                sidebarOpen ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <p className="font-medium text-gray-800 dark:text-white">
                Sarah Johnson
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
