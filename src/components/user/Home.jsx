import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide1 from "../../assets/slide1.png";
import slide2 from "../../assets/slide2.png";
import slide3 from "../../assets/slide3.png";
import slide4 from "../../assets/slide4.png";
import slider6 from "../../assets/slider6.jpg";
import work1 from "../../assets/work1.jpg";
import work16 from "../../assets/work16.jpg";

const Home = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchArtistsAndTheirReviews();
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 4); // Assuming there are 4 slides
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchArtistsAndTheirReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/artist/get");
      const artistsWithReviews = await Promise.all(
        response.data.map(async (artist) => {
          try {
            const reviews = await axios.get(
              `http://localhost:3000/api/review/artist/${artist.artist_Id}`
            );
            const averageRating =
              reviews.data.length > 0
                ? reviews.data.reduce((acc, review) => acc + review.rating, 0) /
                  reviews.data.length
                : 0;
            return { ...artist, averageRating };
          } catch (error) {
            console.error(
              `Error fetching reviews for artist ID ${artist.artist_Id}:`,
              error
            );
            return { ...artist, averageRating: 0 }; // Continue returning the artist even if fetching fails
          }
        })
      );

      // Filter out artists without reviews
      const reviewedArtists = artistsWithReviews.filter(
        (artist) => artist.averageRating > 0
      );

      setArtists(
        reviewedArtists.sort((a, b) => b.averageRating - a.averageRating)
      );
    } catch (error) {
      console.error("Error fetching artists:", error);
      setError("Error fetching artists. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (messageText) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/chat/messages",
        {
          SessionID: "session-" + Date.now(),
          SenderType: "User",
          MessageText: messageText,
          Intent: "",
          Response: "",
          Context: "",
        }
      );
      console.log("Backend response:", response.data); // Check what the backend actually returned
      const botResponse = response.data.response || "No response from bot"; // Make sure to access the correct field

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: messageText },
        { sender: "bot", text: botResponse },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Error communicating with the chatbot." },
      ]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    sendMessage(userInput);
    setUserInput("");
  };
  const clearMessages = () => {
    setMessages([]); // Clear the chat history
  };
  return (
    <div className="mt-20">
      <Carousel
        selectedItem={currentSlide}
        onChange={(index) => setCurrentSlide(index)}
        emulateTouch
        infiniteLoop
        showThumbs={false}
        autoPlay
        interval={5000}
      >
        {[slide1, slide2, slide3, slide4].map((slide, index) => (
          <div key={index}>
            <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>

      <div className="container mx-auto mt-10 mb-10">
        <h2 className="text-4xl font-bold text-center my-10">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Festival Makeover",
              description:
                "Get ready for the festival season with our exclusive makeover packages.",
              image: slider6,
            },
            {
              name: "Bridal Makeover",
              description:
                "Look stunning on your special day with our specialized bridal makeover.",
              image: work1,
            },
            {
              name: "Casual Makeover",
              description:
                "Enhance your everyday look with our casual makeover services.",
              image: work16,
            },
          ].map((service, index) => (
            <div
              key={index}
              className="service-card bg-rose-50 shadow rounded-lg p-4 text-center"
            >
              <div className="image-container h-64 flex justify-center items-center">
                <img
                  src={service.image}
                  alt={service.name}
                  className="object-cover h-full"
                />
              </div>
              <h3 className="text-2xl font-semibold my-2">{service.name}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto mt-10 mb-10">
        {loading ? (
          <p className="text-center">Loading artists...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div>
            <h2 className="text-4xl font-bold text-center my-10">Top Artist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
              {artists.map((artist, index) => (
                <div
                  key={index}
                  className="bg-rose-50 p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
                  style={{ minHeight: "430px" }}
                >
                  <div className="flex justify-center">
                    <img
                      src={artist.image}
                      alt={artist.artist_Name}
                      className="h-48 w-48 object-cover rounded-full border-4 border-transparent hover:border-red-800 transition-all"
                      style={{ objectPosition: "50% 10%" }}
                    />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-center">
                    {artist.artist_Name}
                  </h3>
                  <div className="flex justify-center mt-2">
                    {Array.from(
                      { length: Math.round(artist.averageRating) },
                      (_, i) => (
                        <span key={i} className="text-yellow-500 text-lg">
                          &#9733;
                        </span>
                      )
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <Link
                      to={`/BridePage/${artist.artist_Id}`}
                      className="inline-block bg-rose-600 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chat interface */}
      <div className="chat-interface fixed bottom-0 right-0 mb-4 mr-4 max-w-xs w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
        <div className="px-4 py-2 bg-blue-500 text-white font-bold rounded-t-lg relative">
          Chat with us!
          <button
            onClick={clearMessages}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              color: "gray-200",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            X
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message mb-2 ${
                message.sender === "bot" ? "text-left" : "text-right"
              }`}
            >
              <span
                className={`inline-block p-2 text-sm rounded-lg ${
                  message.sender === "bot"
                    ? "bg-gray-200 rounded-br-none"
                    : "bg-blue-500 text-white rounded-bl-none"
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <form
          className="border-t-2 border-gray-200 p-2"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="border-2 border-gray-300 p-2 rounded-lg w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
