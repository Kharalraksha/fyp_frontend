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
import Khalti from "./components/Khalti/Khalti";
import Layout from "./components/layout/Layout";
import ReviewForm from "./components/user/ReviewForm";
import ArtistPanel from "./components/user/ArtistPanel";
import AppointmentHistory from "./components/user/AppointmentHistory";
import EditPaymentForm from "./components/admin/EditPaymentForm";
import Payment from "./components/admin/Payment";
import EditArtistProfile from "./components/user/EditArtistProfile";
import AboutUs from "./components/user/AboutUs";
import Artistdas from "./components/user/Artistdas";
import Report from "./components/admin/Report";
import UserProfileForm from "./components/user/UserProfileForm";

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/artistLogin" element={<ArtistLogin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user" element={<User />} />
              <Route path="/artist" element={<Artist />} />
              <Route path="/" element={<Home />} />
              <Route path="/registrationform" element={<RegistrationForm />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/signinform" element={<SigninForm />} />
              <Route path="/signupform" element={<SignupForm />} />
              <Route path="/bridal" element={<BridalPage />} />
              <Route path="/editform/:id" element={<EditForm />} />
              <Route path="/bridepage/:id" element={<BridePage />} />
              <Route path="/festival" element={<FestivalPage />} />
              <Route path="/festivepage/:id" element={<Festivepage />} />
              <Route path="/causepage/:id" element={<Causepage />} />
              <Route path="/casual" element={<CasualPage />} />
              <Route path="/edituserform/:id" element={<EditUserForm />} />
              <Route path="/editpayment/:id" element={<EditPaymentForm />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/userprofile" element={<UserProfileForm />} />
              <Route
                path="/editappointment/:id"
                element={<EditAppointment />}
              />
              <Route path="/timeslot/:artistId" element={<Timeslot />} />
              <Route path="/upload/:id" element={<UploadMultipleFiles />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/panel" element={<ArtistPanel />} />
              <Route path="/history" element={<AppointmentHistory />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/artistdas" element={<Artistdas />} />
              <Route path="/report" element={<Report />} />
              <Route path="/artistprofile" element={<EditArtistProfile />} />
              <Route
                path="/userappointment/:id"
                element={<UserAppointment />}
              />
              <Route path="/khalti" element={<Khalti />} />
              <Route path="/review" element={<ReviewForm />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
