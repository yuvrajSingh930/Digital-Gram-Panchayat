import React, { useEffect, useState } from "react";
import { auth } from "../../FireasbeConfig";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "../../Admin/Dashboard/SidebarComponents/Personalinfo.css";

const firestore = getFirestore();

const StaffDashboard_Comp = () => {
  const [isStaff, setIsStaff] = useState(false);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle authentication state change
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check user role in Firestore
        const docRef = doc(firestore, "Staffuser", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().role === "staff") {
          setIsStaff(true);
          setEmail(user.email); // Set email when user is authenticated
          setRole(docSnap.data()); // Set role when user is authenticated
        } else {
          navigate("/"); // Redirect to home if not staff
        }
      } else {
        navigate("/"); // Redirect to home if not authenticated
      }
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, [auth, firestore, navigate]);

  return (
    <>
      {isStaff ? (
        <div className="user-profile-container" style={{ marginTop: "30px" }}>
          <p>
            <strong>Role: </strong>
            {role?.role}
          </p>
          <p>
            <strong>Email: </strong>
            {email}
          </p>
          <p>
            <strong>UID: </strong>
            {auth.currentUser?.uid}
          </p>
          <p>Add more details if needed</p>
        </div>
      ) : null}{" "}
    </>
  );
};

export default StaffDashboard_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
