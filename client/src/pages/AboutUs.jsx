"use client";

import { useState } from "react";
import { Users, Target, Award, Heart, MapPin, CheckCircle } from "lucide-react";
import profile from "/profile.png";
import back from "/back.jpg";

export default function AboutUs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { label: "Happy Customers", value: "-", icon: Users },
    { label: "Turf Partners", value: "-", icon: MapPin },
    { label: "Cities Covered", value: "-", icon: Target },
    { label: "Years of Experience", value: "-", icon: Award },
  ];

  const teamMembers = [
    {
      name: "Atharva Jain",
      role: "Developer",
      image: profile,
      description:
        "Passionate about sports and technology, Atharva developed Turfit to make sports accessible to everyone.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Sports",
      description:
        "We believe sports bring people together and create lasting memories. Our passion drives everything we do.",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "Building a strong community of sports enthusiasts and turf owners is at the heart of our mission.",
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description:
        "We ensure all our partner turfs meet high standards for safety, cleanliness, and playing conditions.",
    },
    {
      icon: Target,
      title: "Innovation",
      description:
        "Continuously improving our platform with new features and technologies to serve you better.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Turfit</h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            Connecting sports enthusiasts with premium turf facilities across
            India. Your game, your time, your turf.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Turfit was born from a simple frustration - finding and
                  booking quality sports facilities was too complicated. As avid
                  sports enthusiasts, our founders experienced firsthand the
                  challenges of organizing games with friends.
                </p>
                <p>
                  In 2025, we set out to solve this problem by creating a
                  platform that connects sports lovers with premium turf
                  facilities. What started as a small team with a big dream has
                  now grown into India's leading turf booking platform.
                </p>
                <p>
                  Today, we're proud to serve thousands of customers across many
                  cities, partnering with many turf facilities to make sports
                  more accessible to everyone.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={back}
                alt="Sports team celebrating"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
              {/* <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-lg"></div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving our commitment to make sports accessible and enjoyable for
              everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700">
                To democratize access to quality sports facilities by providing
                a seamless, technology-driven platform that connects sports
                enthusiasts with the best turf facilities in their area.
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700">
                To become the go-to platform for sports facility bookings across
                India, fostering a healthier, more active society by making
                sports accessible to all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border text-center"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individual behind Turfit's success
            </p>
          </div>
          <div className="flex justify-center">
            <div className="sm:w-full md:w-1/3 lg:w-1/4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border overflow-hidden"
                >
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-green-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Play?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of sports enthusiasts who trust Turfit for their game
            bookings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/turfs">
              <button className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Book a Turf Now
              </button>
            </a>
            <a href="/register-owner">
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                List Your Turf
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
