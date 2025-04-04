// app/not-found.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Auto-redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex items-center justify-center px-4 transition-colors duration-300">
          <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900 rounded-full animate-ping opacity-25"></div>
                <div className="relative flex items-center justify-center w-full h-full bg-purple-100 dark:bg-purple-900 rounded-full">
                  <span className="text-5xl font-bold text-purple-500 dark:text-purple-400">
                    404
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Page Not Found
              </h1>

              <p className="text-gray-600 dark:text-gray-300 mb-8">
                The page you are looking for doesn't exist or has been moved.
              </p>

              <div className="space-y-4">
                <Link
                  href="/"
                  className="inline-block w-full px-6 py-3 text-white font-medium bg-purple-600 hover:bg-purple-700 rounded-md transition-colors duration-200 shadow-md"
                >
                  Return to Home
                </Link>

                <button
                  onClick={() => router.back()}
                  className="inline-block w-full px-6 py-3 text-gray-700 dark:text-gray-200 font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                >
                  Go Back
                </button>
              </div>

              <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                Redirecting to home page in{" "}
                <span className="font-medium">{countdown}</span> seconds
              </div>
            </div>

            <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
          </div>
        </div>
      </body>
    </html>
  );
}
