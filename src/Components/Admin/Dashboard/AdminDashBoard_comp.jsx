import React, { useEffect, useState } from "react";
import { auth } from "../../FireasbeConfig";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "./AdminDashboard.css";
import Sidebar from "./SideBar_Comp";
import Personalinfo_Comp from "./SidebarComponents/Personalinfo_Comp";
import ManageServices_Comp from "./SidebarComponents/ManageServices_Comp";

const firestore = getFirestore();

const AdminDashBoard_comp = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check user role in Firestore
        const docRef = doc(firestore, "Adminuser", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          navigate("/"); // Redirect to home if not admin
        }
      } else {
        navigate("/"); // Redirect to home if not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, firestore, navigate]);

  const [activeComponent, setActiveComponent] = useState(""); // State to track the active component

  // Function to render the selected component
  const renderComponent = () => {
    switch (activeComponent) {
      case "personalinfo":
        return <Personalinfo_Comp />;
      case "manage-services":
        return <ManageServices_Comp />;
      // case "logout":
      //   return <Logout />;
      default:
        return;
    }
  };

  return (
    <>
      {isAdmin ? (
        <>
          <div className="setAdminDashboard">
            <div className="dashboard">
              {/* Pass the setActiveComponent function as a prop */}
              <Sidebar setActiveComponent={setActiveComponent} />
              <div className="content ">{renderComponent()}</div>
            </div>
          </div>
        </>
      ) : (
        navigate("/") // Redirect to home if not admin
      )}
    </>
  );
};

export default AdminDashBoard_comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
