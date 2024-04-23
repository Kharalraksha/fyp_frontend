import React from "react";
import { useLocation } from "react-router-dom";
import Navbarr from "../user/Navbarr";
import Footer from "../user/Footer";

function Layout({ children }) {
  const location = useLocation();
  const excludeNavFooterPaths = [
    "/SigninForm",
    "/signupform",
    "/Bridepage",

    "/Registrationform",
    "/Artistlogin",
    "/dashboard",
    "/appointment",
    "/user",
    "/artist",
    "/review",
    "/panel",
    "/timeslot",
    "/upload",
    "/history",
    "/payment",
    "/editpayment/:id",
    "/edituserform/:id",
    "artistprofile",
    "/ContactUS",
    "/Aboutus",
    "/report",
    "/EditUserForm",
    "/editAppointment/",
    "/EditForm",
  ];

  const showNavFooter = !excludeNavFooterPaths.some(
    (path) =>
      location.pathname === path ||
      location.pathname.startsWith(path.replace("/:id", ""))
  );

  return (
    <>
      {showNavFooter && <Navbarr />}
      {children}
      {showNavFooter && <Footer />}
    </>
  );
}

export default Layout;
