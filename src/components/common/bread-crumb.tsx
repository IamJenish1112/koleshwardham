"use client";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-gray-100 py-3 px-6 rounded-md w-full">
      <ul className="flex items-center space-x-2 text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className="text-orange-600 hover:text-orange-400 transition font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <FiChevronRight className="mx-2 text-gray-400" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
