import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Authcontext";
import ReviewForm from "./ReviewForm";

const Bridepage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [artists, setArtists] = useState([]);
  const [pastWorks, setPastWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user_Id, setUser_Id] = useState(null);
  const [artist_Id, setArtist_Id] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [date, setDate] = useState(new Date());
  const availableTimes = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];
  const userId = user?.id;
  useEffect(() => {
    fetchArtists();
    fetchPastWorks();
  }, [id]);

  const fetchArtists = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/artist/${id}`
      );
      setArtists(response.data);
      setArtist_Id(response.data.artist_Id);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching artists:", error);
      setError("Error fetching artists. Please try again later.");
      setLoading(false);
    }
  };

  const fetchPastWorks = async (artistId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/upload/get`);
      setPastWorks(response.data);
    } catch (error) {
      console.error("Error fetching past works:", error);
    }
  };

  const handleBooking = () => {
    if (user) {
      navigate(`/userappointment/${artists.artist_Id}`);
    } else {
      navigate("/SigninForm");
    }
  };

  useEffect(() => {
    setUser_Id(user ? user.id : null);
  }, [user]);

  return (
    <div className="min-h-screen bg-red-50 flex flex-col">
      <main className="flex-grow">
        <HeroSection
          artists={artists}
          setShowPopup={setShowPopup}
          handleBooking={handleBooking}
        />
        <ServicesSection />
        <PastWorkSection pastWorks={pastWorks} artistId={id} user_Id={userId} />
      </main>
    </div>
  );
};

const HeroSection = ({ artists, setShowPopup, handleBooking }) => {
  return (
    <div className="container mx-auto my-12 px-6 md:flex md:flex-row-reverse items-center">
      <div className="flex justify-end md:w-1/2">
        <img
          src={artists.image}
          alt={artists.artist_Name}
          className="w-96 h-98 rounded-lg shadow-xl object-cover"
        />
      </div>
      <div className="md:w-1/2 space-y-9 mt-6 md:mt-0 md:mr-6 text-center md:text-left">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          {artists.artist_Name}
        </h1>
        <p className="text-gray-600 text-lg">{artists.bio}</p>
        {artists.price && (
          <p className="text-xl font-semibold">Price: ${artists.price}</p>
        )}
        {artists.experience && (
          <p className="text-xl font-semibold">
            Experience: {artists.experience} years
          </p>
        )}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <button
            onClick={handleBooking}
            className="bg-orange-400 hover:bg-red-200 text-white font-bold py-3 px-6 rounded-lg"
          >
            Book a Session
          </button>
          <button
            className="bg-orange-400 hover:bg-red-200 text-white font-bold py-3 px-6 rounded-lg"
            onClick={() => console.log("Show more clicked!")}
          >
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="bg-white-50 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Bridal Makeup"
            description="Sweta has been transforming brides with traditional to contemporary makeup for over 10 years."
            servicesOffered={[
              "Bridal Makeup",
              "Pre-Wedding Consultation",
              "Beauty Planning",
            ]}
          />
          <ServiceCard
            title="Beauty Consultations"
            description="In-depth beauty sessions to find the perfect look for your special day."
            servicesOffered={[
              "Skincare Routine",
              "Makeup Trials",
              "Personal Styling",
            ]}
          />
          <ServiceCard
            title="Exclusive Packages"
            description="Tailored beauty packages to suit every need for your wedding experience."
            servicesOffered={[
              "All-inclusive Bridal",
              "Bridesmaid Beauty Prep",
              "Family Makeup Services",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ title, description, servicesOffered }) => {
  return (
    <div className="bg-rose-100 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-5">{description}</p>
      <ul className="list-disc list-inside">
        {servicesOffered.map((service, index) => (
          <li key={index} className="text-gray-700">
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PastWorkSection = ({ pastWorks, artistId, user_Id }) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Past Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastWorks.map((pastWork, index) => (
            <div
              key={index}
              className="w-full flex justify-center items-center overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
              style={{ height: "450px", width: "350px" }}
            >
              <img
                src={pastWork.image_url}
                alt={`Work ${index + 1}`}
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        <ReviewForm artistId={artistId} userId={user_Id} />
      </div>
    </section>
  );
};

export default Bridepage;
