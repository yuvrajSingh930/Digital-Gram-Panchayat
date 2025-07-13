import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../../FireasbeConfig";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import "./Personalinfo.css";

const Personalinfo_Comp = () => {
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(
    () => async () => {
      const fetch = await getDoc(
        doc(firestore, "Adminuser", auth.currentUser.uid)
      );
      // console.log(fetch.data());
      setRole(fetch.data());
      // console.log("Role:", role);
    },
    [firestore]
  );

  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      setEmail(user.email); // Retrieve the email from the user object
      console.log("Email:", email);
    } else {
      setEmail(null); // User is not signed in
    }

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="user-profile-container">
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
    </>
  );
};

export default Personalinfo_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
