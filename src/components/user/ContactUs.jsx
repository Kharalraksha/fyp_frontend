import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Ensure you have Leaflet's CSS
import aboutus from "../../assets/aboutusimg.jpg";

const ContactPage = () => {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Check if any of the fields are empty
    if (
      !contactDetails.name ||
      !contactDetails.address ||
      !contactDetails.phoneNumber ||
      !contactDetails.message
    ) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      // Ensure endpoint matches your server configuration
      const response = await axios.post(
        "http://localhost:3000/api/contact/contact",
        {
          name: contactDetails.name,
          address: contactDetails.address,
          phonenumber: contactDetails.phoneNumber, // Match backend field name
          message: contactDetails.message,
        }
      );
      console.log(response.data);
      // Reset form or show success message
      setContactDetails({
        name: "",
        address: "",
        phoneNumber: "",
        message: "",
      });
      alert("Thank you for your message. We will be in touch soon.");
      // Handle any additional actions on success, such as displaying a success message
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      setError("Failed to submit the form. Please try again later."); // Set error message
    } finally {
      setIsLoading(false);
    }
  };

  // Coordinates for Kathmandu, Nepal
  const center = [27.7172, 85.324];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-3/4 bg-white shadow-lg p-4">
        <div className="w-full flex flex-wrap">
          <div className="w-1/2 flex justify-center items-center">
            <img
              src={aboutus}
              alt="About Us"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-1/2 p-8">
            <h2 className="text-4xl font-bold mb-10 text-center">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={contactDetails.name}
                className="w-full p-3 border rounded mb-4"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                value={contactDetails.address}
                className="w-full p-3 border rounded mb-4"
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={handleChange}
                value={contactDetails.phoneNumber}
                className="w-full p-3 border rounded mb-4"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows="4"
                onChange={handleChange}
                value={contactDetails.message}
                className="w-full p-3 border rounded mb-4 resize-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 text-white bg-orange-500 rounded hover:bg-orange-600"
              >
                Submit
              </button>
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        </div>
      </div>
      {/* Map Section */}
      <div className="w-3/4 h-400 mt-4">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={center}>
            <Popup>Kathmandu, Nepal - Visit us here!</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default ContactPage;
