import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../Admin/Login/Login.css";
import { auth } from "../../FireasbeConfig";

const firestore = getFirestore();

const StaffLogin_Comp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // console.log("Form data:", data);
    const signin_result = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    console.log(signin_result);

    if (signin_result.user.emailVerified === true) {
      console.log("email verified");
      const user = await getDoc(
        doc(firestore, "Staffuser", signin_result.user.uid)
      );
      if (user.exists()) {
        if (user.data().role === "staff") {
          console.log("User is an staff");
          window.location.replace("/staffdashboard");
        } else {
          console.log("User is not an staff");
          navigate("/");
        }
      } else {
        console.log("user not found");
        navigate("/staffsignup");
      }
    } else {
      // console.log("email not verified please verify your email");
      alert("Login Successfully");
      // goto dashboard
      window.location.replace("/staffdashboard");
    }

    reset();
  };

  return (
    <>
      <div className="signup-container">
        <h2 className="signup-title">Staff Login</h2>
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
        {/* <button onClick={signInWithGoogle}>sign with google</button> */}
        <p className="login-signup">
          Don't have an account?{" "}
          <a
            href="/staffsignup"
            className="signup-link"
            onClick={() => {
              navigate("/staffsignup");
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </>
  );
};

export default StaffLogin_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
