import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, firestore } from "../../FireasbeConfig"; // Adjust the import path
import "./MyApplication.css";

const MyApplications_Comp = () => {
  // State to store applications and loading status
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      // Get the current user
      const user = auth.currentUser;
      // console.log("Current user:", user);

      if (user) {
        try {
          // Define queries for each collection
          const birthQuery = query(
            collection(firestore, "birthCertificates"),
            where("userId", "==", user.uid)
          );
          const marriageQuery = query(
            collection(firestore, "marriageCertificates"),
            where("userId", "==", user.uid)
          );
          const deathQuery = query(
            collection(firestore, "deathCertificates"),
            where("userId", "==", user.uid)
          );
          const divorceQuery = query(
            collection(firestore, "divorceCertificates"),
            where("userId", "==", user.uid)
          );

          // console.log("Queries defined:", {
          //   birthQuery,
          //   marriageQuery,
          //   deathQuery,
          //   divorceQuery,
          // });

          // Execute all queries in parallel
          const [
            birthSnapshot,
            marriageSnapshot,
            deathSnapshot,
            divorceSnapshot,
          ] = await Promise.all([
            getDocs(birthQuery),
            getDocs(marriageQuery),
            getDocs(deathQuery),
            getDocs(divorceQuery),
          ]);

          // console.log("Query results:", {
          //   birthSnapshot,
          //   marriageSnapshot,
          //   deathSnapshot,
          //   divorceSnapshot,
          // });

          // Combine results from all collections
          const combinedResults = [
            ...birthSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              type: "birthCertificate",
            })),
            ...marriageSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              type: "marriageCertificate",
            })),
            ...deathSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              type: "deathCertificate",
            })),
            ...divorceSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              type: "divorceCertificate",
            })),
          ];

          // console.log("Combined results:", combinedResults);

          // Update state with combined results
          setApplications(combinedResults);
        } catch (error) {
          console.error("Error fetching applications:", error);
        } finally {
          // Set loading to false after data is fetched
          setLoading(false);
          // console.log("Loading finished.");
        }
      } else {
        console.log("No user is currently logged in.");
        setLoading(false); // Set loading to false if no user is found
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-applications">
      <h2 className="my-applications-heading">My Applications</h2>
      {applications.length === 0 ? (
        <p>You have no applications.</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app.id} className="application-item">
              <h2>
                <strong>You have an application for: </strong>
                {app.formName}
              </h2>

              <p>
                <strong>Status: </strong>
                {app.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyApplications_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
