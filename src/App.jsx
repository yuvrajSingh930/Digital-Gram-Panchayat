import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContextProvider } from "./Components/Context/ContextOne";
import Home from "./Components/Home";
import Admin_Login_Comp from "./Components/Admin/Login/Admin_Login_Comp";
import AdminDashBoard_comp from "./Components/Admin/Dashboard/AdminDashBoard_comp";
import SignUp_comp from "./Components/Admin/Login/Signup";
import StaffSignup_Comp from "./Components/Staff/Login_Signup/StaffSignup_Comp";
import StaffLogin_Comp from "./Components/Staff/Login_Signup/StaffLogin_Comp";
import StaffDashboard_Comp from "./Components/Staff/StaffDashboard/StaffDashboard_Comp";
import UserSignup_Comp from "./Components/users/Login_Signup/UserSignup_Comp";
import UserLogin_Comp from "./Components/users/Login_Signup/UserLogin_Comp";
import UserDashboard_Comp from "./Components/users/UserDashboard/UserDashboard_Comp";
import Navbar_Comp from "./Components/Navbar/Navbar_Comp";
import Footer_Comp from "./Components/footer/Footer_Comp";
import About_Comp from "./Components/about/About_Comp";
import BirthCertificateManager from "./Components/Services/BirthCertificate/BirthCertificate_Comp";
import MarriageCertificate_Comp from "./Components/Services/MarrageCertificate/MarrageCertificate_Comp";
import DeathCertificate_Comp from "./Components/Services/DeathCertificate/DeathCertificate_Comp";
import AllServices_Comp from "./Components/Services/AllServices/AllServices_Comp";
import DivorceCertificate_Comp from "./Components/Services/DivorceCertificate/DivorceCertificate_Comp";
import ManageApplication_Comp from "./Components/Staff/StaffDashboard/ManageApplication_Comp";
import MyApplications_Comp from "./Components/users/UserDashboard/MyApplications_Comp";
import SearchResults from "./Components/Services/search/SearchResut_Comp";

function App() {
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <Navbar_Comp />
          <Routes>
            <Route path="/" element={<Home />} />

            {/* admin routes */}
            <Route path="/signup" element={<SignUp_comp />} />
            <Route path="/login" element={<Admin_Login_Comp />} />
            <Route path="/admindashboard" element={<AdminDashBoard_comp />} />

            {/* staff routes*/}
            <Route path="/staffsignup" element={<StaffSignup_Comp />} />
            <Route path="/stafflogin" element={<StaffLogin_Comp />} />
            <Route path="/staffdashboard" element={<StaffDashboard_Comp />} />
            <Route
              path="/manageapplication"
              element={<ManageApplication_Comp />}
            />

            {/* user routes*/}
            <Route path="/usersignup" element={<UserSignup_Comp />} />
            <Route path="/userlogin" element={<UserLogin_Comp />} />

            <Route path="/userdashboard" element={<UserDashboard_Comp />} />
            <Route path="/myapplications" element={<MyApplications_Comp />} />

            {/* PUBlic routes */}
            <Route path="/about" element={<About_Comp />} />
            <Route
              path="/birthcertificateapplication"
              element={<BirthCertificateManager />}
            />
            <Route
              path="/marriagecertificateapplication"
              element={<MarriageCertificate_Comp />}
            />
            <Route
              path="/deathcertificateapplication"
              element={<DeathCertificate_Comp />}
            />
            <Route
              path="/divorcecertificateapplication"
              element={<DivorceCertificate_Comp />}
            />

            <Route path="/allservices" element={<AllServices_Comp />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>

          <Footer_Comp />
        </ContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
