import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaAngleDown,
} from "react-icons/fa";
import raksha from "../../assets/raksha.png";

const Footer = () => (
  <footer className="bg-red-50 mt-auto">
    <img
      src={raksha}
      alt="raksha"
      className="ml-7 h-16 object-contain relative top-10"
    />
    <div className="relative top-[-26px]">
      <div className="  p-5 ml-64 ">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 ">
          {/* <!--First links section--> */}
          <div className="mb-6 ">
            <h2 className="mb-3 text-black text-xl font-bold">Services</h2>
            <ul>
              <li className="mb-3">
                <Link
                  to="/bridal"
                  className="text-neutral-800 dark:text-neutral-800"
                >
                  Bridal Makeup
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to="/festival"
                  className="text-neutral-800 dark:text-neutral-800"
                >
                  Festive Makeup
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to="/casual"
                  className="text-neutral-800 dark:text-neutral-800"
                >
                  Casual Makeup
                </Link>
              </li>
            </ul>
          </div>

          {/* <!--Second links section--> */}
          <div className="mb-6 ">
            <h5 className="mb-3 text-black text-xl font-bold">Login As</h5>
            <ul className="mb-0 list-none">
              <li className="mb-3">
                <Link
                  to="/SigninForm"
                  className="text-neutral-800 dark:text-neutral-800"
                >
                  User
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to="/Registrationform"
                  className="text-neutral-800 dark:text-neutral-800"
                >
                  Artist
                </Link>
              </li>
            </ul>
          </div>

          {/* <!--Third links section--> */}
          <div className="mb-6">
            <h5 className="mb-3 text-black text-xl font-bold">Terms Of Use</h5>
            <ul className="mb-0 list-none">
              <li className="mb-3">
                <a href="#" className="text-neutral-800 dark:text-neutral-800">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-neutral-800 dark:text-neutral-800">
                  Customer Service
                </a>
              </li>
              <li className="mb-3">
                <Link
                  to="/ContactUS"
                  className="text-neutral-800 dark:text-neutral-800"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* <!--Fourth links section--> */}
          <div className="mb-6">
            <h5 className="mb-3 text-black text-xl font-bold">Follow Us:</h5>
            <ul className="mb-0 list-none ">
              <li>
                <a href="#" className="text-neutral-800 dark:text-neutral-800">
                  <FaInstagram className="text-xl mb-2" />
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-800 dark:text-neutral-800">
                  <FaFacebook className="text-xl mb-2" />
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-800 dark:text-neutral-800">
                  <FaTwitter className="text-xl mb-2" />
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-800 dark:text-neutral-800">
                  <FaYoutube className="text-xl mb-2" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* <!--Copyright section--> */}
    <div className="bg-red-100 p-3 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
      © 2023 Copyright: GlowQuill
    </div>
  </footer>
);
export default Footer;
