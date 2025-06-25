import {
  Star,
  MapPin,
  Clock,
  Users,
  Wifi,
  Car,
  Coffee,
  Shield,
} from "lucide-react";
import { useParams } from "react-router-dom";
import turfImage from "../assets/turf.png";
import apiService from "../services/apiService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function TurfDetails() {
  const navigate = useNavigate();
  const [turf, setTurf] = useState(null);
  const [turfImages, setTurfImages] = useState([]);
  const [sportType, setSportType] = useState([]);
  const { id } = useParams();

  const handleBooking = () => {
    navigate(`/book/${id}`);
  };

  useEffect(() => {
    const fetchTurf = async () => {
      try {
        const response = await apiService.getOneTurf(id);
        setTurf(response.data);
        setTurfImages(response.data.images);
        setSportType(response.data.sportType);
      } catch (error) {
        console.error("Error fetching turf:", error);
      }
    };
    fetchTurf();
  }, [id]);

  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      rating: 5,
      comment:
        "Excellent turf with great facilities. The grass quality is top-notch and the booking process was smooth.",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Priya Patel",
      rating: 4,
      comment:
        "Good experience overall. The turf is well-maintained and the staff is helpful. Parking could be better.",
      date: "1 week ago",
    },
    {
      id: 3,
      name: "Amit Kumar",
      rating: 5,
      comment:
        "Best turf in the area! Clean facilities, proper lighting, and reasonable pricing. Highly recommended.",
      date: "2 weeks ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                Turfit
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-green-500">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-green-500">
                About Us
              </a>
              <a href="#" className="text-gray-700 hover:text-green-500">
                Turfs
              </a>
              <a href="#" className="text-gray-700 hover:text-green-500">
                Contact Us
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Sign In
              </button>
              <button className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-md text-sm font-medium text-white">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Side - Images */}
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={turfImage}
                alt="Main turf view"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {turfImages.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    src={turfImage}
                    alt={`Turf view ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {turf?.name || "Turf Name"}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{turf?.address || "Turf Address"}</span>
              </div>
              {/* <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-gray-600">(4.8) 124 reviews</span>
                </div>
              </div> */}
            </div>

            {/* Pricing */}
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-green-600">
                    {turf?.price || "Price"}
                  </span>
                  <span className="text-gray-600 ml-2">per hour</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Available Now
                </span>
              </div>
              <button
                onClick={handleBooking}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-medium"
              >
                Book Now
              </button>
            </div>

            {/* Sports Supported */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Sports Supported
              </h3>
              <div className="flex flex-wrap gap-2">
                {sportType.map((type, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-green-200 text-green-700"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Facilities */}
            {/* <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Facilities
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Car className="w-5 h-5 mr-2 text-green-500" />
                  <span>Parking</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Wifi className="w-5 h-5 mr-2 text-green-500" />
                  <span>Free WiFi</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Coffee className="w-5 h-5 mr-2 text-green-500" />
                  <span>Refreshments</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Shield className="w-5 h-5 mr-2 text-green-500" />
                  <span>Security</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2 text-green-500" />
                  <span>Changing Room</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-green-500" />
                  <span>24/7 Open</span>
                </div>
              </div>
            </div> */}

            {/* Operating Hours */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Operating Hours
              </h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>6:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday - Sunday</span>
                  <span>5:00 AM - 12:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {/* <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Reviews & Ratings
            </h2>
            <button className="px-4 py-2 border border-green-500 text-green-600 hover:bg-green-50 rounded-md font-medium">
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">4.8</div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <div className="text-gray-600">Based on 124 reviews</div>
            </div>
            <div className="col-span-2 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <span className="w-3 text-sm text-gray-600">{rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 mx-2" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${
                          rating === 5
                            ? 70
                            : rating === 4
                            ? 20
                            : rating === 3
                            ? 5
                            : rating === 2
                            ? 3
                            : 2
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="w-8 text-sm text-gray-600 text-right">
                    {rating === 5
                      ? 87
                      : rating === 4
                      ? 25
                      : rating === 3
                      ? 6
                      : rating === 2
                      ? 4
                      : 2}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review.name}
                    </h4>
                    <div className="flex items-center mt-1">
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
                      <span className="ml-2 text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="px-4 py-2 border border-green-500 text-green-600 hover:bg-green-50 rounded-md font-medium">
              Load More Reviews
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
