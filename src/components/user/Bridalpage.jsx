import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BridalPage = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/artist/get");
      setArtists(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching artists:", error);
      setError("Error fetching artists. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-red-100 px-4 py-16">
        {loading ? (
          <div className="w-full text-center">
            <p className="text-xl font-medium">Loading...</p>
          </div>
        ) : error ? (
          <div className="w-full text-center">
            <p className="text-xl font-medium text-red-600">{error}</p>
          </div>
        ) : (
          <div className="w-full mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {artists.slice(0, 8).map((artist, index) => (
                <div
                  key={index}
                  className="bg-rose-50 p-6 shadow-lg rounded-lg text-center hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 min-h-[430px]"
                >
                  {artist.artist_Name && artist.image ? (
                    <>
                      <div className="aspect-w-1 aspect-h-1 w-full mt-4">
                        <img
                          src={artist.image}
                          alt={artist.artist_Name}
                          className="mx-auto h-48 w-48 object-cover rounded-full border-4 border-red-300 shadow-lg"
                          style={{ objectPosition: "40% 19%" }}
                        />
                      </div>
                      <h2 className="font-semibold text-2xl my-4">
                        {artist.artist_Name}
                      </h2>
                      <div className="flex justify-center mt-8 mb-6">
                        {[...Array(artist.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-500 text-lg">
                            &#9733;
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/Bridepage/${artist.artist_Id}`}
                        className="mt-4 bg-orange-400 text-white py-3 px-6 rounded-lg hover:bg-red-200 transition-colors duration-200 font-medium"
                      >
                        View Profile
                      </Link>
                    </>
                  ) : (
                    <p className="text-red-500 font-medium">
                      Error: Artist data missing or incomplete
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BridalPage;
