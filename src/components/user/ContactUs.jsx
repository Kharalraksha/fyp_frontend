import React, { useState } from "react";
import aboutus from "../../assets/aboutusimg.jpg";

const ContactPage = () => {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the submission of the contact details
    console.log(contactDetails);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex w-3/4 bg-red-200 shadow-lg">
        <div className="w-1/2 flex justify-center items-center bg-black">
          <img
            src={aboutus}
            alt="About Us"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="m-4 p-8 w-full">
            <h2 className="text-4xl font-bold mb-10 text-center text-gray-800 ">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  value={contactDetails.name}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  value={contactDetails.address}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={contactDetails.phoneNumber}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="4"
                  onChange={handleChange}
                  value={contactDetails.message}
                  className="w-full p-3 border border-gray-300 rounded resize-none"
                  style={{ lineHeight: "1" }}
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 text-white bg-orange-500 rounded hover:bg-orange-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
