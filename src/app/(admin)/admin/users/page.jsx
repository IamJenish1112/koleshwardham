// app/dashboard/user-analytics/page.jsx
"use client";

import { useState, useEffect } from "react";
import {
  Home,
  Users,
  BarChart2,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Moon,
  Sun,
  Filter,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Globe,
  Smartphone,
  Monitor,
  Circle,
} from "lucide-react";
import Image from "next/image";

export default function UserAnalytics() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [dateRange, setDateRange] = useState("last30Days");
  const [activeTab, setActiveTab] = useState("overview");

  // Handle sidebar toggle
  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  // Handle dark mode toggle
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Handle profile dropdown
  const toggleProfileDropdown = () =>
    setProfileDropdownOpen(!profileDropdownOpen);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMounted(true);
    // Check system preference for dark mode
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);

    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Mock data for user analytics
  const userData = {
    totalUsers: 24521,
    activeUsers: 16482,
    newUsers: 2134,
    churnedUsers: 342,
    avgSessionDuration: "5m 42s",
    retentionRate: "78.4%",
    topLocations: [
      { country: "United States", users: 8945, percentage: 36.5 },
      { country: "Germany", users: 3241, percentage: 13.2 },
      { country: "United Kingdom", users: 2854, percentage: 11.6 },
      { country: "India", users: 2134, percentage: 8.7 },
      { country: "Canada", users: 1987, percentage: 8.1 },
    ],
    deviceUsage: [
      { device: "Mobile", percentage: 62 },
      { device: "Desktop", percentage: 31 },
      { device: "Tablet", percentage: 7 },
    ],
    userGrowth: [
      { month: "Jan", users: 19342 },
      { month: "Feb", users: 20123 },
      { month: "Mar", users: 21043 },
      { month: "Apr", users: 21654 },
      { month: "May", users: 22387 },
      { month: "Jun", users: 23154 },
      { month: "Jul", users: 24521 },
    ],
    recentUsers: [
      {
        name: "Emily Johnson",
        email: "emily.j@example.com",
        joinDate: "2 hours ago",
        status: "active",
        avatar: "/api/placeholder/40/40",
      },
      {
        name: "Michael Chen",
        email: "michael.c@example.com",
        joinDate: "5 hours ago",
        status: "active",
        avatar: "/api/placeholder/40/40",
      },
      {
        name: "Sofia Rodriguez",
        email: "sofia.r@example.com",
        joinDate: "1 day ago",
        status: "inactive",
        avatar: "/api/placeholder/40/40",
      },
      {
        name: "James Wilson",
        email: "james.w@example.com",
        joinDate: "2 days ago",
        status: "active",
        avatar: "/api/placeholder/40/40",
      },
    ],
  };

  // Animation classes for desktop sidebar
  const sidebarClasses = `hidden lg:block fixed h-full bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out shadow-lg z-20 ${
    sidebarOpen ? "lg:w-64" : "lg:w-20"
  }`;

  // Main content classes
  const mainClasses = `transition-all duration-300 ease-in-out w-full`;

  // Mobile menu classes
  const mobileMenuClasses = `lg:hidden fixed inset-0 z-30 transform ${
    mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 ease-in-out`;

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

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
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="p-4">
            <ul className="space-y-2">
              {[
                {
                  icon: <Home size={20} />,
                  name: "Dashboard",
                  active: false,
                  path: "/dashboard",
                },
                {
                  icon: <Users size={20} />,
                  name: "Users",
                  active: true,
                  path: "/dashboard/user-analytics",
                },
                {
                  icon: <BarChart2 size={20} />,
                  name: "Analytics",
                  active: false,
                  path: "/dashboard/analytics",
                },
                {
                  icon: <Settings size={20} />,
                  name: "Settings",
                  active: false,
                  path: "/dashboard/settings",
                },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                      item.active
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="ml-3 font-medium">{item.name}</span>
                  </a>
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

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${mainClasses}`}>
        {/* Main content with improved scrolling */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* Page title and filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                User Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Monitor your user growth, retention, and engagement metrics
              </p>
            </div>

            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="relative">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="appearance-none pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 w-full"
                >
                  <option value="last7Days">Last 7 days</option>
                  <option value="last30Days">Last 30 days</option>
                  <option value="last90Days">Last 90 days</option>
                  <option value="lastYear">Last year</option>
                  <option value="custom">Custom range</option>
                </select>
                <Calendar
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <ChevronDown
                  className="absolute right-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>

              <div className="flex space-x-2">
                <button className="px-3 py-2 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <Filter size={18} className="mr-2" />
                  <span className="text-sm">Filter</span>
                </button>

                <button className="px-3 py-2 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <Download size={18} className="mr-2" />
                  <span className="text-sm">Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              {[
                "overview",
                "demographics",
                "behavior",
                "acquisition",
                "retention",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                    activeTab === tab
                      ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Total Users
                </h3>
                <span className="flex items-center text-green-500 text-xs font-medium">
                  <ArrowUpRight size={14} className="mr-1" />
                  8.1%
                </span>
              </div>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {userData.totalUsers.toLocaleString()}
                </p>
                <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  users
                </p>
              </div>
              <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Active Users
                </h3>
                <span className="flex items-center text-green-500 text-xs font-medium">
                  <ArrowUpRight size={14} className="mr-1" />
                  3.2%
                </span>
              </div>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {userData.activeUsers.toLocaleString()}
                </p>
                <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  users
                </p>
              </div>
              <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "67%" }}
                ></div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  New Users
                </h3>
                <span className="flex items-center text-green-500 text-xs font-medium">
                  <ArrowUpRight size={14} className="mr-1" />
                  12.3%
                </span>
              </div>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {userData.newUsers.toLocaleString()}
                </p>
                <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  this month
                </p>
              </div>
              <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: "42%" }}
                ></div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Retention Rate
                </h3>
                <span className="flex items-center text-red-500 text-xs font-medium">
                  <ArrowDownRight size={14} className="mr-1" />
                  1.5%
                </span>
              </div>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {userData.retentionRate}
                </p>
                <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  30-day
                </p>
              </div>
              <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Charts and analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            {/* User growth chart */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  User Growth
                </h3>
                <div className="flex mt-2 sm:mt-0">
                  <button className="px-3 py-1 text-xs font-medium rounded-l-md bg-indigo-600 text-white">
                    Monthly
                  </button>
                  <button className="px-3 py-1 text-xs font-medium border border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    Weekly
                  </button>
                  <button className="px-3 py-1 text-xs font-medium rounded-r-md border border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    Daily
                  </button>
                </div>
              </div>
              <div className="h-60 sm:h-80 relative">
                {/* Simple bar chart visualization */}
                <div className="absolute inset-0 flex items-end justify-between px-4">
                  {userData.userGrowth.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center w-1/8"
                    >
                      <div
                        className="w-full max-w-12 bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-t transition-all duration-200"
                        style={{ height: `${(item.users / 25000) * 100}%` }}
                      ></div>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {item.month}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Y-axis grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0, 1, 2, 3, 4].map((_, index) => (
                    <div
                      key={index}
                      className="w-full h-px bg-gray-200 dark:bg-gray-700"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* User locations */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Top Locations
                </h3>
                <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {userData.topLocations.map((location, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                      <Globe
                        size={16}
                        className="text-indigo-600 dark:text-indigo-400"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {location.country}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {location.percentage}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${location.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional analytics sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            {/* Device usage */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Device Usage
                </h3>
                <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                  Details
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {userData.deviceUsage.map((device, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-2">
                      {device.device === "Mobile" ? (
                        <Smartphone
                          size={18}
                          className="text-indigo-600 dark:text-indigo-400"
                        />
                      ) : device.device === "Desktop" ? (
                        <Monitor
                          size={18}
                          className="text-indigo-600 dark:text-indigo-400"
                        />
                      ) : (
                        <Smartphone
                          size={18}
                          className="text-indigo-600 dark:text-indigo-400"
                        />
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {device.device}
                    </p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">
                      {device.percentage}%
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex h-4 overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-full">
                {userData.deviceUsage.map((device, index) => (
                  <div
                    key={index}
                    className={`h-full ${
                      index === 0
                        ? "bg-indigo-500"
                        : index === 1
                        ? "bg-blue-500"
                        : "bg-purple-500"
                    }`}
                    style={{ width: `${device.percentage}%` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Session statistics */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Session Stats
                </h3>
                <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                  More
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                    <Clock
                      size={16}
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Average Session
                    </p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">
                      {userData.avgSessionDuration}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <Activity
                      size={16}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Pages per Session
                    </p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">
                      4.3
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-3">
                    <RefreshCw
                      size={16}
                      className="text-amber-600 dark:text-amber-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Bounce Rate
                    </p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">
                      32.1%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Recent Users
                </h3>
                <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                  View all
                </button>
              </div>
              <div className="space-y-3">
                {userData.recentUsers.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <div className="relative">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${
                          user.status === "active"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      ></span>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.joinDate}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Retention and Churn Analysis */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-800 mb-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Retention Cohort Analysis
              </h3>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <button className="px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-md">
                  Weekly
                </button>
                <button className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                  Monthly
                </button>
                <button className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                  Quarterly
                </button>
              </div>
            </div>

            {/* Retention table visualization */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <th className="px-3 py-3 bg-gray-50 dark:bg-gray-800">
                      Cohort
                    </th>
                    <th className="px-3 py-3 bg-gray-50 dark:bg-gray-800">
                      Users
                    </th>
                    <th className="px-3 py-3 bg-gray-50 dark:bg-gray-800">
                      Week 0
                    </th>
                    <th className="px-3 py-3 bg-gray-50 dark:bg-gray-800">
                      Week 1
                    </th>
                    <th className="px-3 py-3 bg-gray-50 dark:bg-gray-800">
                      Week 2
                    </th>
                    <th className="px-3 py-3 bg-gray-50 dark:bg-gray-800">
                      Week 3
                    </th>
                    <th className="px-3 py-3 bg-gray-50 dark:bg-gray-800">
                      Week 4
                    </th>
                    <th className="px-3 py-3 bg-gray-50 dark:bg-gray-800">
                      Week 5
                    </th>
                    <th className="px-3 py-3 bg-gray-50 dark:bg-gray-800">
                      Week 6
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    {
                      cohort: "Jan",
                      users: 2854,
                      retention: [100, 88.8, 79.5, 74.2, 68.2, 65.4, 59.4],
                    },
                    {
                      cohort: "Feb",
                      users: 2960,
                      retention: [100, 89.2, 80.6, 72.1, 65.3, 62.3, 55.7],
                    },
                    {
                      cohort: "Mar",
                      users: 3112,
                      retention: [100, 87.5, 78.2, 70.5, 64.8, 61.2, 0],
                    },
                    {
                      cohort: "Apr",
                      users: 3021,
                      retention: [100, 90.1, 82.5, 76.3, 69.5, 0, 0],
                    },
                    {
                      cohort: "May",
                      users: 3154,
                      retention: [100, 88.6, 81.2, 75.8, 0, 0, 0],
                    },
                    {
                      cohort: "Jun",
                      users: 3264,
                      retention: [100, 92.4, 84.7, 0, 0, 0, 0],
                    },
                    {
                      cohort: "Jul",
                      users: 3521,
                      retention: [100, 91.2, 0, 0, 0, 0, 0],
                    },
                  ].map((cohort, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      <td className="px-3 py-3 text-sm font-medium text-gray-800 dark:text-white">
                        {cohort.cohort}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">
                        {cohort.users.toLocaleString()}
                      </td>
                      {cohort.retention.map((rate, i) => (
                        <td key={i} className="px-3 py-3">
                          {rate > 0 ? (
                            <div className="relative flex items-center justify-center">
                              <div
                                className={`absolute inset-0 ${getRetentionColor(
                                  rate
                                )}`}
                                style={{ opacity: rate / 100 }}
                              ></div>
                              <span className="relative text-sm font-medium text-gray-800 dark:text-white">
                                {rate.toFixed(1)}%
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400 dark:text-gray-600">
                              -
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer info */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8 mb-4">
            <p>© 2025 AdminPanel. All rights reserved.</p>
            <p className="mt-1">
              Data shown is from{" "}
              {dateRange === "last30Days"
                ? "February 20 - March 22, 2025"
                : "the selected period"}
              .
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper function to get retention cell background color
function getRetentionColor(rate) {
  if (rate >= 80) return "bg-blue-600 dark:bg-blue-700";
  if (rate >= 70) return "bg-blue-500 dark:bg-blue-600";
  if (rate >= 60) return "bg-blue-400 dark:bg-blue-500";
  if (rate >= 50) return "bg-blue-300 dark:bg-blue-400";
  return "bg-blue-200 dark:bg-blue-300";
}

// Import missing icons from lucide-react
function Clock(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function Activity(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function RefreshCw(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
}
