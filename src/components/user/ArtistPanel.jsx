import React from "react";

import ArtistNavbar from "../user/ArtistNavbar";
import ArtistSidebar from "../user/ArtistSidebar";
import UploadMultipleFiles from "./MultipleImage";
import TimeslotManagementPage from "./Timeslot";
// Your AddTimeslot component
// Import other components

const App = () => {
  return (
    <>
      <ArtistNavbar />
      <div className="flex">
        <ArtistSidebar />
        <div className="flex-1 p-10"></div>
      </div>
    </>
  );
};

export default App;
