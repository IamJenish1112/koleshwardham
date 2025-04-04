import React, { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";

interface FormData {
  fullName: string;
  email: string;
  paymentMethod: string;
  isRecurring: boolean;
  customAmount: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  customAmount?: string;
}

const DonationSection: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState<string>("1000");
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    paymentMethod: "card",
    isRecurring: false,
    customAmount: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleDonationAmountChange = (amount: string) => {
    setDonationAmount(amount);
    setIsCustomAmount(amount === "custom");
    if (amount !== "custom") {
      setFormData({
        ...formData,
        customAmount: "",
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (
      isCustomAmount &&
      (!formData.customAmount || parseInt(formData.customAmount) <= 0)
    ) {
      newErrors.customAmount = "Please enter a valid amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);

        // Reset form after success
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            fullName: "",
            email: "",
            paymentMethod: "card",
            isRecurring: false,
            customAmount: "",
          });
          setDonationAmount("1000");
          setIsCustomAmount(false);
        }, 3000);
      }, 1500);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      className="py-16 px-4 md:px-8 bg-gray-100 text-gray-800"
      aria-labelledby="donation-section-title"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Inspiring Content Section */}
          <motion.div
            className="lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              id="donation-section-title"
              className="text-3xl md:text-4xl font-bold mb-4 text-orange-500"
              variants={itemVariants}
            >
              Make a Difference Today
            </motion.h2>

            <motion.p
              className="text-lg mb-6 text-gray-600"
              variants={itemVariants}
            >
              Your support helps us serve those in need. Every contribution
              counts towards building a better tomorrow for communities facing
              challenges.
            </motion.p>

            <motion.div
              className="relative h-64 md:h-96 mb-6 rounded-lg overflow-hidden"
              variants={itemVariants}
            >
              <img
                src="/api/placeholder/800/600"
                alt="Community members benefiting from our services"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <p className="text-white font-medium text-lg">
                  "Thanks to your donations, we've helped over 10,000 families
                  across the country."
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 mb-6"
              variants={itemVariants}
            >
              <div className="p-4 rounded-lg bg-orange-50 flex-1 min-w-[140px]">
                <h3 className="text-xl font-semibold text-orange-500">
                  ₹20 Lakhs
                </h3>
                <p className="text-gray-600">Raised this year</p>
              </div>
              <div className="p-4 rounded-lg bg-orange-50 flex-1 min-w-[140px]">
                <h3 className="text-xl font-semibold text-orange-500">50+</h3>
                <p className="text-gray-600">Community projects</p>
              </div>
              <div className="p-4 rounded-lg bg-orange-50 flex-1 min-w-[140px]">
                <h3 className="text-xl font-semibold text-orange-500">
                  15,000+
                </h3>
                <p className="text-gray-600">Lives impacted</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Donation Form Section */}
          <motion.div
            className="lg:w-1/2 rounded-xl p-6 md:p-8 shadow-lg bg-white border border-gray-100"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isSuccess ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-4">
                  Your donation has been successfully processed. Together, we're
                  making a difference!
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                aria-labelledby="donation-form-title"
              >
                <motion.h3
                  id="donation-form-title"
                  className="text-2xl font-bold mb-6 text-orange-500 text-center"
                  variants={itemVariants}
                >
                  Donate Now
                </motion.h3>

                {/* Donation Amounts */}
                <motion.div className="mb-6" variants={itemVariants}>
                  <label className="block text-sm font-medium mb-2">
                    Select Donation Amount
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["500", "1000", "2500", "5000"].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={`py-2 px-4 rounded-lg border transition-colors duration-200 ${
                          donationAmount === amount
                            ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                            : "bg-white border-gray-300 hover:bg-gray-100"
                        }`}
                        onClick={() => handleDonationAmountChange(amount)}
                      >
                        ₹{parseInt(amount).toLocaleString("en-IN")}
                      </button>
                    ))}
                    <button
                      type="button"
                      className={`col-span-2 sm:col-span-4 py-2 px-4 rounded-lg border transition-colors duration-200 ${
                        isCustomAmount
                          ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                          : "bg-white border-gray-300 hover:bg-gray-100"
                      }`}
                      onClick={() => handleDonationAmountChange("custom")}
                    >
                      Custom Amount
                    </button>
                  </div>

                  {isCustomAmount && (
                    <div className="mt-3">
                      <label htmlFor="customAmount" className="sr-only">
                        Custom Amount
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">₹</span>
                        </div>
                        <input
                          type="number"
                          id="customAmount"
                          name="customAmount"
                          className="w-full pl-8 pr-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Enter amount"
                          value={formData.customAmount}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.customAmount && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.customAmount}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* Personal Information */}
                <motion.div className="mb-6 space-y-4" variants={itemVariants}>
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      aria-invalid={errors.fullName ? "true" : "false"}
                      aria-describedby={
                        errors.fullName ? "fullNameError" : undefined
                      }
                    />
                    {errors.fullName && (
                      <p
                        id="fullNameError"
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "emailError" : undefined}
                    />
                    {errors.email && (
                      <p id="emailError" className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Payment Method */}
                <motion.div className="mb-6" variants={itemVariants}>
                  <label className="block text-sm font-medium mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: "card", label: "Credit/Debit" },
                      { id: "upi", label: "UPI" },
                      { id: "paypal", label: "PayPal" },
                      { id: "razorpay", label: "Razorpay" },
                      { id: "stripe", label: "Stripe" },
                    ].map((method) => (
                      <div key={method.id}>
                        <input
                          type="radio"
                          id={method.id}
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <label
                          htmlFor={method.id}
                          className={`block py-2 px-4 text-sm font-medium text-center rounded-lg border cursor-pointer transition-colors duration-200 ${
                            formData.paymentMethod === method.id
                              ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                              : "bg-white border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {method.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Recurring Donation */}
                <motion.div className="mb-8" variants={itemVariants}>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isRecurring"
                      name="isRecurring"
                      checked={formData.isRecurring}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label
                      htmlFor="isRecurring"
                      className="ml-2 text-sm font-medium"
                    >
                      Make this a monthly recurring donation
                    </label>
                  </div>
                  {formData.isRecurring && (
                    <p className="mt-2 text-sm text-gray-500">
                      You can cancel your recurring donation at any time from
                      your account
                    </p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white text-center transition-colors duration-200 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      `Donate ${
                        isCustomAmount
                          ? formData.customAmount
                            ? `₹${parseInt(
                                formData.customAmount
                              ).toLocaleString("en-IN")}`
                            : "Now"
                          : `₹${parseInt(donationAmount).toLocaleString(
                              "en-IN"
                            )}`
                      }`
                    )}
                  </button>

                  <p className="mt-4 text-xs text-center text-gray-500">
                    All donations are secure and encrypted. By donating, you
                    agree to our{" "}
                    <a href="#" className="text-orange-500 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-orange-500 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
