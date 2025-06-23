"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import back from "../assets/back.jpg";
import {
  Home,
  User,
  Calendar,
  Star,
  MapPin,
  Clock,
  Menu,
  X,
  Plus,
  Eye,
  MessageSquare,
  CreditCard,
} from "lucide-react";
import { bookingService } from "../services/bookingService";
import { userService } from "../services/userService";

export default function UserDashboard() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [bookings, setBookings] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const turfsPerPage = 3;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingService.getOwnerBookings(
          user._id,
          "user"
        );
        if (response != null) {
          setBookings(response.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    calculateTotalDuration();
  }, [bookings]);

  // Sample booking data
  // const bookings = [
  //   {
  //     id: 1,
  //     turfName: "RR Sports Turf",
  //     location: "Sector 18, Noida",
  //     date: "2024-01-15",
  //     time: "18:00 - 20:00",
  //     duration: "2 hours",
  //     price: "₹1,600",
  //     status: "Completed",
  //     image: "/images/back.jpg",
  //     sport: "Football",
  //     rating: 5,
  //     hasReviewed: true,
  //   },
  //   {
  //     id: 2,
  //     turfName: "Green Valley Football Ground",
  //     location: "Sector 22, Gurgaon",
  //     date: "2024-01-20",
  //     time: "16:00 - 18:00",
  //     duration: "2 hours",
  //     price: "₹2,400",
  //     status: "Upcoming",
  //     image: "/images/turf.png",
  //     sport: "Football",
  //     rating: null,
  //     hasReviewed: false,
  //   },
  //   {
  //     id: 3,
  //     turfName: "Champions Cricket Academy",
  //     location: "Dwarka, New Delhi",
  //     date: "2024-01-10",
  //     time: "14:00 - 16:00",
  //     duration: "2 hours",
  //     price: "₹1,900",
  //     status: "Completed",
  //     image: "/placeholder.svg?height=200&width=300",
  //     sport: "Cricket",
  //     rating: 4,
  //     hasReviewed: true,
  //   },
  //   {
  //     id: 4,
  //     turfName: "Elite Sports Complex",
  //     location: "Sector 15, Faridabad",
  //     date: "2024-01-25",
  //     time: "19:00 - 21:00",
  //     duration: "2 hours",
  //     price: "₹1,400",
  //     status: "Cancelled",
  //     image: "/placeholder.svg?height=200&width=300",
  //     sport: "Basketball",
  //     rating: null,
  //     hasReviewed: false,
  //   },
  // ];

  // Sample reviews data
  const userReviews = [
    {
      id: 1,
      turfName: "RR Sports Turf",
      rating: 5,
      comment:
        "Excellent turf with great facilities. The grass quality is top-notch and the booking process was smooth.",
      date: "2024-01-16",
      image: "/images/back.jpg",
    },
    {
      id: 2,
      turfName: "Champions Cricket Academy",
      rating: 4,
      comment:
        "Good experience overall. The turf is well-maintained and the staff is helpful. Could improve parking facilities.",
      date: "2024-01-11",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "account", label: "Account Details", icon: User },
    { id: "bookings", label: "Booking History", icon: Calendar },
    // { id: "reviews", label: "My Reviews", icon: MessageSquare },
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

  const handleBookTurf = () => {
    navigate("/turfs");
  };

  const handleViewTurf = (bookingId, turfId) => {
    navigate(`/book/${bookingId}/details/${turfId}`);
  };

  const handleWriteReview = (bookingId) => {
    console.log("Write review for booking:", bookingId);
    // Add review modal or navigation logic here
  };

  const calculateTotalDuration = () => {
    bookings.map((booking) => {
      setTotalDuration((prevDuration) => {
        return prevDuration + booking.duration;
      });
    });
  };

  const totalPageNumber = Math.ceil(bookings.length / 3);
  const indexOfLast = currentPage * turfsPerPage;
  const indexOfFirst = indexOfLast - turfsPerPage;
  const currentBookings = bookings.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPageNumber));
    window.scrollTo(0, 0);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: name || user.name,
      email: email || user.email,
      phone: phone || user.phone,
    };

    setTimeout(async () => {
      const res = await userService.editUser(user._id, updatedUser);
      alert("User details edited successfully!");
      navigate("/dashboard");
    }, 1000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">
                Here's your booking overview and recent activity
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Bookings
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {bookings.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Hours Played
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalDuration}
                    </p>
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
                      Reviews Given
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {userReviews.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 mb-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold mb-2">
                    Ready for your next game?
                  </h2>
                  <p className="text-green-100">
                    Book your favorite turf and enjoy playing with friends!
                  </p>
                </div>
                <button
                  onClick={handleBookTurf}
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Book a Turf
                </button>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Bookings
                </h2>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {bookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking._id}
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <img
                      src={back}
                      alt={booking.turfName}
                      className="w-16 h-16 rounded-lg object-cover mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {booking.turfName}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mb-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{booking.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>
                          {booking.date} • {booking.fullTime}
                        </span>
                        <span className="ml-4 font-semibold text-gray-900">
                          ₹{booking.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews */}
            {/* <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Reviews
                </h2>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {userReviews.slice(0, 2).map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg">
                    <div className="flex items-start">
                      <img
                        src={back}
                        alt={review.turfName}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {review.turfName}
                          </h3>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">
                          {review.comment}
                        </p>
                        <p className="text-gray-500 text-xs">{review.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        );

      case "account":
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Account Details
            </h1>
            <div className="justify-center flex w-full">
              <div className="bg-white rounded-lg shadow-sm border p-6 w-full">
                <div className="grid grid-cols-1 gap-6">
                  <form onSubmit={handleUpdateProfile}>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        defaultValue={user.name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        defaultValue={user.phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
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
              <button
                onClick={handleBookTurf}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Book New Turf
              </button>
            </div>
            <div className="page-nav flex flex-row my-4">
              <button className="page-button" onClick={handlePreviousPage}>
                &lt;
              </button>
              {Array.from({ length: totalPageNumber }, (_, index) => (
                <button
                  key={index}
                  className="page-button"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button className="page-button" onClick={handleNextPage}>
                &gt;
              </button>
            </div>
            <div className="space-y-6">
              {currentBookings.map((booking) => (
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
                              {booking.duration} hours
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
                          {booking.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            handleViewTurf(booking._id, booking.turfId)
                          }
                          className="px-4 py-2 border border-green-500 text-green-600 rounded-md hover:bg-green-50 transition-colors flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </button>

                        {booking.status === "Completed" &&
                          !booking.hasReviewed && (
                            <button
                              onClick={() => handleWriteReview(booking.id)}
                              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center"
                            >
                              <Star className="w-4 h-4 mr-1" />
                              Write Review
                            </button>
                          )}

                        {booking.status === "Completed" &&
                          booking.hasReviewed && (
                            <div className="flex items-center text-green-600">
                              <Star className="w-4 h-4 mr-1 fill-current" />
                              <span className="text-sm">Review submitted</span>
                            </div>
                          )}

                        {booking.status === "Upcoming" && (
                          <button className="px-4 py-2 border border-red-500 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                            Cancel Booking
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

        // case "reviews":
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              My Reviews
            </h1>

            <div className="space-y-6">
              {userReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg shadow-sm border p-6"
                >
                  <div className="flex items-start">
                    <img
                      src={back}
                      alt={review.turfName}
                      className="w-16 h-16 rounded-lg object-cover mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {review.turfName}
                        </h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-gray-600">
                            ({review.rating}/5)
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-sm">
                          Reviewed on {review.date}
                        </p>
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                          Edit Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {userReviews.length === 0 && (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No reviews yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start booking turfs and share your experience with others!
                  </p>
                  <button
                    onClick={handleBookTurf}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Book Your First Turf
                  </button>
                </div>
              )}
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
