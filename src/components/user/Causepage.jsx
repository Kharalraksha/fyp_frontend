import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API fetching
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import Calendar CSS
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Causepage = () => {
  const { id } = useParams();
  console.log(id);
  const [showModal, setShowModal] = useState(false);
  const [artists, setArtists] = useState([]);
  const [pastWorks, setPastWorks] = useState([]); // State for storing past works
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const availableTimes = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

  useEffect(() => {
    fetchArtists();
    fetchPastWorks(); // Fetch past works when the component mounts or id changes
  }, [id]);

  const fetchArtists = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/artist/${id}`
      );
      console.log(response.data);
      setArtists(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching artists:", error);
      setError("Error fetching artists. Please try again later.");
      setLoading(false);
    }
  };

  const fetchPastWorks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/upload/get`);
      console.log(response.data);
      setPastWorks(response.data); // Assuming the API returns an array of past works
    } catch (error) {
      console.error("Error fetching past works:", error);
      // Handle error for fetching past works
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="min-h-screen bg-red-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection artists={artists} setShowPopup={setShowPopup} />{" "}
        {/* Assuming you're fetching one artist */}
        {/* Services Section */}
        <ServicesSection />
        <PastWorkSection pastWorks={pastWorks} />
      </main>
      {/* Past Work Section */}
    </div>
  );
};

const HeroSection = ({ artists, setShowPopup }) => {
  // Existing code...

  const togglePopup = () => {
    setShowModal(true); // This will now control the visibility of the modal
  };

  return (
    <div className="container mx-auto my-12 px-6 md:flex md:flex-row-reverse items-center">
      {/* Image Section */}
      <div className="flex justify-end md:w-1/2">
        <img
          src={artists.image}
          alt={artists.artist_Name}
          className="w-96 h-98 rounded-lg shadow-xl object-cover"
        />
      </div>
      {/* Text Section */}
      <div className="md:w-1/2 space-y-9 mt-6 md:mt-0 md:mr-6 text-center md:text-left">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          {artists.artist_Name}
        </h1>
        <p className="text-gray-600 text-lg">{artists.bio}</p>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <Link
            to={`/userappointment/${artists.artist_Id}`} // Assuming `artists.id` holds the artist ID
            className="bg-orange-400 hover:bg-red-200 text-white font-bold py-3 px-6 rounded-lg"
          >
            Book a Session
          </Link>
          <button
            className="bg-orange-400 hover:bg-red-200 text-white font-bold py-3 px-6 rounded-lg"
            onClick={() => console.log("Book a Session clicked!")}
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

const PastWorkSection = ({ pastWorks }) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Past Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastWorks.map((pastWorks, index) => (
            <div
              key={index}
              className="w-full flex justify-center items-center overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
              style={{ height: "450px", width: "350px" }}
            >
              <img
                src={pastWorks.image_url} // Assuming each work has an `imageUrl` field
                alt={`Work ${index + 1}`}
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Causepage;
