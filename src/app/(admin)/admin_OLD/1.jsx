"use client";

import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface ImageType {
  file: File;
  preview: string;
  name: string;
}

interface EventType {
  title?: string;
  shortDescription?: string;
  description?: string;
  date?: string;
  location?: string;
  images?: ImageType[];
}

interface EventFormProps {
  event?: EventType;
  isEdit?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ event, isEdit = false }) => {
  const [images, setImages] = useState<ImageType[]>(event?.images || []);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

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
    }
  }, []);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement> | DragEvent) => {
    const files = e instanceof DragEvent ? e.dataTransfer?.files : e.target.files;
    if (!files) return;

    const newImages: ImageType[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  // Remove an image
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required").min(3).max(100),
    shortDescription: Yup.string().required("Short description is required").min(10).max(250),
    date: Yup.date().required("Date is required").min(new Date(), "Date cannot be in the past"),
    location: Yup.string().required("Location is required").min(3),
  });

  const initialValues = {
    title: event?.title || "",
    shortDescription: event?.shortDescription || "",
    description: event?.description || "",
    date: event?.date ? new Date(event.date).toISOString().substr(0, 10) : "",
    location: event?.location || "",
  };

  const handleSubmit = (values: typeof initialValues, { setSubmitting, resetForm }: any) => {
    const descriptionContent = quillRef.current?.root.innerHTML || "";

    const payload = {
      ...values,
      description: descriptionContent,
      images: images,
    };

    setTimeout(() => {
      console.log("Form submitted:", payload);

      toast.success(isEdit ? "Event updated successfully!" : "Event created successfully!", {
        style: { background: "#FFF8F3", borderLeft: "5px solid #FF8C38" },
      });

      if (!isEdit) {
        resetForm();
        setImages([]);
        quillRef.current?.root.innerHTML = "";
      }

      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white">
      <header className="bg-orange-500 text-white py-4 px-6 shadow-lg">
        <h1 className="text-2xl font-bold">Event Management</h1>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <motion.div
          className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">{isEdit ? "Update Event Details" : "Create a New Event"}</h2>
            <p className="text-orange-100 mt-2">Fill in the details below to {isEdit ? "update" : "create"} your event.</p>
          </div>

          <div className="p-8">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <Field name="title" placeholder="Event Title" className="w-full px-4 py-3 border rounded-lg" />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />

                  <Field as="textarea" name="shortDescription" placeholder="Short Description" rows={2} className="w-full px-4 py-3 border rounded-lg" />
                  <ErrorMessage name="shortDescription" component="div" className="text-red-500 text-sm" />

                  {/* Quill Editor */}
                  <div>
                    <label className="block font-medium">Event Description</label>
                    <div ref={editorRef} className="h-52 bg-white border rounded-lg" />
                  </div>

                  <Field type="date" name="date" className="w-full px-4 py-3 border rounded-lg" />
                  <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />

                  <Field type="text" name="location" placeholder="Event Location" className="w-full px-4 py-3 border rounded-lg" />
                  <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />

                  {/* Image Upload Section */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${isDragging ? "bg-gray-100" : "bg-white"}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleImageUpload(e);
                    }}
                  >
                    <p className="text-gray-500">Drag & Drop images here or click to select</p>
                    <input type="file" multiple onChange={handleImageUpload} className="hidden" />
                  </div>

                  {/* Image Preview */}
                  <div className="flex flex-wrap gap-3">
                    {images.map((img, index) => (
                      <div key={index} className="relative w-24 h-24 border">
                        <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">X</button>
                      </div>
                    ))}
                  </div>

                  <button type="submit" className="bg-orange-500 text-white px-6 py-3 rounded-lg">{isEdit ? "Update Event" : "Create Event"}</button>
                </Form>
              )}
            </Formik>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default EventForm;
