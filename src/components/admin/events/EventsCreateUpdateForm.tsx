"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import EventForm from "@/app/(admin)/admin_OLD/form";

interface DrawerProps {
  width?: string;
  event?: any;
  isUpdate?: boolean;
  show?: boolean;
  handleclose?: () => void;
}
const Drawer: React.FC<DrawerProps> = ({
  width = "w-[70vw]",
  event = {},
  isUpdate = false,
  show = false,
  handleclose,
}) => {
  return (
    <>
      {/* Drawer & Overlay */}
      <AnimatePresence>
        {show && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => handleclose}
            />

            {/* Drawer (Right Side) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              className={`fixed right-0 top-0 h-full ${width} bg-white  shadow-lg p-5 z-50 `}
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center">
                <button onClick={handleclose}>
                  <X className="w-6 h-6 text-gray-600  hover:text-red-500 transition" />
                </button>
              </div>
              <div className="overflow-y-auto h-full">
                <EventForm event={event} isEdit={isUpdate} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Drawer;
