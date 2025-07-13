import React, { useEffect, useState, useContext } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";

import { ContextOne } from "../Context/ContextOne";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Navbar.css";
import { auth } from "../FireasbeConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const firestore = getFirestore();

const Navbar_Comp = () => {
  const { setSearchQuery } = useContext(ContextOne);

  const { register, handleSubmit, watch, reset } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);
    setSearchQuery(data.searchQuery);

    // reset();
    // console.log("searchQuery", searchQuery);

    navigate("/allservices");
  };

  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check user role in Firestore
        const docRef = doc(firestore, "Adminuser", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          console.log("User is not an admin");
          // Redirect to home if not admin
        }

        // staff check
        const docRef_staff = doc(firestore, "Staffuser", user.uid);
        const docSnap_staff = await getDoc(docRef_staff);
        if (docSnap_staff.exists() && docSnap_staff.data().role === "staff") {
          setIsStaff(true);
        } else {
          console.log("User is not an staff");
          // Redirect to home if not admin
        }

        // user check
        const docRef_user = doc(firestore, "User", user.uid);
        const docSnap_user = await getDoc(docRef_user);
        if (docSnap_user.exists() && docSnap_user.data().role === "user") {
          setIsUser(true);
        } else {
          console.log("User is not an user");
          // Redirect to home if not admin
        }
      } else {
        console.log("User is not authenticated");
      }
    });

    return () => unsubscribe();
  }, [auth, firestore, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
      navigate("/"); // Redirect after logout
    } catch (error) {
      console.error("Logout error:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
      className="shadow-sm"
    >
      <Navbar.Brand
        as={Link}
        to="/"
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "1.5rem",
          marginLeft: "1rem",
        }}
      >
        Gram Panchayat{" "}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        style={{ marginRight: "18px", marginLeft: "18px" }}
      >
        <Nav className="me-auto">
          {/* Dropdown for categories */}
          <NavDropdown
            title="Browse Applications"
            id="collapsible-nav-dropdown"
          >
            <NavDropdown.Item as={Link} to="/birthcertificateapplication">
              Birth Certificate
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/marriagecertificateapplication">
              marriage Certificate
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/deathcertificateapplication">
              Death Certificate
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/divorcecertificateapplication">
              Divorce Certificate
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/divorcecertificateapplication">
              Dummy Certificate
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/divorcecertificateapplication">
              Dummy2 Certificate
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/allservices">
              Browse All Certificate
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form
          className="d-flex flex-grow-1 mx-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl
            type="search"
            placeholder="Search product name"
            className="me-2"
            aria-label="Search"
            style={{ flexGrow: 1 }}
            {...register("searchQuery")}
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
        <Nav style={{ alignItems: "baseline" }}>
          {isAdmin || isStaff || isUser ? (
            <NavDropdown
              title={<CgProfile style={{ fontSize: "20px", color: "white" }} />}
              id="collapsible-nav-dropdown"
            >
              {isAdmin && (
                <NavDropdown.Item as={Link} to="/admindashboard">
                  Admin Dashboard
                </NavDropdown.Item>
              )}

              {isStaff && (
                <>
                  <NavDropdown.Item as={Link} to="/staffdashboard">
                    Staff Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/manageapplication">
                    Manage Application
                  </NavDropdown.Item>
                </>
              )}

              {isUser && (
                <>
                  <NavDropdown.Item as={Link} to="/userdashboard">
                    User Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/myapplications">
                    My Applications
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          ) : null}
          {isAdmin || isStaff || isUser ? (
            <Nav.Link as={Link} to="/" onClick={handleLogout}>
              {isAdmin && <span>Admin Logout</span>}
              {isStaff && <span>Staff Logout</span>}
              {isUser && <span>User Logout</span>}
              {!isAdmin && !isStaff && !isUser && "Logout"}
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/userlogin">
              Login
            </Nav.Link>
          )}
          {isAdmin || isStaff || isUser ? null : (
            <>
              <Nav.Link as={Link} to="/stafflogin">
                <div className="addcss">
                  <i className="bi bi-cart"></i> <span>Staff</span>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <div className="addcss">
                  <i className="bi bi-cart"></i> <span>Admin</span>
                </div>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Navbar_Comp;

// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
