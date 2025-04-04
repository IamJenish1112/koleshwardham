"use client";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import Link from "next/link";
import { FaLocationPin } from "react-icons/fa6";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="bg-orange-400 text-white pt-10 pb-2">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 📍 Address Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3">koleshwar Dham</h2>
          <div className="flex gap-1">
            <LuMapPin size={25} />
            <p> Near River, koleshwar, India</p>
          </div>
          <div className="flex gap-1 mt-3">
            <LuMail size={25} />
            <a href="mailto:info@koleshwardham.com" className="hover:underline">
              info@koleshwardham.com
            </a>
          </div>
          <div className="flex gap-1 mt-3">
            <LuPhone size={25} />
            <a href="tel:+919876543210" className="hover:underline">
              +91 98765 43210
            </a>
          </div>
        </div>

        {/* 🏛️ About Trust */}
        <div>
          <h3 className="text-xl font-semibold mb-3">About the Trust</h3>
          <p className="text-md text-gray-100">
            koleshwar Dham Trust is dedicated to preserving spiritual and
            cultural heritage. We organize community events, charity programs,
            and temple maintenance to serve devotees.
          </p>
        </div>

        {/* 🔗 Useful Links (Styled Differently) */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { href: "/", label: "Home" },
              { href: "/about-temple", label: "About Temple" },
              { href: "/about-trust", label: "About Trust" },
              { href: "/history-ancient", label: "Ancient History" },
              { href: "/history-modern", label: "Modern History" },
              { href: "/events", label: "Events" },
              { href: "/donate-money", label: "Donate Money" },
              { href: "/donate-items", label: "Donate Items" },
              { href: "/gallery", label: "Gallery" },
              { href: "/contact", label: "Contact" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="relative inline-block transition-all duration-300 text-white 
                before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 
                before:bg-white before:transition-all before:duration-300 
                hover:before:w-full hover:text-gray-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 🌐 Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              { href: "https://facebook.com", icon: <FiFacebook /> },
              { href: "https://instagram.com", icon: <FiInstagram /> },
              { href: "https://twitter.com", icon: <FiTwitter /> },
              { href: "https://youtube.com", icon: <FiYoutube /> },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl transition-transform transform hover:scale-110 hover:text-gray-200"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* developer info */}
          <div className="text-sm mt-4">
            <p className="">
              Developed by{" "}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold"
              >
                Kolva Infotech
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* 🔽 Bottom Section */}
      <div className="border-t border-gray-200 mt-6 pt-4 text-center text-sm">
        <p className="">
          &copy; {new Date().getFullYear()} koleshwar Dham. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
