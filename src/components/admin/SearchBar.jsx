import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint for searching profiles
      const apiUrl = "https://adminapi.rebuzzpos.com/api/v1admin/getUsers";
      const url = new URL(apiUrl);
      url.searchParams.append("name", query);
      url.searchParams.append("email", query);

      const response = await fetch(url);

      if (response.ok) {
        const searchResults = await response.json();
        console.log("Search Results:", searchResults);

        // Pass the searchResults to the onSearch callback
        onSearch(searchResults);
      } else {
        console.error("Error fetching search results:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={handleSearch}
        className="bg-defaultGreen text-white p-2 rounded-full focus:outline-none"
      >
        <FaSearch size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
