"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";

// Define types for the event and component props
interface ImageType {
  file: File;
  preview: string;
  name: string;
}

interface EventType {
  _id?: string;
  title: string;
  shortDescription: string;
  description: string;
  date: string;
  location: string;
  images: string[] | ImageType[];
}

interface EventFormProps {
  event?: EventType;
  isEdit?: boolean;
}

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  shortDescription: Yup.string()
    .required("Short description is required")
    .min(10, "Short description must be at least 10 characters")
    .max(250, "Short description must be less than 250 characters"),
  date: Yup.date()
    .required("Date is required")
    .min(new Date(), "Date cannot be in the past"),
  location: Yup.string()
    .required("Location is required")
    .min(3, "Location must be at least 3 characters"),
});

const EventForm: React.FC<EventFormProps> = ({ event, isEdit = false }) => {
  // State for form values
  const [formData, setFormData] = useState<EventType>({
    _id: event?._id || "",
    title: event?.title || "",
    shortDescription: event?.shortDescription || "",
    description: event?.description || "",
    date: event?.date ? new Date(event.date).toISOString().substr(0, 10) : "",
    location: event?.location || "",
    images: [],
  });

  // State for validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // State for touched fields
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // State for images
  const [images, setImages] = useState<ImageType[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Refs
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  console.log("event at form", event);

  // Initialize Quill
  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
        placeholder: "Describe your event in detail...",
      });

      // Set initial description if editing an event
      if (event?.description) {
        quillRef.current.root.innerHTML = event.description;
      }

      // Update state when editor content changes
      quillRef.current.on("text-change", function () {
        if (quillRef.current) {
          const content = quillRef.current.root.innerHTML;
          setFormData((prev) => ({ ...prev, description: content }));
        }
      });
    }
  }, [event?.description]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // Handle blur for validation
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name as keyof EventType]);
  };

  // Validate a single field
  const validateField = (name: string, value: any) => {
    try {
      // Create a schema just for this field
      const fieldSchema = Yup.reach(validationSchema, name);

      // Use type assertion to tell TypeScript this is a schema with validateSync
      // Or handle both possible return types
      if (fieldSchema) {
        // Cast the field schema to any to bypass TypeScript's type checking
        (fieldSchema as any).validateSync(value);

        // Clear error if validation passes
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    } catch (error) {
      // Set error message if validation fails
      if (error instanceof Yup.ValidationError) {
        setErrors((prev) => ({
          ...prev,
          [name]: error.message,
        }));
      }
    }
  };

  // Validate all fields
  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};

        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });

        setErrors(validationErrors);

        // Mark all fields as touched
        const touchedFields: { [key: string]: boolean } = {};
        Object.keys(validationErrors).forEach((key) => {
          touchedFields[key] = true;
        });
        setTouched((prev) => ({ ...prev, ...touchedFields }));
      }
      return false;
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const isValid = await validateForm();

    if (!isValid) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object for multipart/form-data submission
      const formDataToSubmit = new FormData();

      // Add text fields to FormData
      if (isEdit) {
        formDataToSubmit.append("id", formData._id || "");
      }
      formDataToSubmit.append("title", formData.title);
      formDataToSubmit.append("shortDescription", formData.shortDescription);
      formDataToSubmit.append("date", formData.date);
      formDataToSubmit.append("location", formData.location);

      // Add Quill editor content
      if (quillRef.current) {
        formDataToSubmit.append("description", quillRef.current.root.innerHTML);
      }

      // Add image files to FormData
      images.forEach((image) => {
        formDataToSubmit.append("images", image.file);
      });

      // Send data to API
      let response;
      if (isEdit) {
        response = await axios.post(
          "http://localhost:3002/api/v1/events/update",
          formDataToSubmit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:3002/api/v1/events/create",
          formDataToSubmit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      // Show success message
      toast.success(
        isEdit ? "Event updated successfully!" : "Event created successfully!",
        {
          style: { background: "#FFF8F3", borderLeft: "5px solid #FF8C38" },
        }
      );

      // Reset form on successful submission
      if (!isEdit) {
        setFormData({
          title: "",
          shortDescription: "",
          description: "",
          date: "",
          location: "",
          images: [],
        });
        setImages([]);
        if (quillRef.current) {
          quillRef.current.root.innerHTML = "";
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      const fileArray = Array.from(e.dataTransfer.files);
      const validFiles = fileArray.filter((file) =>
        file.type.startsWith("image/")
      );

      if (validFiles.length !== fileArray.length) {
        toast.error("Only image files are allowed", {
          style: { background: "#FFF0EB", borderLeft: "5px solid #FF5722" },
        });
      }

      if (validFiles.length > 0) {
        handleFiles(validFiles);
      }
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      handleFiles(fileArray);
    }
  };

  // Process selected files
  const handleFiles = (files: File[]) => {
    // Convert files to preview URLs
    const newImages: ImageType[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages([...images, ...newImages]);
    toast.info(`${files.length} image(s) added`, {
      style: { background: "#FFF8F3", borderLeft: "5px solid #FF8C38" },
    });
  };

  // Remove image
  const removeImage = (index: number) => {
    const newImages = [...images];

    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(newImages[index].preview);

    newImages.splice(index, 1);
    setImages(newImages);
    toast.info("Image removed", {
      style: { background: "#FFF8F3", borderLeft: "5px solid #FF8C38" },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white">
      {/* Main Content */}
      <motion.div
        className="w-full max-w-6xl bg-white rounded-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Form Header */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 px-8 py-6">
          <motion.h2
            className="text-3xl font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isEdit ? "Update Event Details" : "Create a New Event"}
          </motion.h2>
          <p className="text-orange-100 mt-2">
            Fill in the details below to {isEdit ? "update your" : "create an"}{" "}
            event
          </p>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            datatype="multipart"
          >
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-700"
              >
                Event Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter event title"
                className={`w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.title && touched.title
                    ? "border-red-500 focus:ring-red-200"
                    : "border-orange-200 focus:ring-orange-200"
                }`}
              />
              {errors.title && touched.title && (
                <div className="text-red-500 text-sm mt-1">{errors.title}</div>
              )}
            </div>

            {/* Short Description field */}
            <div className="space-y-2">
              <label
                htmlFor="shortDescription"
                className="block text-lg font-medium text-gray-700"
              >
                Short Description
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter a brief summary of your event (250 characters max)"
                rows={2}
                className={`w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.shortDescription && touched.shortDescription
                    ? "border-red-500 focus:ring-red-200"
                    : "border-orange-200 focus:ring-orange-200"
                }`}
              />
              {errors.shortDescription && touched.shortDescription && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.shortDescription}
                </div>
              )}
              {formData.shortDescription && (
                <div className="text-sm text-gray-500">
                  {formData.shortDescription.length}/250 characters
                </div>
              )}
            </div>

            {/* Rich Text Editor for Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-700"
              >
                Event Description
              </label>
              <div
                ref={editorRef}
                className={`bg-white border rounded-lg ${
                  errors.description && touched.description
                    ? "border-red-500"
                    : "border-orange-200"
                }`}
              />
              {errors.description && touched.description && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.description}
                </div>
              )}
            </div>

            {/* Date field */}
            <div className="space-y-2">
              <label
                htmlFor="date"
                className="block text-lg font-medium text-gray-700"
              >
                Event Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.date && touched.date
                    ? "border-red-500 focus:ring-red-200"
                    : "border-orange-200 focus:ring-orange-200"
                }`}
              />
              {errors.date && touched.date && (
                <div className="text-red-500 text-sm mt-1">{errors.date}</div>
              )}
            </div>

            {/* Location field */}
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="block text-lg font-medium text-gray-700"
              >
                Event Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter event location"
                className={`w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.location && touched.location
                    ? "border-red-500 focus:ring-red-200"
                    : "border-orange-200 focus:ring-orange-200"
                }`}
              />
              {errors.location && touched.location && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.location}
                </div>
              )}
            </div>

            {/* Image Upload Section */}
            <div className="space-y-3">
              <label className="block text-lg font-medium text-gray-700">
                Event Images
              </label>

              <motion.div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging
                    ? "border-orange-500 bg-orange-50"
                    : "border-orange-200 hover:border-orange-400"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={handleDrop}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="space-y-3">
                  <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-orange-100">
                    <svg
                      className="h-8 w-8 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer"
                    >
                      <span className="inline-block px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors">
                        Choose Images
                      </span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileInputChange}
                      />
                    </label>
                    <p className="mt-2">or drag and drop images here</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </motion.div>

              {/* Image Preview */}
              {images.length > 0 && (
                <motion.div
                  className="mt-6 bg-orange-50 p-4 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-lg font-medium text-gray-700 mb-3">
                    Image Preview
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <motion.div
                        key={index}
                        className="relative rounded-lg overflow-hidden shadow bg-white"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                        }}
                      >
                        <div className="aspect-w-16 aspect-h-9 h-32">
                          <img
                            src={image.preview}
                            alt={`Preview ${index}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-2 truncate text-xs text-gray-500">
                          {image.name}
                        </div>
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition-colors"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-bold text-lg shadow-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 15px -3px rgba(255, 159, 85, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                `${isEdit ? "Update" : "Create"} Event`
              )}
            </motion.button>
          </form>

          {/* uploaded images in existing event */}
          {event && event.images && event.images.length > 0 && (
            <div className="mt-6 bg-orange-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-700 mb-3">
                Uploaded Images
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {event.images.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative rounded-lg overflow-hidden shadow bg-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                  >
                    <div className="aspect-w-16 aspect-h-9 h-32">
                      <img
                        src={typeof image === "string" ? image : image.preview}
                        alt={`Preview ${index}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-2 truncate text-xs text-gray-500">
                      {typeof image === "string"
                        ? `Image ${index + 1}`
                        : image.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default EventForm;
