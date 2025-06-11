"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Home,
  User,
  Calendar,
  ArrowLeft,
  Clock,
  MapPin,
  Star,
  CreditCard,
  Menu,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { bookingService } from "../services/bookingService";
import back from "../assets/back.jpg";
import apiService from "../services/apiService";

export default function TurfBooking() {
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState("booking"); // booking, confirmation, success
  const { id } = useParams();
  const [sportType, setSportType] = useState([]);
  const [turfData, setTurfData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurf = async () => {
      try {
        const response = await apiService.getOneTurf(id);
        response.data.rating = 4.8;
        response.data.reviews = 124;
        setTurfData(response.data);
        setSportType(response.data.sportType);
      } catch (error) {
        console.error("Error fetching turf:", error);
      }
    };
    fetchTurf();
  }, [id]);

  // Sample turf data (would come from props or API)
  // const turfData = {
  //   id: 1,
  //   name: "RR Sports Turf",
  //   location: "Sector 18, Noida, Uttar Pradesh",
  //   rating: 4.8,
  //   reviews: 124,
  //   pricePerHour: 800,
  //   image: "/images/back.jpg",
  //   sports: ["Football", "Cricket", "Hockey"],
  //   facilities: ["Parking", "Changing Room", "WiFi", "Refreshments"],
  // };

  const [bookingData, setBookingData] = useState({
    userId: user._id,
    userName: user.name,
    ownerId: "",
    turfId: "",
    turfName: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    duration: 1,
    status: "",
    paymentStatus: "",
    totalPrice: turfData.price,
    sport: "",
    specialRequests: "",
  });

  const [userDetails, setUserDetails] = useState({
    name: user.name,
    email: user.email,
    phone: "+91 9876543210",
    emergencyContact: "+91 9876543211",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "account", label: "Account Details", icon: User },
    { id: "bookings", label: "Booking History", icon: Calendar },
  ];

  // Generate time slots (6 AM to 11 PM)
  const timeSlots = [];
  for (let i = 6; i <= 23; i++) {
    const hour = i.toString().padStart(2, "0");
    timeSlots.push(`${hour}:00`);
    if (i < 23) timeSlots.push(`${hour}:30`);
  }

  const handleBookingChange = (field, value) => {
    const updatedBooking = { ...bookingData, [field]: value };

    // Calculate duration and total price when time changes
    if (field === "startTime" || field === "endTime") {
      if (updatedBooking.startTime && updatedBooking.endTime) {
        const start = new Date(`2024-01-01 ${updatedBooking.startTime}`);
        const end = new Date(`2024-01-01 ${updatedBooking.endTime}`);
        const duration = (end - start) / (1000 * 60 * 60); // Convert to hours

        if (duration > 0) {
          updatedBooking.duration = duration;
          updatedBooking.totalPrice = duration * turfData.price;
        }
      }
    }

    setBookingData(updatedBooking);

    // Clear errors
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleUserDetailsChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateBooking = () => {
    const newErrors = {};

    if (!bookingData.date) newErrors.date = "Please select a date";
    if (!bookingData.startTime)
      newErrors.startTime = "Please select start time";
    if (!bookingData.endTime) newErrors.endTime = "Please select end time";
    if (!bookingData.sport) newErrors.sport = "Please select a sport";
    if (!userDetails.name.trim()) newErrors.name = "Name is required";
    if (!userDetails.email.trim()) newErrors.email = "Email is required";
    if (!userDetails.phone.trim()) newErrors.phone = "Phone is required";

    // Validate date is not in the past
    if (bookingData.date) {
      const selectedDate = new Date(bookingData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Please select a future date";
      }
    }

    // Validate time slots
    if (bookingData.startTime && bookingData.endTime) {
      const start = new Date(`2024-01-01 ${bookingData.startTime}`);
      const end = new Date(`2024-01-01 ${bookingData.endTime}`);
      if (end <= start) {
        newErrors.endTime = "End time must be after start time";
      }
    }

    return newErrors;
  };

  const handleProceedToConfirmation = () => {
    const validationErrors = validateBooking();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const validatedBooking = bookingService
      .validateBooking(turfData._id, bookingData)
      .then((response) => {
        if (!response) {
          setErrors({
            startTime: "This slot is not available, please change time",
          });
          return;
        }
        setBookingStep("confirmation");
      })
      .catch((error) => {
        console.error("Error validating booking:", error);
      });
  };

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    bookingData.status = "booked";
    bookingData.paymentStatus = "paid";
    bookingData.turfId = turfData._id;
    bookingData.turfName = turfData.name;
    bookingData.location = turfData.address;
    bookingData.ownerId = turfData.ownerId;
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      const createBooking = bookingService.createBooking(bookingData);
      if (!createBooking) {
        setErrors({ date: "This turf is not available for booking" });
        return;
      }
      setBookingStep("success");
    }, 1000);
  };

  const handleBackToBooking = () => {
    setBookingStep("booking");
  };

  const handleNewBooking = () => {
    // setBookingStep("booking");
    // setBookingData({
    //   date: "",
    //   startTime: "",
    //   endTime: "",
    //   duration: 1,
    //   totalPrice: turfData.price,
    //   sport: "",
    //   specialRequests: "",
    // });
    // setErrors({});
    navigate("/turfs"); // Redirect to turfs page
  };

  const renderBookingForm = () => (
    <div className="space-y-8">
      {/* Turf Information */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row">
          <img
            src={back}
            alt={turfData.name}
            className="w-full md:w-48 h-32 rounded-lg object-cover mb-4 md:mb-0 md:mr-6"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {turfData.name}
            </h2>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{turfData.address}</span>
            </div>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-1 text-gray-600">
                  ({turfData.rating}) {turfData.reviews} reviews
                </span>
              </div>
              <span className="text-2xl font-bold text-green-600">
                ₹{turfData.price}/hour
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sportType.map((sport, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Booking Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date*
            </label>
            <input
              type="date"
              value={bookingData.date}
              onChange={(e) => handleBookingChange("date", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full px-3 py-2 border ${
                errors.date ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          {/* Sport Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sport*
            </label>
            <select
              value={bookingData.sport}
              onChange={(e) => handleBookingChange("sport", e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.sport ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              <option value="">Select a sport</option>
              {sportType.map((sport, index) => (
                <option key={index} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
            {errors.sport && (
              <p className="mt-1 text-sm text-red-600">{errors.sport}</p>
            )}
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time*
            </label>
            <select
              value={bookingData.startTime}
              onChange={(e) => handleBookingChange("startTime", e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.startTime ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              <option value="">Select start time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.startTime && (
              <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>
            )}
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time*
            </label>
            <select
              value={bookingData.endTime}
              onChange={(e) => handleBookingChange("endTime", e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.endTime ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              <option value="">Select end time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.endTime && (
              <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
            )}
          </div>

          {/* Special Requests */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests
            </label>
            <textarea
              value={bookingData.specialRequests}
              onChange={(e) =>
                handleBookingChange("specialRequests", e.target.value)
              }
              rows={3}
              placeholder="Any special requirements or requests..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
        </div>

        {/* Duration and Price Display */}
        {bookingData.duration > 0 && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-gray-700">
                  Duration: {bookingData.duration} hour(s)
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-green-600">
                  ₹{bookingData.totalPrice}
                </span>
                <p className="text-sm text-gray-600">Total Amount</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Details */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Your Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name*
            </label>
            <input
              type="text"
              value={userDetails.name}
              onChange={(e) => handleUserDetailsChange("name", e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email*
            </label>
            <input
              type="email"
              value={userDetails.email}
              onChange={(e) => handleUserDetailsChange("email", e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number*
            </label>
            <input
              type="tel"
              value={userDetails.phone}
              onChange={(e) => handleUserDetailsChange("phone", e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact
            </label>
            <input
              type="tel"
              value={userDetails.emergencyContact}
              onChange={(e) =>
                handleUserDetailsChange("emergencyContact", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <button
          onClick={handleProceedToConfirmation}
          className="px-6 py-3 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 flex items-center"
        >
          Proceed to Confirmation
        </button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-8">
      {/* Confirmation Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Confirm Your Booking
        </h1>
        <p className="text-gray-600">
          Please review your booking details before confirming
        </p>
      </div>

      {/* Booking Summary */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Booking Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Turf Details */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Turf Details</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Turf Name:</span>
                <span className="font-medium">{turfData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{turfData.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sport:</span>
                <span className="font-medium">{bookingData.sport}</span>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Booking Details
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {new Date(bookingData.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">
                  {bookingData.startTime} - {bookingData.endTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">
                  {bookingData.duration} hour(s)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="mt-8">
          <h4 className="font-semibold text-gray-900 mb-4">Contact Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{userDetails.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{userDetails.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{userDetails.phone}</span>
            </div>
            {userDetails.emergencyContact && (
              <div className="flex justify-between">
                <span className="text-gray-600">Emergency Contact:</span>
                <span className="font-medium">
                  {userDetails.emergencyContact}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Special Requests */}
        {bookingData.specialRequests && (
          <div className="mt-8">
            <h4 className="font-semibold text-gray-900 mb-2">
              Special Requests
            </h4>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
              {bookingData.specialRequests}
            </p>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4">Price Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">
                {bookingData.duration} hour(s) × ₹{turfData.price}
              </span>
              <span className="font-medium">₹{bookingData.totalPrice}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-green-600">₹{bookingData.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Payment Method
        </h3>
        <div className="flex items-center p-4 border rounded-lg">
          <CreditCard className="w-6 h-6 text-gray-600 mr-3" />
          <span className="text-gray-700">Pay at the venue (Cash/Card)</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBackToBooking}
          className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Edit
        </button>
        <div className="space-x-4 flex">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmBooking}
            disabled={isSubmitting}
            className={`px-6 py-3 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 flex items-center ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Confirming..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-10 h-10 text-green-600" />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600">Your turf has been successfully booked</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6 max-w-md mx-auto">
        <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Booking ID:</span>
            <span className="font-medium">
              #TB{Date.now().toString().slice(-6)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Turf:</span>
            <span className="font-medium">{turfData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-medium">
              {new Date(bookingData.date).toLocaleDateString()} •{" "}
              {bookingData.startTime} - {bookingData.endTime}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium text-green-600">
              ₹{bookingData.totalPrice}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Important:</p>
            <p>
              Please arrive 15 minutes before your booking time. Bring a valid
              ID for verification.
            </p>
          </div>
        </div>
      </div>

      <div className="space-x-4">
        <button
          onClick={handleNewBooking}
          className="px-6 py-3 border border-green-500 text-green-600 rounded-md font-medium hover:bg-green-50"
        >
          Book Another Turf
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className="px-6 py-3 bg-green-500 text-white rounded-md font-medium hover:bg-green-600"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab !== "home") {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600">This feature is under development.</p>
        </div>
      );
    }

    switch (bookingStep) {
      case "booking":
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Book Your Turf
              </h1>
              <p className="text-gray-600">
                Fill in the details below to book your preferred turf
              </p>
            </div>
            {renderBookingForm()}
          </div>
        );
      case "confirmation":
        return renderConfirmation();
      case "success":
        return renderSuccess();
      default:
        return renderBookingForm();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden bg-white border-b px-4 py-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center px-6 py-4 border-b">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                TurfBook
              </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-green-100 text-green-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* User Profile */}
            <div className="px-4 py-4 border-t">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-600">Player</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6 lg:p-8">{renderContent()}</div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
