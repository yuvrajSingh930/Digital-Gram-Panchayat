import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../FireasbeConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import "../../Admin/Login/Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore();

const UserLogin_Comp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // const onSubmit = async (data) => {
  //   // console.log("Form data:", data);
  //   const signin_result = await signInWithEmailAndPassword(
  //     auth,
  //     data.email,
  //     data.password
  //   );

  //   // console.log(signin_result);

  //   if (signin_result.user.emailVerified === true) {
  //     console.log("email verified");
  //     const user = await getDoc(doc(firestore, "User", signin_result.user.uid));
  //     if (user.exists()) {
  //       if (user.data().role === "user") {
  //         console.log("User is an user");
  //         window.location.replace("/userdashboard");
  //         // navigate("/userdashboard");
  //       } else {
  //         console.log("User is not authorized");
  //         navigate("/");
  //       }
  //     } else {
  //       console.log("user not found");
  //       navigate("/Usersignup");
  //     }
  //   } else {
  //     console.log("email not verified please verify your email");
  //     alert("email not verified please verify your email");
  //   }

  //   reset();
  // };

  const onSubmit = async (data) => {
    try {
      // Sign in the user with email and password
      const signin_result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Check if email is verified
      if (signin_result.user.emailVerified) {
        console.log("Email verified");

        // Fetch the user document from Firestore
        const userDocRef = doc(firestore, "User", signin_result.user.uid);
        const user = await getDoc(userDocRef);

        // Check if the user document exists in Firestore
        if (user.exists()) {
          console.log("Firestore user data:", user.data());

          if (user.data().role === "user") {
            console.log("User is a regular user");
            window.location.replace("/userdashboard");
          } else {
            console.log("User is not authorized for this section");
            navigate("/");
          }
        } else {
          // If no user document found
          console.log("User document not found in Firestore");
          alert("User document not found, please sign up first.");
          navigate("/Usersignup");
        }
      } else {
        // console.log("Email not verified. Please verify your email.");
        alert("Login Successfully");
        // goto dashboard
        window.location.replace("/userdashboard");

      }
    } catch (error) {
      console.log("Error during sign-in:", error);
      alert("Error during sign-in. Please try again.");
    }

    // Reset form fields after submission
    reset();
  };

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // console.log("User signed in:", user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <>
      <div className="signup-container">
        <h2 className="signup-title">User Login</h2>
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="signup-button">
            Login
          </button>
        </form>
        <p className="login-signup">
          Don't have an account?{" "}
          <a
            href="/usersignup"
            className="signup-link"
            onClick={() => {
              navigate("/usersignup");
            }}
          >
            Sign up
          </a>
        </p>

        <button
          onClick={handleSignIn}
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          sign with google
        </button>
      </div>
    </>
  );
};

export default UserLogin_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
