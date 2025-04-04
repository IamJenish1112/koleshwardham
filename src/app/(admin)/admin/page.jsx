import { div } from "framer-motion/client";
import React from "react";
import { ChevronRight, Users, BarChart2, Settings } from "lucide-react";
function Page() {
  return (
    <>
      {/* Page title and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 animate-fadeIn">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back, Sarah! Here's what's happening today.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300">
            Export
          </button>
          <button className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors duration-300 flex items-center">
            <span>Add New</span>
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        {/* Stats cards */}
        {[
          {
            title: "Total Users",
            value: "24,521",
            change: "+12%",
            icon: <Users size={24} />,
          },
          {
            title: "Revenue",
            value: "$86,589",
            change: "+8%",
            icon: <BarChart2 size={24} />,
          },
          {
            title: "Active Projects",
            value: "34",
            change: "+2%",
            icon: <Settings size={24} />,
          },
          {
            title: "Conversion Rate",
            value: "6.48%",
            change: "+1.2%",
            icon: <BarChart2 size={24} />,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mt-1">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-green-500 mt-1">
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity and chart sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Chart section */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-800 animate-fadeInLeft">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Analytics Overview
            </h3>
            <select className="text-sm border rounded-md px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="h-60 md:h-80 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
            Chart placeholder
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-800 animate-fadeInRight">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4 overflow-y-auto max-h-60 md:max-h-80">
            {[
              {
                user: "John Doe",
                action: "created a new project",
                time: "2 hours ago",
              },
              {
                user: "Alice Smith",
                action: "completed task: Homepage redesign",
                time: "5 hours ago",
              },
              {
                user: "Robert Johnson",
                action: 'commented on "Budget Planning"',
                time: "1 day ago",
              },
              {
                user: "Emma Wilson",
                action: "uploaded 3 new files",
                time: "2 days ago",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  {activity.user.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-gray-800 dark:text-white">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-300">
            View all activity
          </button>
        </div>
      </div>
    </>
  );
}

export default Page;
