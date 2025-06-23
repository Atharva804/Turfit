import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bookingService } from "../services/bookingService";
import apiService from "../services/apiService";
import { ArrowLeft, CreditCard } from "lucide-react";

function BookingDetials() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { bookingId, turfId } = useParams();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingService.getBookingDetails(bookingId);
        if (response != null) {
          setBookingData(response.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
    window.scrollTo(0, 0);
  };

  if (!bookingData) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="flex-1 lg:ml-0">
      <div className="p-6 lg:p-8">
        <div className="space-y-8">
          {/* Confirmation Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Booking Detials
            </h1>
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Booking Summary
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Turf Details */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">
                  Turf Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Turf Name:</span>
                    <span className="font-medium">{bookingData.turfName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{bookingData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sport:</span>
                    <span className="font-medium">{bookingData.sportType}</span>
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
                    <span className="font-medium">{bookingData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{bookingData.fullTime}</span>
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
              <h4 className="font-semibold text-gray-900 mb-4">
                Contact Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{user.phone}</span>
                </div>
                {/* {userDetails.emergencyContact && (
              <div className="flex justify-between">
                <span className="text-gray-600">Emergency Contact:</span>
                <span className="font-medium">
                  {userDetails.emergencyContact}
                </span>
              </div>
            )} */}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">
                Price Breakdown
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {bookingData.duration} hour(s) × ₹
                    {bookingData.price / bookingData.duration}
                  </span>
                  <span className="font-medium">₹{bookingData.price}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">₹{bookingData.price}</span>
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
              <span className="text-gray-700">
                Pay at the venue (Cash/Card)
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetials;
