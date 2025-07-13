import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import Hero_Comp from "./hero/Hero_Comp";
import Hero2_Comp from "./hero/Feature";
import AllServices_Comp from "./Services/AllServices/AllServices_Comp";

const Home = () => {
  return (
    <>
      <Hero_Comp />
      <Hero2_Comp />
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "30px",
          color: "black",
          fontFamily: "serif",
          fontStyle: "italic",
          letterSpacing: "3px",
        }}
      >
        Our Available Services
      </h1>
      <AllServices_Comp />
    </>
  );
};

export default Home;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
