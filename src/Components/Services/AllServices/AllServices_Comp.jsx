import React, { useContext, useEffect, useState } from "react";
import { ContextOne } from "../../Context/ContextOne";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth, firestore } from "../../FireasbeConfig";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./AllServices.css";

const AllServices_Comp = () => {
  const { searchQuery } = useContext(ContextOne) || {}; // Ensure searchQuery is defined
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    // Function to fetch user role
    const fetchUserRole = async (user) => {
      const docRef = doc(firestore, "Adminuser", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().role === "admin") {
        setIsAdmin(true);
      }

      const docRef_staff = doc(firestore, "Staffuser", user.uid);
      const docSnap_staff = await getDoc(docRef_staff);
      if (docSnap_staff.exists() && docSnap_staff.data().role === "staff") {
        setIsStaff(true);
      }

      const docRef_user = doc(firestore, "User", user.uid);
      const docSnap_user = await getDoc(docRef_user);
      if (docSnap_user.exists() && docSnap_user.data().role === "user") {
        setIsUser(true);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserRole(user);
      }
    });

    return () => unsubscribe();
  }, []); // Only runs on mount/unmount

  // Define card data
  const cardData = [
    {
      title: "Marriage Certificate Application",
      text: "Apply for a marriage certificate with ease through our streamlined online service. Get started now.",
      imgSrc:
        "https://www.focusonthefamily.com/wp-content/uploads/2024/01/get-married-shutterstock-589431530-65b82ea6e69f6.webp",
      link: "/marriagecertificateapplication",
    },
    {
      title: "Birth Certificate Application",
      text: "Apply for a Birth certificate with ease through our streamlined online service. Get started now.",
      imgSrc:
        "https://www.giboxonline.com/cdn/shop/articles/Happy_Birthday_to_Special_One_1100x.jpg?v=1694861103",
      link: "/birthcertificateapplication",
    },
    {
      title: "Divorce Certificate Application",
      text: "Apply for a Divorce certificate with ease through our streamlined online service. Get started now.",
      imgSrc:
        "https://miro.medium.com/v2/resize:fit:1000/1*67yjiMwYXsr2yJW5jV4H3A.jpeg",
      link: "/divorcecertificateapplication",
    },
    {
      title: "Death Certificate Application",
      text: "Apply for a Death certificate with ease through our streamlined online service. Get started now.",
      imgSrc: "https://www.yourdoorstep.co/images/death-certificate.png",
      link: "/deathcertificateapplication",
    },
    {
      title: "Dummy Certificate",
      text: "Apply for a Dummy certificate with ease through our streamlined online service. Get started now.",
      imgSrc:
        "https://www.focusonthefamily.com/wp-content/uploads/2024/01/get-married-shutterstock-589431530-65b82ea6e69f6.webp",
      link: "/deathcertificateapplication",
    },
    // Add other card data here
  ];

  // Filter cards based on search query
  useEffect(() => {
    const lowercasedQuery = (searchQuery || "").toLowerCase(); // Provide default empty string
    const result = cardData.filter((card) =>
      card.title.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredCards(result);
  }, [searchQuery]); // Only depend on searchQuery

  return (
    <div className="setUpCard">
      {filteredCards.map((card, index) => (
        <Card key={index} className="cardMain">
          <Card.Img variant="top" src={card.imgSrc} />
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.text}</Card.Text>
            <Button variant="primary" as={Link} to={card.link}>
              {isAdmin || isStaff ? "Manage Application" : "Apply Now"}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default AllServices_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
