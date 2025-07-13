import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth } from "../../FireasbeConfig";
import "./Login.css";

const firestore = getFirestore();

const Admin_Login_Comp = () => {
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
        doc(firestore, "Adminuser", signin_result.user.uid)
      );
      if (user.exists()) {
        if (user.data().role === "admin") {
          console.log("User is an admin");
          window.location.replace("/admindashboard");
        } else {
          console.log("User is not an admin");
          navigate("/");
        }
      } else {
        console.log("user not found");
        navigate("/signup");
      }
    } else {
      // console.log("email not verified please verify your email");
      alert("Login Successfully");
    }

    reset();
  };

  return (
    <>
      <div className="signup-container">
        <h2 className="signup-title">Admin Login</h2>
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
            href="/signup"
            className="signup-link"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </>
  );
};

export default Admin_Login_Comp;
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
