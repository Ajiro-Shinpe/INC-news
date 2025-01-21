import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../stores/Auth/actions";
import useValidator from "../../../utils/useValidator";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";
import Loader from "../../../Components/Loader";

function Login() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { loginError, isLoggingIn, isAuthenticated, user } = useSelector(
    (state) => state?.AuthReducer
  );

  // Handle form submission
  const onSubmit = () => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    setError(""); // Clear previous error
    dispatch(login(formData)); // Dispatch the login action
  };

  // Form validation using custom hook and Yup schema
  const { values, setValues, errors, handleSubmit, touched } = useValidator({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email!").required("Email is required"),
      password: Yup.string().required("Password is required."),
    }),
    onSubmit,
  });

  // Update error state based on loginError
  useEffect(() => {
    if (loginError) {
      if (typeof loginError === "string") {
        setError(loginError); // If the error is a string, set it directly
      } else if (typeof loginError === "object" && loginError.email) {
        setError(`Error: ${loginError.email}`); // Extract the error message from the object if it's an object
      } else {
        setError("An unknown error occurred");
      }
    }
  }, [loginError]);

  const navigate = useNavigate();

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/news-search");
    }
  }, [isAuthenticated, user]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={styles.logincontainer}>
        <div className={styles.loginform}>
          <h2>Login</h2>
          {isLoggingIn && (
            <div className={styles.loadercontainer}>
              <Loader />
            </div>
          )}
          {/* Display login error if present */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className={styles.formgroup}>
              <label htmlFor="email">Email address:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              {/* Display form validation error for email */}
              {errors.email && touched.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>
            <div className={styles.formgroup}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              {/* Display form validation error for password */}
              {errors.password && touched.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <button type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? "Logging In..." : "Login"}
            </button>
          </form>
          <div className={styles.hrline}></div>
          <div className={styles.signuplink}>
            Not an account? Click to
            <Link to="/register"> Signup</Link>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Login;
