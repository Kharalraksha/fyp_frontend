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
        "Our vision is to empower makeup artists and enthusiasts alike by providing a platform that fosters creativity, connection, and confidence. We aspire to revolutionize the beauty industry through innovation, inclusivity, and accessibility. By embracing diversity and celebrating individuality, we aim to inspire self-expression and redefine beauty standards. Join us on our journey to transform the way people discover, experience, and appreciate makeup artistry.",
      image: work12,
      imageFirst: false, // Image on the right
    },
    {
      title: "Our Approach",
      content:
        "At GlowQuill, we're committed to revolutionizing the makeup industry with our user-centric approach. Through cutting-edge technology and personalized experiences, we empower makeup artists and clients to connect seamlessly. Transparency, community engagement, and continuous improvement are at the heart of our mission. Join us in celebrating creativity and redefining beauty, one appointment at a time.",
      image: work14,
      imageFirst: true, // Image on the left
    },
    {
      title: "Our Process",
      content:
        "Our streamlined process ensures a seamless experience for both makeup artists and clients. From browsing artists to booking appointments, our intuitive platform simplifies every step. With transparent pricing, secure payments, and real-time communication, we make the booking process effortless. Experience the ease of connecting with talented artists and achieving your desired look effortlessly.",
      image: work15,
      imageFirst: false, // Image on the right
    },
  ];

  return (
    <div className=" bg-white container mx-auto px-4">
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We are a passionate team dedicated to providing a seamless and
          inspiring experience for makeup artists and beauty enthusiasts. Our
          mission is to create a vibrant community where creativity thrives and
          individuals feel empowered to express their unique beauty.
        </p>
      </div>
      {sections.map((section, index) => (
        <AboutSection key={index} {...section} />
      ))}
    </div>
  );
};

export default AboutUs;
