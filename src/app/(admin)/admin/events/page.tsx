"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Eye,
  Pen,
  Trash,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
} from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import {
  getEvents,
  updateEvent,
  deleteEvent,
  Event,
  AllEventsApiResponse,
} from "@/lib/services/events";
import Drawer from "@/components/admin/events/EventsCreateUpdateForm";

// Define interface for the events table (same structure as API but with additional UI properties)
interface EventTableItem extends Event {
  id: string; // For table functionality
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventTableItem[]>([]);
  const [allEvents, setAllEvents] = useState<EventTableItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<EventTableItem[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const searchRef = useRef<HTMLDivElement>(null);
  const eventsPerPage: number = 5;
  const [showEventForm, setShowEventForm] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Sorting and Column Visibility State
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Define columns for the table
  const columns: ColumnDef<EventTableItem>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent hover:underline"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-semibold text-gray-800 truncate max-w-[200px]">
          {row.getValue("title")}
        </div>
      ),
    },
    {
      accessorKey: "shortDescription",
      header: "Short Description",
      cell: ({ row }) => (
        <div className="text-gray-600 truncate max-w-[250px]">
          {row.getValue("shortDescription")}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent hover:underline"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return (
          <div className="text-gray-700">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div className="text-gray-600 truncate max-w-[150px]">
          {row.getValue("location")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-100 flex items-center"
                onClick={() => {
                  const event = {
                    _id: row.original._id,
                    title: row.original.title,
                    shortDescription: row.original.shortDescription,
                    images: row.original.images,
                    date: row.original.date,
                    location: row.original.location,
                    description: row.original.description,
                  };
                  setSelectedEvent(event);
                  setShowEventForm(true);
                }}
              >
                <Eye className="mr-2 h-4 w-4 text-green-500" /> View
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-100 flex items-center"
                onClick={() => {
                  const event = {
                    _id: row.original._id,
                    title: row.original.title,
                    shortDescription: row.original.shortDescription,
                    images: row.original.images,
                    date: row.original.date,
                    location: row.original.location,
                    description: row.original.description,
                  };
                  setSelectedEvent(event);
                  setShowEventForm(true);
                }}
              >
                <Pen className="mr-2 h-4 w-4 text-blue-500" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-100 flex items-center text-red-500"
                onClick={() => handleDeleteEvent(row.original._id)}
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Handle event deletion
  const handleDeleteEvent = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await deleteEvent(id);
        if (response.status === 1) {
          // Remove the deleted event from the state
          setEvents(events.filter((event) => event._id !== id));
          setAllEvents(allEvents.filter((event) => event._id !== id));
          alert("Event deleted successfully");
        } else {
          alert("Failed to delete event");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("An error occurred while deleting the event");
      }
    }
  };

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await getEvents();
        if (response.status === 1) {
          // Format the API data to match our component structure
          const formattedEvents: EventTableItem[] = response.items.map(
            (event) => ({
              ...event,
              id: event._id, // Add id field for table functionality
            })
          );
          setEvents(formattedEvents);
          setAllEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle Search and Filter Logic
  useEffect(() => {
    // Search filter
    let filteredEvents: EventTableItem[] = allEvents.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Date filter
    if (startDate && endDate) {
      filteredEvents = filteredEvents.filter(
        (event) => event.date >= startDate && event.date <= endDate
      );
    } else if (startDate) {
      filteredEvents = filteredEvents.filter(
        (event) => event.date >= startDate
      );
    } else if (endDate) {
      filteredEvents = filteredEvents.filter((event) => event.date <= endDate);
    }

    setEvents(filteredEvents);

    // Search dropdown results (limit to 5 items)
    if (searchTerm.length > 0) {
      setSearchResults(
        allEvents
          .filter((event) =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 5)
      );
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }

    setCurrentPage(1);
  }, [searchTerm, startDate, endDate, allEvents]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Create new event handler
  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setShowEventForm(true);
  };

  // Initialize the table
  const table = useReactTable({
    data: events,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageSize: eventsPerPage,
        pageIndex: currentPage - 1,
      },
    },
  });

  // Pagination Logic
  const totalPages: number = Math.ceil(events.length / eventsPerPage);

  return (
    <div className="container mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        {/* title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl text-gray-800"
        >
          Manage Your Events
        </motion.h1>

        {/* Search & Filter Section */}
        <div className="my-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Bar with Dropdown */}
            <div className="relative" ref={searchRef}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full px-5 py-3 bg-white border border-gray-300 rounded-full shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-16"
                />
                <button className="absolute right-0 h-full px-4 rounded-r-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white focus:outline-none hover:opacity-90 transition">
                  <FiSearch className="text-lg" />
                </button>
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showDropdown && searchResults.length > 0 && (
                  <motion.div
                    className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {searchResults.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 border-b border-gray-100 hover:bg-indigo-50 cursor-pointer"
                        onClick={() => {
                          setSearchTerm(event.title);
                          setShowDropdown(false);
                        }}
                      >
                        <p className="font-medium text-gray-800">
                          {event.title}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Date Picker - Start Date */}
            <div className="relative">
              <div className="flex items-center">
                <FiCalendar className="absolute left-3 text-gray-500" />
                <input
                  type="date"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStartDate(e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-full shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            {/* Date Picker - End Date */}
            <div className="relative">
              <div className="flex items-center">
                <FiCalendar className="absolute left-3 text-gray-500" />
                <input
                  type="date"
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEndDate(e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-full shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            {/* Create Event Button */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateEvent}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center gap-2"
              >
                <IoAdd size={24} />
                Create Event
              </motion.button>
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Data Table */}
            <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <th
                            key={header.id}
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-gray-50 transition duration-150 ease-in-out"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="px-4 py-4 whitespace-nowrap"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Premium Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="inline-flex items-center bg-white shadow-md rounded-full px-2 py-1">
              <motion.button
                onClick={() => {
                  table.previousPage();
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
                disabled={!table.getCanPreviousPage()}
                className={`p-2 mx-1 rounded-full transition-all duration-300 ${
                  !table.getCanPreviousPage()
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-indigo-500 hover:bg-indigo-50"
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <FiArrowLeft className="text-xl" />
              </motion.button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <motion.button
                    key={page}
                    onClick={() => {
                      table.setPageIndex(page - 1);
                      setCurrentPage(page);
                    }}
                    className={`w-10 h-10 rounded-full mx-1 font-medium transition-all duration-300 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-indigo-50"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {page}
                  </motion.button>
                )
              )}

              <motion.button
                onClick={() => {
                  table.nextPage();
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }}
                disabled={!table.getCanNextPage()}
                className={`p-2 mx-1 rounded-full transition-all duration-300 ${
                  !table.getCanNextPage()
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-indigo-500 hover:bg-indigo-50"
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <FiArrowRight className="text-xl" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
      <Drawer
        show={showEventForm}
        event={selectedEvent}
        handleclose={() => setShowEventForm(false)}
        isUpdate={Boolean(selectedEvent)}
      />
    </div>
  );
}
