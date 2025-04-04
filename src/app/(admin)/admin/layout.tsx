"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";
import "../../globals.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

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

  // First useEffect: Run once on mount to set initial preferences
  useEffect(() => {
    setMounted(true);
    // Check system preference for dark mode
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
  }, []); // Empty dependency array = run once on mount

  // Second useEffect: Apply dark mode class whenever darkMode state changes
  useEffect(() => {
    if (!mounted) return;

    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, mounted]); // Run whenever darkMode or mounted changes

  // Main content classes
  const mainClasses = `transition-all duration-300 ease-in-out w-full ${
    sidebarOpen ? "lg:ml-64" : "lg:ml-20"
  }`;

  if (!mounted) return null;
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 bg-gray-900/50 z-20 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
          <Sidebar
            sidebarOpen={sidebarOpen}
            mobileMenuOpen={mobileMenuOpen}
            toggleSidebar={toggleSidebar}
            toggleMobileMenu={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          />

          {/* Main Content */}
          <div className={`flex-1 flex flex-col ${mainClasses}`}>
            {/* Header */}
            <Header
              toggleDarkMode={toggleDarkMode}
              toggleSidebar={toggleSidebar}
              darkMode={darkMode}
              toggleProfileDropdown={toggleProfileDropdown}
              profileDropdownOpen={profileDropdownOpen}
            />
            {/* Main content with improved scrolling */}
            <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
