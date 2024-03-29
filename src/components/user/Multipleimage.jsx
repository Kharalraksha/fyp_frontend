import React, { useState } from "react";

const UploadMultipleFiles = () => {
  const [files, setFiles] = useState([]);
  const [artistId, setArtistId] = useState(""); // You would typically fetch this from user context or session

  // Dummy value for demonstration; in a real application, you'd get this from auth context or similar
  useEffect(() => {
    const fetchArtistId = async () => {
      // Simulate fetching artist ID (e.g., from session, context, or directly from a logged-in user data)
      const retrievedArtistId = "123"; // Placeholder value
      setArtistId(retrievedArtistId);
    };

    fetchArtistId();
  }, []);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!artistId) {
      alert("Artist ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("artist_id", artistId); // Append the artist ID to the form data
    files.forEach((file) => {
      formData.append("images", file); // Ensure this key matches what the backend expects (not 'image_url')
    });

    try {
      const response = await fetch("http://localhost:3000/api/upload/upload", {
        method: "POST",
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
      alert("Error submitting form: " + error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="my-8">
        <h4 className="text-lg font-semibold">Upload Files</h4>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="input-multi-files" className="block mb-2">
              Select Files:
            </label>
            <input
              type="file"
              id="input-multi-files"
              name="multi-files"
              multiple
              onChange={handleFileChange}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadMultipleFiles;
