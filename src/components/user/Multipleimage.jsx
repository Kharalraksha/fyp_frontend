import React, { useState, useEffect } from "react";
import ArtistSidebar from "./ArtistSidebar";
import ArtistNavbar from "./ArtistNavbar";
const UploadMultipleFiles = ({ artistId }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch artist ID from local storage when the component mounts
    const retrievedArtistId = localStorage.getItem("artistId");
    if (retrievedArtistId) {
      // Do not set artistId state here, use the prop directly
    } else {
      // Handle case where artist ID is not found in local storage
      console.error("Artist ID not found in local storage.");
    }
  }, []);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Fetch artist ID from local storage again to ensure it's up-to-date
    const retrievedArtistId = localStorage.getItem("artistId");

    if (!retrievedArtistId) {
      alert("Artist ID is missing.");
      return;
    }

    if (files.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("artistId", retrievedArtistId); // Use the retrieved artist ID
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("http://localhost:3000/api/upload/upload", {
        method: "POST",
        headers: {
          // If your server expects a content-type header, you might need to set it
          // 'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Upload successful:", result);
        alert("Files uploaded successfully.");
      } else {
        console.error("Upload failed:", result.message);
        alert("Upload failed: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form: " + error.message);
    }
  };

  return (
    <>
      {/* Navbar */}
      <ArtistNavbar />

      {/* Page content */}
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64">
          <ArtistSidebar />
        </div>

        {/* Main content */}
        <div className="flex-grow flex items-start justify-center p-14 mr-80 ">
          <div className="bg-rose-200 rounded-md shadow-2xl p-24 w-full max-w-md">
            <h4 className="text-2xl font-semibold mb-8 text-center text-gray-800">
              Upload Your Work
            </h4>
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="space-y-16"
            >
              <div>
                <label
                  htmlFor="input-multi-files"
                  className="block text-md font-medium text-gray-700 mb-8"
                >
                  Select files to upload:
                </label>
                <input
                  type="file"
                  id="input-multi-files"
                  name="multi-files"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upload Files
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadMultipleFiles;
