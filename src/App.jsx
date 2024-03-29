import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/Authcontext";
import Dashboard from "./pages/admin/Dashboard";
import User from "./components/admin/User";
import Artist from "./components/admin/Artist";
import Home from "./components/user/Home";
import SigninForm from "./components/auth/SigninForm";
import SignupForm from "./components/auth/SignupForm";
import RegistrationForm from "./components/user/RegistrationForm";
import ContactUs from "./components/user/ContactUs";
import Navbarr from "./components/user/Navbarr";
import Footer from "./components/user/Footer";
import EditForm from "./components/admin/Editform";
import EditUserForm from "./components/admin/EditUserForm";
import BridalPage from "./components/user/BridalPage";
import ArtistLogin from "./components/user/Artistlogin";
import BridePage from "./components/user/BridePage";
import UploadMultipleFiles from "./components/user/MultipleImage";
import Timeslot from "./components/user/Timeslot";
import Appointment from "./components/admin/Appointment";
import UserAppointment from "./components/user/UserAppointment";
import EditAppointment from "./components/admin/editAppointment";
import FestivalPage from "./components/user/FestivalPage";
import Festivepage from "./components/user/FestivePage";
import CasualPage from "./components/user/Casualpage";
import Causepage from "./components/user/Causepage";

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Router>
          <Navbarr />
          <Routes>
            <Route path="/" element={<ArtistLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user" element={<User />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/home" element={<Home />} />
            <Route path="/registration-form" element={<RegistrationForm />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/signinform" element={<SigninForm />} />
            <Route path="/signupform" element={<SignupForm />} />
            <Route path="/bridal" element={<BridalPage />} />
            <Route path="/edit-form/:id" element={<EditForm />} />
            <Route path="/bridepage/:id" element={<BridePage />} />
            <Route path="/festival" element={<FestivalPage />} />
            <Route path="/festivepage/:id" element={<Festivepage />} />
            <Route path="/causepage/:id" element={<Causepage />} />
            <Route path="/casual" element={<CasualPage />} />
            <Route path="/edituserform/:id" element={<EditUserForm />} />
            <Route path="/editappointment/:id" element={<EditAppointment />} />
            <Route path="/timeslot/:artistId" element={<Timeslot />} />
            <Route path="/upload" element={<UploadMultipleFiles />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/userappointment/:id" element={<UserAppointment />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
