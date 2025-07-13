import React from "react";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../../FireasbeConfig";
import "../../Admin/Login/Signup.css";

const firestore = getFirestore();

const StaffSignup_Comp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Sign up the user with email and password
      const signup_result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Log the signup result
      console.log("signup_result", signup_result);

      // Send email verification
      await sendEmailVerification(signup_result.user);
      console.log("Email verification sent");

      // Determine the user's role
      const role = "staff";

      // Save the user role in Firestore using the user's UID
      await setDoc(doc(firestore, "Staffuser", signup_result.user.uid), {
        role,
      });

      console.log("User signed up and role assigned:", role);
      // Redirect to the staff dashboard
      window.location.replace("/staffdashboard");
    } catch (error) {
      console.log("Error during signup:", error);
    }

    // Optional: Reset the form after submission
    reset();
  };

  return (
    <>
      <div className="signin-container">
        <h2 className="signin-title">Staff Sign up</h2>
        <div className="signin-form-wrapper">
          <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit" className="signin-button">
              Sign up
            </button>
          </form>
        </div>
        <p className="login-signup">
          Already have an account?{" "}
          <a
            href="/stafflogin"
            className="signup-link"
            onClick={() => {
              navigate("/stafflogin");
            }}
          >
            Login
          </a>
        </p>
      </div>
    </>
  );
};

export default StaffSignup_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
