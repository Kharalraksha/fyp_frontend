import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaAngleDown,
} from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import raksha from "../../assets/raksha.png";
import slide1 from "../../assets/slide1.png";
import slide2 from "../../assets/slide2.png";
import slide3 from "../../assets/slide3.png";
import slide4 from "../../assets/slide4.png";
import { useAuth } from "../auth/Authcontext";
import { FaUserCircle } from "react-icons/fa";

const Home = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isLoggedIn, logout } = useAuth();
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const [showDropdown, setShowDropdown] = useState(false);
  // Dummy data for the category dropdown
  const categories = ["Festive", "Casual"];

  // Array of slide images
  const slides = [slide4, slide1, slide2, slide3];

  // Function to handle the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Use useEffect to set up the interval when the component mounts
  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Function to handle the manual slide change
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      {/* Main Content */}
      <main className="flex-grow w-full pt-16">
        {/* Image Carousel Slider */}
        <Carousel
          selectedItem={currentSlide}
          onChange={handleSlideChange}
          emulateTouch
          infiniteLoop
          showThumbs={false}
        >
          {slides.map((slide, index) => (
            <div key={index}>
              <img src={slide} alt={`Slide${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </main>
    </div>
  );
};

export default Home;
