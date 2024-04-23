import React, { useContext, createContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import glowlogo from "../../assets/glowlogo.png";
import {
  faBars,
  faCalendar,
  faChartBar,
  faDesktop,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const SidebarContext = createContext();

function SidebarItem({ icon, text, to }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li className="flex items-center p-2 cursor-pointer pb-3">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center p-2 w-full ${
            isActive ? "bg-red-500 text-white" : "hover:bg-gray-100"
          }`
        }
      >
        <FontAwesomeIcon icon={icon} size="lg" className="mr-2" />
        <span className={`${expanded ? "ml-2" : "hidden"}`}>{text}</span>
      </NavLink>
    </li>
  );
}

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="fixed top-0 left-0 h-screen w-52 bg-red-50 border-r shadow-sm">
      <nav className="h-full flex flex-col">
        <div className="p-4 pb-12 flex flex-col justify-between items-start">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 mt-0 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
          <img
            src={glowlogo}
            alt="glowlogo"
            className={`overflow-hidden transition-all ${
              expanded ? "w-40 mt-6" : "w-0 mt-12"
            }`}
          />
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 pb-7">
            <SidebarItem icon={faDesktop} text="Dashboard" to="/dashboard" />
            <SidebarItem icon={faUser} text="User" to="/user" />
            <SidebarItem icon={faUser} text="Artist" to="/artist" />
            <SidebarItem
              icon={faCalendar}
              text="Appointment"
              to="/appointment"
            />
            <SidebarItem icon={faUser} text="Payment" to="/payment" />
            <SidebarItem icon={faChartBar} text="Report" to="/report" />
            {children}
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}
