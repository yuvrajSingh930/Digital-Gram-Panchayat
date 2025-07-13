import React from "react";
import "./AdminDashBoard.css";

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Welcome Admin</h2>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <button
            onClick={() => setActiveComponent("personalinfo")}
            className="sidebar-link"
          >
            Personal Info
          </button>
        </li>
        <li className="sidebar-item">
          <button
            onClick={() => setActiveComponent("manage-services")}
            className="sidebar-link"
          >
            Manage All Service Applications
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
