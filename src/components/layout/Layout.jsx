// Layout.js
import React from "react";
import Navbarr from "./components/user/Navbarr";
import Footer from "./components/user/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbarr />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
