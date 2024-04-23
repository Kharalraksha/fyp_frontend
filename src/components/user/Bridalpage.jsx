import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BridalPage = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchArtistsAndTheirReviews();
  }, []);

  const fetchArtistsAndTheirReviews = async () => {
    setLoading(true);
    try {
      const { data: artistsData } = await axios.get(
        "http://localhost:3000/api/artist/get"
      );
      const artistsWithReviews = await Promise.all(
        artistsData.map(async (artist) => {
          try {
            const { data: reviews } = await axios.get(
              `http://localhost:3000/api/review/artist/${artist.artist_Id}`
            );
            const averageRating =
              reviews.reduce((acc, review) => acc + review.rating, 0) /
                reviews.length || 0;
            return { ...artist, reviews, averageRating };
          } catch (error) {
            console.error(
              `Error fetching reviews for artist ID ${artist.artist_Id}:`,
              error
            );
            return { ...artist, reviews: [], averageRating: 0 }; // Fallback if reviews can't be fetched
          }
        })
      );
      setArtists(artistsWithReviews);
    } catch (error) {
      console.error("Error fetching artists:", error);
      setError("Error fetching artists. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const filteredArtists = artists.filter((artist) =>
    (artist.artist_Name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-red-100 px-4 py-16 mt-14">
      <div className="flex justify-start ml-12 mt-5 mb-5">
        <input
          type="text"
          placeholder="Search for artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-lg border-2 border-gray-300 max-w-xs"
        />
      </div>

      {loading ? (
        <p className="text-xl font-medium text-center">Loading...</p>
      ) : error ? (
        <p className="text-xl font-medium text-red-600 text-center">{error}</p>
      ) : (
        <>
          {filteredArtists.length === 0 ? (
            <p className="text-xl font-medium text-center">
              No artists found matching your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {filteredArtists.map((artist, index) => (
                <div
                  key={index}
                  className="bg-rose-50 p-6 shadow-lg rounded-lg text-center"
                >
                  <img
                    src={artist.image}
                    alt={artist.artist_Name}
                    className="mx-auto h-48 w-48 object-cover rounded-full border-4 border-red-300 shadow-lg"
                  />
                  <h2 className="font-semibold text-2xl my-4">
                    {artist.artist_Name}
                  </h2>
                  {/* Display Average Rating */}
                  <div className="flex justify-center mt-8 mb-6">
                    {[...Array(Math.round(artist.averageRating))].map(
                      (e, i) => (
                        <span key={i} className="text-yellow-500 text-lg">
                          &#9733;
                        </span>
                      )
                    )}
                  </div>

                  <Link
                    to={`/Bridepage/${artist.artist_Id}`}
                    className="mt-4 bg-orange-400 text-white py-3 px-6 rounded-lg"
                  >
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BridalPage;
