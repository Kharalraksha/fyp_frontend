// AboutUs.js
import React from "react";
import AboutSection from "./AboutSection";
import work12 from "../../assets/work12.jpg"; // Replace with actual path
import work14 from "../../assets/work14.jpg"; // Replace with actual path
import work15 from "../../assets/work15.jpg"; // Replace with actual path

const AboutUs = () => {
  const sections = [
    {
      title: "Our Vision",
      content:
        "Our makeup artist appointment app is designed to streamline the process of scheduling beauty appointments with skilled professionals. Whether you're preparing for a special event or simply seeking a fresh look, our platform connects you with talented makeup artists in your area. With user-friendly features, including easy booking, flexible scheduling, and secure payment options, our app ensures a hassle-free experience for both clients and artists. Discover top-rated makeup artists, explore their portfolios, and book appointments at your convenience. Elevate your beauty routine with our convenient and reliable makeup artist appointment app",
      image: work12,
      imageFirst: false, // Image on the right
    },
    {
      title: "Our Approach",
      content:
        "Our makeup artist appointment app is designed to streamline the process of scheduling beauty appointments with skilled professionals. Whether you're preparing for a special event or simply seeking a fresh look, our platform connects you with talented makeup artists in your area. With user-friendly features, including easy booking, flexible scheduling, and secure payment options, our app ensures a hassle-free experience for both clients and artists. Discover top-rated makeup artists, explore their portfolios, and book appointments at your convenience. Elevate your beauty routine with our convenient and reliable makeup artist appointment app",
      image: work14,
      imageFirst: true, // Image on the left
    },
    {
      title: "Our Process",
      content:
        "Our makeup artist appointment app is designed to streamline the process of scheduling beauty appointments with skilled professionals. Whether you're preparing for a special event or simply seeking a fresh look, our platform connects you with talented makeup artists in your area. With user-friendly features, including easy booking, flexible scheduling, and secure payment options, our app ensures a hassle-free experience for both clients and artists. Discover top-rated makeup artists, explore their portfolios, and book appointments at your convenience. Elevate your beauty routine with our convenient and reliable makeup artist appointment app",
      image: work15,
      imageFirst: false, // Image on the right
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our makeup artist appointment app is designed to streamline the
          process of scheduling beauty appointments with skilled
          professionals...
        </p>
      </div>
      {sections.map((section, index) => (
        <AboutSection key={index} {...section} />
      ))}
    </div>
  );
};

export default AboutUs;
