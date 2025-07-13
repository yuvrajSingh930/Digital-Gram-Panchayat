import React, { useEffect, useState } from "react";
import { auth } from "../../FireasbeConfig";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "./UserDashboard.css";

const firestore = getFirestore();

const UserDashboard_Comp = () => {
  const [isUser, setIsUser] = useState(false);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log("user exists", user);

        // Check user role in Firestore
        const docRef = doc(firestore, "User", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().role === "user") {
          // console.log("User is an staff role");
          setIsUser(true);
          setEmail(user.email); // Set email when user is authenticated
          setRole(docSnap.data()); // Set role when user is authenticated
        } else {
          navigate("/"); // Redirect to home if not admin
        }
      } else {
        navigate("/"); // Redirect to home if not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, firestore, navigate]);

  return (
    <>
      {isUser ? (
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
      ) : (
        navigate("/") // Redirect to home if not admin
      )}
    </>
  );
};
export default UserDashboard_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
