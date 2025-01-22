import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../stores/Auth/actions";
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

  const navigate = useNavigate();

  // Custom validation hook
  function useValidator({ initialValues, validationSchema, onSubmit }) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validate = () => {
      try {
        validationSchema.validateSync(values, { abortEarly: false });
        setErrors({});
        return true;
      } catch (validationErrors) {
        const errorMessages = validationErrors.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(errorMessages);
        return false;
      }
    };

    const handleSubmit = (e) => {
      if (e) e.preventDefault();
      const isValid = validate();
      if (isValid) {
        onSubmit();
      }
    };

    const handleBlur = (field) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
    };

    return {
      values,
      setValues,
      errors,
      touched,
      handleSubmit,
      handleBlur,
    };
  }

  // Form validation logic
  const { values, setValues, errors, handleSubmit, handleBlur, touched } =
    useValidator({
      initialValues: { email: "", password: "" },
      validationSchema: Yup.object({
        email: Yup.string().email("Invalid Email!").required("Email is required"),
        password: Yup.string().required("Password is required."),
      }),
      onSubmit: () => {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        setError("");
        dispatch(login(formData));
      },
    });

  useEffect(() => {
    if (loginError) {
      setError(
        typeof loginError === "string"
          ? loginError
          : "An unknown error occurred"
      );
    }
  }, [loginError]);

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
          {error && (
            <div
              className="error-message"
              style={{ color: "red", marginBottom: "1rem" }}
            >
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
                onBlur={() => handleBlur("email")}
              />
              {errors.email && touched.email && (
                <span className="error" style={{ color: "red" }}>
                  {errors.email}
                </span>
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
                onBlur={() => handleBlur("password")}
              />
              {errors.password && touched.password && (
                <span className="error" style={{ color: "red" }}>
                  {errors.password}
                </span>
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
