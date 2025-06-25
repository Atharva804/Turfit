"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Upload, X, Check, MapPin, Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/apiService";
import { useSelector } from "react-redux";

export default function EditTurf() {
  const { id } = useParams();

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [turf, setTurf] = useState();

  const [imagePreview, setImagePreview] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sportOptions = [
    "Football",
    "Cricket",
    "Hockey",
    "Basketball",
    "Tennis",
    "Badminton",
    "Volleyball",
  ];

  // const facilityOptions = [
  //   { id: "parking", label: "Parking", icon: "🅿️" },
  //   { id: "changing_room", label: "Changing Room", icon: "🚪" },
  //   { id: "washroom", label: "Washroom", icon: "🚻" },
  //   { id: "wifi", label: "WiFi", icon: "📶" },
  //   { id: "refreshments", label: "Refreshments", icon: "🥤" },
  //   { id: "floodlights", label: "Floodlights", icon: "💡" },
  //   { id: "equipment", label: "Equipment Rental", icon: "⚽" },
  //   { id: "seating", label: "Seating Area", icon: "💺" },
  // ];

  useEffect(() => {
    const fetchTurf = async () => {
      try {
        const response = await apiService.getOneTurf(id);
        setTurf(response.data);
        // setSportTypes(response.data.sportType);
        //   setImages(response.data.images);
        //   setSlots(response.data.slots);
      } catch (error) {
        console.error("Error fetching turf:", error);
      }
    };
    fetchTurf();
  }, [id]);

  if (!turf) {
    return <div>Loading...</div>;
  }

  const handleCancel = () => {
    navigate("/owner-dashboard");
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurf({
      ...turf,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSportTypeChange = (sport) => {
    const updatedSportTypes = [...turf.sportType];
    if (updatedSportTypes.includes(sport)) {
      const index = updatedSportTypes.indexOf(sport);
      updatedSportTypes.splice(index, 1);
    } else {
      updatedSportTypes.push(sport);
    }

    setTurf({
      ...turf,
      sportType: updatedSportTypes,
    });
    // Clear error when user selects
    if (errors.sportTypes) {
      setErrors({
        ...errors,
        sportTypes: "",
      });
    }
  };

  // const handleFacilityChange = (facilityId) => {
  //   const updatedFacilities = [...formData.facilities];
  //   if (updatedFacilities.includes(facilityId)) {
  //     const index = updatedFacilities.indexOf(facilityId);
  //     updatedFacilities.splice(index, 1);
  //   } else {
  //     updatedFacilities.push(facilityId);
  //   }
  //   setFormData({
  //     ...formData,
  //     facilities: updatedFacilities,
  //   });
  // };

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...turf.slots];
    updatedSlots[index] = {
      ...updatedSlots[index],
      [field]:
        field === "isAvailable" ? !updatedSlots[index].isAvailable : value,
    };
    setTurf({
      ...turf,
      slots: updatedSlots,
    });
  };

  const handleAvailibility = () => {
    setTurf({
      ...turf,
      isAvailable: !turf.isAvailable,
    });
  };

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   if (files.length > 0) {
  //     // Limit to 5 images
  //     const selectedFiles = files.slice(0, 5);

  //     // Create preview URLs
  //     const newPreviews = selectedFiles.map((file) =>
  //       URL.createObjectURL(file)
  //     );
  //     setImagePreview([...imagePreview, ...newPreviews]);

  //     // Update form data (in a real app, you'd handle file uploads differently)
  //     setFormData({
  //       ...formData,
  //       images: [...formData.images, ...selectedFiles],
  //     });

  //     // Clear error when user uploads
  //     if (errors.images) {
  //       setErrors({
  //         ...errors,
  //         images: "",
  //       });
  //     }
  //   }
  // };

  // const removeImage = (index) => {
  //   const updatedPreviews = [...imagePreview];
  //   updatedPreviews.splice(index, 1);
  //   setImagePreview(updatedPreviews);

  //   const updatedImages = [...formData.images];
  //   updatedImages.splice(index, 1);
  //   setFormData({
  //     ...formData,
  //     images: updatedImages,
  //   });
  // };

  const validateForm = () => {
    const newErrors = {};

    if (!turf.name.trim()) newErrors.name = "Turf name is required";
    if (!turf.address.trim()) newErrors.address = "Address is required";
    if (!turf.city.trim()) newErrors.city = "City is required";
    if (turf.sportType.length === 0)
      newErrors.sportTypes = "Select at least one sport";
    if (!turf.price && turf.price !== 0) {
      newErrors.price = "Price is required";
    }
    // if (turf.images.length === 0)
    //   newErrors.images = "Upload at least one image";
    if (!turf.description.trim())
      newErrors.description = "Description is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(async () => {
      const res = await apiService.editTurf(turf._id, turf);
      setIsSubmitting(false);
      // In a real app, you would redirect or show success message
      alert("Turf edited successfully!");
      navigate("/owner-dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
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
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCancel}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center">
          <button
            onClick={handleCancel}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Turf</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Turf Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Turf Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={turf.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="e.g. Green Valley Football Ground"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={turf.city}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="e.g. New Delhi"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address*
                </label>
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center pr-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={turf.address}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="e.g. 123, Sector 18, Noida, Uttar Pradesh"
                  />
                </div>
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={turf.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-3 py-2 border ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Describe your turf, its features, and what makes it special..."
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price per Hour (₹)*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={turf.price}
                    onChange={handleChange}
                    className={`w-full pl-8 pr-3 py-2 border ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="e.g. 800"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sport Types */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Sport Types*
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Select all sports that can be played at your turf
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sportOptions.map((sport) => (
                <button
                  key={sport}
                  type="button"
                  onClick={() => handleSportTypeChange(sport)}
                  className={`flex items-center justify-center px-4 py-2 rounded-md border ${
                    turf.sportType.includes(sport)
                      ? "bg-green-50 border-green-500 text-green-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {turf.sportType.includes(sport) && (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  {sport}
                </button>
              ))}
            </div>
            {errors.sportTypes && (
              <p className="mt-2 text-sm text-red-600">{errors.sportTypes}</p>
            )}
          </div>

          {/* Facilities */}
          {/* <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Facilities
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Select all facilities available at your turf
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {facilityOptions.map((facility) => (
                <button
                  key={facility.id}
                  type="button"
                  onClick={() => handleFacilityChange(facility.id)}
                  className={`flex items-center justify-center px-4 py-2 rounded-md border ${
                    formData.facilities.includes(facility.id)
                      ? "bg-green-50 border-green-500 text-green-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-2">{facility.icon}</span>
                  {facility.label}
                </button>
              ))}
            </div>
          </div> */}

          {/* Images */}
          {/* <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Turf Images*
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Upload up to 5 high-quality images of your turf
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4"> */}
          {/* Image previews */}
          {/* {imagePreview.map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden border"
                >
                  <img
                    src={src || "/placeholder.svg"}
                    alt={`Turf preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              ))} */}

          {/* Upload button */}
          {/* {imagePreview.length < 5 && (
                <label className="cursor-pointer aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:bg-gray-50">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            {errors.images && (
              <p className="mt-1 text-sm text-red-600">{errors.images}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Tip: Upload clear, well-lit images that showcase your turf's
              features. First image will be used as the main image.
            </p>
          </div> */}

          {/* Availability Slots */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Availability Slots
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Set the operating hours for each day of the week
            </p>

            <div className="space-y-4">
              {turf.slots.map((slot, index) => (
                <div
                  key={slot.day}
                  className="flex flex-wrap items-center py-3 border-b last:border-0"
                >
                  <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`available-${slot.day}`}
                        checked={slot.isAvailable}
                        onChange={() => handleSlotChange(index, "isAvailable")}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <label
                        htmlFor={`available-${slot.day}`}
                        className="ml-2 text-gray-700 font-medium"
                      >
                        {slot.day}
                      </label>
                    </div>
                  </div>

                  {slot.isAvailable && (
                    <div className="w-full sm:w-3/4 flex items-center space-x-2 mt-2 sm:mt-0">
                      <Clock className="w-5 h-5 text-gray-400 mr-1" />
                      <select
                        value={slot.startTime}
                        onChange={(e) =>
                          handleSlotChange(index, "startTime", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={!slot.isAvailable}
                      >
                        {Array.from({ length: 24 }).map((_, i) => {
                          const hour = i.toString().padStart(2, "0");
                          return (
                            <option key={`start-${hour}`} value={`${hour}:00`}>
                              {`${hour}:00`}
                            </option>
                          );
                        })}
                      </select>
                      <span className="text-gray-500">to</span>
                      <select
                        value={slot.endTime}
                        onChange={(e) =>
                          handleSlotChange(index, "endTime", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={!slot.isAvailable}
                      >
                        {Array.from({ length: 24 }).map((_, i) => {
                          const hour = i.toString().padStart(2, "0");
                          return (
                            <option key={`end-${hour}`} value={`${hour}:00`}>
                              {`${hour}:00`}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="border-b last:border-0 my-1"></div>
            <div className="flex items-center mt-8">
              <input
                type="checkbox"
                id="isAvailable"
                checked={turf.isAvailable}
                onChange={() => {
                  handleAvailibility();
                }}
                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
              />
              <label
                htmlFor="isAvailable"
                className="ml-2 text-gray-700 font-bold"
              >
                Is Available For Bookings?
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Editing Turf..." : "Edit Turf"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
