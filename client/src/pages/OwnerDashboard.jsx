import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import back from "../assets/back.jpg";
import apiService from "../services/apiService";

("use client");

import { useState } from "react";
import {
  Home,
  User,
  DollarSign,
  Star,
  Edit,
  Trash2,
  Plus,
  Eye,
  Clock,
  MapPin,
  Menu,
  X,
  BarChart3,
  Settings,
} from "lucide-react";
import { bookingService } from "../services/bookingService";

export default function OwnerDashboard() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    if (activeTab === "home") {
      const fetchTurfs = async () => {
        try {
          const response = await apiService.getOwnerTurfs(user._id);
          setTurfs(response.data);
        } catch (error) {
          console.error("Error fetching turfs:", error);
        }
      };
      fetchTurfs();
    } else if (activeTab === "bookings") {
      const fetchBookings = async () => {
        try {
          const response = await bookingService.getOwnerBookings(
            user._id,
            "owner"
          );
          setBookings(response.data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      };
      fetchBookings();
    }
  }, [user, activeTab, bookings]);

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "account", label: "Account Details", icon: User },
    { id: "revenue", label: "View Revenue", icon: DollarSign },
    { id: "bookings", label: "View Bookings", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "booked":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCompleteBooking = (turfId, ownerId) => {
    const completedBooking = bookingService.completeBooking(turfId, ownerId);
    if (completedBooking) {
      alert("Booking completed successfully!");
    } else {
      alert("Failed to complete booking. Please try again.");
    }
  };

  const handleEdit = (turfId) => {
    navigate(`/turf/edit/${turfId}`);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (turfId) => {
    if (!window.confirm("Are you sure you want to delete this turf?")) {
      return;
    }
    try {
      const response = await apiService.deleteTurf(turfId);
      alert("Turf deleted successfully!");
      // Optionally, you can refresh the turfs list after deletion
      setTurfs((prevTurfs) => prevTurfs.filter((turf) => turf._id !== turfId));
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleAddNew = () => {
    navigate("/turf/new");
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Turfs
              </h1>
              <p className="text-gray-600">
                Manage your turf listings and track performance
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Home className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Turfs
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {turfs.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Bookings
                    </p>
                    <p className="text-2xl font-bold text-gray-900">172</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Avg Rating
                    </p>
                    <p className="text-2xl font-bold text-gray-900">4.7</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹1,45,600
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Turf Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {turfs.map((turf) => (
                <div
                  key={turf._id}
                  className="bg-white rounded-lg shadow-sm border overflow-hidden"
                >
                  <div className="relative">
                    <img
                      // src={turf.image || "/placeholder.svg"}
                      src={back}
                      alt={turf.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          turf.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {turf.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {turf.name}
                    </h3>

                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{turf.address}</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">
                          {turf.rating}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          ({turf.reviews})
                        </span>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        ₹{turf.price}/hour
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{turf.bookings}</span>{" "}
                        bookings this month
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(turf._id)}
                        className="flex-1 flex items-center justify-center px-3 py-2 border border-green-500 text-green-600 rounded-md hover:bg-green-50 transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(turf._id)}
                        className="flex-1 flex items-center justify-center px-3 py-2 border border-red-500 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Turf Card */}
              <div className="bg-white rounded-lg shadow-sm border border-dashed border-gray-300 overflow-hidden">
                <div className="p-6 h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Add New Turf
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create a new turf listing to expand your business
                  </p>
                  <button
                    onClick={handleAddNew}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Add Turf
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "account":
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Account Details
            </h1>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Rajesh Kumar"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="rajesh@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91 9876543210"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    defaultValue="RR Sports Management"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      case "revenue":
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Revenue Overview
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  This Month
                </h3>
                <p className="text-3xl font-bold text-green-600">₹45,600</p>
                <p className="text-sm text-green-600 mt-1">
                  +12% from last month
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Last Month
                </h3>
                <p className="text-3xl font-bold text-gray-900">₹40,800</p>
                <p className="text-sm text-gray-600 mt-1">Previous period</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Total Revenue
                </h3>
                <p className="text-3xl font-bold text-gray-900">₹1,45,600</p>
                <p className="text-sm text-gray-600 mt-1">All time</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Revenue by Turf
              </h3>
              <div className="space-y-4">
                {turfs.map((turf) => (
                  <div
                    key={turf.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center">
                      <img
                        src={turf.image || "/placeholder.svg"}
                        alt={turf.name}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {turf.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {turf.bookings} bookings
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹
                        {(
                          turf.bookings *
                          Number.parseInt(
                            turf.price.replace("₹", "").replace("/hour", "")
                          )
                        ).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">This month</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "bookings":
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Booking History
              </h1>
            </div>

            <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-lg shadow-sm border p-6"
                >
                  <div className="flex flex-col md:flex-row">
                    <img
                      src={back}
                      alt={booking.turfName}
                      className="w-full md:w-48 h-32 rounded-lg object-cover mb-4 md:mb-0 md:mr-6"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {booking.turfName}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>
                              {booking.date} • {booking.fullTime} •{" "}
                              {booking.duration} {"hours"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded mr-2">
                              {booking.sportType}
                            </span>
                            <span className="text-lg font-bold text-green-600">
                              ₹{booking.price}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status == "booked"
                            ? "upcoming"
                            : booking.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {booking.status === "booked" && (
                          <button className="px-4 py-2 border border-red-500 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                            Cancel Booking
                          </button>
                        )}
                        {booking.status === "booked" && (
                          <button
                            onClick={() =>
                              handleCompleteBooking(
                                booking.turfId,
                                booking.ownerId
                              )
                            }
                            className="px-4 py-2 border border-green-500 text-green-600 rounded-md hover:bg-green-50 transition-colors"
                          >
                            Complete Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600">This feature is under development.</p>
          </div>
        );
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
                  <p className="text-xs text-gray-600">Owner</p>
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
